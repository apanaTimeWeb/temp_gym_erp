import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { useSuperadminCommunicationBroadcastsCampaignsPage } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsPage';



const createMutation = { mutateAsync: vi.fn(), isPending: false };
const updateMutation = { mutateAsync: vi.fn(), isPending: false };
const deleteMutation = { mutateAsync: vi.fn(), isPending: false };
const setQueueModalOpen = vi.fn();
const setQueueBroadcastId = vi.fn();

vi.mock('next-intl', () => ({ useTranslations: vi.fn(() => (key: string) => key) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsUnsavedChangesGuard', () => ({ useSuperadminCommunicationBroadcastsCampaignsUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsData', () => ({
    useSuperadminCommunicationBroadcastsCampaignsData: vi.fn(() => ({
        broadcasts: [{ id: 'BCAST-001', title: 'Launch', content: 'Launch', targetGymIds: [], status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, scheduledDate: '' }],
        gyms: [{ id: 'gym-001', name: 'Gold Gym' }],
        status: 'success',
        error: null,
        searchQuery: '',
        setSearchQuery: vi.fn(),
        statusFilter: 'ALL',
        setStatusFilter: vi.fn(),
        currentPage: 1,
        totalPages: 1,
        setCurrentPage: vi.fn(),
    })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsMutations', () => ({
    useSuperadminCommunicationBroadcastsCampaignsMutations: vi.fn(() => ({ createMutation, updateMutation, deleteMutation, isMutating: false })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState', () => ({
    useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState: vi.fn(() => ({
        queueModalOpen: false,
        queueRecipients: [],
        queueBroadcastId: null,
        queueTitle: '',
        setQueueModalOpen,
        setQueueBroadcastId,
        setQueueRecipients: vi.fn(),
        setQueueTitle: vi.fn(),
    })),
}));

describe('useSuperadminCommunicationBroadcastsCampaignsPage', () => {
    beforeEach(() => vi.clearAllMocks());

    it('creates a broadcast with one idempotency key per user intent', async () => {
        createMutation.mutateAsync.mockResolvedValue({ success: true, message: 'Created', data: {} });
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsPage());
        const payload = {
            title: 'Launch',
            content: 'Hello',
            targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT,
            scheduledDate: '',
        };

        await act(async () => { await result.current.handleCreateBroadcast(payload); });
        await act(async () => { await result.current.handleCreateBroadcast(payload); });

        const first = createMutation.mutateAsync.mock.calls[0][0].idempotencyKey;
        const second = createMutation.mutateAsync.mock.calls[1][0].idempotencyKey;
        expect(first).not.toBe(second);
    });

    it('reuses the same create idempotency key after a failed attempt', async () => {
        createMutation.mutateAsync.mockRejectedValueOnce(new Error('create-failed')).mockResolvedValueOnce({ success: true });
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsPage());
        const payload = {
            title: 'Launch',
            content: 'Hello',
            targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT,
            scheduledDate: '',
        };

        await act(async () => { await result.current.handleCreateBroadcast(payload); });
        await act(async () => { await result.current.handleCreateBroadcast(payload); });

        expect(createMutation.mutateAsync.mock.calls[0][0].idempotencyKey)
            .toBe(createMutation.mutateAsync.mock.calls[1][0].idempotencyKey);
    });

    it('clears the create intent key when a new create flow is explicitly opened', async () => {
        createMutation.mutateAsync.mockRejectedValueOnce(new Error('create-failed')).mockResolvedValueOnce({ success: true });
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsPage());
        const payload = {
            title: 'Launch', content: 'Hello', targetGymIds: [],
            status: SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT, scheduledDate: '',
        };

        await act(async () => { await result.current.handleCreateBroadcast(payload); });
        act(() => result.current.openCreateModal());
        await act(async () => { await result.current.handleCreateBroadcast(payload); });

        expect(createMutation.mutateAsync.mock.calls[0][0].idempotencyKey)
            .not.toBe(createMutation.mutateAsync.mock.calls[1][0].idempotencyKey);
    });

    it('keeps delete keys stable across a failed retry for the same broadcast', async () => {
        deleteMutation.mutateAsync.mockRejectedValueOnce(new Error('delete-failed')).mockResolvedValueOnce({ success: true });
        const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsPage());

        await act(async () => { await result.current.handleDeleteBroadcast('BCAST-001'); });
        await act(async () => { await result.current.handleDeleteBroadcast('BCAST-001'); });

        expect(deleteMutation.mutateAsync.mock.calls[0][0].idempotencyKey)
            .toBe(deleteMutation.mutateAsync.mock.calls[1][0].idempotencyKey);
    });
});
