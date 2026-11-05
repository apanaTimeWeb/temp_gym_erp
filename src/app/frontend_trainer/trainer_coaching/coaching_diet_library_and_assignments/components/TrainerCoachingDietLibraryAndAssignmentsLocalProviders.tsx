"use client";
// RESPONSIBILITY: Module-local confirm/realtime contexts, isolated from sibling business modules.
import type { ReactNode } from 'react';
import { TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureConfirmProvider';

export default function TrainerCoachingDietLibraryAndAssignmentsLocalProviders({children}: {children: ReactNode}) {
  return <TrainerInfrastructureConfirmProvider>{children}</TrainerInfrastructureConfirmProvider>;
}
