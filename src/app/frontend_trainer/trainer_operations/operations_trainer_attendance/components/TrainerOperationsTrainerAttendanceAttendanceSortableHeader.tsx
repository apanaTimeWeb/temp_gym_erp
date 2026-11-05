"use client";
// RESPONSIBILITY: Renders one sortable Attendance column header and exposes the active sort direction accessibly.
// DATA FLOW: Table sort state + column label → accessible sort button → table sort callback.

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import type { TrainerAttendanceSortableHeaderProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceSortableHeaderProps';




/**
 * @description Renders one sortable Attendance column header and exposes the active sort direction accessibly.
 * @dependencies Table sort state + column label → accessible sort button → table sort callback.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the attendance feature header/section controls while keeping business logic inside the owning module.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceSortableHeader({
  label,
  field,
  sortBy,
  sortDirection,
  onSort,
  sortLabel,
}: TrainerAttendanceSortableHeaderProps) {
  const active = field === sortBy;
  const Icon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <th scope="col" aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'} className="px-4 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
      <button
        type="button"
        onClick={() => onSort(field)}
        aria-label={`${sortLabel} (${active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'not sorted'})`}
        className="min-w-11 min-h-11 inline-flex items-center gap-1.5 rounded motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
        data-testid={`trainer_attendance-sortable-header-${field}`}
      >
        <span>{label}</span>
        <Icon size={18} strokeWidth={2} aria-hidden="true" className={active ? 'text-primary' : 'text-secondary'} />
      </button>
    </th>
  );
}
