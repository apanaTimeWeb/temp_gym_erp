"use client";
// RESPONSIBILITY: Module-local confirm/realtime contexts, isolated from sibling business modules.
import type { ReactNode } from 'react';
import TrainerInfrastructureSocketProvider from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsTrainerInfrastructureSocketProvider';

export default function TrainerAccountNotificationsLocalProviders({children}: {children: ReactNode}) {
  return <TrainerInfrastructureSocketProvider>{children}</TrainerInfrastructureSocketProvider>;
}
