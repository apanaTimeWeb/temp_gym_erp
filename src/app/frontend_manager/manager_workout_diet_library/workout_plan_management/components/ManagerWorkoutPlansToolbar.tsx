// RESPONSIBILITY: Renders ManagerWorkoutPlansToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';

import { Search, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebouncedValueCommit';

import { WORKOUT_LEVEL_FILTER_OPTIONS } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/constants/manager_workout_plans_shared.constants';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansLogic';


/** @description Renders the ManagerWorkoutPlansToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerWorkoutPlansToolbar() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');

  const { search, setSearch, levelFilter, setLevelFilter, setCurrentPage, openAddWk } = useManagerWorkoutPlansLogic();
  const [localSearch, setLocalSearch] = useState(search);

  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  useManagerInfrastructureDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
    <div className="border-b border-border flex justify-between items-center bg-card">

      <div className="px-4 flex gap-3 items-center">
        <div className="relative hidden sm:block">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-8 pr-3 py-2 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning w-36 lg:w-48 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_workout-manager-workout-toolbar-input-value" 
            value={localSearch} 
            onChange={e => setLocalSearch(e.target.value)}  
            placeholder={t("COPY_SEARCH")} 
             
           aria-label={t("COPY_SEARCH")}/>
        </div>
        <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "hidden sm:block px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning bg-input text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_workout-manager-workout-toolbar-select-option"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            
           aria-label={t("TEXT_FILTER_WORKOUT_LEVEL")}>
            {WORKOUT_LEVEL_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_workout-managerworkouttoolbar-interactive">{t(option.labelKey)}</option>)}
        </select>
        <button data-testid="manager_workout-manager-workout-toolbar-tab" 
          onClick={openAddWk}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
         type="button">
          <Plus size={18} strokeWidth={2}/> <span className="hidden sm:inline">{t("COPY_ADD")}</span>
        </button>
      </div>
    </div>
  );
}
