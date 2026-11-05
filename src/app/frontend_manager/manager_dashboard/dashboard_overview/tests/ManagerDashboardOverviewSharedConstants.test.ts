import { describe, expect, it } from 'vitest';

import { DASHBOARD_PLAN_BG_COLORS, DASHBOARD_RECENT_MEMBERS_PAGE_SIZE, DASHBOARD_STATUS_STYLES, RECENT_MEMBERS_HEADERS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/constants/manager_dashboard_overview_shared.constants';


describe('ManagerDashboardOverviewSharedConstants', () => {
  it('provides semantic dashboard status styles', () => {
    expect(DASHBOARD_STATUS_STYLES.ACTIVE?.text).toBe('text-success-text');
    expect(DASHBOARD_STATUS_STYLES.EXPIRED?.text).toBe('text-danger-text');
  });

  it('keeps the recent-members table contract stable', () => {
    expect(DASHBOARD_RECENT_MEMBERS_PAGE_SIZE).toBe(5);
    expect(RECENT_MEMBERS_HEADERS).toEqual(['COPY_MEMBER', 'COPY_PLAN', 'COPY_STATUS', 'COPY_JOINED', 'COPY_AMOUNT']);
    expect(Object.keys(DASHBOARD_PLAN_BG_COLORS)).toEqual(expect.arrayContaining(['BASIC', 'GOLD', 'PREMIUM']));
  });
});
