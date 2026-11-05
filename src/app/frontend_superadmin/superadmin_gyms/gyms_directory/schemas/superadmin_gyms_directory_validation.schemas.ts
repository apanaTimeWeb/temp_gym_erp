/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsValidationSchemas owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Contains the Zod validation schema and inferred types for the Gym onboarding form. Isolated to the Gyms module.
import { z } from 'zod';
export const OnboardGymSchema = z.object({
    gymName: z.string().min(2, 'validation.gymNameMin'),
    ownerName: z.string().min(2, 'validation.ownerNameMin'),
    adminEmail: z.string().email('validation.invalidEmail'),
    phone: z.string().min(10, 'validation.phoneMin'),
    aadharNumber: z.string()
        .regex(/^\d{12}$/, 'validation.aadharFormat')
        .optional()
        .or(z.literal('')),
    plan: z.string().min(1, 'validation.planRequired'),
    temporaryPassword: z.string().min(8, 'validation.passwordMin'),
});
export type OnboardGymFormValues = z.infer<typeof OnboardGymSchema>;
