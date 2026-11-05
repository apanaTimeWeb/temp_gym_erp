"use client";
// RESPONSIBILITY: Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).
// DATA FLOW: feature data/state and user input → AdminBillingUsageAnalyticsMetricCard → accessible UI/events routed to owning hooks (admin_usage/usage_analytics/components/metric_card/AdminBillingUsageAnalyticsMetricCard.tsx)

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/progress_bar/AdminBillingUsageAnalyticsProgressBar';
import { formatNumber } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/utils/AdminBillingUsageAnalyticsFormatters';

import { ArrowUpCircle } from 'lucide-react';
import type { AdminUsageMetric } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';

import type { AdminUsageMetricCardProps } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsMetricCardPropsTypes';


/**
 * AdminBillingUsageAnalyticsMetricCard renders the admin usage metric card UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingUsageAnalyticsMetricCard: Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).
 * @dependencies Consumes AdminNavigationLayoutProgressBar, AdminUsageFormatters, AdminUsageTypes, AdminUsageMetricCardPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingUsageAnalyticsMetricCard({ metric, onUpgrade }: AdminUsageMetricCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const used = Number.isFinite(metric.used) && metric.used >= 0 ? metric.used : 0;
  const limit = Number.isFinite(metric.limit) && metric.limit >= 0 ? metric.limit : 0;
  // When usage is nonzero against a zero quota, expose the over-limit state.
  const usageRatio = limit > 0 ? Math.min(1, used / limit) : used > 0 ? 1 : 0;
  const pct = Math.round(usageRatio * 100);
  const isCritical = usageRatio >= metric.criticalThreshold;
  const isWarning = usageRatio >= metric.warningThreshold && !isCritical;
  const showUpgradeCta = usageRatio >= metric.warningThreshold;

  const textColor = isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success';
  const borderColor = isCritical ? 'border-border' : isWarning ? 'border-border' : 'border-border';

  return (
    <div className={`bg-card rounded-xl border p-5 space-y-3 hover:border-focus motion-safe:transition-all motion-safe:duration-base ${borderColor}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">{metric.label}</p>
        <span className={`text-xs font-bold ${textColor}`}>{pct}%</span>
      </div>
      <AdminNavigationLayoutProgressBar
        value={pct}
        variant={isCritical ? 'danger' : isWarning ? 'warning' : 'success'}
        label={t('usage.admin_usage_metric_card.auto_usage', { label: metric.label })}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-secondary">
          {formatNumber(used, locale)} / {formatNumber(limit, locale)} {metric.unit}
        </span>
        {isCritical && (
          <span className="text-xs font-bold text-on-danger bg-danger px-2 py-0.5 rounded-full" data-testid="admin_usage-adminusagemetriccard-status-1">{t('usage.admin_usage_metric_card.text_ec4a8cfea4')}</span>
        )}
        {isWarning && !isCritical && (
          <span className="text-xs font-bold text-warning bg-warning-bg px-2 py-0.5 rounded-full" data-testid="admin_usage-adminusagemetriccard-status-2">{t('usage.admin_usage_metric_card.text_782bd6b85f')}</span>
        )}
      </div>
      {showUpgradeCta && (
        <button type="button"
          onClick={onUpgrade}
          className="min-h-11 min-w-11 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary-subtle hover:bg-primary-subtle text-primary text-xs font-semibold motion-safe:transition-colors border border-border motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
          aria-label={t('admin_usage_metric_card.auto_upgradePlanFor', { label: metric.label })}
         data-testid="admin_usage-admin_usage-metric-card-click">
          <ArrowUpCircle size={18}  strokeWidth={2}/>
          {t('usage.admin_usage_metric_card.text_0339f20514')}{metric.label} {t('usage.admin_usage_metric_card.text_e4d68c5a97')}</button>
      )}
    </div>
  );
}
