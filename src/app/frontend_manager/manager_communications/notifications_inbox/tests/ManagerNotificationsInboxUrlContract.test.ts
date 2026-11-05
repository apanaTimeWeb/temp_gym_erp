import { MANAGER_NOTIFICATIONS_INBOX_API } from '@/app/frontend_manager/manager_communications/notifications_inbox/config/manager_notifications_inbox.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_notifications API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_NOTIFICATIONS_INBOX_API.BASE).toBe("/api/v1/manager/notifications"); });
  it('matches the feature API contract for DELETE', () => { expect(MANAGER_NOTIFICATIONS_INBOX_API.DELETE('sample-id')).toBe("/api/v1/manager/notifications/sample-id"); });
  it('matches the feature API contract for KPIS', () => { expect(MANAGER_NOTIFICATIONS_INBOX_API.KPIS).toBe("/api/v1/manager/notifications/kpis"); });
  it('matches the feature API contract for MARK_ALL_READ', () => { expect(MANAGER_NOTIFICATIONS_INBOX_API.MARK_ALL_READ).toBe("/api/v1/manager/notifications/read-all"); });
  it('matches the feature API contract for MARK_READ', () => { expect(MANAGER_NOTIFICATIONS_INBOX_API.MARK_READ('sample-id')).toBe("/api/v1/manager/notifications/sample-id/read"); });
});
