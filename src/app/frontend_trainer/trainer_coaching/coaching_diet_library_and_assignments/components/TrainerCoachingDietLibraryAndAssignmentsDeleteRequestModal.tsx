"use client";
// RESPONSIBILITY: Modal for trainer to request plan deletion with an audit reason sent to gym manager approval queue.
import { useRef, useState } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureDialogFocusTrap';
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export interface TrainerLibraryDeleteRequestModalProps {
  isOpen: boolean;
  plan: TrainerLibraryDietPlan | null;
  isSaving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (reason: string, idempotencyKey: string) => Promise<void>;
}

export default function TrainerLibraryDeleteRequestModal({
  isOpen,
  plan,
  isSaving,
  errorMessage,
  onClose,
  onSubmit,
}: TrainerLibraryDeleteRequestModalProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const dialogRef = useRef<HTMLDivElement>(null);
  const [reason, setReason] = useState('');

  useTrainerInfrastructureDialogFocusTrap({
    isOpen,
    dialogRef,
    onEscape: onClose,
  });

  if (!isOpen || !plan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const idempotencyKey = `del-req-${plan.id}-${Date.now()}`;
    await onSubmit(reason.trim() || 'Trainer requested diet plan retirement/deletion', idempotencyKey);
  };

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-50 flex items-center justify-center p-4" role="presentation">
      <div
        ref={dialogRef}
        className="bg-card border border-border rounded-2xl shadow-dialog w-full max-w-md overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-request-title"
        tabIndex={-1}
      >
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle size={20} />
            <h3 id="delete-request-title" className="text-base font-bold text-primary">
              Request Plan Deletion
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label={t('TEXT_CLOSE') ?? 'Close'}
            className="p-1 rounded-lg hover:bg-primary-subtle text-secondary"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-danger-bg border border-danger rounded-xl text-danger text-xs" role="alert">
              {errorMessage}
            </div>
          )}

          <p className="text-sm text-secondary">
            You are requesting deletion of <span className="font-semibold text-primary">{plan.name}</span>.
          </p>

          <div className="rounded-xl bg-warning-bg border border-warning/30 p-3.5">
            <p className="text-xs text-warning-text leading-relaxed">
              <strong>Manager Approval Required:</strong> To prevent accidental disruption to assigned members, this request will be forwarded to your gym manager for review.
            </p>
          </div>

          <div>
            <label htmlFor="delete-reason" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              Reason for Deletion
            </label>
            <textarea
              id="delete-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Obsolete macros, replaced by new seasonal plan, client graduated..."
              className="w-full px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring resize-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="min-h-10 px-4 py-2 border border-border rounded-xl text-sm font-medium text-secondary hover:bg-primary-subtle"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="min-h-10 px-4 py-2 bg-warning-bg border border-warning/40 text-warning-text hover:bg-warning/20 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              Send Request to Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

