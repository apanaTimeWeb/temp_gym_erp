/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import { z } from 'zod';
import { SuperadminAuditComplianceResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/schemas/superadmin_audit_compliance_dashboard_contract.schemas';

// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
export type SuperadminAuditComplianceResponse = z.infer<typeof SuperadminAuditComplianceResponseSchema>;

export interface SuperadminAuditComplianceSectionProps {
  data: SuperadminAuditComplianceResponse;
}
