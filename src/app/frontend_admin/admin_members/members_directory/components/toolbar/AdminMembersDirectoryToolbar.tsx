"use client";
// RESPONSIBILITY: Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.
// DATA FLOW: feature data/state and user input → AdminMembersDirectoryToolbar → accessible UI/events routed to owning hooks (admin_members/members_directory/components/toolbar/AdminMembersDirectoryToolbar.tsx)

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryUiTypes';
import type { AdminMembersStatusFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
import { Search, Download, ShieldAlert } from 'lucide-react';
import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryLogic';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/members_directory/state/useAdminMembersDirectoryStore';
import { useAdminMembersBranchReference } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryBranchReference';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_members/members_directory/components/searchable_dropdown/AdminMembersDirectorySearchableDropdown';
import { MEMBER_GENDER_OPTIONS, MEMBER_PLAN_OPTIONS, MEMBER_STATUS_OPTIONS, EXPIRY_FILTER_OPTIONS } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';
import type { MemberStatus } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
import type { AdminMembersBranchReference } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryBranchReferenceTypes';

import type { AdminMembersToolbarProps } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryToolbarPropsTypes';


/**
 * AdminMembersDirectoryToolbar renders the admin members toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersDirectoryToolbar: Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.
 * @dependencies Consumes AdminMembersUiTypes, useAdminMembersStore, useAdminMembersBranchReference, AdminNavigationLayoutSearchableDropdown, AdminMembersConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersDirectoryToolbar() {
  const t = useTranslations();
  const { exportMembers, isExporting } = useAdminMembersLogic();

  const { search, setSearch, statusFilter, setStatusFilter, branchFilter, setBranchFilter, expiryFilter, setExpiryFilter, genderFilter, setGenderFilter, planFilter, setPlanFilter } = useAdminMembersStore();
  const branchQuery = useAdminMembersBranchReference();
  const branches = branchQuery.data ?? [];

  const branchOptions = [
    { value: 'all', label: t('members.AdminAuditRepair.allBranches') },
    ...(branches as AdminMembersBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary pointer-events-none"  strokeWidth={2}/></span>
        <input
          type="text"
          placeholder={t('members.admin_members_toolbar.text_9fd6edc02a')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
          aria-label={t('members.admin_members_toolbar.text_a1d97aee95')}
         data-testid="admin_members-admin_members-toolbar-control"/>
      </div>
      <div className="w-full sm:w-auto flex items-center gap-2">
        <button type="button" onClick={() => void exportMembers()} disabled={isExporting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_members-admin_members-toolbar-export">
          <Download size={18} aria-hidden="true" strokeWidth={2} />{isExporting ? t('members.AdminAuditRepair.exportingCsv') : t('members.AdminAuditRepair.exportCsv')}
        </button>
        <Link
          href="/frontend_admin/admin_members/members_blacklist_management"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-danger-border bg-danger-bg px-3.5 py-2 text-sm font-semibold text-danger-text hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          title="Direct Blacklist Management — 12 Blacklisted Members"
          data-testid="admin_members-admin_members-toolbar-blacklist-quicklink"
        >
          <ShieldAlert size={18} aria-hidden="true" strokeWidth={2} />
          <span>Blacklist</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-danger-text text-white">12</span>
        </Link>
      </div>
      <div className="w-full sm:w-44">
        <AdminNavigationLayoutSearchableDropdown
          options={MEMBER_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as AdminMembersStatusFilter)}
          placeholder={t('members.admin_members_toolbar.text_6b308de777')}
         testId="admin_members-admin_members-toolbar-change"/>
      </div>
      <div className="w-full sm:w-48">
        {branchQuery.isPending && <p role="status" className="text-xs text-secondary">{t('members.AdminAuditRepair.listLoading')}</p>}
        {branchQuery.isError && <div role="alert" className="text-xs text-danger">{t('members.AdminAuditRepair.listFailed')} <button type="button" onClick={() => void branchQuery.refetch()} className="min-h-11 underline focus-visible:ring-2 focus-visible:ring-primary">{t('members.AdminAuditRepair.retryList')}</button></div>}
        <AdminNavigationLayoutSearchableDropdown
          options={branchOptions}
          value={branchFilter}
          onChange={(v) => setBranchFilter(v as string)}
          placeholder={t('members.admin_members_toolbar.text_0bf51d9a45')}
         testId="admin_members-admin_members-toolbar-change-2"/>
      </div>
      <div className="w-full sm:w-52 flex gap-2">
        <AdminNavigationLayoutSearchableDropdown
          options={EXPIRY_FILTER_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={expiryFilter}
          onChange={(v) => setExpiryFilter(v as AdminMembersExpiryFilter)}
          placeholder={t('members.admin_members_toolbar.text_5a8d375693')}
         testId="admin_members-admin_members-toolbar-change-3"/>
      </div>
      <div className="w-full sm:w-40">
        <AdminNavigationLayoutSearchableDropdown
          options={MEMBER_GENDER_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={genderFilter}
          onChange={(v) => setGenderFilter(v as string)}
          placeholder={t('members.admin_members_toolbar.text_1632205ebc')}
         testId="admin_members-admin_members-toolbar-change-4"/>
      </div>
      <div className="w-full sm:w-44">
        <AdminNavigationLayoutSearchableDropdown
          options={MEMBER_PLAN_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
          value={planFilter}
          onChange={(v) => setPlanFilter(v as string)}
          placeholder={t('members.admin_members_toolbar.text_5f1f815bea')}
         testId="admin_members-admin_members-toolbar-change-5"/>
      </div>

    </div>
  );
}
