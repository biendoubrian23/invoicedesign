import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);
        
        if (!error) {
            // Add user to Brevo contact list
            if (data?.user) {
                try {
                    await fetch(`${origin}/api/brevo/add-contact`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: data.user.email,
                            name: data.user.user_metadata?.full_name || '',
                        }),
                    });
                } catch (brevoError) {
                    // Log but don't block the flow
                    console.error('Brevo sync error:', brevoError);
                }
            }
            
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Return error page or redirect to login
    return NextResponse.redirect(`${origin}/auth/login?error=callback_error`);
}
