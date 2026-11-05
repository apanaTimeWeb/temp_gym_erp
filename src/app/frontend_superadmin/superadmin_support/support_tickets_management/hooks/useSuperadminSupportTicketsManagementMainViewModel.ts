'use client';



import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useSuperadminSupportTicketsManagement } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagement';
import { useSuperadminSupportTicketsManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementDialogA11y';
import { useSuperadminSupportTicketsManagementTicketMutations } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementTicketMutations';
import { useSuperadminSupportTicketsManagementStore } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/state/useSuperadminSupportTicketsManagementStore';

// DATA FLOW: API / URL state / module client state → useState → superadmin_support_tickets view components.
/**
 * @description Owns ticket page form state, modal state, dialog accessibility, query state, and mutation callbacks for the Main view.
 * @dependencies Delegates server state to feature query/mutation hooks and shared session/dialog infrastructure to approved global hooks.
 * @edge-case Assignment modal state is reset on cancel or after successful assignment; repeated assignment is blocked while the mutation is pending.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSupportTicketsManagementMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin tickets main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSupportTicketsManagementMainViewModel() {
  const t = useTranslations('superadmin_support_tickets');
  const [assigneeInput, setAssigneeInput] = useState('');
  const query = useSuperadminSupportTicketsManagement();
  const mutations = useSuperadminSupportTicketsManagementTicketMutations();
  const store = useSuperadminSupportTicketsManagementStore();
  const assignDialogRef = useSuperadminSupportTicketsManagementDialogA11y(Boolean(store.assignModalTicketId), () => {
    if (mutations.isAssigning) return;
    store.setAssignModalTicketId(null);
    setAssigneeInput('');
  });

  const handleCloseTicket = async (ticketId: string): Promise<void> => {
    try {
      await mutations.closeTicket(ticketId);
    } catch {
      // Mutation error remains available to the view and is rendered as recoverable feedback.
      return;
    }
  };

  const handleOpenAssign = (ticketId: string): void => {
    setAssigneeInput('');
    store.setAssignModalTicketId(ticketId);
  };

  const handleConfirmAssign = async (): Promise<void> => {
    const ticketId = store.assignModalTicketId;
    if (!ticketId || !assigneeInput.trim() || mutations.isAssigning) return;
    try {
      await mutations.assignTicket({ ticketId, input: { assignee: assigneeInput } });
      store.setAssignModalTicketId(null);
      setAssigneeInput('');
    } catch {
      // Keep the modal and entered assignee intact so the user can retry after the inline error.
      return;
    }
  };

  return {
    t,
    ...query,
    ...store,
    ...mutations,
    assigneeInput,
    setAssigneeInput,
    assignDialogRef,
    handleCloseTicket,
    handleOpenAssign,
    handleConfirmAssign,
  };
}

