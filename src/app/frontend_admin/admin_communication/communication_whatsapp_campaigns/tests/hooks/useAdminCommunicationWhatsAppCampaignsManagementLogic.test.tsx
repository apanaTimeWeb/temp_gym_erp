// RESPONSIBILITY: Defines regression tests for useAdminCommunicationWhatsAppCampaignsManagementLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_whatsapp_campaigns/tests/hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic.test.tsx)

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminCampaignsLogic } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic';

const audienceResult = { data: { data: [{ id: 'aud1', name: 'Active', description: 'Members with an active plan' }] }, status: 'success', error: null, refetch: vi.fn() };
const templateResult = { data: { data: [{ id: 'tpl1', title: 'Fee reminder', body: 'Hello {name}', type: 'FEE_REMINDER' }] }, status: 'success', error: null, refetch: vi.fn() };
const recipientsResult = { data: { data: { recipients: [{ id: 'r1', name: 'Riya', phone: '9876543210', branchName: 'North' }] } }, status: 'success', error: null, refetch: vi.fn() };

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

function configureQueries(recipientPhone = '9876543210') {
  vi.mocked(useQuery).mockImplementation((options) => {
    const key = JSON.stringify(options.queryKey);
    if (key.includes('audiences')) return audienceResult as never;
    if (key.includes('templates')) return templateResult as never;
    return { ...recipientsResult, data: { data: { recipients: [{ id: 'r1', name: 'Riya', phone: recipientPhone, branchName: 'North' }] } } } as never;
  });
}

describe('useAdminCampaignsLogic', () => {
  beforeEach(() => { configureQueries(); });
  afterEach(() => { vi.clearAllMocks(); });

  it('selects an audience/template and creates recipient-specific queue items', () => {
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    expect(result.current.body).toBe('Hello {name}');
    act(() => { result.current.setBody('Hi {name}, please review your fee.'); expect(result.current.createQueue()).toBe(true); });
    expect(result.current.queue).toHaveLength(1);
    expect(result.current.queue[0]?.message).toBe('Hi Riya, please review your fee.');
  });

  it('does not move an item to OPENED when the browser blocks a popup', () => {
    configureQueries();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    act(() => { result.current.setBody('Hi {name}'); result.current.createQueue(); });
    let opened = true;
    act(() => { opened = result.current.openQueueItem(0); });
    expect(opened).toBe(false);
    expect(result.current.queue[0]?.status).toBe('QUEUED');
    openSpy.mockRestore();
  });

  it('rejects malformed recipient phone values instead of silently opening a broken link', () => {
    configureQueries('invalid-phone');
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    act(() => { result.current.setBody('Hi {name}'); result.current.createQueue(); });
    let opened = true;
    act(() => { opened = result.current.openQueueItem(0); });
    expect(opened).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    expect(result.current.queue[0]?.status).toBe('QUEUED');
    openSpy.mockRestore();
  });

  it('handles a synchronous browser popup exception without changing recipient status', () => {
    configureQueries();
    const spy = vi.spyOn(window, 'open').mockImplementation(() => { throw new Error('blocked'); });
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    act(() => result.current.createQueue());
    let success = true;
    act(() => { success = result.current.openQueueItem(0); });
    expect(success).toBe(false);
    expect(result.current.queue[0]?.status).toBe('QUEUED');
    expect(result.current.queueActionErrorKey).toBe('campaigns.AdminRepair.popupBlocked');
    spy.mockRestore();
  });

});
