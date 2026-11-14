"use client";
// RESPONSIBILITY: Renders the Admin HR staff list from the server-backed query, including URL-persisted sorting, pagination, row actions, and accessible row navigation.
// DATA FLOW: feature data/state and user input → AdminHrManagementStaffTable → accessible UI/events routed to owning hooks (admin_hr/hr_staff_management/components/staff_table/AdminHrManagementStaffTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementFormatters';

import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel';
import type { AdminHrStaffSortKey } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementSortTypes';
import { Edit2, Trash2, CheckCircle2, Ban, PlayCircle } from 'lucide-react';
import { STAFF_TABLE_HEADERS, STAFF_TABLE_HEADER_LABEL_KEYS, HR_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_hr/hr_staff_management/components/AdminHrStaffManagementPagination';
import { displayValue } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementDisplayValue';
import { maskSensitiveData } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementMaskSensitiveData';
import { maskAdminHrEmail } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementMaskEmail';
import { AdminHrFormatCurrency } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementFormatCurrency';

import AdminHrEmptyState from '@/app/frontend_admin/admin_hr/hr_staff_management/components/empty_state/AdminHrStaffManagementEmptyState';
import AdminHrStaffSortIndicator from '@/app/frontend_admin/admin_hr/hr_staff_management/components/staff_table/AdminHrStaffManagementStaffSortIndicator';

const STAFF_SORT_KEYS: Partial<Record<string, AdminHrStaffSortKey>> = {
  Name: 'name',
  Branch: 'branch',
  Role: 'role',
  Phone: 'phone',
  Salary: 'salary',
  Joined: 'joinDate',
};


/**
 * AdminHrManagementStaffTable renders the admin hr staff table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrManagementStaffTable: Renders the Admin HR staff list from the server-backed query, including URL-persisted sorting, pagination, row actions, and accessible row navigation.
 * @dependencies Consumes AdminHrFormatters, useAdminHrViewModel, AdminHrTypes, AdminHrSortTypes, AdminHrConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrManagementStaffTable() {
  const locale = useLocale();
  const t = useTranslations();

  const {
    staff, status, debouncedSearch, currentPage, setCurrentPage, totalStaff,
    staffSortKey, staffSortDir, setStaffSort, openEdit, openProfile, deleteStaff, toggleStaffStatus,
  } = useAdminHrViewModel();

  const handleSort = (key: AdminHrStaffSortKey) => {
    const nextDirection: AdminHrSortDirection = staffSortKey === key && staffSortDir === 'asc' ? 'desc' : 'asc';
    setStaffSort(key, nextDirection);
  };

  const renderHeader = (header: string) => {
    const key = STAFF_SORT_KEYS[header];
    const label = t(STAFF_TABLE_HEADER_LABEL_KEYS[header] ?? header);
    if (!key) return <span>{label}</span>;
    return (
      <button
        type="button"
        onClick={() => handleSort(key)}
        className="motion-safe:transition-all motion-safe:duration-base ease-in-out inline-flex min-h-11 items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95"
        aria-label={t('admin_hr_staff_table.auto_sortBy', { header })}
         data-testid="admin_hr-admin_hr-staff-table-click">
        {label}
        <AdminHrStaffSortIndicator active={staffSortKey === key} direction={staffSortDir} />
      </button>
    );
  };

  if (status === 'pending') {
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-input text-secondary"><tr>{STAFF_TABLE_HEADERS.map((header) => <th key={header} aria-sort={STAFF_SORT_KEYS[header] && staffSortKey === STAFF_SORT_KEYS[header] ? (staffSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t('hr.admin_hr_staff_table.text_c3cd636a58')}</th></tr></thead>
            <tbody className="divide-y divide-border">
              {['staff-skeleton-1','staff-skeleton-2','staff-skeleton-3','staff-skeleton-4','staff-skeleton-5'].map((key) => (
                <tr key={key} className="motion-safe:animate-pulse motion-safe:duration-base">
                  <td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24 mb-1" /><div className="h-3 bg-skeleton-base rounded w-32" /></td>
                  <td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-20" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-16" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-20" /></td><td className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td><td className="px-4 py-4"><div className="h-6 bg-skeleton-base rounded w-16 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input text-secondary"><tr>{STAFF_TABLE_HEADERS.map((header) => <th key={header} aria-sort={STAFF_SORT_KEYS[header] && staffSortKey === STAFF_SORT_KEYS[header] ? (staffSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t('hr.admin_hr_staff_table.text_c3cd636a58')}</th></tr></thead>
          <tbody className="divide-y divide-border">
            {staff.map((member , __testIdIndex93) => (
              <tr key={member.id} className="motion-safe:transition-colors hover:bg-surface-hover motion-safe:duration-base" data-testid={`admin_hr-admin_hr-staff-table-row-map93-${__testIdIndex93}`}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary-subtle text-primary" aria-hidden="true">{(member.name || '?').charAt(0).toUpperCase()}</div><div><button type="button" className="text-sm font-medium text-primary text-left underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded" aria-label={t('admin_hr_staff_table.auto_openProfile', { name: member.name || t('hr.admin_hr_staff_table.remaining_staffMember') })} onClick={() => openProfile(member)} data-testid={`admin_hr-admin_hr-staff-table-open-profile-map93-${__testIdIndex93}`}>{displayValue(member.name)}</button><p className="text-xs text-secondary">{maskAdminHrEmail(member.email)}</p></div></div></td>
                <td className="px-4 py-3 text-sm text-secondary">{member.role === 'Manager' && member.assignedBranches && member.assignedBranches.length > 0 ? <div className="flex flex-col"><span className="font-medium text-primary">{displayValue(member.primaryBranchId || member.assignedBranches[0])}</span>{member.assignedBranches.length > 1 && <span className="text-xs bg-primary-subtle text-primary px-1.5 py-0.5 rounded-full mt-1 w-max" data-testid="hr-management-hr-management-staff-table-status-badge">+{member.assignedBranches.length - 1} {t('hr.admin_hr_staff_table.text_4bab2d8fe1')}</span>}</div> : displayValue(member.branch)}</td>
                <td className="px-4 py-3 text-sm text-primary">{displayValue(member.role)}</td>
                <td className="px-4 py-3">{member.isActive === false ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger text-on-danger border border-border" data-testid={`admin_hr-adminhrstafftable-status-1-map93-${__testIdIndex93}-2`}><Ban size={18} strokeWidth={2}/> {t('hr.admin_hr_staff_table.text_794696a720')}</span> : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-on-success border border-border" data-testid={`admin_hr-adminhrstafftable-status-2-map93-${__testIdIndex93}-3`}><CheckCircle2 size={18} strokeWidth={2}/> {t('hr.admin_hr_staff_table.text_a733b809d2')}</span>}</td>
                <td className="px-4 py-3 text-sm text-secondary">{maskSensitiveData(member.phone)}</td><td className="px-4 py-3 text-sm font-medium text-success">{AdminHrFormatCurrency(member.salary, undefined, locale)}</td><td className="px-4 py-3 text-sm text-secondary">{member.joinDate ? formatDate(member.joinDate, locale) : displayValue(null)}</td>
                <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); toggleStaffStatus(member); }} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 min-h-11 min-w-11 p-1.5 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${member.isActive === false ? 'text-success hover:bg-success-bg' : 'text-danger hover:bg-surface-hover'}`} title={member.isActive === false ? t('hr.admin_hr_staff_table.auto_bb39318850') : t('hr.admin_hr_staff_table.auto_6e2128b7ff')} aria-label={member.isActive === false ? t('admin_hr_staff_table.auto_activate', { name: member.name }) : t('admin_hr_staff_table.auto_suspend', { name: member.name })} data-testid={`admin_hr-admin_hr-staff-table-click-3-map93-${__testIdIndex93}-4`}>{member.isActive === false ? <PlayCircle size={18}  strokeWidth={2}/> : <Ban size={18}  strokeWidth={2}/>}</button><button type="button" onClick={(event) => { event.stopPropagation(); openEdit(member); }} className="min-h-11 min-w-11 p-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" title={t('hr.admin_hr_staff_table.text_5301648dcf')} aria-label={t('admin_hr_staff_table.auto_edit', { name: member.name })} data-testid={`admin_hr-admin_hr-staff-table-click-4-map93-${__testIdIndex93}-5`}><Edit2 size={18}  strokeWidth={2}/></button><button type="button" onClick={(event) => { event.stopPropagation(); deleteStaff(member.id); }} className="min-h-11 min-w-11 p-1.5 rounded motion-safe:transition-colors text-danger hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" title={t('hr.admin_hr_staff_table.text_f6fdbe48dc')} aria-label={t('admin_hr_staff_table.auto_delete', { name: member.name })} data-testid={`admin_hr-admin_hr-staff-table-click-5-map93-${__testIdIndex93}-6`}><Trash2 size={18}  strokeWidth={2}/></button></div></td>
              </tr>
            ))}
            {staff.length === 0 && <tr><td colSpan={9}><AdminHrEmptyState title={debouncedSearch ? t('hr.admin_hr_staff_table.auto_c1a046164d') : t('hr.admin_hr_staff_table.auto_d5794e6b06')} description={debouncedSearch ? t('hr.admin_hr_staff_table.auto_47d7de0a0f') : t('hr.admin_hr_staff_table.auto_9af622863d')} /></td></tr>}
          </tbody>
        </table>
      </div>
      <AdminNavigationLayoutPagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil(totalStaff / HR_ITEMS_PER_PAGE))} totalItems={totalStaff} itemsPerPage={HR_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
