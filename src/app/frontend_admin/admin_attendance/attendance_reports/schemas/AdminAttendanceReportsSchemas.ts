// RESPONSIBILITY: Runtime-validate only the response contract owned by this business report leaf.
import { z } from 'zod';
export const reportDateRangeSchema = z.union([z.literal('this_month'), z.literal('last_month'), z.literal('last_3_months'), z.literal('last_6_months'), z.literal('this_year'), z.literal('custom')]);
export const attendanceHeatmapCellSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    day: z.string(),
    count: z.number().int().nonnegative(),
    rate: z.number().min(0).max(100)
});
export const attendanceSummaryRowSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    avgDailyAttendance: z.number().nonnegative(),
    peakDay: z.string(),
    attendanceRate: z.number().min(0).max(100),
    totalCheckIns: z.number().int().nonnegative()
});
export const reportAttendanceDataSchema = z.object({
  attendanceSummary: z.array(attendanceSummaryRowSchema),
  attendanceHeatmap: z.array(attendanceHeatmapCellSchema),
});
