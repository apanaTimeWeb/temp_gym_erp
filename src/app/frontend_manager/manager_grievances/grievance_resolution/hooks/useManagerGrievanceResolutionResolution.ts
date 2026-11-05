// DATA FLOW: Owning module inputs → this hook state/derived result → consuming module-owned components.
'use client';
import { useState } from 'react';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import type { ManagerGrievanceResolutionResolutionInput } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution_resolution.types';

/**
 * @description Owns the local resolution workflow state and unsaved-change protection for the grievance module.
 * @dependencies Receives the feature mutation callback and consumes the approved module-independent unsaved-change guard.
 * @edge-case Clears the local draft and selected ticket immediately after a successful resolution or explicit cancellation.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerGrievanceResolutionResolution owns the grievance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerGrievanceResolutionResolution({ resolveTicket, isResolving }: ManagerGrievanceResolutionResolutionInput) {
  const [resolvingTicketId, setResolvingTicketId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(resolutionNote.trim().length > 0 && !isResolving);
  const startResolution = (ticketId: string) => { setResolvingTicketId(ticketId); setResolutionNote(''); };
  const cancelResolution = () => { void confirmAndClose(() => { setResolvingTicketId(null); setResolutionNote(''); }); };
  const submitResolution = async () => {
    if (!resolvingTicketId || !resolutionNote.trim() || isResolving) return false;
    const success = await resolveTicket(resolvingTicketId, resolutionNote.trim());
    if (success) { setResolvingTicketId(null); setResolutionNote(''); }
    return success;
  };
  return { resolvingTicketId, resolutionNote, setResolutionNote, startResolution, cancelResolution, submitResolution };
}
