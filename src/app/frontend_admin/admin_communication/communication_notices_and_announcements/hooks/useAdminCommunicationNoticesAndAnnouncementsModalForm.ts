"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and audience/branch selection logic for AdminAnnouncementsModal.
// DATA FLOW: Store draft → React Hook Form → Zod validation → AdminAnnouncementsLogic mutation → TanStack Query invalidation.

/**
 * @description useAdminAnnouncementsModalForm owns announcement form state, validation, and submit intent for the modal.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/state/useAdminCommunicationNoticesAndAnnouncementsStore';
import { useAdminAnnouncementsUnsavedChangesGuard } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsUnsavedChangesGuard';
import { announcementFormValuesSchema } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/schemas/AdminCommunicationNoticesAndAnnouncementsSchemas';
import { EMPTY_ANNOUNCEMENT_FORM } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants';
import type { AnnouncementFormValues } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
import { applyAdminCommunicationNoticesAndAnnouncementsApiValidationErrors } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsApiResponse';

/** Owns the announcements modal form lifecycle and exposes view-ready React Hook Form controls. */
export function useAdminAnnouncementsModalForm() {
  const { showModal, setShowModal, editingAnnouncementId, saveAnnouncement, saving, abandonDraftIntent } = useAdminAnnouncementsLogic();
  const { form: storeForm } = useAdminAnnouncementsStore();
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormValuesSchema),
    defaultValues: storeForm ?? EMPTY_ANNOUNCEMENT_FORM,
  });
  const { register, handleSubmit, control, reset, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminAnnouncementsUnsavedChangesGuard(isDirty);

  // EFFECT: Rehydrates the form whenever the modal opens with a create/edit draft from the feature store.
  useEffect(() => {
    if (showModal) reset(storeForm ?? EMPTY_ANNOUNCEMENT_FORM);
  }, [reset, showModal, storeForm]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) {
      abandonDraftIntent();
      setShowModal(false);
    }
  }, [abandonDraftIntent, confirmDiscardIfDirty, setShowModal]);

  const toggleArrayValue = useCallback(<T extends string>(items: T[], value: T): T[] => {
    return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
  }, []);

  const saveAnnouncementWithValidation = useCallback((data: AnnouncementFormValues) => {
    saveAnnouncement(data, (error) => { applyAdminCommunicationNoticesAndAnnouncementsApiValidationErrors(error, form.getValues(), form.setError); });
  }, [form.getValues, form.setError, saveAnnouncement]);

  return {
    showModal,
    editingAnnouncementId,
    saving,
    isEdit: Boolean(editingAnnouncementId),
    register,
    handleSubmit,
    control,
    errors,
    handleClose,
    saveAnnouncement: saveAnnouncementWithValidation,
    toggleArrayValue,
  };
}
