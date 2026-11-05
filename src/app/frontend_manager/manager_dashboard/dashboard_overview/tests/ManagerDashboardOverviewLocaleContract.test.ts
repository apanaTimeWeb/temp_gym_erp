import { describe, expect, it } from 'vitest';
import en from '@/app/frontend_manager/manager_dashboard/dashboard_overview/locales/manager_dashboard_overview_en.json';
import hi from '@/app/frontend_manager/manager_dashboard/dashboard_overview/locales/manager_dashboard_overview_hi.json';

const placeholders = (value: string): string[] =>
  Array.from(value.matchAll(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/g), (match) => match[1]).sort();

describe('Manager Dashboard locale contract', () => {
  it('keeps English and Hindi message keys in parity', () => {
    expect(Object.keys(hi.MANAGER_DASHBOARD).sort()).toEqual(Object.keys(en.MANAGER_DASHBOARD).sort());
  });

  it('preserves every interpolation placeholder across locales', () => {
    for (const key of Object.keys(en.MANAGER_DASHBOARD) as Array<keyof typeof en.MANAGER_DASHBOARD>) {
      expect(placeholders(hi.MANAGER_DASHBOARD[key]), `placeholder parity for ${key}`).toEqual(
        placeholders(en.MANAGER_DASHBOARD[key]),
      );
    }
  });
});
