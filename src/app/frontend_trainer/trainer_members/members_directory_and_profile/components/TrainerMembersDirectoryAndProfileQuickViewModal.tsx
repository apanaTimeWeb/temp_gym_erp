"use client";
// RESPONSIBILITY: Centered obsidian quick-view modal showing complete member profile, metrics, plan assignments, and actions.
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  Calendar,
  Dumbbell,
  ExternalLink,
  HeartPulse,
  Mail,
  MapPin,
  MessageCircle,
  NotebookPen,
  Timer,
  TrendingUp,
  User,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import {
  TRAINER_MEMBERS_BILLING_CYCLE_LABEL_KEYS,
  TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS,
  TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS,
  TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS,
  TRAINER_MEMBERS_MEMBERS_STATUS_COLORS,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';
import {
  TrainerMembersFormatDate,
  TrainerMembersFormatNumber,
  TrainerMembersMaskSensitiveData,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';
import type { TrainerMembersMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';

function getMembershipExpiryAlert(expiryDate?: string): { label: string; isExpired: boolean } | null {
  if (!expiryDate) return null;
  const parsed = Date.parse(expiryDate);
  if (Number.isNaN(parsed)) return null;
  const diffDays = Math.ceil((parsed - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return { label: 'Membership Expired', isExpired: true };
  if (diffDays <= 7) return { label: `Expires in ${diffDays}d`, isExpired: false };
  return null;
}

export interface TrainerMembersQuickViewModalProps {
  member: TrainerMembersMember | null;
  onClose: () => void;
  onOpenFullProfile: (memberId: string) => void;
  onMessage: (member: TrainerMembersMember, channel: 'whatsapp' | 'email') => void;
}

export default function TrainerMembersDirectoryAndProfileQuickViewModal({
  member,
  onClose,
  onOpenFullProfile,
  onMessage,
}: TrainerMembersQuickViewModalProps) {
  const t = useTranslations('TRAINER_MEMBERS');
  const locale = useLocale();

  useEffect(() => {
    if (!member) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [member, onClose]);

  if (!member || typeof document === 'undefined') return null;

  const statusStyle = TRAINER_MEMBERS_MEMBERS_STATUS_COLORS[member.status] ?? {
    bg: 'bg-input',
    text: 'text-secondary',
  };
  const progressClass =
    member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD
      ? 'border-emerald-500/35 bg-success-bg text-success-text'
      : member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION
        ? 'border-rose-500/35 bg-danger-bg text-danger-text'
        : 'border-amber-500/35 bg-warning-bg text-warning-text';

  const hasMedicalAlert =
    Boolean(member.medicalRestrictions) &&
    member.medicalRestrictions!.toLowerCase() !== 'none' &&
    !member.medicalRestrictions!.toLowerCase().includes('none reported');
  const expiryAlert = getMembershipExpiryAlert(member.expiryDate);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-member-quick-view-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      data-testid="trainer_members-quick-view-overlay"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[88dvh] overflow-y-auto rounded-2xl border border-sky-500/35 bg-white dark:bg-[#0F172A] text-text-primary shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        data-testid="trainer_members-quick-view-modal"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none block h-[2px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#38BDF8] to-[#10B981]"
        />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border dark:border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-xl font-extrabold shrink-0 shadow-[0_4px_16px_rgba(255,90,31,0.4)]"
              aria-hidden="true"
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="trainer-member-quick-view-title"
                  className="text-section-title font-extrabold text-text-primary truncate"
                >
                  {member.name}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-input dark:bg-white/[0.06] border border-border dark:border-white/10 text-xs font-mono text-secondary">
                  #{member.membershipNumber ?? member.id}
                </span>
                {member.isPT && (
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/35 text-[11px] font-bold uppercase">
                    {t('TEXT_PT')}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-secondary mt-1 truncate">
                {member.email} · {TrainerMembersMaskSensitiveData(member.phone)}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-current/25 ${statusStyle.bg} ${statusStyle.text}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                  {t(TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS[member.status] ?? 'TEXT_STATUS_UNKNOWN')}
                </span>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${progressClass}`}>
                  {t(
                    member.progressStatus
                      ? TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS[member.progressStatus] ?? 'TEXT_PROGRESS_UNKNOWN'
                      : 'TEXT_PROGRESS_UNKNOWN'
                  )}
                </span>
                {expiryAlert && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      expiryAlert.isExpired
                        ? 'border-rose-500/40 bg-rose-500/15 text-rose-600 dark:text-rose-300'
                        : 'border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300'
                    }`}
                    data-testid="trainer_members-quick-view-expiry-alert"
                  >
                    <AlertTriangle size={12} aria-hidden="true" />
                    {expiryAlert.label}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close member details"
            data-testid="trainer_members-quick-view-close"
            className="min-w-10 min-h-10 rounded-xl border border-border dark:border-white/15 bg-input dark:bg-white/[0.05] text-secondary hover:text-text-primary hover:border-orange-500/40 inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {hasMedicalAlert && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/15 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-rose-600 dark:text-rose-300">
              <AlertTriangle size={18} className="shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" aria-hidden="true" />
              <div>
                <p className="font-bold uppercase tracking-wide text-[11px]">Medical Restrictions Alert</p>
                <p className="mt-0.5 text-text-primary">{member.medicalRestrictions}</p>
              </div>
            </div>
          )}

          {/* Physical & Fitness Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400 flex items-center gap-1.5 mb-2.5">
              <Activity size={14} aria-hidden="true" />
              <span>Physical &amp; Training Metrics</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  label: `${t('TEXT_AGE')} / ${t('TEXT_GENDER')}`,
                  value: `${member.age == null ? '—' : TrainerMembersFormatNumber(member.age, locale)} / ${displayValue(member.gender)}`,
                },
                {
                  label: `${t('TEXT_HEIGHT')} / ${t('TEXT_WEIGHT')}`,
                  value: `${member.heightCm == null ? '—' : `${TrainerMembersFormatNumber(member.heightCm, locale)} cm`} / ${member.weightKg == null ? '—' : `${TrainerMembersFormatNumber(member.weightKg, locale)} kg`}`,
                },
                {
                  label: t('TEXT_FITNESS_GOAL'),
                  value: displayValue(member.fitnessGoal),
                },
                {
                  label: t('TEXT_WORKOUT_HISTORY'),
                  value: displayValue(member.lastWorkout),
                },
                {
                  label: t('TEXT_DAYS_SINCE_LAST_CHECK_IN'),
                  value: member.daysSinceLastCheckIn == null ? '—' : TrainerMembersFormatNumber(member.daysSinceLastCheckIn, locale),
                },
                {
                  label: 'BMI / Level',
                  value: `${member.bmi == null ? '—' : member.bmi} · ${displayValue(member.fitnessLevel)}`,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border dark:border-white/10 bg-input dark:bg-[#121B30] p-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary truncate">{stat.label}</p>
                  <p className="text-sm font-semibold text-text-primary mt-1 truncate">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Membership & Assigned Plans */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
              <Calendar size={14} aria-hidden="true" />
              <span>Membership &amp; Assigned Programs</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-border dark:border-white/10 bg-input dark:bg-[#121B30] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">Branch</p>
                <p className="text-sm font-semibold text-text-primary mt-1 flex items-center gap-1 truncate">
                  <MapPin size={13} className="text-orange-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">{displayValue(member.branch)}</span>
                </p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-input dark:bg-[#121B30] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">Plan &amp; Billing</p>
                <p className="text-sm font-semibold text-text-primary mt-1 truncate">
                  {displayValue(member.plan?.name)} · {t(TRAINER_MEMBERS_BILLING_CYCLE_LABEL_KEYS[member.billingCycle] ?? 'TEXT_UNKNOWN')}
                </p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-input dark:bg-[#121B30] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  {t('TEXT_JOIN_DATE')} / {t('TEXT_EXPIRY_DATE')}
                </p>
                <p className="text-xs font-semibold text-text-primary mt-1 tabular-nums">
                  {TrainerMembersFormatDate(member.joinDate, locale)} → {TrainerMembersFormatDate(member.expiryDate, locale)}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                  <UtensilsCrossed size={12} aria-hidden="true" />
                  <span>{t('TEXT_DIET_PLAN')}</span>
                </p>
                <p className="text-sm font-semibold text-text-primary mt-1 truncate">
                  {member.assignedDiet?.name ?? (member.assignedDietId ? `Plan #${member.assignedDietId}` : 'Not Assigned')}
                </p>
              </div>
              <div className="rounded-xl border border-orange-500/25 bg-orange-500/10 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300 flex items-center gap-1">
                  <Dumbbell size={12} aria-hidden="true" />
                  <span>{t('TEXT_WORKOUT_PLAN')}</span>
                </p>
                <p className="text-sm font-semibold text-text-primary mt-1 truncate">
                  {member.assignedWorkout?.name ?? (member.assignedWorkoutId ? `Plan #${member.assignedWorkoutId}` : 'Not Assigned')}
                </p>
              </div>
              <div className="rounded-xl border border-border dark:border-white/10 bg-input dark:bg-[#121B30] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary flex items-center gap-1">
                  <HeartPulse size={12} className="text-rose-400" aria-hidden="true" />
                  <span>Emergency / Blood</span>
                </p>
                <p className="text-sm font-semibold text-text-primary mt-1 truncate">
                  {displayValue(member.bloodGroup)} · {displayValue(member.emergencyContact)}
                </p>
              </div>
            </div>
            {member.address && (
              <div className="mt-3 rounded-xl border border-border dark:border-white/10 bg-input dark:bg-[#121B30] p-3 flex items-center gap-2 text-xs text-secondary">
                <User size={13} className="text-sky-400 shrink-0" aria-hidden="true" />
                <span className="font-semibold text-text-primary">{t('TEXT_ADDRESS')}:</span>
                <span className="truncate">{member.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-border dark:border-white/10 bg-slate-50/70 dark:bg-[#0B111E] space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/frontend_trainer/trainer_coaching/coaching_individual_progress?memberId=${encodeURIComponent(member.id)}`}
              onClick={onClose}
              className="min-h-9 inline-flex items-center gap-1.5 rounded-xl border border-purple-500/35 bg-purple-500/10 hover:bg-purple-500/20 px-3 text-xs font-semibold text-purple-600 dark:text-purple-300 transition-colors"
              data-testid="trainer_members-quick-view-log-progress"
            >
              <TrendingUp size={14} aria-hidden="true" />
              <span>Log Progress</span>
            </Link>
            <Link
              href={`/frontend_trainer/trainer_members/members_trainer_notes?memberId=${encodeURIComponent(member.id)}`}
              onClick={onClose}
              className="min-h-9 inline-flex items-center gap-1.5 rounded-xl border border-teal-500/35 bg-teal-500/10 hover:bg-teal-500/20 px-3 text-xs font-semibold text-teal-600 dark:text-teal-300 transition-colors"
              data-testid="trainer_members-quick-view-notes"
            >
              <NotebookPen size={14} aria-hidden="true" />
              <span>Notes</span>
            </Link>
            <Link
              href="/frontend_trainer/trainer_coaching/coaching_sessions"
              onClick={onClose}
              className="min-h-9 inline-flex items-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/10 hover:bg-sky-500/20 px-3 text-xs font-semibold text-sky-600 dark:text-sky-300 transition-colors"
              data-testid="trainer_members-quick-view-sessions"
            >
              <Timer size={14} aria-hidden="true" />
              <span>Schedule Session</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onMessage(member, 'whatsapp')}
              className="min-h-10 inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/15 hover:bg-emerald-500 hover:text-white px-3.5 text-xs font-semibold text-emerald-600 dark:text-emerald-300 transition-colors cursor-pointer"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>{t('TEXT_WHATSAPP')}</span>
            </button>
            <button
              type="button"
              onClick={() => onMessage(member, 'email')}
              className="min-h-10 inline-flex items-center gap-1.5 rounded-xl border border-purple-500/35 bg-purple-500/15 hover:bg-purple-500 hover:text-white px-3.5 text-xs font-semibold text-purple-600 dark:text-purple-300 transition-colors cursor-pointer"
            >
              <Mail size={15} aria-hidden="true" />
              <span>{t('TEXT_EMAIL')}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-10 rounded-xl border border-border dark:border-white/15 px-4 text-xs font-semibold text-secondary hover:text-text-primary hover:bg-input transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFullProfile(member.id);
              }}
              data-testid="trainer_members-quick-view-open-full-profile"
              className="min-h-10 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] px-4 text-xs font-bold text-white hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.35)] transition-all cursor-pointer"
            >
              <span>Full Profile</span>
              <ExternalLink size={14} aria-hidden="true" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
