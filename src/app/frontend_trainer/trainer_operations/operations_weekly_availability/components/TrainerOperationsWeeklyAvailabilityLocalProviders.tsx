"use client";
// RESPONSIBILITY: Module-local confirm/realtime contexts, isolated from sibling business modules.
import type { ReactNode } from 'react';
import { TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityTrainerInfrastructureConfirmProvider';

export default function TrainerOperationsWeeklyAvailabilityLocalProviders({children}: {children: ReactNode}) {
  return <TrainerInfrastructureConfirmProvider>{children}</TrainerInfrastructureConfirmProvider>;
}
