import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminTeamManagementPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_team/team_management/components/SuperadminTeamManagementPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('team_management suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminTeamManagementPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
