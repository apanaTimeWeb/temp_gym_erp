// RESPONSIBILITY: Provides the route-level Login structural loading boundary and delegates skeleton composition to the Login loading view.
import AuthLoginLoadingSkeleton from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/loading_skeleton/AuthLoginCredentialsAndDemoAccessLoginLoadingSkeleton';



/**
 * Renders the Login route loading skeleton while the page-level server boundary resolves.
 * @description Keeps full-page loading structural and motion-safe without a generic spinner.
 * @dependencies AuthLoginLoadingSkeleton.
 * @edge-case The same structural skeleton is safe at narrow mobile widths.
 */
export default function Loading() {
  return <AuthLoginLoadingSkeleton />;
}
