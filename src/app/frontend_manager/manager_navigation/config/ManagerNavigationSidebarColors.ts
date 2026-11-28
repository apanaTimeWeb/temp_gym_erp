// RESPONSIBILITY: Color tokens for the Manager sidebar jewel icon badges and 15 domain group accents.

export interface ManagerNavColorSpec {
  iconColor: string;
  bg: string;
  activeBg: string;
  activeShadow: string;
}

export const DEFAULT_MANAGER_NAV_COLOR: ManagerNavColorSpec = {
  iconColor: '#FF5A1F',
  bg: 'rgba(255, 90, 31, 0.14)',
  activeBg: 'rgba(255, 90, 31, 0.24)',
  activeShadow: '0 0 12px rgba(255, 90, 31, 0.38)',
};

export const MANAGER_NAV_GROUP_COLORS: Record<string, ManagerNavColorSpec> = {
  NAV_DOMAIN_DASHBOARD: {
    iconColor: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.16)',
    activeBg: 'rgba(255, 107, 53, 0.28)',
    activeShadow: '0 0 12px rgba(255, 107, 53, 0.42)',
  },
  NAV_DOMAIN_INQUIRIES_CRM: {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.16)',
    activeBg: 'rgba(56, 189, 248, 0.28)',
    activeShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
  },
  NAV_DOMAIN_MEMBERS: {
    iconColor: '#10B981',
    bg: 'rgba(16, 185, 129, 0.16)',
    activeBg: 'rgba(16, 185, 129, 0.28)',
    activeShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
  },
  NAV_DOMAIN_ATTENDANCE: {
    iconColor: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.16)',
    activeBg: 'rgba(59, 130, 246, 0.28)',
    activeShadow: '0 0 12px rgba(59, 130, 246, 0.4)',
  },
  NAV_DOMAIN_MEMBERSHIP_PLANS: {
    iconColor: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.16)',
    activeBg: 'rgba(168, 85, 247, 0.28)',
    activeShadow: '0 0 12px rgba(168, 85, 247, 0.4)',
  },
  NAV_DOMAIN_SALES_BILLING: {
    iconColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.16)',
    activeBg: 'rgba(245, 158, 11, 0.28)',
    activeShadow: '0 0 12px rgba(245, 158, 11, 0.4)',
  },
  NAV_DOMAIN_FINANCE_EXPENSES: {
    iconColor: '#EAB308',
    bg: 'rgba(234, 179, 8, 0.16)',
    activeBg: 'rgba(234, 179, 8, 0.28)',
    activeShadow: '0 0 12px rgba(234, 179, 8, 0.4)',
  },
  NAV_DOMAIN_MAINTENANCE: {
    iconColor: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.16)',
    activeBg: 'rgba(251, 146, 60, 0.28)',
    activeShadow: '0 0 12px rgba(251, 146, 60, 0.4)',
  },
  NAV_DOMAIN_GRIEVANCES: {
    iconColor: '#F43F5E',
    bg: 'rgba(244, 63, 94, 0.16)',
    activeBg: 'rgba(244, 63, 94, 0.28)',
    activeShadow: '0 0 12px rgba(244, 63, 94, 0.4)',
  },
  NAV_DOMAIN_STAFF_HR: {
    iconColor: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.16)',
    activeBg: 'rgba(99, 102, 241, 0.28)',
    activeShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
  },
  NAV_DOMAIN_SCHEDULE_PT: {
    iconColor: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.16)',
    activeBg: 'rgba(6, 182, 212, 0.28)',
    activeShadow: '0 0 12px rgba(6, 182, 212, 0.4)',
  },
  NAV_DOMAIN_WORKOUT_DIET_LIBRARY: {
    iconColor: '#84CC16',
    bg: 'rgba(132, 204, 22, 0.16)',
    activeBg: 'rgba(132, 204, 22, 0.28)',
    activeShadow: '0 0 12px rgba(132, 204, 22, 0.4)',
  },
  NAV_DOMAIN_COMMUNICATIONS: {
    iconColor: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.16)',
    activeBg: 'rgba(236, 72, 153, 0.28)',
    activeShadow: '0 0 12px rgba(236, 72, 153, 0.4)',
  },
  NAV_DOMAIN_REPORTS_REFERRALS: {
    iconColor: '#2DD4BF',
    bg: 'rgba(45, 212, 191, 0.16)',
    activeBg: 'rgba(45, 212, 191, 0.28)',
    activeShadow: '0 0 12px rgba(45, 212, 191, 0.4)',
  },
  NAV_DOMAIN_HELP_SUPPORT: {
    iconColor: '#D946EF',
    bg: 'rgba(217, 70, 239, 0.16)',
    activeBg: 'rgba(217, 70, 239, 0.28)',
    activeShadow: '0 0 12px rgba(217, 70, 239, 0.4)',
  },
};

