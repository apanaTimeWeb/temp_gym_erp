"use client";
// RESPONSIBILITY: Reusable 404 Not Found template for admin modules
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/shell/AdminNavigationLayoutNotFound.tsx)

import { ADMIN_DASHBOARD_URL } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/config/admin_gyms_branches_directory.url_config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import type { AdminNavigationLayoutNotFoundProps } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryShellContractTypes';

/**
 * AdminNavigationLayoutNotFound renders the admin not found UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutNotFound({
  title,
  description,
  returnLink = ADMIN_DASHBOARD_URL,
  returnText,
}: AdminNavigationLayoutNotFoundProps) {
  const t = useTranslations();
  const resolvedTitle = title ?? t('admin_layout.AdminNavigationLayoutNotFound.title');
  const resolvedDescription = description ?? t('admin_layout.AdminNavigationLayoutNotFound.description');
  const resolvedReturnText = returnText ?? t('admin_layout.AdminNavigationLayoutNotFound.returnToDashboard');

  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-border mt-4">
      <AlertCircle className="  text-secondary mb-4"  size={18} strokeWidth={2}/>
      <h3 className="text-lg font-bold text-primary mb-2">{resolvedTitle}</h3>
      <p className="text-secondary mb-6">{resolvedDescription}</p>
      <Link data-testid="admin_navigation-admin-not-found-navigate" href={returnLink} className="min-h-11 min-w-11 inline-flex items-center justify-center px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        {resolvedReturnText}
      </Link>
    </div>
  );
}
