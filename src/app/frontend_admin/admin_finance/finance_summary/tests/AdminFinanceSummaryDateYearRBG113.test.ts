// Host-only Vitest regression specification; authored, not executed in source archive.
import { describe,expect,it } from 'vitest';
import { isValidAdminFinanceDateKey, isValidAdminFinanceDateRange, toAdminFinanceDateKey, getAdminFinancePresetDateRange } from '@/app/frontend_admin/admin_finance/finance_summary/utils/AdminFinanceSummaryDateRangeUtils';
describe('Finance Summary strict civil dates',()=>{
 it('accepts leap days and canonical years but rejects impossible days',()=>{
  expect(isValidAdminFinanceDateKey('2028-02-29')).toBe(true);
  expect(isValidAdminFinanceDateKey('2026-02-29')).toBe(false);
  expect(isValidAdminFinanceDateKey('0042-02-28')).toBe(true);
  expect(isValidAdminFinanceDateKey('0000-01-01')).toBe(false);
  expect(isValidAdminFinanceDateRange('2026-11-03','2026-11-02')).toBe(false);
 });
 it('pads years below 0100 instead of mapping them to the 1900s',()=>{
  const date=new Date(0);date.setFullYear(42,1,28);
  expect(toAdminFinanceDateKey(date)).toBe('0042-02-28');
  expect(getAdminFinancePresetDateRange('last_3_months',new Date(2026,9,15))).toEqual({startDate:'2026-08-01',endDate:'2026-10-31'});
 });
});
