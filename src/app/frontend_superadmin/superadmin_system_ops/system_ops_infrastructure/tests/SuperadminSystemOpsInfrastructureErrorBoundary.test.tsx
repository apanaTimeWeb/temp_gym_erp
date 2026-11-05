import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminSystemOpsInfrastructureErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('system_ops_infrastructure local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminSystemOpsInfrastructureErrorBoundary><ExplodingChild fail={true} /></SuperadminSystemOpsInfrastructureErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminSystemOpsInfrastructureErrorBoundary><ExplodingChild fail={false} /></SuperadminSystemOpsInfrastructureErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
