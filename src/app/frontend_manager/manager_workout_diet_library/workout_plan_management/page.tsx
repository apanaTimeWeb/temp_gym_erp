import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/components/ManagerWorkoutPlanManagementMain';
import Loading from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/loading';

export default function WorkoutPlanManagementMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
