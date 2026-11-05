// RESPONSIBILITY: Presents the assigned workout plans zero-result state; query state and assignment rules remain with the parent.
'use client';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state for assigned workout plans. */
export default function ManagerAssignedWorkoutPlansEmptyState() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  return <div data-testid="manager-assigned-workout-plans-empty-state" role="status" aria-live="polite" className="p-6 text-text-secondary">{t('COPY_NO_ASSIGNED_PLANS')}</div>;
}
