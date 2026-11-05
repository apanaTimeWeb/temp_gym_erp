/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminAuditComplianceResponseSchema = z.object({
    summary: z.object({
        registeredTenants: z.number(),
        missingTaxDetails: z.number(),
        documentsExpiring: z.number(),
        openComplianceTasks: z.number(),
    }),
    regions: z.array(
        z.object({
            region: z.string(),
            registered: z.number(),
            missing: z.number(),
            taxRate: z.number(),
            status: z.string(),
        }),
    ),
    documents: z.array(
        z.object({
            tenant: z.string(),
            document: z.string(),
            status: z.string(),
            expires: z.string().nullable(),
        }),
    ),
});
