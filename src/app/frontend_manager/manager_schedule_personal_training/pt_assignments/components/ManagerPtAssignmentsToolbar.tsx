// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { UserPlus } from 'lucide-react';

import type { ManagerPtAssignmentsToolbarProps } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments_toolbar.types';

/**
 * @description Renders the PT page heading and the primary assignment CTA. It owns presentation only; assignment state remains in the parent feature hook.
 * @dependencies Receives translated text and callback props from ManagerPtAssignmentsMain.
 * @edge-case Keeps the CTA keyboard-accessible and usable at narrow widths.
 */
export default function ManagerPtAssignmentsToolbar({ title, subtitle, actionLabel, onAssign }: ManagerPtAssignmentsToolbarProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
      </div>
      <button
        data-testid="manager_pt-manager-pt-main-button-action"
        type="button"
        onClick={onAssign}
        className="flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-on-primary shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 hover:bg-primary-hover"
      >
        <UserPlus size={18} strokeWidth={2} aria-hidden="true" />
        {actionLabel}
      </button>
    </div>
  );
}
