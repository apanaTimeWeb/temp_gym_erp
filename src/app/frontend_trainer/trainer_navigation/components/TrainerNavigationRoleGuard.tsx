"use client";
// RESPONSIBILITY: Hides the entire Trainer business module from users without the Trainer capability.
// DATA FLOW: global session → usePermissions() → role gate → Trainer children.
import { useTranslations } from 'next-intl';

import { usePermissions } from '@/lib/usePermissions';

import type { TrainerNavigationRoleGuardProps } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationRoleGuardTypes';






/**
 * @description Hides the entire Trainer business module from users without the Trainer capability.
 * @dependencies global session → usePermissions() → role gate → Trainer children.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Guards the Trainer role shell at the approved infrastructure boundary without placing business permissions inside feature modules.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNavigationRoleGuard({ children }: TrainerNavigationRoleGuardProps) {
  const t = useTranslations('TRAINER_SHELL');
  const { can } = usePermissions();
  if (!can('trainer.view')) {
    return <main className="min-h-screen flex items-center justify-center p-6"><div role="alert" className="max-w-md w-full bg-card border border-border rounded-2xl p-6 text-center" data-testid="trainer_navigation-infrastructure-role_guard_access_denied"><h1 className="text-page-title font-bold text-primary">{t("TEXT_ACCESS_DENIED")}</h1><p className="mt-2 text-sm text-secondary">{t("TEXT_YOUR_ACCOUNT_DOES_NOT_HAVE_PERMISSION_TO_0555D1E8")}</p></div></main>;
  }
  return <>{children}</>;
}
