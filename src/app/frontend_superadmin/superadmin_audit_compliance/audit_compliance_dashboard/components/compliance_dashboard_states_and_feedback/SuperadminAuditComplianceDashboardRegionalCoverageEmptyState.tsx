// RESPONSIBILITY: Renders/orchestrates SuperadminAuditComplianceRegionalCoverageEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminAuditComplianceRegionalCoverageEmptyState owned by the superadmin_audit_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin regional coverage list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


/**
 * @description Renders ComplianceRegionalCoverageEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardRegionalCoverageEmptyState() {
  const t = useTranslations('superadmin_audit_compliance');
    return <EmptyState title={t('ui.regional_coverage_c0135f75')} description={t('ui.regional_registration_records_will_appear_wh_74b9dfca')} data-testid="superadmin_audit_compliance-superadmin-compliance-regional-coverage-empty-state-coverage-empty-state-empty"/>;
}
