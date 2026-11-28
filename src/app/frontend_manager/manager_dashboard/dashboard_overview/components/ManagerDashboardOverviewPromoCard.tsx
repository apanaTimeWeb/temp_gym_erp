// RESPONSIBILITY: Renders ManagerDashboardOverviewPromoCard's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGymIdentity';

/** @description Renders a promotional or informational card for the gym on the dashboard. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewPromoCard() {
  const t = useTranslations('MANAGER_DASHBOARD');

 return (
 <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 text-on-primary bg-primary dark:bg-gradient-to-br dark:from-[#12263A] dark:via-[#141B2D] dark:to-[#0C1220] dark:border dark:border-sky-500/35 dark:text-slate-100 shadow-card">
 <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 opacity-90" />
 <h3 className="font-bold text-base mb-1">{GYM_DETAILS.name}</h3>
 <p className="text-sm mb-3 text-on-primary/90 dark:text-slate-300">{t("COPY_COMPLETE_GYM_MANAGEMENT_SYSTEM")}</p>
 <div className="text-sm font-bold tabular-nums">{GYM_DETAILS.phone}</div>
 </div>
 );
}
