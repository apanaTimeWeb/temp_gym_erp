/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAccountProfileTypesSchemas owned by the superadmin_account_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminAccountProfileDataSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
    role: z.literal('SUPERADMIN'),
    avatarUrl: z.string().optional(),
    lastLoginAt: z.string(),
    createdAt: z.string(),
    twoFactorEnabled: z.boolean(),
});
