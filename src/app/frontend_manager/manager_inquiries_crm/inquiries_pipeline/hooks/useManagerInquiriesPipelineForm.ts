// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { EMPTY_INQUIRY_FORM } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_form_defaults.constants';
import { useManagerInquiriesPipelineLogic } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineLogic';
import { useInquiryPlansQuery } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineQueries';
import { managerInquiriesFormSchema } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/schemas/manager_inquiries_pipeline_form.schemas';
import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesPipelineForm.
 * @dependencies Uses useManagerInquiriesPipelineLogic, useManagerInquiriesPipelineQueries, ManagerInquiriesPipelineFormSchema, ManagerInquiriesPipelineFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesPipelineForm owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesPipelineForm() {
  const logic = useManagerInquiriesPipelineLogic();
  const { data: plansData } = useInquiryPlansQuery();
  const plans = plansData ? plansData.map((p) => ({ label: p.name, value: p.name })) : [];
  const form = useForm<InquiryFormValues>({ resolver: zodResolver(managerInquiriesFormSchema), defaultValues: EMPTY_INQUIRY_FORM });
  const [newNote, setNewNote] = useState('');
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!logic.showModal) return; form.reset((logic.editData as InquiryFormValues | null) ?? EMPTY_INQUIRY_FORM); setNewNote(''); }, [form, logic.editData, logic.showModal]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(logic.showModal && (form.formState.isDirty || newNote.trim().length > 0));
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit((data) => { const payload = { ...data, ...(data.email ? {} : { email: undefined }), ...(data.notes ? {} : { notes: undefined }), followUpLogs: newNote.trim() ? [...(logic.editData?.followUpLogs || []), { date: new Date(), note: newNote.trim() }] : logic.editData?.followUpLogs || [] }; logic.saveInquiry(payload); });
  return { ...logic, plans, form, newNote, setNewNote, submit, handleClose };
}
