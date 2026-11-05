// RESPONSIBILITY: Renders Superadmin Audit Compliance Dashboard Summary Cards using its declared props and feature-local hooks.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import MetricCard from '@/components/ui/MetricCard';
import { formatComplianceNumber } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/utils/SuperadminAuditComplianceDashboardFormatters';
import type { SuperadminAuditComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';

/**
 * @description Renders the Superadmin compliance summary cards interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardSummaryCards({ data }: SuperadminAuditComplianceSectionProps) {
  const t = useTranslations('superadmin_audit_compliance');
  const locale = useLocale();
  return <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <MetricCard label={t('ui.registered_tenants_90a68246')} value={formatComplianceNumber(data.summary.registeredTenants, locale)} helper={t('ui.registered_tenants_90a68246')} tone="success" data-testid="superadmin-compliance-registered-tenants"/>
    <MetricCard label={t('ui.missing_tax_details_9a1779f3')} value={formatComplianceNumber(data.summary.missingTaxDetails, locale)} helper={t('ui.need_review_16dc4e12')} tone="warning" data-testid="superadmin-compliance-missing-tax-details"/>
    <MetricCard label={t('ui.documents_expiring_17fbd246')} value={formatComplianceNumber(data.summary.documentsExpiring, locale)} helper={t('ui.near_term_renewals_7804ac74')} tone="warning" data-testid="superadmin-compliance-documents-expiring"/>
    <MetricCard label={t('ui.open_tasks_69190445')} value={formatComplianceNumber(data.summary.openComplianceTasks, locale)} helper={t('ui.compliance_work_dc69d074')} tone="danger" data-testid="superadmin-compliance-open-tasks"/>
  </div>;
}
