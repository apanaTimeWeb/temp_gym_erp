// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import { MANAGER_TRAINER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule.constants';
import type { ShiftFormValues } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_shift_form.types';

export const EMPTY_SHIFT_FORM: ShiftFormValues = { trainerId: '', day: 'Monday', startTime: '06:00', endTime: '12:00', status: MANAGER_TRAINER_SCHEDULE_STATUS_VALUES.ACTIVE, notes: '' };
