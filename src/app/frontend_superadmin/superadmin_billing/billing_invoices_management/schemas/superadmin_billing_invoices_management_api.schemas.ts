/**
 * RESPONSIBILITY: Owns runtime validation schemas for Superadmin Invoices API response fragments.
 * AI BOUNDARY: API response validation only; no transport orchestration or UI state.
 */
import { z } from 'zod';

export const SuperadminBillingInvoicesDownloadResponseSchema = z.object({ downloadUrl: z.string() });
