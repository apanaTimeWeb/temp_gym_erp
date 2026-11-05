// RESPONSIBILITY: Renders ManagerDashboardOverviewPromoCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGymIdentity';

/** @description Renders a promotional or informational card for the gym on the dashboard. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewPromoCard() {
  const t = useTranslations('MANAGER_DASHBOARD');

 return (
 <div className="rounded-xl p-5 text-on-primary bg-primary shadow-card">
 <h3 className="font-semibold mb-1">{GYM_DETAILS.name}</h3>
 <p className="text-sm mb-3 text-on-primary">{t("COPY_COMPLETE_GYM_MANAGEMENT_SYSTEM")}</p>
 <div className="text-sm font-bold">{GYM_DETAILS.phone}</div>
 </div>
 );
}
