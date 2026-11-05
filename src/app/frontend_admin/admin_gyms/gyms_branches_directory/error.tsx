"use client";
// RESPONSIBILITY: Renders the error boundary for the branches module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_branches/branches_directory/error.tsx)

import { useTranslations } from 'next-intl';
import { ADMIN_BRANCHES_ROUTES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/config/admin_gyms_branches_directory.url_config';
import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/utils/AdminGymsBranchesDirectoryMonitoring';
import type { AdminBranchesErrorProps } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryErrorPropsTypes';

/**
 * AdminBranchesError renders the admin branches error UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminBranchesError({ error, reset }: AdminBranchesErrorProps) {
  const t = useTranslations();

// EFFECT: Synchronizes this component effect with its declared React dependencies in branches/error.tsx.
  useEffect(() => {
    // Log the route-level error once while keeping internal error details out of the UI.
    logErrorToMonitoring(error, { module: 'branches' });
  }, [error]);

  if ((error as unknown as { status?: number }).status === StatusCodes.FORBIDDEN) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-danger">{t('branches.AdminBranchesError.text_1647b9db6c')}</h2>
        <p className="text-secondary mb-6">{t('branches.AdminBranchesError.text_1879a51e18')}</p>
        <Link data-testid="admin_branches-error-state" href={ADMIN_BRANCHES_ROUTES.dashboard} className="inline-flex min-h-11 items-center justify-center px-4 py-2 rounded-md bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
          {t('branches.AdminBranchesError.text_cdac261089')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-border mt-4">
      <AlertTriangle className="  text-danger mb-4"  size={18} strokeWidth={2}/>
      <h3 className="text-lg font-bold text-primary mb-2">{t('branches.AdminBranchesError.text_8d886c0ba6')}</h3>
      <p className="text-secondary">{t('branches.AdminBranchesError.text_f10af425f9')}</p>
      <button type="button"
        onClick={() => reset()}
        className="px-4 py-2 mt-4 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
       data-testid="admin_branches-error-state-2">
        {t('branches.AdminBranchesError.text_042c862e44')}</button>
    </div>
  );
}
