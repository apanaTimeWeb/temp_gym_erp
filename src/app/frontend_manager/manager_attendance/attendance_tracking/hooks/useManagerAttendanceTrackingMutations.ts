// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { ManagerToastType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/ManagerAttendanceTrackingLocalToastTypes';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalGetErrorMessage';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalIdempotency';

import { ManagerAttendanceTrackingApi } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.api';
import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { EMPTY_ATTENDANCE_FORM } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_form_defaults.constants';
import { ManagerAttendanceTrackingQueryKeys } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.query_keys';
import type { AttendanceFormValues } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_form.types';
import type { MemberSnapshot, StaffSnapshot } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_snapshot.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useManagerAttendanceTrackingMutations.
 * @dependencies Uses ManagerIdempotency, ManagerAttendanceTrackingApi, ManagerAttendanceTrackingFormTypes, ManagerAttendanceTrackingSnapshotTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerAttendanceTrackingMutations owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerAttendanceTrackingMutations(
  members: MemberSnapshot[],
  staff: StaffSnapshot[],
  setSaving: (s: boolean) => void,
  setShowModal: (s: boolean) => void,
  setForm: (f: typeof EMPTY_ATTENDANCE_FORM) => void,
  showToast: (msg: string, t: ManagerToastType) => void
) {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');
  const queryClient = useQueryClient();
  const markAttendanceKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const markAttendanceMutation = useMutation({
    mutationFn: async (data: AttendanceFormValues) => {
      const payloads: { memberId?: string; staffId?: string; date: string; checkIn?: string | Date; type: string; status?: string; }[] = [];
      const startDate = new Date(data.date);
      const endDate = (data.status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE && data.endDate) ? new Date(data.endDate) : startDate;

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0] || '';
        let checkInTime = data.checkIn;
        if (data.status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT && !checkInTime) {
          const now = new Date();
          checkInTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        }
        const checkInIso = data.type === 'MEMBER' && checkInTime
          ? new Date(`${dateStr}T${checkInTime}:00`)
          : undefined;
        const payload: Record<string, unknown> = { type: data.type, date: dateStr, status: data.status, checkIn: checkInIso };
        if (data.type === 'MEMBER') {
          payload.memberId = data.memberId || undefined;
          const member = data.memberId ? members.find((item) => String(item.id) === data.memberId) : undefined;
          if (member?.name) payload.member = { name: member.name };
        } else {
          payload.staffId = data.staffId || undefined;
          const staffMember = data.staffId ? staff.find((item) => String(item.id) === data.staffId) : undefined;
          if (staffMember?.name) payload.staff = { name: staffMember.name };
        }
        payloads.push(payload as { memberId?: string; staffId?: string; date: string; checkIn?: string | Date; type: string; status?: string; });
      }

      const idempotencyKey = markAttendanceKeyRef.current?.key ?? ManagerInfrastructureIdempotency();
      let responseMessage = '';
      for (const payload of payloads) {
        const response = await ManagerAttendanceTrackingApi.markAttendance(payload, `${idempotencyKey}:${payload.date}`);
        responseMessage = response.message;
      }
      return responseMessage;
    },
    onMutate: () => setSaving(true),
    onSuccess: (message) => {
      markAttendanceKeyRef.current = null;
      if (message) showToast(message, 'success');
      setShowModal(false);
      setForm(EMPTY_ATTENDANCE_FORM);
      void queryClient.invalidateQueries({ queryKey: ManagerAttendanceTrackingQueryKeys.all });
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false),
  });

  const markAttendance = async (data: AttendanceFormValues) => {
    const fingerprint = JSON.stringify(data);
    if (markAttendanceKeyRef.current?.fingerprint !== fingerprint) markAttendanceKeyRef.current = { fingerprint, key: ManagerInfrastructureIdempotency() };
    await markAttendanceMutation.mutateAsync(data);
  };

  return { markAttendance };
}
