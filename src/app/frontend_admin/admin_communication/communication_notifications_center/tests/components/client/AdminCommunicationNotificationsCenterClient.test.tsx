// RESPONSIBILITY: Tests the actual Notifications page control and list contract with a translated feature fixture.
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_communication/communication_notifications_center/locales/admin_communication_notifications_center_en.json';
import AdminNotificationsClient from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/client/AdminCommunicationNotificationsCenterClient';
import { useAdminNotificationsPage } from '@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterPage';

vi.mock('@/app/frontend_admin/admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterPage', () => ({ useAdminNotificationsPage: vi.fn() }));
const markAllAsRead = vi.fn();
const markAsRead = vi.fn();
function setup({ pending = false, unread = true } = {}) {
  vi.mocked(useAdminNotificationsPage).mockReturnValue({
    notifications: [
      { id: '1', text: 'Test notification one', time: '5m ago', unread },
      { id: '2', text: 'Test notification two', time: '1h ago', unread: false },
    ],
    status: 'success', isError: false, retry: vi.fn(), markAllAsRead, markAsRead,
    isMarkAllPending: pending,
  } as unknown as ReturnType<typeof useAdminNotificationsPage>);
  return render(<NextIntlClientProvider locale="en" messages={messages}><AdminNotificationsClient /></NextIntlClientProvider>);
}
describe('notifications client', () => {
  it('renders the heading, unread count and actual list', () => {
    setup();
    expect(screen.getByText('All Notifications')).toBeInTheDocument();
    expect(screen.getByText('1 New')).toBeInTheDocument();
    expect(screen.getByText('Test notification one')).toBeInTheDocument();
  });
  it('triggers mark-all through an explicit user click', () => {
    markAllAsRead.mockClear(); setup();
    fireEvent.click(screen.getByRole('button', { name: /Mark all read/i }));
    expect(markAllAsRead).toHaveBeenCalledTimes(1);
  });
  it('disables mark-all while mutation is pending or no unread items remain', () => {
    setup({ pending: true });
    expect(screen.getByRole('button', { name: /Mark all read/i })).toBeDisabled();
  });
  it('disables mark-all when all notifications are read', () => {
    setup({ unread: false });
    expect(screen.getByRole('button', { name: /Mark all read/i })).toBeDisabled();
  });
});
