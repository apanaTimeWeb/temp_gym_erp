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
    iconColor: '#FF5A1F',
    bg: 'rgba(255, 90, 31, 0.14)',
    activeBg: 'rgba(255, 90, 31, 0.24)',
    activeShadow: '0 0 12px rgba(255, 90, 31, 0.38)',
  },
  TEXT_NAV_MEMBERS: {
    iconColor: '#34D399',
    bg: 'rgba(52, 211, 153, 0.14)',
    activeBg: 'rgba(52, 211, 153, 0.24)',
    activeShadow: '0 0 12px rgba(52, 211, 153, 0.35)',
  },
  TEXT_NAV_COACHING: {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.14)',
    activeBg: 'rgba(56, 189, 248, 0.24)',
    activeShadow: '0 0 12px rgba(56, 189, 248, 0.35)',
  },
  TEXT_NAV_OPERATIONS: {
    iconColor: '#60A5FA',
    bg: 'rgba(96, 165, 250, 0.14)',
    activeBg: 'rgba(96, 165, 250, 0.24)',
    activeShadow: '0 0 12px rgba(96, 165, 250, 0.35)',
  },
  TEXT_NAV_EARNINGS_DOMAIN: {
    iconColor: '#FBBF24',
    bg: 'rgba(251, 191, 36, 0.14)',
    activeBg: 'rgba(251, 191, 36, 0.24)',
    activeShadow: '0 0 12px rgba(251, 191, 36, 0.35)',
  },
  TEXT_NAV_ACCOUNT: {
    iconColor: '#C084FC',
    bg: 'rgba(192, 132, 252, 0.14)',
    activeBg: 'rgba(192, 132, 252, 0.24)',
    activeShadow: '0 0 12px rgba(192, 132, 252, 0.35)',
  },
};

export const TRAINER_NAV_ITEM_COLORS: Record<string, TrainerNavColorSpec> = {
  TEXT_NAV_DASHBOARD: {
    iconColor: '#FF5A1F',
    bg: 'rgba(255, 90, 31, 0.15)',
    activeBg: 'rgba(255, 90, 31, 0.26)',
    activeShadow: '0 0 14px rgba(255, 90, 31, 0.42)',
  },
  TEXT_NAV_MY_MEMBERS: {
    iconColor: '#34D399',
    bg: 'rgba(52, 211, 153, 0.14)',
    activeBg: 'rgba(52, 211, 153, 0.25)',
    activeShadow: '0 0 12px rgba(52, 211, 153, 0.38)',
  },
  NAV_MEMBER_NOTES: {
    iconColor: '#2DD4BF',
    bg: 'rgba(45, 212, 191, 0.14)',
    activeBg: 'rgba(45, 212, 191, 0.25)',
    activeShadow: '0 0 12px rgba(45, 212, 191, 0.38)',
  },
  TEXT_NAV_WORKOUT_EXERCISES: {
    iconColor: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.14)',
    activeBg: 'rgba(251, 146, 60, 0.25)',
    activeShadow: '0 0 12px rgba(251, 146, 60, 0.38)',
  },
  NAV_COACHING_EXERCISES: {
    iconColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.14)',
    activeBg: 'rgba(245, 158, 11, 0.25)',
    activeShadow: '0 0 12px rgba(245, 158, 11, 0.38)',
  },
  TEXT_NAV_DIET_LIBRARY: {
    iconColor: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.14)',
    activeBg: 'rgba(34, 197, 94, 0.25)',
    activeShadow: '0 0 12px rgba(34, 197, 94, 0.38)',
  },
  TEXT_NAV_SESSIONS: {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.14)',
    activeBg: 'rgba(56, 189, 248, 0.25)',
    activeShadow: '0 0 12px rgba(56, 189, 248, 0.38)',
  },
  TEXT_NAV_PROGRESS_TRACKING: {
    iconColor: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.14)',
    activeBg: 'rgba(167, 139, 250, 0.25)',
    activeShadow: '0 0 12px rgba(167, 139, 250, 0.38)',
  },
  NAV_COACHING_COMPARISON: {
    iconColor: '#22D3EE',
    bg: 'rgba(34, 211, 238, 0.14)',
    activeBg: 'rgba(34, 211, 238, 0.25)',
    activeShadow: '0 0 12px rgba(34, 211, 238, 0.38)',
  },
  TEXT_NAV_ATTENDANCE: {
    iconColor: '#60A5FA',
    bg: 'rgba(96, 165, 250, 0.14)',
    activeBg: 'rgba(96, 165, 250, 0.25)',
    activeShadow: '0 0 12px rgba(96, 165, 250, 0.38)',
  },
  NAV_OPERATIONS_SELF_ATTENDANCE: {
    iconColor: '#818CF8',
    bg: 'rgba(129, 140, 248, 0.14)',
    activeBg: 'rgba(129, 140, 248, 0.25)',
    activeShadow: '0 0 12px rgba(129, 140, 248, 0.38)',
  },
  TEXT_NAV_SCHEDULE_LEAVES: {
    iconColor: '#F472B6',
    bg: 'rgba(244, 114, 182, 0.14)',
    activeBg: 'rgba(244, 114, 182, 0.25)',
    activeShadow: '0 0 12px rgba(244, 114, 182, 0.38)',
  },
  NAV_OPERATIONS_LEAVES: {
    iconColor: '#FB7185',
    bg: 'rgba(251, 113, 133, 0.14)',
    activeBg: 'rgba(251, 113, 133, 0.25)',
    activeShadow: '0 0 12px rgba(251, 113, 133, 0.38)',
  },
  TEXT_NAV_EARNINGS: {
    iconColor: '#FBBF24',
    bg: 'rgba(251, 191, 36, 0.14)',
    activeBg: 'rgba(251, 191, 36, 0.25)',
    activeShadow: '0 0 12px rgba(251, 191, 36, 0.38)',
  },
  TEXT_NAV_NOTIFICATIONS: {
    iconColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.14)',
    activeBg: 'rgba(245, 158, 11, 0.25)',
    activeShadow: '0 0 12px rgba(245, 158, 11, 0.38)',
  },
  TEXT_NAV_MY_PROFILE: {
    iconColor: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.14)',
    activeBg: 'rgba(6, 182, 212, 0.25)',
    activeShadow: '0 0 12px rgba(6, 182, 212, 0.38)',
  },
  NAV_ACCOUNT_SECURITY: {
    iconColor: '#C084FC',
    bg: 'rgba(192, 132, 252, 0.14)',
    activeBg: 'rgba(192, 132, 252, 0.25)',
    activeShadow: '0 0 12px rgba(192, 132, 252, 0.38)',
  },
};
