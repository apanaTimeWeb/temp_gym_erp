// RESPONSIBILITY: Mutations for creating tickets and replying to tickets.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerSupportTicketsApi } from '@/app/frontend_manager/manager_help_support/support_tickets/api/manager_support_tickets.api';
import { ManagerSupportTicketsQueryKeys } from '@/app/frontend_manager/manager_help_support/support_tickets/api/manager_support_tickets.query_keys';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import type { CreateSupportTicketFormValues, ReplySupportTicketFormValues } from '@/app/frontend_manager/manager_help_support/support_tickets/schemas/manager_support_tickets.schemas';

export function useManagerSupportTicketsMutations() {
  const queryClient = useQueryClient();

  const createTicketMutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: { values: CreateSupportTicketFormValues; idempotencyKey: string }) =>
      ManagerSupportTicketsApi.createTicket(values, idempotencyKey),
    onSuccess: (res) => {
      ManagerInfrastructureShowSuccessToast(res.message || 'Ticket raised to Admin', 'manager-ticket-success');
      void queryClient.invalidateQueries({ queryKey: ManagerSupportTicketsQueryKeys.all });
    },
    onError: (err) => ManagerInfrastructureShowErrorToast(err, 'manager-ticket-error'),
  });

  const replyTicketMutation = useMutation({
    mutationFn: ({ ticketId, values }: { ticketId: string; values: ReplySupportTicketFormValues }) =>
      ManagerSupportTicketsApi.sendReply(ticketId, values),
    onSuccess: (res) => {
      ManagerInfrastructureShowSuccessToast(res.message || 'Message sent to Admin', 'manager-ticket-reply-success');
      void queryClient.invalidateQueries({ queryKey: ManagerSupportTicketsQueryKeys.all });
    },
    onError: (err) => ManagerInfrastructureShowErrorToast(err, 'manager-ticket-reply-error'),
  });

  return {
    createTicket: createTicketMutation.mutateAsync,
    isCreating: createTicketMutation.isPending,
    sendReply: replyTicketMutation.mutateAsync,
    isReplying: replyTicketMutation.isPending,
  };
}

