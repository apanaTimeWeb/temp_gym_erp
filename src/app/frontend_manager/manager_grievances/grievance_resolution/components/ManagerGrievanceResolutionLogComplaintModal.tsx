// RESPONSIBILITY: Renders ManagerGrievanceResolutionLogComplaintModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Frown, Loader2, MessageSquare, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { GRIEVANCE_CATEGORIES } from '@/app/frontend_manager/manager_grievances/grievance_resolution/constants/manager_grievance_resolution.constants';
import { CreateGrievanceTicketSchema } from '@/app/frontend_manager/manager_grievances/grievance_resolution/schemas/manager_grievance_resolution.schemas';
import type { ManagerGrievanceResolutionLogComplaintModalProps } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution_log_complaint_modal.types';
import type { CreateGrievanceTicketPayload } from '@/app/frontend_manager/manager_grievances/grievance_resolution/types/manager_grievance_resolution.types';


/** Renders the grievance create form and owns only form-local interaction; API/mutation state stays in the feature hook. */
/**
 * @description Renders the `ManagerGrievanceResolutionLogComplaintModal` component for the `grievance` feature boundary. Owns this component’s presentation/orchestration responsibility and delegates server data and business mutations to the documented hooks/API layer.
 * @dependencies Uses useRef, react-hook-form, zodResolver, and approved dialog focus infrastructure; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves the documented loading, empty, error, disabled, keyboard, responsive, and retry/confirmation states without introducing sibling-feature business dependencies.
 */
export function ManagerGrievanceResolutionLogComplaintModal({ onClose, onSubmit }: ManagerGrievanceResolutionLogComplaintModalProps) {
  const t = useTranslations('MANAGER_GRIEVANCE_RESOLUTION');

  const dialogRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<CreateGrievanceTicketPayload>({
    resolver: zodResolver(CreateGrievanceTicketSchema),
    defaultValues: { category: 'OTHER' },
  });
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty && !isSubmitting);
  const handleClose = useCallback(() => {
    void confirmAndClose(onClose);
  }, [confirmAndClose, onClose]);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: true, onClose: handleClose });


  const handleFormSubmit = async (data: CreateGrievanceTicketPayload) => {
    const success = await onSubmit(data);
    if (success) onClose();
  };

  return (
    <div data-testid="manager_grievance-managergrievancelogcomplaintmodal-presentation" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-3 sm:p-4"role="presentation">
      <div data-testid="manager_grievance-managergrievancelogcomplaintmodal-dialog" ref={dialogRef}
        className="bg-overlay w-full max-w-md max-h-screen overflow-y-auto rounded-xl shadow-dialog border border-border"
       role="dialog"
        aria-modal="true"
        aria-labelledby="manager-grievance-create-title"
        aria-describedby="manager-grievance-create-description"
      >
        <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-primary-subtle rounded-lg text-primary shrink-0"><MessageSquare size={18} strokeWidth={2} aria-hidden="true"/></div>
            <div className="min-w-0">
              <h2 id="manager-grievance-create-title" className="text-lg font-bold text-text-primary truncate">{t("COPY_LOG_MEMBER_COMPLAINT")}</h2>
              <p id="manager-grievance-create-description" className="text-sm text-text-secondary">{t("COPY_RECORD_COMPLAINT_FOLLOW_UP_RESOLUTION")}</p>
            </div>
          </div>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_grievance-manager-grievance-log-complaint-modal-button-close" type="button" onClick={() => void confirmAndClose(onClose)} aria-label={t("COPY_CLOSE_COMPLAINT_FORM")} >
            <X size={18} strokeWidth={2} aria-hidden="true"/>
          </button>
        </div>

        <form data-testid="manager_grievance-managergrievancelogcomplaintmodal-form-1" onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4">
          <div>
            <label htmlFor="manager-grievance-member-name" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_MEMBER_NAME")}</label>
            <input data-testid="manager_grievance-manager-grievance-log-complaint-modal-manager-grievance-member-name" id="manager-grievance-member-name" {...register('memberName')} aria-invalid={errors.memberName ? 'true' : 'false'} aria-describedby={errors.memberName ? 'manager-grievance-member-name-error' : undefined} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" placeholder={t("COPY_E_G_RAHUL_SHARMA")} />
            {errors.memberName && <p data-testid="manager_grievance-manager-grievance-log-complaint-modal-manager-grievance-member-name-error" id="manager-grievance-member-name-error" role="alert" className="text-danger-text text-xs mt-1">{errors.memberName.message}</p>}
          </div>
          <div>
            <label htmlFor="manager-grievance-category" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_CATEGORY")}</label>
            <select data-testid="manager_grievance-manager-grievance-log-complaint-modal-manager-grievance-category" id="manager-grievance-category" {...register('category')} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
              {GRIEVANCE_CATEGORIES.map((category) => <option key={category.value} value={category.value} data-testid="manager_grievance-managergrievancelogcomplaintmodal-interactive">{category.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="manager-grievance-issue" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_ISSUE_DESCRIPTION")}</label>
            <textarea data-testid="manager_grievance-manager-grievance-log-complaint-modal-manager-grievance-issue" id="manager-grievance-issue" {...register('issue')} aria-invalid={errors.issue ? 'true' : 'false'} aria-describedby={errors.issue ? 'manager-grievance-issue-error' : undefined} placeholder={t("COPY_WHAT_HAPPENED")} className="w-full min-h-28 resize-none bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            {errors.issue && <p data-testid="manager_grievance-manager-grievance-log-complaint-modal-manager-grievance-issue-error" id="manager-grievance-issue-error" role="alert" className="text-danger-text text-xs mt-1">{errors.issue.message}</p>}
          </div>
          <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex-1 min-h-11 rounded-lg border border-border font-semibold text-text-secondary hover:bg-input motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_grievance-manager-grievance-log-complaint-modal-button-cancel" type="button" onClick={() => void confirmAndClose(onClose)} >{t("COPY_CANCEL_1")}</button>
            <button data-testid="manager_grievance-manager-grievance-log-complaint-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-11 rounded-lg bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110">
              {isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/> : <Frown size={18} strokeWidth={2} aria-hidden="true" />}
              <span>{isSubmitting ? t('COPY_LOGGING') : t('COPY_LOG_COMPLAINT')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
