"use client";
// RESPONSIBILITY: Renders one SaaS subscription plan comparison card and its upgrade action.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementPlanCard → accessible UI/events routed to owning hooks (admin_subscriptions/subscriptions_overview/components/plan_cards/AdminSubscriptionsManagementPlanCard.tsx)

import { ADMIN_SUBSCRIPTIONS_EXTERNAL_URLS } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/config/admin_billing_subscriptions_overview.url_config';
import { useLocale, useTranslations } from 'next-intl';
import { Star, CheckCircle, Zap } from 'lucide-react';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatCurrency';


import type { SaaSPlan } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewTypes';
import { PLAN_TIER_STYLES } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/constants/AdminBillingSubscriptionsOverviewConstants';
import type { AdminSubscriptionsPlanCardProps } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewPlanCardPropsTypes';
/**
 * AdminSubscriptionsManagementPlanCard renders the admin subscriptions plan card UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementPlanCard: Renders one SaaS subscription plan comparison card and its upgrade action.
 * @dependencies Consumes AdminSubscriptionsFormatCurrency, admin_subscriptions_url_config, AdminSubscriptionsTypes, AdminSubscriptionsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsManagementPlanCard({ plan, onUpgrade, upgrading }: AdminSubscriptionsPlanCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const style = PLAN_TIER_STYLES[plan.tier];
  const fmt = (v: number) => v === 0 ? t('subscriptions.AdminSubscriptionsPlanCard.customPrice') : AdminSubscriptionsFormatCurrency(v, undefined, locale);

  return (
    <div className={`relative bg-card border rounded-xl p-5 flex flex-col gap-4 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:shadow-card ${plan.isCurrent ? 'border-focus shadow-card' : 'border-border'}`}>
      {plan.isPopular && (
        <div className="absolute -top-3 inset-x-0 flex justify-center">
          <span className="flex items-center gap-1 px-3 py-1 bg-primary-subtle text-primary text-xs font-bold rounded-full shadow" data-testid="subscriptions-management-subscriptions-management-plan-card-status-badge">
            <Star size={18} fill="currentColor"  strokeWidth={2}/> {t('subscriptions.AdminSubscriptionsPlanCard.text_385b4b232f')}</span>
        </div>
      )}
      {plan.isCurrent && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-success text-on-success text-xs font-bold rounded-full border border-border" data-testid="admin_subscriptions-adminsubscriptionsplancards-status-1">{t('subscriptions.AdminSubscriptionsPlanCard.text_4fc0e2bc80')}</span>
        </div>
      )}

      <div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style?.bg || ''} ${style?.text || ''}`} data-testid="subscriptions-management-subscriptions-management-plan-card-status-badge-2">{plan.name}</span>
        <div className="mt-3">
          <span className="text-3xl font-bold text-primary">{fmt(plan.monthlyPrice)}</span>
          {plan.monthlyPrice > 0 && <span className="text-secondary text-sm">{t('subscriptions.AdminSubscriptionsPlanCard.text_ab0cc39294')}</span>}
        </div>
        {plan.monthlyPrice > 0 && (
          <p className="text-xs text-success mt-1">{t('subscriptions.AdminSubscriptionsPlanCard.text_1758356db2')}{fmt(plan.annualPrice)}{t('subscriptions.AdminSubscriptionsPlanCard.text_6f3c17a871')}</p>
        )}
      </div>

      <ul className="space-y-2 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-secondary">
            <CheckCircle size={18} className="text-success shrink-0 mt-0.5"  strokeWidth={2}/>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {plan.isCurrent ? (
        <div className="py-2.5 text-center text-sm font-semibold text-primary border border-border rounded-xl bg-surface-highlight">
          {t('subscriptions.AdminSubscriptionsPlanCard.text_52ec63b267')}</div>
      ) : plan.tier === 'enterprise' ? (
        <a
          href={ADMIN_SUBSCRIPTIONS_EXTERNAL_URLS.salesEmail}
          className="min-h-11 min-w-11 inline-flex items-center justify-center py-2.5 text-center text-sm font-semibold text-primary border border-border rounded-xl hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out"
         data-testid="admin_subscriptions-admin_subscriptions-plan-card-navigate">
          {t('subscriptions.AdminSubscriptionsPlanCard.text_7a0a9bd139')}</a>
      ) : (
        <button type="button"
          onClick={() => onUpgrade(plan.id, plan.name)}
          disabled={upgrading}
          className="py-2.5 text-sm font-semibold bg-primary-subtle text-primary rounded-xl hover:bg-primary-hover motion-safe:transition-colors flex items-center justify-center gap-2 disabled:opacity-60 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
         data-testid="admin_subscriptions-admin_subscriptions-plan-card-click">
          <Zap size={18}  strokeWidth={2}/> {t('subscriptions.AdminSubscriptionsPlanCard.text_216133f9a1')}{plan.name}
        </button>
      )}
    </div>
  );
}
