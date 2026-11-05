"use client";
// RESPONSIBILITY: Owns Finance staff-ledger selection, server query state, and ledger sorting for the Admin Finance ledger view.
// DATA FLOW: Finance API ledger response → useAdminFinanceStaffLedgerManagementLedgerLogic → AdminFinanceStaffLedgerManagementLedgerTable.

import { ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/constants/AdminFinanceStaffLedgerManagementQueryKeys';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { AdminFinanceStaffLedgerManagementApi } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/api/admin_finance_staff_ledger_management_api';
import { useAdminFinanceStaffLedgerManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementViewModel';
import type { AdminFinanceStaffLedgerManagementLedgerSortDirection, AdminFinanceStaffLedgerManagementLedgerSortKey, LedgerEntry, Staff } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';
/** @description useAdminFinanceStaffLedgerManagementLedgerLogic: Owns Finance staff-ledger selection, server query state, and ledger sorting for the Admin Finance ledger view. @dependencies Consumes AdminFinanceStaffLedgerManagementQueryKeys, AdminFinanceStaffLedgerManagementApi, useAdminFinanceStaffLedgerManagementViewModel, AdminFinanceStaffLedgerManagementTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinanceStaffLedgerManagementLedgerLogic() {
  const { staff, showToast } = useAdminFinanceStaffLedgerManagementViewModel();
  const errorText = useTranslations('hr.HrError')('text_22b2c820bf');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [sortKey, setSortKey] = useState<AdminFinanceStaffLedgerManagementLedgerSortKey>('date');
  const [sortDir, setSortDir] = useState<AdminFinanceStaffLedgerManagementLedgerSortDirection>('desc');

// EFFECT: Synchronizes ledger filters with URL-backed state so the table remains shareable and recoverable.
  useEffect(() => {
    if (staff.length === 0) {
      setSelectedStaffId('');
      return;
    }
    if (!selectedStaffId || !staff.some((member) => member.id === selectedStaffId)) {
      setSelectedStaffId(staff[0]?.id ?? '');
    }
  }, [staff, selectedStaffId]);

  const ledgerQuery = useQuery({
    queryKey: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_QUERY_KEYS.key('ledger', selectedStaffId),
    queryFn: () => AdminFinanceStaffLedgerManagementApi.fetchLedger(selectedStaffId),
    enabled: Boolean(selectedStaffId),
  });

// EFFECT: Derives the ledger query parameters from the normalized URL/filter state and refreshes the TanStack Query result.
  useEffect(() => {
    if (ledgerQuery.error) showToast(errorText, 'error', 'hr-ledger-error');
  }, [ledgerQuery.error, showToast, errorText]);

  const selectedStaff = staff.find((member) => member.id === selectedStaffId) ?? null;
  const ledger = ledgerQuery.data?.data ?? [];
  const sortedLedger = useMemo<LedgerEntry[]>(() => {
    return [...ledger].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      const result = typeof aValue === 'number' && typeof bValue === 'number'
        ? aValue - bValue
        : String(aValue ?? '').localeCompare(String(bValue ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? result : -result;
    });
  }, [ledger, sortKey, sortDir]);

  const handleSort = useCallback((key: AdminFinanceStaffLedgerManagementLedgerSortKey) => {
    if (sortKey === key) {
      setSortDir((current) => current === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortKey(key);
    setSortDir('desc');
  }, [sortKey]);

  const staffOptions = useMemo(() => staff.map((member: Staff) => ({ value: member.id, label: `${member.name} (${member.role})` })), [staff]);

  return {
    selectedStaffId,
    setSelectedStaffId,
    selectedStaff,
    staffOptions,
    sortedLedger,
    loading: Boolean(selectedStaffId) && ledgerQuery.isPending,
    retryLedger: ledgerQuery.refetch,
    error: ledgerQuery.error ? errorText : '',
    sortKey,
    sortDir,
    handleSort,
  };
}
