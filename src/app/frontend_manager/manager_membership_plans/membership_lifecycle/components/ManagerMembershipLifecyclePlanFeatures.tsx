// RESPONSIBILITY: Displays the feature list belonging to one membership plan.
'use client';

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = { planId: string; features: string[] };

/** @description Renders the optional feature list without owning plan data or business mutation behavior. */
export default function ManagerMembershipLifecyclePlanFeatures({ planId, features }: Props) {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  if (features.length === 0) return null;

  return (
    <section aria-label={t('CRUD_PLAN_FEATURES')} className="space-y-1.5 border-t border-border pt-1">
      {features.map((feature) => (
        <div key={`plan-${planId}-feature-${feature}`} className="flex items-center gap-2 text-sm text-text-secondary">
          <CheckCircle size={18} strokeWidth={2} className="shrink-0 text-success-text" aria-hidden="true" />
          <span className="truncate">{feature}</span>
        </div>
      ))}
    </section>
  );
}
