"use client";
// RESPONSIBILITY: Renders the empty state for attendance records.
import { CalendarX } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerAttendanceEmptyStateProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceEmptyStateProps';





/**
 * @description Renders the empty state for attendance records.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders the attendance feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerAttendanceEmptyState({ isFiltered }: TrainerAttendanceEmptyStateProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12" data-testid="trainer_attendance-empty-state">
          <div className="w-12 h-12 rounded-full bg-surface-highlight flex items-center justify-center mb-4">
            <CalendarX className="text-secondary"  strokeWidth={2} size={18}/>
          </div>
          <h3 className="text-sm font-semibold text-primary mb-1">
            {isFiltered ? t("TEXT_NO_MATCHES_FOUND") : t("TEXT_NO_ATTENDANCE_RECORDS")}
          </h3>
          <p className="text-sm text-secondary max-w-sm">
            {isFiltered 
              ? t("TEXT_TRY_ADJUSTING_YOUR_SEARCH_OR_FILTERS_TO__D3AFBBCA")
              : t("TEXT_ATTENDANCE_RECORDS_FOR_MEMBERS_WILL_APPE_30DEA35F")}
          </p>
    </div>
  );
}

