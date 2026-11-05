// RESPONSIBILITY: Provide independent module-local interactive context for this route leaf.
import type { ReactNode } from 'react';
import LocalProviders from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityLocalProviders';
export default function Layout({ children }: { children: ReactNode }) { return <LocalProviders>{children}</LocalProviders>; }
