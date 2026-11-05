'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys → consuming feature component.
import { useCallback, useMemo, useRef } from 'react';

/**
 * @description Owns idempotency-key lifecycle for broadcast user intents. One key is created per logical intent and retained across retries until the server confirms success.
 * @dependencies React refs/memoization only; no API, query, or UI dependencies.
 * @edge-case Failed retries reuse the same key. A new create flow explicitly resets the create key, while resource-scoped update/delete/send keys remain isolated by broadcast ID.
 */
export function useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys() {
    const createKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
    const updateKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());
    const deleteKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());
    const sendKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());

    const getCreateKey = useCallback((intent: unknown) => {
        const fingerprint = JSON.stringify(intent);
        if (!createKeyRef.current || createKeyRef.current.fingerprint !== fingerprint) createKeyRef.current = { fingerprint, key: crypto.randomUUID() };
        return createKeyRef.current.key;
    }, []);
    const clearCreateKey = useCallback(() => { createKeyRef.current = null; }, []);
    const getUpdateKey = useCallback((id: string, intent: unknown) => getResourceKey(updateKeysRef.current, id, intent), []);
    const clearUpdateKey = useCallback((id: string) => updateKeysRef.current.delete(id), []);
    const getDeleteKey = useCallback((id: string) => getResourceKey(deleteKeysRef.current, id, { action: 'delete', id }), []);
    const clearDeleteKey = useCallback((id: string) => deleteKeysRef.current.delete(id), []);
    const getSendKey = useCallback((id: string) => getResourceKey(sendKeysRef.current, id, { action: 'send', id }), []);
    const clearSendKey = useCallback((id: string) => sendKeysRef.current.delete(id), []);

    return useMemo(() => ({
        getCreateKey,
        clearCreateKey,
        getUpdateKey,
        clearUpdateKey,
        getDeleteKey,
        clearDeleteKey,
        getSendKey,
        clearSendKey,
    }), [
        getCreateKey,
        clearCreateKey,
        getUpdateKey,
        clearUpdateKey,
        getDeleteKey,
        clearDeleteKey,
        getSendKey,
        clearSendKey,
    ]);
}

function getResourceKey(store: Map<string, { fingerprint: string; key: string }>, id: string, intent: unknown) {
    const fingerprint = JSON.stringify(intent);
    const existing = store.get(id);
    if (existing?.fingerprint === fingerprint) return existing.key;
    const generated = crypto.randomUUID();
    store.set(id, { fingerprint, key: generated });
    return generated;
}
