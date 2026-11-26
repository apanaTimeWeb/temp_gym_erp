"use client";

import { useLocale, useTranslations } from 'next-intl';
import { TrainerScheduleFormatDate } from '../utils/TrainerOperationsLeaveRequestsScheduleFormatDate';
import type { TrainerScheduleLeaveRequest } from '../types/TrainerOperationsLeaveRequestsScheduleTypes';

export interface TrainerOperationsLeaveRequestsLeaveMobileCardProps {
  leave: TrainerScheduleLeaveRequest;
  statusBadgeClass: string;
  statusLabel: string;
  leaveTypeLabel: string;
  daysCount: number;
}

export function TrainerOperationsLeaveRequestsLeaveMobileCard({
  leave,
  statusBadgeClass,
  statusLabel,
  leaveTypeLabel,
  daysCount,
}: TrainerOperationsLeaveRequestsLeaveMobileCardProps) {
  const t = useTranslations('TRAINER_SCHEDULE');
  const locale = useLocale();

  return (
    <article
      className="bg-card rounded-xl border border-border p-4 shadow-card space-y-3"
      data-testid={`trainer_schedule-leave-requests_card${leave.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-primary truncate">{leave.id}</h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-input text-primary border border-border">
              {leaveTypeLabel}
            </span>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            {t('TEXT_REQUESTED_ON')}: {TrainerScheduleFormatDate(leave.createdAt, locale)}
          </p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`}
          data-testid={`trainer_schedule-leave-requests-status-state-mobile-${leave.id}`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="space-y-2 text-sm pt-1 border-t border-border">
        <div>
          <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DATE_RANGE')}</span>
          <span className="text-primary font-medium">
            {TrainerScheduleFormatDate(leave.startDate, locale)}{' '}
            <span className="text-secondary">{t('TEXT_TO')}</span>{' '}
            {TrainerScheduleFormatDate(leave.endDate, locale)}
            <span className="text-secondary ml-1 text-xs font-normal">
              ({daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')})
            </span>
          </span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_REASON')}</span>
          <span className="text-primary">{leave.reason}</span>
        </div>
        {leave.managerNotes && (
          <div>
            <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MANAGER_NOTES')}</span>
            <span className="text-secondary italic text-xs">{leave.managerNotes}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export const TrainerLeaveMobileCard = TrainerOperationsLeaveRequestsLeaveMobileCard;
export type TrainerLeaveMobileCardProps = TrainerOperationsLeaveRequestsLeaveMobileCardProps;
