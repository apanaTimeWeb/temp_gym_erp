// RESPONSIBILITY: Renders ManagerMembersDirectoryKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { MANAGER_MEMBERS_DIRECTORY_KPI_CONFIG } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_kpi.constants';
import { useFetchMemberStats } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';




/** @description Renders the four KPI stat cards (Total, Active, Pending, Expired) for the Members module. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersDirectoryKPIs() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const { data: stats, isPending, isError } = useFetchMemberStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {MANAGER_MEMBERS_DIRECTORY_KPI_CONFIG.map(s => (
        <div key={s.labelKey} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
            <s.icon size={18} className={s.color} />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">{t(s.labelKey)}</p>
            {isPending ? <div aria-label={t("COPY_LOADING")} className="h-7 w-16 rounded bg-skeleton-base motion-safe:animate-pulse" /> : isError || !stats ? <p className="text-sm text-danger-text" role="status">{t("TEXT_GENERIC_ERROR")}</p> : <p className="text-xl font-bold text-text-primary">{stats[s.key]}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
