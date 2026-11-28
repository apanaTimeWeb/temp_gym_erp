// RESPONSIBILITY: Renders ManagerLibraryDietPlansContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerToast from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansLocalToast';

import ManagerLibraryDietPlansDietModal from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansDietModal';
import ManagerLibraryDietPlansExerciseModal from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansExerciseModal';
import ManagerLibraryDietPlansTabs from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansTabs';
import ManagerLibraryDietPlansDietView from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansDietView';
import ManagerLibraryDietPlansExercisesView from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansExercisesView';
import ManagerLibraryDietPlansDeletionRequestsView from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansDeletionRequestsView';
import { useManagerLibraryDietPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLogic';


/** @description Renders the ManagerLibraryDietPlansContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerLibraryDietPlansContent() {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');

 const { view, toast, hideToast } = useManagerLibraryDietPlansLogic();

 return (
 <div className="min-h-full pb-10 bg-page trainer-aurora-canvas text-text-primary">
 
 <div className="p-4 sm:p-6 space-y-5">
 <ManagerLibraryDietPlansTabs  data-testid="manager_library-managerlibrarycontent-library-tabs-1"/>
 
 <div className="relative overflow-hidden rounded-2xl border border-border dark:border-lime-500/25 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-4 sm:p-5 shadow-card">
   <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#84CC16] via-[#10B981] to-[#38BDF8] z-30" />
   {view === 'diet' ? (
     <ManagerLibraryDietPlansDietView />
   ) : view === 'exercises' ? (
     <ManagerLibraryDietPlansExercisesView />
   ) : (
     <ManagerLibraryDietPlansDeletionRequestsView />
   )}
 </div>
 </div>


 <ManagerLibraryDietPlansDietModal />
 <ManagerLibraryDietPlansExerciseModal />

 {toast && (
 <ManagerToast data-testid="manager_library-managerlibrarycontent-managertoast-2" message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}
