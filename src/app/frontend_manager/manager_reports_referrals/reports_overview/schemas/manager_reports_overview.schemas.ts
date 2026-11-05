// RESPONSIBILITY: Runtime API schema for the Manager Reports summary response.
import { z } from 'zod';

/**
 * @description Provides the ManagerReportsOverviewSchema implementation for the reports module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerReportSummarySchema = z.object({
  kpis: z.object({ totalRevenue: z.number().int().nonnegative(), totalMembers: z.number().int().nonnegative(), avgAttendanceRate: z.number().min(0).max(100), totalExpenses: z.number().int().nonnegative(), netProfit: z.number().int(), newMembersThisMonth: z.number().int().nonnegative(), churnRate: z.number().min(0).max(100), activeMembers: z.number().int().nonnegative() }),
  revenueData: z.array(z.object({ month: z.string(), revenue: z.number().int().nonnegative(), expenses: z.number().int().nonnegative(), profit: z.number().int() })),
  attendanceData: z.array(z.object({ date: z.string(), present: z.number().int().nonnegative(), absent: z.number().int().nonnegative(), rate: z.number().min(0).max(100) })),
  memberChurnData: z.array(z.object({ month: z.string(), newMembers: z.number().int().nonnegative(), churned: z.number().int().nonnegative(), active: z.number().int().nonnegative() })),
  expenseBreakdown: z.array(z.object({ category: z.string(), amount: z.number().int().nonnegative(), percentage: z.number().min(0).max(100) })) });
