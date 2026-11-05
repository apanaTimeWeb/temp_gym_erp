import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminSupportTicketsManagementPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/SuperadminSupportTicketsManagementPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('support_tickets_management suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminSupportTicketsManagementPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
