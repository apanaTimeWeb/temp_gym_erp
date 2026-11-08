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
 <div className="min-h-full pb-10 bg-page text-text-primary">
 
 <div className="p-6 space-y-5">
 <ManagerLibraryDietPlansTabs  data-testid="manager_library-managerlibrarycontent-library-tabs-1"/>
 
 <div className="overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card">
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
