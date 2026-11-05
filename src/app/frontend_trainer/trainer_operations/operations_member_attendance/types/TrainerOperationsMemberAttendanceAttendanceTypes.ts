import { z } from 'zod';

import { TrainerAttendanceMemberSchema, TrainerAttendanceRecordSchema, TrainerAttendanceStatsSchema, TrainerAttendanceResponseSchema, TrainerAttendanceMemberBasicSchema, TrainerAttendanceCreateDtoSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceDomainSchemas';

import { TrainerAttendanceFormSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceFormSchema';

import { TRAINER_ATTENDANCE_CALENDAR_STATUS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';






// RESPONSIBILITY: Owns TypeScript domain and form contracts derived from Trainer attendance validation schemas.
export type TrainerAttendanceMember = z.infer<typeof TrainerAttendanceMemberSchema>;
export type TrainerAttendanceRecord = z.infer<typeof TrainerAttendanceRecordSchema>;
export type TrainerAttendanceStats = z.infer<typeof TrainerAttendanceStatsSchema>;
export type TrainerAttendanceApiResponse = z.infer<typeof TrainerAttendanceResponseSchema>;
export type TrainerAttendanceMemberBasic = z.infer<typeof TrainerAttendanceMemberBasicSchema>;
export type TrainerAttendanceCreateDto = z.infer<typeof TrainerAttendanceCreateDtoSchema>;
export type TrainerAttendanceFormValues = z.infer<typeof TrainerAttendanceFormSchema>;

export type TrainerAttendanceCalendarStatus = (typeof TRAINER_ATTENDANCE_CALENDAR_STATUS)[keyof typeof TRAINER_ATTENDANCE_CALENDAR_STATUS];
