/**
 * @description Defines the prop contract for the maintenance issue modal presentation component.
 * @dependencies Reuses the module-owned maintenance ticket payload type.
 * @edge-case Submission remains asynchronous so loading and unsaved-change guard behavior can be preserved by the component.
 */
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';

export interface ManagerMaintenanceRequestsLogIssueModalProps {
  onClose: () => void;
  onSubmit: (data: CreateMaintenanceTicketPayload) => Promise<boolean>;
}
