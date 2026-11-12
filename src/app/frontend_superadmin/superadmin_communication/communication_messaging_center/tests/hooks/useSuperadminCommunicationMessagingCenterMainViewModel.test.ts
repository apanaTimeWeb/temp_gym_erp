// DATA FLOW: API / URL state / module client state → useSuperadminCommunicationMessagingCenterMainViewModel → superadmin_communication_messaging view components.
import { describe, expect, it, vi } from 'vitest';

describe('useSuperadminCommunicationMessagingCenterMainViewModel', () => {
  it('keeps the view-model module owned and exposes the documented UI orchestration surface', async () => {
    const source = await import('@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterMainViewModel');
    expect(source.useSuperadminCommunicationMessagingCenterMainViewModel).toBeTypeOf('function');
    expect(vi.isMockFunction(source.useSuperadminCommunicationMessagingCenterMainViewModel)).toBe(false);
  }, 15000);
});
