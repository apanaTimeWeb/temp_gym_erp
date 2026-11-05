"use client";
import type { TrainerMembersTableProps } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
// RESPONSIBILITY: Renders the primary member dataset as an accessible desktop table and mobile card stack, with filtering, sorting, pagination, and contact actions.
import { ArrowDown, ArrowUp, ArrowUpDown, Mail, MessageCircle, Loader2 } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileTrainerInfrastructureConstants';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructurePagination';

import TrainerMembersEmptyState from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileEmptyState';

import { TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS, TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS, TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { TRAINER_MEMBERS_MEMBERS_STATUS_COLORS, TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersFilters } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters';

import { useTrainerMembersQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileQuery';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';

import { TrainerMembersMaskSensitiveData, TrainerMembersFormatDate, TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';

import type { TrainerMembersSortField } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';

/**
 * @description Renders the members browse surface with semantic desktop-table behavior and mobile card-stack behavior.
 * @dependencies URL-backed member filters → TanStack Query → member records → local navigation/contact state.
 * @edge-case Keeps sensitive phone data masked, preserves empty/loading behavior, and exposes all essential table fields on mobile.
 */
/**
 * @description Renders the members data table with module-owned status formatting, row actions, responsive behavior, and keyboard-accessible interactions.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves nullable-value fallbacks, keyboard access to row actions, and the documented mobile table strategy.
 */


export default function TrainerMembersTable({ onOpenMember }: TrainerMembersTableProps) {
  const t = useTranslations('TRAINER_MEMBERS');
  const locale = useLocale();
  const { search, debouncedSearch, statusFilter, progressStatusFilter, currentPage, setCurrentPage, sortBy, sortDirection, setSort } = useTrainerMembersFilters();
  const openMsg = useTrainerMembersStore((state) => state.openMsg);
  const { data, isPending } = useTrainerMembersQuery({
    page: currentPage,
    pageSize: TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE,
    search: debouncedSearch,
    status: statusFilter,
    progressStatus: progressStatusFilter,
  });

  const members = data?.members ?? [];
  const totalMembers = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalMembers / TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE));
  const isFiltered = Boolean(search || statusFilter !== 'All' || progressStatusFilter !== 'All');
  const openMemberProfile = (memberId: string) => onOpenMember(memberId);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      {isPending ? (
        <div className="flex items-center justify-center py-16 flex-1" aria-busy="true" data-testid="trainer_members-members-table_loading">
          <Loader2 className="motion-safe:animate-spin text-primary" strokeWidth={2} aria-label={t('TEXT_LOADING_MEMBER_STATISTICS')}  size={18}/>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-highlight"><tr data-testid="trainer_members-TrainerMembersTable-row-1">
                {TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS.map((header) => {
                  const fieldByHeader: Record<string, TrainerMembersSortField | null> = { ID: 'id', MEMBER: 'name', STATUS: 'status', EXPIRY: 'expiryDate', PROGRESS: 'progressStatus' };
                  const field = fieldByHeader[header] ?? null;
                  const active = field ? sortBy === field : false;
                  const SortIcon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                  return <th key={header} scope="col" className="text-start text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">
                    {field ? <button type="button" onClick={() => setSort(field)} className="min-w-11 min-h-11 inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_SORT_BY', { label: header })} data-testid={`trainer_members-members-table-sort-${header.toLowerCase().replace(/\s+/g, '_')}`}>{header}<SortIcon size={18} strokeWidth={2} className={active ? 'text-primary' : 'text-secondary'} aria-hidden="true" /></button> : header}
                  </th>;
                })}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {members.map((member) => {
                  const statusStyle = TRAINER_MEMBERS_MEMBERS_STATUS_COLORS[member.status] ?? { bg: 'bg-input', text: 'text-secondary' };
                  return <tr key={member.id} className="hover:bg-surface-highlight motion-safe:transition-colors" data-testid={`trainer_members-members-table-row-${member.id}`}>
                    <td className="px-5 py-3.5 text-sm text-secondary font-medium">#{member.id.split('-').pop()?.substring(0, 5) || member.id.substring(0, 5)}</td>
                    <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-primary-subtle text-primary" aria-hidden="true">{member.name.charAt(0)}</div><div className="min-w-0"><div className="flex items-center gap-1.5"><button type="button" onClick={() => openMemberProfile(member.id)} className="text-sm font-semibold text-primary truncate text-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" aria-label={t('TEXT_OPEN_MEMBER_PROFILE_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-profile-${member.id}`}>{member.name}</button>{member.isPT && <span className="text-xs font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-info-bg text-info border border-border" data-testid={`trainer_members-table-pt_state${member.id}`}>{t('TEXT_PT')}</span>}</div><p className="text-xs text-secondary">{TrainerMembersMaskSensitiveData(member.phone)}</p></div></div></td>
                    <td className="px-5 py-3.5 text-sm text-primary">{member.age == null ? '—' : TrainerMembersFormatNumber(member.age, locale)} / {displayValue(member.gender)}</td>
                    <td className="px-5 py-3.5"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`} data-testid={`trainer_members-members-table-status-${member.id}`}>{t(TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS[member.status] ?? 'TEXT_STATUS_UNKNOWN')}</span></td>
                    <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{TrainerMembersFormatDate(member.expiryDate, locale)}</td>
                    <td className="px-5 py-3.5 text-sm text-primary whitespace-nowrap">{displayValue(member.fitnessGoal)}</td>
                    <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{displayValue(member.lastWorkout)}</td>
                    <td className="px-5 py-3.5 text-sm whitespace-nowrap"><div className="flex gap-2" aria-label={`${t('TEXT_DIET_PLAN')}, ${t('TEXT_WORKOUT_PLAN')}`}><span className={`w-2 h-2 rounded-full ${member.assignedDietId ? 'bg-success-bg' : 'bg-input'}`} title={t('TEXT_DIET_PLAN')} data-testid={`trainer_members-table-diet_plan_indicator${member.id}`} /><span className={`w-2 h-2 rounded-full ${member.assignedWorkoutId ? 'bg-primary-subtle' : 'bg-input'}`} title={t('TEXT_WORKOUT_PLAN')} /></div></td>
                    <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{member.daysSinceLastCheckIn == null ? '—' : TrainerMembersFormatNumber(member.daysSinceLastCheckIn, locale)}</td>
                    <td className="px-5 py-3.5 text-sm whitespace-nowrap"><span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD ? 'bg-success-bg text-success' : member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning'}`} data-testid={`trainer_members-table-progress_state${member.id}`}>{t(member.progressStatus ? TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS[member.progressStatus] ?? 'TEXT_PROGRESS_UNKNOWN' : 'TEXT_PROGRESS_UNKNOWN')}</span></td>
                    <td className="px-5 py-3.5"><div className="flex items-center gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); openMsg({ name: member.name, phone: member.phone, email: member.email }, 'whatsapp', ''); }} className="min-w-11 min-h-11 p-1.5 rounded-lg bg-success text-on-success motion-safe:hover:brightness-110 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95" title={t('TEXT_WHATSAPP')} aria-label={t('TEXT_MESSAGE_WHATSAPP_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-whatsapp-${member.id}`}><MessageCircle size={18} strokeWidth={2} aria-hidden="true" /></button><button type="button" onClick={(event) => { event.stopPropagation(); openMsg({ name: member.name, phone: member.phone, email: member.email }, 'email', ''); }} className="min-w-11 min-h-11 p-1.5 rounded-lg bg-info text-on-info motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95" title={t('TEXT_EMAIL')} aria-label={t('TEXT_EMAIL_MEMBER_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-email-${member.id}`}><Mail size={18} strokeWidth={2} aria-hidden="true" /></button></div></td>
                  </tr>;
                })}
                {members.length === 0 && <tr data-testid="trainer_members-TrainerMembersTable-row-2"><td colSpan={TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS.length} className="p-0 border-b-0"><TrainerMembersEmptyState isFiltered={isFiltered} /></td></tr>}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3 p-3">
            {members.length === 0 ? <TrainerMembersEmptyState isFiltered={isFiltered} /> : members.map((member) => {
              const statusStyle = TRAINER_MEMBERS_MEMBERS_STATUS_COLORS[member.status] ?? { bg: 'bg-input', text: 'text-secondary' };
              const progressStyle = member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD ? 'bg-success-bg text-success' : member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning';
              return <article key={member.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer_members-members-table_card${member.id}`}>
                <button type="button" onClick={() => openMemberProfile(member.id)} className="w-full text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_MEMBER_ID') + ': ' + member.id} data-testid={`trainer_members-members-table-open-${member.id}`}>
                  <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3 min-w-0"><div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-primary-subtle text-primary shrink-0" aria-hidden="true">{member.name.charAt(0)}</div><div className="min-w-0"><div className="flex items-center gap-1.5"><h3 className="font-semibold text-primary truncate">{member.name}</h3>{member.isPT && <span className="text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-info-bg text-info border border-border" data-testid={`trainer_members-table-pt_state${member.id}`}>{t('TEXT_PT')}</span>}</div><p className="text-xs text-secondary">{TrainerMembersMaskSensitiveData(member.phone)}</p></div></div><span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`} data-testid={`trainer_members-members-table-mobile-status-${member.id}`}>{t(TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS[member.status] ?? 'TEXT_STATUS_UNKNOWN')}</span></div>
                  <div className="mt-4 space-y-3 text-sm"><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MEMBER_ID')}</span><span className="text-primary">#{member.id}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_AGE')} / {t('TEXT_GENDER')}</span><span className="text-primary">{member.age == null ? '—' : TrainerMembersFormatNumber(member.age, locale)} / {displayValue(member.gender)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_EXPIRY_DATE')}</span><span className="text-primary">{TrainerMembersFormatDate(member.expiryDate, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_FITNESS_GOAL')}</span><span className="text-primary">{displayValue(member.fitnessGoal)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_WORKOUT_HISTORY')}</span><span className="text-primary">{displayValue(member.lastWorkout)}</span></p><div><span className="block text-xs font-semibold text-secondary uppercase mb-1">{t('TEXT_MEMBER_ACTIONS')}</span><div className="flex flex-wrap gap-2"><span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${member.assignedDietId ? 'bg-success-bg text-success' : 'bg-input text-secondary'}`} data-testid={`trainer_members-table-diet_plan_state${member.id}`}>{t('TEXT_DIET_PLAN')}</span><span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${member.assignedWorkoutId ? 'bg-success-bg text-success' : 'bg-input text-secondary'}`} data-testid={`trainer_members-table-workout_plan_state${member.id}`}>{t('TEXT_WORKOUT_PLAN')}</span></div></div><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DAYS_SINCE_LAST_CHECK_IN')}</span><span className="text-primary">{member.daysSinceLastCheckIn == null ? '—' : TrainerMembersFormatNumber(member.daysSinceLastCheckIn, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_PROGRESS_STATUS')}</span><span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${progressStyle}`}>{t(member.progressStatus ? TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS[member.progressStatus] ?? 'TEXT_PROGRESS_UNKNOWN' : 'TEXT_PROGRESS_UNKNOWN')}</span></p></div>
                </button>
                <div className="mt-4 pt-3 border-t border-border flex gap-2"><button type="button" onClick={() => openMsg({ name: member.name, phone: member.phone, email: member.email }, 'whatsapp', '')} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-success text-on-success font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_MESSAGE_WHATSAPP_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-mobile-whatsapp-${member.id}`}><MessageCircle size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_SEND_WHATSAPP')}</button><button type="button" onClick={() => openMsg({ name: member.name, phone: member.phone, email: member.email }, 'email', '')} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-info text-on-info font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_EMAIL_MEMBER_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-mobile-email-${member.id}`}><Mail size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_SEND_EMAIL')}</button></div>
              </article>;
            })}
          </div>

          <TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalMembers} itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE} onPageChange={setCurrentPage}/>
        </>
      )}
    </div>
  );
}


export type { TrainerMembersTableProps } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
