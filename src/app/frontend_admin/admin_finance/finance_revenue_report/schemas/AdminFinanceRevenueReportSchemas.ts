// RESPONSIBILITY: Runtime-validate only the response contract owned by this business report leaf.
import { z } from 'zod';
export const reportDateRangeSchema = z.union([z.literal('this_month'), z.literal('last_month'), z.literal('last_3_months'), z.literal('last_6_months'), z.literal('this_year'), z.literal('custom')]);
export const revenueKpisSchema = z.object({
  totalRevenue: z.number().int(), totalExpenses: z.number().int(), netProfit: z.number().int(),
  totalMembers: z.number().int().nonnegative(), newMembers: z.number().int().nonnegative(),
  avgAttendanceRate: z.number().min(0).max(100), totalPayroll: z.number().int(),
});
export const revenueByGymSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    revenue: z.number().int(),
    expenses: z.number().int(),
    profit: z.number().int(),
    trend: z.union([z.literal("up"), z.literal("down"), z.literal("flat")]),
    trendPercent: z.number()
});
export const revenueByMethodSchema = z.object({
    method: z.string(),
    amount: z.number().int(),
    count: z.number().int().nonnegative()
});
export const revenueByPlanSchema = z.object({
    planName: z.string(),
    amount: z.number().int(),
    count: z.number().int().nonnegative()
});
export const monthlyRevenueSchema = z.object({
    month: z.string(),
    revenue: z.number().int(),
    expenses: z.number().int(),
    profit: z.number().int()
});
export const reportRevenueDataSchema = z.object({ revenueByGym: z.array(revenueByGymSchema), revenueByMethod: z.array(revenueByMethodSchema), revenueByPlan: z.array(revenueByPlanSchema), monthlyRevenue: z.array(monthlyRevenueSchema), kpis: revenueKpisSchema });
