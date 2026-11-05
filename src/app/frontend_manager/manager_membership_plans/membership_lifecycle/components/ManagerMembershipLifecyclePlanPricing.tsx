// RESPONSIBILITY: Displays a plan’s normalized duration-price rows using the shared currency formatter.
'use client';

import { useLocale, useTranslations } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { ManagerMembershipLifecycleFormatCurrency } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/utils/ManagerMembershipLifecycleFormatters';
import type { Plan } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';

type Props = { plan: Plan };

/** @description Displays four price periods for a membership plan using the central minor-unit currency formatter. */
export default function ManagerMembershipLifecyclePlanPricing({ plan }: Props) {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  const locale = useLocale();
  const rows = [
    { label: t('COPY_1_MONTH'), price: plan.price1Month },
    { label: t('COPY_3_MONTHS'), price: plan.price3Month },
    { label: t('COPY_6_MONTHS'), price: plan.price6Month },
    { label: t('COPY_12_MONTHS'), price: plan.price12Month },
  ];

  return (
    <section aria-label={t('CRUD_PLAN_PRICING')} className="grid grid-cols-2 gap-2">
      {rows.map((row) => (
        <div key={`plan-${plan.id}-price-${row.label}`} className="rounded-lg bg-input px-3 py-2">
          <p className="text-xs text-text-secondary">{row.label}</p>
          <p className="text-sm font-bold text-text-primary">{ManagerMembershipLifecycleFormatCurrency(row.price, ManagerEnvConfig.currencyCode, locale)}</p>
        </div>
      ))}
    </section>
  );
}
