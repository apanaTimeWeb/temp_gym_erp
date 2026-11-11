// RESPONSIBILITY: Server component entry point for the Superadmin Global Audit module.



import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import SuperadminAuditComplianceGlobalAuditMain from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/components/global_audit_overview_main/SuperadminAuditComplianceGlobalAuditOverviewMain';
import Loading from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/loading';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('superadmin_audit_compliance_global_audit');
  return { title: t('page.title'), description: t('page.description') };
}
/**
 * @description Server component entry point for the Superadmin Global Audit module.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminAuditComplianceGlobalAuditPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuperadminAuditComplianceGlobalAuditMain />
    </Suspense>
  );
}
