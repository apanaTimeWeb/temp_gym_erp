"use client";
// RESPONSIBILITY: Read-only profile view for Staff/Managers, showing details and assigned branches.
// DATA FLOW: feature data/state and user input → AdminHrManagementStaffProfileModal → accessible UI/events routed to owning hooks (admin_hr/hr_staff_management/components/staff_profile_modal/AdminHrManagementStaffProfileModal.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementFormatters';
import { AdminHrFormatCurrency } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementFormatCurrency';

import { displayValue } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementDisplayValue';

import React, { useMemo, useState } from 'react';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel';
import { useAdminHrStaffProfileBranches } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffProfileBranches';
import { ChevronDown, ChevronUp, X, Building2, User, Phone, Mail, MapPin, Calendar, Activity, CheckCircle2, Ban, Edit2, IndianRupee, Hash } from 'lucide-react';
import AdminHrEmptyState from '@/app/frontend_admin/admin_hr/hr_staff_management/components/empty_state/AdminHrStaffManagementEmptyState';

/**
 * AdminHrManagementStaffProfileModal renders the admin hr staff profile modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrManagementStaffProfileModal: Read-only profile view for Staff/Managers, showing details and assigned branches.
 * @dependencies Consumes AdminHrFormatters, AdminHrFormatCurrency, AdminNavigationLayoutDisplayValue, AdminHrTypes, useAdminHrViewModel.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrManagementStaffProfileModal() {
  const locale = useLocale();
  const t = useTranslations();

  const { showProfileModal, setShowProfileModal, editData, openEdit } = useAdminHrViewModel();

  const isManager = editData?.role === 'Manager';

  const branchQuery = useAdminHrStaffProfileBranches(Boolean(showProfileModal && editData));
  const [branchSortDirection, setBranchSortDirection] = useState<'asc' | 'desc'>('asc');
  const branchesById = useMemo(() => new Map((branchQuery.data ?? []).map((branch) => [branch.id, branch])), [branchQuery.data]);
  const branchesToRender = useMemo(() => {
    if (!editData) return [];
    const values = isManager && editData.assignedBranches?.length ? editData.assignedBranches : [editData.branch || ''];
    return [...values].filter(Boolean).sort((left, right) => {
      const leftName = branchesById.get(left)?.name ?? left;
      const rightName = branchesById.get(right)?.name ?? right;
      const result = leftName.localeCompare(rightName);
      return branchSortDirection === 'asc' ? result : -result;
    });
  }, [branchSortDirection, branchesById, editData, isManager]);

  if (!showProfileModal || !editData) return null;

  return (
    <div data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-hr-staff-profile-title" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm overflow-y-auto" data-testid="admin_hr-admin_hr-staff-profile-modal-control">
      <div className="my-auto bg-overlay w-full max-w-md rounded-2xl shadow-dialog border border-border overflow-hidden flex flex-col max-h-dialog-desktop">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-input shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-subtle text-primary rounded-xl">
              <User size={18}  strokeWidth={2}/>
            </div>
            <h2 id="admin-hr-staff-profile-title" className="text-lg font-bold text-primary">{t('hr.admin_hr_staff_profile_modal.text_42ce83274d')}</h2>
          </div>
          <button type="button" 
            onClick={() => setShowProfileModal(false)}
            className="p-2 rounded-full hover:bg-input motion-safe:transition-colors text-secondary hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_hr-admin_hr-staff-profile-modal-control-2">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1 min-h-0 custom-scrollbar">
          
          {/* Top Profile Section */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-primary-subtle border-2 border-border flex flex-col items-center justify-center flex-shrink-0 text-primary">
              <span className="text-3xl font-bold uppercase">{(editData.name || '?').charAt(0)}</span>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-primary leading-tight">{editData.name}</h1>
                  <p className="text-sm font-medium text-primary mt-1">{editData.role} {t('hr.admin_hr_staff_profile_modal.text_71905e33f0')}{editData.id?.toUpperCase()}</p>
                </div>
                {isManager && (
                  <button type="button"
                    onClick={() => openEdit(editData as Staff)}
                    className="px-4 py-2 bg-primary-subtle hover:bg-primary-subtle text-primary font-semibold text-sm rounded-xl motion-safe:transition-colors flex items-center gap-2 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
                   data-testid="admin_hr-admin_hr-staff-profile-modal-control-3">
                    <Edit2 size={18}  strokeWidth={2}/>
                    {t('hr.admin_hr_staff_profile_modal.text_cd280a41f7')}</button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <Phone size={18} className="text-secondary"  strokeWidth={2}/>
                  <span className="text-sm font-medium text-primary">{displayValue(editData.phone)}</span>
                </div>
                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <Mail size={18} className="text-secondary"  strokeWidth={2}/>
                  <span className="text-sm font-medium text-primary truncate">{displayValue(editData.email)}</span>
                </div>
                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <Calendar size={18} className="text-secondary"  strokeWidth={2}/>
                  <span className="text-sm font-medium text-primary">
                    {t('hr.admin_hr_staff_profile_modal.text_4c0af443a2')}{editData.joinDate ? formatDate(editData.joinDate, locale) : t('hr.admin_hr_staff_profile_modal.auto_d8aa6dd430')}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <Activity size={18} className="text-secondary"  strokeWidth={2}/>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-secondary">{t('hr.admin_hr_staff_profile_modal.text_11dc9e1952')}</span>
                    {editData.isActive !== false ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-on-success bg-success px-2 py-0.5 rounded-md uppercase tracking-wide" data-testid="admin_hr-adminhrstaffprofilemodal-status-1">
                        <CheckCircle2 size={18}  strokeWidth={2}/> {t('hr.admin_hr_staff_profile_modal.text_a733b809d2')}</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-on-danger bg-danger px-2 py-0.5 rounded-md uppercase tracking-wide" data-testid="admin_hr-adminhrstaffprofilemodal-status-2">
                        <Ban size={18}  strokeWidth={2}/> {t('hr.admin_hr_staff_profile_modal.text_794696a720')}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <IndianRupee size={18} className="text-secondary"  strokeWidth={2}/>
                  <span className="text-sm font-medium text-primary">
                    {t('hr.admin_hr_staff_profile_modal.text_42b8e99f3c')}{AdminHrFormatCurrency(editData.salary || 0, undefined, locale)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <Hash size={18} className="text-secondary"  strokeWidth={2}/>
                  <span className="text-sm font-medium text-primary">
                    {t('hr.admin_hr_staff_profile_modal.text_5f3e72116d')}{displayValue(editData.aadhaar)}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-input p-3 rounded-xl border border-border">
                  <span className="text-xs font-bold border border-border text-secondary rounded px-1">{t('hr.admin_hr_staff_profile_modal.text_f295b2cdff')}</span>
                  <span className="text-sm font-medium text-primary truncate max-w-40" title={editData.upiId}>
                    {displayValue(editData.upiId)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Branches Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-primary"  strokeWidth={2}/>
              <h3 className="text-base font-bold text-primary">{t('hr.admin_hr_staff_profile_modal.text_e24e824b68')}{isManager ? t('hr.admin_hr_staff_profile_modal.auto_3e4eca54ae') : t('hr.admin_hr_staff_profile_modal.auto_1c044fc818')}</h3>
            </div>
            
            <div className="border border-border rounded-xl overflow-hidden">
              <table data-admin-responsive-table className="w-full text-left border-collapse">
                <thead className="bg-input">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider" aria-sort={branchSortDirection === 'asc' ? 'ascending' : 'descending'}><button type="button" onClick={() => setBranchSortDirection((current) => current === 'asc' ? 'desc' : 'asc')} className="flex min-h-11 min-w-11 items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_hr-admin_hr-staff-profile-modal-control-4">{t('hr.admin_hr_staff_profile_modal.text_1627510b24')}{branchSortDirection === 'asc' ? <ChevronUp size={18} className="text-primary" strokeWidth={2}/> : <ChevronDown size={18} className="text-primary" strokeWidth={2}/>}</button></th>
                    <th className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{t('hr.admin_hr_staff_profile_modal.text_d219c68101')}</th>
                    {isManager && <th className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider text-right">{t('hr.admin_hr_staff_profile_modal.text_6d12c8adbe')}</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {branchesToRender.map((bId , __testIdIndex170) => {
                    if (!bId) return null;
                    const info = branchesById.get(bId);
                    if (!info) return null;
                    const isPrimary = editData.primaryBranchId === bId || (!editData.primaryBranchId && bId === editData.branch);
                    
                    return (
                      <tr key={bId} className="bg-card hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                        <td className="px-4 py-3 text-sm font-medium text-primary">
                          {info.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-secondary">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={18}  strokeWidth={2}/>
                            {displayValue(info?.location)}
                          </div>
                        </td>
                        {isManager && (
                          <td className="px-4 py-3 text-right">
                            {isPrimary ? (
                              <span className="inline-block text-xs font-bold text-warning bg-warning-bg border border-border px-2 py-1 rounded-md uppercase" data-testid={`admin_hr-adminhrstaffprofilemodal-status-3-map170-${__testIdIndex170}-1`}>
                                {t('hr.admin_hr_staff_profile_modal.text_daf6ad5962')}</span>
                            ) : (
                              <span className="inline-block text-xs font-bold text-secondary bg-input px-2 py-1 rounded-md uppercase">
                                {t('hr.admin_hr_staff_profile_modal.text_e24e824b68')}</span>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  {branchQuery.status === 'pending' && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-secondary text-sm">{t('hr.admin_hr_staff_profile_modal.text_f0f39b3dc6')}</td></tr>
                  )}
                  {branchQuery.status === 'error' && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-secondary text-sm">{t('hr.admin_hr_staff_profile_modal.text_438638b969')}</td></tr>
                  )}
                  {!branchesToRender.length && branchQuery.status === 'success' && (
                    <tr><td colSpan={3}><AdminHrEmptyState title={t('hr.admin_hr_staff_profile_modal.text_a1a004a8e5')} description={t('hr.admin_hr_staff_profile_modal.auto_c85fbfab94')} /></td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {isManager && (
              <p className="text-xs text-disabled italic flex items-center gap-1 mt-2">
                {t('hr.admin_hr_staff_profile_modal.text_5bbe33fbb3')}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
