// RESPONSIBILITY: Renders ManagerMaintenanceRequestsLogIssueModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Wrench, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { MAINTENANCE_PRIORITIES, MANAGER_MAINTENANCE_REQUESTS_DEFAULT_PRIORITY } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/constants/manager_maintenance_requests.constants';
import { CreateMaintenanceTicketSchema } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/schemas/manager_maintenance_requests.schemas';
import type { ManagerMaintenanceRequestsLogIssueModalProps } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests_log_issue_modal.types';
import type { CreateMaintenanceTicketPayload } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';


/** Renders the maintenance issue create form and owns only form-local interaction; API/mutation state stays in the feature hook. */
/**
 * @description Renders the `ManagerMaintenanceRequestsLogIssueModal` component for the `maintenance` feature boundary. Owns this component’s presentation/orchestration responsibility and delegates server data and business mutations to the documented hooks/API layer.
 * @dependencies Uses useRef, react-hook-form, zodResolver, and approved dialog focus infrastructure; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves the documented loading, empty, error, disabled, keyboard, responsive, and retry/confirmation states without introducing sibling-feature business dependencies.
 */
export function ManagerMaintenanceRequestsLogIssueModal({ onClose, onSubmit }: ManagerMaintenanceRequestsLogIssueModalProps) {
  const t = useTranslations('MANAGER_MAINTENANCE_REQUESTS');

  const dialogRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<CreateMaintenanceTicketPayload>({
    resolver: zodResolver(CreateMaintenanceTicketSchema),
    defaultValues: { priority: MANAGER_MAINTENANCE_REQUESTS_DEFAULT_PRIORITY },
  });
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty && !isSubmitting);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: true, onClose: () => void confirmAndClose(onClose) });


  const handleFormSubmit = async (data: CreateMaintenanceTicketPayload) => {
    const success = await onSubmit(data);
    if (success) onClose();
  };

  return (
    <div data-testid="manager_maintenance-managermaintenancelogissuemodal-presentation" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-3 sm:p-4 overflow-y-auto" role="presentation">
      <div data-testid="manager_maintenance-managermaintenancelogissuemodal-dialog" ref={dialogRef} className="my-auto bg-overlay w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden rounded-xl shadow-dialog border border-border" role="dialog" aria-modal="true" aria-labelledby="manager-maintenance-create-title" aria-describedby="manager-maintenance-create-description">
        <div className="flex items-center justify-between gap-3 p-5 border-b border-border shrink-0 bg-overlay">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-primary-subtle rounded-lg text-primary shrink-0"><Wrench size={18} strokeWidth={2} aria-hidden="true"/></div>
            <div className="min-w-0">
              <h2 id="manager-maintenance-create-title" className="text-lg font-bold text-text-primary truncate">{t("COPY_LOG_MAINTENANCE_ISSUE")}</h2>
              <p id="manager-maintenance-create-description" className="text-sm text-text-secondary">{t("COPY_CAPTURE_ISSUE_PRIORITY_ESTIMATED_COST")}</p>
            </div>
          </div>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_maintenance-manager-maintenance-log-issue-modal-button-close" type="button" onClick={() => void confirmAndClose(onClose)} aria-label={t("COPY_CLOSE_MAINTENANCE_ISSUE_FORM")} ><X size={18} strokeWidth={2} aria-hidden="true"/></button>
        </div>
        <form data-testid="manager_maintenance-managermaintenancelogissuemodal-form-1" onSubmit={handleSubmit(handleFormSubmit)} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 custom-scrollbar">
          <div>
            <label htmlFor="manager-maintenance-title" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_ISSUE_TITLE")}</label>
            <input data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-title" id="manager-maintenance-title" {...register('title')} aria-invalid={errors.title ? 'true' : 'false'} aria-describedby={errors.title ? 'manager-maintenance-title-error' : undefined} placeholder={t("COPY_E_G_TREADMILL_4_WIRE_BROKEN")} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            {errors.title && <p data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-title-error" id="manager-maintenance-title-error" role="alert" className="text-danger-text text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="manager-maintenance-equipment" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_EQUIPMENT_AREA")}</label>
            <input data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-equipment" id="manager-maintenance-equipment" {...register('equipment')} aria-invalid={errors.equipment ? 'true' : 'false'} aria-describedby={errors.equipment ? 'manager-maintenance-equipment-error' : undefined} placeholder={t("COPY_E_G_CARDIO_SECTION")} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            {errors.equipment && <p data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-equipment-error" id="manager-maintenance-equipment-error" role="alert" className="text-danger-text text-xs mt-1">{errors.equipment.message}</p>}
          </div>
          <div>
            <label htmlFor="manager-maintenance-vendor" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_VENDOR")} ({t("COPY_OPTIONAL")})</label>
            <input data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-vendor" id="manager-maintenance-vendor" {...register('assignedVendor')} placeholder="e.g. FitTech Repairs" className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="manager-maintenance-priority" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_PRIORITY_2")}</label>
              <select data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-priority" id="manager-maintenance-priority" {...register('priority')} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{MAINTENANCE_PRIORITIES.map((priority) => <option key={priority.value} value={priority.value} data-testid="manager_maintenance-managermaintenancelogissuemodal-interactive">{priority.label}</option>)}</select>
            </div>
            <div>
              <label htmlFor="manager-maintenance-estimated-cost" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_ESTIMATED_COST")}</label>
              <input data-testid="manager_maintenance-manager-maintenance-log-issue-modal-manager-maintenance-estimated-cost" id="manager-maintenance-estimated-cost" type="number" min="0" max="100000000" step="1" {...register('estimatedCost', { setValueAs: (value) => value === '' || value === null ? undefined : Number(value) })} placeholder={t("COPY_OPTIONAL")} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" aria-invalid={errors.estimatedCost ? 'true' : undefined} aria-describedby={errors.estimatedCost ? 'managermaintenancelogissuemodal-estimatedCost-error' : undefined} />
              {errors.estimatedCost && <p id="managermaintenancelogissuemodal-estimatedCost-error" data-testid="manager_maintenance-manager-maintenance-log-issue-modal-status" role="alert" className="text-danger-text text-xs mt-1">{errors.estimatedCost.message}</p>}
            </div>
          </div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex flex-col-reverse sm:flex-row gap-3 shrink-0">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex-1 min-h-11 rounded-lg border border-border font-semibold text-text-secondary hover:bg-input motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_maintenance-manager-maintenance-log-issue-modal-button-cancel" type="button" onClick={() => void confirmAndClose(onClose)} >{t("COPY_CANCEL")}</button>
            <button data-testid="manager_maintenance-manager-maintenance-log-issue-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-11 rounded-lg bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110">{isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : <Wrench size={18} strokeWidth={2} aria-hidden="true"/>}<span>{isSubmitting ? t('COPY_LOGGING') : t('COPY_LOG_ISSUE')}</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
