// RESPONSIBILITY: Runtime-validate only the response contract owned by this business report leaf.
import { z } from 'zod';
export const reportDateRangeSchema = z.union([z.literal('this_month'), z.literal('last_month'), z.literal('last_3_months'), z.literal('last_6_months'), z.literal('this_year'), z.literal('custom')]);
export const payrollSummaryRowSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    totalStaff: z.number().int().nonnegative(),
    totalPayroll: z.number().int(),
    paid: z.number().int(),
    pending: z.number().int(),
    advances: z.number().int()
});
export const reportPayrollDataSchema = z.object({
  payrollSummary: z.array(payrollSummaryRowSchema),
});
