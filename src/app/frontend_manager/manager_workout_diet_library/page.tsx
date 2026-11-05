// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerWorkoutDietLibraryDomainRedirectPage() {
  redirect('/frontend_manager/manager_workout_diet_library/workout_plan_management');
}
