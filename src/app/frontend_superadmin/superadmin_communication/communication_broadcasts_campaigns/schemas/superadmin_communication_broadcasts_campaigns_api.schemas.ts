/**
 * RESPONSIBILITY: Owns runtime validation schemas for Superadmin Broadcasts API response fragments.
 * AI BOUNDARY: API response validation only; no transport orchestration or UI state.
 */
import { z } from 'zod';

export const SuperadminCommunicationBroadcastsEmptyResponseSchema = z.object({}).passthrough();
export const SuperadminCommunicationBroadcastsRecipientCountResponseSchema = z.object({ count: z.number().nonnegative() });
