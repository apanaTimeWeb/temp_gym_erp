"use client";
// RESPONSIBILITY: Renders the staff create/edit form and delegates state and mutation orchestration to the adjacent hook.
// DATA FLOW: feature data/state and user input → AdminHrManagementStaffModal → accessible UI/events routed to owning hooks (admin_hr/hr_staff_management/components/staff_modal/AdminHrManagementStaffModal.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminHrStaffManagementValidationMessage } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementValidationMessages';

import { Controller } from 'react-hook-form';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_hr/hr_staff_management/components/searchable_dropdown/AdminHrStaffManagementSearchableDropdown';
import { Eye, EyeOff, X, Save, Loader2 } from 'lucide-react';
import { useAdminHrStaffModalForm } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffModalForm';
import type { StaffFormValues, AdminHrBranchReference } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import { STAFF_ROLE_OPTIONS, GENDER_OPTIONS } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';
import type { AdminHrStaffModalField } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementStaffModalFieldTypes';

/**
 * AdminHrManagementStaffModal renders the admin hr staff modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrManagementStaffModal: Renders the staff create/edit form and delegates state and mutation orchestration to the adjacent hook.
 * @dependencies Consumes useAdminHrStaffModalForm, AdminHrTypes, AdminHrConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrManagementStaffModal() {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminHrStaffManagementValidationMessage(message, (key) => t(key));

  const { showModal, editId, editData, saveStaff, saving, branches, showPassword, togglePasswordVisibility, register, handleSubmit, control, errors, isManager, assignedBranches, getBranchLabel, toggleAssignedBranch, handleClose, STAFF_MODAL_FIELDS, setValue } = useAdminHrStaffModalForm();

  if (!showModal) return null;


  return (
 <div data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-hr-staff-modal-title" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay overflow-y-auto" data-testid="admin_hr-admin_hr-staff-modal-control">
  <div className="my-auto rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop overflow-y-auto custom-scrollbar bg-overlay motion-safe:transition-all motion-safe:duration-base ease-in-out border-2 border-border">
  <div className="sticky top-0 px-8 py-5 border-b border-border bg-card flex items-center justify-between z-10">
  <h3 id="admin-hr-staff-modal-title" className="text-xl font-bold text-primary">{editId ? t('hr.admin_hr_staff_modal.auto_6185ab8940') : t('hr.admin_hr_staff_modal.auto_b76695b470')}</h3>
  <button 
  type="button" 
  onClick={() => void handleClose()} 
  className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-colors text-secondary hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
   data-testid="admin_hr-admin_hr-staff-modal-click">
  <X size={18}  strokeWidth={2}/>
  </button>
  </div>
  <form onSubmit={handleSubmit(saveStaff)} className="p-8" data-testid="admin_hr-admin_hr-staff-modal-submit">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {STAFF_MODAL_FIELDS.map((f, __testIdIndex42) => (
  <div key={f.key} className={f.key === 'name' ? 'sm:col-span-2' : ''}>
  <label htmlFor={`admin-hr-staff-${String(f.key)}`} className="block text-sm font-medium mb-1.5 text-secondary">{t(f.labelKey)}</label>
  <input
  id={`admin-hr-staff-${String(f.key)}`} 
  type={f.type} 
  placeholder={f.placeholder} 
  min={f.type === 'number' ? '0' : undefined}
  maxLength={f.type === 'tel' ? 10 : undefined}
  onKeyDown={
    f.type === 'number' 
      ? (e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); } 
      : f.type === 'tel' 
        ? (e) => { if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault(); } 
        : undefined
  }
  aria-invalid={Boolean(errors[f.key as keyof StaffFormValues])}
  aria-describedby={errors[f.key as keyof StaffFormValues] ? `admin-hr-staff-${String(f.key)}-error` : undefined}
  {...register(f.key as keyof StaffFormValues, f.type === 'number' ? { valueAsNumber: true } : {})}
  className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 w-full border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 motion-safe:transition-all motion-safe:duration-base ${
    errors[f.key as keyof StaffFormValues] ? 'border-border focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
  } bg-input text-primary`}
   data-testid={`admin_hr-admin_hr-staff-modal-control-2-map42-${__testIdIndex42}-1`}/>
  {errors[f.key as keyof StaffFormValues] && (
    <p id={`admin-hr-staff-${String(f.key)}-error`} role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors[f.key as keyof StaffFormValues]?.message)}</p>
  )}
  </div>
  ))}
  
  {isManager ? (
    <div className="sm:col-span-2 space-y-4 p-5 border border-border rounded-xl bg-input">
      <div>
        <label className="block text-sm font-medium mb-2 text-primary">{t('hr.admin_hr_staff_modal.text_4046da7c63')}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(branches as AdminHrBranchReference[]).map((b, __testIdIndex73) => (
            <label key={b.id} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer motion-safe:transition-colors ${assignedBranches.includes(b.id) ? 'border-focus bg-surface-highlight text-primary' : 'border-border hover:bg-input text-secondary'}`}>
              <input 
                type="checkbox" 
                value={b.id}
                checked={assignedBranches.includes(b.id)}
                onChange={(e) => toggleAssignedBranch(b.id, e.target.checked)}
                className="w-4 h-4 text-primary bg-input border-border rounded focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
               data-testid={`admin_hr-admin_hr-staff-modal-control-3-map73-${__testIdIndex73}-1`}/>
              <span className="text-sm font-medium">{b.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5 text-secondary">{t('hr.admin_hr_staff_modal.text_daf6ad5962')}</label>
        <Controller
          name="primaryBranchId"
          control={control}
          render={({ field }) => (
            <AdminNavigationLayoutSearchableDropdown
              value={field.value || ''}
              onChange={(val) => {
                field.onChange(val);
                setValue('branch', String(val)); // Fallback for backward compatibility
              }}
              options={assignedBranches.map(id => ({ label: getBranchLabel(id), value: id }))}
              placeholder={t('hr.admin_hr_staff_modal.text_1e7f72e029')}
              ariaLabel={t('hr.static.branch')}
             testId="admin_hr-admin_hr-staff-modal-control-4"/>
          )}
        />
        {errors.primaryBranchId && <p role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.primaryBranchId.message)}</p>}
      </div>
    </div>
  ) : (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-secondary">{t('hr.admin_hr_staff_modal.text_1627510b24')}</label>
      <Controller
        name="branch"
        control={control}
        render={({ field }) => (
          <AdminNavigationLayoutSearchableDropdown
            value={field.value || ''}
            onChange={field.onChange}
            options={(branches as AdminHrBranchReference[]).map(b => ({ label: b.name, value: b.id }))}
            placeholder={t('hr.admin_hr_staff_modal.text_5455bdc002')}
            ariaLabel={t('hr.static.branch')}
           testId="admin_hr-admin_hr-staff-modal-control-5"/>
        )}
      />
      {errors.branch && <p role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.branch.message)}</p>}
    </div>
  )}
  <div>
  <label className="block text-sm font-medium mb-1.5 text-secondary">{t('hr.admin_hr_staff_modal.text_c3f104d136')}</label>
  <Controller
    name="role"
    control={control}
    render={({ field }) => (
      <AdminNavigationLayoutSearchableDropdown
        value={field.value || ''}
        onChange={field.onChange}
        options={STAFF_ROLE_OPTIONS.map((opt) => ({ value: opt.value, label: t(opt.labelKey) }))}
        placeholder={t('hr.admin_hr_staff_modal.text_ec5e55a570')}
        ariaLabel={t('hr.static.role')}
       testId="admin_hr-admin_hr-staff-modal-change"/>
    )}
  />
  {errors.role && <p role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.role.message)}</p>}
  </div>
  <div>
  <label className="block text-sm font-medium mb-1.5 text-secondary">{t('hr.admin_hr_staff_modal.text_8a754c61c2')}</label>
  <Controller
    name="gender"
    control={control}
    render={({ field }) => (
      <AdminNavigationLayoutSearchableDropdown
        value={field.value || ''}
        onChange={field.onChange}
        options={GENDER_OPTIONS.map((opt) => ({ value: opt.value, label: t(opt.labelKey) }))}
        ariaLabel={t('hr.static.gender')}
       testId="admin_hr-admin_hr-staff-modal-change-2"/>
    )}
  />
  </div>
  <div>
  <label htmlFor="admin-hr-staff-join-date" className="block text-sm font-medium mb-1.5 text-secondary">{t('hr.admin_hr_staff_modal.text_2e672f856b')}</label>
  <input 
  id="admin-hr-staff-join-date"
  type="date"
  aria-invalid={Boolean(errors.joinDate)}
  aria-describedby={errors.joinDate ? "admin-hr-staff-join-date-error" : undefined}
  {...register('joinDate')}
  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
   data-testid="admin_hr-admin_hr-staff-modal-control-6"/>
  {errors.joinDate && <p id="admin-hr-staff-join-date-error" role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.joinDate.message)}</p>}
  </div>

  <div>
  <label htmlFor="admin-hr-staff-temporary-password" className="block text-sm font-medium mb-1.5 text-secondary">{t('hr.admin_hr_staff_modal.text_1317681ecd')}<span className="font-normal text-xs">{t('hr.admin_hr_staff_modal.text_88074b4610')}</span></label>
  <div className="relative">
    <input
    id="admin-hr-staff-temporary-password"
    aria-invalid={Boolean(errors.temporaryPassword)}
    aria-describedby={errors.temporaryPassword ? "admin-hr-staff-temporary-password-error" : undefined}
    type={showPassword ? "text" : "password"}
    placeholder={t('hr.admin_hr_staff_modal.text_ec85145d06')}
    {...register('temporaryPassword')}
    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base pr-10 motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
     data-testid="admin_hr-admin_hr-staff-modal-control-7"/>
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="min-h-11 min-w-11 absolute inset-y-0 right-3 flex items-center text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
      aria-label={t('hr.admin_hr_staff_modal.text_d23345a5c0')}
     data-testid="admin_hr-admin_hr-staff-modal-click-2">
      {showPassword ? <EyeOff size={18}  strokeWidth={2}/> : <Eye size={18}  strokeWidth={2}/>}
    </button>
  </div>
  {errors.temporaryPassword && <p id="admin-hr-staff-temporary-password-error" role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.temporaryPassword.message)}</p>}
  </div>

  <div className="sm:col-span-2 flex items-center justify-between p-4 border border-border rounded-xl bg-input">
    <div>
      <label className="block text-sm font-medium text-primary">{t('hr.admin_hr_staff_modal.text_c4de5302a4')}</label>
      <p className="text-xs text-secondary mt-0.5">{t('hr.admin_hr_staff_modal.text_a87f049aab')}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" {...register('isActive')} className="sr-only peer motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"  data-testid="admin_hr-admin_hr-staff-modal-control-8"/>
      <div className="w-11 h-6 bg-input peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary rounded-full peer peer-checked:after:left-6 peer-checked:after:border-border after:content-none after:absolute after:top-0 after:left-0 after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 motion-safe:after:transition-all peer-checked:bg-success-bg" data-testid="admin_hr-adminhrstaffmodal-status-1"></div>
    </label>
  </div>

  </div>
  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
  <button 
  type="button" 
  onClick={() => void handleClose()} 
  className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-secondary hover:bg-surface-highlight hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
   data-testid="admin_hr-admin_hr-staff-modal-click-3">
  {t('hr.admin_hr_staff_modal.text_77dfd2135f')}</button>
  <button 
  type="submit" 
  disabled={saving} 
  className="px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all hover:shadow-dialog motion-safe:active:scale-95 bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11" 
   data-testid="admin_hr-admin_hr-staff-modal-submit-2">
  {saving ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : <><Save size={18}  strokeWidth={2}/>{editId ? t('hr.admin_hr_staff_modal.auto_2b2af1dce8') : t('hr.admin_hr_staff_modal.auto_bf29a33490')}</>}
  </button>
  </div>
  </form>
  </div>
 </div>
 );
}
