// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformShellNavigationMain owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: react, next/navigation, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationHeader, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSidebar, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSaaSBillingNavigation, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationTopLoader, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/SuperadminPlatformShellLayoutPropsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root Superadmin shell. Owns only sidebar collapse, persistent header, global Superadmin feedback, and shell-level alerts.
import { useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';

import SuperadminPlatformShellNavigationHeader from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationHeader';
import SuperadminSaaSBillingNavigation from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSaaSBillingNavigation';
import SuperadminPlatformShellNavigationSidebar from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSidebar';
import { SuperadminPlatformShellNavigationTopLoader } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationTopLoader';
import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants';

import type { SuperadminPlatformShellLayoutProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/superadmin_platform_shell_navigation_main_props.types';

function SuperadminSaaSBillingNavigationWrapper() {
  const pathname = usePathname();
  const showBillingNavigation = SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS.some(({ href }) => pathname === href || pathname.startsWith(`${href}/`));
  if (!showBillingNavigation) return null;
  return <SuperadminSaaSBillingNavigation />;
}

/** @description Provides the authenticated Superadmin shell composition around role-owned feature content. @dependencies Uses role layout infrastructure and zero-business UI primitives only. @edge-case Preserves responsive sidebar/header behavior across collapsed and expanded states. */
export default function SuperadminPlatformShellNavigationMain({ children }: SuperadminPlatformShellLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <SuperadminPlatformShellNavigationTopLoader />
      <div className="min-h-screen bg-page text-primary">
        <Suspense fallback={<div className="h-16 border-b border-border bg-header-translucent" />}>
          <SuperadminPlatformShellNavigationHeader />
        </Suspense>
        <Suspense fallback={<aside className="fixed inset-y-0 start-0 z-30 hidden md:block w-64 border-e border-border bg-card" />}>
          <SuperadminPlatformShellNavigationSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Suspense>
        <main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-slow ms-0 ${isCollapsed ? 'md:ms-16' : 'md:ms-64'}`}>
          <Suspense fallback={null}>
            <SuperadminSaaSBillingNavigationWrapper />
          </Suspense>
          {children}
        </main>
      </div>
    </>
  );
}
