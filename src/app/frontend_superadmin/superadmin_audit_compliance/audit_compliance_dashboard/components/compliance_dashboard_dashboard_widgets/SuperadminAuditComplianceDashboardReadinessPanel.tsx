// RESPONSIBILITY: Renders/orchestrates SuperadminAuditComplianceReadinessPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminAuditComplianceReadinessPanel owned by the superadmin_audit_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance readiness panel section.
/**
 * RESPONSIBILITY: React component SuperadminAuditComplianceReadinessPanel owned by the superadmin_audit_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin compliance readiness panel section.
import { FileCheck2, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAuditComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';


/**
 * @description Renders the Superadmin compliance readiness panel section.
 * @dependencies lucide-react, @/app/frontend_superadmin/superadmin_audit_compliance/superadmin_audit_compliance_types/SuperadminAuditComplianceTypes
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardReadinessPanel({ data }: SuperadminAuditComplianceSectionProps) {
  const t = useTranslations('superadmin_audit_compliance');
    return (<div className="rounded-xl border border-border bg-info-bg p-4">
  <div className="flex gap-3">
    <FileCheck2 size={18} className="mt-0.5 text-info"/>
    <div>
      <p className="font-medium text-primary">
        {t('ui.keep_compliance_records_auditable_c4f616be')}</p>
      <p className="mt-1 text-xs text-secondary">
        {t('ui.tax_configuration_and_registration_data_shou_3fbdbc7f')}</p>
    </div>
    <ShieldCheck size={18} className="ms-auto text-success"/>
  </div>
    </div>);
}
