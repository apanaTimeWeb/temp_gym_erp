// RESPONSIBILITY: Defines validation rules for Manager personal and password forms.
import { z } from 'zod';
/**
 * @description Provides the ManagerProfileAndSecurityFormSchemas implementation for the profile module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerProfileFormSchema = z.object({ name: z.string().trim().min(2, 'Full name must be at least 2 characters'), phone: z.string().trim().min(7, 'Phone number is required') });
export const managerPasswordFormSchema = z.object({ currentPassword: z.string().min(1, 'Current password is required'), newPassword: z.string().min(8, 'New password must be at least 8 characters'), confirmPassword: z.string().min(1, 'Please confirm the new password') }).refine((values) => values.newPassword === values.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' });
