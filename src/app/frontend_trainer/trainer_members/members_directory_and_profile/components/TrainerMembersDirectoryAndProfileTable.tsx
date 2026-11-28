"use client";
import type { TrainerMembersTableProps } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
// RESPONSIBILITY: Renders the compact member directory table with important fields plus a quick-view Eye modal for full member details.
import { useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Mail, MessageCircle, Loader2, AlertTriangle } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import { displayValue } from '@/lib/display_value';
import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileTrainerInfrastructureConstants';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructurePagination';

import TrainerMembersEmptyState from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileEmptyState';
import TrainerMembersQuickViewModal from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileQuickViewModal';

import { TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS, TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS, TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { TRAINER_MEMBERS_MEMBERS_STATUS_COLORS, TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersFilters } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters';

import { useTrainerMembersQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileQuery';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';

import { TrainerMembersMaskSensitiveData, TrainerMembersFormatDate } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';

import type { TrainerMembersMember, TrainerMembersSortField } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';

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
  const [quickViewMember, setQuickViewMember] = useState<TrainerMembersMember | null>(null);
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

  const TABLE_COLUMN_COUNT = TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS.length;
  const avatarPalette = [
    'from-[#FF5A1F] to-[#EC4899]',
    'from-[#38BDF8] to-[#6366F1]',
    'from-[#10B981] to-[#14B8A6]',
    'from-[#A855F7] to-[#EC4899]',
    'from-[#F59E0B] to-[#FF5A1F]',
  ];

  return (
    <div className="relative bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] rounded-2xl shadow-card border border-border dark:border-emerald-500/30 overflow-hidden flex flex-col h-full min-h-96">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#FF5A1F] z-30" />
      {isPending ? (
        <div className="flex items-center justify-center py-16 flex-1" aria-busy="true" data-testid="trainer_members-members-table_loading">
          <Loader2 className="motion-safe:animate-spin text-orange-500" strokeWidth={2.2} aria-label={t('TEXT_LOADING_MEMBER_STATISTICS')} size={24}/>
        </div>
      ) : (
        <>
          <div className="hidden md:block max-h-[640px] overflow-auto">
            <table className="w-full text-start border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.22)]">
                <tr className="border-b border-border dark:border-white/10" data-testid="trainer_members-TrainerMembersTable-row-1">
                  {TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS.map((header, index) => {
                    const fieldByHeader: Record<string, TrainerMembersSortField | null> = { ID: 'id', MEMBER: 'name', STATUS: 'status', EXPIRY: 'expiryDate', PROGRESS: 'progressStatus' };
                    const field = fieldByHeader[header] ?? null;
                    const active = field ? sortBy === field : false;
                    const SortIcon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                    return (
                      <th
                        key={header}
                        scope="col"
                        className={`text-start text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider px-4 py-3.5 whitespace-nowrap align-middle ${
                          index === 0 ? 'sticky start-0 z-30 bg-slate-100 dark:bg-[#152038] border-e border-border dark:border-white/10 shadow-[2px_0_8px_rgba(0,0,0,0.18)]' : ''
                        }`}
                      >
                        {field ? (
                          <button
                            type="button"
                            onClick={() => setSort(field)}
                            className="min-h-9 inline-flex items-center gap-1.5 rounded hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base cursor-pointer"
                            aria-label={t('TEXT_SORT_BY', { label: header })}
                            data-testid={`trainer_members-members-table-sort-${header.toLowerCase().replace(/\s+/g, '_')}`}
                          >
                            <span>{header}</span>
                            <SortIcon size={14} strokeWidth={2.2} className={active ? 'text-[#FF5A1F]' : 'text-slate-400/70'} aria-hidden="true" />
                          </button>
                        ) : (
                          header
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-white/[0.07]">
                {members.map((member, rowIdx) => {
                  const statusStyle = TRAINER_MEMBERS_MEMBERS_STATUS_COLORS[member.status] ?? { bg: 'bg-input', text: 'text-secondary' };
                  const avatarGradient = avatarPalette[rowIdx % avatarPalette.length];
                  return (
                    <tr
                      key={member.id}
                      className="bg-card dark:bg-[#0F172A] hover:bg-orange-50/70 dark:hover:bg-[#18243E] transition-colors group"
                      data-testid={`trainer_members-members-table-row-${member.id}`}
                    >
                      <td className="sticky start-0 z-10 bg-card dark:bg-[#0F172A] group-hover:bg-orange-50 dark:group-hover:bg-[#18243E] border-e border-border dark:border-white/10 px-4 py-3.5 text-xs text-secondary font-semibold tabular-nums whitespace-nowrap align-middle transition-colors shadow-[2px_0_8px_rgba(0,0,0,0.12)]">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-input dark:bg-white/[0.06] border border-border dark:border-white/10 text-text-primary font-mono text-[11px]">
                            #{member.id.split('-').pop()?.substring(0, 5) || member.id.substring(0, 5)}
                          </span>
                          <CopyButton value={member.id} />
                        </div>
                      </td>
                      <td className="px-4 py-3.5 align-middle min-w-[220px]">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm`} aria-hidden="true">
                            {member.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => openMemberProfile(member.id)}
                                className="text-sm font-semibold text-text-primary hover:text-[#FF5A1F] hover:underline truncate text-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                                aria-label={t('TEXT_OPEN_MEMBER_PROFILE_ARIA', { name: member.name })}
                                data-testid={`trainer_members-members-table-profile-${member.id}`}
                              >
                                {member.name}
                              </button>
                              {member.isPT && (
                                <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/35" data-testid={`trainer_members-table-pt_state${member.id}`}>
                                  {t('TEXT_PT')}
                                </span>
                              )}
                              {member.medicalRestrictions && member.medicalRestrictions.toLowerCase() !== 'none' && !member.medicalRestrictions.toLowerCase().includes('none reported') && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/40" title={member.medicalRestrictions} data-testid={`trainer_members-table-medical-alert-${member.id}`}>
                                  <AlertTriangle size={11} />Medical Alert
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-secondary tabular-nums mt-0.5">{TrainerMembersMaskSensitiveData(member.phone)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-text-primary font-medium whitespace-nowrap align-middle">{displayValue(member.fitnessGoal)}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap align-middle"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-current/25 ${statusStyle.bg} ${statusStyle.text}`} data-testid={`trainer_members-members-table-status-${member.id}`}><span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{t(TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS[member.status] ?? 'TEXT_STATUS_UNKNOWN')}</span></td>
                      <td className="px-4 py-3.5 text-sm text-secondary whitespace-nowrap align-middle tabular-nums">{TrainerMembersFormatDate(member.expiryDate, locale)}</td>
                      <td className="px-4 py-3.5 text-sm whitespace-nowrap align-middle"><span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border border-current/25 ${member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD ? 'bg-success-bg text-success-text' : member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION ? 'bg-danger-bg text-danger-text' : 'bg-warning-bg text-warning-text'}`} data-testid={`trainer_members-table-progress_state${member.id}`}>{t(member.progressStatus ? TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS[member.progressStatus] ?? 'TEXT_PROGRESS_UNKNOWN' : 'TEXT_PROGRESS_UNKNOWN')}</span></td>
                      <td className="px-4 py-3.5 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-1.5">
                          <button type="button" onClick={(event) => { event.stopPropagation(); setQuickViewMember(member); }} className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/35 hover:bg-sky-500 hover:text-white motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" title="View full details" aria-label={`View details for ${member.name}`} data-testid={`trainer_members-members-table-view-${member.id}`}><Eye size={16} strokeWidth={2.2} aria-hidden="true" /></button>
                          <button type="button" onClick={(event) => { event.stopPropagation(); openMsg({ name: member.name, phone: member.phone, email: member.email }, 'whatsapp', ''); }} className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/35 hover:bg-emerald-500 hover:text-white motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" title={t('TEXT_WHATSAPP')} aria-label={t('TEXT_MESSAGE_WHATSAPP_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-whatsapp-${member.id}`}><MessageCircle size={16} strokeWidth={2} aria-hidden="true" /></button>
                          <button type="button" onClick={(event) => { event.stopPropagation(); openMsg({ name: member.name, phone: member.phone, email: member.email }, 'email', ''); }} className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/35 hover:bg-purple-500 hover:text-white motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" title={t('TEXT_EMAIL')} aria-label={t('TEXT_EMAIL_MEMBER_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-email-${member.id}`}><Mail size={16} strokeWidth={2} aria-hidden="true" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {members.length === 0 && (
                  <tr data-testid="trainer_members-TrainerMembersTable-row-2">
                    <td colSpan={TABLE_COLUMN_COUNT} className="p-0 border-b-0">
                      <TrainerMembersEmptyState isFiltered={isFiltered} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3 p-3">
            {members.length === 0 ? <TrainerMembersEmptyState isFiltered={isFiltered} /> : members.map((member, rowIdx) => {
              const statusStyle = TRAINER_MEMBERS_MEMBERS_STATUS_COLORS[member.status] ?? { bg: 'bg-input', text: 'text-secondary' };
              const progressStyle = member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD ? 'bg-success-bg text-success-text border-emerald-500/30' : member.progressStatus === TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION ? 'bg-danger-bg text-danger-text border-rose-500/30' : 'bg-warning-bg text-warning-text border-amber-500/30';
              const avatarGradient = avatarPalette[rowIdx % avatarPalette.length];
              return <article key={member.id} className="bg-card dark:bg-gradient-to-br dark:from-[#162038] dark:to-[#0E1525] rounded-2xl border border-border dark:border-white/15 p-4 shadow-card" data-testid={`trainer_members-members-table_card${member.id}`}>
                <button type="button" onClick={() => openMemberProfile(member.id)} className="w-full text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg motion-safe:transition-all motion-safe:duration-base" aria-label={t('TEXT_MEMBER_ID') + ': ' + member.id} data-testid={`trainer_members-members-table-open-${member.id}`}>
                  <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3 min-w-0"><div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center font-bold text-sm text-white shrink-0`} aria-hidden="true">{member.name.charAt(0)}</div><div className="min-w-0"><div className="flex items-center gap-1.5 flex-wrap"><h3 className="font-semibold text-text-primary truncate">{member.name}</h3>{member.isPT && <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/35" data-testid={`trainer_members-table-pt_state${member.id}`}>{t('TEXT_PT')}</span>}{member.medicalRestrictions && member.medicalRestrictions.toLowerCase() !== 'none' && !member.medicalRestrictions.toLowerCase().includes('none reported') && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/40" title={member.medicalRestrictions}><AlertTriangle size={11} />Medical Alert</span>}</div><p className="text-xs text-secondary tabular-nums">{TrainerMembersMaskSensitiveData(member.phone)}</p></div></div><span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border border-current/25 ${statusStyle.bg} ${statusStyle.text}`} data-testid={`trainer_members-members-table-mobile-status-${member.id}`}>{t(TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS[member.status] ?? 'TEXT_STATUS_UNKNOWN')}</span></div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm pt-3 border-t border-border/60"><p><span className="block text-[11px] font-semibold text-secondary uppercase">{t('TEXT_MEMBER_ID')}</span><span className="text-text-primary font-mono text-xs">#{member.id}</span></p><p><span className="block text-[11px] font-semibold text-secondary uppercase">{t('TEXT_EXPIRY_DATE')}</span><span className="text-text-primary tabular-nums">{TrainerMembersFormatDate(member.expiryDate, locale)}</span></p><p><span className="block text-[11px] font-semibold text-secondary uppercase">{t('TEXT_FITNESS_GOAL')}</span><span className="text-text-primary">{displayValue(member.fitnessGoal)}</span></p><div><span className="block text-[11px] font-semibold text-secondary uppercase mb-1">{t('TEXT_PROGRESS_STATUS')}</span><span className={`inline-flex px-2.5 py-0.5 rounded-md border text-xs font-semibold ${progressStyle}`}>{t(member.progressStatus ? TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS[member.progressStatus] ?? 'TEXT_PROGRESS_UNKNOWN' : 'TEXT_PROGRESS_UNKNOWN')}</span></div></div>
                </button>
                <div className="mt-4 pt-3 border-t border-border/70 flex gap-2"><button type="button" onClick={() => setQuickViewMember(member)} className="min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white px-3.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base" aria-label={`View details for ${member.name}`} data-testid={`trainer_members-members-table-mobile-view-${member.id}`}><Eye size={16} strokeWidth={2.2} aria-hidden="true" />View</button><button type="button" onClick={() => openMsg({ name: member.name, phone: member.phone, email: member.email }, 'whatsapp', '')} className="min-h-11 flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500 hover:text-white text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base" aria-label={t('TEXT_MESSAGE_WHATSAPP_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-mobile-whatsapp-${member.id}`}><MessageCircle size={16} strokeWidth={2} aria-hidden="true" />{t('TEXT_SEND_WHATSAPP')}</button><button type="button" onClick={() => openMsg({ name: member.name, phone: member.phone, email: member.email }, 'email', '')} className="min-h-11 flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/35 bg-purple-500/15 text-purple-600 dark:text-purple-300 hover:bg-purple-500 hover:text-white text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base" aria-label={t('TEXT_EMAIL_MEMBER_ARIA', { name: member.name })} data-testid={`trainer_members-members-table-mobile-email-${member.id}`}><Mail size={16} strokeWidth={2} aria-hidden="true" />{t('TEXT_SEND_EMAIL')}</button></div>
              </article>;
            })}
          </div>

          <TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalMembers} itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE} onPageChange={setCurrentPage}/>
        </>
      )}

      <TrainerMembersQuickViewModal
        member={quickViewMember}
        onClose={() => setQuickViewMember(null)}
        onOpenFullProfile={openMemberProfile}
        onMessage={(member, channel) => openMsg({ name: member.name, phone: member.phone, email: member.email }, channel, '')}
      />
    </div>
  );
}


export type { TrainerMembersTableProps } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
