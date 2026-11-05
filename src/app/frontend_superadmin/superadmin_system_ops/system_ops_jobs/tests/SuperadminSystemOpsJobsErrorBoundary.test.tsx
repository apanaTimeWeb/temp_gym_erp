import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminSystemOpsJobsErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('system_ops_jobs local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminSystemOpsJobsErrorBoundary><ExplodingChild fail={true} /></SuperadminSystemOpsJobsErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminSystemOpsJobsErrorBoundary><ExplodingChild fail={false} /></SuperadminSystemOpsJobsErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.boundary_retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
