import SuperadminAuditComplianceLoadingSkeleton from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_states_and_feedback/SuperadminAuditComplianceDashboardLoadingSkeleton';
/**
 * @description Renders the loading interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function Loading() { return <SuperadminAuditComplianceLoadingSkeleton />; }
