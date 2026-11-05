import { TRAINER_SCHEDULE_SCREEN_VIEWS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';

// RESPONSIBILITY: Defines static Schedule UI configuration and status presentation tokens.
export const TRAINER_SCHEDULE_STATUS = { PENDING: 'PENDING', APPROVED: 'APPROVED', REJECTED: 'REJECTED' } as const;
export const TRAINER_SCHEDULE_DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export const TRAINER_SCHEDULE_LEAVE_STATUS_VALUES = [TRAINER_SCHEDULE_STATUS.PENDING, TRAINER_SCHEDULE_STATUS.APPROVED, TRAINER_SCHEDULE_STATUS.REJECTED] as const;
export const TRAINER_SCHEDULE_STATUS_STYLES = {
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning' },
  APPROVED: { bg: 'bg-success-bg', text: 'text-success' },
  REJECTED: { bg: 'bg-danger-bg', text: 'text-danger' },
} as const;

export const TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE = {
  bg: 'bg-input',
  text: 'text-secondary',
} as const;

export const TRAINER_SCHEDULE_DEFAULT_AVAILABILITY_TIMES = {
  startTime: '06:00',
  endTime: '18:00',
} as const;

export const TRAINER_SCHEDULE_SCHEDULE_TAB_IDS = TRAINER_SCHEDULE_SCREEN_VIEWS;
export const TRAINER_SCHEDULE_WEEKLY_AVAILABILITY_TIME_FIELDS = ['startTime', 'endTime'] as const;
export const TRAINER_SCHEDULE_LEAVE_TYPE_VALUES = ['Sick Leave', 'Casual Leave', 'Emergency', 'Personal', 'Other'] as const;
export const TRAINER_SCHEDULE_LEAVE_TYPE_OPTIONS = [
  { value: TRAINER_SCHEDULE_LEAVE_TYPE_VALUES[0], labelKey: 'TEXT_SICK_LEAVE' },
  { value: TRAINER_SCHEDULE_LEAVE_TYPE_VALUES[1], labelKey: 'TEXT_CASUAL_LEAVE' },
  { value: TRAINER_SCHEDULE_LEAVE_TYPE_VALUES[2], labelKey: 'TEXT_EMERGENCY_LEAVE' },
  { value: TRAINER_SCHEDULE_LEAVE_TYPE_VALUES[3], labelKey: 'TEXT_PERSONAL_LEAVE' },
  { value: TRAINER_SCHEDULE_LEAVE_TYPE_VALUES[4], labelKey: 'TEXT_OTHER_LEAVE' },
] as const;

export const TRAINER_SCHEDULE_LEAVE_TABLE_HEADERS = [['TEXT_ID', 'id'], ['TEXT_DATE_RANGE', 'date'], ['TEXT_REASON', 'reason'], ['TEXT_STATUS', 'status'], ['TEXT_REQUESTED_ON', 'createdAt']] as const;
export const TRAINER_SCHEDULE_LEAVE_TABLE_COLUMN_COUNT = TRAINER_SCHEDULE_LEAVE_TABLE_HEADERS.length;
