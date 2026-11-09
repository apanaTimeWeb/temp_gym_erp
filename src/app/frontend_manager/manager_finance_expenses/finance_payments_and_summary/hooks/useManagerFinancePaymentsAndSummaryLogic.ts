// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type { ManagerFinancePaymentsAndSummaryViewId } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_view.types';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { ManagerFinancePaymentsAndSummaryApi } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.api';
import { ManagerFinancePaymentsAndSummaryQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.query_keys';
import { FINANCE_ALL_FILTER } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_LEGACY_TAB_QUERY_PARAM, MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_view.constants';
import { resolveManagerFinancePaymentsAndSummaryView } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryResolveView';
import { ManagerFinancePaymentsAndSummaryBuildViewSearchParams } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryBuildViewSearchParams';
import { useManagerFinancePaymentsAndSummaryPayments, useManagerFinancePaymentsAndSummarySummary } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryQueries';
import { useManagerFinancePaymentsAndSummaryUiStore } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore';
import { ManagerFinancePaymentsAndSummaryFormatDate } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';
import type { ManagerFinancePaymentsAndSummaryViewModel } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_view_model.types';
/**
 * @description Coordinates URL-backed finance filters, payments/summary queries, feature UI state, reload, export, and receipt-print commands.
 * @dependencies Uses feature-owned API/query hooks, query-key registry, URL view resolvers/builders, formatters, translations, and the finance UI store.
 * @edge-case URL filter changes reset pagination; query errors are converted to a localized safe message; exports use the currently loaded payment data or the approved report API.
 * @returns The finance view model containing filters, payment/summary data, pending/error state, reload/export/print commands, and toast controls.
 * @cacheKey Delegated to the payments and summary query hooks using the normalized query parameters and selected range.
 */
export function useManagerFinancePaymentsAndSummaryLogic(): ManagerFinancePaymentsAndSummaryViewModel {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  const searchParams = useSearchParams(); const router = useRouter(); const pathname = usePathname(); const queryClient = useQueryClient(); const ui = useManagerFinancePaymentsAndSummaryUiStore();
  const tab = resolveManagerFinancePaymentsAndSummaryView(searchParams.get(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_QUERY_PARAM), searchParams.get(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_LEGACY_TAB_QUERY_PARAM));
  const setTab = useCallback((nextTab: ManagerFinancePaymentsAndSummaryViewId) => { const query = ManagerFinancePaymentsAndSummaryBuildViewSearchParams(searchParams.toString(), nextTab); router.push(`${pathname}?${query}`, { scroll: false }); }, [pathname, router, searchParams]);
  const range = searchParams.get('range') || 'this_month'; const search = searchParams.get('search') || ''; const statusFilter = searchParams.get('status') || FINANCE_ALL_FILTER; const methodFilter = searchParams.get('method') || FINANCE_ALL_FILTER; const rawPage = Number(searchParams.get('page') || '1'); const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1; const startDate = searchParams.get('startDate') || ''; const endDate = searchParams.get('endDate') || '';
  const setUrlParam = useCallback((key: string, value: string | null) => { const current = new URLSearchParams(searchParams.toString()); if (value && value !== 'ALL') current.set(key, value); else current.delete(key); if (key !== 'page') current.set('page', '1'); router.push(`${pathname}?${current.toString()}`); }, [pathname, router, searchParams]);
  const setSearch = useCallback((value: string) => { setUrlParam('search', value || null); }, [setUrlParam]); const setStatusFilter = useCallback((value: string) => setUrlParam('status', value), [setUrlParam]); const setMethodFilter = useCallback((value: string) => setUrlParam('method', value), [setUrlParam]); const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value)), [setUrlParam]); const setStartDate = useCallback((value: string) => setUrlParam('startDate', value || null), [setUrlParam]); const setEndDate = useCallback((value: string) => setUrlParam('endDate', value || null), [setUrlParam]);
  const queryParams = useMemo(() => ({ search, status: statusFilter, method: methodFilter, page: String(currentPage), limit: '10', range, startDate, endDate }), [currentPage, endDate, methodFilter, range, search, startDate, statusFilter]);
  const paymentsQuery = useManagerFinancePaymentsAndSummaryPayments(queryParams); const summaryQuery = useManagerFinancePaymentsAndSummarySummary(range, startDate, endDate);
  const financeQueryError = [paymentsQuery.error, summaryQuery.error].find(Boolean);
  const errorMessage = financeQueryError ? ManagerInfrastructureGetErrorMessage(financeQueryError, t('TEXT_GENERIC_ERROR')) : '';
  const reload = useCallback(() => { void queryClient.invalidateQueries({ queryKey: ManagerFinancePaymentsAndSummaryQueryKeys.all }); }, [queryClient]);
  const exportCSV = useCallback(async () => {
    try {
      const pageSize = 1000;
      const allPayments = [] as NonNullable<typeof paymentsQuery.data>['payments'];
      let total = 0;
      for (let page = 1; page <= 1000; page += 1) {
        const response = await ManagerFinancePaymentsAndSummaryApi.fetchPayments({ ...queryParams, page: String(page), limit: String(pageSize) });
        if (!response.success) throw new Error(response.message || 'Unable to export payments');
        total = response.data.total;
        allPayments.push(...response.data.payments);
        if (allPayments.length >= total || response.data.payments.length === 0) break;
      }
      const rows = [['Invoice No','Member','Plan','Amount','Method','Status','Date'], ...allPayments.map((payment) => [payment.invoiceNumber, payment.member?.name ?? '—', payment.member?.plan?.name ?? '—', payment.amount, payment.method, payment.status, ManagerFinancePaymentsAndSummaryFormatDate(payment.paidAt)])];
      const csv = rows.map((row) => row.map((cell) => { const value = String(cell); const safe = /^[\s]*[=+\-@\t\r]/.test(value) ? `'${value}` : value; return `"${safe.replace(/"/g, '""')}"`; }).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `finance_${new Date().toISOString().split('T')[0]}.csv`; anchor.click(); URL.revokeObjectURL(url);
    } catch (error) { ui.showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); }
  }, [queryParams, ui, t]);
  const exportPDF = useCallback(async () => { const response = await ManagerFinancePaymentsAndSummaryApi.exportPaymentsReport('pdf'); if (response.data?.url) window.open(response.data.url, '_blank', 'noopener,noreferrer'); }, []);
  const printReceipt = useCallback((id: string) => {
    const payment = paymentsQuery.data?.payments.find((item) => item.id === id);
    if (!payment) { ui.showToast(t('TEXT_GENERIC_ERROR'), 'error'); return; }
    const popup = window.open('', '_blank');
    if (!popup) { ui.showToast(t('TEXT_GENERIC_ERROR'), 'error'); return; }
    popup.opener = null;
    const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[char] ?? char));
    popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(payment.invoiceNumber)}</title><style>body{font:14px system-ui;padding:32px;color:#111}h1{font-size:20px}dl{display:grid;grid-template-columns:140px 1fr;gap:10px}dt{font-weight:600}</style></head><body><h1>Payment receipt</h1><dl><dt>Invoice</dt><dd>${escapeHtml(payment.invoiceNumber)}</dd><dt>Member</dt><dd>${escapeHtml(payment.member?.name ?? '—')}</dd><dt>Amount</dt><dd>${escapeHtml(payment.amount)}</dd><dt>Method</dt><dd>${escapeHtml(payment.method)}</dd><dt>Status</dt><dd>${escapeHtml(payment.status)}</dd><dt>Date</dt><dd>${escapeHtml(ManagerFinancePaymentsAndSummaryFormatDate(payment.paidAt))}</dd></dl></body></html>`);
    popup.document.close();
    popup.focus();
    popup.print();
  }, [paymentsQuery.data?.payments, ui, t]);
  return { tab, setTab, range, search, setSearch, statusFilter, setStatusFilter, methodFilter, setMethodFilter, currentPage, setCurrentPage, startDate, setStartDate, endDate, setEndDate, payments: paymentsQuery.data?.payments ?? [], summary: summaryQuery.data ?? null, totalPayments: paymentsQuery.data?.total ?? 0, isPending: paymentsQuery.isPending, isError: paymentsQuery.isError, errorMessage, reload, exportCSV, exportPDF, printReceipt, toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast };
}
