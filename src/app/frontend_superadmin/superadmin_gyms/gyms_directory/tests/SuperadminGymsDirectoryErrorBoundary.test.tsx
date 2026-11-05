import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminGymsDirectoryErrorBoundary } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryErrorBoundary';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const ExplodingChild = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failure');
  return <span>Recovered content</span>;
};
describe('gyms_directory local error boundary', () => {
  it('isolates a render failure and exposes an actionable retry', () => {
    const { rerender } = render(<SuperadminGymsDirectoryErrorBoundary><ExplodingChild fail={true} /></SuperadminGymsDirectoryErrorBoundary>);
    expect(screen.getByRole('alert')).toBeTruthy();
    rerender(<SuperadminGymsDirectoryErrorBoundary><ExplodingChild fail={false} /></SuperadminGymsDirectoryErrorBoundary>);
    fireEvent.click(screen.getByRole('button', { name: 'ui.boundary_retry' }));
    expect(screen.getByText('Recovered content')).toBeTruthy();
  });
});
