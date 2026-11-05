// RESPONSIBILITY: Runtime API schemas for the Manager PT module.
import { z } from 'zod';

import { PT_PAYMENT_STATUS_VALUES, PT_SESSION_STATUS_VALUES, PT_TRAINER_AVAILABILITY_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments.constants';

/**
 * @description Provides the ManagerPtAssignmentsSchema implementation for the pt module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const ptPaymentStatusSchema = z.enum(PT_PAYMENT_STATUS_VALUES);
const ptSessionStatusSchema = z.enum(PT_SESSION_STATUS_VALUES);
const nonNegativeInteger = z.number().int().finite().min(0);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => { const date = new Date(`${value}T00:00:00Z`); return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value; }, 'Invalid calendar date');

export const ptPackageSchema = z.object({ id: z.string(), name: z.string(), sessionCount: nonNegativeInteger, durationDays: nonNegativeInteger, price: nonNegativeInteger, description: z.string() });
export const ptAssignmentSchema = z.object({ id: z.string(), memberId: z.string(), memberName: z.string(), trainerId: z.string(), trainerName: z.string(), packageId: z.string(), packageName: z.string(), totalSessions: nonNegativeInteger, completedSessions: nonNegativeInteger, startDate: isoDate, endDate: isoDate, sessionsRemaining: nonNegativeInteger, nextSessionDate: isoDate.optional(), paymentStatus: ptPaymentStatusSchema, amountPaid: nonNegativeInteger, totalAmount: nonNegativeInteger });
export const ptTrainerWorkloadSchema = z.object({ trainerId: z.string(), trainerName: z.string(), activeClients: nonNegativeInteger, totalSessionsConducted: nonNegativeInteger, rating: z.number().finite().min(0).max(5), status: z.enum(PT_TRAINER_AVAILABILITY_STATUS_VALUES) });
export const ptDashboardKpisSchema = z.object({ totalActiveAssignments: nonNegativeInteger, sessionsScheduledToday: nonNegativeInteger, packagesExpiringSoon: nonNegativeInteger, monthlyPtRevenue: nonNegativeInteger });
export const ptAssignmentsSessionResponseSchema = z.array(z.object({ id: z.string(), assignmentId: z.string(), sessionDate: z.string(), status: ptSessionStatusSchema }));
