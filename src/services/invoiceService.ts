import { getSupabase } from '@/lib/supabase/client';
import { Invoice } from '@/types/invoice';

export interface SavedInvoice {
    id: string;
    user_id: string;
    name: string;
    invoice_number: string;
    data: Invoice;
    template: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface StoredFile {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    metadata: {
        size: number;
        mimetype: string;
    };
}

const supabase = getSupabase();

// ============================================
// Invoice CRUD Operations
// ============================================

export async function saveInvoice(invoice: Invoice, template: string, invoiceId?: string): Promise<{ data: SavedInvoice | null; error: Error | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const invoiceData = {
        user_id: user.id,
        name: invoice.issuer?.name || 'Nouvelle facture',
        invoice_number: invoice.invoiceNumber,
        data: invoice,
        template,
        is_active: true,
    };

    if (invoiceId) {
        // Update existing invoice
        const { data, error } = await supabase
            .from('invoices')
            .update(invoiceData)
            .eq('id', invoiceId)
            .eq('user_id', user.id)
            .select()
            .single();

        return { data: data as SavedInvoice, error: error as Error | null };
    } else {
        // Create new invoice
        const { data, error } = await supabase
            .from('invoices')
            .insert(invoiceData)
            .select()
            .single();

        return { data: data as SavedInvoice, error: error as Error | null };
    }
}

export async function loadInvoice(invoiceId: string): Promise<{ data: SavedInvoice | null; error: Error | null }> {
    const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', invoiceId)
        .single();

    return { data: data as SavedInvoice, error: error as Error | null };
}

export async function listInvoices(): Promise<{ data: SavedInvoice[]; error: Error | null }> {
    const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

    return { data: (data || []) as SavedInvoice[], error: error as Error | null };
}

export async function deleteInvoice(invoiceId: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
        .from('invoices')
        .update({ is_active: false })
        .eq('id', invoiceId);

    return { error: error as Error | null };
}

// ============================================
// Storage Operations for exported PDFs/PNGs
// ============================================

export async function uploadExportedFile(
    file: Blob,
    filename: string,
    type: 'pdf' | 'png',
    clientFolder?: string
): Promise<{ url: string | null; filePath: string | null; error: Error | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { url: null, filePath: null, error: new Error('User not authenticated') };
    }

    const extension = type === 'pdf' ? 'pdf' : 'png';
    const contentType = type === 'pdf' ? 'application/pdf' : 'image/png';

    // If clientFolder is provided, use it as subfolder
    const basePath = clientFolder
        ? `${user.id}/${sanitizeFolderName(clientFolder)}`
        : user.id;
    const filePath = `${basePath}/${filename}.${extension}`;

    const { error } = await supabase.storage
        .from('Facture')
        .upload(filePath, file, {
            contentType,
            upsert: true,
        });

    if (error) {
        return { url: null, filePath: null, error: error as Error };
    }

    const { data: { publicUrl } } = supabase.storage
        .from('Facture')
        .getPublicUrl(filePath);

    return { url: publicUrl, filePath, error: null };
}

// Helper function to sanitize folder names
function sanitizeFolderName(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .replace(/_+/g, '_')
        .substring(0, 50);
}

