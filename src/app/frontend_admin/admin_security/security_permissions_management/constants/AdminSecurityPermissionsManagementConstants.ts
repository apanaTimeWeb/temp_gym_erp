// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_permissions/permissions_management/constants/AdminSecurityPermissionsManagementConstants.ts)

import type { PermissionFeature, RoleType } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';


export const PERMISSION_GROUPS = ['Members', 'Finance', 'HR', 'Attendance', 'Reports', 'Settings', 'Store'] as const;

export const PERMISSION_FEATURES: PermissionFeature[] = [
  { key: 'members.view', labelKey: 'permissions.AdminPermissionsCatalog.members.view.label', group: 'Members', descriptionKey: 'permissions.AdminPermissionsCatalog.members.view.description' },
  { key: 'members.create', labelKey: 'permissions.AdminPermissionsCatalog.members.create.label', group: 'Members', descriptionKey: 'permissions.AdminPermissionsCatalog.members.create.description' },
  { key: 'members.edit', labelKey: 'permissions.AdminPermissionsCatalog.members.edit.label', group: 'Members', descriptionKey: 'permissions.AdminPermissionsCatalog.members.edit.description' },
  { key: 'members.delete', labelKey: 'permissions.AdminPermissionsCatalog.members.delete.label', group: 'Members', descriptionKey: 'permissions.AdminPermissionsCatalog.members.delete.description' },
  { key: 'finance.view', labelKey: 'permissions.AdminPermissionsCatalog.finance.view.label', group: 'Finance', descriptionKey: 'permissions.AdminPermissionsCatalog.finance.view.description' },
  { key: 'finance.collect', labelKey: 'permissions.AdminPermissionsCatalog.finance.collect.label', group: 'Finance', descriptionKey: 'permissions.AdminPermissionsCatalog.finance.collect.description' },
  { key: 'finance.expenses', labelKey: 'permissions.AdminPermissionsCatalog.finance.expenses.label', group: 'Finance', descriptionKey: 'permissions.AdminPermissionsCatalog.finance.expenses.description' },
  { key: 'finance.refunds', labelKey: 'permissions.AdminPermissionsCatalog.finance.refunds.label', group: 'Finance', descriptionKey: 'permissions.AdminPermissionsCatalog.finance.refunds.description' },
  { key: 'hr.view', labelKey: 'permissions.AdminPermissionsCatalog.hr.view.label', group: 'HR', descriptionKey: 'permissions.AdminPermissionsCatalog.hr.view.description' },
  { key: 'hr.manage', labelKey: 'permissions.AdminPermissionsCatalog.hr.manage.label', group: 'HR', descriptionKey: 'permissions.AdminPermissionsCatalog.hr.manage.description' },
  { key: 'hr.payroll', labelKey: 'permissions.AdminPermissionsCatalog.hr.payroll.label', group: 'HR', descriptionKey: 'permissions.AdminPermissionsCatalog.hr.payroll.description' },
  { key: 'attendance.view', labelKey: 'permissions.AdminPermissionsCatalog.attendance.view.label', group: 'Attendance', descriptionKey: 'permissions.AdminPermissionsCatalog.attendance.view.description' },
  { key: 'attendance.mark', labelKey: 'permissions.AdminPermissionsCatalog.attendance.mark.label', group: 'Attendance', descriptionKey: 'permissions.AdminPermissionsCatalog.attendance.mark.description' },
  { key: 'reports.view', labelKey: 'permissions.AdminPermissionsCatalog.reports.view.label', group: 'Reports', descriptionKey: 'permissions.AdminPermissionsCatalog.reports.view.description' },
  { key: 'reports.export', labelKey: 'permissions.AdminPermissionsCatalog.reports.export.label', group: 'Reports', descriptionKey: 'permissions.AdminPermissionsCatalog.reports.export.description' },
  { key: 'settings.view', labelKey: 'permissions.AdminPermissionsCatalog.settings.view.label', group: 'Settings', descriptionKey: 'permissions.AdminPermissionsCatalog.settings.view.description' },
  { key: 'settings.edit', labelKey: 'permissions.AdminPermissionsCatalog.settings.edit.label', group: 'Settings', descriptionKey: 'permissions.AdminPermissionsCatalog.settings.edit.description' },
  { key: 'store.view', labelKey: 'permissions.AdminPermissionsCatalog.store.view.label', group: 'Store', descriptionKey: 'permissions.AdminPermissionsCatalog.store.view.description' },
  { key: 'store.manage', labelKey: 'permissions.AdminPermissionsCatalog.store.manage.label', group: 'Store', descriptionKey: 'permissions.AdminPermissionsCatalog.store.manage.description' },
];

export const ROLE_OPTIONS: ReadonlyArray<{ value: RoleType; labelKey: string; descriptionKey: string }> = [
  { value: 'manager', labelKey: 'permissions.AdminPermissionsCatalog.roles.manager.label', descriptionKey: 'permissions.AdminPermissionsCatalog.roles.manager.description' },
  { value: 'trainer', labelKey: 'permissions.AdminPermissionsCatalog.roles.trainer.label', descriptionKey: 'permissions.AdminPermissionsCatalog.roles.trainer.description' },
  { value: 'receptionist', labelKey: 'permissions.AdminPermissionsCatalog.roles.receptionist.label', descriptionKey: 'permissions.AdminPermissionsCatalog.roles.receptionist.description' },
];
