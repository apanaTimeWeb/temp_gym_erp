'use client';
// DATA FLOW: Feature inputs and URL/local UI state → custom hook → module-owned API/TanStack Query or Zustand state → owning feature UI/result.

import { useCallback, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/ManagerAttendanceTrackingLocalEnvConfig';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalShowErrorToast';

import { ManagerAttendanceTrackingApi } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.api';
import { MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE, MANAGER_ATTENDANCE_TRACKING_QR_STATUS_EXPIRED } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { MANAGER_QR_DEMO_ACTIVE_TOKEN, MANAGER_QR_DEMO_EXPIRED_TOKEN, MANAGER_QR_INITIAL_HISTORY, MANAGER_QR_SCAN_DELAY_MS, MANAGER_QR_MOCK_ID_PREFIX, MANAGER_QR_STATUS_IDLE, MANAGER_QR_STATUS_SCANNING } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_qr_scanner.constants';
import { ManagerAttendanceTrackingQueryKeys } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.query_keys';
import type { ManagerQrScanStatus, ManagerQrScanHistoryRecord } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_qr_scanner.types';
import type { MemberSnapshot } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_snapshot.types';
import type { Attendance } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';


/** Runs the QR scanner state machine, resolves scanned members through Attendance APIs, and records check-ins through the same API path as the production Attendance module. */
/**
 * @description Manages the attendance feature behavior in `useManagerAttendanceTrackingQrScannerLogic`. Owns the feature-specific state/query/mutation orchestration declared by this hook and does not move business behavior into global application state.
 * @dependencies Uses useCallback, useState, useQueryClient, ManagerInfrastructureIdempotency, ManagerAttendanceTrackingApi; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves loading, error, empty, retry, cancellation, URL-state, and mutation-settlement behavior required by the owning feature; does not expose raw transport details to the UI.
 */
/**
 * @description Owns the Manager Attendance QR scanner state and attendance-event workflow.
 * @dependencies Uses module-owned QR fixtures/types plus the documented attendance mutation boundary.
 * @edge-case Handles repeated scans, invalid payloads, scanner cancellation, and submission failure safely.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerAttendanceTrackingQrScannerLogic owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerAttendanceTrackingQrScannerLogic() {
  const queryClient = useQueryClient();
  const checkInKeyRef = useRef<string | null>(null);
  const [status, setStatus] = useState<ManagerQrScanStatus>(MANAGER_QR_STATUS_IDLE);
  const [history, setHistory] = useState<ManagerQrScanHistoryRecord[]>([...MANAGER_QR_INITIAL_HISTORY]);
  const [currentMember, setCurrentMember] = useState<MemberSnapshot | null>(null);
  const [scanValue, setScanValue] = useState('');
  const [scanCounter, setScanCounter] = useState(10);

  const resolveMember = useCallback(async (rawScanValue: string) => {
    const normalized = rawScanValue.trim();
    if (!normalized) return;
    setScanValue(normalized);
    setStatus(MANAGER_QR_STATUS_SCANNING);
    try {
      const response = await ManagerAttendanceTrackingApi.fetchAttendanceMembers({ search: normalized });
      const matchedMember = response.data?.members?.find((member) =>
        String(member.id).toLowerCase() === normalized.toLowerCase() || member.name.toLowerCase() === normalized.toLowerCase(),
      );
      if (!matchedMember) { setCurrentMember(null); checkInKeyRef.current = null; setStatus(MANAGER_QR_STATUS_IDLE); ManagerInfrastructureShowErrorToast(new Error('No matching member was found'), 'manager-qr-member-not-found'); return; }
      setCurrentMember(matchedMember);
      setStatus(matchedMember.status === MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE ? MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE : MANAGER_ATTENDANCE_TRACKING_QR_STATUS_EXPIRED);
    } catch (error: unknown) {
      setCurrentMember(null);
      checkInKeyRef.current = null;
      setStatus(MANAGER_QR_STATUS_IDLE);
      ManagerInfrastructureShowErrorToast(error, 'manager-qr-resolve-error');
    }
  }, []);

  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    if (!ManagerEnvConfig.demoMode) return;
    const demoToken = simulateActive ? MANAGER_QR_DEMO_ACTIVE_TOKEN : MANAGER_QR_DEMO_EXPIRED_TOKEN;
    setScanValue(demoToken);
    setStatus(MANAGER_QR_STATUS_SCANNING);
    window.setTimeout(() => { void resolveMember(demoToken); }, MANAGER_QR_SCAN_DELAY_MS);
  }, [resolveMember]);

  const handleCheckIn = useCallback(async () => {
    if (!currentMember || currentMember.status !== MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE) return;
    try {
      checkInKeyRef.current ??= ManagerInfrastructureIdempotency();
      const response = await ManagerAttendanceTrackingApi.markAttendance({
        memberId: currentMember.id,
        date: new Date().toISOString().slice(0, 10),
        checkIn: new Date().toLocaleTimeString(),
        type: 'MEMBER',
      }, checkInKeyRef.current);
      const record: Attendance | null = response.data ?? null;
      setScanCounter((current) => current + 1);
      setHistory((current) => [
        {
          id: record?.id ?? `${MANAGER_QR_MOCK_ID_PREFIX}${scanCounter + 1}`,
          time: record?.checkIn ?? new Date().toLocaleTimeString(),
          name: record?.member?.name ?? currentMember.name,
        },
        ...current,
      ]);
      await queryClient.invalidateQueries({ queryKey: ManagerAttendanceTrackingQueryKeys.all });
      setStatus(MANAGER_QR_STATUS_IDLE);
      checkInKeyRef.current = null;
      setCurrentMember(null);
      setScanValue('');
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, 'manager-qr-checkin-error');
    }
  }, [currentMember, queryClient, scanCounter]);

  const resetStatus = useCallback(() => {
    setStatus(MANAGER_QR_STATUS_IDLE);
    setCurrentMember(null);
    setScanValue('');
  }, []);

  return {
    status,
    history,
    currentMember,
    scanValue,
    setScanValue,
    resolveMember,
    handleSimulateScan,
    handleCheckIn,
    resetStatus,
    demoMode: ManagerEnvConfig.demoMode,
  };
}
