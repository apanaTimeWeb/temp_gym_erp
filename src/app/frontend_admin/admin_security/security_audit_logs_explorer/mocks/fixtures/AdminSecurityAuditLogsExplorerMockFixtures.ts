// RESPONSIBILITY: Owns realistic immutable Audit Logs fixture records, KPI aggregation, and actor/detail demo data.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_audit_logs/audit_logs_explorer/mocks/fixtures/AdminSecurityAuditLogsExplorerMockFixtures.ts)

import { AUDIT_ENTITY_STATUS } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/constants/AdminSecurityAuditLogsExplorerConstants';
import type { AuditKPIData, AuditLog, AuditLogDetail } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes';

export const MOCK_AUDIT_LOGS: AuditLogDetail[] = [
  { id: 'audit-001', timestamp: '2026-09-28T09:15:00Z', action: 'DELETE_PAYMENT', actor: 'Rahul Verma', entityType: 'payment', entityId: 'INV-1042', branchId: 'b1', details: 'Deleted payment INV-1042 after duplicate entry review.', severity: 'high', ipAddress: '192.168.1.10', userAgent: 'Chrome/153 Windows', before: { status: AUDIT_ENTITY_STATUS.PAID, amountMinor: 500000 }, after: { status: AUDIT_ENTITY_STATUS.DELETED }, metadata: { reason: 'duplicate' } },
  { id: 'audit-002', timestamp: '2026-09-28T08:40:00Z', action: 'UPDATE_PLAN', actor: 'Super Admin', entityType: 'plan', entityId: 'PLAN-007', branchId: 'all', details: 'Updated the Annual Pro plan pricing.', severity: 'medium', ipAddress: '10.0.0.1', userAgent: 'Chrome/153 macOS', before: { priceMinor: 1200000 }, after: { priceMinor: 1500000 }, metadata: { section: 'pricing' } },
  { id: 'audit-003', timestamp: '2026-09-27T18:45:00Z', action: 'CREATE_STAFF', actor: 'Super Admin', entityType: 'staff', entityId: 'STAFF-089', branchId: 'b2', details: 'Created trainer Vikas Singh.', severity: 'low', ipAddress: '10.0.0.1', userAgent: 'Chrome/153 macOS', before: {}, after: { role: 'TRAINER' }, metadata: { source: 'admin' } },
  { id: 'audit-004', timestamp: '2026-09-27T15:20:00Z', action: 'REFUND_PAYMENT', actor: 'Pooja Sharma', entityType: 'payment', entityId: 'INV-1090', branchId: 'b2', details: 'Issued a refund after a membership downgrade.', severity: 'high', ipAddress: '192.168.1.22', userAgent: 'Firefox/153 Windows', before: { status: AUDIT_ENTITY_STATUS.PAID }, after: { status: AUDIT_ENTITY_STATUS.REFUNDED }, metadata: { refundMinor: 200000 } },
  { id: 'audit-005', timestamp: '2026-09-27T12:00:00Z', action: 'LOGIN_FAILED', actor: 'Unknown IP', entityType: 'auth', branchId: 'b1', details: 'Multiple failed administrator sign-in attempts detected.', severity: 'high', ipAddress: '203.0.113.5', userAgent: 'Unknown', before: {}, after: {}, metadata: { attempts: 5 } },
  { id: 'audit-006', timestamp: '2026-09-26T11:30:00Z', action: 'UPDATE_MEMBER', actor: 'Rahul Verma', entityType: 'member', entityId: 'MEM-005', branchId: 'b1', details: 'Suspended membership for non-payment.', severity: 'medium', ipAddress: '192.168.1.10', userAgent: 'Chrome/153 Windows', before: { membershipStatus: AUDIT_ENTITY_STATUS.ACTIVE }, after: { membershipStatus: AUDIT_ENTITY_STATUS.SUSPENDED }, metadata: { reason: 'non-payment' } },
  { id: 'audit-007', timestamp: '2026-09-26T09:10:00Z', action: 'UPDATE_SETTINGS', actor: 'Super Admin', entityType: 'settings', branchId: 'all', details: 'Enabled two-factor authentication for administrator accounts.', severity: 'medium', ipAddress: '10.0.0.1', userAgent: 'Chrome/153 macOS', before: { twoFactor: false }, after: { twoFactor: true }, metadata: { setting: 'security' } },
  { id: 'audit-008', timestamp: '2026-09-25T16:00:00Z', action: 'CREATE_MEMBER', actor: 'Priya K', entityType: 'member', entityId: 'MEM-011', branchId: 'b3', details: 'Created a new member record from the admin portal.', severity: 'low', ipAddress: '192.168.1.33', userAgent: 'Safari/18 iOS', before: {}, after: { status: AUDIT_ENTITY_STATUS.ACTIVE }, metadata: { source: 'manual' } },
  { id: 'audit-009', timestamp: '2026-09-25T13:25:00Z', action: 'DELETE_STAFF', actor: 'Super Admin', entityType: 'staff', entityId: 'STAFF-041', branchId: 'b2', details: 'Removed staff record following resignation.', severity: 'high', ipAddress: '10.0.0.1', userAgent: 'Chrome/153 macOS', before: { status: AUDIT_ENTITY_STATUS.ACTIVE }, after: { status: AUDIT_ENTITY_STATUS.DELETED }, metadata: { reason: 'resignation' } },
  { id: 'audit-010', timestamp: '2026-09-24T10:15:00Z', action: 'PAYMENT_ADDED', actor: 'Rahul Verma', entityType: 'payment', entityId: 'INV-1089', branchId: 'b1', details: 'Recorded a UPI membership payment.', severity: 'low', ipAddress: '192.168.1.10', userAgent: 'Chrome/153 Windows', before: {}, after: { status: AUDIT_ENTITY_STATUS.PAID }, metadata: { paymentMode: 'UPI' } },
  { id: 'audit-011', timestamp: '2026-09-23T08:30:00Z', action: 'UPDATE_BRANCH', actor: 'Super Admin', entityType: 'branch', entityId: 'b3', branchId: 'b3', details: 'Updated the branch manager assignment.', severity: 'medium', ipAddress: '10.0.0.1', userAgent: 'Chrome/153 macOS', before: { manager: 'Old Manager' }, after: { manager: 'Priya K' }, metadata: { section: 'manager' } },
  { id: 'audit-012', timestamp: '2026-09-22T07:45:00Z', action: 'CREATE_PLAN', actor: 'Super Admin', entityType: 'plan', entityId: 'PLAN-011', branchId: 'all', details: 'Created a new membership plan.', severity: 'low', ipAddress: '10.0.0.1', userAgent: 'Chrome/153 macOS', before: {}, after: { status: AUDIT_ENTITY_STATUS.ACTIVE }, metadata: { durationMonths: 12 } },
];

export const MOCK_AUDIT_KPI: AuditKPIData = {
  totalLogs: MOCK_AUDIT_LOGS.length,
  actionsToday: 2,
  uniqueActors: new Set(MOCK_AUDIT_LOGS.map((log) => log.actor)).size,
  criticalEvents: MOCK_AUDIT_LOGS.filter((log) => log.severity === 'high').length,
};

export const MOCK_AUDIT_ACTORS = [...new Set(MOCK_AUDIT_LOGS.map((log) => log.actor))];
