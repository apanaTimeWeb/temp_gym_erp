import { Suspense } from 'react';
import Main from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementMain';
export default function CoachingExerciseManagementPage() { return <Suspense fallback={<div role="status" className="min-h-40 motion-safe:animate-pulse bg-skeleton-base" />}><Main/></Suspense>; }
