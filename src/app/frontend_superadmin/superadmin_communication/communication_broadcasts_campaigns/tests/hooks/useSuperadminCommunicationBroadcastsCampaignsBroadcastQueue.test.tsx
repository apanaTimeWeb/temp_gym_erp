import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue';
import { MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery', () => ({ useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery: vi.fn() }));

const mockedUseDelivery = vi.mocked(useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery);
const recipients = [
  { id: 'gym-1', name: 'Iron Peak Fitness', phone: '9876543210' },
  { id: 'gym-2', name: 'FitZone Studio', phone: '9876543211' },
];

beforeEach(() => vi.clearAllMocks());

describe('useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue', () => {
  it('delivers recipients sequentially and reports the final response', async () => {
    const deliverRecipient = vi.fn()
      .mockResolvedValueOnce({ success: true, message: 'First delivered', data: { broadcast: MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0]!, recipientId: 'gym-1', deliveryStatus: 'DELIVERED' } })
      .mockResolvedValueOnce({ success: true, message: 'Queue complete', data: { broadcast: MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0]!, recipientId: 'gym-2', deliveryStatus: 'DELIVERED' } });
    mockedUseDelivery.mockReturnValue({ deliverRecipient, isDelivering: false, deliveryError: null });
    const onComplete = vi.fn();

    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue({ isOpen: true, recipients, broadcastId: 'broadcast-1', onComplete }));

    await waitFor(() => expect(onComplete).toHaveBeenCalledWith('Queue complete'));
    expect(deliverRecipient).toHaveBeenNthCalledWith(1, { broadcastId: 'broadcast-1', recipientId: 'gym-1' });
    expect(deliverRecipient).toHaveBeenNthCalledWith(2, { broadcastId: 'broadcast-1', recipientId: 'gym-2' });
    expect(result.current.states['gym-1']).toBe('DELIVERED');
    expect(result.current.states['gym-2']).toBe('DELIVERED');
  });

  it('stops on a failed recipient and resumes only after explicit retry', async () => {
    const deliverRecipient = vi.fn()
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockResolvedValueOnce({ success: true, message: 'Retry complete', data: { broadcast: MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0]!, recipientId: 'gym-1', deliveryStatus: 'DELIVERED' } });
    mockedUseDelivery.mockReturnValue({ deliverRecipient, isDelivering: false, deliveryError: null });
    const onComplete = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue({ isOpen: true, recipients: [recipients[0]!], broadcastId: 'broadcast-1', onComplete }));

    await waitFor(() => expect(result.current.states['gym-1']).toBe('FAILED'));
    expect(deliverRecipient).toHaveBeenCalledTimes(1);
    act(() => result.current.retryRecipient('gym-1'));
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith('Retry complete'));
    expect(deliverRecipient).toHaveBeenCalledTimes(2);
  });
});
