// RESPONSIBILITY: Renders ManagerLibraryDietPlansEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Dumbbell, Plus } from 'lucide-react';
import { Apple } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ManagerLibraryDietPlansEmptyStateProps } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans_empty_state.types';


/** @description Renders a reusable, module-specific empty state for each Library collection. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerLibraryDietPlansEmptyState({ view, onAdd }: ManagerLibraryDietPlansEmptyStateProps) {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');

  const isDiet = view === 'diet';
  const label = isDiet ? t("TEXT_DIET_PLANS") : t("TEXT_EXERCISES");
  return (
    <div data-testid="manager_library-library-empty-state" className="col-span-full flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-primary">
        {isDiet ? <Apple size={18} strokeWidth={2} aria-hidden="true" /> : <Dumbbell size={18} strokeWidth={2} aria-hidden="true"/>}
      </div>
      <h3 className="text-base font-semibold text-text-primary">{t("COPY_NO")} {label} {t("COPY_FOUND")}</h3>
      <p className="max-w-md text-sm text-text-secondary">{t("COPY_TRY_CHANGING_SEARCH_CREATE_NEW")} {isDiet ? t("TEXT_DIET_PLAN") : t("TEXT_EXERCISE")} {t("COPY_GET_STARTED")}</p>
      <button data-testid="manager_library-manager-library-empty-state-add" type="button" onClick={onAdd} className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:brightness-95 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out hover:brightness-110">
        <Plus size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_ADD_1")} {isDiet ? t("TEXT_DIET_PLAN_TITLE") : t("TEXT_EXERCISE")}
      </button>
    </div>
  );
}
