// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// RESPONSIBILITY: Owns PT assignment form lifecycle, validation, submission, reset and dirty-state protection.
// DATA FLOW: PT options props → RHF/Zod draft → assignment callback → PT UI.
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { managerPtAssignmentSchema } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/schemas/manager_pt_assignments_assignment.schemas';
import type { ManagerPtAssignmentsAssignmentFormValues } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/schemas/manager_pt_assignments_assignment.schemas';
import type { ManagerPtAssignmentsAssignmentFormProps } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments_assignment_form.types';


/** Coordinates PT assignment form submission and prevents accidental loss of a dirty assignment draft. */
/**
 * @description Coordinates pt feature state and its documented UI/API boundary through useManagerPtAssignmentsAssignmentForm.
 * @dependencies Uses ManagerUnsavedChangesGuard, ManagerPtAssignmentsAssignmentSchema, ManagerPtAssignmentsAssignmentFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export function useManagerPtAssignmentsAssignmentForm(props: ManagerPtAssignmentsAssignmentFormProps) {
  const form = useForm<ManagerPtAssignmentsAssignmentFormValues>({ resolver: zodResolver(managerPtAssignmentSchema), defaultValues: { memberId: '', trainerId: '', packageId: '', startDate: '' } });
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(props.open && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(props.onClose); };
  const submit = form.handleSubmit(async (values) => { await props.onSubmit(values); form.reset(); });
  return { form, handleClose, submit };
}
