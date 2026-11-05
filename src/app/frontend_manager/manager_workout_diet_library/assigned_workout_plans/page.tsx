import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/components/ManagerAssignedWorkoutPlansMain';
import Loading from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/loading';

export const dynamic = 'force-dynamic';
export default function AssignedWorkoutPlansMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
