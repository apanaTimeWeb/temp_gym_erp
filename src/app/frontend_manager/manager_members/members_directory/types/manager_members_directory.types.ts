import type { ManagerToastType } from '@/app/frontend_manager/manager_members/members_directory/types/ManagerMembersDirectoryLocalToastTypes';

import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { MemberType, MemberStatsType } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_derived.types';
import type { ManagerMembersDirectoryMessageType, ManagerMembersDirectoryMessageRecipient } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_message.types';
import type { PlanSnapshot, PaymentSnapshot, DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_snapshot.types';
import type { ManagerMembersDirectoryReceiptData } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_thermal_receipt.types';


export type MemberSortColumn = 'name' | 'joinDate' | 'expiryDate' | 'paidAmount' | 'status';
export type SortDirection = 'asc' | 'desc';
export type ManagerMembersDirectoryPaymentMethod = 'UPI' | 'CASH' | 'CARD' | 'NET_BANKING' | 'Cash' | 'Card' | 'NetBanking';
export type ManagerMembersDirectoryKpiKey = 'total' | 'active' | 'pending' | 'expired';
export type ExportFormat = 'csv' | 'pdf';
export type MemberProfileTab = 'overview' | 'attendance' | 'payments' | 'workout' | 'diet';

export interface MembersInitialData {
  members: Member[];
  plans: PlanSnapshot[];
  stats: MemberStats;
  totalMembers: number;
}

export type DietPlan = DietPlanSnapshot;
export type Workout = WorkoutSnapshot;
export type Payment = PaymentSnapshot;

// ─── Member ───────────────────────────────────────────────────────────────────
export interface MemberEmergencyContact {
  name: string;
  phone: string;
}

export interface Member extends Omit<MemberType, 'assignedDiet' | 'assignedWorkout' | 'plan'> {
  plan?: PlanSnapshot;
  recentPayments?: PaymentSnapshot[];
  dietPlan?: DietPlanSnapshot;
  workoutPlan?: WorkoutSnapshot;
  assignedDiet?: DietPlanSnapshot;
  assignedWorkout?: WorkoutSnapshot;
}

// ─── Member Stats ─────────────────────────────────────────────────────────────
export type MemberStats = MemberStatsType;

/** Extends Plan with an optional per-day custom price used in the billing cycle calculator. */
export type PlanWithCustom = PlanSnapshot;

// ─── Context ──────────────────────────────────────────────────────────────────
export interface ManagerMembersDirectoryViewModel {
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  // CRITICAL — backend API needs these query params
  genderFilter: string;
  setGenderFilter: (s: string) => void;
  planFilter: string;
  setPlanFilter: (s: string) => void;
  expiryFrom: string;
  expiryTo: string;
  setExpiryRange: (from: string, to: string) => void;
  // Sort state (needed for sortable column headers — Rule 30)
  sortColumn: MemberSortColumn;
  sortDirection: SortDirection;
  setSortColumn: (col: MemberSortColumn) => void;
  setSortDirection: (dir: SortDirection) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;

  // Member Profile
  selectedMember: Member | null;
  setSelectedMember: (m: Member | null) => void;
  openMemberProfile: (m: Member) => void;
  closeMemberProfile: () => void;
  isMemberProfileView: boolean;
  profileTab: MemberProfileTab;
  setProfileTab: (tab: MemberProfileTab) => void;

  // Add/Edit Modal
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editId: string | null;
  editData: MemberFormValues | null;

  // Renew Modal
  showRenewModal: boolean;
  setShowRenewModal: (show: boolean) => void;

  // Add Payment Modal
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;

  // Actions
  openAdd: () => void;
  openEdit: (m: Member) => void;
  saveMember: (data: MemberFormValues, idempotencyKey: string) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  assignDiet: (memberId: string, diet: DietPlan | null) => Promise<void> ;
  assignWorkout: (memberId: string, workout: Workout | null) => Promise<void>;
  renewMember: (data: {
    planId: string;
    newExpiryDate: string;
    amountPaid: number;
    paymentMethod: string;
    billingCycle: string;
    customDays?: number;
  }, idempotencyKey: string) => Promise<void>;
  recordPayment: (data: { amount: number; method: string }, idempotencyKey: string) => Promise<void>;
  freezeMember: (isFrozen: boolean, freezeUntil?: string) => Promise<void>;
  toggleSuspend: (isSuspended: boolean) => Promise<void>;
  assignTrainer: (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => Promise<void>;

  // Message Modal
  msgModal: { open: boolean; recipient: ManagerMembersDirectoryMessageRecipient; type: ManagerMembersDirectoryMessageType; message: string; subject?: string } | null;
  openMsg: (m: Member, type: ManagerMembersDirectoryMessageType) => void;
  closeMsg: () => void;

  // Receipt Printing
  printData: ManagerMembersDirectoryReceiptData | null;
  handlePrint: (p: Payment) => void;
  handleSharePaymentWhatsApp: (p: Payment) => void;
  setPrintData: (data: ManagerMembersDirectoryReceiptData | null) => void;
  exportMembers: (format: ExportFormat) => Promise<void>;
}

export type ManagerMembersDirectoryViewId = 'list' | 'member-profile';

export interface ManagerMembersDirectoryPlanPricingSnapshot {
  price1Month: number;
  price3Month: number;
  price6Month: number;
  price12Month: number;
  priceCustom?: number;
}
