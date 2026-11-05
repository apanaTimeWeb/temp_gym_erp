import type { QueryStatus } from '@tanstack/react-query';

import type { ManagerToastType } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/ManagerTrainerScheduleLocalToastTypes';

import type { ManagerTrainerScheduleViewId } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_view.types';
import type { SHIFT_DAYS, SCHEDULE_SHIFT_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_shared.constants';

export type ShiftDay = typeof SHIFT_DAYS[number];
export type ShiftStatus = typeof SCHEDULE_SHIFT_STATUS_VALUES[number];

// ─── Trainer Shift ────────────────────────────────────────────────────────────
export interface TrainerShift {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerRole: string;
  day: ShiftDay;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  notes?: string;
  // HIGHLY RECOMMENDED — needed for multi-location gyms and leave management
  location?: string;
  substituteTrainerId?: string;   // if on leave, who covers
}

// ─── Trainer Schedule Summary ─────────────────────────────────────────────────
export interface TrainerScheduleSummary {
  trainerId: string;
  trainerName: string;
  trainerRole: string;
  isActive: boolean;
  shifts: TrainerShift[];
  totalShiftsPerWeek: number;
  totalHoursPerWeek: number;
}

// ─── Schedule KPIs ────────────────────────────────────────────────────────────
export interface ScheduleKPIData {
  totalTrainers: number;
  trainersOnDutyToday: number;
  trainersOnLeaveToday: number;
  totalShiftsThisWeek: number;
  // HIGHLY RECOMMENDED — class occupancy metrics
  totalClassesThisWeek: number;
  avgOccupancyRate: number;       // percentage e.g. 78.5
  totalEnrolledMembers: number;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────
export interface CreateShiftDto {
  trainerId: string;
  day: ShiftDay;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  notes?: string;
  location?: string;
  substituteTrainerId?: string;
}

export interface UpdateShiftDto extends Partial<CreateShiftDto> {}

// ─── Context ──────────────────────────────────────────────────────────────────
export interface ManagerTrainerScheduleViewModel {
  view: ManagerTrainerScheduleViewId;
  setView: (view: ManagerTrainerScheduleViewId) => void;
  trainers: TrainerScheduleSummary[];
  kpis: ScheduleKPIData | null;
  status: QueryStatus;
  error: string;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  selectedDay: ShiftDay | 'All';
  setSelectedDay: (day: ShiftDay | 'All') => void;
  search: string;
  setSearch: (s: string) => void;
  // Modal state
  shiftModal: { open: boolean; editShift: TrainerShift | null; trainerId: string | null };
  openAddShift: (trainerId: string) => void;
  openEditShift: (shift: TrainerShift) => void;
  closeShiftModal: () => void;
  saving: boolean;
  saveShift: (data: CreateShiftDto) => Promise<void>;
  deleteShift: (id: string) => Promise<void>;
}
