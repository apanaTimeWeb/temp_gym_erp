import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminSystemOpsOverviewErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('system_ops_overview local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminSystemOpsOverviewErrorBoundary><ExplodingChild fail={true} /></SuperadminSystemOpsOverviewErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminSystemOpsOverviewErrorBoundary><ExplodingChild fail={false} /></SuperadminSystemOpsOverviewErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.boundary_retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
