/** Canonical module-level constant registry for manager_schedule; child constant files remain the source of individual entries. */
export const ManagerTrainerScheduleConstants = {} as const;

export const MANAGER_TRAINER_SCHEDULE_STATUS_VALUES = {
  ACTIVE: 'Active',
  LEAVE: 'Leave',
  PENDING: 'pending',
  OFF: 'Off',
  ERROR: 'error',
} as const;
