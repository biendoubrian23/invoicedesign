"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useInvoiceStore } from '@/store';
import { Client, listClients, createClient, getClientByName, saveClientState, loadClientState } from '@/services/clientService';
import { ChevronDown, Plus, Users, Loader2 } from 'lucide-react';

interface ClientComboboxProps {
    value: string;
    onChange: (value: string) => void;
}

const ClientCombobox = ({ value, onChange }: ClientComboboxProps) => {
    const { user } = useAuth();
    const {
        invoice,
        blocks,
        selectedTemplate,
        setCurrentClientId,
        currentClientId,
        loadClientInvoiceState
    } = useInvoiceStore();

    const [clients, setClients] = useState<Client[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load clients on mount
    useEffect(() => {
        if (user) {
            loadClients();
        }
    }, [user]);

    // Sync search term with value
    useEffect(() => {
        setSearchTerm(value);
    }, [value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadClients = async () => {
        const { data } = await listClients();
        setClients(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        onChange(newValue);
        setIsOpen(true);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
        if (user) loadClients();
    };

    const handleSelectClient = async (client: Client) => {
        onChange(client.name);
        setSearchTerm(client.name);
        setIsOpen(false);
        setCurrentClientId(client.id);

        // Load client's saved invoice state
        setLoading(true);
        const { data: state } = await loadClientState(client.id);
        if (state && state.invoice_data && Object.keys(state.invoice_data).length > 0) {
            loadClientInvoiceState(state.invoice_data, state.blocks_data, state.selected_template);
        }
        setLoading(false);
    };

    const handleCreateNew = async () => {
        if (!searchTerm.trim() || !user) return;

        setCreating(true);
        const { data: newClient, error } = await createClient(searchTerm.trim());

        if (newClient && !error) {
            setClients(prev => [...prev, newClient].sort((a, b) => a.name.localeCompare(b.name)));
            setCurrentClientId(newClient.id);
            onChange(newClient.name);
        }
        setCreating(false);
        setIsOpen(false);
    };

    const handleInputBlur = async () => {
        // Small delay to allow click events to fire first
        setTimeout(async () => {
            if (!isOpen && searchTerm.trim() && user) {
                // Check if this client exists
                const { data: existingClient } = await getClientByName(searchTerm.trim());

                if (!existingClient) {
                    // Auto-create client
                    const { data: newClient } = await createClient(searchTerm.trim());
                    if (newClient) {
                        setClients(prev => [...prev, newClient].sort((a, b) => a.name.localeCompare(b.name)));
                        setCurrentClientId(newClient.id);
                    }
                } else if (!currentClientId || existingClient.id !== currentClientId) {
                    setCurrentClientId(existingClient.id);
                }
            }
        }, 200);
    };

    // Filter clients based on search
    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exactMatch = clients.find(c => c.name.toLowerCase() === searchTerm.toLowerCase());

    if (!user) {
        // Not logged in - just show regular input
        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Société
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Nom de la société"
                />
            </div>
        );
    }

    return (
        <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Société
                {currentClientId && (
                    <span className="ml-2 text-xs text-blue-600 font-normal">
                        (Client enregistré)
                    </span>
                )}
            </label>

            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Rechercher ou créer..."
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredClients.length > 0 ? (
                        <>
                            {filteredClients.map((client) => (
                                <button
                                    key={client.id}
                                    type="button"
                                    onClick={() => handleSelectClient(client)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors ${currentClientId === client.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-medium text-gray-600">
                                            {client.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{client.name}</p>
                                        {client.city && (
                                            <p className="text-xs text-gray-400">{client.city}</p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            <Users className="w-5 h-5 mx-auto mb-1 text-gray-300" />
                            <p className="text-center">Aucun client trouvé</p>
                        </div>
                    )}

                    {/* Create new option */}
                    {searchTerm.trim() && !exactMatch && (
                        <button
                            type="button"
                            onClick={handleCreateNew}
                            disabled={creating}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 border-t border-gray-100 transition-colors"
                        >
                            {creating ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}
                            Créer "{searchTerm.trim()}"
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClientCombobox;
