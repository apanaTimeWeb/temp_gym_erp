// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryProfileDrawer.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/components/profile_drawer/AdminMembersDirectoryProfileDrawer.test.tsx)

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminMembersProfileDrawer from '@/app/frontend_admin/admin_members/members_directory/components/profile_drawer/AdminMembersDirectoryProfileDrawer';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

describe('AdminMembersProfileDrawer query states', () => {
  it('shows a loading state for a URL-addressed member while details are pending', () => {
    render(<AdminMembersProfileDrawer member={null} status="pending" error="" onRetry={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByTestId('admin_members-admin_members-profile-drawer-loading')).toHaveAttribute('aria-busy', 'true');
  });

  it('announces a failed detail request and allows retry', () => {
    const onRetry = vi.fn();
    render(<AdminMembersProfileDrawer member={null} status="error" error="" onRetry={onRetry} onClose={vi.fn()} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'members.AdminAuditRepair.retryProfile' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
