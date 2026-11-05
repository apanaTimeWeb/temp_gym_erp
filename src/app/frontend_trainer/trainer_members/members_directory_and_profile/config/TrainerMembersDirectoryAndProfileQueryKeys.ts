// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Members server state.
// DATA FLOW: Feature filters/resource identity → deterministic key → module API cache → UI.
import type { TrainerMembersQueryParams } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileQueryTypes';

export const TRAINER_MEMBERS_QUERY_KEYS = {
  all: ['trainer_members'] as const,
  lists: () => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'list'] as const,
  list: (params: TrainerMembersQueryParams) => [...TRAINER_MEMBERS_QUERY_KEYS.lists(), params] as const,
  details: () => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (memberId: string) => [...TRAINER_MEMBERS_QUERY_KEYS.details(), memberId] as const,
  stats: () => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'stats'] as const,
  attendance: (memberId: string) => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'attendance', memberId] as const,
  dietPlans: () => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'diet-plans'] as const,
  workoutPlans: () => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'workout-plans'] as const,
  progress: (memberId: string) => [...TRAINER_MEMBERS_QUERY_KEYS.all, 'progress', memberId] as const,
} as const;
