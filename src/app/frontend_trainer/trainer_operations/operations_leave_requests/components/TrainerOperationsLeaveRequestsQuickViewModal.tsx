"use client";
// RESPONSIBILITY: Centered quick-view modal showing full leave request dates, reason, manager notes, approval/rejection details, and attachments.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ExternalLink, FileText, MessageSquare, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { TrainerScheduleFormatDate } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleFormatDate';
import type { TrainerScheduleLeaveRequest } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsScheduleTypes';

export interface TrainerOperationsLeaveRequestsQuickViewModalProps {
  leave: TrainerScheduleLeaveRequest | null;
  onClose: () => void;
  getStatusLabel: (status: string) => string;
  getStatusBadgeClass: (status: string) => string;
  getLeaveTypeLabel: (type: string) => string;
  calculateDays: (start: string, end: string) => number;
}

export default function TrainerOperationsLeaveRequestsQuickViewModal({
  leave,
  onClose,
  getStatusLabel,
  getStatusBadgeClass,
  getLeaveTypeLabel,
  calculateDays,
}: TrainerOperationsLeaveRequestsQuickViewModalProps) {
  const t = useTranslations('TRAINER_SCHEDULE');
  const locale = useLocale();

  useEffect(() => {
    if (!leave) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [leave, onClose]);

  if (!leave || typeof document === 'undefined') return null;

  const daysCount = calculateDays(leave.startDate, leave.endDate);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-leave-quick-view-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      data-testid="trainer_leave-quick-view-overlay"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />
      <div
        className="relative z-10 w-full max-w-xl max-h-[88dvh] overflow-y-auto rounded-2xl border border-sky-500/35 bg-card dark:bg-[#0E1526]/98 text-text-primary shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        data-testid="trainer_leave-quick-view-modal"
      >
        <span aria-hidden="true" className="pointer-events-none block h-[2px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-[#10B981]" />
        <div className="p-5 sm:p-6 border-b border-border dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/35 text-sky-500 flex items-center justify-center shrink-0">
              <Calendar size={22} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="trainer-leave-quick-view-title" className="text-section-title font-extrabold text-text-primary">
                  {getLeaveTypeLabel(leave.leaveType)}
                </h2>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(leave.status)}`}>
                  {getStatusLabel(leave.status)}
                </span>
              </div>
              <p className="text-xs text-secondary font-mono mt-0.5">
                {leave.id} · {t('TEXT_REQUESTED_ON')}: {TrainerScheduleFormatDate(leave.createdAt, locale)}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="min-w-10 min-h-10 rounded-xl border border-border bg-input text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-sm">
          <div className="rounded-xl border border-border bg-input/60 p-3.5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-secondary uppercase font-semibold">{t('TEXT_DATE_RANGE')}</p>
              <p className="mt-1 font-bold text-text-primary">
                {TrainerScheduleFormatDate(leave.startDate, locale)} {t('TEXT_TO')} {TrainerScheduleFormatDate(leave.endDate, locale)}
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-primary-subtle text-primary text-xs font-bold">
              {daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')}
            </span>
          </div>

          <div className="rounded-xl border border-border bg-input/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-1.5">
              <FileText size={14} className="text-sky-500" /> {t('TEXT_REASON')}
            </p>
            <p className="text-sm text-text-primary whitespace-pre-wrap">{leave.reason}</p>
          </div>

          <div className="rounded-xl border border-border bg-input/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-1.5">
              <MessageSquare size={14} className="text-amber-500" /> {t('TEXT_MANAGER_NOTES')}
            </p>
            <p className="text-sm text-secondary italic">{leave.managerNotes || t('TEXT_NO_MANAGER_NOTES')}</p>
          </div>

          {leave.rejectedReason && (
            <div className="rounded-xl border border-danger bg-danger-bg p-3.5 text-danger">
              <p className="text-xs font-semibold uppercase mb-1">Rejection Reason</p>
              <p className="font-semibold">{leave.rejectedReason}</p>
            </div>
          )}

          {leave.approvedBy && (
            <div className="rounded-xl border border-success bg-success-bg p-3.5 text-success">
              <p className="text-xs font-semibold uppercase mb-1">Approved By</p>
              <p className="font-semibold">{leave.approvedBy}</p>
            </div>
          )}

          {leave.attachmentUrl && (
            <a
              href={leave.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ExternalLink size={14} /> View Supporting Document
            </a>
          )}
        </div>

        <div className="p-4 sm:px-6 border-t border-border bg-header/60 flex justify-end">
          <button type="button" onClick={onClose} className="min-h-10 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
