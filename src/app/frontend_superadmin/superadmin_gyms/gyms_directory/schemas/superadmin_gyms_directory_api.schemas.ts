/**
 * RESPONSIBILITY: Owns runtime validation schemas for Superadmin Gyms API response fragments.
 * AI BOUNDARY: API response validation only; no transport orchestration or UI state.
 */
import { z } from 'zod';

export const SuperadminGymsImpersonateTokenSchema = z.object({ token: z.string() });
export const SuperadminGymsDownloadResponseSchema = z.object({ downloadUrl: z.string() });
export const SuperadminGymsEmptyResponseSchema = z.union([z.null(), z.undefined(), z.object({}).passthrough()]);
export const SuperadminGymsNullResponseSchema = z.null();
