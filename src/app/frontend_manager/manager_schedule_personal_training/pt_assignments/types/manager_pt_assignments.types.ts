// RESPONSIBILITY: TypeScript types for the Manager PT (Personal Training) module.
// CRITICAL additions: PtSessionLog interface, sessionsRemaining, nextSessionDate,
// paymentStatus, amountPaid, totalAmount on PtAssignment — needed for PT revenue tracking.

import type { PT_SESSION_STATUS_VALUES, PT_PAYMENT_STATUS_VALUES, PT_TRAINER_AVAILABILITY_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments.constants';
export type PtSessionStatus = typeof PT_SESSION_STATUS_VALUES[number];
export type PtPaymentStatus = typeof PT_PAYMENT_STATUS_VALUES[number];
export type ManagerPtAssignmentsTrainerAvailabilityStatus = typeof PT_TRAINER_AVAILABILITY_STATUS_VALUES[number];
export type PtActiveTab = 'dashboard' | 'assignments' | 'packages' | 'workload';

export interface PtPackage {
  id: string;
  name: string;
  sessionCount: number;
  durationDays: number;
  price: number;
  description: string;
}

// CRITICAL — PtSessionLog was entirely missing. PT revenue tracking impossible without this.
export interface PtSessionLog {
  id: string;
  assignmentId: string;
  sessionDate: string;
  status: PtSessionStatus;
  trainerNotes?: string;
  memberFeedback?: string;
  sessionNumber: number;   // 1-based index within the package (e.g. "Session 3 of 10")
  durationMinutes?: number;
  location?: string;
}

export interface PtAssignmentsResponse {
  assignments: PtAssignment[];
  total: number;
  page: number;
  limit: number;
}

export interface PtAssignment {
  id: string;
  memberId: string;
  memberName: string;
  trainerId: string;
  trainerName: string;
  packageId: string;
  packageName: string;
  totalSessions: number;
  completedSessions: number;
  startDate: string;
  endDate: string;
  // CRITICAL — missing fields that make PT revenue tracking impossible
  sessionsRemaining: number;
  nextSessionDate?: string;
  paymentStatus: PtPaymentStatus;
  amountPaid: number;
  totalAmount: number;
}

export interface PtTrainerWorkload {
  trainerId: string;
  trainerName: string;
  activeClients: number;
  totalSessionsConducted: number;
  rating: number;
  status: ManagerPtAssignmentsTrainerAvailabilityStatus;
}

export interface PtDashboardKpis {
  totalActiveAssignments: number;
  sessionsScheduledToday: number;
  packagesExpiringSoon: number;
  monthlyPtRevenue: number;
}

export interface CreatePtAssignmentPayload {
  memberId: string;
  trainerId: string;
  packageId: string;
  startDate: string;
}

export type ManagerPtAssignmentsViewId = PtActiveTab;
