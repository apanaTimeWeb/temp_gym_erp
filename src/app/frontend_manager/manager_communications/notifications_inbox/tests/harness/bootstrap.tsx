// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for notifications_inbox.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerNotificationsInboxHarness } from '@/app/frontend_manager/manager_communications/notifications_inbox/tests/harness/ManagerNotificationsInboxHarness';

export function renderManagerNotificationsInbox(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerNotificationsInboxHarness>{children}</ManagerNotificationsInboxHarness> });
}
