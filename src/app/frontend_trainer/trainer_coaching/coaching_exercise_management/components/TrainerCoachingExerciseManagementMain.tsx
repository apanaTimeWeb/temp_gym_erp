// RESPONSIBILITY: Composes the Exercise Management screen from feature-owned sections; data access and mutations stay in hooks.
'use client';
import TrainerWorkoutBanner from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementBanner';
import TrainerWorkoutToolbar from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementToolbar';
import TrainerWorkoutExercisesView from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementExercisesView';
import TrainerWorkoutExerciseModal from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementExerciseModal';
export default function TrainerCoachingExerciseManagementMain() {
  return <section className="min-h-full space-y-5 bg-page p-4 text-primary sm:p-6"><TrainerWorkoutBanner /><div className="overflow-hidden rounded-xl border border-border bg-card shadow-card"><TrainerWorkoutToolbar/><div className="p-5"><TrainerWorkoutExercisesView/></div></div><TrainerWorkoutExerciseModal/></section>;
}
