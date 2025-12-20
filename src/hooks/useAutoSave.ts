"use client";

import { useEffect, useRef, useCallback } from 'react';
import { useInvoiceStore } from '@/store';
import { useAuth } from '@/context/AuthContext';
import { saveClientState } from '@/services/clientService';

/**
 * Hook to automatically save invoice state when changes occur
 * Uses debouncing to avoid excessive API calls
 * 
 * SIMPLE LOGIC:
 * - When user modifies anything, wait 2 seconds then save to current client
 * - When user switches client, the save happens in ClientsPanel BEFORE loading new client
 * - This hook only handles auto-save during editing, not client switching
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
    const currentClientIdRef = useRef<string | null>(null);

    // Update client ref when it changes
    useEffect(() => {
        if (currentClientId !== currentClientIdRef.current) {
            // Client changed - clear pending saves and reset tracking
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            currentClientIdRef.current = currentClientId;
            // Reset lastSaved to allow saving the NEW client's state after modifications
            lastSavedRef.current = '';
        }
    }, [currentClientId]);

    useEffect(() => {
        // Skip if:
        // - No user logged in
        // - No client selected
        // - Currently loading a client (prevents saving old data)
        if (!user || !currentClientId || isLoadingClient) {
            return;
        }

        // Create a hash of the current state to detect changes
        const currentState = JSON.stringify({ invoice, blocks, selectedTemplate });

        // Skip if nothing changed since last save
        if (currentState === lastSavedRef.current) {
            return;
        }

        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Debounce: wait 2 seconds after last change before saving
        timeoutRef.current = setTimeout(async () => {
            // Double-check we're still on the same client
            if (currentClientIdRef.current !== currentClientId) {
                return;
            }

            try {
                await saveClientState(
                    currentClientId,
                    invoice,
                    blocks,
                    selectedTemplate || 'classic'
                );
                lastSavedRef.current = currentState;
                console.log('[AutoSave] Saved state for client:', currentClientId);
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

/**
 * Hook to force save the current client state immediately
 * Used when exporting PDF/Image to ensure state is saved
 */
export function useSaveClientState() {
    const { user } = useAuth();
    const {
        invoice,
        blocks,
        selectedTemplate,
        currentClientId
    } = useInvoiceStore();

    const saveNow = useCallback(async () => {
        if (!user || !currentClientId) {
            console.log('[SaveNow] No user or client, skipping');
            return;
        }

        try {
            await saveClientState(
                currentClientId,
                invoice,
                blocks,
                selectedTemplate || 'classic'
            );
            console.log('[SaveNow] State saved for client:', currentClientId);
        } catch (error) {
            console.error('[SaveNow] Error saving client state:', error);
        }
    }, [user, currentClientId, invoice, blocks, selectedTemplate]);

    return { saveNow };
}
