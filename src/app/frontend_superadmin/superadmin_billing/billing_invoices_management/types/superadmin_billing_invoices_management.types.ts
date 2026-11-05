/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import { z } from 'zod';

import {
  SaaSInvoiceSchema,
  CreateManualPaymentDtoSchema,
  InvoiceLineItemSchema,
  SuperadminBillingInvoicesTenantSchema,
} from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_contract.schemas';



// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Invoices module.
export interface CreateManualPaymentDto {
  gymId: string;
  amount: number;
  planName: string;
  currency?: string;
}

export type CreateManualPaymentPayload = z.infer<typeof CreateManualPaymentDtoSchema>;
export type SaaSInvoice = z.infer<typeof SaaSInvoiceSchema>;
export type InvoiceLineItem = z.infer<typeof InvoiceLineItemSchema>;
export type SuperadminBillingInvoicesTenant = z.infer<typeof SuperadminBillingInvoicesTenantSchema>;
