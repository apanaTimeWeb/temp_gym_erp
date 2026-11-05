// RESPONSIBILITY: Owns module-local fixture or mock-state data for permissions_management; it does not persist production business entities.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_permissions/permissions_management/mocks/fixtures/AdminSecurityPermissionsManagementMockFixtures.ts)

import type { RolePermissions, StaffOverride } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';

export const MOCK_ADMIN_PERMISSIONS: RolePermissions[] = [
  { role: 'manager', permissions: { 'members.view': true, 'members.create': true, 'members.edit': true, 'members.delete': false, 'finance.view': true, 'finance.collect': true, 'finance.expenses': true, 'finance.refunds': false, 'hr.view': true, 'hr.manage': true, 'hr.payroll': false, 'attendance.view': true, 'attendance.mark': true, 'reports.view': true, 'reports.export': true, 'settings.view': true, 'settings.edit': true, 'store.view': true, 'store.manage': true } },
  { role: 'trainer', permissions: { 'members.view': true, 'members.create': false, 'members.edit': false, 'members.delete': false, 'finance.view': false, 'finance.collect': false, 'finance.expenses': false, 'finance.refunds': false, 'hr.view': false, 'hr.manage': false, 'hr.payroll': false, 'attendance.view': true, 'attendance.mark': true, 'reports.view': false, 'reports.export': false, 'settings.view': false, 'settings.edit': false, 'store.view': true, 'store.manage': false } },
  { role: 'receptionist', permissions: { 'members.view': true, 'members.create': true, 'members.edit': true, 'members.delete': false, 'finance.view': true, 'finance.collect': true, 'finance.expenses': false, 'finance.refunds': false, 'hr.view': false, 'hr.manage': false, 'hr.payroll': false, 'attendance.view': true, 'attendance.mark': true, 'reports.view': false, 'reports.export': false, 'settings.view': false, 'settings.edit': false, 'store.view': true, 'store.manage': false } },
];

export const MOCK_ADMIN_PERMISSION_OVERRIDES: StaffOverride[] = [
  { staffId: 'staff-1001', staffName: 'Rahul Sharma', role: 'manager', overrides: { 'reports.export': false, 'finance.expenses': true } },
  { staffId: 'staff-1002', staffName: 'Priya Singh', role: 'trainer', overrides: { 'members.edit': true } },
];
