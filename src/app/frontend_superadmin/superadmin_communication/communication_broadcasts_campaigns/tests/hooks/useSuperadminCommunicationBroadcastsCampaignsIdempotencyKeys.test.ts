import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys';



describe('useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys', () => {
    it('reuses a create key until the intent succeeds and is explicitly cleared', () => {
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys());
        const first = result.current.getCreateKey({ title: 'A', content: 'body' });
        const retry = result.current.getCreateKey({ title: 'A', content: 'body' });
        expect(retry).toBe(first);
        expect(result.current.getCreateKey({ title: 'B', content: 'body' })).not.toBe(first);

        act(() => result.current.clearCreateKey());
        expect(result.current.getCreateKey({ title: 'B', content: 'body' })).not.toBe(first);
    });

    it('isolates resource-scoped keys by broadcast ID', () => {
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys());
        const updateA = result.current.getUpdateKey('broadcast-a', { title: 'A' });
        const updateARetry = result.current.getUpdateKey('broadcast-a', { title: 'A' });
        const updateB = result.current.getUpdateKey('broadcast-b', { title: 'B' });
        expect(updateARetry).toBe(updateA);
        expect(updateB).not.toBe(updateA);
    });

    it('allows one intent to be cleared without affecting another resource', () => {
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys());
        const deleteA = result.current.getDeleteKey('broadcast-a');
        const deleteB = result.current.getDeleteKey('broadcast-b');
        act(() => result.current.clearDeleteKey('broadcast-a'));
        expect(result.current.getDeleteKey('broadcast-b')).toBe(deleteB);
        expect(result.current.getDeleteKey('broadcast-a')).not.toBe(deleteA);
    });
});