export async function listStoredFiles(): Promise<{ data: StoredFile[]; error: Error | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: [], error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase.storage
        .from('Facture')
        .list(user.id, {
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) {
        return { data: [], error: error as Error };
    }

    return {
        data: (data || []).map((file: { id: string; name: string; created_at: string; updated_at: string; metadata?: { size?: number; mimetype?: string } }) => ({
            id: file.id,
            name: file.name,
            created_at: file.created_at,
            updated_at: file.updated_at,
            metadata: {
                size: file.metadata?.size || 0,
                mimetype: file.metadata?.mimetype || '',
            },
        })) as StoredFile[],
        error: null,
    };
}

// Extended type for file with folder info
export interface StoredFileWithFolder extends StoredFile {
    folderPath?: string;
}

export interface StorageFolder {
    name: string;
    files: StoredFile[];
}

/**
 * List stored files with real folder structure from Supabase Storage
 */
export async function listStoredFilesWithFolders(): Promise<{
    rootFiles: StoredFile[];
    folders: StorageFolder[];
    error: Error | null
}> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { rootFiles: [], folders: [], error: new Error('User not authenticated') };
    }

    // List root level items (files and folders)
    const { data: rootItems, error } = await supabase.storage
        .from('Facture')
        .list(user.id, {
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) {
        return { rootFiles: [], folders: [], error: error as Error };
    }

    const rootFiles: StoredFile[] = [];
    const folders: StorageFolder[] = [];

    for (const item of (rootItems || [])) {
        // Items without metadata.mimetype are folders in Supabase Storage
        if (!item.metadata?.mimetype) {
            // This is a folder - list its contents
            const { data: folderContents } = await supabase.storage
                .from('Facture')
                .list(`${user.id}/${item.name}`, {
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            const folderFiles = (folderContents || [])
                .filter((f: { name: string }) => !f.name.startsWith('.')) // Exclude hidden files like .folder
                .map((file: { id: string; name: string; created_at: string; updated_at: string; metadata?: { size?: number; mimetype?: string } }) => ({
                    id: file.id,
                    name: `${item.name}/${file.name}`,
                    created_at: file.created_at,
                    updated_at: file.updated_at,
                    metadata: {
                        size: file.metadata?.size || 0,
                        mimetype: file.metadata?.mimetype || '',
                    },
                })) as StoredFile[];

            if (folderFiles.length > 0 || item.name) {
                folders.push({
                    name: item.name,
                    files: folderFiles.map(f => ({
                        ...f,
                        name: f.name.split('/').pop() || f.name // Just the filename for display
                    }))
                });
            }
        } else {
            // Regular file at root
            rootFiles.push({
                id: item.id,
                name: item.name,
                created_at: item.created_at,
                updated_at: item.updated_at,
                metadata: {
                    size: item.metadata?.size || 0,
                    mimetype: item.metadata?.mimetype || '',
                },
            });
        }
    }

    return { rootFiles, folders, error: null };
}

export async function getFileUrl(filename: string): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return '';
    }

    const { data: { publicUrl } } = supabase.storage
        .from('Facture')
        .getPublicUrl(`${user.id}/${filename}`);

    return publicUrl;
}

export async function deleteStoredFile(filename: string): Promise<{ error: Error | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: new Error('User not authenticated') };
    }

    const { error } = await supabase.storage
        .from('Facture')
        .remove([`${user.id}/${filename}`]);

    return { error: error as Error | null };
}

/**
 * Delete a client folder and all its contents
 */
export async function deleteClientFolder(folderName: string): Promise<{ error: Error | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: new Error('User not authenticated') };
    }

    const folderPath = `${user.id}/${folderName}`;

    // List all files in the folder (including hidden files like .folder)
    const { data: files, error: listError } = await supabase.storage
        .from('Facture')
        .list(folderPath);

    if (listError && listError.message !== 'not found') {
        return { error: listError };
    }

    // Delete all files in the folder
    if (files && files.length > 0) {
        const filePaths = files.map((f: { name: string }) => `${folderPath}/${f.name}`);
        const { error: removeError } = await supabase.storage
            .from('Facture')
            .remove(filePaths);

        if (removeError) {
            console.error('Error deleting files from folder:', removeError);
            return { error: removeError };
        }
    }

    // Note: Supabase Storage doesn't provide a direct "delete folder" operation
    // The folder is automatically deleted when it becomes empty after removing all files
    // If a .folder placeholder file was used to create the folder, it's deleted above
    
    console.log(`[Storage] Client folder deleted: ${folderPath}`);
    return { error: null };
}
