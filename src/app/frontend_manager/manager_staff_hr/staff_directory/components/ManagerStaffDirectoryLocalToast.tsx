// RESPONSIBILITY: Presents and dismisses Staff Directory feedback without owning toast state or API behavior.
'use client';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

export interface ManagerStaffDirectoryToastValue {
  message: string;
  type: ManagerToastType;
}

export default function ManagerStaffDirectoryLocalToast({
  toast,
  onClose,
  dismissLabel,
}: {
  toast: ManagerStaffDirectoryToastValue | null;
  onClose: () => void;
  dismissLabel: string;
}) {
  if (!toast) return null;

  const toneClass = {
    success: 'border-success bg-success-bg text-success-text',
    error: 'border-danger bg-danger-bg text-danger-text',
    warning: 'border-warning bg-warning-bg text-warning-text',
    info: 'border-primary bg-primary-subtle text-primary',
  }[toast.type];

  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-xl border p-4 text-sm ${toneClass}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      data-testid="manager_hr-staff-directory-toast"
    >
      <p className="min-w-0 flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label={dismissLabel}
        className="shrink-0 rounded-md px-2 py-1 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        ×
      </button>
    </div>
  );
}
