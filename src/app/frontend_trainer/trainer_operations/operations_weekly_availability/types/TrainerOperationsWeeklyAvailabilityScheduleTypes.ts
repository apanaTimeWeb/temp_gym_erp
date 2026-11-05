import { z } from 'zod';

import { TRAINER_SCHEDULE_WEEKLY_AVAILABILITY_TIME_FIELDS, TRAINER_SCHEDULE_SCHEDULE_TAB_IDS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/utils/TrainerOperationsWeeklyAvailabilityScheduleConstants';

import { TrainerScheduleDayOfWeekSchema, TrainerScheduleWeeklyAvailabilitySchema, TrainerScheduleWeeklyAvailabilityFormSchema, TrainerScheduleLeaveStatusSchema, TrainerScheduleLeaveTypeSchema, TrainerScheduleLeaveRequestSchema, TrainerScheduleCreateLeaveDtoSchema, TrainerScheduleScheduleEventSchema, TrainerScheduleScheduleResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';



// RESPONSIBILITY: Exposes Trainer Schedule TypeScript types without owning runtime schemas.

export type TrainerScheduleWeeklyAvailabilityTimeField = (typeof TRAINER_SCHEDULE_WEEKLY_AVAILABILITY_TIME_FIELDS)[number];
export type TrainerScheduleTab = (typeof TRAINER_SCHEDULE_SCHEDULE_TAB_IDS)[number];

export type TrainerScheduleDayOfWeek = z.infer<typeof TrainerScheduleDayOfWeekSchema>;
export type TrainerScheduleWeeklyAvailability = z.infer<typeof TrainerScheduleWeeklyAvailabilitySchema>;
export type TrainerScheduleWeeklyAvailabilityFormValues = z.infer<typeof TrainerScheduleWeeklyAvailabilityFormSchema>;
export type TrainerScheduleLeaveStatus = z.infer<typeof TrainerScheduleLeaveStatusSchema>;
export type TrainerScheduleLeaveType = z.infer<typeof TrainerScheduleLeaveTypeSchema>;
export type TrainerScheduleLeaveRequest = z.infer<typeof TrainerScheduleLeaveRequestSchema>;
export type TrainerScheduleCreateLeaveDto = z.infer<typeof TrainerScheduleCreateLeaveDtoSchema>;
export type TrainerScheduleScheduleEvent = z.infer<typeof TrainerScheduleScheduleEventSchema>;
export type TrainerScheduleScheduleResponse = z.infer<typeof TrainerScheduleScheduleResponseSchema>;