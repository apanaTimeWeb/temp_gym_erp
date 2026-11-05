// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { MANAGER_EXPENSE_STATUS_PAID } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting.constants';
import { EXPENSE_ALL_STATUS_FILTER } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import { useSaveExpenseMutation, useDeleteExpenseMutation } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingMutations';
import { useExpensesListQuery } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingQueries';
import { useManagerExpenseRegisterAndReportingUiStore } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/state/useManagerExpenseRegisterAndReportingUiStore';
import type { ManagerExpenseRegisterAndReportingViewModel, Expense } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useManagerExpenseRegisterAndReportingLogic.
 * @dependencies Uses useManagerExpenseRegisterAndReportingMutations, useManagerExpenseRegisterAndReportingQueries, useManagerExpenseRegisterAndReportingUiStore, ManagerIdempotency.
 * @edge-case preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerExpenseRegisterAndReportingLogic owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerExpenseRegisterAndReportingLogic(): ManagerExpenseRegisterAndReportingViewModel {
  const saveIntentKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const mutationIntentKeysRef = useRef(new Map<string, string>());
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerExpenseRegisterAndReportingUiStore();
  const search = searchParams.get("search") || ""; const statusFilter = searchParams.get("status") || EXPENSE_ALL_STATUS_FILTER; const range = searchParams.get("range") || "this_month"; const rawPage = Number(searchParams.get("page") || "1"); const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const setUrlParam = useCallback((key: string, value: string | null) => { const params = new URLSearchParams(searchParams.toString()); if (!value || (key === "status" && value === "All") || (key === "page" && value === "1")) params.delete(key); else params.set(key, value); if (key !== "page") params.delete("page"); router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false }); }, [pathname, router, searchParams]);
  useEffect(() => { if (searchParams.has("page") && (!Number.isSafeInteger(rawPage) || rawPage < 1)) setUrlParam("page", null); }, [rawPage, searchParams, setUrlParam]);
  const exportQuery = useExpensesListQuery({ search: "", status: "", page: "1", limit: "1000", range });
  const saveMutation = useSaveExpenseMutation(); const deleteMutation = useDeleteExpenseMutation();
  const saveExpense = useCallback(async (data: Partial<Expense>) => {
    const payload = { ...data, id: ui.editId || undefined };
    const fingerprint = JSON.stringify(payload);
    const existingIntent = saveIntentKeyRef.current;
    const idempotencyKey = existingIntent?.fingerprint === fingerprint ? existingIntent.key : ManagerInfrastructureIdempotency();
    saveIntentKeyRef.current = { fingerprint, key: idempotencyKey };
    try {
      const response = await saveMutation.mutateAsync({ ...payload, idempotencyKey });
      saveIntentKeyRef.current = null;
      ManagerInfrastructureShowSuccessToast(response.message, `manager-expense-${ui.editId ?? 'new'}-save`);
      ui.closeModal();
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, `manager-expense-${ui.editId ?? 'new'}-save-error`);
      throw error;
    }
  }, [saveMutation, ui.closeModal, ui.editId]);
  const deleteExpense = useCallback(async (id: string) => { const idempotencyKey = mutationIntentKeysRef.current.get(`delete:${id}`) ?? ManagerInfrastructureIdempotency(); mutationIntentKeysRef.current.set(`delete:${id}`, idempotencyKey); const response = await deleteMutation.mutateAsync({ id, idempotencyKey }); mutationIntentKeysRef.current.delete(`delete:${id}`); ManagerInfrastructureShowSuccessToast(response.message, `manager-expense-${id}-delete`); }, [deleteMutation]);
  const markAsPaid = useCallback(async (id: string) => { try { const idempotencyKey = mutationIntentKeysRef.current.get(`paid:${id}`) ?? ManagerInfrastructureIdempotency(); mutationIntentKeysRef.current.set(`paid:${id}`, idempotencyKey); const response = await saveMutation.mutateAsync({ id, status: MANAGER_EXPENSE_STATUS_PAID, idempotencyKey }); mutationIntentKeysRef.current.delete(`paid:${id}`); ManagerInfrastructureShowSuccessToast(response.message, `manager-expense-${id}-paid`); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, `manager-expense-${id}-paid-error`); } }, [saveMutation]);
  const exportExpenses = useCallback(() => { const rows = exportQuery.data?.expenses ?? []; const escapeCsv = (value: unknown) => { const raw = String(value ?? ""); const safe = /^[\s]*[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw; return `"${safe.replace(/"/g, '""')}"`; }; const header = ["ID", "Title", "Category", "Amount", "Date", "Status"]; const csv = [header, ...rows.map((item) => [item.id, item.title, item.category, item.amount, item.date, item.status])].map((row) => row.map(escapeCsv).join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); const href = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = href; anchor.download = "manager-expenses.csv"; anchor.click(); URL.revokeObjectURL(href); }, [exportQuery.data]);
  return useMemo(() => ({ range, setRange: (value: string) => setUrlParam("range", value), search, setSearch: (value) => setUrlParam("search", value || null), statusFilter, setStatusFilter: (value) => setUrlParam("status", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)), showModal: ui.showModal, setShowModal: (show) => { if (show) ui.openAdd(); else ui.closeModal(); }, editId: ui.editId, editData: ui.editData, openAdd: ui.openAdd, openEdit: ui.openEdit, saveExpense, deleteExpense, markAsPaid, exportExpenses, saving: saveMutation.isPending || deleteMutation.isPending }), [currentPage, deleteMutation.isPending, deleteExpense, exportExpenses, markAsPaid, range, saveExpense, saveMutation.isPending, search, setUrlParam, statusFilter, ui.editData, ui.editId, ui.openAdd, ui.openEdit, ui.closeModal, ui.showModal]);
}
