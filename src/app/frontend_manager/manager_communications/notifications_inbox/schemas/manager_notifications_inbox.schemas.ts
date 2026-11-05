import { z } from 'zod';

/**
 * @description Provides the ManagerNotificationsInboxSchema implementation for the notifications module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const notificationSchema = z.object({
  id: z.string().min(1), type: z.enum(['SYSTEM', 'PAYMENT', 'EXPIRY', 'ATTENDANCE', 'INQUIRY', 'ANNOUNCEMENT']), priority: z.enum(['HIGH', 'MEDIUM', 'LOW']), status: z.enum(['UNREAD', 'READ']),
  title: z.string(), message: z.string(), memberName: z.string().nullable().optional(), createdAt: z.string().datetime({ offset: true }), readAt: z.string().nullable().optional() });

export const notificationKpiSchema = z.object({ total: z.number().int().nonnegative(), unread: z.number().int().nonnegative(), highPriority: z.number().int().nonnegative(), todayCount: z.number().int().nonnegative() });
