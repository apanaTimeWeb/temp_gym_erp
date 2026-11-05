"use client";
// RESPONSIBILITY: Module-local confirm/realtime contexts, isolated from sibling business modules.
import type { ReactNode } from 'react';
import { TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureConfirmProvider';

export default function TrainerMembersDirectoryAndProfileLocalProviders({children}: {children: ReactNode}) {
  return <TrainerInfrastructureConfirmProvider>{children}</TrainerInfrastructureConfirmProvider>;
}
