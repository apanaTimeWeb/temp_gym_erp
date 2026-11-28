// RESPONSIBILITY: Color tokens for the Superadmin sidebar jewel icon badges and group accents matching Trainer UI.

export interface SuperadminNavColorSpec {
  iconColor: string;
  bg: string;
  activeBg: string;
  activeShadow: string;
}

export const DEFAULT_SUPERADMIN_NAV_COLOR: SuperadminNavColorSpec = {
  iconColor: '#FF5A1F',
  bg: 'rgba(255, 90, 31, 0.14)',
  activeBg: 'rgba(255, 90, 31, 0.24)',
  activeShadow: '0 0 12px rgba(255, 90, 31, 0.38)',
};

export const SUPERADMIN_NAV_GROUP_COLORS: Record<string, SuperadminNavColorSpec> = {
  'navigation.groups.overview': {
    iconColor: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.16)',
    activeBg: 'rgba(255, 107, 53, 0.28)',
    activeShadow: '0 0 12px rgba(255, 107, 53, 0.42)',
  },
  'navigation.groups.tenant_management': {
    iconColor: '#10B981',
    bg: 'rgba(16, 185, 129, 0.16)',
    activeBg: 'rgba(16, 185, 129, 0.28)',
    activeShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
  },
  'navigation.groups.communication': {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.16)',
    activeBg: 'rgba(56, 189, 248, 0.28)',
    activeShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
  },
  'navigation.groups.platform': {
    iconColor: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.16)',
    activeBg: 'rgba(99, 102, 241, 0.28)',
    activeShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
  },
  'navigation.groups.account': {
    iconColor: '#D946EF',
    bg: 'rgba(217, 70, 239, 0.16)',
    activeBg: 'rgba(217, 70, 239, 0.28)',
    activeShadow: '0 0 12px rgba(217, 70, 239, 0.4)',
  },
};

export const SUPERADMIN_NAV_ITEM_COLORS: Record<string, SuperadminNavColorSpec> = {
  'navigation.items.dashboard': {
    iconColor: '#FF5A1F',
    bg: 'rgba(255, 90, 31, 0.16)',
    activeBg: 'rgba(255, 90, 31, 0.30)',
    activeShadow: '0 0 14px rgba(255, 90, 31, 0.48)',
  },
  'navigation.items.analytics': {
    iconColor: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.16)',
    activeBg: 'rgba(56, 189, 248, 0.30)',
    activeShadow: '0 0 14px rgba(56, 189, 248, 0.45)',
  },
  'navigation.items.gyms': {
    iconColor: '#34D399',
    bg: 'rgba(52, 211, 153, 0.16)',
    activeBg: 'rgba(52, 211, 153, 0.30)',
    activeShadow: '0 0 14px rgba(52, 211, 153, 0.45)',
  },
  'navigation.items.billing': {
    iconColor: '#FACC15',
    bg: 'rgba(250, 204, 21, 0.16)',
    activeBg: 'rgba(250, 204, 21, 0.30)',
    activeShadow: '0 0 14px rgba(250, 204, 21, 0.45)',
  },
  'navigation.items.affiliates': {
    iconColor: '#2DD4BF',
    bg: 'rgba(45, 212, 191, 0.16)',
    activeBg: 'rgba(45, 212, 191, 0.30)',
    activeShadow: '0 0 14px rgba(45, 212, 191, 0.45)',
  },
  'navigation.items.team': {
    iconColor: '#818CF8',
    bg: 'rgba(129, 140, 248, 0.16)',
    activeBg: 'rgba(129, 140, 248, 0.30)',
    activeShadow: '0 0 14px rgba(129, 140, 248, 0.45)',
  },
  'navigation.items.communication': {
    iconColor: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.16)',
    activeBg: 'rgba(6, 182, 212, 0.30)',
    activeShadow: '0 0 14px rgba(6, 182, 212, 0.45)',
  },
  'navigation.items.support': {
    iconColor: '#FB7185',
    bg: 'rgba(251, 113, 133, 0.16)',
    activeBg: 'rgba(251, 113, 133, 0.30)',
    activeShadow: '0 0 14px rgba(251, 113, 133, 0.45)',
  },
  'navigation.items.audit_compliance': {
    iconColor: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.16)',
    activeBg: 'rgba(168, 85, 247, 0.30)',
    activeShadow: '0 0 14px rgba(168, 85, 247, 0.45)',
  },
  'navigation.items.platform_configuration': {
    iconColor: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.16)',
    activeBg: 'rgba(251, 146, 60, 0.30)',
    activeShadow: '0 0 14px rgba(251, 146, 60, 0.45)',
  },
  'navigation.items.system_ops': {
    iconColor: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.16)',
    activeBg: 'rgba(59, 130, 246, 0.30)',
    activeShadow: '0 0 14px rgba(59, 130, 246, 0.45)',
  },
  'navigation.items.account': {
    iconColor: '#22D3EE',
    bg: 'rgba(34, 211, 238, 0.16)',
    activeBg: 'rgba(34, 211, 238, 0.30)',
    activeShadow: '0 0 14px rgba(34, 211, 238, 0.45)',
  },
};
