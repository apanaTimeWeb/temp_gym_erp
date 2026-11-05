/** Canonical module-level constant registry for manager_pt; populated when static feature configuration is introduced. */
export const ManagerPtAssignmentsConstants = {} as const;

export const PT_SESSION_STATUS_VALUES = ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'MISSED'] as const;

export const PT_PAYMENT_STATUS_VALUES = ['PAID', 'PARTIAL', 'PENDING'] as const;

export const PT_TRAINER_AVAILABILITY_STATUS_VALUES = ['Available', 'Fully Booked'] as const;

export const MANAGER_PT_ASSIGNMENTS_STATUS_VALUES = {
  FULLY_BOOKED: 'Fully Booked',
  AVAILABLE: 'Available',
} as const;
