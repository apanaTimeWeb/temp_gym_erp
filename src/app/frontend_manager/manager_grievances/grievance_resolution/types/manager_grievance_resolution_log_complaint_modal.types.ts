/**
 * @description Defines the prop contract for the grievance complaint modal presentation component.
 * @dependencies Reuses the module-owned grievance ticket payload type.
 * @edge-case Submission remains asynchronous so loading and unsaved-change guard behavior can be preserved by the component.
 */
import type { CreateGrievanceTicketPayload } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';

export interface ManagerGrievanceResolutionLogComplaintModalProps {
  onClose: () => void;
  onSubmit: (data: CreateGrievanceTicketPayload) => Promise<boolean>;
}
