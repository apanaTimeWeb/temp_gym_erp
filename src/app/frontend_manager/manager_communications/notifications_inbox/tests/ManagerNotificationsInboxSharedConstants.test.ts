import { describe, expect, it } from 'vitest';

import { NOTIFICATION_PRIORITY_OPTIONS, NOTIFICATION_STATUS_OPTIONS, NOTIFICATION_TYPE_OPTIONS, NOTIFICATION_TYPE_STYLES } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox_shared.constants';


describe('ManagerNotificationsInboxSharedConstants', () => {
  it('keeps notification filter options stable', () => {
    expect(NOTIFICATION_TYPE_OPTIONS[0]).toBe('ALL');
    expect(NOTIFICATION_PRIORITY_OPTIONS).toEqual(['ALL', 'HIGH', 'MEDIUM', 'LOW']);
    expect(NOTIFICATION_STATUS_OPTIONS).toEqual(['ALL', 'UNREAD', 'READ']);
    expect(NOTIFICATION_TYPE_STYLES.PAYMENT?.text).toBe('text-success-text');
  });
});
