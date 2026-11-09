// RESPONSIBILITY: Renders ManagerSalesOverviewContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerToast from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewLocalToast';
import ManagerSalesOverviewTabs from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewTabs';
import ManagerSalesOverviewToolbar from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewToolbar';
import ManagerSalesOverviewAllMemberships from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewAllMemberships';
import ManagerSalesOverviewMembershipReport from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewMembershipReport';
import ManagerSalesOverview from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverview';
import ManagerSalesOverviewPendingPayments from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewPendingPayments';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';

/** @description Renders sales sections and provides a shared retry action when any section query fails. */
export function ManagerSalesOverviewContent() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
  const { view, toast, showToast, isError, errorMessage, loadAll } = useManagerSalesOverviewLogic();

  return (
    <div className="min-h-full pb-10 bg-page text-text-primary">
      <div className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">{t('COPY_PAYMENT_BILLING')}</h1>
            <p className="text-sm text-text-secondary">{t('COPY_MANAGE_ALL_PAYMENTS_DUES_RECEIPTS')}</p>
          </div>
        </div>
        <ManagerSalesOverviewToolbar />
        {isError && (
          <div role="alert" aria-live="assertive" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-danger bg-card p-4">
            <p className="text-sm text-danger-text font-medium">{errorMessage || t('TEXT_GENERIC_ERROR')}</p>
            <button type="button" onClick={() => void loadAll()} className="min-h-11 shrink-0 rounded-lg bg-primary px-4 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring hover:brightness-110">
              {t('COPY_TRY_AGAIN')}
            </button>
          </div>
        )}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <ManagerSalesOverviewTabs data-testid="manager_sales-managersalescontent-sales-tabs-1" />
          <div className="p-5">
            {view === 'overview' && <ManagerSalesOverview />}
            {view === 'membership-report' && <ManagerSalesOverviewMembershipReport />}
            {view === 'pending-payments' && <ManagerSalesOverviewPendingPayments />}
            {view === 'all-memberships' && <ManagerSalesOverviewAllMemberships />}
          </div>
        </div>
      </div>
      {toast && <ManagerToast data-testid="manager_sales-managersalescontent-managertoast-2" message={toast.message} type={toast.type} onClose={() => showToast('', toast.type)} />}
    </div>
  );
}
