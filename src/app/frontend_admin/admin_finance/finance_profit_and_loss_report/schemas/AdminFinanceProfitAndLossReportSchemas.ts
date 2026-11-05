// RESPONSIBILITY: Runtime-validate only the response contract owned by this business report leaf.
import { z } from 'zod';
export const reportDateRangeSchema = z.union([z.literal('this_month'), z.literal('last_month'), z.literal('last_3_months'), z.literal('last_6_months'), z.literal('this_year'), z.literal('custom')]);
export const pnLRowSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    revenue: z.number().int(),
    membershipRevenue: z.number().int(),
    storeRevenue: z.number().int(),
    totalExpenses: z.number().int(),
    staffCost: z.number().int(),
    operationalCost: z.number().int(),
    netProfit: z.number().int(),
    profitMargin: z.number().min(-100).max(100).min(-100).max(100)
});
export const reportPnLDataSchema = z.object({ pnlSummary: z.array(pnLRowSchema), kpis: z.object({ totalRevenue: z.number().int(), totalExpenses: z.number().int(), netProfit: z.number().int(), totalPayroll: z.number().int() }) });
