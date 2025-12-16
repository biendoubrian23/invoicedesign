import { getSupabase } from '@/lib/supabase/client';
import { Invoice, InvoiceBlock } from '@/types/invoice';
import { deleteClientFolder } from './invoiceService';

// Client type
export interface Client {
    id: string;
    user_id: string;
    name: string;
    address?: string;
    city?: string;
    postal_code?: string;
    email?: string;
    phone?: string;
    siret?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

// Client invoice state type
export interface ClientInvoiceState {
    id: string;
    client_id: string;
    user_id: string;
    invoice_data: Partial<Invoice>;
    blocks_data: InvoiceBlock[];
    selected_template: string;
    updated_at: string;
}

// =============================================
// CLIENT CRUD OPERATIONS
// =============================================

/**
 * Create a new client
 */
export async function createClient(name: string): Promise<{ data: Client | null; error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: 'Non authentifié' };
    }

    const { data, error } = await supabase
        .from('clients')
        .insert({ user_id: user.id, name })
        .select()
        .single();

    if (error) {
        if (error.code === '23505') {
            return { data: null, error: 'Ce client existe déjà' };
        }
        return { data: null, error: error.message };
    }

    // Create folder in storage for this client
    await createClientFolder(name);

    return { data, error: null };
}

/**
 * List all clients for current user
 */
export async function listClients(): Promise<{ data: Client[]; error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: [], error: 'Non authentifié' };
    }

    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true });

    if (error) {
        return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
}

/**
 * Get client by name
 */
export async function getClientByName(name: string): Promise<{ data: Client | null; error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: 'Non authentifié' };
    }

    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .eq('name', name)
        .single();

    if (error && error.code !== 'PGRST116') {
        return { data: null, error: error.message };
    }

    return { data: data || null, error: null };
}

/**
 * Update client info
 */
export async function updateClient(
    clientId: string,
    updates: Partial<Omit<Client, 'id' | 'user_id' | 'created_at'>>
): Promise<{ error: string | null }> {
    const supabase = getSupabase();

    const { error } = await supabase
        .from('clients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', clientId);

    if (error) {
        return { error: error.message };
    }

    return { error: null };
}

/**
 * Delete a client with cascade: delete folder, files, and database entry
 */
export async function deleteClient(clientId: string): Promise<{ error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Non authentifié' };
    }

    // Get client name first for folder deletion
    const { data: client } = await supabase
        .from('clients')
        .select('name')
        .eq('id', clientId)
        .single();

    if (!client) {
        return { error: 'Client non trouvé' };
    }

    // Delete all files in the client's folder
    const folderName = sanitizeFolderName(client.name);
    await deleteClientFolder(folderName);

    // Delete the client from database (this will cascade delete client_invoice_states)
    const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

    if (error) {
        return { error: error.message };
    }

    return { error: null };
}

// =============================================
// CLIENT INVOICE STATE OPERATIONS
// =============================================

/**
 * Save full invoice state for a client
 */
export async function saveClientState(
    clientId: string,
    invoiceData: Partial<Invoice>,
    blocksData: InvoiceBlock[],
    selectedTemplate: string
): Promise<{ error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Non authentifié' };
    }

    // Upsert: insert or update
    const { error } = await supabase
        .from('client_invoice_states')
        .upsert({
            client_id: clientId,
            user_id: user.id,
            invoice_data: invoiceData,
            blocks_data: blocksData,
            selected_template: selectedTemplate,
            updated_at: new Date().toISOString(),
        }, {
            onConflict: 'client_id'
        });

    if (error) {
        return { error: error.message };
    }

    return { error: null };
}

/**
 * Load invoice state for a client
 */
export async function loadClientState(clientId: string): Promise<{
    data: ClientInvoiceState | null;
    error: string | null
}> {
    const supabase = getSupabase();

    const { data, error } = await supabase
        .from('client_invoice_states')
        .select('*')
        .eq('client_id', clientId)
        .single();

    if (error && error.code !== 'PGRST116') {
        return { data: null, error: error.message };
    }

    return { data: data || null, error: null };
}

// =============================================
// STORAGE OPERATIONS
// =============================================

/**
 * Create a folder for a client in Stockage
 */
async function createClientFolder(clientName: string): Promise<void> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    // Create a placeholder file to create the folder
    // (Supabase Storage doesn't have explicit folder creation)
    const folderPath = `${user.id}/${sanitizeFolderName(clientName)}/.folder`;

    await supabase.storage
        .from('Facture')
        .upload(folderPath, new Blob([''], { type: 'text/plain' }), {
            upsert: true
        });
}

/**
 * Get the storage folder path for a client
 */
export function getClientFolderPath(clientName: string): string {
    return sanitizeFolderName(clientName);
}

/**
 * Sanitize folder name for storage
 */
function sanitizeFolderName(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-zA-Z0-9-_]/g, '_') // Replace special chars
        .replace(/_+/g, '_') // Remove multiple underscores
        .substring(0, 50); // Limit length
}

/**
 * Upload exported file to client folder
 */
export async function uploadToClientFolder(
    clientName: string,
    filename: string,
    file: Blob
): Promise<{ url: string | null; error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { url: null, error: 'Non authentifié' };
    }

    const folderName = sanitizeFolderName(clientName);
    const filePath = `${user.id}/${folderName}/${filename}`;

    const { error } = await supabase.storage
        .from('Facture')
        .upload(filePath, file, {
            upsert: true,
            contentType: file.type
        });

    if (error) {
        return { url: null, error: error.message };
    }

    const { data: { publicUrl } } = supabase.storage
        .from('Facture')
        .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
}
