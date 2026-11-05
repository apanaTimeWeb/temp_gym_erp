/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAuditComplianceMockFixtures owned by the superadmin_audit_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/constants/superadmin_audit_compliance_dashboard_status_badge_config.constants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns realistic mock API data for this Superadmin module.
import { SUPERADMIN_AUDIT_COMPLIANCE_DOCUMENT_STATUS_CODES, SUPERADMIN_AUDIT_COMPLIANCE_REGION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/constants/superadmin_audit_compliance_dashboard_status_badge_config.constants';
export const SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE = { 'summary': { 'registeredTenants': 842, 'missingTaxDetails': 18, 'documentsExpiring': 9, 'openComplianceTasks': 6 },
    'regions': [{ 'region': 'Maharashtra', 'registered': 248, 'missing': 4, 'taxRate': 18.0, 'status': SUPERADMIN_AUDIT_COMPLIANCE_REGION_STATUS_CODES.READY },
        { 'region': 'Delhi', 'registered': 182, 'missing': 3, 'taxRate': 18.0, 'status': SUPERADMIN_AUDIT_COMPLIANCE_REGION_STATUS_CODES.READY },
        { 'region': 'Karnataka', 'registered': 156, 'missing': 6, 'taxRate': 18.0, 'status': SUPERADMIN_AUDIT_COMPLIANCE_REGION_STATUS_CODES.ATTENTION },
        { 'region': 'Other States', 'registered': 256, 'missing': 5, 'taxRate': 18.0, 'status': SUPERADMIN_AUDIT_COMPLIANCE_REGION_STATUS_CODES.ATTENTION }],
    'documents': [{ 'tenant': 'FitLife Andheri',
            'document': 'GST Registration',
            'status': SUPERADMIN_AUDIT_COMPLIANCE_DOCUMENT_STATUS_CODES.VALID,
            'expires': '2027-04-30' },
        { 'tenant': 'PowerZone Bandra',
            'document': 'GST Registration',
            'status': SUPERADMIN_AUDIT_COMPLIANCE_DOCUMENT_STATUS_CODES.VALID,
            'expires': null },
        { 'tenant': 'Urban Strength',
            'document': 'Tax Registration',
            'status': SUPERADMIN_AUDIT_COMPLIANCE_DOCUMENT_STATUS_CODES.EXPIRING,
            'expires': '2026-10-02' }] };
