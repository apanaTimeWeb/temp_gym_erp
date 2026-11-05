import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminSupportTicketsManagementErrorBoundary } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/SuperadminSupportTicketsManagementErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('support_tickets_management local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminSupportTicketsManagementErrorBoundary><ExplodingChild fail={true} /></SuperadminSupportTicketsManagementErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminSupportTicketsManagementErrorBoundary><ExplodingChild fail={false} /></SuperadminSupportTicketsManagementErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
