/** Route header metadata is derived from the role-owned navigation registry; all titles use locale keys. */
import { SUPERADMIN_NAV_GROUPS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_config.constants';
import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants';

export interface SuperadminRouteHeaderConfig {
  titleKey: string;
  subtitleKey: string;
}

const SIDEBAR_HEADERS = SUPERADMIN_NAV_GROUPS.flatMap((group) => group.items.map((item) => ({ prefix: item.href, config: { titleKey: item.labelKey, subtitleKey: 'ui.superadmin_workspace_subtitle' } })));
const PRIMARY_SIDEBAR_PREFIXES = new Set(SIDEBAR_HEADERS.map(({ prefix }) => prefix));
const BILLING_HEADERS = SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS
  .filter((item) => !PRIMARY_SIDEBAR_PREFIXES.has(item.href))
  .map((item) => ({ prefix: item.href, config: { titleKey: `navigation.${item.nameKey}`, subtitleKey: 'ui.superadmin_workspace_subtitle' } }));
const ADMIN_ROUTE_HEADERS: ReadonlyArray<{ prefix: string; config: SuperadminRouteHeaderConfig }> = [...SIDEBAR_HEADERS, ...BILLING_HEADERS].sort((left, right) => right.prefix.length - left.prefix.length);

export function getSuperadminRouteHeaderConfig(pathname: string): SuperadminRouteHeaderConfig {
  const match = ADMIN_ROUTE_HEADERS.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return match?.config ?? { titleKey: 'ui.superadmin_fallback_title', subtitleKey: 'ui.superadmin_workspace_subtitle' };
}
