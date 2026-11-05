import type { MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';

export interface ManagerMaintenanceRequestsContentProps {
  tickets: MaintenanceTicket[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  reload: () => unknown;
  resolveTicket: (ticketId: string) => Promise<unknown>;
  isResolving: boolean;
  locale: string;
}
