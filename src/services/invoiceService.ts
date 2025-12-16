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
    type: 'pdf' | 'png'
): Promise<{ url: string | null; error: Error | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { url: null, error: new Error('User not authenticated') };
    }

    const extension = type === 'pdf' ? 'pdf' : 'png';
    const contentType = type === 'pdf' ? 'application/pdf' : 'image/png';
    const filePath = `${user.id}/${filename}.${extension}`;

    const { error } = await supabase.storage
        .from('Facture')
        .upload(filePath, file, {
            contentType,
            upsert: true,
        });

    if (error) {
        return { url: null, error: error as Error };
    }

    const { data: { publicUrl } } = supabase.storage
        .from('Facture')
        .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
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
