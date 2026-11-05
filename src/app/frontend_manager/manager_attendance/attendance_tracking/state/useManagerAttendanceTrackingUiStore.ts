// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ManagerToastType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/ManagerAttendanceTrackingLocalToastTypes';

import { EMPTY_ATTENDANCE_FORM } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_form_defaults.constants';
import type { AttendanceTab } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';
import type { AttendanceFormValues } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_form.types';
import type { ManagerAttendanceTrackingPersonType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';


type CalendarUser = { id: string; name: string; type: ManagerAttendanceTrackingPersonType } | null;

interface ManagerAttendanceTrackingUiState {
  toast: { message: string; type: ManagerToastType } | null;
  saving: boolean;
  showModal: boolean;
  calendarUser: CalendarUser;
  form: AttendanceFormValues;
  setToast: (toast: { message: string; type: ManagerToastType } | null) => void;
  setSaving: (saving: boolean) => void;
  setShowModal: (show: boolean) => void;
  setCalendarUser: (user: CalendarUser) => void;
  setForm: (form: AttendanceFormValues | ((previous: AttendanceFormValues) => AttendanceFormValues)) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  resetForAdd: () => void;
}

/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useManagerAttendanceTrackingUiStore.
 * @dependencies Uses ManagerAttendanceTrackingFormTypes, ManagerAttendanceTrackingTypes, ManagerAttendanceTrackingSharedConstants, ManagerToastTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerAttendanceTrackingUiStore = create<ManagerAttendanceTrackingUiState>((set) => ({
  toast: null,
  saving: false,
  showModal: false,
  calendarUser: null,
  form: EMPTY_ATTENDANCE_FORM,
  setToast: (toast) => set({ toast }),
  setSaving: (saving) => set({ saving }),
  setShowModal: (showModal) => set({ showModal }),
  setCalendarUser: (calendarUser) => set({ calendarUser }),
  setForm: (form) => set((state) => ({ form: typeof form === 'function' ? form(state.form) : form })),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  resetForAdd: () => set({ form: EMPTY_ATTENDANCE_FORM, calendarUser: null, showModal: true }) }));

export type { AttendanceTab };
