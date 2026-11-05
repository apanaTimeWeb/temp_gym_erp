import { describe, expect, it } from 'vitest';

import { getSuperadminTeamStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants';



describe('getSuperadminTeamStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminTeamStatusBadgeClasses('ACTIVE')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminTeamStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
