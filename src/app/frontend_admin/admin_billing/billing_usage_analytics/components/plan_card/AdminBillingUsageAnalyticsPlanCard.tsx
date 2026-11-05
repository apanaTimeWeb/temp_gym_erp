"use client";
// RESPONSIBILITY: Renders plan tiers and owns only the view-level trigger for an upgrade request.
// DATA FLOW: feature data/state and user input → AdminBillingUsageAnalyticsPlanCard → accessible UI/events routed to owning hooks (admin_usage/usage_analytics/components/plan_card/AdminBillingUsageAnalyticsPlanCard.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { Check, Loader2, Zap } from 'lucide-react';
import { AdminUsageFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/utils/AdminBillingUsageAnalyticsFormatCurrency';

import type { AdminUsagePlanCardProps, AdminUsagePlanTier } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';

/**
 * AdminBillingUsageAnalyticsPlanCard renders the admin usage plan card UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingUsageAnalyticsPlanCard: Renders plan tiers and owns only the view-level trigger for an upgrade request.
 * @dependencies Consumes AdminUsageFormatCurrency, AdminUsageTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingUsageAnalyticsPlanCard({ planTiers, onRequestUpgrade, pendingUpgradePlan }: AdminUsagePlanCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const currentTierIndex = planTiers.findIndex((plan) => plan.isCurrent);
  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary-subtle rounded-xl">
          <Zap size={18} className="text-primary" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-primary">{t('usage.admin_usage_plan_card.text_1ef5e4215a')}</h2>
          <p className="text-xs text-secondary">{t('usage.admin_usage_plan_card.text_ab79ad6aa7')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {planTiers.map((plan: AdminUsagePlanTier , __testIdIndex34) => {
          const isPending = pendingUpgradePlan === plan.name;
          return (
            <div key={plan.name} className={`rounded-xl border p-4 space-y-3 motion-safe:transition-all motion-safe:duration-base ${plan.isCurrent ? 'border-focus bg-primary-subtle' : 'border-border bg-input hover:border-focus'}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-primary">{t(plan.nameKey)}</p>
                {plan.isCurrent && <span className="text-xs font-bold text-primary bg-primary-subtle px-2 py-0.5 rounded-full" data-testid="usage-analytics-usage-analytics-plan-card-status-badge">{t('usage.admin_usage_plan_card.text_4fc0e2bc80')}</span>}
              </div>
              <p className="text-xl font-bold text-primary">{plan.price === 0 ? t('usage.admin_usage_plan_card.customPrice') : `${AdminUsageFormatCurrency(plan.price, undefined, locale)}/mo`}</p>
              <ul className="space-y-1.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-secondary">
                    <Check size={18} className="text-success flex-shrink-0"  strokeWidth={2}/>
                    {t(feature)}
                  </li>
                ))}
              </ul>
              {currentTierIndex >= 0 && __testIdIndex34 > currentTierIndex && (
                <button
                  type="button"
                  onClick={() => void onRequestUpgrade(plan.name)}
                  disabled={pendingUpgradePlan !== null}
                  className="w-full min-h-11 py-2 rounded-lg text-xs font-bold border border-focus text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-w-11"
                 data-testid={`admin_usage-admin_usage-plan-card-click-map34-${__testIdIndex34}-1`}>
                  {isPending ? <span className="inline-flex items-center justify-center gap-2"><Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> {t('usage.admin_usage_plan_card.text_cf765512cc')}</span> : plan.price === 0 ? t('usage.admin_usage_plan_card.auto_0757510097') : t('usage.admin_usage_plan_card.auto_94fe6d906b')}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
