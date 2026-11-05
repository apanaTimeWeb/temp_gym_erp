// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { useManagerStaffPayrollAndAttendanceMutations } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceMutations';
import { useManagerStaffPayrollAndAttendanceQueries } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceQueries';
import { useManagerStaffPayrollAndAttendanceUIState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceUIState';
import type { HrInitialData } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceLogic.
 * @dependencies Uses useManagerStaffPayrollAndAttendanceMutations, useManagerStaffPayrollAndAttendanceQueries, useManagerStaffPayrollAndAttendanceUIState, ManagerDebounce.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceLogic owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceLogic(initialData?: HrInitialData | null) {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const parsedPage = Number(searchParams.get('page') || 1);
  const currentPage = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? Math.min(parsedPage, 10000) : 1;
  const roleFilter = searchParams.get('role') || 'All';
  const payrollMonth = searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value)), [setUrlParam]);
  const setRoleFilter = useCallback((value: string) => setUrlParam('role', value === 'All' ? null : value), [setUrlParam]);
  const setPayrollMonth = useCallback((value: string) => setUrlParam('month', value), [setUrlParam]);

  const ui = useManagerStaffPayrollAndAttendanceUIState();
  const queries = useManagerStaffPayrollAndAttendanceQueries({ search: debouncedSearch, role: roleFilter, month: payrollMonth, page: currentPage, limit: 10 }, initialData);
  const mutations = useManagerStaffPayrollAndAttendanceMutations(
    queries.staff, queries.payrolls, ui.editId, ui.setShowModal, ui.setShowPayrollModal, ui.setSaving, ui.showToast,
  );

  const error = useMemo(() => queries.error ? ManagerInfrastructureGetErrorMessage(queries.error, t('TEXT_GENERIC_ERROR')) : '', [queries.error, t]);

  return {
    staff: queries.staff, totalStaff: queries.totalStaff, payrolls: queries.payrolls, totalPayrolls: queries.totalPayrolls, summary: queries.summary, isPending: queries.isPending, isError: queries.isError, error,
    toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast, loadAll: queries.loadAll,
    search, debouncedSearch, setSearch, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal: ui.showModal, setShowModal: ui.setShowModal, showPayrollModal: ui.showPayrollModal, setShowPayrollModal: ui.setShowPayrollModal,
    paymentModal: ui.paymentModal, setPaymentModal: ui.setPaymentModal, editId: ui.editId, editData: ui.editData, viewProfileData: ui.viewProfileData, setViewProfileData: ui.setViewProfileData, saving: ui.saving,
    openAdd: ui.openAdd,
    openEdit: ui.openEdit,
    openAddPayroll: ui.openAddPayroll, 
    savePayroll: mutations.savePayroll, 
    markPayrollPaid: mutations.markPayrollPaid, 
    giveAdvance: mutations.giveAdvance, 
    payDue: mutations.payDue,
    bulkGeneratePayroll: mutations.bulkGeneratePayroll,
    downloadPayslip: mutations.downloadPayslip,
    payrollMonth, setPayrollMonth };
}
