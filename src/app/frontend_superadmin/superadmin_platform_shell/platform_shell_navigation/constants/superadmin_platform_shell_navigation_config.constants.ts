import { BarChart2, Building2, Briefcase, CreditCard, Home, Mail, Settings, Shield, Ticket, User, Users, Wrench } from 'lucide-react';

import { SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES as SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/config/superadmin_platform_shell_navigation.url_config';

import type { LucideIcon } from 'lucide-react';

/** Each primary destination is one real business-domain container; leaf screens use domain secondary navigation. */
export interface SuperadminPlatformShellNavigationItemConfig {
  labelKey: string;
  href: string;
  icon: LucideIcon;
}

export interface SuperadminPlatformShellNavigationGroupConfig {
  labelKey: string;
  items: readonly SuperadminPlatformShellNavigationItemConfig[];
}

export const SUPERADMIN_NAV_GROUPS: readonly SuperadminPlatformShellNavigationGroupConfig[] = [
  {
    labelKey: 'navigation.groups.overview',
    items: [
      { labelKey: 'navigation.items.dashboard', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.DASHBOARD, icon: Home },
      { labelKey: 'navigation.items.analytics', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.ANALYTICS, icon: BarChart2 },
    ],
  },
  {
    labelKey: 'navigation.groups.tenant_management',
    items: [
      { labelKey: 'navigation.items.gyms', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.GYMS, icon: Building2 },
      { labelKey: 'navigation.items.billing', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.BILLING, icon: CreditCard },
      { labelKey: 'navigation.items.affiliates', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.AFFILIATES, icon: Users },
      { labelKey: 'navigation.items.team', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.TEAM, icon: Briefcase },
    ],
  },
  {
    labelKey: 'navigation.groups.communication',
    items: [
      { labelKey: 'navigation.items.communication', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.COMMUNICATION, icon: Mail },
      { labelKey: 'navigation.items.support', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.SUPPORT, icon: Ticket },
    ],
  },
  {
    labelKey: 'navigation.groups.platform',
    items: [
      { labelKey: 'navigation.items.audit_compliance', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.AUDIT_COMPLIANCE, icon: Shield },
      { labelKey: 'navigation.items.platform_configuration', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.PLATFORM_CONFIGURATION, icon: Settings },
      { labelKey: 'navigation.items.system_ops', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.SYSTEM_OPS, icon: Wrench },
    ],
  },
  {
    labelKey: 'navigation.groups.account',
    items: [
      { labelKey: 'navigation.items.account', href: SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.ACCOUNT, icon: User },
    ],
  },
];
