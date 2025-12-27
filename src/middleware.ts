import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Simple in-memory rate limiter (pour production, utilisez Upstash Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 60; // requêtes
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute en ms

function getRateLimitInfo(ip: string): { isLimited: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return { isLimited: false, remaining: RATE_LIMIT - 1 };
    }

    if (record.count >= RATE_LIMIT) {
        return { isLimited: true, remaining: 0 };
    }

    record.count++;
    return { isLimited: false, remaining: RATE_LIMIT - record.count };
}

// Nettoyage périodique de la mémoire (toutes les 5 minutes)
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
        if (now - record.lastReset > RATE_LIMIT_WINDOW * 2) {
            rateLimitMap.delete(ip);
        }
    }
}, 5 * 60 * 1000);

export async function middleware(request: NextRequest) {
    // Rate limiting pour les routes API
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   request.headers.get('x-real-ip') || 
                   'anonymous';
        
        const { isLimited, remaining } = getRateLimitInfo(ip);
        
        if (isLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { 
                    status: 429,
                    headers: {
                        'Retry-After': '60',
                        'X-RateLimit-Limit': RATE_LIMIT.toString(),
                        'X-RateLimit-Remaining': '0',
                    }
                }
            );
        }
        
        // Continuer avec la requête mais ajouter les headers de rate limit
        const response = await updateSession(request);
        response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString());
        response.headers.set('X-RateLimit-Remaining', remaining.toString());
        return response;
    }

    // Session update pour les autres routes
    return await updateSession(request);
}

export const config = {
    matcher: [
        // Match all API routes
        '/api/:path*',
        // Match auth-protected routes
        '/dashboard/:path*',
        '/invoice/:path*',
        // Skip static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
