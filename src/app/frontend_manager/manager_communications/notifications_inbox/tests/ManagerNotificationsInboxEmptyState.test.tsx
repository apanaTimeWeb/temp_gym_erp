import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerNotificationsInboxEmptyState from '@/app/frontend_manager/manager_communications/notifications_inbox/components/ManagerNotificationsInboxEmptyState';

describe('ManagerNotificationsInboxEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerNotificationsInboxEmptyState />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager-notifications-inbox-empty-state');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_NOTIFICATIONS_FOUND');
  });
});
