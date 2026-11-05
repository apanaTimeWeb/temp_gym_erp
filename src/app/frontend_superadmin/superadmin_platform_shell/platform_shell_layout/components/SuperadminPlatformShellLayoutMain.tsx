// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellLayoutMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Composes the role-level providers required by the Superadmin application shell without owning feature business state.
import '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/components/styles/SuperadminPlatformShellLayoutStyles.css';

import { SuperadminPlatformShellLayoutSocketProvider } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/components/SuperadminPlatformShellLayoutSocketProvider';
import { SuperadminPlatformShellLayoutThemeProvider } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/components/SuperadminPlatformShellLayoutThemeProvider';

import type { SuperadminPlatformShellLayoutMainProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/types/superadmin_platform_shell_layout_infrastructure.types';


/**
 * @description Mounts role-level theme and WebSocket infrastructure once around each Superadmin route surface.
 * @dependencies Composes the role-owned SuperadminPlatformShellLayoutThemeProvider and SuperadminPlatformShellLayoutSocketProvider.
 * @edge-case Keeps providers independent of business feature state so feature modules remain portable.
 */
export default function SuperadminPlatformShellLayoutMain({ children }: SuperadminPlatformShellLayoutMainProps) {
  return (
    <SuperadminPlatformShellLayoutThemeProvider>
      <SuperadminPlatformShellLayoutSocketProvider>{children}</SuperadminPlatformShellLayoutSocketProvider>
    </SuperadminPlatformShellLayoutThemeProvider>
  );
}
