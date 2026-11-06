// RESPONSIBILITY: Owns the Next.js Superadmin role layout boundary and composes only role-level providers and shell infrastructure.

import { ConfirmProvider } from '@/components/ui/Feedback/ConfirmProvider';

import SuperadminPlatformShellLayoutMain from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/components/SuperadminPlatformShellLayoutMain';
import SuperadminPlatformShellNavigationMain from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationMain';

import type { SuperadminPlatformShellLayoutProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/types/superadmin_platform_shell_layout_props.types';


export const instant = false;

export const metadata = {
  title: 'GymSmart Superadmin | Gym Management System',
  description: 'Complete gym management platform superadmin dashboard.',
};

/**
 * @description Renders the frontend_superadmin role-container layout and composes role-scoped shell/provider infrastructure.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function FRONTEND_SUPERADMINLayout({ children }: SuperadminPlatformShellLayoutProps) {
  return (
    <ConfirmProvider>
      <SuperadminPlatformShellLayoutMain>
        <SuperadminPlatformShellNavigationMain>{children}</SuperadminPlatformShellNavigationMain>
      </SuperadminPlatformShellLayoutMain>
    </ConfirmProvider>
  );
}
