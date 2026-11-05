/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformShellLayoutEnvironmentConfig owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Validates and exposes role-level public runtime configuration without allowing UI modules to read process.env directly.

import { z } from 'zod';

const SuperadminEnvironmentSchema = z.object({
  NEXT_PUBLIC_SUPERADMIN_WS_URL: z.string().url().optional(),
});

const parsedSuperadminEnvironment = SuperadminEnvironmentSchema.parse({
  NEXT_PUBLIC_SUPERADMIN_WS_URL: process.env.NEXT_PUBLIC_SUPERADMIN_WS_URL,
});

export const SuperadminPlatformShellLayoutEnvironmentConfig = {
  websocketUrl: parsedSuperadminEnvironment.NEXT_PUBLIC_SUPERADMIN_WS_URL,
};
