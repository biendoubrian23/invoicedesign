"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    clientName: string;
    isDeleting?: boolean;
    title?: string;
    customWarning?: React.ReactNode;
}

const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    clientName,
    isDeleting = false,
    title,
    customWarning
}: DeleteConfirmModalProps) => {
    const { t } = useLanguage();
    const [confirmText, setConfirmText] = useState('');
    const [error, setError] = useState('');

    const displayTitle = title || t('deleteModal.deleteClient');

    // Reset on open/close
    useEffect(() => {
        if (isOpen) {
            setConfirmText('');
            setError('');
        }
    }, [isOpen]);

    const handleConfirm = async () => {
        if (confirmText !== clientName) {
            setError(t('deleteModal.nameMismatch') || 'Le nom ne correspond pas');
            return;
        }

        setError('');
        await onConfirm();
    };

    const isValid = confirmText === clientName;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal - sharp corners */}
            <div className="relative bg-white w-full max-w-md mx-4 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-red-50">
                    <h2 className="text-lg font-bold text-gray-900">
                        {displayTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-red-100 transition-colors"
                        disabled={isDeleting}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {customWarning ? customWarning : (
                        <div className="bg-amber-50 border border-amber-200 p-4">
                            <p className="text-sm text-amber-800">
                                <strong>{t('deleteModal.warning')}</strong> {t('deleteModal.irreversible')}
                            </p>
                            <ul className="mt-2 text-sm text-amber-700 list-disc list-inside space-y-1">
                                <li>{t('deleteModal.folder')} <strong>{clientName}</strong></li>
                                <li>{t('deleteModal.allFiles')}</li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('deleteModal.confirmType') || 'Pour confirmer, tapez'} <strong className="text-red-600">{clientName}</strong> :
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder={clientName}
                            disabled={isDeleting}
                            className="w-full px-4 py-3 text-sm border-2 border-gray-300 bg-white focus:outline-none focus:border-red-500 transition-colors"
                        />
                        {error && (
                            <p className="mt-1 text-sm text-red-600">{error}</p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!isValid || isDeleting}
                        className={`flex-1 px-4 py-3 text-sm font-medium text-white transition-colors ${isValid && !isDeleting
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        {isDeleting ? t('deleteModal.deleting') : t('common.delete')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;

