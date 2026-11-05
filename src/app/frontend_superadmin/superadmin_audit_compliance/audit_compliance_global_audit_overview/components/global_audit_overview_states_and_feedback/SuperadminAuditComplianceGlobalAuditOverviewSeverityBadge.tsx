// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Severity Badge using its declared props and feature-local hooks.
'use client';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';
import type { SuperadminAuditComplianceGlobalAuditSeverityBadgeProps } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview_severity_badge.types';

/**
 * @description Renders the Superadmin global audit severity badge interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export function SuperadminAuditComplianceGlobalAuditOverviewSeverityBadge({ severity }: SuperadminAuditComplianceGlobalAuditSeverityBadgeProps) {
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  const Icon = (() => { if (severity === 'CRITICAL') { return (ShieldAlert); } if (severity === 'WARNING') { return (AlertTriangle); } return (Info); })();
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold tracking-wider ${SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES[severity]}`} data-testid={`superadmin-global-audit-severity-${severity.toLowerCase()}`}><Icon size={18} strokeWidth={2} aria-hidden="true" />{t(`ui.severity_${severity.toLowerCase()}`)}</span>;
}
