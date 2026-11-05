// RESPONSIBILITY: Centralized constants, Zod schema, and mock data for the Schedule module.
/**
 * @description Provides the ManagerTrainerScheduleSharedConstants implementation for the schedule module.
 * @dependencies @/app/frontend_manager/manager_schedule_personal_training/manager_schedule_types/ManagerTrainerScheduleTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const SHIFT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const SCHEDULE_SHIFT_STATUS_VALUES = ['Active', 'Off', 'Leave'] as const;

export const SHIFT_STATUS_OPTIONS = SCHEDULE_SHIFT_STATUS_VALUES;

export const SHIFT_STATUS_STYLES: Record<(typeof SCHEDULE_SHIFT_STATUS_VALUES)[number], { text: string; bg: string }> = {
  Active: { text: 'text-success-text', bg: 'bg-success-bg' },
  Off:    { text: 'text-text-secondary', bg: 'bg-input' },
  Leave:  { text: 'text-warning-text', bg: 'bg-warning-bg' } };

export const TIME_OPTIONS: string[] = [
  '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00',
];
