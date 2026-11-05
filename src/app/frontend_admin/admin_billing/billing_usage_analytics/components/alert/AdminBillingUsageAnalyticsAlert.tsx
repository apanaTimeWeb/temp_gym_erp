"use client";
// RESPONSIBILITY: Renders the global Admin usage warning banner using the dedicated usage query hook.
// DATA FLOW: feature data/state and user input → AdminBillingUsageAnalyticsAlert → accessible UI/events routed to owning hooks (admin_usage/usage_analytics/components/alert/AdminBillingUsageAnalyticsAlert.tsx)

import { useTranslations } from 'next-intl';
import { AlertTriangle, X } from 'lucide-react';
import { useAdminUsageAlert } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsAlert';

/**
 * AdminBillingUsageAnalyticsAlert renders the admin usage alert UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingUsageAnalyticsAlert: Renders the global Admin usage warning banner using the dedicated usage query hook.
 * @dependencies Consumes useAdminUsageAlert.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingUsageAnalyticsAlert() {
  const t = useTranslations();

  const { shouldShow, isLimitReached, setIsVisible } = useAdminUsageAlert();
  if (!shouldShow) return null;

  const bgColor = isLimitReached ? 'bg-danger-bg' : 'bg-warning-bg';
  const textColor = isLimitReached ? 'text-danger' : 'text-warning';
  const borderColor = isLimitReached ? 'border-border' : 'border-border';

  return (
    <div className={`flex items-center justify-between p-3 border-b ${bgColor} ${borderColor} px-6 motion-safe:transition-all motion-safe:duration-slow`} role="status" data-testid="admin_usage-admin_usage-alert-control">
      <div className="flex items-center gap-3">
        <AlertTriangle className={textColor} size={18} aria-hidden="true"  strokeWidth={2}/>
        <span className="text-sm font-medium text-primary">
          {isLimitReached
            ? t('usage.admin_usage_alert.auto_07939f69f3')
            : t('usage.admin_usage_alert.auto_c4a86b6a2b')}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="min-h-11 min-w-11 inline-flex items-center justify-center p-1 rounded-md hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
        aria-label={t('usage.admin_usage_alert.text_990eac0988')}
       data-testid="admin_usage-admin_usage-alert-click">
        <X size={18} className="text-secondary hover:text-primary" aria-hidden="true"  strokeWidth={2}/>
      </button>
    </div>
  );
}
