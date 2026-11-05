// RESPONSIBILITY: Owns Trainer Sessions Zod schemas for session data and mutation DTOs.
import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsTrainerInfrastructureApiResponseSchema';

import { TRAINER_SESSIONS_RECURRENCE_TYPES, TRAINER_SESSIONS_SESSION_STATUS_VALUES, TRAINER_SESSIONS_SESSION_TYPES } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';




export const TrainerSessionsSessionTypeSchema = z.enum(TRAINER_SESSIONS_SESSION_TYPES);
export const TrainerSessionsSessionStatusSchema = z.enum(TRAINER_SESSIONS_SESSION_STATUS_VALUES);
export const TrainerSessionsSessionFilterSchema = z.union([z.literal('All'),TrainerSessionsSessionTypeSchema]);

const TrainerSessionsDateSchema = z.string().refine((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year!, month! - 1, day!));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month! - 1 && parsed.getUTCDate() === day;
}, 'TEXT_DATE_INVALID');
const TrainerSessionsTimeSchema = z.string().refine((value) => /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value) || /^(?:0?[1-9]|1[0-2]):[0-5]\d\s?(?:AM|PM)$/i.test(value), 'TEXT_TIME_INVALID');
const TrainerSessionsDurationSchema = z.enum(['30m', '45m', '60m', '30 min', '45 min', '60 min']);

export const TrainerSessionsTrainerSessionSchema = z.object({ id:z.string(), title:z.string(), type:TrainerSessionsSessionTypeSchema, time:z.string(), sessionDate:z.string(), duration:z.string(), status:TrainerSessionsSessionStatusSchema, attendees:z.number(), maxAttendees:z.number().optional(), member:z.string().optional(), isOnline:z.boolean(), enrolledMembers:z.array(z.object({id:z.string(),name:z.string()})).optional(), sessionNotes:z.string().optional(), location:z.string().optional(), room:z.string().optional(), trainerNotes:z.string().optional(), memberRating:z.number().optional(), cancellationReason:z.string().optional(), recurrenceRule:z.string().optional() });
export const TrainerSessionsCreateSessionDtoSchema = z.object({ memberId:z.string().optional().or(z.literal('')), date:z.string().min(1,'TEXT_DATE_REQUIRED').pipe(TrainerSessionsDateSchema), time:z.string().min(1,'TEXT_TIME_REQUIRED').pipe(TrainerSessionsTimeSchema), duration:z.string().min(1,'TEXT_DURATION_REQUIRED').pipe(TrainerSessionsDurationSchema), type:TrainerSessionsSessionTypeSchema, recurrenceType:z.enum(TRAINER_SESSIONS_RECURRENCE_TYPES).optional(), recurrenceEndDate:z.string().optional(), location:z.string().optional(), room:z.string().optional() }).superRefine((data, context) => {
  if (data.type === 'PT' && !data.memberId) context.addIssue({ code: z.ZodIssueCode.custom, path: ['memberId'], message: 'TEXT_MEMBER_REQUIRED_PT' });
});
export const TrainerSessionsTrainerSessionMemberSchema = z.object({id:z.string(),name:z.string(),phone:z.string().optional()});
export const TrainerSessionsTrainerSessionMembersResponseSchema = TrainerInfrastructureApiResponseSchema(z.array(TrainerSessionsTrainerSessionMemberSchema));
