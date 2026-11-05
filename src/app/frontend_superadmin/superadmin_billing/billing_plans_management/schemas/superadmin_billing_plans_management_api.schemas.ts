/**
 * RESPONSIBILITY: Owns runtime validation schemas for Superadmin Plans API response fragments.
 * AI BOUNDARY: API response validation only; no transport orchestration or UI state.
 */
import { z } from 'zod';

export const SuperadminBillingPlansEmptyResponseSchema = z.union([z.null(), z.undefined(), z.object({}).passthrough()]);
