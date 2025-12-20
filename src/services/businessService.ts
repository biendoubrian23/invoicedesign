import { getSupabase } from '@/lib/supabase/client';

// Business info type
export interface UserBusinessInfo {
    id: string;
    user_id: string;
    
    // Company information
    company_name: string | null;
    address: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;
    
    // Contact information
    email: string | null;
    phone: string | null;
    website: string | null;
    
    // Legal information
    siret: string | null;
    tva_number: string | null;
    ape_code: string | null;
    rcs: string | null;
    
    // Banking information
    iban: string | null;
    bic: string | null;
    bank_name: string | null;
    
    // Logo
    logo: string | null;
    
    // Default settings
    default_currency: string;
    default_tax_rate: number;
    default_payment_terms: string | null;
    
    created_at: string;
    updated_at: string;
}

// Input type for creating/updating
export interface BusinessInfoInput {
    company_name?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    email?: string;
    phone?: string;
    website?: string;
    siret?: string;
    tva_number?: string;
    ape_code?: string;
    rcs?: string;
    iban?: string;
    bic?: string;
    bank_name?: string;
    logo?: string;
    default_currency?: string;
    default_tax_rate?: number;
    default_payment_terms?: string;
}

/**
 * Get the current user's business info
 */
export async function getBusinessInfo(): Promise<{ data: UserBusinessInfo | null; error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: 'Non authentifié' };
    }

    const { data, error } = await supabase
        .from('user_business_info')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error && error.code !== 'PGRST116') {
        return { data: null, error: error.message };
    }

    return { data: data || null, error: null };
}

/**
 * Save or update the user's business info
 */
export async function saveBusinessInfo(info: BusinessInfoInput): Promise<{ data: UserBusinessInfo | null; error: string | null }> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: 'Non authentifié' };
    }

    // Check if record exists
    const { data: existing } = await supabase
        .from('user_business_info')
        .select('id')
        .eq('user_id', user.id)
        .single();

    if (existing) {
        // Update existing record
        const { data, error } = await supabase
            .from('user_business_info')
            .update({
                ...info,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            return { data: null, error: error.message };
        }
        return { data, error: null };
    } else {
        // Create new record
        const { data, error } = await supabase
            .from('user_business_info')
            .insert({
                user_id: user.id,
                ...info
            })
            .select()
            .single();

        if (error) {
            return { data: null, error: error.message };
        }
        return { data, error: null };
    }
}

/**
 * Convert business info to issuer format for invoice
 */
export function businessInfoToIssuer(info: UserBusinessInfo | null): {
    name: string;
    address: string;
    siret: string;
    email: string;
    phone: string;
    visibility: {
        address: boolean;
        siret: boolean;
        email: boolean;
        phone: boolean;
    };
    customFields: Array<{ id: string; label: string; value: string; visible: boolean }>;
} {
    if (!info) {
        return {
            name: '',
            address: '',
            siret: '',
            email: '',
            phone: '',
            visibility: {
                address: true,
                siret: true,
                email: true,
                phone: true,
            },
            customFields: [],
        };
    }

    // Build address string
    const addressParts = [
        info.address,
        [info.postal_code, info.city].filter(Boolean).join(' '),
        info.country !== 'France' ? info.country : null
    ].filter(Boolean);

    return {
        name: info.company_name || '',
        address: addressParts.join('\n'),
        siret: info.siret || '',
        email: info.email || '',
        phone: info.phone || '',
        visibility: {
            address: true,
            siret: true,
            email: true,
            phone: true,
        },
        customFields: [
            ...(info.tva_number ? [{ id: 'tva', label: 'N° TVA', value: info.tva_number, visible: true }] : []),
            ...(info.rcs ? [{ id: 'rcs', label: 'RCS', value: info.rcs, visible: true }] : []),
        ],
    };
}
