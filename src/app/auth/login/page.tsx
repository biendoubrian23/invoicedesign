"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message === 'Invalid login credentials'
                ? 'Email ou mot de passe incorrect'
                : error.message
            );
            setLoading(false);
        } else {
            router.push(redirectTo);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Connexion
            </h1>
            <p className="text-gray-600 text-center mb-8">
                Accedez a votre espace de creation de factures
            </p>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="vous@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                        Creer un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/logoheader.png"
                            alt="InvoiceDesign"
                            width={180}
                            height={40}
                            className="h-10 w-auto mx-auto"
                        />
                    </Link>
                </div>

                {/* Card */}
                <Suspense fallback={<div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse h-96" />}>
                    <LoginForm />
                </Suspense>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                        ← Retour a l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}

