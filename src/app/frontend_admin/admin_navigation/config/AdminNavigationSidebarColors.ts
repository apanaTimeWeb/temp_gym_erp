// RESPONSIBILITY: Color tokens for the Admin sidebar jewel icon badges and group accents, matching Trainer UI.

export interface AdminNavColorSpec {
  iconColor: string;
  bg: string;
  activeBg: string;
  activeShadow: string;
}

export const DEFAULT_ADMIN_NAV_COLOR: AdminNavColorSpec = {
  iconColor: '#FF5A1F',
  bg: 'rgba(255, 90, 31, 0.14)',
  activeBg: 'rgba(255, 90, 31, 0.24)',
  activeShadow: '0 0 12px rgba(255, 90, 31, 0.38)',
};

export const ADMIN_NAV_GROUP_COLORS: Record<string, AdminNavColorSpec> = {
  overview: {
    iconColor: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.16)',
    activeBg: 'rgba(255, 107, 53, 0.28)',
    activeShadow: '0 0 12px rgba(255, 107, 53, 0.42)',
  },
  operations: {
    iconColor: '#10B981',
    bg: 'rgba(16, 185, 129, 0.16)',
    activeBg: 'rgba(16, 185, 129, 0.28)',
    activeShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
  },
  financeBilling: {
    iconColor: '#EAB308',
    bg: 'rgba(234, 179, 8, 0.16)',
    activeBg: 'rgba(234, 179, 8, 0.28)',
    activeShadow: '0 0 12px rgba(234, 179, 8, 0.4)',
  },
  people: {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.16)',
    activeBg: 'rgba(56, 189, 248, 0.28)',
    activeShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
  },
  communication: {
    iconColor: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.16)',
    activeBg: 'rgba(236, 72, 153, 0.28)',
    activeShadow: '0 0 12px rgba(236, 72, 153, 0.4)',
  },
  accessControl: {
    iconColor: '#F43F5E',
    bg: 'rgba(244, 63, 94, 0.16)',
    activeBg: 'rgba(244, 63, 94, 0.28)',
    activeShadow: '0 0 12px rgba(244, 63, 94, 0.4)',
  },
  insights: {
    iconColor: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.16)',
    activeBg: 'rgba(168, 85, 247, 0.28)',
    activeShadow: '0 0 12px rgba(168, 85, 247, 0.4)',
  },
  system: {
    iconColor: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.16)',
    activeBg: 'rgba(99, 102, 241, 0.28)',
    activeShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
  },
};

export const ADMIN_NAV_ITEM_COLORS: Record<string, AdminNavColorSpec> = {
  dashboard: {
    iconColor: '#FF5A1F',
    bg: 'rgba(255, 90, 31, 0.16)',
    activeBg: 'rgba(255, 90, 31, 0.30)',
    activeShadow: '0 0 14px rgba(255, 90, 31, 0.48)',
  },
  members: {
    iconColor: '#34D399',
    bg: 'rgba(52, 211, 153, 0.16)',
    activeBg: 'rgba(52, 211, 153, 0.30)',
    activeShadow: '0 0 14px rgba(52, 211, 153, 0.45)',
  },
  attendance: {
    iconColor: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.16)',
    activeBg: 'rgba(59, 130, 246, 0.30)',
    activeShadow: '0 0 14px rgba(59, 130, 246, 0.45)',
  },
  sales: {
    iconColor: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.16)',
    activeBg: 'rgba(251, 146, 60, 0.30)',
    activeShadow: '0 0 14px rgba(251, 146, 60, 0.45)',
  },
  gyms: {
    iconColor: '#2DD4BF',
    bg: 'rgba(45, 212, 191, 0.16)',
    activeBg: 'rgba(45, 212, 191, 0.30)',
    activeShadow: '0 0 14px rgba(45, 212, 191, 0.45)',
  },
  billing: {
    iconColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.16)',
    activeBg: 'rgba(245, 158, 11, 0.30)',
    activeShadow: '0 0 14px rgba(245, 158, 11, 0.45)',
  },
  finance: {
    iconColor: '#FACC15',
    bg: 'rgba(250, 204, 21, 0.16)',
    activeBg: 'rgba(250, 204, 21, 0.30)',
    activeShadow: '0 0 14px rgba(250, 204, 21, 0.45)',
  },
  hr: {
    iconColor: '#22D3EE',
    bg: 'rgba(34, 211, 238, 0.16)',
    activeBg: 'rgba(34, 211, 238, 0.30)',
    activeShadow: '0 0 14px rgba(34, 211, 238, 0.45)',
  },
  communication: {
    iconColor: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.16)',
    activeBg: 'rgba(236, 72, 153, 0.30)',
    activeShadow: '0 0 14px rgba(236, 72, 153, 0.45)',
  },
  security: {
    iconColor: '#F43F5E',
    bg: 'rgba(244, 63, 94, 0.16)',
    activeBg: 'rgba(244, 63, 94, 0.30)',
    activeShadow: '0 0 14px rgba(244, 63, 94, 0.45)',
  },
  reports: {
    iconColor: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.16)',
    activeBg: 'rgba(168, 85, 247, 0.30)',
    activeShadow: '0 0 14px rgba(168, 85, 247, 0.45)',
  },
  dataExport: {
    iconColor: '#84CC16',
    bg: 'rgba(132, 204, 22, 0.16)',
    activeBg: 'rgba(132, 204, 22, 0.30)',
    activeShadow: '0 0 14px rgba(132, 204, 22, 0.45)',
  },
  settings: {
    iconColor: '#818CF8',
    bg: 'rgba(129, 140, 248, 0.16)',
    activeBg: 'rgba(129, 140, 248, 0.30)',
    activeShadow: '0 0 14px rgba(129, 140, 248, 0.45)',
  },
};
