// RESPONSIBILITY: Renders Superadmin Audit Compliance Dashboard Documents Panel using its declared props and feature-local hooks.
'use client';
import { Fragment, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import SuperadminAuditComplianceDocumentsEmptyState from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_states_and_feedback/SuperadminAuditComplianceDashboardDocumentsEmptyState';
import { getSuperadminAuditComplianceStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/constants/superadmin_audit_compliance_dashboard_status_badge_config.constants';
import { formatComplianceDate } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/utils/SuperadminAuditComplianceDashboardFormatters';
import type { SuperadminAuditComplianceSectionProps } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';

/**
 * @description Renders the Superadmin compliance documents panel interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardDocumentsPanel({ data }: SuperadminAuditComplianceSectionProps) {
  const t = useTranslations('superadmin_audit_compliance');
  const locale = useLocale();
  const [expandedDocument, setExpandedDocument] = useState<string | null>(null);
  const documentKey = (tenant: string, document: string) => `${tenant}::${document}`;
  const documentStatusLabel = (status: string) => (() => { if (status === 'VALID') { return (t('ui.document_status_valid')); } if (status === 'EXPIRING') { return (t('ui.document_status_expiring')); } return (status); })();
  return (
    <Panel title={t('ui.compliance_documents_02396dac')} description={t('ui.tenant_level_registrations_and_expiry_dates_929cfe01')}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-surface-highlight text-start text-xs uppercase text-secondary">
            <th scope="col" className="sticky start-0 z-10 bg-surface-highlight px-3 py-3">{t('ui.tenant_6252d057')}</th>
            <th scope="col" className="px-3 py-3">{t('ui.document_09453598')}</th>
            <th scope="col" className="px-3 py-3">{t('ui.status_ec53a8c4')}</th>
            <th scope="col" className="px-3 py-3">{t('ui.expiry_ad7a5dcc')}</th>
          </tr></thead>
          <tbody>
            {data.documents.length === 0 ? <tr><td colSpan={4} className="px-3 py-6"><SuperadminAuditComplianceDocumentsEmptyState /></td></tr> : data.documents.map((document) => {
              const key = documentKey(document.tenant, document.document);
              const expanded = expandedDocument === key;
              return <Fragment key={key}>
                <tr className="border-b border-border motion-safe:transition-colors hover:bg-surface-hover">
                  <td className="sticky start-0 z-10 bg-card px-3 py-3 text-primary">
                    <Tooltip content={document.tenant}>
                      <button type="button" className="min-h-11 max-w-56 truncate text-start underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-expanded={expanded} aria-label={t(expanded ? 'ui.hide_document_details' : 'ui.show_document_details', { tenant: document.tenant })} onClick={() => setExpandedDocument(expanded ? null : key)}>
                        {document.tenant}
                      </button>
                    </Tooltip>
                  </td>
                  <td className="px-3 py-3 text-secondary">{document.document}</td>
                  <td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminAuditComplianceStatusBadgeClasses(document.status)}`}>{documentStatusLabel(document.status)}</span></td>
                  <td className="whitespace-nowrap px-3 py-3 text-secondary">{formatComplianceDate(document.expires, locale)}</td>
                </tr>
                {expanded && <tr key={`${key}-details`} className="border-b border-border bg-surface-zebra"><td colSpan={4} className="px-4 py-3"><dl className="grid grid-cols-1 gap-2 sm:grid-cols-3"><div><dt className="text-xs text-secondary">{t('ui.document_09453598')}</dt><dd className="font-medium text-primary">{document.document}</dd></div><div><dt className="text-xs text-secondary">{t('ui.status_ec53a8c4')}</dt><dd className="font-medium text-primary">{documentStatusLabel(document.status)}</dd></div><div><dt className="text-xs text-secondary">{t('ui.expiry_ad7a5dcc')}</dt><dd className="font-medium text-primary">{formatComplianceDate(document.expires, locale)}</dd></div></dl></td></tr>}
              </Fragment>;
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
