import { MANAGER_NOTIFICATIONS_INBOX_API } from '@/app/frontend_manager/manager_communications/notifications_inbox/config/manager_notifications_inbox.url_config';
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox.constants';
import { MOCK_NOTIFICATIONS, MOCK_NOTIFICATION_KPIS } from '@/app/frontend_manager/manager_communications/notifications_inbox/mocks/fixtures/ManagerNotificationsInboxMockData';


let notifications = structuredClone(MOCK_NOTIFICATIONS);

/**
 * @description Provides the ManagerNotificationsInboxMockHandlers implementation for the notifications module.
 * @dependencies @/app/frontend_manager/manager_communications/manager_notifications_mocks/manager_notifications_mocks_fixtures/ManagerNotificationsInboxMockData; @/app/frontend_manager/manager_communications/manager_notifications_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerNotificationsInboxMockState(): void {
  notifications = structuredClone(MOCK_NOTIFICATIONS);
}

export const managerNotificationsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const type = url.searchParams.get('type') ?? 'ALL';
    const priority = url.searchParams.get('priority') ?? 'ALL';
    const status = url.searchParams.get('status') ?? 'ALL';
    const items = notifications.filter((item) =>
      (!search || item.title.toLowerCase().includes(search) || item.message.toLowerCase().includes(search) || Boolean(item.memberName?.toLowerCase().includes(search))) &&
      (type === 'ALL' || item.type === type) &&
      (priority === 'ALL' || item.priority === priority) &&
      (status === MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.ALL || item.status === status),
    );
    return HttpResponse.json({ success: true, message: 'Notifications fetched', data: { notifications: items, total: items.length } });
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.KPIS), () =>
    HttpResponse.json({ success: true, message: 'Notification KPIs fetched', data: { ...MOCK_NOTIFICATION_KPIS, total: notifications.length, unread: notifications.filter((n) => n.status === MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.UNREAD).length } }),
  ),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.MARK_READ(':id')), ({ params }) => {
    notifications = notifications.map((n) => n.id === params.id ? { ...n, status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.READ, readAt: new Date().toISOString() } : n);
    return HttpResponse.json({ success: true, message: 'Notification marked as read', data: null });
  }),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.MARK_ALL_READ), () => {
    notifications = notifications.map((n) => ({ ...n, status: MANAGER_NOTIFICATIONS_INBOX_STATUS_VALUES.READ, readAt: new Date().toISOString() }));
    return HttpResponse.json({ success: true, message: 'All notifications marked as read', data: null });
  }),
  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_NOTIFICATIONS_INBOX_API.DELETE(':id')), ({ params }) => {
    notifications = notifications.filter((n) => n.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Notification dismissed', data: null });
  }),
];
