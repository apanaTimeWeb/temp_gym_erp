"use client";
import React, { useState } from 'react';
import { X, IndianRupee, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface TrainerEarningsAdvanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TrainerEarningsAdvanceModal({
  isOpen,
  onClose,
  onSuccess,
}: TrainerEarningsAdvanceModalProps) {
  const [amount, setAmount] = useState<string>('15000');
  const [reason, setReason] = useState<string>('');
  const [needByDate, setNeedByDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid advance amount.' });
      return;
    }
    if (!reason.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide a short reason for the advance request.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      await apiFetch('/trainer/trainer_earnings/advance-request', {
        method: 'POST',
        body: JSON.stringify({
          amount: Math.round(numAmount * 100), // convert to minor units
          reason: reason.trim(),
          needByDate,
        }),
      });
      setStatusMessage({ type: 'success', text: 'Advance request of ₹' + numAmount.toLocaleString('en-IN') + ' submitted successfully!' });
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      setIsSubmitting(false);
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to submit advance request.' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="advance-modal-title"
      data-testid="trainer_earnings-advance-modal"
    >
      <div className="my-auto bg-card border border-border rounded-2xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-header shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <IndianRupee size={16} />
            </div>
            <h3 id="advance-modal-title" className="text-sm font-bold text-primary">
              Request Payout Advance
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary hover:text-primary p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 rounded-xl bg-input/40 border border-border text-xs text-secondary leading-relaxed">
            Trainers can request an advance against their upcoming monthly retainer and personal training commissions. Advances are automatically adjusted against the next settlement cycle.
          </div>

          <div>
            <label htmlFor="advance-amount" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Advance Amount (₹) *
            </label>
            <div className="relative">
              <span className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary font-bold">₹</span>
              <input
                id="advance-amount"
                type="number"
                min="1000"
                max="50000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full min-h-11 ps-8 pe-4 bg-input border border-border rounded-lg text-sm text-primary font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                placeholder="15000"
                data-testid="trainer_earnings-advance-amount-input"
              />
            </div>
            <p className="text-[11px] text-secondary mt-1">Available advance limit: ₹30,000 based on active commissions.</p>
          </div>

          <div>
            <label htmlFor="advance-reason" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Reason for Advance *
            </label>
            <textarea
              id="advance-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full p-3 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              placeholder="e.g. Medical expense, course certification fee, urgent personal need"
              data-testid="trainer_earnings-advance-reason-input"
            />
          </div>

          <div>
            <label htmlFor="advance-need-by" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Need By Date *
            </label>
            <input
              id="advance-need-by"
              type="date"
              value={needByDate}
              onChange={(e) => setNeedByDate(e.target.value)}
              required
              className="w-full min-h-11 px-3 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="trainer_earnings-advance-date-input"
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded-lg flex items-center gap-2 text-xs font-medium ${
                statusMessage.type === 'success' ? 'bg-success/15 text-success border border-success/30' : 'bg-danger/15 text-danger border border-danger/30'
              }`}
            >
              {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="min-h-10 px-4 rounded-lg border border-border text-xs font-semibold text-primary hover:bg-input"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-10 px-5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring flex items-center gap-1.5"
              data-testid="trainer_earnings-advance-submit-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="motion-safe:animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Advance Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
