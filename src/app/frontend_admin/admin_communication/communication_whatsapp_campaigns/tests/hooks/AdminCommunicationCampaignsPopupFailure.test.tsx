// RESPONSIBILITY: Browser failures must not mark queued recipients as opened.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminCampaignsLogic } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic';
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

function mockQueries() {
  vi.mocked(useQuery).mockImplementation((options) => {
    const key = JSON.stringify(options.queryKey);
    if (key.includes('templates')) return { data: { data: [{ id: 'tpl1', body: 'Hi {name}' }] }, status: 'success' } as never;
    if (key.includes('audiences')) return { data: { data: [{ id: 'aud1' }] }, status: 'success' } as never;
    return { data: { data: { recipients: [{ id: 'r1', name: 'Riya', phone: '919876543210' }] } }, status: 'success' } as never;
  });
}

afterEach(() => { vi.restoreAllMocks(); vi.clearAllMocks(); });
describe('WhatsApp campaigns popup failures', () => {
  it('preserves QUEUED when window.open throws rather than returning null', () => {
    mockQueries();
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => { throw new Error('Popup denied'); });
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    act(() => result.current.createQueue());
    let opened = true;
    act(() => { opened = result.current.openQueueItem(0); });
    expect(opened).toBe(false);
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(result.current.queue[0]?.status).toBe('QUEUED');
    expect(result.current.queueActionErrorKey).toBe('campaigns.AdminRepair.popupBlocked');
  });
  it('preserves QUEUED when navigation and popup cleanup both throw', () => {
    mockQueries();
    const popup = { opener: null, location: { replace: () => { throw new Error('Navigation denied'); } }, close: () => { throw new Error('Close denied'); } };
    vi.spyOn(window, 'open').mockReturnValue(popup as unknown as Window);
    const { result } = renderHook(() => useAdminCampaignsLogic());
    act(() => result.current.selectAudience('aud1'));
    act(() => result.current.selectTemplate('tpl1'));
    act(() => result.current.createQueue());
    let opened = true;
    act(() => { opened = result.current.openQueueItem(0); });
    expect(opened).toBe(false);
    expect(result.current.queue[0]?.status).toBe('QUEUED');
    expect(result.current.queueActionErrorKey).toBe('campaigns.AdminRepair.openFailed');
  });
});
