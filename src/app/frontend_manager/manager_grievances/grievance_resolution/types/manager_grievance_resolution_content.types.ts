import type { GrievanceTicket } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';

export interface ManagerGrievanceResolutionContentProps {
  tickets: GrievanceTicket[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  reload: () => unknown;
  isResolving: boolean;
  resolvingTicketId: string | null;
  resolutionNote: string;
  setResolutionNote: (value: string) => void;
  startResolution: (ticketId: string) => void;
  cancelResolution: () => void;
  submitResolution: () => Promise<boolean>;
}
