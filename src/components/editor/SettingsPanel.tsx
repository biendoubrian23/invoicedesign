"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Key, Save, Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase/client';

const SettingsPanel = () => {
    const { user } = useAuth();
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setFullName(user.user_metadata?.full_name || '');
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;

        setLoading(true);
        setMessage(null);

        const supabase = getSupabase();

        const { error } = await supabase.auth.updateUser({
            data: { full_name: fullName }
        });

        if (error) {
            setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
        } else {
            setMessage({ type: 'success', text: 'Profil mis à jour !' });
            // Also update profiles table
            await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', user.id);
        }

        setLoading(false);
    };

    if (!user) {
        return (
            <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Paramètres
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        Connectez-vous pour accéder aux paramètres.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Paramètres
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Gérez votre compte et vos préférences
                </p>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-3 rounded-lg text-sm ${message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Profile Section */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profil
                </h4>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                        placeholder="Votre nom"
                    />
                </div>

                {/* Email (read-only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">L&apos;email ne peut pas être modifié</p>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
            </div>

            {/* Security Section */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Sécurité
                </h4>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                        Pour changer votre mot de passe, utilisez la fonction "Mot de passe oublié" sur la page de connexion.
                    </p>
                </div>
            </div>

            {/* Account Info */}
            <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Informations du compte
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">ID utilisateur</span>
                        <span className="text-gray-700 font-mono text-xs">{user.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Date d&apos;inscription</span>
                        <span className="text-gray-700">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
