"use client";

import { useEffect, useRef } from 'react';
import { useInvoiceStore } from '@/store';
import { useAuth } from '@/context/AuthContext';
import { saveClientState } from '@/services/clientService';

/**
 * Hook to automatically save invoice state when changes occur
 * Uses debouncing to avoid excessive API calls
 */
export function useAutoSaveClientState() {
    const { user } = useAuth();
    const {
        invoice,
        blocks,
        selectedTemplate,
        currentClientId,
        isLoadingClient
    } = useInvoiceStore();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSavedRef = useRef<string>('');

    useEffect(() => {
        // Only auto-save if user is logged in, client is selected, and not currently loading client state
        if (!user || !currentClientId || isLoadingClient) return;

        // Create a hash of the current state to detect changes
        const currentState = JSON.stringify({ invoice, blocks, selectedTemplate });

        // Skip if nothing changed
        if (currentState === lastSavedRef.current) return;

        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Debounce: wait 2 seconds after last change before saving
        timeoutRef.current = setTimeout(async () => {
            try {
                await saveClientState(
                    currentClientId,
                    invoice,
                    blocks,
                    selectedTemplate || 'classic'
                );
                lastSavedRef.current = currentState;
                console.log('[AutoSave] Client state saved');
            } catch (error) {
                console.error('[AutoSave] Error saving client state:', error);
            }
        }, 2000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [user, currentClientId, invoice, blocks, selectedTemplate, isLoadingClient]);
}
