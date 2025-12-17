"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useInvoiceStore } from '@/store';
import {
    Client,
    listClients,
    createClient,
    deleteClient,
    loadClientState,
    saveClientState
} from '@/services/clientService';
import { Users, Plus, Trash2, Search, User, Loader2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';

const ClientsPanel = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { setActiveSection, loadClientInvoiceState, setCurrentClientId, currentClientId } = useInvoiceStore();

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newClientName, setNewClientName] = useState('');
    const [showNewInput, setShowNewInput] = useState(false);
    const [creating, setCreating] = useState(false);

    // Delete modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadClients = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data, error } = await listClients();

        if (error) {
            setError(error);
        } else {
            setClients(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadClients();
    }, [user]);

    const handleCreateClient = async () => {
        if (!newClientName.trim()) return;

        setCreating(true);
        const { data, error } = await createClient(newClientName.trim());

        if (error) {
            setError(error);
        } else if (data) {
            setClients(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
            setNewClientName('');
            setShowNewInput(false);
        }
        setCreating(false);
    };

    const openDeleteModal = (client: Client) => {
        setClientToDelete(client);
        setDeleteModalOpen(true);
    };

    const handleDeleteClient = async () => {
        if (!clientToDelete) return;

        setIsDeleting(true);
        const { error } = await deleteClient(clientToDelete.id);

        if (error) {
            setError(error);
        } else {
            setClients(prev => prev.filter(c => c.id !== clientToDelete.id));
            if (currentClientId === clientToDelete.id) {
                setCurrentClientId(null);
            }
        }

        setIsDeleting(false);
        setDeleteModalOpen(false);
        setClientToDelete(null);
    };

    const handleSelectClient = async (client: Client) => {
        // Explicitly Save Current Client State before switching
        // This ensures pending changes are saved even if auto-save debounce hasn't fired yet
        const currentStore = useInvoiceStore.getState();
        if (user && currentStore.currentClientId && !currentStore.isLoadingClient) {
            try {
                // Don't await this if you want instant UI switch, but awaiting ensures consistency
                // Given the user issue, let's await it to be 100% sure before loading the next one
                await saveClientState(
                    currentStore.currentClientId,
                    currentStore.invoice,
                    currentStore.blocks,
                    currentStore.selectedTemplate || 'classic'
                );
            } catch (err) {
                console.error("Failed to save previous client state:", err);
            }
        }

        setCurrentClientId(client.id);

        // Load client's saved state
        const { data: state } = await loadClientState(client.id);

        if (state && state.invoice_data && Object.keys(state.invoice_data).length > 0) {
            // Client has saved state - load it
            loadClientInvoiceState(state.invoice_data, state.blocks_data, state.selected_template);
        } else {
            // No saved state - load fresh default state for this new client
            // This ensures we clean up the previous client's data
            loadClientInvoiceState({}, [], 'classic');
        }

        // Navigate to info panel - REMOVED per user request
        // setActiveSection('info');
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!user) {
        return (
            <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    {t('clientsPanel.clients')}
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        {t('clientsPanel.loginRequired')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4 overflow-y-auto h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {t('clientsPanel.clients')}
                </h3>
                <span className="text-xs text-gray-400">{clients.length} {clients.length > 1 ? t('clientsPanel.clientsCount') : t('clientsPanel.clientCount')}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500">
                {t('clientsPanel.description')}
            </p>

            {/* Add Client Button */}
            {showNewInput ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateClient()}
                        placeholder={t('clientsPanel.clientName')}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                    />
                    <Button
                        onClick={handleCreateClient}
                        disabled={creating || !newClientName.trim()}
                        size="sm"
                    >
                        {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'OK'}
                    </Button>
                    <button
                        onClick={() => { setShowNewInput(false); setNewClientName(''); }}
                        className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowNewInput(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {t('clientsPanel.addClient')}
                </button>
            )}

            {/* Search */}
            {clients.length > 3 && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('common.search')}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
            ) : clients.length === 0 ? (
                /* Empty State */
                <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">{t('clientsPanel.noClients')}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        {t('clientsPanel.createFirst')}
                    </p>
                </div>
            ) : (
                /* Client List */
                <div className="space-y-2">
                    {filteredClients.map((client) => (
                        <div
                            key={client.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer group ${currentClientId === client.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            onClick={() => handleSelectClient(client)}
                        >
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${currentClientId === client.id ? 'bg-blue-500' : 'bg-gray-200'
                                }`}>
                                <span className={`text-sm font-semibold ${currentClientId === client.id ? 'text-white' : 'text-gray-600'
                                    }`}>
                                    {client.name.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {client.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {client.city || t('clientsPanel.noAddress')}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); openDeleteModal(client); }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <ArrowRight className={`w-4 h-4 ${currentClientId === client.id ? 'text-blue-500' : 'text-gray-300'
                                    }`} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Current Client Indicator */}
            {currentClientId && (
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        {t('clientsPanel.activeClient')} <span className="font-medium text-gray-900">
                            {clients.find(c => c.id === currentClientId)?.name}
                        </span>
                    </p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setClientToDelete(null); }}
                onConfirm={handleDeleteClient}
                clientName={clientToDelete?.name || ''}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default ClientsPanel;
