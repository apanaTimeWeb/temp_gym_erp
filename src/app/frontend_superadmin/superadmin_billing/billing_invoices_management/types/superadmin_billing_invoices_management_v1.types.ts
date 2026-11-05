/**
 * Types for the legacy Recovery Center API/fixture contract. This surface has no active UI consumer in the supplied tree.
 * Runtime validation schemas remain in the owning _schemas folder.
 */
import type {
    SuperadminBillingInvoicesV1DataSchema,
    SuperadminBillingInvoicesV1ResponseSchema,
} from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_v1_contract.schemas';
import type { z } from 'zod';


export type SuperadminBillingInvoicesV1Data = z.infer<typeof SuperadminBillingInvoicesV1DataSchema>;
export type SuperadminBillingInvoicesV1Response = z.infer<typeof SuperadminBillingInvoicesV1ResponseSchema>;

export interface SuperadminBillingInvoicesV1SectionProps {
    data: SuperadminBillingInvoicesV1Data;
}
