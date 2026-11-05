// RESPONSIBILITY: Provide independent module-local interactive context for this route leaf.
import type { ReactNode } from 'react';
import LocalProviders from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsLocalProviders';
export default function Layout({ children }: { children: ReactNode }) { return <LocalProviders>{children}</LocalProviders>; }
