import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerExerciseLibraryMain';
import Loading from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/loading';

export default function ExerciseLibraryMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
