// RESPONSIBILITY: Owns the validated Manager Expenses screen views selected by the module URL registry.
'use client';
import { Suspense } from 'react';

import { useTranslations } from 'next-intl';

import ManagerExpenseRegisterAndReportingChart from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingChart';
import ManagerExpenseRegisterAndReportingKPIs from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingKPIs';
import ManagerExpenseRegisterAndReportingTable from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingTable';
import ManagerExpenseRegisterAndReportingToolbar from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingToolbar';
import type { ManagerExpenseRegisterAndReportingViewId } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';

interface ManagerExpenseRegisterAndReportingViewsProps { activeView: ManagerExpenseRegisterAndReportingViewId; onOpenExpense: () => void; }

export default function ManagerExpenseRegisterAndReportingViews({ activeView, onOpenExpense }: ManagerExpenseRegisterAndReportingViewsProps) {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  if (activeView === 'view-expenses') return <div className="space-y-5">
    <Suspense fallback={<div className="h-20 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />}><ManagerExpenseRegisterAndReportingToolbar /></Suspense>
    <Suspense fallback={<div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />}><ManagerExpenseRegisterAndReportingKPIs /></Suspense>
    <Suspense fallback={<div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />}><ManagerExpenseRegisterAndReportingTable /></Suspense>
  </div>;
  if (activeView === 'add-expense') return <section className="max-w-xl rounded-xl border border-border bg-card p-6">
    <h2 className="mb-2 text-lg font-bold text-text-primary">{t('COPY_RECORD_NEW_EXPENSE')}</h2>
    <p className="mb-5 text-sm text-text-secondary">{t('COPY_USE_VALIDATED_EXPENSE_FORM_CREATE_NEW_OPERATIONAL_COST')}</p>
    <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring hover:brightness-110" data-testid="manager_expenses-manager-expenses-content-button-add" type="button" onClick={onOpenExpense}>{t('COPY_OPEN_EXPENSE_FORM')}</button>
  </section>;
  return <section className="min-h-96 rounded-xl border border-border bg-card p-2"><ManagerExpenseRegisterAndReportingChart /></section>;
}
