// RESPONSIBILITY: Empty state for the plans directory with a permission-gated contextual CTA at the calling boundary.
'use client';
import { PackageOpen, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SuperadminBillingPlansEmptyStateProps {
  onCreate: () => void;
}

/** Empty state for the plans directory with a permission-gated contextual CTA at the calling boundary. */
export default function SuperadminBillingPlansManagementEmptyState({ onCreate }: SuperadminBillingPlansEmptyStateProps) {
  const t = useTranslations('superadmin_billing_plans');
  return (
    <section className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center" aria-labelledby="superadmin-plans-empty-title">
      <PackageOpen size={32} aria-hidden="true" className="mb-3 text-secondary" />
      <h2 id="superadmin-plans-empty-title" className="text-lg font-semibold text-primary">{t('ui.no_plans_title')}</h2>
      <p className="mt-2 max-w-md text-sm text-secondary">{t('ui.no_plans_description')}</p>
      <button type="button" onClick={onCreate} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        <Plus size={18} aria-hidden="true" />{t('ui.create_new_plan_ec496c23')}
      </button>
    </section>
  );
}
