// RESPONSIBILITY: Renders the Staff Directory editor with unique field associations and an accessible modal focus lifecycle.
'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, X, Save, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { STAFF_MODAL_FIELDS, GENDER_OPTIONS, STAFF_ROLE_OPTIONS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_shared.constants';
import { useManagerStaffPayrollAndAttendanceStaffForm } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryStaffForm';
import type { StaffFormValues } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_payroll_and_attendance_form.types';
import type { ManagerStaffPayrollAndAttendanceGender } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';

export default function ManagerStaffPayrollAndAttendanceStaffModal() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const { showModal, editId, form, handleClose, submit } = useManagerStaffPayrollAndAttendanceStaffForm();
  const [showPassword, setShowPassword] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleCloseRef = useRef(handleClose);
  handleCloseRef.current = handleClose;

  const { register, formState: { errors, isSubmitting } } = form;
  const localizedStaffRoleOptions = STAFF_ROLE_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }));
  const localizedGenderOptions = GENDER_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }));

  useEffect(() => {
    if (!showModal) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusableSelector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () => Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);

    (getFocusableElements()[0] ?? dialog)?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialog?.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialog?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleDialogKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDialogKeyDown);
      previousActiveElement?.focus();
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4">
      <div
        ref={dialogRef}
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-warning bg-overlay shadow-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-staff-directory-dialog-title"
        tabIndex={-1}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-overlay px-8 py-5">
          <h3 id="manager-staff-directory-dialog-title" className="text-xl font-bold text-text-primary">
            {editId ? t('TEXT_HR_EDIT_STAFF_TITLE') : t('TEXT_HR_ADD_STAFF_TITLE')}
          </h3>
          <button
            data-testid="manager_hr-manager-hr-staff-modal-close-1"
            type="button"
            onClick={handleClose}
            aria-label={t('COPY_CLOSE_STAFF_FORM')}
            className="rounded-full p-2 text-text-secondary hover:bg-primary-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <form data-testid="manager_hr-managerhrstaffmodal-form-1" onSubmit={submit} className="p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {STAFF_MODAL_FIELDS.map((field, mapIndex) => {
              const fieldId = `manager-staff-directory-field-${field.key}`;
              const fieldError = errors[field.key as keyof StaffFormValues];
              return (
                <div key={field.key} className={field.key === 'name' || field.key === 'address' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-text-primary">
                    {t(field.labelKey)}
                  </label>
                  <input
                    id={fieldId}
                    data-testid={`manager_hr-hr-managerhrstaffmodal-input-edit-staff-${mapIndex}`}
                    type={field.type}
                    placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
                    min={field.type === 'number' ? '0' : undefined}
                    maxLength={field.key === 'aadhaar' ? 12 : field.type === 'tel' ? 12 : undefined}
                    aria-invalid={fieldError ? 'true' : undefined}
                    aria-describedby={fieldError ? `${fieldId}-error` : undefined}
                    onKeyDown={field.type === 'number'
                      ? (event) => { if (['-', 'e', '+'].includes(event.key)) event.preventDefault(); }
                      : field.type === 'tel'
                        ? (event) => { if (['e', 'E', '-', '+', '.'].includes(event.key)) event.preventDefault(); }
                        : undefined}
                    className={`w-full rounded-xl border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${fieldError ? 'border-danger' : 'border-border'}`}
                    {...register(field.key as keyof StaffFormValues, field.type === 'number' ? { valueAsNumber: true } : {})}
                  />
                  {fieldError && (
                    <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-danger-text">
                      {String(fieldError.message ?? '')}
                    </p>
                  )}
                </div>
              );
            })}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">{t('COPY_ROLE_2')}</label>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown
                    ariaLabel={t('COPY_ROLE_2')}
                    dataTestId="manager_hr-managerhrstaffmodal-managersearchabledropdown-1"
                    value={String(field.value ?? '')}
                    onChange={field.onChange}
                    options={localizedStaffRoleOptions}
                    data-testid="manager_hr-managerhrstaffmodal-searchable-dropdown-1"
                  />
                )}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">{t('COPY_GENDER_1')}</label>
              <Controller
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown
                    ariaLabel={t('COPY_GENDER_1')}
                    dataTestId="manager_hr-managerhrstaffmodal-managersearchabledropdown-2"
                    value={String(field.value ?? '')}
                    onChange={(value) => field.onChange(value as ManagerStaffPayrollAndAttendanceGender)}
                    options={localizedGenderOptions}
                    data-testid="manager_hr-managerhrstaffmodal-searchable-dropdown-2"
                  />
                )}
              />
            </div>

            <div>
              <label htmlFor="manager-staff-directory-join-date" className="mb-1.5 block text-sm font-medium text-text-secondary">
                {t('COPY_JOIN_DATE_1')}
              </label>
              <input
                id="manager-staff-directory-join-date"
                data-testid="manager_hr-manager-hr-staff-modal-input-date"
                type="date"
                {...register('joinDate')}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>

            <div>
              <label htmlFor="manager-staff-directory-temporary-password" className="mb-1.5 block text-sm font-medium text-text-secondary">
                {t('COPY_TEMPORARY_PASSWORD')} <span className="text-xs font-normal">{t('COPY_OPTIONAL_EDIT')}</span>
              </label>
              <div className="relative">
                <input
                  id="manager-staff-directory-temporary-password"
                  data-testid="manager_hr-manager-hr-staff-modal-input-value"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('COPY_MIN_8_CHARACTERS')}
                  {...register('temporaryPassword')}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 pr-10 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  aria-invalid={errors.temporaryPassword ? 'true' : undefined}
                  aria-describedby={errors.temporaryPassword ? 'manager-staff-directory-temporary-password-error' : undefined}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  data-testid="manager_hr-manager-hr-staff-modal-button-close"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? t('TEXT_HR_HIDE_PASSWORD') : t('TEXT_HR_SHOW_PASSWORD')}
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                </button>
              </div>
              {errors.temporaryPassword && (
                <p id="manager-staff-directory-temporary-password-error" className="mt-1.5 text-xs text-danger-text">
                  {String(errors.temporaryPassword.message ?? '')}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 flex items-center justify-between rounded-xl border border-border bg-input p-4">
              <div>
                <label htmlFor="manager-staff-directory-is-active" className="block text-sm font-medium text-text-primary">
                  {t('COPY_LOGIN_ACCESS')}
                </label>
                <p className="mt-0.5 text-xs text-text-secondary">{t('COPY_ALLOW_STAFF_MEMBER_LOG_PORTAL')}</p>
              </div>
              <input
                id="manager-staff-directory-is-active"
                data-testid="manager_hr-manager-hr-staff-modal-input-checkbox-toggle"
                type="checkbox"
                {...register('isActive')}
                aria-label={t('COPY_LOGIN_ACCESS_ENABLED')}
                className="h-5 w-5 rounded border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-border pt-6">
            <button
              data-testid="manager_hr-manager-hr-staff-modal-close-2"
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-text-secondary hover:bg-primary-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {t('COPY_CANCEL_1')}
            </button>
            <button
              data-testid="manager_hr-manager-hr-staff-modal-button-submit"
              type="submit"
              disabled={isSubmitting}
              className="flex min-w-32 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-on-primary hover:brightness-110 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin motion-safe:animate-spin" /> : <Save size={18} />}
              {editId ? t('TEXT_HR_UPDATE_STAFF') : t('TEXT_HR_ADD_STAFF')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
