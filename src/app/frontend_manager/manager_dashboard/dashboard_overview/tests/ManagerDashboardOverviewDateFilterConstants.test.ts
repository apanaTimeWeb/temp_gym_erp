import { describe, expect, it } from 'vitest';

import { MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/constants/manager_dashboard_overview_date_filter.constants';
import english from '@/app/frontend_manager/manager_dashboard/dashboard_overview/locales/manager_dashboard_overview_en';
import hindi from '@/app/frontend_manager/manager_dashboard/dashboard_overview/locales/manager_dashboard_overview_hi';

describe('ManagerDashboardOverviewDateFilterConstants', () => {
  it('exposes each supported preset exactly once and in stable order', () => {
    expect(MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS.map(({ value }) => value)).toEqual([
      'weekly', 'monthly', 'yearly', 'custom',
    ]);
    expect(new Set(MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS.map(({ value }) => value)).size)
      .toBe(MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS.length);
  });

  it('uses translation keys rather than hardcoded visible labels', () => {
    expect(MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS.map(({ labelKey }) => labelKey)).toEqual([
      'TEXT_TIME_WEEK', 'TEXT_TIME_MONTH', 'TEXT_TIME_YEAR', 'COPY_CUSTOM_RANGE',
    ]);
  });

  it('keeps English and Hindi catalog keys and interpolation variables aligned', () => {
    expect(Object.keys(hindi.MANAGER_DASHBOARD).sort())
      .toEqual(Object.keys(english.MANAGER_DASHBOARD).sort());
    const getTokens = (message: string) => [...message.matchAll(/\{([a-zA-Z0-9_]+)\}/g)]
      .map((match) => match[1]).sort();

    for (const key of Object.keys(english.MANAGER_DASHBOARD) as (keyof typeof english.MANAGER_DASHBOARD)[]) {
      expect(getTokens(hindi.MANAGER_DASHBOARD[key]))
        .toEqual(getTokens(english.MANAGER_DASHBOARD[key]));
    }
  });
});
