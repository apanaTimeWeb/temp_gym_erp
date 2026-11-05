// RESPONSIBILITY: Renders/orchestrates SuperadminAuditComplianceDocumentsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminAuditComplianceDocumentsEmptyState owned by the superadmin_audit_compliance feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/components/ui/EmptyState
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin compliance documents list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';


/**
 * @description Renders ComplianceDocumentsEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminAuditComplianceDashboardDocumentsEmptyState() {
  const t = useTranslations('superadmin_audit_compliance');
    return <EmptyState title={t('ui.compliance_documents_798a9444')} description={t('ui.tenant_registrations_and_document_expiry_det_3c02c149')} data-testid="superadmin_audit_compliance-superadmin-compliance-documents-empty-state-documents-empty-state-empty"/>;
}
