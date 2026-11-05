// RESPONSIBILITY: Renders ManagerAttendanceTrackingKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { CalendarCheck, Users, UserCog } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerAttendanceTrackingLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLogic';


/** @description Renders the top KPI stat cards (total check-ins, member check-ins, staff check-ins) for the Attendance module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerAttendanceTrackingKPIs() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

 const { todayStats } = useManagerAttendanceTrackingLogic();

 const kpis = [
 { label: t("COPY_TODAY_S_CHECK_INS"), value: todayStats.totalCheckIns, icon: CalendarCheck, color: 'text-warning-text', bg: "bg-warning-bg" },
 { label: t("COPY_MEMBER_CHECK_INS"), value: todayStats.memberCheckIns, icon: Users, color: 'text-info-text', bg: "bg-info-bg" },
 { label: t("COPY_STAFF_CHECK_INS"), value: todayStats.staffCheckIns, icon: UserCog, color: 'text-success-text', bg: "bg-success-bg" },
 ];

 return (
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {kpis.map((s) => (
 <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
 <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
 <s.icon size={18} className={s.color} />
 </div>
 <div>
 <p className="text-xs text-text-secondary font-medium">{s.label}</p>
 <p className="text-xl font-bold text-text-primary">{s.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
