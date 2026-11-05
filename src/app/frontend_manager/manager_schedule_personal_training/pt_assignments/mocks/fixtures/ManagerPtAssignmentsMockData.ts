import { MANAGER_PT_ASSIGNMENTS_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments.constants';
import { PT_PAYMENT_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments.constants';
import type { PtPackage, PtAssignment, PtTrainerWorkload, PtDashboardKpis } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

/**
 * @description Provides the ManagerPtAssignmentsMockData implementation for the pt module.
 * @dependencies @/app/frontend_manager/manager_schedule_personal_training/manager_pt_types/ManagerPtAssignmentsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PT_KPIS: PtDashboardKpis = {
  totalActiveAssignments: 42,
  sessionsScheduledToday: 18,
  packagesExpiringSoon: 7,
  monthlyPtRevenue: 24500000 };

export const MOCK_PT_PACKAGES: PtPackage[] = [
  {
    id: 'pkg-1',
    name: 'Kickstarter PT',
    sessionCount: 12,
    durationDays: 30,
    price: 1200000,
    description: '12 sessions per month. Ideal for beginners starting their fitness journey.' },
  {
    id: 'pkg-2',
    name: 'Transformation Elite',
    sessionCount: 24,
    durationDays: 60,
    price: 2200000,
    description: '24 sessions across 2 months with personalized diet monitoring.' },
  {
    id: 'pkg-3',
    name: 'Pro Bodybuilding',
    sessionCount: 36,
    durationDays: 90,
    price: 3000000,
    description: 'Advanced 3-month prep package for serious athletes.' },
];

export const MOCK_PT_WORKLOAD: PtTrainerWorkload[] = [
  {
    trainerId: 'tr-1',
    trainerName: 'Vikram Singh',
    activeClients: 12,
    totalSessionsConducted: 450,
    rating: 4.8,
    status: MANAGER_PT_ASSIGNMENTS_STATUS_VALUES.FULLY_BOOKED },
  {
    trainerId: 'tr-2',
    trainerName: 'Priya Sharma',
    activeClients: 8,
    totalSessionsConducted: 320,
    rating: 4.9,
    status: MANAGER_PT_ASSIGNMENTS_STATUS_VALUES.AVAILABLE },
  {
    trainerId: 'tr-3',
    trainerName: 'Rahul Verma',
    activeClients: 15,
    totalSessionsConducted: 610,
    rating: 4.7,
    status: MANAGER_PT_ASSIGNMENTS_STATUS_VALUES.FULLY_BOOKED },
  {
    trainerId: 'tr-4',
    trainerName: 'Anjali Desai',
    activeClients: 5,
    totalSessionsConducted: 120,
    rating: 4.5,
    status: MANAGER_PT_ASSIGNMENTS_STATUS_VALUES.AVAILABLE },
];

export const MOCK_PT_ASSIGNMENTS: PtAssignment[] = [
  {
    id: 'asg-1',
    memberId: 'mem-101',
    memberName: 'Karan Malhotra',
    trainerId: 'tr-1',
    trainerName: 'Vikram Singh',
    packageId: 'pkg-2',
    packageName: 'Transformation Elite',
    totalSessions: 24,
    completedSessions: 22,
    sessionsRemaining: 2,
    startDate: '2023-09-01',
    endDate: '2023-11-01',
    paymentStatus: PT_PAYMENT_STATUS_VALUES[0],
    amountPaid: 24000,
    totalAmount: 2400000 },
  {
    id: 'asg-2',
    memberId: 'mem-102',
    memberName: 'Sneha Kapoor',
    trainerId: 'tr-2',
    trainerName: 'Priya Sharma',
    packageId: 'pkg-1',
    packageName: 'Kickstarter PT',
    totalSessions: 12,
    completedSessions: 4,
    sessionsRemaining: 8,
    startDate: '2023-10-10',
    endDate: '2023-11-10',
    paymentStatus: PT_PAYMENT_STATUS_VALUES[2],
    amountPaid: 5000,
    totalAmount: 1200000 },
  {
    id: 'asg-3',
    memberId: 'mem-103',
    memberName: 'Rohan Das',
    trainerId: 'tr-3',
    trainerName: 'Rahul Verma',
    packageId: 'pkg-3',
    packageName: 'Pro Bodybuilding',
    totalSessions: 36,
    completedSessions: 35,
    sessionsRemaining: 1,
    startDate: '2023-08-15',
    endDate: '2023-11-15',
    paymentStatus: PT_PAYMENT_STATUS_VALUES[0],
    amountPaid: 36000,
    totalAmount: 3600000 },
  {
    id: 'asg-4',
    memberId: 'mem-104',
    memberName: 'Aditi Rao',
    trainerId: 'tr-4',
    trainerName: 'Anjali Desai',
    packageId: 'pkg-1',
    packageName: 'Kickstarter PT',
    totalSessions: 12,
    completedSessions: 11,
    sessionsRemaining: 1,
    startDate: '2023-09-20',
    endDate: '2023-10-20',
    paymentStatus: PT_PAYMENT_STATUS_VALUES[0],
    amountPaid: 12000,
    totalAmount: 1200000 },
  {
    id: 'asg-5',
    memberId: 'mem-105',
    memberName: 'Amit Patel',
    trainerId: 'tr-1',
    trainerName: 'Vikram Singh',
    packageId: 'pkg-2',
    packageName: 'Transformation Elite',
    totalSessions: 24,
    completedSessions: 10,
    sessionsRemaining: 14,
    startDate: '2023-10-01',
    endDate: '2023-12-01',
    paymentStatus: PT_PAYMENT_STATUS_VALUES[2],
    amountPaid: 10000,
    totalAmount: 2400000 },
];
