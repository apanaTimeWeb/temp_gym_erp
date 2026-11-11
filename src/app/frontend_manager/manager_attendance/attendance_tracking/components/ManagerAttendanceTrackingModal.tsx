// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { useManagerAttendanceTrackingForm } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingForm';


/** @description Renders the ManagerAttendanceTrackingModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerAttendanceTrackingModal() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  const { showModal, setShowModal, members, staff, tab, form, handleClose, submit, watchType, watchStatus, todayDate } = useManagerAttendanceTrackingForm();
  const { register, control, formState: { errors, isSubmitting } } = form;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto">
      <div className="my-auto bg-overlay rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden border border-border" role="dialog" aria-modal="true" aria-labelledby="managerattendancemodal-dialog-title">
        <div className="flex justify-between items-center p-5 border-b border-border shrink-0 bg-overlay">
          <h3 className="font-bold text-lg text-text-primary" id="managerattendancemodal-dialog-title">{t("COPY_RECORD_ATTENDANCE")}</h3>
          <button data-testid="manager_attendance-attendance-modal-close-1" 
            type="button"
            aria-label={t("COPY_CLOSE_ATTENDANCE_FORM")}
            onClick={handleClose} 
            className="min-h-11 min-w-11 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          >
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <form data-testid="manager_attendance-managerattendancemodal-form-1" onSubmit={submit} className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1 min-h-0">
          
          {tab === 'Daily Attendance Report' && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t("COPY_USER_TYPE")}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input data-testid="manager_attendance-attendance-modal-input-radio-select-1" type="radio" value="MEMBER" {...register('type')} className="text-text-primary focus-visible:ring-focus-ring h-4 w-4" />
                  <span className="text-sm font-medium text-text-primary">{t("COPY_MEMBER")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input data-testid="manager_attendance-attendance-modal-input-radio-select-2" type="radio" value="STAFF" {...register('type')} className="text-text-primary focus-visible:ring-focus-ring h-4 w-4" />
                  <span className="text-sm font-medium text-text-primary">{t("COPY_STAFF")}</span>
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {watchType === 'MEMBER' ? t('COPY_SELECT_MEMBER') : t('COPY_SELECT_STAFF')}
            </label>
            {watchType === 'MEMBER' ? (
                <Controller
                  name="memberId"
                  control={control}
                  render={({ field }) => (
                    <ManagerSearchableDropdown ariaLabel={t('COPY_SELECT_MEMBER')} ariaInvalid={Boolean(errors.memberId)} ariaDescribedBy={errors.memberId ? 'managerattendancemodal-memberId-error' : undefined} dataTestId="manager_attendance-managerattendancemodal-managersearchabledropdown-1"
                      options={members.filter(m => !('role' in m) && !('salary' in m)).map(m => ({ label: `${m.name} (${m.phone})`, value: String(m.id) }))}
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder={t("COPY_SEARCH_MEMBER")}
                      
                     data-testid="manager_attendance-managerattendancemodal-searchable-dropdown-1"/>
                  )}
                />
            ) : (
                <Controller
                  name="staffId"
                  control={control}
                  render={({ field }) => (
                    <ManagerSearchableDropdown ariaLabel={t('COPY_SELECT_STAFF')} ariaInvalid={Boolean(errors.staffId)} ariaDescribedBy={errors.staffId ? 'managerattendancemodal-staffId-error' : undefined} dataTestId="manager_attendance-managerattendancemodal-managersearchabledropdown-2"
                      options={staff.filter(s => ('role' in s) || ('salary' in s) || !('planId' in s)).map(s => ({ label: `${s.name} - ${((s as unknown) as { role?: string }).role || t('COPY_STAFF')}`, value: String(s.id) }))}
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder={t("COPY_SEARCH_STAFF")}
                      
                     data-testid="manager_attendance-managerattendancemodal-searchable-dropdown-2"/>
                  )}
                />
            )}
            {errors.memberId && watchType === 'MEMBER' && <p className="text-danger-text text-xs mt-1">{errors.memberId.message}</p>}
            {errors.staffId && watchType === 'STAFF' && <p className="text-danger-text text-xs mt-1">{errors.staffId.message}</p>}
          </div>

          {watchType === 'STAFF' && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t("COPY_STATUS_2")}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                  <input data-testid="manager_attendance-attendance-modal-input-radio-select-3" type="radio" value={MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT} {...register('status')} className="text-text-primary focus-visible:ring-focus-ring" aria-invalid={errors.status ? 'true' : undefined} aria-describedby={errors.status ? 'managerattendancemodal-status-error' : undefined} />{t("COPY_PRESENT_3")}</label>
                <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                  <input data-testid="manager_attendance-attendance-modal-input-radio-select-4" type="radio" value={MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE} {...register('status')} className="text-text-primary focus-visible:ring-focus-ring" aria-invalid={errors.status ? 'true' : undefined} aria-describedby={errors.status ? 'managerattendancemodal-status-error' : undefined} />{t("COPY_LEAVE_1")}</label>
              </div>
              {errors.status && <p id="managerattendancemodal-status-error" className="text-danger-text text-xs mt-1">{errors.status.message}</p>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="manager-managerattendancemodal-field-1" className="block text-sm font-medium text-text-secondary mb-1">
                {watchStatus === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE ? t('COPY_START_DATE') : t('COPY_DATE')}
              </label>
              <input id="manager-managerattendancemodal-field-1" data-testid="manager_attendance-attendance-modal-input-date-1" 
                type="date" 
                min={watchStatus !== MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE ? todayDate : undefined}
                max={watchStatus !== MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE ? todayDate : undefined}
                readOnly={watchStatus !== MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE}
                {...register('date')}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-text-primary ${watchStatus !== MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE ? 'border-dashed cursor-default' : ''}`} aria-invalid={errors.date ? 'true' : undefined} aria-describedby={errors.date ? 'managerattendancemodal-date-error' : undefined} />
              {errors.date && <p id="managerattendancemodal-date-error" className="text-danger-text text-xs mt-1">{errors.date.message}</p>}
            </div>
            {watchStatus === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE && (
              <div>
                <label htmlFor="manager-managerattendancemodal-field-2" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_END_DATE_OPTIONAL")}</label>
                <input id="manager-managerattendancemodal-field-2" data-testid="manager_attendance-attendance-modal-input-date-2" 
                  type="date" 
                  {...register('endDate')}
                  className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                    errors.endDate ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                  } bg-input text-text-primary`} aria-invalid={errors.endDate ? 'true' : undefined} aria-describedby={errors.endDate ? 'managerattendancemodal-endDate-error' : undefined} />
                {errors.endDate && <p id="managerattendancemodal-endDate-error" className="text-danger-text text-xs mt-1">{errors.endDate.message}</p>}
              </div>
            )}
            {watchStatus === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT && (
              <div>
                <label htmlFor="manager-managerattendancemodal-field-3" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_CHECK_TIME")}</label>
                <input id="manager-managerattendancemodal-field-3" data-testid="manager_attendance-attendance-modal-input-time" 
                  type="time" 
                  {...register('checkIn')}
                  className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                    errors.checkIn ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                  } bg-input text-text-primary`} aria-invalid={errors.checkIn ? 'true' : undefined} aria-describedby={errors.checkIn ? 'managerattendancemodal-checkIn-error' : undefined} />
                {errors.checkIn && <p id="managerattendancemodal-checkIn-error" className="text-danger-text text-xs mt-1">{errors.checkIn.message}</p>}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex justify-end gap-3 z-10 shrink-0">
            <button data-testid="manager_attendance-attendance-modal-close-2" 
              type="button" 
              onClick={handleClose} 
              className="px-4 py-2 border border-border rounded-lg font-medium text-text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            >{t("COPY_CANCEL")}</button>
            <button data-testid="manager_attendance-attendance-modal-button-submit" 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-32 px-4 py-2 rounded-lg font-medium text-on-primary bg-primary flex items-center gap-2 motion-safe:transition-all hover:bg-primary-hover disabled:opacity-70 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" 
            >
              {isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/> : <><CheckCircle size={18} strokeWidth={2}/>{t("COPY_CHECK")}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
