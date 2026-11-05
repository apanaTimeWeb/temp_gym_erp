// RESPONSIBILITY: Provide independent module-local interactive context for this route leaf.
import type { ReactNode } from 'react';
import LocalProviders from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceLocalProviders';
export default function Layout({ children }: { children: ReactNode }) { return <LocalProviders>{children}</LocalProviders>; }
