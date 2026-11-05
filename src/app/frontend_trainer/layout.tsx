// RESPONSIBILITY: Server Component route layout for the Trainer role; delegates browser-only shell behavior to TrainerNavigationMain.
import { Inter } from 'next/font/google';

import TrainerNavigationMain from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationMain';

import TrainerNavigationRoleGuard from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationRoleGuard';

import type { ReactNode } from 'react';





/**
 * @description Owns the authenticated Trainer role shell and composes the role-scoped layout infrastructure for layout.tsx.
 * @dependencies Uses only documented layout.tsx module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const trainerInter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export default function TrainerLayout({ children }: { children: ReactNode }) {
  return <TrainerNavigationRoleGuard><div className={trainerInter.className}><TrainerNavigationMain>{children}</TrainerNavigationMain></div></TrainerNavigationRoleGuard>;
}
