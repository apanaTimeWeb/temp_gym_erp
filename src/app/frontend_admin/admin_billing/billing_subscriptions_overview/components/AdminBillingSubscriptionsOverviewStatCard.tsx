// RESPONSIBILITY: Renders the zero-business KPI/stat-card primitive used by Admin features.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutStatCard.tsx)

import type { AdminStatCardProps } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewStatCardTypes';

/**
 * AdminNavigationLayoutStatCard renders the admin stat card UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutStatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, iconColor, testId }: AdminStatCardProps) {
  return (
    <div data-testid={testId} className="bg-card rounded-lg p-5 shadow-card border border-border motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 hover:border-focus">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-secondary uppercase tracking-wider truncate">{title}</p>
          <p className="text-3xl font-bold text-primary mt-1 truncate">{value}</p>
          {change ? (
            <p className={`text-xs mt-1 font-medium ${changeType === 'up' ? 'text-success' : changeType === 'down' ? 'text-danger' : 'text-secondary'}`}>
              {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
            </p>
          ) : null}
        </div>
        <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className={iconColor} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
