// RESPONSIBILITY: Verify backend error text is never rendered in the payroll query state or toast.
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminFinancePayrollManagementLogic } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementLogic';
const toast = vi.hoisted(() => vi.fn());
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUrlState', () => ({ useAdminFinancePayrollManagementUrlState: () => ({ debouncedSearch:'', roleFilter:'All', branchFilter:'All', currentPage:1, payrollMonth:'2026-11', staffSortKey:'name', staffSortDir:'asc', payrollSortKey:'month', payrollSortDir:'desc' }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementToastStore', () => ({ useAdminNavigationLayoutToastStore: () => ({ showToast: toast }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPayrollMutations', () => ({ useAdminFinancePayrollManagementPayrollMutations: () => ({ isPending:false, savePayroll:vi.fn(), markPayrollPaid:vi.fn() }) }));
describe('Payroll query error redaction', () => {
 it('never exposes an untrusted backend error string to UI state or toast', () => {
  toast.mockClear();
  for (let i=0;i<3;i++) vi.mocked(useQuery).mockReturnValueOnce({ status:'error', error:new Error('secret-internal-SQL-info'), data:undefined, refetch:vi.fn() } as never);
  const { result } = renderHook(() => useAdminFinancePayrollManagementLogic({ setShowPayrollModal:vi.fn() } as never));
  for (const message of [result.current.error,result.current.payrollError,result.current.summaryError]) { expect(message).toBe('hr.AdminAuditRepair.requestFailed'); expect(message).not.toContain('secret-internal'); }
  expect(toast).toHaveBeenCalledTimes(3);
  expect(JSON.stringify(toast.mock.calls)).not.toContain('secret-internal');
 });
});
