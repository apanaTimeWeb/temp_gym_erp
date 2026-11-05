// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerAttendanceMemberBasic, TrainerAttendanceCreateDto } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

export interface TrainerAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TrainerAttendanceMemberBasic[];
  membersLoading: boolean;
  membersError: boolean;
  onRetryMembers: () => void;
  saving: boolean;
  onSubmit: (data: TrainerAttendanceCreateDto) => Promise<void>;
  testId?: string;
}
