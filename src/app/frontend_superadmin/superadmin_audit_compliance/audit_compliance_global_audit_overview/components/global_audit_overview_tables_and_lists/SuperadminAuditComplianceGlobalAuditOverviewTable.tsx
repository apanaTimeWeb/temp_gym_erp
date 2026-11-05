// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Table using its declared props and feature-local hooks.
'use client';
import { ShieldAlert } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/components/global_audit_overview_states_and_feedback/SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge';
import { formatSuperadminAuditComplianceGlobalAuditTimestamp } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/utils/SuperadminAuditComplianceGlobalAuditOverviewFormatters';
import type { AuditLog } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview.types';

/**
 * @description Renders the Superadmin global audit table interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceGlobalAuditOverviewTable({ logs }: { logs: AuditLog[] }) {
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  const locale = useLocale();
  return <div className="overflow-x-auto">
    <table className="w-full text-start"><thead><tr className="border-b border-border bg-header"><th scope="col" className="whitespace-nowrap px-6 py-4 text-start text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.timestamp_a3d5de3e')}</th><th scope="col" className="px-6 py-4 text-start text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.severity_007cc954')}</th><th scope="col" className="px-6 py-4 text-start text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.action_amp_resource_7092f2db')}</th><th scope="col" className="px-6 py-4 text-start text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.actor_origin_ip_ba2d92b2')}</th></tr></thead>
      <tbody className="divide-y divide-border">{logs.map((log) => <tr key={log.id} className="motion-safe:transition-colors hover:bg-surface-hover"><td className="whitespace-nowrap px-6 py-4"><span className="font-mono text-sm text-secondary">{formatSuperadminAuditComplianceGlobalAuditTimestamp(log.timestamp, locale)}</span></td><td className="whitespace-nowrap px-6 py-4"><SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge severity={log.severity}/></td><td className="px-6 py-4"><p className="text-sm font-bold text-primary">{log.action}</p><p className="mt-1 font-mono text-xs text-primary">{log.resource}</p><p className="mt-1 text-sm text-secondary">{log.details}</p></td><td className="whitespace-nowrap px-6 py-4"><div className="flex items-center gap-2"><p className="text-sm font-medium text-primary">{log.actor}</p>{log.actorType ? <span className="rounded bg-input px-1.5 py-0.5 text-xs font-bold tracking-wider text-secondary">{t(`ui.actor_type_${log.actorType.toLowerCase()}`)}</span> : null}</div><p className="mt-1 font-mono text-xs text-secondary">{log.ipAddress}</p></td></tr>)}
      {logs.length === 0 ? <tr><td colSpan={4} className="px-6 py-12 text-center text-secondary"><ShieldAlert size={18} className="mx-auto mb-3 opacity-20" aria-hidden="true"/><p>{t('ui.no_audit_logs_match_your_search_738cf1b6')}</p></td></tr> : null}</tbody>
    </table>
  </div>;
}
