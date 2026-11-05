// RESPONSIBILITY: Canonical Admin primary business-domain routes and target grouping.
// DATA FLOW: Role shell -> one of 13 domain roots -> canonical domain default -> autonomous leaf; API contracts remain in leaf URL configs.
import { LayoutDashboard, Users, CalendarCheck, ShoppingCart, CreditCard, IndianRupee, Building2, MessageSquare, ShieldCheck, FileBarChart, Download, Settings } from 'lucide-react';

/** The 13 target business-domain roots. Profile and navigation shell are not primary destinations. */
export const ADMIN_DOMAIN_ROOT_ROUTES = {
  dashboard: '/frontend_admin/admin_dashboard',
  members: '/frontend_admin/admin_members',
  attendance: '/frontend_admin/admin_attendance',
  sales: '/frontend_admin/admin_sales',
  billing: '/frontend_admin/admin_billing',
  finance: '/frontend_admin/admin_finance',
  hr: '/frontend_admin/admin_hr',
  gyms: '/frontend_admin/admin_gyms',
  communication: '/frontend_admin/admin_communication',
  security: '/frontend_admin/admin_security',
  reports: '/frontend_admin/admin_reports',
  dataExport: '/frontend_admin/admin_data_export',
  settings: '/frontend_admin/admin_settings',
} as const;

/** Domain roots alone are primary destinations; autonomous leaves are secondary navigation. Former frontend aliases are intentionally unsupported. */
export const ADMIN_NAV_GROUPS = [
  { groupKey: 'overview', items: [{ href: ADMIN_DOMAIN_ROOT_ROUTES.dashboard, labelKey: 'dashboard', icon: LayoutDashboard }] },
  { groupKey: 'operations', items: [
    { href: ADMIN_DOMAIN_ROOT_ROUTES.members, labelKey: 'members', icon: Users },
    { href: ADMIN_DOMAIN_ROOT_ROUTES.attendance, labelKey: 'attendance', icon: CalendarCheck },
    { href: ADMIN_DOMAIN_ROOT_ROUTES.sales, labelKey: 'sales', icon: ShoppingCart },
    { href: ADMIN_DOMAIN_ROOT_ROUTES.gyms, labelKey: 'gyms', icon: Building2 },
  ] },
  { groupKey: 'financeBilling', items: [
    { href: ADMIN_DOMAIN_ROOT_ROUTES.billing, labelKey: 'billing', icon: CreditCard },
    { href: ADMIN_DOMAIN_ROOT_ROUTES.finance, labelKey: 'finance', icon: IndianRupee },
  ] },
  { groupKey: 'people', items: [{ href: ADMIN_DOMAIN_ROOT_ROUTES.hr, labelKey: 'hr', icon: Users }] },
  { groupKey: 'communication', items: [{ href: ADMIN_DOMAIN_ROOT_ROUTES.communication, labelKey: 'communication', icon: MessageSquare }] },
  { groupKey: 'accessControl', items: [{ href: ADMIN_DOMAIN_ROOT_ROUTES.security, labelKey: 'security', icon: ShieldCheck }] },
  { groupKey: 'insights', items: [{ href: ADMIN_DOMAIN_ROOT_ROUTES.reports, labelKey: 'reports', icon: FileBarChart }] },
  { groupKey: 'system', items: [
    { href: ADMIN_DOMAIN_ROOT_ROUTES.dataExport, labelKey: 'dataExport', icon: Download },
    { href: ADMIN_DOMAIN_ROOT_ROUTES.settings, labelKey: 'settings', icon: Settings },
  ] },
] as const;

/** Canonical profile and shell destinations mirror verified owning-leaf URL configs. */
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
export const ADMIN_DASHBOARD_ROUTE = ADMIN_DASHBOARD_URL;
export const ADMIN_PROFILE_URL = '/frontend_admin/admin_profile/profile_overview' as const;
export const ADMIN_SETTINGS_URL = '/frontend_admin/admin_settings/settings_management' as const;
export const ADMIN_NAVIGATION_LAYOUT_URLS = { DASHBOARD: ADMIN_DASHBOARD_URL, PROFILE: ADMIN_PROFILE_URL, SETTINGS: ADMIN_SETTINGS_URL } as const;
export const AdminNavigationLayoutUrlConfig = { PAGES: { PROFILE: ADMIN_PROFILE_URL, SETTINGS: ADMIN_SETTINGS_URL } } as const;
