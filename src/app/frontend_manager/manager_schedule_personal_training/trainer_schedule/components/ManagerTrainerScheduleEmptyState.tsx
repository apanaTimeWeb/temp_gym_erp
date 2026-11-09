// RESPONSIBILITY: Renders the Manager Schedule entity-specific empty state for weekly scheduling when no trainers are available.
'use client';
import { CalendarX } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerEmptyState from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleLocalEmptyState';

/** @description Empty-state presentation for the weekly schedule surface with no trainer records. */
/**
 * @description Renders ManagerTrainerScheduleEmptyState, the manager schedule UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerTrainerScheduleEmptyState({ isSearching }: { isSearching?: boolean }) {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');
  return (
    <ManagerEmptyState
      dataTestId="manager_schedule-schedule-empty-state"
      icon={<CalendarX size={18} strokeWidth={2} />}
      title={isSearching ? t('COPY_NO_TRAINERS_MATCH_SEARCH') : t('COPY_NO_TRAINERS_FOUND')}
      subtitle={isSearching ? undefined : t('COPY_ADD_TRAINERS_HR_MODULE_BEFORE_ASSIGNING_SHIFTS')}
    />
  );
}
