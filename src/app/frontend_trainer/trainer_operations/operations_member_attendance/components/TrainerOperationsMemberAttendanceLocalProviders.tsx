"use client";
// RESPONSIBILITY: Module-local confirm/realtime contexts, isolated from sibling business modules.
import type { ReactNode } from 'react';
import { TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureConfirmProvider';

export default function TrainerOperationsMemberAttendanceLocalProviders({children}: {children: ReactNode}) {
  return <TrainerInfrastructureConfirmProvider>{children}</TrainerInfrastructureConfirmProvider>;
}
