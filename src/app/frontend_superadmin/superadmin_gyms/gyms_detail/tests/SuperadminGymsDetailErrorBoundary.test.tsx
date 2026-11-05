import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminGymsDetailErrorBoundary } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('gyms_detail local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminGymsDetailErrorBoundary><ExplodingChild fail={true} /></SuperadminGymsDetailErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminGymsDetailErrorBoundary><ExplodingChild fail={false} /></SuperadminGymsDetailErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.boundary_retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
