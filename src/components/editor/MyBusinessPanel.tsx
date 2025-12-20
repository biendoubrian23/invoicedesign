"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
    getBusinessInfo, 
    saveBusinessInfo, 
    UserBusinessInfo,
    BusinessInfoInput 
} from '@/services/businessService';
import { 
    Building2, 
    Save, 
    Loader2, 
    MapPin, 
    Phone, 
    Mail, 
    Globe,
    CreditCard,
    FileText,
    Check
} from 'lucide-react';
import Button from '@/components/ui/Button';

const MyBusinessPanel = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Form state
    const [formData, setFormData] = useState<BusinessInfoInput>({
        company_name: '',
        address: '',
        city: '',
        postal_code: '',
        country: 'France',
        email: '',
        phone: '',
        website: '',
        siret: '',
        tva_number: '',
        ape_code: '',
        rcs: '',
        iban: '',
        bic: '',
        bank_name: '',
        default_currency: '€',
        default_tax_rate: 20,
        default_payment_terms: 'Paiement sous 30 jours par virement bancaire',
    });

    // Load existing data
    useEffect(() => {
        const loadData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const { data, error } = await getBusinessInfo();
            
            if (error) {
                setError(error);
            } else if (data) {
                setFormData({
                    company_name: data.company_name || '',
                    address: data.address || '',
                    city: data.city || '',
                    postal_code: data.postal_code || '',
                    country: data.country || 'France',
                    email: data.email || '',
                    phone: data.phone || '',
                    website: data.website || '',
                    siret: data.siret || '',
                    tva_number: data.tva_number || '',
                    ape_code: data.ape_code || '',
                    rcs: data.rcs || '',
                    iban: data.iban || '',
                    bic: data.bic || '',
                    bank_name: data.bank_name || '',
                    default_currency: data.default_currency || '€',
                    default_tax_rate: data.default_tax_rate || 20,
                    default_payment_terms: data.default_payment_terms || '',
                });
            }
            setLoading(false);
        };

        loadData();
    }, [user]);

    const handleChange = (field: keyof BusinessInfoInput, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        setError(null);

        const { error } = await saveBusinessInfo(formData);

        if (error) {
            setError(error);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }

        setSaving(false);
    };

    if (!user) {
        return (
            <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Mon Entreprise
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        Connectez-vous pour configurer vos informations d'entreprise.
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Mon Entreprise
                    </h3>
                </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500">
                Ces informations seront utilisées comme émetteur par défaut sur toutes vos factures.
            </p>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Company Info Section */}
            <div className="space-y-4">
                <h4 className="text-xs font-medium text-gray-700 uppercase flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Informations société
                </h4>
                
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nom de l'entreprise *</label>
                        <input
                            type="text"
                            value={formData.company_name}
                            onChange={(e) => handleChange('company_name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ma Société SARL"
                        />
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
                <h4 className="text-xs font-medium text-gray-700 uppercase flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Adresse
                </h4>
                
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Adresse</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123 Rue de la Facturation"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Code postal</label>
                            <input
                                type="text"
                                value={formData.postal_code}
                                onChange={(e) => handleChange('postal_code', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="75001"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Ville</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Paris"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
                <h4 className="text-xs font-medium text-gray-700 uppercase flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                </h4>
                
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="contact@masociete.fr"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Téléphone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+33 1 23 45 67 89"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Site web</label>
                        <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://masociete.fr"
                        />
                    </div>
                </div>
            </div>

            {/* Legal Section */}
            <div className="space-y-4">
                <h4 className="text-xs font-medium text-gray-700 uppercase flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Informations légales
                </h4>
                
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">SIRET</label>
                        <input
                            type="text"
                            value={formData.siret}
                            onChange={(e) => handleChange('siret', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123 456 789 00010"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">N° TVA Intracommunautaire</label>
                        <input
                            type="text"
                            value={formData.tva_number}
                            onChange={(e) => handleChange('tva_number', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="FR12345678901"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Code APE</label>
                            <input
                                type="text"
                                value={formData.ape_code}
                                onChange={(e) => handleChange('ape_code', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="6201Z"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">RCS</label>
                            <input
                                type="text"
                                value={formData.rcs}
                                onChange={(e) => handleChange('rcs', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Paris B 123 456 789"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Banking Section */}
            <div className="space-y-4">
                <h4 className="text-xs font-medium text-gray-700 uppercase flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Coordonnées bancaires
                </h4>
                
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">IBAN</label>
                        <input
                            type="text"
                            value={formData.iban}
                            onChange={(e) => handleChange('iban', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">BIC</label>
                            <input
                                type="text"
                                value={formData.bic}
                                onChange={(e) => handleChange('bic', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="BNPAFRPP"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Banque</label>
                            <input
                                type="text"
                                value={formData.bank_name}
                                onChange={(e) => handleChange('bank_name', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="BNP Paribas"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Default Settings */}
            <div className="space-y-4">
                <h4 className="text-xs font-medium text-gray-700 uppercase">
                    Paramètres par défaut
                </h4>
                
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Devise</label>
                            <select
                                value={formData.default_currency}
                                onChange={(e) => handleChange('default_currency', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="€">Euro (€)</option>
                                <option value="$">Dollar ($)</option>
                                <option value="£">Livre (£)</option>
                                <option value="CHF">Franc suisse (CHF)</option>
                                <option value="FCFA">Franc CFA (FCFA)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Taux TVA (%)</label>
                            <input
                                type="number"
                                value={formData.default_tax_rate}
                                onChange={(e) => handleChange('default_tax_rate', parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                                max="100"
                                step="0.1"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Conditions de paiement</label>
                        <textarea
                            value={formData.default_payment_terms}
                            onChange={(e) => handleChange('default_payment_terms', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Paiement sous 30 jours par virement bancaire&#10;IBAN: FR76 XXXX XXXX XXXX"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="sticky bottom-0 pt-4 bg-white border-t">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Enregistrement...
                        </>
                    ) : saved ? (
                        <>
                            <Check className="w-4 h-4 mr-2" />
                            Enregistré !
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer mes informations
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default MyBusinessPanel;