export const MANAGER_NAV_ITEM_COLORS: Record<string, ManagerNavColorSpec> = {
  NAV_DOMAIN_DASHBOARD: { iconColor: '#FF5A1F', bg: 'rgba(255, 90, 31, 0.16)', activeBg: 'rgba(255, 90, 31, 0.30)', activeShadow: '0 0 14px rgba(255, 90, 31, 0.48)' },
  NAV_BUSINESS_SETTINGS: { iconColor: '#22D3EE', bg: 'rgba(34, 211, 238, 0.16)', activeBg: 'rgba(34, 211, 238, 0.30)', activeShadow: '0 0 14px rgba(34, 211, 238, 0.45)' },
  NAV_PROFILE_SECURITY: { iconColor: '#4ADE80', bg: 'rgba(74, 222, 128, 0.16)', activeBg: 'rgba(74, 222, 128, 0.30)', activeShadow: '0 0 14px rgba(74, 222, 128, 0.45)' },
  NAV_DOMAIN_INQUIRIES_CRM: { iconColor: '#38BDF8', bg: 'rgba(56, 189, 248, 0.16)', activeBg: 'rgba(56, 189, 248, 0.30)', activeShadow: '0 0 14px rgba(56, 189, 248, 0.45)' },
  NAV_DOMAIN_MEMBERS: { iconColor: '#34D399', bg: 'rgba(52, 211, 153, 0.16)', activeBg: 'rgba(52, 211, 153, 0.30)', activeShadow: '0 0 14px rgba(52, 211, 153, 0.45)' },
  NAV_ATTENDANCE_OVERVIEW: { iconColor: '#3B82F6', bg: 'rgba(59, 130, 246, 0.16)', activeBg: 'rgba(59, 130, 246, 0.30)', activeShadow: '0 0 14px rgba(59, 130, 246, 0.45)' },
  NAV_MEMBER_ATTENDANCE: { iconColor: '#60A5FA', bg: 'rgba(96, 165, 250, 0.16)', activeBg: 'rgba(96, 165, 250, 0.30)', activeShadow: '0 0 14px rgba(96, 165, 250, 0.45)' },
  NAV_TRAINER_ATTENDANCE: { iconColor: '#818CF8', bg: 'rgba(129, 140, 248, 0.16)', activeBg: 'rgba(129, 140, 248, 0.30)', activeShadow: '0 0 14px rgba(129, 140, 248, 0.45)' },
  NAV_STAFF_ATTENDANCE: { iconColor: '#A78BFA', bg: 'rgba(167, 139, 250, 0.16)', activeBg: 'rgba(167, 139, 250, 0.30)', activeShadow: '0 0 14px rgba(167, 139, 250, 0.45)' },
  NAV_PLANS_CATALOG: { iconColor: '#A855F7', bg: 'rgba(168, 85, 247, 0.16)', activeBg: 'rgba(168, 85, 247, 0.30)', activeShadow: '0 0 14px rgba(168, 85, 247, 0.45)' },
  NAV_PLANS_ACTIVATE: { iconColor: '#34D399', bg: 'rgba(52, 211, 153, 0.16)', activeBg: 'rgba(52, 211, 153, 0.30)', activeShadow: '0 0 14px rgba(52, 211, 153, 0.45)' },
  NAV_PLANS_RENEW: { iconColor: '#38BDF8', bg: 'rgba(56, 189, 248, 0.16)', activeBg: 'rgba(56, 189, 248, 0.30)', activeShadow: '0 0 14px rgba(56, 189, 248, 0.45)' },
  NAV_PLANS_FREEZE: { iconColor: '#67E8F9', bg: 'rgba(103, 232, 249, 0.16)', activeBg: 'rgba(103, 232, 249, 0.30)', activeShadow: '0 0 14px rgba(103, 232, 249, 0.45)' },
  NAV_PLANS_EXPIRY: { iconColor: '#FB7185', bg: 'rgba(251, 113, 133, 0.16)', activeBg: 'rgba(251, 113, 133, 0.30)', activeShadow: '0 0 14px rgba(251, 113, 133, 0.45)' },
  NAV_SALES_OVERVIEW: { iconColor: '#F59E0B', bg: 'rgba(245, 158, 11, 0.16)', activeBg: 'rgba(245, 158, 11, 0.30)', activeShadow: '0 0 14px rgba(245, 158, 11, 0.45)' },
  NAV_STORE_POS: { iconColor: '#FB923C', bg: 'rgba(251, 146, 60, 0.16)', activeBg: 'rgba(251, 146, 60, 0.30)', activeShadow: '0 0 14px rgba(251, 146, 60, 0.45)' },
  NAV_STORE_PRODUCTS: { iconColor: '#FBBF24', bg: 'rgba(251, 191, 36, 0.16)', activeBg: 'rgba(251, 191, 36, 0.30)', activeShadow: '0 0 14px rgba(251, 191, 36, 0.45)' },
  NAV_STORE_ORDERS: { iconColor: '#F472B6', bg: 'rgba(244, 114, 182, 0.16)', activeBg: 'rgba(244, 114, 182, 0.30)', activeShadow: '0 0 14px rgba(244, 114, 182, 0.45)' },
  NAV_FINANCE_SUMMARY: { iconColor: '#FACC15', bg: 'rgba(250, 204, 21, 0.16)', activeBg: 'rgba(250, 204, 21, 0.30)', activeShadow: '0 0 14px rgba(250, 204, 21, 0.45)' },
  NAV_EXPENSE_REGISTER: { iconColor: '#F59E0B', bg: 'rgba(245, 158, 11, 0.16)', activeBg: 'rgba(245, 158, 11, 0.30)', activeShadow: '0 0 14px rgba(245, 158, 11, 0.45)' },
  NAV_DOMAIN_MAINTENANCE: { iconColor: '#FB923C', bg: 'rgba(251, 146, 60, 0.16)', activeBg: 'rgba(251, 146, 60, 0.30)', activeShadow: '0 0 14px rgba(251, 146, 60, 0.45)' },
  NAV_DOMAIN_GRIEVANCES: { iconColor: '#F43F5E', bg: 'rgba(244, 63, 94, 0.16)', activeBg: 'rgba(244, 63, 94, 0.30)', activeShadow: '0 0 14px rgba(244, 63, 94, 0.45)' },
  NAV_STAFF_DIRECTORY: { iconColor: '#6366F1', bg: 'rgba(99, 102, 241, 0.16)', activeBg: 'rgba(99, 102, 241, 0.30)', activeShadow: '0 0 14px rgba(99, 102, 241, 0.45)' },
  NAV_PAYROLL_LEDGER: { iconColor: '#FACC15', bg: 'rgba(250, 204, 21, 0.16)', activeBg: 'rgba(250, 204, 21, 0.30)', activeShadow: '0 0 14px rgba(250, 204, 21, 0.45)' },
  NAV_TRAINER_SCHEDULE: { iconColor: '#06B6D4', bg: 'rgba(6, 182, 212, 0.16)', activeBg: 'rgba(6, 182, 212, 0.30)', activeShadow: '0 0 14px rgba(6, 182, 212, 0.45)' },
  NAV_PT_ASSIGNMENTS: { iconColor: '#38BDF8', bg: 'rgba(56, 189, 248, 0.16)', activeBg: 'rgba(56, 189, 248, 0.30)', activeShadow: '0 0 14px rgba(56, 189, 248, 0.45)' },
  NAV_WORKOUT_PLANS: { iconColor: '#FB923C', bg: 'rgba(251, 146, 60, 0.16)', activeBg: 'rgba(251, 146, 60, 0.30)', activeShadow: '0 0 14px rgba(251, 146, 60, 0.45)' },
  NAV_ASSIGNED_WORKOUTS: { iconColor: '#F43F5E', bg: 'rgba(244, 63, 94, 0.16)', activeBg: 'rgba(244, 63, 94, 0.30)', activeShadow: '0 0 14px rgba(244, 63, 94, 0.45)' },
  NAV_EXERCISE_LIBRARY: { iconColor: '#34D399', bg: 'rgba(52, 211, 153, 0.16)', activeBg: 'rgba(52, 211, 153, 0.30)', activeShadow: '0 0 14px rgba(52, 211, 153, 0.45)' },
  NAV_DIET_LIBRARY: { iconColor: '#84CC16', bg: 'rgba(132, 204, 22, 0.16)', activeBg: 'rgba(132, 204, 22, 0.30)', activeShadow: '0 0 14px rgba(132, 204, 22, 0.45)' },
  NAV_COMMUNICATIONS_COMPOSE: { iconColor: '#EC4899', bg: 'rgba(236, 72, 153, 0.16)', activeBg: 'rgba(236, 72, 153, 0.30)', activeShadow: '0 0 14px rgba(236, 72, 153, 0.45)' },
  NAV_COMMUNICATIONS_HISTORY: { iconColor: '#C084FC', bg: 'rgba(192, 132, 252, 0.16)', activeBg: 'rgba(192, 132, 252, 0.30)', activeShadow: '0 0 14px rgba(192, 132, 252, 0.45)' },
  NAV_COMMUNICATIONS_AUTOMATIONS: { iconColor: '#38BDF8', bg: 'rgba(56, 189, 248, 0.16)', activeBg: 'rgba(56, 189, 248, 0.30)', activeShadow: '0 0 14px rgba(56, 189, 248, 0.45)' },
  NAV_CHURN_RECOVERY: { iconColor: '#FB7185', bg: 'rgba(251, 113, 133, 0.16)', activeBg: 'rgba(251, 113, 133, 0.30)', activeShadow: '0 0 14px rgba(251, 113, 133, 0.45)' },
  NAV_REPORTS_OVERVIEW: { iconColor: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.16)', activeBg: 'rgba(45, 212, 191, 0.30)', activeShadow: '0 0 14px rgba(45, 212, 191, 0.45)' },
  NAV_REFERRALS_REWARDS: { iconColor: '#F59E0B', bg: 'rgba(245, 158, 11, 0.16)', activeBg: 'rgba(245, 158, 11, 0.30)', activeShadow: '0 0 14px rgba(245, 158, 11, 0.45)' },
  NAV_DOMAIN_HELP_SUPPORT: { iconColor: '#D946EF', bg: 'rgba(217, 70, 239, 0.16)', activeBg: 'rgba(217, 70, 239, 0.30)', activeShadow: '0 0 14px rgba(217, 70, 239, 0.45)' },
};
