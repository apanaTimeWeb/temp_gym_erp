/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsSchema owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';
export const gymEditSchema = z.object({
    name: z.string().min(1, 'validation.gymNameRequired'),
    ownerName: z.string().min(1, 'validation.ownerNameRequired'),
    adminEmail: z.string().email('validation.invalidEmail'),
    phone: z.string().min(10, 'validation.phoneMin'),
    plan: z.string().min(1, 'validation.planRequired'),
    temporaryPassword: z.string().optional().refine(val => !val || val.length >= 8, {
        message: 'validation.passwordMin',
    }),
});
export type GymEditFormValues = z.infer<typeof gymEditSchema>;
export const gymWhatsappSchema = z.object({
    subject: z.string().min(1, 'validation.subjectRequired'),
    message: z.string().min(1, 'validation.messageRequired'),
});
export type GymWhatsappFormValues = z.infer<typeof gymWhatsappSchema>;

export const gymCreateSchema = z.object({
    name: z.string().min(1, 'validation.gymNameRequired'),
    ownerName: z.string().min(1, 'validation.ownerNameRequired'),
    adminEmail: z.string().email('validation.invalidEmail'),
    phone: z.string().min(10, 'validation.phoneMin'),
    plan: z.string().min(1, 'validation.planRequired'),
}).passthrough();
export type GymCreateFormValues = z.infer<typeof gymCreateSchema>;

export const gymProvisionSchema = z.object({
    gymName: z.string().min(2, 'validation.gymNameMin'),
    ownerName: z.string().min(2, 'validation.ownerNameMin'),
    adminEmail: z.string().email('validation.invalidEmail'),
    phone: z.string().min(10, 'validation.phoneMin'),
    plan: z.string().min(1, 'validation.planRequired'),
    planId: z.string().min(1, 'validation.planRequired').optional(),
    aadharNumber: z.string().regex(/^\d{12}$/, 'validation.aadharFormat').optional().or(z.literal('')),
    temporaryPassword: z.string().min(8, 'validation.passwordMin'),
}).passthrough();
export type GymProvisionFormValues = z.infer<typeof gymProvisionSchema>;
