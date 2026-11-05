export interface ManagerGrievanceResolutionResolutionInput {
  resolveTicket: (ticketId: string, resolutionNote: string) => Promise<boolean>;
  isResolving: boolean;
}
