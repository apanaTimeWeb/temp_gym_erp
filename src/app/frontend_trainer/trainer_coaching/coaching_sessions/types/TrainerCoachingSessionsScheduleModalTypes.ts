// RESPONSIBILITY: Prop contract for the Trainer Sessions scheduling form.
import type { TrainerSessionsCreateSessionDto } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

export interface TrainerSessionsScheduleMemberOption {
  value: string;
  label: string;
}

export interface TrainerSessionsScheduleModalProps {
  onClose: () => void;
  onSubmit: (dto: TrainerSessionsCreateSessionDto) => Promise<boolean>;
  memberOptions: TrainerSessionsScheduleMemberOption[];
  memberOptionsIsPending: boolean;
  memberOptionsIsError: boolean;
  memberOptionsIsFetching: boolean;
  onRetryMemberOptions: () => void;
  isSubmitting: boolean;
  testId?: string;
}
