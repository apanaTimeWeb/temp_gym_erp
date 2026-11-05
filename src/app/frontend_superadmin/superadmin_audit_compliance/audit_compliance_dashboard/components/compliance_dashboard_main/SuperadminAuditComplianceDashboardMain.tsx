// RESPONSIBILITY: Renders and orchestrates SuperadminAuditComplianceMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminAuditComplianceMain owned by the superadmin_audit_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminAuditComplianceDashboardPage, useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardDocumentsPanel, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardPageHeader, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardReadinessPanel, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardRegionalCoveragePanel, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardSummaryCards, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/hooks/useSuperadminAuditComplianceDashboardPage
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Orchestrates the Superadmin compliance page and its focused child sections.
import { useTranslations } from 'next-intl';

import SuperadminAuditComplianceDocumentsPanel from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardDocumentsPanel';
import SuperadminAuditCompliancePageHeader from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardPageHeader';
import SuperadminAuditComplianceReadinessPanel from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardReadinessPanel';
import SuperadminAuditComplianceRegionalCoveragePanel from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardRegionalCoveragePanel';
import SuperadminAuditComplianceSummaryCards from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_dashboard_widgets/SuperadminAuditComplianceDashboardSummaryCards';
import { useSuperadminAuditComplianceDashboardPage } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/hooks/useSuperadminAuditComplianceDashboardPage';


/**
 * @description Orchestrates the Superadmin compliance page and its focused child sections.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardMain() {
  const t = useTranslations('superadmin_audit_compliance');
    // DATA FLOW: API → useSuperadminAuditComplianceDashboardPage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminAuditComplianceDashboardPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_audit_compliance-superadmin-compliance-main-page">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert" data-testid="superadmin_audit_compliance-main-error-state">
  <p className="font-semibold text-danger">
    {t('ui.compliance_data_could_not_be_loaded_3c341c06')}</p>
  <button type="button" onClick={() => refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 min-h-11 min-w-11" data-testid="superadmin_audit_compliance-superadmin-compliance-main-superadmin-compliance-main-retry">
    {t('ui.retry_6327b4e5')}</button>
        </div>);
    }
    return (<div className="space-y-6" data-testid="superadmin_audit_compliance-superadmin-compliance-main-page-ready">
      <SuperadminAuditCompliancePageHeader data={data}/>
      <SuperadminAuditComplianceSummaryCards data={data}/>
      <SuperadminAuditComplianceRegionalCoveragePanel data={data}/>
      <SuperadminAuditComplianceDocumentsPanel data={data}/>
      <SuperadminAuditComplianceReadinessPanel data={data}/>
    </div>);
}
