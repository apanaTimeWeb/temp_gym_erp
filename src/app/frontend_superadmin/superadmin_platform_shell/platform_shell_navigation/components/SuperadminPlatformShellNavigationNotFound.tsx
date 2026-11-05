// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationNotFound within its owning Superadmin feature module; no direct backend implementation.
/**
 * RESPONSIBILITY: React component SuperadminPlatformShellNavigationNotFound owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: next/link, lucide-react, @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Reusable 404 Not Found template for superadmin modules
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES as SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/config/superadmin_platform_shell_navigation.url_config';


/**
 * @description Renders LayoutNotFound within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformShellNavigationNotFound({
  title = 'Page Not Found',
  description = "The page you are looking for doesn't exist or has been moved.",
  returnLink = SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.DASHBOARD,
  returnText = 'Return to Dashboard',
}: {
  title?: string;
  description?: string;
  returnLink?: string;
  returnText?: string;
}) {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center p-6 bg-card rounded-xl border border-border mt-4" data-testid="superadmin_platform_shell_layout-layoutnotfound-state">
      <AlertCircle size={18} className="text-secondary mb-4" />
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-secondary mb-6">{description}</p>
      <Link href={returnLink} className="min-h-11 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-not-found-superadmin-not-found-link">
        {returnText}
      </Link>
    </div>
  );
}
