'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export interface SuperadminGymsDirectoryConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isLoading?: boolean;
  requireReason?: boolean;
  reasonOptions?: string[];
  requireNote?: boolean;
  confirmationMatchText?: string;
  confirmationPrompt?: string;
  beforeAfterComparison?: Array<{ field: string; from: string; to: string }>;
  onConfirm: (data: { reason: string; note: string }) => void | Promise<void>;
  onClose: () => void;
}

export type ConfirmDialogProps = SuperadminGymsDirectoryConfirmDialogProps;

const DEFAULT_REASONS = [
  'Non-payment of subscription dues',
  'Violation of terms of service',
  'Customer requested account change',
  'Scheduled maintenance & migration',
  'Billing renewal & plan upgrade',
  'Administrative review',
  'Other',
];

function ConfirmDialogContent({
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  isLoading = false,
  requireReason = false,
  reasonOptions = DEFAULT_REASONS,
  requireNote = false,
  confirmationMatchText,
  confirmationPrompt,
  beforeAfterComparison,
  onConfirm,
  onClose,
}: Omit<ConfirmDialogProps, 'isOpen'>) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [matchInput, setMatchInput] = useState<string>('');

  // Focus trap & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, onClose]);

  const isMatchValid = !confirmationMatchText || matchInput.trim() === confirmationMatchText.trim();
  const isReasonValid = !requireReason || selectedReason.trim().length > 0;
  const isNoteValid = !requireNote || note.trim().length > 0;
  const canConfirm = isMatchValid && isReasonValid && isNoteValid && !isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canConfirm) return;
    onConfirm({ reason: selectedReason, note });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm motion-safe:animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      ref={dialogRef}
    >
      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-dialog p-6 overflow-hidden flex flex-col max-h-dialog-desktop">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            {isDanger && (
              <div className="w-10 h-10 rounded-full bg-danger-bg flex items-center justify-center text-danger shrink-0 border border-danger">
                <AlertTriangle size={20} aria-hidden="true" />
              </div>
            )}
            <div>
              <h2 id="confirm-dialog-title" className="text-lg font-bold text-primary">
                {title}
              </h2>
              <p className="text-sm text-secondary mt-0.5">{description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close dialog"
            className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Before -> After Comparison table if present */}
          {beforeAfterComparison && beforeAfterComparison.length > 0 && (
            <div className="p-3 bg-page border border-border rounded-lg space-y-2">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Summary of Changes
              </p>
              <div className="divide-y divide-border text-xs">
                {beforeAfterComparison.map((item, idx) => (
                  <div key={idx} className="py-1.5 flex items-center justify-between gap-2">
                    <span className="font-medium text-secondary">{item.field}:</span>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-disabled">{item.from}</span>
                      <span className="text-secondary font-bold">→</span>
                      <span className="text-primary font-semibold">{item.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Reason Dropdown */}
          {requireReason && (
            <div>
              <label
                htmlFor="confirm-dialog-reason"
                className="block text-sm font-semibold text-secondary mb-1.5"
              >
                Reason <span className="text-danger">*</span>
              </label>
              <select
                id="confirm-dialog-reason"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                required
                className="w-full min-h-11 bg-input border border-border rounded-lg ps-3.5 pe-9 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="" disabled>
                  Select a mandatory reason...
                </option>
                {reasonOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Optional Note */}
          <div>
            <label
              htmlFor="confirm-dialog-note"
              className="block text-sm font-semibold text-secondary mb-1.5"
            >
              Additional Note {requireNote && <span className="text-danger">*</span>}
            </label>
            <textarea
              id="confirm-dialog-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add internal audit or operational details..."
              rows={3}
              required={requireNote}
              className="w-full bg-input border border-border rounded-lg p-3 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Confirmation Text Input (e.g. typing gym name for deletion) */}
          {confirmationMatchText && (
            <div className="p-3 bg-danger-bg/20 border border-danger/40 rounded-lg space-y-2">
              <label
                htmlFor="confirm-dialog-match"
                className="block text-xs font-semibold text-danger"
              >
                {confirmationPrompt || (
                  <>
                    Type <strong className="font-bold underline">{confirmationMatchText}</strong> to
                    confirm:
                  </>
                )}
              </label>
              <input
                id="confirm-dialog-match"
                type="text"
                value={matchInput}
                onChange={(e) => setMatchInput(e.target.value)}
                autoComplete="off"
                placeholder={confirmationMatchText}
                className="w-full min-h-11 bg-input border border-danger/50 rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
              />
              {matchInput && !isMatchValid && (
                <p className="text-xs text-danger font-medium">Text does not match exactly.</p>
              )}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="min-h-11 px-4 py-2 rounded-lg border border-border text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canConfirm}
            className={`min-h-11 px-5 py-2 rounded-lg text-sm font-bold inline-flex items-center gap-2 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${isDanger
                ? 'bg-danger text-on-danger hover:bg-danger/90 focus-visible:ring-danger'
                : 'bg-primary text-on-primary hover:bg-primary-hover focus-visible:ring-primary'
              }`}
          >
            {isLoading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function SuperadminGymsDirectoryConfirmDialog(props: SuperadminGymsDirectoryConfirmDialogProps) {
  if (!props.isOpen) return null;
  return <ConfirmDialogContent key="open" {...props} />;
}

export const ConfirmDialog = SuperadminGymsDirectoryConfirmDialog;
