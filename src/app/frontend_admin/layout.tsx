// RESPONSIBILITY: Root layout for the ADMIN role container. The consuming application owns the canonical QueryClientProvider; this role container must not create a second server-state cache boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (layout.tsx)

import React from 'react';
import { Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import AdminNavigationLayoutI18nProvider from '@/app/frontend_admin/admin_navigation/components/i18n/AdminNavigationLayoutI18nProvider';
import AdminNavigationLayout from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayout';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutConfirmProvider';
import { AdminNavigationLayoutToastProvider } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastProvider';
import AdminNavigationLayoutDialogAccessibilityProvider from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutDialogAccessibilityProvider';
import AdminNavigationLayoutToastBridge from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastBridge';
import AdminNavigationLayoutWebSocketProvider from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutWebSocketProvider';
import AdminGymsBranchesDirectoryHeaderSelector from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/header_selector/AdminGymsBranchesDirectoryHeaderSelector';
import type { AdminRootLayoutProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';


const inter = Inter({ subsets: ['latin'], display: 'swap' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('admin_layout.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

/**
 * ADMINLayout is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function ADMINLayout({ children }: AdminRootLayoutProps) {
  return (
    <div className={inter.className}>
      <AdminNavigationLayoutI18nProvider>
        <AdminNavigationLayoutWebSocketProvider>
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <AdminNavigationLayoutConfirmProvider>
            <AdminNavigationLayoutToastProvider />
            <AdminNavigationLayoutDialogAccessibilityProvider />
            <AdminNavigationLayoutToastBridge />
            <AdminNavigationLayout headerContextSlot={<AdminGymsBranchesDirectoryHeaderSelector />}>{children}</AdminNavigationLayout>
          </AdminNavigationLayoutConfirmProvider>
        </AdminNavigationLayoutWebSocketProvider>
      </AdminNavigationLayoutI18nProvider>
    </div>
  );
}
