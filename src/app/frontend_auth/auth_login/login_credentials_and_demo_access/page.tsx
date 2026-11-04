// RESPONSIBILITY: Resolves the Login route server session boundary and delegates interactive rendering to the Auth/Login client feature.
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

import AuthMain from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/components/AuthLoginCredentialsAndDemoAccessMain';

import { AuthLoginSessionConstants as AuthSessionConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessServerConstants';

import { AuthRoleRedirectUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessRoleRedirectUtilities';

import { AuthSessionServerUtilities } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/utils/AuthLoginCredentialsAndDemoAccessSessionServerUtilities';



/**
 * Resolves authenticated users server-side, then renders the interactive Login feature.
 * @description Keeps server-only cookie/session work in the reserved route file and delegates client composition to the canonical AuthMain boundary.
 * @dependencies Next.js cookies/redirect primitives and Auth session/redirect utilities.
 * @edge-case Unknown or unverified roles remain on Login rather than being redirected to an invented route.
 */
export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  if (token) {
    const authenticatedUser = await AuthSessionServerUtilities.resolveUser(token);
    const redirectTarget = authenticatedUser ? AuthRoleRedirectUtilities.getDashboardRoute(authenticatedUser.role) : null;
    if (redirectTarget) redirect(redirectTarget);
  }
  return <AuthMain />;
}
