// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useEffect, useRef, useState } from 'react';
import { X, ScanLine, UserCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { MANAGER_QR_STATUS_LABELS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_qr_scanner.constants';
import { useManagerAttendanceTrackingQrScannerLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingQrScannerLogic';
import { ManagerAttendanceTrackingDisplayValue } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingFormatters';
import type { ManagerAttendanceTrackingQrScannerModalProps } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_qr_scanner.types';


/** @description Renders the ManagerAttendanceTrackingQrScannerModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerAttendanceTrackingQrScannerModal({ open, onClose }: ManagerAttendanceTrackingQrScannerModalProps) {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  const { status, history, currentMember, scanValue, setScanValue, resolveMember, handleSimulateScan, handleCheckIn, resetStatus, demoMode } = useManagerAttendanceTrackingQrScannerLogic();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    if (!open) {
      setHasCamera(false);
      return;
    }
    let stream: MediaStream | null = null;
    let active = true;

    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          if (!active) {
            s.getTracks().forEach((track) => track.stop());
            return;
          }
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setHasCamera(true);
          }
        })
        .catch(() => {
          setHasCamera(false);
        });
    }

    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    // z-40 = Modal layer per Design §12 Z-Index Scale
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-overlay-backdrop backdrop-blur-sm motion-safe:transition-all motion-safe:duration-200 ease-in-out">
      <div className="w-full max-w-5xl max-h-screen bg-overlay rounded-3xl shadow-dialog overflow-hidden flex flex-col md:flex-row border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95" role="dialog" aria-modal="true" aria-labelledby="managerattendanceqrscannermodal-dialog-title">

        {/* Left Side — The Scanner Viewport */}
        <div className="flex-1 bg-overlay-backdrop relative flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border min-h-96">
          <button data-testid="manager_attendance-manager-qr-scanner-close"
            onClick={onClose}
            aria-label={t("COPY_CLOSE_SCANNER")}
            className="absolute top-6 left-6 p-3 bg-page hover:bg-page text-on-primary rounded-full motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
           type="button">
            <X size={18} strokeWidth={2}/>
          </button>

          <h2 className="absolute top-8 text-xl font-bold text-on-primary tracking-widest uppercase opacity-80" id="managerattendanceqrscannermodal-dialog-title">{t("COPY_FRONT_DESK_KIOSK")}</h2>

          {/* Scanner Frame — corner markers + animated scan line */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10 rounded-2xl overflow-hidden bg-black/40">
            {hasCamera && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                aria-label="QR Camera stream"
                className="w-full h-full object-cover"
              />
            )}
            {/* Corner Markers — gold accent per Design §1 primary color */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl z-10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl z-10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl z-10" />

            {/* Scanning Line — motion-safe guarded per Design §29 */}
            {(status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.IDLE || status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.SCANNING) && (
              <div className="absolute top-0 left-0 w-full h-1 bg-primary-subtle motion-safe:animate-qr-scan z-10" />
            )}

            {/* Center Icon Watermark */}
            {!hasCamera && (
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <ScanLine size={18} strokeWidth={2} className="text-on-primary"/>
              </div>
            )}
          </div>

          <p className="text-on-primary mb-6 font-medium text-center max-w-xs">{t("COPY_ALIGN_MEMBERAPOSS_QR_CODE_WITHIN_FRAME_SCAN")}</p>

          <form
            data-testid="manager_attendance-managerattendanceqrscannermodal-form-1"
            onSubmit={(event) => { event.preventDefault(); void resolveMember(scanValue); }}
            className="w-full max-w-sm mb-4 space-y-2"
          >
            <label htmlFor="manager-qr-value" className="block text-sm font-medium text-on-primary text-center">{t("COPY_SCAN_ENTER_MEMBER_QR_VALUE")}</label>
            <div className="flex gap-2">
              <input data-testid="manager_attendance-manager-qr-scanner-manager-qr-value"
                id="manager-qr-value"
                value={scanValue}
                onChange={(event) => setScanValue(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-border bg-page px-4 py-3 text-sm text-on-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                placeholder={t("COPY_MEMBER_ID_SCANNER_PAYLOAD")}
                autoComplete="off"
              />
              <button data-testid="manager_attendance-manager-qr-scanner-button-submit" type="submit" aria-label={t("COPY_SCAN")} disabled={!scanValue.trim() || status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.SCANNING} className="px-4 py-3 rounded-xl bg-primary text-on-primary text-sm font-bold disabled:opacity-50 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_SCAN")}</button>
            </div>
          </form>

          {/* Demo simulator — intentionally hidden unless explicit demo mode is enabled. */}
          {demoMode && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button data-testid="manager_attendance-manager-qr-scanner-button-simulate-scan-1"
              onClick={() => handleSimulateScan(true)}
              disabled={status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.SCANNING}
              aria-label={t("COPY_SIMULATE_ACTIVE_MEMBER_SCAN")}
              className="px-6 py-3 bg-page hover:bg-page text-on-primary text-sm font-bold rounded-xl motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
             type="button">{t("COPY_SIMULATE_ACTIVE")}</button>
            <button data-testid="manager_attendance-manager-qr-scanner-button-simulate-scan-2"
              onClick={() => handleSimulateScan(false)}
              disabled={status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.SCANNING}
              aria-label={t("COPY_SIMULATE_EXPIRED_MEMBER_SCAN")}
              className="px-6 py-3 bg-page hover:bg-page text-on-primary text-sm font-bold rounded-xl motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
             type="button">{t("COPY_SIMULATE_EXPIRED")}</button>
          </div>
          )}
        </div>

        {/* Right Side — Verification Panel + History */}
        <div className="w-full md:w-96 flex flex-col overflow-hidden">

          {/* Verification Panel */}
          <div className="p-6 border-b border-border flex flex-col justify-center min-h-72">
            {status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.IDLE && (
              <div className="flex flex-col items-center justify-center text-center text-text-secondary h-full">
                <ScanLine size={18} strokeWidth={2} className="mb-4 opacity-20"/>
                <p className="text-lg font-medium">{t("COPY_WAITING_SCAN")}</p>
              </div>
            )}

            {status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.SCANNING && (
              <div className="flex flex-col items-center justify-center text-center text-text-primary h-full">
                <Loader2 size={18} strokeWidth={2} className="mb-4 motion-safe:animate-spin"/>
                <p className="text-lg font-bold">{t("COPY_VERIFYING")}</p>
              </div>
            )}

            {(status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE || status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.EXPIRED) && (
              <div className="flex flex-col items-center text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
                {/* Traffic Light Avatar — green border = active, red border = expired */}
                <div className={`w-32 h-32 rounded-full mb-4 border-4 overflow-hidden relative ${status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE ? 'border-success' : 'border-danger'}`}>
                  {/* next/image mandatory per Rule 33 */}
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-primary bg-primary-subtle" aria-hidden="true">
                    {(currentMember?.name?.charAt(0) ?? '?').toUpperCase()}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-text-primary">{ManagerAttendanceTrackingDisplayValue(currentMember?.name)}</h3>
                <p className="text-sm font-bold text-text-secondary mb-1">{ManagerAttendanceTrackingDisplayValue(currentMember?.id)}</p>

                {/* Status Badge — label from constants, not magic strings (Rule 35) */}
                <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE ? 'bg-success text-on-success' : 'bg-danger text-on-danger'}`} data-testid="manager_attendance-managerattendanceqrscannermodal-status-badge-1">
                  {status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE ? <UserCheck size={18} strokeWidth={2}/> : <AlertCircle size={18} strokeWidth={2}/>}
                  {t(MANAGER_QR_STATUS_LABELS[status])}
                </div>

                {/* Yellow upsell banner — only shown for active members with PT info */}
                {status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE && demoMode && (
                  <p className="text-xs text-on-warning font-medium mt-3 bg-warning px-3 py-1 rounded-lg">
                    {currentMember?.planName ? `Plan: ${currentMember.planName}` : t('COPY_MEMBERSHIP_DETAILS_AVAILABLE')}
                  </p>
                )}

                <div className="mt-8 w-full">
                  {status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ACTIVE ? (
                    <button data-testid="manager_attendance-manager-qr-scanner-check-in"
                      onClick={handleCheckIn}
                      className="w-full py-4 bg-success hover:bg-success text-on-success text-lg font-black rounded-2xl motion-safe:transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-success flex items-center justify-center gap-2 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring hover:brightness-110"
                     type="button">
                      <UserCheck size={18} strokeWidth={2}/>{t("COPY_VERIFY_FACE_AMP_CHECK")}</button>
                  ) : (
                    <button data-testid="manager_attendance-manager-qr-scanner-status"
                      onClick={resetStatus}
                      className="w-full py-4 bg-danger hover:bg-danger text-on-danger text-lg font-black rounded-2xl motion-safe:transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-danger flex items-center justify-center gap-2 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring hover:brightness-110"
                     type="button">
                      <AlertCircle size={18} strokeWidth={2}/>{t("COPY_BLOCK_AMP_COLLECT_PAYMENT")}</button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recent Check-ins History Panel */}
          <div className="flex-1 bg-input p-6 overflow-y-auto">
            <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">{t("COPY_RECENT_CHECK_INS")}</h4>
            <div className="space-y-3">
              {/* Rule 55: key={h.id} — stable unique ID, NOT array index */}
              {history.map((h) => (
                <div key={h.id} className="bg-overlay border border-border p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold">
                      {h.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{h.name}</p>
                      <p className="text-xs text-text-secondary">{h.id}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-secondary bg-input px-2 py-1 rounded-md">{h.time}</span>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-center text-sm text-text-secondary mt-8">{t("COPY_NO_RECENT_CHECK_INS")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
