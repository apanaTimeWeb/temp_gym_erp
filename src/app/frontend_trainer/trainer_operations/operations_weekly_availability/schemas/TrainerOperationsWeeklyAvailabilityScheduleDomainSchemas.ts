// RESPONSIBILITY: Owns Trainer Schedule and Leave Zod schemas.
import { z } from 'zod';

import { TRAINER_SCHEDULE_DAYS_OF_WEEK, TRAINER_SCHEDULE_LEAVE_STATUS_VALUES, TRAINER_SCHEDULE_LEAVE_TYPE_VALUES } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/utils/TrainerOperationsWeeklyAvailabilityScheduleConstants';



export const TrainerScheduleDateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'ERR_DATE_INVALID').refine((value) => {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, 'ERR_DATE_INVALID');
export const TrainerScheduleTimeSchema = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'ERR_TIME_INVALID');
export const TrainerScheduleDayOfWeekSchema = z.enum(TRAINER_SCHEDULE_DAYS_OF_WEEK);
export const TrainerScheduleWeeklyAvailabilitySchema = z.object({ day:TrainerScheduleDayOfWeekSchema, isAvailable:z.boolean(), startTime:TrainerScheduleTimeSchema, endTime:TrainerScheduleTimeSchema }).superRefine((day, context) => {
  if (day.isAvailable && day.endTime <= day.startTime) context.addIssue({ code: z.ZodIssueCode.custom, path: ['endTime'], message: 'ERR_AVAILABILITY_TIME_RANGE_INVALID' });
});
export const TrainerScheduleWeeklyAvailabilityArraySchema = z.array(TrainerScheduleWeeklyAvailabilitySchema).length(7).superRefine((value, context) => {
  const days = value.map((entry) => entry.day);
  if (new Set(days).size !== TRAINER_SCHEDULE_DAYS_OF_WEEK.length || TRAINER_SCHEDULE_DAYS_OF_WEEK.some((day) => !days.includes(day))) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'ERR_AVAILABILITY_DAYS_INVALID' });
  }
});
export const TrainerScheduleWeeklyAvailabilityFormSchema = z.object({ days:TrainerScheduleWeeklyAvailabilityArraySchema });
export const TrainerScheduleLeaveStatusSchema = z.enum(TRAINER_SCHEDULE_LEAVE_STATUS_VALUES);
export const TrainerScheduleLeaveTypeSchema = z.enum(TRAINER_SCHEDULE_LEAVE_TYPE_VALUES);
export const TrainerScheduleLeaveRequestSchema = z.object({ id:z.string(), trainerId:z.string(), startDate:TrainerScheduleDateOnlySchema, endDate:TrainerScheduleDateOnlySchema, reason:z.string(), leaveType:TrainerScheduleLeaveTypeSchema, status:TrainerScheduleLeaveStatusSchema, managerNotes:z.string().optional(), totalDays:z.number().optional(), attachmentUrl:z.string().optional(), approvedBy:z.string().optional(), rejectedReason:z.string().optional(), createdAt:z.string() }).superRefine((value, context) => { if (value.endDate < value.startDate) context.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'ERR_LEAVE_DATE_RANGE_INVALID' }); });
export const TrainerScheduleCreateLeaveDtoSchema = z.object({ startDate:z.string().min(1,'ERR_START_DATE_REQUIRED').pipe(TrainerScheduleDateOnlySchema), endDate:z.string().min(1,'ERR_END_DATE_REQUIRED').pipe(TrainerScheduleDateOnlySchema), reason:z.string().min(5,'ERR_REASON_REQUIRED'), leaveType:TrainerScheduleLeaveTypeSchema }).superRefine((value, context) => { if (value.endDate < value.startDate) context.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'ERR_LEAVE_DATE_RANGE_INVALID' }); });
export const TrainerScheduleScheduleEventSchema = z.object({ id:z.string(), title:z.string(), start:z.string(), end:z.string(), type:z.string(), isRecurring:z.boolean().optional(), recurrenceRule:z.string().optional(), meetingLink:z.string().optional() });
export const TrainerScheduleScheduleResponseSchema = z.object({ availability:TrainerScheduleWeeklyAvailabilityArraySchema, leaves:z.array(TrainerScheduleLeaveRequestSchema) });
