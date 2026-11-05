// RESPONSIBILITY: Renders ManagerExpenseRegisterAndReportingContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import ManagerExpenseRegisterAndReportingModal from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingModal';
import ManagerExpenseRegisterAndReportingViews from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingViews';
import { resolveManagerExpenseRegisterAndReportingView } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/utils/ManagerExpenseRegisterAndReportingResolveView';
import type { ManagerExpenseRegisterAndReportingViewId } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';
import { useManagerExpenseRegisterAndReportingLogic } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingLogic';


/** @description Renders the ManagerExpenseRegisterAndReportingContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerExpenseRegisterAndReportingContent() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');

  const { setShowModal } = useManagerExpenseRegisterAndReportingLogic();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedView = searchParams.get('view') ?? searchParams.get('tab');
  const activeTab: ManagerExpenseRegisterAndReportingViewId = resolveManagerExpenseRegisterAndReportingView(requestedView);
  const setActiveTab = useCallback((view: string) => {
    if (!['add-expense', 'view-expenses', 'expense-report'].includes(view)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    params.delete('tab');
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const expenseViews = [{ id: 'add-expense', label: t('COPY_ADD_EXPENSE') }, { id: 'view-expenses', label: t('COPY_VIEW_EXPENSES') }, { id: 'expense-report', label: t('COPY_EXPENSE_REPORT') }] as const;

  return (
    <div className="min-h-full pb-10">
      
      <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto w-full">
        
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit mb-4">
          {expenseViews.map(({ id, label }, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-all ${
                activeTab === id ? 'bg-primary text-on-primary shadow-card' : 'text-text-secondary hover:text-primary hover:bg-primary-subtle'
              } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensescontent-button-add-expense-${mapIndex}`}
              key={id}
              onClick={() => setActiveTab(id)}
              
             type="button">
              {label}
            </button>
          ))}
        </div>

        <ManagerExpenseRegisterAndReportingViews activeView={activeTab} onOpenExpense={() => setShowModal(true)} />

        <ManagerExpenseRegisterAndReportingModal />
      </div>
    </div>
  );
}
