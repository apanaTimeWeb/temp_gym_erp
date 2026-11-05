// RESPONSIBILITY: Renders ManagerInfrastructurePermissionGate's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { usePermissions } from '@/lib/usePermissions';

import type { ManagerInfrastructurePermissionGateProps } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructurePermissionGateTypes';




/** @description Hides the Manager module UI when the authenticated user lacks the required capability. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves permission-aware UI. */
export default function ManagerInfrastructurePermissionGate({ capability, children }: ManagerInfrastructurePermissionGateProps) {
  const t = useTranslations('MANAGER_INFRASTRUCTURE');

  const { can } = usePermissions();
  if (!can(capability)) {
    return (
      <section className="flex min-h-full items-center justify-center p-6" aria-label={t("COPY_PERMISSION_DENIED_1")}>
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <h1 className="text-xl font-semibold text-text-primary">{t("COPY_PERMISSION_DENIED_2")}</h1>
          <p className="mt-2 text-sm text-text-secondary">{t("COPY_CURRENT_ROLE_DOES_NOT_HAVE_ACCESS_MANAGER_WORKSPACE")}</p>
        </div>
      </section>
    );
  }
  return <>{children}</>;
}
