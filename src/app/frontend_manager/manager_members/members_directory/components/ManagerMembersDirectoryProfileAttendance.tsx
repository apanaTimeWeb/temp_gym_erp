// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useTranslations } from 'next-intl';

import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useFetchAttendance } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import { formatMemberMonthYear } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryDateFormatters';


/** @description Renders the ManagerMembersDirectoryProfileAttendance component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersDirectoryProfileAttendance() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');

  const { selectedMember } = useManagerMembersDirectoryLogic();
  const { data: att = [] } = useFetchAttendance(selectedMember?.id ?? null);

  if (!selectedMember) return null;

  const attendanceData = att as Array<{ day?: number; status?: string }>;
  const presentDays = attendanceData.filter((a) => a.status === MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P).length;
  const absentDays = attendanceData.filter((a) => a.status === MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.A).length;
  const attPct = att.length > 0 ? Math.round((presentDays / att.length) * 100) : 0;
  const currentMonthLabel = formatMemberMonthYear(new Date());

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: t("COPY_PRESENT"), value: presentDays, color: 'text-success-text', bg: 'bg-success-bg' },
          { label: t("COPY_ABSENT"), value: absentDays, color: 'text-danger-text', bg: 'bg-danger-bg' },
          { label: t("COPY_ATTENDANCE"), value: `${attPct}%`, color: attPct >= 75 ? 'text-success-text' : 'text-danger-text', bg: 'bg-input' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border`}>
            <p className="text-xs text-text-secondary mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-text-secondary">{t("COPY_CURRENT_MONTH_ATTENDANCE")}</p>
        <span className="text-sm font-bold text-primary bg-primary-subtle px-3 py-1 rounded-full">
          {currentMonthLabel}
        </span>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
        {attendanceData.map(({ day, status }) => (
          <div 
            key={day} 
            className={`h-10 w-full rounded-lg flex items-center justify-center text-xs font-bold border-none ${
              (() => { if (status === MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.P) return 'bg-success text-on-success'; return (() => { if (status === MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.A) return 'bg-danger text-on-danger'; return 'bg-input text-text-secondary border border-border'; })(); })()
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
