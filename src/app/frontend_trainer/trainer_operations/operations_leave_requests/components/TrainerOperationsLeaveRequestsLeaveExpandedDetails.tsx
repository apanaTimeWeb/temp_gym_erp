"use client";

import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TrainerScheduleFormatDate } from '../utils/TrainerOperationsLeaveRequestsScheduleFormatDate';
import type { TrainerScheduleLeaveRequest } from '../types/TrainerOperationsLeaveRequestsScheduleTypes';

export interface TrainerOperationsLeaveRequestsLeaveExpandedDetailsProps {
  leave: TrainerScheduleLeaveRequest;
  locale: string;
  daysCount: number;
  statusBadgeClass: string;
  leaveTypeLabel: string;
  statusLabel: string;
  onClose: () => void;
}

export function TrainerOperationsLeaveRequestsLeaveExpandedDetails({
  leave,
  locale,
  daysCount,
  statusBadgeClass,
  leaveTypeLabel,
  statusLabel,
  onClose,
}: TrainerOperationsLeaveRequestsLeaveExpandedDetailsProps) {
  const t = useTranslations('TRAINER_SCHEDULE');

  return (
    <div
      id={`trainer-schedule-leave-details-${leave.id}`}
      className="p-5 border-l-4 border-l-primary bg-card/70 space-y-4 shadow-inner"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-primary">{leave.id}</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-input text-primary border border-border">
            {leaveTypeLabel}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClass}`}>
            {statusLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-xs text-secondary hover:text-primary p-1 rounded hover:bg-input"
        >
          {t('TEXT_COLLAPSE')}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
        <div className="p-3 rounded-xl bg-input/40 border border-border">
          <span className="font-semibold text-secondary uppercase block mb-1">
            {t('TEXT_DATE_RANGE')}
          </span>
          <p className="text-sm font-bold text-primary">
            {TrainerScheduleFormatDate(leave.startDate, locale)} {t('TEXT_TO')}{' '}
            {TrainerScheduleFormatDate(leave.endDate, locale)}
            <span className="text-secondary ml-1.5 font-normal text-xs">
              ({daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')})
            </span>
          </p>
        </div>
        <div className="p-3 rounded-xl bg-input/40 border border-border">
          <span className="font-semibold text-secondary uppercase block mb-1">
            {t('TEXT_REASON')}
          </span>
          <p className="text-sm text-primary font-medium">{leave.reason}</p>
        </div>
        <div className="p-3 rounded-xl bg-input/40 border border-border">
          <span className="font-semibold text-secondary uppercase block mb-1">
            {t('TEXT_MANAGER_NOTES')}
          </span>
          <p className="text-sm text-secondary italic">
            {leave.managerNotes || t('TEXT_NO_MANAGER_NOTES')}
          </p>
        </div>
        {leave.attachmentUrl && (
          <div className="p-3 rounded-xl bg-input/40 border border-border md:col-span-3">
            <span className="font-semibold text-secondary uppercase block mb-1">
              Supporting Document
            </span>
            <a
              href={leave.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ExternalLink size={14} /> View Supporting Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export const TrainerLeaveExpandedDetails = TrainerOperationsLeaveRequestsLeaveExpandedDetails;
export type TrainerLeaveExpandedDetailsProps = TrainerOperationsLeaveRequestsLeaveExpandedDetailsProps;
