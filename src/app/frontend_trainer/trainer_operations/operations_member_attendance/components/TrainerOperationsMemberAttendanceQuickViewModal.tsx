"use client";
// RESPONSIBILITY: Centered quick-view modal showing complete attendance check-in/out metadata, method, session, and notes.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, Clock, FileText, LogOut, ShieldCheck, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import {
  TrainerAttendanceFormatDate,
  TrainerAttendanceFormatNumber,
  TrainerAttendanceFormatTime,
} from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';
import { TRAINER_ATTENDANCE_RECORD_TYPE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

export interface TrainerOperationsMemberAttendanceQuickViewModalProps {
  record: TrainerAttendanceRecord | null;
  onClose: () => void;
  onCheckOut?: (recordId: string) => void | Promise<void>;
}

export default function TrainerOperationsMemberAttendanceQuickViewModal({
  record,
  onClose,
  onCheckOut,
}: TrainerOperationsMemberAttendanceQuickViewModalProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const locale = useLocale();

  useEffect(() => {
    if (!record) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [record, onClose]);

  if (!record || typeof document === 'undefined') return null;

  const personName = record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER
    ? (record.member?.name ?? '—')
    : (record.staff?.name ?? '—');

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-member-attendance-quick-view-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      data-testid="trainer_attendance-quick-view-overlay"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />
      <div
        className="relative z-10 w-full max-w-lg max-h-[88dvh] overflow-y-auto rounded-2xl border border-sky-500/35 bg-card dark:bg-[#0E1526]/98 text-text-primary shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        data-testid="trainer_attendance-quick-view-modal"
      >
        <span aria-hidden="true" className="pointer-events-none block h-[2px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-[#10B981]" />
        <div className="p-5 sm:p-6 border-b border-border dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-primary-subtle border border-border text-primary flex items-center justify-center font-extrabold text-lg shrink-0">
              {personName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="trainer-member-attendance-quick-view-title" className="text-section-title font-extrabold text-text-primary truncate">
                  {personName}
                </h2>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? 'bg-info-bg text-info' : 'bg-success-bg text-success'}`}>
                  {record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER ? t('TEXT_MEMBER') : t('TEXT_STAFF')}
                </span>
              </div>
              <p className="text-xs text-secondary font-mono mt-0.5">{t('TEXT_RECORD_ID')} #{record.id}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="min-w-10 min-h-10 rounded-xl border border-border bg-input text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase flex items-center gap-1.5"><Calendar size={13} className="text-sky-500" /> {t('TEXT_DATE')}</p>
              <p className="mt-1 font-bold text-text-primary">{TrainerAttendanceFormatDate(record.date, locale)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-500" /> {t('TEXT_CHECK_IN_METHOD')}</p>
              <p className="mt-1 font-bold text-text-primary">{displayValue(record.checkInMethod)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase flex items-center gap-1.5"><Clock size={13} className="text-sky-500" /> {t('TEXT_CHECK_IN_TIME')}</p>
              <p className="mt-1 font-semibold text-text-primary">{TrainerAttendanceFormatTime(record.checkIn, locale)}</p>
            </div>
            <div className="rounded-xl border border-border bg-input/60 p-3">
              <p className="text-xs text-secondary uppercase flex items-center gap-1.5"><Clock size={13} className="text-amber-500" /> {t('TEXT_CHECK_OUT_TIME')}</p>
              <p className="mt-1 font-semibold text-text-primary">{TrainerAttendanceFormatTime(record.checkOut, locale)}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-input/60 p-3.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-secondary">Duration {record.sessionType ? `· ${record.sessionType}` : ''}</span>
            <span className="font-bold text-text-primary">
              {record.durationMinutes == null ? '—' : `${TrainerAttendanceFormatNumber(record.durationMinutes, locale)} ${t('TEXT_MINUTES_SHORT')}`}
            </span>
          </div>

          <div className="rounded-xl border border-border bg-input/60 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-1.5">
              <FileText size={14} className="text-amber-500" /> {t('TEXT_NOTES_9C3BEF')}
            </p>
            <p className="text-sm text-text-primary whitespace-pre-wrap">{displayValue(record.notes)}</p>
          </div>
        </div>

        <div className="p-4 sm:px-6 border-t border-border bg-header/60 flex items-center justify-end gap-2.5">
          {!record.checkOut && onCheckOut && record.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER && (
            <button
              type="button"
              onClick={() => {
                onClose();
                void onCheckOut(record.id);
              }}
              className="min-h-10 inline-flex items-center gap-1.5 px-4 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/35 text-xs font-semibold hover:bg-amber-500/30 cursor-pointer"
            >
              <LogOut size={14} /> {t('TEXT_CHECK_OUT')}
            </button>
          )}
          <button type="button" onClick={onClose} className="min-h-10 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
