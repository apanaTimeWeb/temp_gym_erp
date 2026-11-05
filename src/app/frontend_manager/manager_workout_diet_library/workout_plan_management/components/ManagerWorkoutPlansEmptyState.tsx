// RESPONSIBILITY: Renders ManagerWorkoutPlansEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Dumbbell } from 'lucide-react';
import { useTranslations } from 'next-intl';
/** @description Renders the empty state for Manager workout plans. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerWorkoutPlansEmptyState() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
 return <div data-testid="manager_workout-workout-plans-empty-state" className="col-span-full flex flex-col items-center gap-2 py-12 text-center"><Dumbbell size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true"/><p className="text-sm font-semibold text-text-primary">{t("COPY_NO_WORKOUT_PLANS_FOUND")}</p><p className="text-xs text-text-secondary">{t("COPY_TRY_CLEARING_SEARCH_CREATE_WORKOUT_PLAN")}</p></div>; }
