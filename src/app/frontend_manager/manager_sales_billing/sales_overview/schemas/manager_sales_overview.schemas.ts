// RESPONSIBILITY: Runtime API schemas for Manager Sales read models.
import { z } from 'zod';

/**
 * @description Provides the ManagerSalesOverviewSchema implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const overviewPointSchema = z.object({ month: z.string(), revenue: z.number().int(), storeRevenue: z.number().int().optional(), newMembers: z.number().int().nonnegative().optional() });
const salesMemberSnapshotSchema = z.object({ id: z.string(), name: z.string(), phone: z.string().optional(), email: z.string().optional(), plan: z.unknown().optional(), status: z.string().optional(), expiryDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date').optional() }).passthrough();
const reportItemSchema = z.object({ id: z.number().optional(), name: z.string().optional(), totalMembers: z.number().int().nonnegative().optional(), activeMembers: z.number().int().nonnegative().optional(), revenue: z.number().int().optional(), plan: z.string().optional(), receivable: z.number().int().optional(), received: z.number().int().optional(), remaining: z.number().int().optional(), refund: z.number().int().optional() });
const totalsSchema = z.object({ activeCount: z.number().int().nonnegative().optional(), revenue: z.number().int().optional(), totalReceivable: z.number().int().optional(), totalReceived: z.number().int().optional(), remaining: z.number().int().optional(), refunds: z.number().int().optional() });
const pendingSchema = salesMemberSnapshotSchema.extend({ pendingAmount: z.number().int().optional(), daysOverdue: z.number().int().nonnegative().optional() });

export const managerSalesOverviewSchema = z.object({ monthlyRevenue: z.array(overviewPointSchema) });
export const managerSalesMembershipReportSchema = z.object({ report: z.array(reportItemSchema), totals: totalsSchema });
export const managerSalesPendingPaymentsSchema = z.object({ members: z.array(pendingSchema), total: z.number().int().nonnegative() });
export const managerSalesAllMembershipsSchema = z.object({ members: z.array(salesMemberSnapshotSchema), total: z.number().int().nonnegative() });
