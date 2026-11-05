// RESPONSIBILITY: Renders Superadmin Audit Compliance Dashboard Regional Coverage Panel using its declared props and feature-local hooks.
'use client';
import { Landmark } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Panel from '@/components/ui/Panel';
import ProgressBar from '@/components/ui/ProgressBar';
import SuperadminAuditComplianceRegionalCoverageEmptyState from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_states_and_feedback/SuperadminAuditComplianceDashboardRegionalCoverageEmptyState';
import { getSuperadminAuditComplianceStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/constants/superadmin_audit_compliance_dashboard_status_badge_config.constants';
import { formatComplianceNumber, formatCompliancePercentage } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/utils/SuperadminAuditComplianceDashboardFormatters';
import type { SuperadminAuditComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';

/**
 * @description Renders the Superadmin compliance regional coverage panel interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardRegionalCoveragePanel({ data }: SuperadminAuditComplianceSectionProps) {
  const t = useTranslations('superadmin_audit_compliance');
  const locale = useLocale();
  const statusLabel = (status: string) => (() => { if (status === 'READY') { return (t('ui.status_ready')); } if (status === 'ATTENTION') { return (t('ui.status_attention')); } return (status); })();
  return <Panel title={t('ui.regional_coverage_5acf0835')} description={t('ui.compare_tax_registration_completeness_by_reg_511a72cd')}>
    <div className="space-y-4">
      {data.regions.length === 0 ? <SuperadminAuditComplianceRegionalCoverageEmptyState /> : data.regions.map((region) => {
        const total = region.registered + region.missing;
        const percent = total > 0 ? Math.round((region.registered / total) * 100) : 0;
        return <div key={region.region} className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Landmark size={18} className="text-primary" aria-hidden="true"/><span className="font-medium text-primary">{region.region}</span></div><span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminAuditComplianceStatusBadgeClasses(region.status)}`}>{statusLabel(region.status)}</span></div>
          <div className="mt-3"><ProgressBar value={percent} label={t('ui.progress_registered_missing', { registered: formatComplianceNumber(region.registered, locale), missing: formatComplianceNumber(region.missing, locale) })} data-testid={`superadmin-compliance-regional-coverage-${region.region.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}/></div>
          <p className="mt-2 text-xs text-secondary">{t('ui.configured_tax_rate_01aa5937')} {formatCompliancePercentage(region.taxRate, locale)}{t('ui.text_0bcef9c4')}</p>
        </div>;
      })}
    </div>
  </Panel>;
}
