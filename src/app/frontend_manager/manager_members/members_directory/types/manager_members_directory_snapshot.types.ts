import type { MANAGER_MEMBERS_DIRECTORY_PAYMENT_STATUS_VALUES as MEMBER_PAYMENT_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
export type ManagerMembersDirectoryPaymentStatus = typeof MEMBER_PAYMENT_STATUS_VALUES[keyof typeof MEMBER_PAYMENT_STATUS_VALUES];
export type ManagerMembersDirectoryDietPlanType = 'WEIGHT_LOSS' | 'MUSCLE_GAIN' | 'MAINTENANCE' | 'KETO' | 'VEGAN' | 'OTHER';
export type ManagerMembersDirectoryWorkoutLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type ManagerMembersDirectoryAttendancePersonType = 'MEMBER' | 'STAFF';

export interface PlanSnapshot {
  id: string;
  name: string;
  price1Month: number;
  price3Month: number;
  price6Month: number;
  price12Month: number;
  priceCustom?: number;
}

export interface PaymentSnapshot {
  id: string;
  amount: number;
  paidAt: string;
  method: string;
  status: ManagerMembersDirectoryPaymentStatus;
  invoiceNumber: string;
}

export interface DietPlanSnapshot {
  id: string;
  name: string;
  description: string;
  type: ManagerMembersDirectoryDietPlanType;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: {
    name: string;
    time: string;
    calories: number;
    foods: string[];
  }[];
}

export interface WorkoutSnapshot {
  id: string;
  name: string;
  description: string;
  level: ManagerMembersDirectoryWorkoutLevel;
  daysPerWeek: number;
  goal: string;
  days: {
    day: number | string;
    focus: string;
    exercises: {
      name: string;
      sets: number;
      reps: number;
      notes?: string;
    }[];
  }[];
}

export interface AttendanceSnapshot {
  id: string;
  date: string;
  checkIn: string;
  type: ManagerMembersDirectoryAttendancePersonType;
}
