import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/notifications_inbox/hooks/useManagerNotificationsInboxMutations';

describe('useManagerNotificationsInboxMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerNotificationsInboxMutations).toBe('function');
  });
});
