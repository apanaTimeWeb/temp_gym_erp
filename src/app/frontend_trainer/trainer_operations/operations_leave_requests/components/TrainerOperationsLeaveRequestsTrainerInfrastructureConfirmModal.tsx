// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Renders the accessible Trainer-wide confirmation dialog. It owns only presentation and keyboard/focus behavior; mutation ownership remains in the caller.
import { useEffect, useId, useRef, useState } from 'react';

import { AlertTriangle, X } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsTrainerInfrastructureTooltip';

import type { TrainerInfrastructureConfirmModalProps } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsTrainerInfrastructureConfirmTypes';







/**
 * @description Renders the accessible Trainer-wide confirmation dialog. It owns only presentation and keyboard/focus behavior; mutation ownership remains in the caller.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Presents a reusable confirmation surface for destructive or irreversible Trainer actions without owning business mutations.
 * @dependencies Confirm provider state and global semantic design tokens.
 * @edge-case Footer actions remain reachable on narrow/mobile viewports and focus returns to the invoking control.
 */
/**
 * @description Renders and coordinates the infrastructure feature form/modal surface for InfrastructureConfirmModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerInfrastructureConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type = 'danger',
  requireTypedConfirmation = false,
  confirmationPhrase,
}: TrainerInfrastructureConfirmModalProps) {
  const t = useTranslations('TRAINER_INFRASTRUCTURE');
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmationInputRef = useRef<HTMLInputElement>(null);
  const [typedConfirmation, setTypedConfirmation] = useState('');

// Effect contract: focus the confirmation dialog and keep Escape behavior aligned with the current open state.
  useEffect(() => {
    if (!isOpen) {
      setTypedConfirmation('');
      return;
    }
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (requireTypedConfirmation) confirmationInputRef.current?.focus();
    else cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onCancel, requireTypedConfirmation]);

  if (!isOpen) return null;

  const resolvedConfirmText = confirmText ?? t('TEXT_CONFIRM');
  const resolvedConfirmationPhrase = confirmationPhrase ?? t('TEXT_DELETE_CONFIRMATION_PHRASE');
  const resolvedCancelText = cancelText ?? t("TEXT_CANCEL");

  const confirmClass =
    type === 'danger'
      ? 'bg-danger text-on-danger'
      : type === 'warning'
        ? 'bg-warning-bg text-warning border border-border'
        : 'bg-info text-on-info';
  const iconClass =
    type === 'danger'
      ? 'bg-danger-bg text-danger'
      : type === 'warning'
        ? 'bg-warning-bg text-warning'
        : 'bg-info-bg text-info';

  return (
    <div className="fixed inset-0 z-40 flex items-start sm:items-center justify-center overflow-y-auto bg-overlay-backdrop p-3 sm:p-4 " onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }} data-testid="trainer_infrastructure-trainerinfrastructureconfirmmodal-div_1">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="my-auto flex max-h-dialog-mobile sm:max-h-dialog-desktop w-full max-w-sm flex-col overflow-hidden rounded-xl bg-overlay shadow-dialog motion-safe:transition-opacity motion-safe:duration-base"
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border ">
          <div className="flex items-center gap-3 min-w-0 ">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconClass} `} aria-hidden="true">
              <AlertTriangle size={18} strokeWidth={2} />
            </div>
            <TrainerInfrastructureTooltip content={title}><h2 id={titleId} className="text-section-title font-bold text-primary truncate ">{title}</h2></TrainerInfrastructureTooltip>
          </div>
          <button
            type="button"
            aria-label={t("TEXT_CLOSE_CONFIRMATION_DIALOG")}
            onClick={onCancel}
            className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_infrastructure-trainerinfrastructureconfirmmodal-button_2">
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto px-6 py-5 ">
          <p id={descriptionId} className="text-sm text-secondary leading-relaxed ">{message}</p>
          {requireTypedConfirmation && (
            <div className="mt-5 space-y-2 ">
              <label htmlFor={`${descriptionId}-confirmation`} className="block text-xs font-semibold text-secondary ">{t("TEXT_TYPE")} <span className="text-primary ">{resolvedConfirmationPhrase}</span> {t("TEXT_TO_CONFIRM")}</label>
              <input
                ref={confirmationInputRef}
                id={`${descriptionId}-confirmation`}
                value={typedConfirmation}
                onChange={(event) => setTypedConfirmation(event.target.value)}
                autoComplete="off"
                className="w-full min-h-11 rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
               data-testid="trainer_infrastructure-trainerinfrastructureconfirmmodal-input_3"/>
            </div>
          )}
          <div className="flex flex-wrap gap-3 mt-6 justify-end ">
            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onCancel}
              className="min-h-11 px-4 border border-border rounded-md text-sm font-semibold text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_infrastructure-trainerinfrastructureconfirmmodal-button_4">
              {resolvedCancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={requireTypedConfirmation && typedConfirmation !== resolvedConfirmationPhrase}
              className={`min-h-11 px-4 rounded-md text-sm font-semibold motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${confirmClass} motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95`}
             data-testid="trainer_infrastructure-trainerinfrastructureconfirmmodal-button_5">
              {resolvedConfirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
