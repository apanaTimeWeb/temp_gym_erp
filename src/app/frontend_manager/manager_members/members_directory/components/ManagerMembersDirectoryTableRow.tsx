// RESPONSIBILITY: Renders a single member directory row and handles row-level interactions and actions.
'use client';

import Link from 'next/link';
import { Edit, MessageCircle, Mail, Trash2, Banknote, Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import CopyButton from '@/components/ui/CopyButton';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';
import { MEMBER_SUSPENDED_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MEMBERS_STATUS_COLORS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { ManagerMembersDirectoryFormatCurrency, ManagerMembersDirectoryDisplayValue, ManagerMembersDirectoryMaskSensitiveData, ManagerMembersDirectoryFormatDate } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

interface ManagerMembersDirectoryTableRowProps {
  m: Member;
  mapIndex: number;
  locale: string;
  openMemberProfile: (m: Member) => void;
  setSelectedMember: (m: Member) => void;
  setShowPaymentModal: (val: boolean) => void;
  openEdit: (m: Member) => void;
  openMsg: (m: Member, channel: 'whatsapp' | 'email') => void;
  toggleSuspend: (suspend: boolean) => void;
  deleteMember: (id: string) => void;
}

export default function ManagerMembersDirectoryTableRow({
  m,
  mapIndex,
  locale,
  openMemberProfile,
  setSelectedMember,
  setShowPaymentModal,
  openEdit,
  openMsg,
  toggleSuspend,
  deleteMember,
}: ManagerMembersDirectoryTableRowProps) {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const { confirm } = useConfirm();
  const statusStyle = MEMBERS_STATUS_COLORS[m.status] || { bg: 'bg-input', text: 'text-text-secondary' };

  return (
    <tr
      data-testid={`manager_members-members-managermemberstable-row-${m.id}`}
      className="hover:bg-surface-hover transition-colors group cursor-pointer"
      tabIndex={0}
      onClick={() => { openMemberProfile(m); }}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openMemberProfile(m); } }}
    >
      <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="font-mono font-bold text-text-primary text-xs">#{m.id}</span>
          <CopyButton value={String(m.id)} />
        </div>
      </td>
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-primary-subtle text-primary shrink-0 ring-1 ring-border">
            {m.name?.charAt(0) || '?'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-text-primary truncate">{ManagerMembersDirectoryDisplayValue(m.name)}</p>
              <CopyButton value={m.name || ''} />
            </div>
            <p className="text-xs text-text-secondary font-mono">{ManagerMembersDirectoryMaskSensitiveData(m.phone || '', 'phone')}</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-text-secondary">
              <span className="text-text-muted text-[11px]">Trainer:</span>
              {m.assignedTrainerName ? (
                <Link
                  href={`/frontend_manager/manager_staff_hr/staff_directory?search=${encodeURIComponent(m.assignedTrainerName)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-text-primary text-[11px] hover:text-primary hover:underline"
                >
                  {m.assignedTrainerName}
                </Link>
              ) : (
                <span className="font-medium text-text-primary text-[11px]">Unassigned</span>
              )}
              {m.isPT && <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-warning-bg text-warning-text border border-warning">PT</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerMembersDirectoryDisplayValue(m.gender)}</td>
      <td className="px-4 py-3.5 text-xs whitespace-nowrap">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-text-primary">{ManagerMembersDirectoryDisplayValue(m.plan?.name)}</span>
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-primary-subtle text-primary border border-border">
              {m.billingCycle ? m.billingCycle.toUpperCase() : 'MONTHLY'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {m.assignedDiet || m.dietPlan ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-success-bg text-success-text border border-success" title="Diet Assigned">
                Diet Plan
              </span>
            ) : (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-input text-text-muted border border-border">
                No Diet
              </span>
            )}
            {m.assignedWorkout || m.workoutPlan ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-info-bg text-info-text border border-info" title="Workout Assigned">
                Workout Plan
              </span>
            ) : (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-input text-text-muted border border-border">
                No Workout
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 whitespace-nowrap">
        <span
          data-testid={`manager_members-members-managermemberstable-status-${m.id}`}
          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} border border-border`}
        >
          {t(({ ACTIVE: 'COPY_ACTIVE', PENDING: 'COPY_PENDING', EXPIRED: 'COPY_EXPIRED', FROZEN: 'COPY_FROZEN', SUSPENDED: 'COPY_SUSPENDED', BANNED: 'COPY_BANNED' } as Record<string, string>)[m.status] || 'COPY_STATUS')}
        </span>
      </td>
      <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerMembersDirectoryFormatDate(m.joinDate)}</td>
      <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerMembersDirectoryFormatDate(m.expiryDate)}</td>
      <td className="px-4 py-3.5 text-xs font-semibold text-success-text whitespace-nowrap">{ManagerMembersDirectoryFormatCurrency(m.paidAmount, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3.5 text-xs font-semibold whitespace-nowrap">
        {m.pendingAmount > 0 ? (
          <span className="text-danger-text bg-danger-bg px-2 py-0.5 rounded font-bold">{ManagerMembersDirectoryFormatCurrency(m.pendingAmount, ManagerEnvConfig.currencyCode, locale)}</span>
        ) : (
          <span className="text-text-secondary">{ManagerMembersDirectoryDisplayValue(null)}</span>
        )}
      </td>
      <td className="px-4 py-3.5 text-xs whitespace-nowrap">
        <div className="flex items-center justify-end gap-1">
          {m.pendingAmount > 0 && (
            <button
              className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-warning-bg text-warning-text hover:bg-warning hover:text-on-warning border border-warning transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
              data-testid={`manager_members-members-managermemberstable-button-collect-dues-${m.id}`}
              onClick={(e) => { e.stopPropagation(); setSelectedMember(m); setShowPaymentModal(true); }}
              title={t("COPY_COLLECT_DUES")}
              aria-label={t("TEXT_COLLECT_DUES", { value: m.name })}
              type="button"
            >
              <Banknote size={16} strokeWidth={2}/>
            </button>
          )}
          <button
            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-input text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-border transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
            data-testid={`manager_members-members-managermemberstable-button-edit-${m.id}`}
            onClick={(e) => { e.stopPropagation(); openEdit(m); }}
            title={t("COPY_EDIT_2")}
            aria-label={t("TEXT_EDIT_MEMBER_ROW", { value: m.name })}
            type="button"
          >
            <Edit size={16} strokeWidth={2} />
          </button>
          <button
            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-success-bg text-success-text hover:bg-success hover:text-on-success border border-success transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
            data-testid={`manager_members-members-managermemberstable-button-whatsapp-${m.id}`}
            onClick={(e) => { e.stopPropagation(); openMsg(m, 'whatsapp'); }}
            title={t("COPY_WHATSAPP_1")}
            aria-label={t("TEXT_WHATSAPP_MEMBER", { value: m.name })}
            type="button"
          >
            <MessageCircle size={16} strokeWidth={2}/>
          </button>
          <button
            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-info-bg text-info-text hover:bg-info hover:text-on-info border border-info transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
            data-testid={`manager_members-members-managermemberstable-button-email-${m.id}`}
            onClick={(e) => { e.stopPropagation(); openMsg(m, 'email'); }}
            title={t("COPY_EMAIL_4")}
            aria-label={t("TEXT_EMAIL_MEMBER", { value: m.name })}
            type="button"
          >
            <Mail size={16} strokeWidth={2}/>
          </button>
          {(() => {
            if (m.status !== MEMBER_SUSPENDED_STATUS && m.pendingAmount > 0) {
              return (
                <button
                  className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-danger-bg text-danger-text hover:bg-danger hover:text-on-danger border border-danger transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                  data-testid={`manager_members-members-managermemberstable-button-suspend-member-${mapIndex}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(true); }}
                  title={t("COPY_SUSPEND_MEMBER")}
                  aria-label={t("TEXT_SUSPEND_MEMBER", { value: m.name })}
                  type="button"
                >
                  <Ban size={16} strokeWidth={2}/>
                </button>
              );
            }
            if (m.status === MEMBER_SUSPENDED_STATUS) {
              return (
                <button
                  className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-success-bg text-success-text hover:bg-success hover:text-on-success border border-success transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
                  data-testid={`manager_members-members-managermemberstable-button-unsuspend-member-${m.id}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(false); }}
                  title={t("COPY_UNSUSPEND_MEMBER")}
                  aria-label={t("TEXT_UNSUSPEND_MEMBER", { value: m.name })}
                  type="button"
                >
                  <Ban size={16} strokeWidth={2}/>
                </button>
              );
            }
            return null;
          })()}
          <button
            className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 inline-flex items-center justify-center p-1.5 rounded-lg bg-danger-bg text-danger-text hover:bg-danger hover:text-on-danger border border-danger transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
            data-testid={`manager_members-members-managermemberstable-button-delete-member-${m.id}`}
            onClick={async (e) => { 
              e.stopPropagation();
              const confirmed = await confirm({
                title: t("COPY_DELETE_MEMBER"),
                message: t("TEXT_DELETE_MEMBER_CONFIRM_MESSAGE", { value: m.name }),
                confirmText: t("COPY_DELETE_1"),
                type: 'danger'
              });
              if (confirmed) deleteMember(m.id);
            }}
            title={t("COPY_DELETE_2")}
            aria-label={t("TEXT_DELETE_MEMBER_ROW", { value: m.name })}
            type="button"
          >
            <Trash2 size={16} strokeWidth={2}/>
          </button>
        </div>
      </td>
    </tr>
  );
}
