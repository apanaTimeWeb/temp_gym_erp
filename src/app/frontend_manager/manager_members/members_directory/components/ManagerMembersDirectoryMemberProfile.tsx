// RESPONSIBILITY: Renders ManagerMembersDirectoryMemberProfile's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Edit, MessageCircle, Mail } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';

import ManagerMembersDirectoryProfileAttendance from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryProfileAttendance';
import ManagerMembersDirectoryProfileDiet from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryProfileDiet';
import ManagerMembersDirectoryProfileOverview from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryProfileOverview';
import ManagerMembersDirectoryProfilePayments from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryProfilePayments';
import ManagerMembersDirectoryProfileWorkout from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryProfileWorkout';
import { PROFILE_TABS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_profile.constants';
import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { ManagerMembersDirectoryFormatCurrency, ManagerMembersDirectoryDisplayValue, ManagerMembersDirectoryFormatDate, ManagerMembersDirectoryMaskSensitiveData } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { MemberProfileTab } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';


/** @description Renders the ManagerMembersDirectoryMemberProfile component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (13 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerMembersDirectoryMemberProfile() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const locale = useLocale();

  const { selectedMember, closeMemberProfile, profileTab, setProfileTab, openEdit, openMsg, setShowRenewModal } = useManagerMembersDirectoryLogic();


  if (!selectedMember) return null;

  const statusStyle = MEMBERS_STATUS_COLORS[selectedMember.status] || { bg: 'bg-input', text: 'text-text-secondary' };

  return (
    <div className="min-h-full">
      
      <div className="p-6 space-y-5">
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-sm text-text-secondary hover:text-primary flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-close"
          onClick={closeMemberProfile}
          
         type="button">{t("COPY_BACK_MEMBERS")}</button>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary-subtle shrink-0">
                {(selectedMember.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">{ManagerMembersDirectoryDisplayValue(selectedMember.name)}</h2>
                <p className="text-text-secondary text-sm">{ManagerMembersDirectoryMaskSensitiveData(selectedMember.email, 'email')} · {ManagerMembersDirectoryMaskSensitiveData(selectedMember.phone, 'phone')}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span data-testid="manager_members-manager-members-member-profile-status" className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    {selectedMember.status}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info text-on-info" data-testid="manager_members-managermembersmemberprofile-status-badge-1">
                    {selectedMember.plan?.name || ''}
                  </span>
                  <span data-testid="manager_members-member-profile-status" className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-bg text-purple-text">
                    {MEMBERS_CYCLE_LABELS[selectedMember.billingCycle] ? t(MEMBERS_CYCLE_LABELS[selectedMember.billingCycle]!) : selectedMember.billingCycle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-edit"
                onClick={() => openEdit(selectedMember)}
                
               type="button">
                <Edit size={18} strokeWidth={2}/>{t("COPY_EDIT_1")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border rounded-xl hover:bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 bg-primary-subtle ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-button-action"
                onClick={() => setShowRenewModal(true)}
                
               type="button">{t("COPY_RENEW_PLAN_1")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-success text-on-success rounded-xl motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-main-button-message"
                onClick={() => openMsg(selectedMember, 'whatsapp')}
                
               type="button">
                <MessageCircle size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_2")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-info text-on-info rounded-xl motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-main-button-email"
                onClick={() => openMsg(selectedMember, 'email')}
                
               type="button">
                <Mail size={18} strokeWidth={2}/>{t("COPY_EMAIL_2")}</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t("COPY_MEMBER_ID"), value: selectedMember.id },
              { label: t("COPY_BRANCH"), value: selectedMember.branch },
              { label: t("COPY_GENDER_1"), value: selectedMember.gender },
              { label: t("COPY_AADHAAR_CARD"), value: ManagerMembersDirectoryMaskSensitiveData(selectedMember.aadhaar, 'identifier') },
              { label: t("COPY_JOIN_DATE_2"), value: ManagerMembersDirectoryFormatDate(selectedMember.joinDate) },
              { label: t("COPY_EXPIRY_DATE_2"), value: ManagerMembersDirectoryFormatDate(selectedMember.expiryDate) },
              { label: t("COPY_ADDRESS_2"), value: selectedMember.address || t('COPY_N') },
              { label: t("COPY_TOTAL_PAID_2"), value: ManagerMembersDirectoryFormatCurrency(selectedMember.paidAmount, ManagerEnvConfig.currencyCode, locale) },
              { label: t("COPY_PENDING"), value: ManagerMembersDirectoryFormatCurrency(selectedMember.pendingAmount, ManagerEnvConfig.currencyCode, locale) },
            ].map((f, i) => (
              <div key={`member-summary-stat-${f.label.replace(/\s+/g, '-')}`} className="bg-input rounded-lg p-3">
                <p className="text-xs text-text-secondary mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <div className="flex border-b border-border" role="tablist" aria-label={t("COPY_PROFILE_SECTIONS")}>
            {PROFILE_TABS.map(({ id: t, label }, mapIndex) => (
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-5 py-3.5 text-sm font-medium motion-safe:transition-all motion-safe:duration-200 border-b-2 ${profileTab === t
                    ? 'text-primary bg-primary-subtle border-primary'
                    : 'border-transparent text-text-secondary hover:text-primary'
                  } ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberprofile-button-senary-${mapIndex}`}
                key={t}
                id={`member-profile-tab-${t}`} role="tab" aria-selected={profileTab === t} aria-controls={`member-profile-panel-${t}`} tabIndex={profileTab === t ? 0 : -1}
                onKeyDown={(event) => { const current = PROFILE_TABS.findIndex((tab) => tab.id === t); let next = current; if (event.key === "ArrowRight") next = (current + 1) % PROFILE_TABS.length; else if (event.key === "ArrowLeft") next = (current - 1 + PROFILE_TABS.length) % PROFILE_TABS.length; else if (event.key === "Home") next = 0; else if (event.key === "End") next = PROFILE_TABS.length - 1; else return; event.preventDefault(); const nextTab = PROFILE_TABS[next]; if (nextTab) { setProfileTab(nextTab.id as MemberProfileTab); document.getElementById(`member-profile-tab-${nextTab.id}`)?.focus(); } }}
                onClick={() => { setProfileTab(t as MemberProfileTab); }}
                
               type="button">
                {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {PROFILE_TABS.map(({ id }) => (
              <div key={id} role="tabpanel" id={`member-profile-panel-${id}`} aria-labelledby={`member-profile-tab-${id}`} tabIndex={0} hidden={profileTab !== id}>
                {profileTab === id && id === 'overview' && <ManagerMembersDirectoryProfileOverview />}
                {profileTab === id && id === 'attendance' && <ManagerMembersDirectoryProfileAttendance />}
                {profileTab === id && id === 'payments' && <ManagerMembersDirectoryProfilePayments />}
                {profileTab === id && id === 'workout' && <ManagerMembersDirectoryProfileWorkout />}
                {profileTab === id && id === 'diet' && <ManagerMembersDirectoryProfileDiet />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
