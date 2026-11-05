import { Suspense } from 'react';
import Main from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansMain';
export default function CoachingWorkoutPlansPage() { return <Suspense fallback={<div role="status" className="min-h-40 motion-safe:animate-pulse bg-skeleton-base" />}><Main/></Suspense>; }
