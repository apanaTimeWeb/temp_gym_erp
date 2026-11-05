// RESPONSIBILITY: Verifies Finance P&L locale-aware numeric, compact KPI, and date formatting behavior.
// DATA FLOW: typed numeric/date inputs and locale → P&L formatters → display text or em-dash fallback.

import { describe, expect, it } from 'vitest';
import { formatCompactMinorUnitKPI, formatDate, formatKPI, formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatters';

describe('Finance P&L formatters', () => {
  it('formats percentages and compact KPIs using the given locale', () => {
    expect(formatPercent1dp(12.34, 'en-US')).toBe('12.3');
    expect(formatKPI(1200, 'en-US')).toBe('1.2K');
  });

  it('preserves the chart compact minor-unit scaling for supported locales', () => {
    expect(formatCompactMinorUnitKPI(120000, 'en-US')).toBe('1.2K');
    expect(formatCompactMinorUnitKPI(120000, 'hi-IN')).toBe('1.2 हज़ार');
    expect(formatCompactMinorUnitKPI(125, 'en-US')).toBe('1.3');
  });

  it('formats ISO dates and returns a safe fallback for invalid dates', () => {
    expect(formatDate('2026-10-23', 'en')).toBe('23 Oct 2026');
    expect(formatDate('not-a-date', 'en')).toBe('—');
  });
});
