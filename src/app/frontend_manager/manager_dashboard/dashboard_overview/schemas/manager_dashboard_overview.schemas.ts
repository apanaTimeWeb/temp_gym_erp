// RESPONSIBILITY: Runtime schema for the Manager Dashboard aggregate response.
import { z } from 'zod';

/**
 * @description Provides the ManagerDashboardOverviewSchema implementation for the dashboard module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const growthSchema = z.object({ month: z.string(), count: z.number() });
const revenueSchema = z.object({ month: z.string(), revenue: z.number().int() });
const recentMemberSchema = z.object({ id: z.string(), name: z.string(), plan: z.union([z.string(), z.object({ name: z.string() })]), status: z.string(), joinDate: z.string(), paidAmount: z.number().int() });
const recentPaymentSchema = z.object({ id: z.string(), invoiceNumber: z.string(), amount: z.number().int(), method: z.string(), paidAt: z.string(), member: z.object({ name: z.string() }) });
const pendingPaymentSchema = z.object({ id: z.string(), name: z.string(), pendingAmount: z.number().int(), expiryDate: z.string() });

export const managerDashboardOverviewStatsSchema = z.object({
  totalMembers: z.number().int().nonnegative(), activeMembers: z.number().int().nonnegative(), newMembersThisMonth: z.number().int().nonnegative(), totalRevenue: z.number().int(), monthlyRevenue: z.number().int(), pendingPayments: z.number().int(), totalStaff: z.number().int().nonnegative(), activeStaff: z.number().int().nonnegative(), totalProducts: z.number().int().nonnegative(), lowStockCount: z.number().int().nonnegative(), totalInquiries: z.number().int().nonnegative(), newInquiries: z.number().int().nonnegative(), todayAttendance: z.number().int().nonnegative(), trainerAttendance: z.object({ present: z.number(), total: z.number() }), memberGrowth: z.array(growthSchema), revenueChart: z.array(revenueSchema), membersByPlan: z.array(z.object({ plan: z.string(), count: z.number() })), membersByStatus: z.object({ active: z.number(), pending: z.number(), expired: z.number() }), recentMembers: z.array(recentMemberSchema), totalRecentMembers: z.number().int().nonnegative().optional().default(0), recentPayments: z.array(recentPaymentSchema), pendingPaymentsList: z.array(pendingPaymentSchema), expiringMemberships: z.array(pendingPaymentSchema), churnRate: z.number(), revenueGrowthPercent: z.number(), todayCollection: z.number().int(), frozenMembershipsCount: z.number().int().nonnegative(), totalPTRevenue: z.number().int() });
