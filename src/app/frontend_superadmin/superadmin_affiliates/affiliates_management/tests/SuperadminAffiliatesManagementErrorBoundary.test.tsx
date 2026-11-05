import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminAffiliatesManagementErrorBoundary } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/SuperadminAffiliatesManagementErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('affiliates_management local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminAffiliatesManagementErrorBoundary><ExplodingChild fail={true} /></SuperadminAffiliatesManagementErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminAffiliatesManagementErrorBoundary><ExplodingChild fail={false} /></SuperadminAffiliatesManagementErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
