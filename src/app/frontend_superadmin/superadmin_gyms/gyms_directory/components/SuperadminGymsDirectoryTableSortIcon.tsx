// RESPONSIBILITY: Renders/orchestrates SuperadminGymsTableSortIcon within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsTableSortIcon owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_table_sort_icon.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the semantic sort indicator for a gym table column.
import { ArrowUpDown } from 'lucide-react';

import type { SuperadminGymsTableSortIconProps } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_table_sort_icon.types';


/**
 * @description Renders GymsTableSortIcon within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryTableSortIcon({ active }: SuperadminGymsTableSortIconProps) {
  return <ArrowUpDown size={18} className={`ms-1 inline ${active ? 'text-primary' : 'text-disabled'}`} aria-hidden="true"/>;
}

