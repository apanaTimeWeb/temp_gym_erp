// RESPONSIBILITY: Renders/orchestrates SuperadminAuditCompliancePageHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAuditComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';

export default function SuperadminAuditComplianceDashboardPageHeader({ data }: SuperadminAuditComplianceSectionProps) {
  const t = useTranslations('superadmin_audit_compliance');
  return (
    <section className="relative overflow-hidden rounded-2xl border border-purple-500/35 bg-card dark:bg-gradient-to-br dark:from-[#1E132F] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex items-center justify-between gap-4">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#38BDF8]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.tax_compliance_541ea2ab')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.registration_coverage_tax_configuration_and__734eabe4')}</p>
      </div>
      <span className="p-3 rounded-xl border border-purple-500/35 bg-purple-500/15 text-purple-500 dark:text-purple-300 shrink-0" aria-hidden="true">
        <Shield size={20} strokeWidth={2.2} />
      </span>
    </section>
  );
}
