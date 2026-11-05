// RESPONSIBILITY: Renders the typed Manager grievance route error boundary and its retry action.
'use client';
import { useTranslations } from 'next-intl';

import type { ManagerInfrastructureRouteErrorProps } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureRouteErrorTypes';

/** @description Route-level Error for the Manager frontend module. */
export default function Error({ reset }: ManagerInfrastructureRouteErrorProps) {
  const t = useTranslations('MANAGER_GRIEVANCE_RESOLUTION');

  return (
    <div role="alert" aria-live="assertive" data-testid="manager_grievance-error-status" className="m-4 sm:m-6 rounded-xl border border-danger bg-danger-bg p-6">
      <h2 className="text-base font-bold text-text-primary">{t("COPY_GRIEVANCES_COULD_NOT_BE_LOADED")}</h2>
      <p data-testid="manager_grievance-error-message" className="mt-1 text-sm text-text-secondary">{t("COPY_RETRY_MANAGER_GRIEVANCE_RESOLUTION_SCREEN")}</p>
      <button data-testid="manager_grievance-error-retry" type="button" onClick={reset} className="mt-4 min-h-11 rounded-lg bg-primary text-on-primary px-4 font-semibold motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_TRY_AGAIN")}</button>
    </div>
  );
}
