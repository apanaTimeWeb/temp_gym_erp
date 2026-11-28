// RESPONSIBILITY: Color tokens for the Trainer sidebar jewel icon badges and group accents.

export interface TrainerNavColorSpec {
  iconColor: string;
  bg: string;
  activeBg: string;
  activeShadow: string;
}

export const DEFAULT_TRAINER_NAV_COLOR: TrainerNavColorSpec = {
  iconColor: '#FF5A1F',
  bg: 'rgba(255, 90, 31, 0.14)',
  activeBg: 'rgba(255, 90, 31, 0.24)',
  activeShadow: '0 0 12px rgba(255, 90, 31, 0.38)',
};

export const TRAINER_NAV_GROUP_COLORS: Record<string, TrainerNavColorSpec> = {
  TEXT_NAV_OVERVIEW: {
    iconColor: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.16)',
    activeBg: 'rgba(255, 107, 53, 0.28)',
    activeShadow: '0 0 12px rgba(255, 107, 53, 0.42)',
  },
  TEXT_NAV_MEMBERS: {
    iconColor: '#10B981',
    bg: 'rgba(16, 185, 129, 0.16)',
    activeBg: 'rgba(16, 185, 129, 0.28)',
    activeShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
  },
  TEXT_NAV_COACHING: {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.16)',
    activeBg: 'rgba(56, 189, 248, 0.28)',
    activeShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
  },
  TEXT_NAV_OPERATIONS: {
    iconColor: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.16)',
    activeBg: 'rgba(99, 102, 241, 0.28)',
    activeShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
  },
  TEXT_NAV_EARNINGS_DOMAIN: {
    iconColor: '#EAB308',
    bg: 'rgba(234, 179, 8, 0.16)',
    activeBg: 'rgba(234, 179, 8, 0.28)',
    activeShadow: '0 0 12px rgba(234, 179, 8, 0.4)',
  },
  TEXT_NAV_ACCOUNT: {
    iconColor: '#D946EF',
    bg: 'rgba(217, 70, 239, 0.16)',
    activeBg: 'rgba(217, 70, 239, 0.28)',
    activeShadow: '0 0 12px rgba(217, 70, 239, 0.4)',
  },
};

export const TRAINER_NAV_ITEM_COLORS: Record<string, TrainerNavColorSpec> = {
  TEXT_NAV_DASHBOARD: {
    iconColor: '#FF5A1F',
    bg: 'rgba(255, 90, 31, 0.16)',
    activeBg: 'rgba(255, 90, 31, 0.30)',
    activeShadow: '0 0 14px rgba(255, 90, 31, 0.48)',
  },
  TEXT_NAV_MY_MEMBERS: {
    iconColor: '#34D399',
    bg: 'rgba(52, 211, 153, 0.16)',
    activeBg: 'rgba(52, 211, 153, 0.30)',
    activeShadow: '0 0 14px rgba(52, 211, 153, 0.45)',
  },
  NAV_MEMBER_NOTES: {
    iconColor: '#2DD4BF',
    bg: 'rgba(45, 212, 191, 0.16)',
    activeBg: 'rgba(45, 212, 191, 0.30)',
    activeShadow: '0 0 14px rgba(45, 212, 191, 0.45)',
  },
  TEXT_NAV_WORKOUT_EXERCISES: {
    iconColor: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.16)',
    activeBg: 'rgba(251, 146, 60, 0.30)',
    activeShadow: '0 0 14px rgba(251, 146, 60, 0.45)',
  },
  NAV_COACHING_EXERCISES: {
    iconColor: '#F43F5E',
    bg: 'rgba(244, 63, 94, 0.16)',
    activeBg: 'rgba(244, 63, 94, 0.30)',
    activeShadow: '0 0 14px rgba(244, 63, 94, 0.45)',
  },
  TEXT_NAV_DIET_LIBRARY: {
    iconColor: '#84CC16',
    bg: 'rgba(132, 204, 22, 0.16)',
    activeBg: 'rgba(132, 204, 22, 0.30)',
    activeShadow: '0 0 14px rgba(132, 204, 22, 0.45)',
  },
  TEXT_NAV_SESSIONS: {
    iconColor: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.16)',
    activeBg: 'rgba(6, 182, 212, 0.30)',
    activeShadow: '0 0 14px rgba(6, 182, 212, 0.45)',
  },
  TEXT_NAV_PROGRESS_TRACKING: {
    iconColor: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.16)',
    activeBg: 'rgba(168, 85, 247, 0.30)',
    activeShadow: '0 0 14px rgba(168, 85, 247, 0.45)',
  },
  NAV_COACHING_COMPARISON: {
    iconColor: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.16)',
    activeBg: 'rgba(236, 72, 153, 0.30)',
    activeShadow: '0 0 14px rgba(236, 72, 153, 0.45)',
  },
  TEXT_NAV_ATTENDANCE: {
    iconColor: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.16)',
    activeBg: 'rgba(59, 130, 246, 0.30)',
    activeShadow: '0 0 14px rgba(59, 130, 246, 0.45)',
  },
  NAV_OPERATIONS_SELF_ATTENDANCE: {
    iconColor: '#818CF8',
    bg: 'rgba(129, 140, 248, 0.16)',
    activeBg: 'rgba(129, 140, 248, 0.30)',
    activeShadow: '0 0 14px rgba(129, 140, 248, 0.45)',
  },
  TEXT_NAV_SCHEDULE_LEAVES: {
    iconColor: '#C084FC',
    bg: 'rgba(192, 132, 252, 0.16)',
    activeBg: 'rgba(192, 132, 252, 0.30)',
    activeShadow: '0 0 14px rgba(192, 132, 252, 0.45)',
  },
  NAV_OPERATIONS_LEAVES: {
    iconColor: '#FB7185',
    bg: 'rgba(251, 113, 133, 0.16)',
    activeBg: 'rgba(251, 113, 133, 0.30)',
    activeShadow: '0 0 14px rgba(251, 113, 133, 0.45)',
  },
  TEXT_NAV_EARNINGS: {
    iconColor: '#FACC15',
    bg: 'rgba(250, 204, 21, 0.16)',
    activeBg: 'rgba(250, 204, 21, 0.30)',
    activeShadow: '0 0 14px rgba(250, 204, 21, 0.45)',
  },
  TEXT_NAV_NOTIFICATIONS: {
    iconColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.16)',
    activeBg: 'rgba(245, 158, 11, 0.30)',
    activeShadow: '0 0 14px rgba(245, 158, 11, 0.45)',
  },
  TEXT_NAV_MY_PROFILE: {
    iconColor: '#22D3EE',
    bg: 'rgba(34, 211, 238, 0.16)',
    activeBg: 'rgba(34, 211, 238, 0.30)',
    activeShadow: '0 0 14px rgba(34, 211, 238, 0.45)',
  },
  NAV_ACCOUNT_SECURITY: {
    iconColor: '#4ADE80',
    bg: 'rgba(74, 222, 128, 0.16)',
    activeBg: 'rgba(74, 222, 128, 0.30)',
    activeShadow: '0 0 14px rgba(74, 222, 128, 0.45)',
  },
};
