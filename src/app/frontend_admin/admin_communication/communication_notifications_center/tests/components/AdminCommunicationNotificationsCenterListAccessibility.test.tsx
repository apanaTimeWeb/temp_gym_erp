import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminNotificationsList from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/list/AdminCommunicationNotificationsCenterList';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'notifications.AdminRepair.markAsRead': 'Mark as read',
    'notifications.AdminRepair.read': 'Read',
  })[key] ?? key,
}));

describe('AdminCommunicationNotificationsCenterList accessibility', () => {
  it('exposes read-state action labels and preserves read-only click behavior', () => {
    const onMarkAsRead = vi.fn();
    render(<AdminNotificationsList notifications={[
      { id: 'unread-1', text: 'Payment received', time: 'Now', unread: true },
      { id: 'read-1', text: 'Monthly summary', time: 'Yesterday', unread: false },
    ]} onMarkAsRead={onMarkAsRead} />);

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Payment received. Mark as read' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monthly summary. Read' }));
    expect(onMarkAsRead).toHaveBeenCalledTimes(1);
    expect(onMarkAsRead).toHaveBeenCalledWith('unread-1');
  });
});
