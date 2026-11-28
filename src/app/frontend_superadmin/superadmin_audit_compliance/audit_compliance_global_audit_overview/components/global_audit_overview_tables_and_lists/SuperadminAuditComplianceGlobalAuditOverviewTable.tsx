// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Table using its declared props and feature-local hooks.
'use client';
import { ShieldAlert } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import { SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/components/global_audit_overview_states_and_feedback/SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge';
import { formatSuperadminAuditComplianceGlobalAuditTimestamp } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/utils/SuperadminAuditComplianceGlobalAuditOverviewFormatters';
import type { AuditLog } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview.types';

const TABLE_COLUMN_COUNT = 4;

/**
 * @description Renders the Superadmin global audit table interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceGlobalAuditOverviewTable({ logs }: { logs: AuditLog[] }) {
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  const locale = useLocale();

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-start border-collapse">
        <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
          <tr className="border-b border-border dark:border-white/10">
            <th scope="col" className="sticky start-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-e border-border dark:border-white/10 whitespace-nowrap px-6 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider text-secondary dark:text-slate-300">
              {t('ui.timestamp_a3d5de3e')}
            </th>
            <th scope="col" className="border-b border-border dark:border-white/10 px-6 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider text-secondary dark:text-slate-300">
              {t('ui.severity_007cc954')}
            </th>
            <th scope="col" className="border-b border-border dark:border-white/10 px-6 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider text-secondary dark:text-slate-300">
              {t('ui.action_amp_resource_7092f2db')}
            </th>
            <th scope="col" className="border-b border-border dark:border-white/10 px-6 py-3.5 text-start text-[11px] font-bold uppercase tracking-wider text-secondary dark:text-slate-300">
              {t('ui.actor_origin_ip_ba2d92b2')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.map((log) => (
            <tr key={log.id} tabIndex={0} className="group motion-safe:transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset">
              <td className="sticky start-0 z-10 bg-card dark:bg-[#0E1525] group-hover:bg-surface-hover group-focus-within:bg-surface-hover border-b border-e border-border dark:border-white/10 whitespace-nowrap px-6 py-4 transition-colors">
                <span className="font-mono text-sm text-secondary">
                  {formatSuperadminAuditComplianceGlobalAuditTimestamp(log.timestamp, locale)}
                </span>
              </td>
              <td className="border-b border-border whitespace-nowrap px-6 py-4">
                <SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge severity={log.severity} />
              </td>
              <td className="border-b border-border px-6 py-4">
                <p className="text-sm font-bold text-primary">{log.action}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono text-xs text-primary">{log.resource}</span>
                  <CopyButton value={log.resource} label={`Copy resource ${log.resource}`} />
                </div>
                <p className="mt-1 text-sm text-secondary">{log.details}</p>
              </td>
              <td className="border-b border-border whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-primary">{log.actor}</p>
                  {log.actorType ? (
                    <span className="rounded bg-input px-1.5 py-0.5 text-xs font-bold tracking-wider text-secondary">
                      {t(`ui.actor_type_${log.actorType.toLowerCase()}`)}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono text-xs text-secondary">{log.ipAddress}</span>
                  <CopyButton value={log.ipAddress} label={`Copy IP ${log.ipAddress}`} />
                </div>
              </td>
            </tr>
          ))}
          {logs.length === 0 ? (
            <tr>
              <td colSpan={TABLE_COLUMN_COUNT} className="px-6 py-12 text-center text-secondary">
                <ShieldAlert size={18} className="mx-auto mb-3 opacity-20" aria-hidden="true" />
                <p>{t('ui.no_audit_logs_match_your_search_738cf1b6')}</p>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
