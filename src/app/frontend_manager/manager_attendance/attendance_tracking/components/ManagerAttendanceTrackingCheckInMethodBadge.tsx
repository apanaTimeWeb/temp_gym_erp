// RESPONSIBILITY: Renders ManagerAttendanceTrackingCheckInMethodBadge's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import type { ReactNode } from 'react';

import { Fingerprint, QrCode, Edit } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ManagerAttendanceTrackingCheckInMethodBadgeProps } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_check_in_method_badge.types';
import type { CheckInMethod } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';

// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.


/** @description Renders the ManagerAttendanceTrackingCheckInMethodBadge component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerAttendanceTrackingCheckInMethodBadge({ method }: ManagerAttendanceTrackingCheckInMethodBadgeProps) {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  if (!method) return <span className="text-text-secondary text-xs">—</span>;

  const normalizedMethod: CheckInMethod = (() => {
    const m = String(method).trim().toUpperCase();
    if (m === 'QR' || m === 'QR_SCAN') return 'QR';
    if (m === 'BIOMETRIC') return 'Biometric';
    return 'Manual';
  })();

  const config: Record<CheckInMethod, { icon: ReactNode; label: string; class: string }> = {
    QR:        { icon: <QrCode size={14} strokeWidth={2}/>,       label: t("COPY_QR"),       class: 'bg-info text-on-info' },
    Manual:    { icon: <Edit size={14} strokeWidth={2}/>,          label: t("COPY_MANUAL"),   class: 'bg-warning text-on-warning' },
    Biometric: { icon: <Fingerprint size={14} strokeWidth={2}/>,   label: t("COPY_BIOMETRIC"), class: 'bg-success text-on-success' } };
  const badgeConfig = config[normalizedMethod] || config.Manual;
  const { icon, label, class: cls } = badgeConfig;
  return (
    <span data-testid={`manager_attendance-attendance-check-in-method-badge-${normalizedMethod.toLowerCase()}`} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {icon}{label}
    </span>
  );
}
