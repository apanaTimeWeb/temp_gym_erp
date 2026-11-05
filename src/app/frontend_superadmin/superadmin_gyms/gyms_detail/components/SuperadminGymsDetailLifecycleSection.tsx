// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDetailLifecycleSection within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailLifecycleSection owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next/link, lucide-react, next-intl, @/lib/formatters, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_lifecycle_section.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders read-only SaaS plan and onboarding lifecycle information for a gym.
import { CreditCard, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { displayValue } from '@/lib/display_value';

import type { SuperadminGymsGymDetailLifecycleSectionProps } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_lifecycle_section.types';


/**
 * @description Renders GymsGymDetailLifecycleSection within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDetailLifecycleSection({ gym, billingRoute }: SuperadminGymsGymDetailLifecycleSectionProps) {
  const t = useTranslations('superadmin_gyms');
  const steps = [
    { labelKey: 'ui.gym_lifecycle_account_created', complete: Boolean(gym.createdAt), value: gym.createdAt ? gym.createdAt : null },
    { labelKey: 'ui.gym_lifecycle_billing_configured', complete: Number.isFinite(gym.billing.monthlyIncome) && gym.billing.monthlyIncome >= 0 && Boolean(gym.billing.currency), value: null },
  ] as const;
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2"><div className="space-y-6 rounded-xl border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-lg font-bold text-primary"><CreditCard size={18} strokeWidth={2} aria-hidden="true"/> {t('ui.current_saas_plan_9af5cde7')}</h2><div className="relative overflow-hidden rounded-lg border border-border bg-floating p-5"><p className="text-sm text-secondary">{t('ui.active_plan_ed9716ac')}</p><p className="text-3xl font-bold text-primary">{displayValue(gym.subscription.plan).toUpperCase()}</p><p className="mt-2 flex items-center gap-1 text-sm text-success"><span className="inline-block h-2 w-2 rounded-full bg-success text-on-success" aria-hidden="true"/> {t('ui.active_subscription_d0be557e')}</p></div><Link href={billingRoute} className="block min-h-11 rounded-lg border border-border px-4 py-2.5 text-center font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-lifecycle-section-manage-billing-amp-plans">{t('ui.manage_billing_amp_plans_f7b4aef1')}</Link></div><div className="space-y-6 rounded-xl border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-lg font-bold text-primary"><Ticket size={18} strokeWidth={2} aria-hidden="true"/> {t('ui.onboarding_status_ec66a343')}</h2><ul className="space-y-4">{steps.map(({ labelKey, complete, value }) => <li key={labelKey} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-floating p-3 text-sm"><span className="font-medium text-primary">{t(labelKey)}</span><span className={`rounded px-2 py-1 text-xs font-semibold ${complete ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>{value ? value : t(complete ? 'ui.gym_lifecycle_complete' : 'ui.gym_lifecycle_pending')}</span></li>)}</ul></div></div>;
}
