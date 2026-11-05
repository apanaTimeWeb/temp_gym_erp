// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/progress_bar/AdminNavigationLayoutProgressBar.tsx)
// RESPONSIBILITY: Renders a zero-business, accessible progress indicator using only canonical semantic Tailwind tokens.
import type { AdminProgressBarProps } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementProgressBarTypes';

const ADMIN_PROGRESS_SEGMENTS = 20;

const ADMIN_PROGRESS_VARIANT_CLASS: Record<NonNullable<AdminProgressBarProps['variant']>, string> = {
  primary: 'bg-primary text-on-primary',
  success: 'bg-success text-on-success',
  warning: 'bg-warning text-on-warning',
  danger: 'bg-danger text-on-danger',
  info: 'bg-info text-on-info',
};

/**
 * AdminNavigationLayoutProgressBar renders the admin progress bar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutProgressBar({
  value,
  max = 100,
  variant = 'primary',
  label,
  className = '',
}: AdminProgressBarProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), safeMax) : 0;
  const activeSegments = Math.round((safeValue / safeMax) * ADMIN_PROGRESS_SEGMENTS);
  const fillClass = ADMIN_PROGRESS_VARIANT_CLASS[variant];

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      className={`flex h-2 w-full overflow-hidden rounded-full bg-input ${className}`.trim()}
     data-testid="admin_navigation-admin-progress-bar-control">
      {Array.from({ length: ADMIN_PROGRESS_SEGMENTS }, (_, index) => (
        <span
          // RESPONSIBILITY: Represents one fixed visual segment of the zero-business progress primitive.
          key={`progress-segment-${index + 1}`}
          aria-hidden="true"
          className={`min-w-0 flex-1 ${index < activeSegments ? fillClass : 'bg-input'}`}
        />
      ))}
    </div>
  );
}
