// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDetailRow within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailRow owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_row.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders one labeled value row inside a Superadmin gym detail section.
import { displayValue } from '@/lib/display_value';

import type { SuperadminGymsGymDetailRowProps } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_row.types';


/** @description Renders a labeled read-only gym detail row. @dependencies Receives already-formatted label/value presentation props. @edge-case Applies emphasis styling only when explicitly requested by the parent detail section. */
export default function SuperadminGymsDetailRow({ label, value, emphasis = false, emphasisWarning = false }: SuperadminGymsGymDetailRowProps) {
  return <div className="flex items-start justify-between gap-4"><span className="shrink-0 text-secondary">{label}</span><span className={`min-w-0 truncate text-end font-medium ${(() => { if (emphasisWarning) { return ('text-warning'); } if (emphasis) { return ('text-danger'); } return ('text-primary'); })()}`}>{displayValue(value)}</span></div>;
}

