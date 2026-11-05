"use client";
// RESPONSIBILITY: SaaS plan comparison cards with upgrade CTA.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementPlanCards → accessible UI/events routed to owning hooks (admin_subscriptions/subscriptions_plans/components/plan_cards/AdminSubscriptionsManagementPlanCards.tsx)

import { useTranslations } from 'next-intl';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansLogic';
import AdminSubscriptionsPlanCard from '@/app/frontend_admin/admin_billing/billing_subscription_plans/components/plan_cards/AdminBillingSubscriptionPlansPlanCard';
import type { SaaSPlan } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/types/AdminBillingSubscriptionPlansTypes';



/**
 * AdminSubscriptionsManagementPlanCards renders the admin subscriptions plan cards UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementPlanCards: SaaS plan comparison cards with upgrade CTA.
 * @dependencies Consumes useAdminSubscriptionsLogic, AdminSubscriptionsPlanCard, AdminSubscriptionsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsManagementPlanCards() {
  const t = useTranslations();
  const { plans, handleUpgrade, upgrading, plansStatus, plansError, retryPlans } = useAdminSubscriptionsLogic();
  if (plansStatus === 'pending') return <div className="p-8 text-center text-secondary" role="status" data-testid="subscriptions-management-subscriptions-management-plan-cards-status-region">{t('subscriptions.AdminSubscriptionsError.loadingPlans')}</div>;
  if (plansStatus === 'error') return <div className="p-8 text-center" role="alert"><p className="text-danger">{t('subscriptions.AdminSubscriptionsError.plansLoadFailed')}</p><button type="button" onClick={() => void retryPlans()} className="mt-3 min-h-11 rounded-lg border border-border px-4 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="subscriptions-management-subscriptions-management-plan-cards-retry-plans">{t('subscriptions.AdminSubscriptionsError.retry')}</button></div>;
  if (plans.length === 0) return <div className="p-8 text-center text-secondary">{t('subscriptions.AdminSubscriptionsError.noPlans')}</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {plans.map(plan => (
        <AdminSubscriptionsPlanCard key={plan.id} plan={plan} onUpgrade={handleUpgrade} upgrading={upgrading} />
      ))}
    </div>
  );
}
