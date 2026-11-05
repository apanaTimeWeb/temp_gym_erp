import { describe, expect, it } from 'vitest';

import { SUPERADMIN_DASHBOARD_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants';
import { SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES, SUPERADMIN_DASHBOARD_CHART_COLORS, DASHBOARD_PLAN_BADGE_CLASSES, DASHBOARD_PLAN_BADGE_FALLBACK_CLASS, getDashboardPlanBadgeClass, DASHBOARD_TIME_RANGE_LABEL_KEYS, SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';


describe('SuperadminDashboardConstants', () => {
  it('uses semantic status tokens for every alert tone', () => { for (const tone of Object.values(SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES)) { expect(tone.badge).toMatch(/bg-(danger|warning|info)-bg/); expect(tone.icon).toMatch(/text-(danger|warning|info)/); } });
  it('uses semantic chart token references', () => { expect(SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY).toBe('var(--chart-primary)'); expect(SUPERADMIN_DASHBOARD_CHART_COLORS.DANGER).toBe('var(--chart-danger)'); expect(SUPERADMIN_DASHBOARD_CHART_COLORS.GRID).toBe('var(--chart-grid)'); });
  it('uses one canonical range vocabulary for selector and localized suffix keys', () => { expect(Object.keys(DASHBOARD_TIME_RANGE_LABEL_KEYS).sort()).toEqual([...SUPERADMIN_DASHBOARD_TIME_RANGES].sort()); expect(DASHBOARD_PLAN_BADGE_CLASSES).toHaveProperty('PRO'); expect(getDashboardPlanBadgeClass(' pro ')).toBe(DASHBOARD_PLAN_BADGE_CLASSES.PRO); expect(getDashboardPlanBadgeClass('unknown')).toBe(DASHBOARD_PLAN_BADGE_FALLBACK_CLASS); expect(DASHBOARD_PLAN_BADGE_FALLBACK_CLASS).toContain('bg-input'); expect(SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER).toBe(1); });
});
