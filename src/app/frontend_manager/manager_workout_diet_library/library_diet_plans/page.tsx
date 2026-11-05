// Autonomous leaf route for manager_library.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansMain';
import Loading from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/loading';

export const dynamic = 'force-dynamic';

export default function ManagerLibraryDietPlansPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
