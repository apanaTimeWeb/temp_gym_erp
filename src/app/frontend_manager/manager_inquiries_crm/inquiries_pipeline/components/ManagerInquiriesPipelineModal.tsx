// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useRef } from 'react';
import { X, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { MANAGER_INQUIRY_CONVERTED_STATUS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import { ManagerInquiriesPipelineFormatTime as formatInquiryTime } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import { INQUIRY_MODAL_FIELDS, INQUIRIES_STATUS_LABEL_KEYS, INQUIRY_SOURCES, INQUIRY_SOURCE_LABEL_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_shared.constants';
import { useManagerInquiriesPipelineForm } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineForm';
import { ManagerInquiriesPipelineFormatDate } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';

/** @description Renders the ManagerInquiriesPipelineModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerInquiriesPipelineModal() {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');

  const { showModal, editId, editData, saving, plans, form, newNote, setNewNote, submit, handleClose } = useManagerInquiriesPipelineForm();
  const { register, control, formState: { errors, isSubmitting } } = form;
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: showModal, onClose: handleClose });
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop overflow-y-auto">
      <div ref={dialogRef} tabIndex={-1} className="my-auto bg-overlay rounded-2xl shadow-dialog w-full max-w-xl overflow-hidden border border-border max-h-dialog-desktop flex flex-col" role="dialog" aria-modal="true" aria-labelledby="managerinquiriesmodal-dialog-title">
        <div className="shrink-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between z-20 rounded-t-2xl">
          <h3 className="text-lg font-bold text-text-primary" id="managerinquiriesmodal-dialog-title">{editId ? t('COPY_EDIT_INQUIRY') : t('COPY_NEW_INQUIRY')}</h3>
          <button data-testid="manager_inquiries-manager-inquiries-modal-close-1" type="button" onClick={handleClose} className="p-2 rounded-lg hover:bg-primary-subtle text-text-secondary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" aria-label={t("COPY_CLOSE_INQUIRY_FORM")}>
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          <form data-testid="manager_inquiries-managerinquiriesmodal-form-1" onSubmit={submit} className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {INQUIRY_MODAL_FIELDS.map((field, mapIndex) => (
                <div key={field.key}>
                  <label htmlFor={`manager-managerinquiriesmodal-field-${mapIndex}`} className="block text-sm font-medium text-text-secondary mb-1">{t(field.labelKey)}</label>
                  <input id={`manager-managerinquiriesmodal-field-${mapIndex}`} data-testid={`manager_inquiries-inquiries-managerinquiriesmodal-input-edit-inquiry-${mapIndex}`} type={field.type} placeholder={'placeholder' in field ? String(field.placeholder ?? '') : undefined} maxLength={field.type === 'tel' ? 10 : undefined} {...register(field.key as keyof InquiryFormValues)} aria-invalid={errors[field.key as keyof InquiryFormValues] ? 'true' : undefined} aria-describedby={errors[field.key as keyof InquiryFormValues] ? `managerinquiriesmodal-${field.key}-error` : undefined} className={`w-full border rounded-xl px-4 py-2 text-sm bg-input text-text-primary ${errors[field.key as keyof InquiryFormValues] ? 'border-danger' : 'border-border'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page`} />
                  {errors[field.key as keyof InquiryFormValues] && <p id={`managerinquiriesmodal-${field.key}-error`} data-testid={`manager_inquiries-managerinquiriesmodal-error-${field.key}`} role="alert" className="text-danger-text text-xs mt-1">{String(errors[field.key as keyof InquiryFormValues]?.message ?? '')}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_INTEREST_PLAN")}</label>
                <Controller name="interest" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_INTEREST_PLAN")} dataTestId="manager_inquiries-managerinquiriesmodal-managersearchabledropdown-1" value={field.value || ''} onChange={field.onChange} options={[...plans.map((plan) => ({ label: String(plan.label), value: String(plan.value) })), { label: t("COPY_OTHER"), value: 'Other' }]} placeholder={t("COPY_SELECT_PLAN_2")}  data-testid="manager_inquiries-managerinquiriesmodal-searchable-dropdown-1"/>} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_STATUS")}</label>
                <Controller name="status" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_STATUS")} dataTestId="manager_inquiries-managerinquiriesmodal-managersearchabledropdown-2" value={field.value || ''} onChange={field.onChange} options={Object.entries(INQUIRIES_STATUS_LABEL_KEYS).filter(([value]) => value !== MANAGER_INQUIRY_CONVERTED_STATUS).map(([value, labelKey]) => ({ value, label: t(labelKey) }))}  data-testid="manager_inquiries-managerinquiriesmodal-searchable-dropdown-2"/>} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_SOURCE")}</label>
                <Controller name="source" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_SOURCE")} dataTestId="manager_inquiries-managerinquiriesmodal-managersearchabledropdown-3" value={field.value || ''} onChange={field.onChange} options={INQUIRY_SOURCES.map((source) => ({ value: source, label: t(INQUIRY_SOURCE_LABEL_KEYS[source]) }))}  data-testid="manager_inquiries-managerinquiriesmodal-searchable-dropdown-3"/>} />
              </div>
            </div>
            {editId && (
              <div className="pt-4 mt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-text-primary mb-3">{t("COPY_FOLLOW_UP_HISTORY")}</h4>
                {editData?.followUpLogs?.length ? (
                  <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
                    {editData.followUpLogs.map((log) => (
                      <div key={`${log.date}-${log.note}`} className="bg-primary-subtle p-3 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary font-medium mb-1">{ManagerInquiriesPipelineFormatDate(log.date)} {formatInquiryTime(log.date)}</div>
                        <div className="text-sm text-text-primary">{log.note}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary italic mb-4">{t("COPY_NO_FOLLOW_UP_HISTORY_YET")}</p>
                )}
                <textarea className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full border border-border rounded-xl px-4 py-2 text-sm bg-input text-text-primary min-h-20"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-modal-textarea-message-input" value={newNote} onChange={(event) => setNewNote(event.target.value)} placeholder={t("COPY_ENTER_CALL_NOTES_REMARKS")}  aria-label={t("COPY_NEW_FOLLOW_UP_NOTE")} />
              </div>
            )}
            <div className="sticky bottom-0 bg-overlay flex flex-col sm:flex-row gap-3 pt-3 border-t border-border mt-2 shrink-0 z-10">
              <button data-testid="manager_inquiries-manager-inquiries-modal-close-2" type="button" onClick={handleClose} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL_1")}</button>
              <button data-testid="manager_inquiries-manager-inquiries-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">
                {(() => { if (isSubmitting) { return t('COPY_SAVING'); } return <><Save size={18} strokeWidth={2}/>{editId ? t('COPY_UPDATE') : t('COPY_ADD_INQUIRY')}</>; })()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );;
}
