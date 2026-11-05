// RESPONSIBILITY: Defines Zod validation for membership lifecycle form variants.
import { z } from 'zod';

/**
 * @description Provides the ManagerMembershipLifecycleMembershipSchemas implementation for the plans module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerPlansActivateSchema = z.object({ memberId: z.string().min(1, 'Member is required'), planId: z.string().min(1, 'Plan is required'), startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => { const date = new Date(`${value}T00:00:00Z`); return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value; }, 'Invalid start date') });
export const managerPlansRenewSchema = z.object({ memberId: z.string().min(1, 'Member is required'), planId: z.string().min(1, 'Plan is required'), newExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => { const date = new Date(`${value}T00:00:00Z`); return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value; }, 'Invalid expiry date') });
export const managerPlansFreezeSchema = z.object({ memberId: z.string().min(1, 'Member is required'), freezeFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => { const date = new Date(`${value}T00:00:00Z`); return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value; }, 'Invalid freeze start'), freezeUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => { const date = new Date(`${value}T00:00:00Z`); return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value; }, 'Invalid freeze end') }).refine((value) => value.freezeUntil >= value.freezeFrom, { path: ['freezeUntil'], message: 'Freeze end must be on or after freeze start' });
