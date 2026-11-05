import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminSystemOpsBackupsErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/components/SuperadminSystemOpsBackupsErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('system_ops_backups local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminSystemOpsBackupsErrorBoundary><ExplodingChild fail={true} /></SuperadminSystemOpsBackupsErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminSystemOpsBackupsErrorBoundary><ExplodingChild fail={false} /></SuperadminSystemOpsBackupsErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.boundary_retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
