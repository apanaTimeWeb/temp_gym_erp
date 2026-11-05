'use client';
// RESPONSIBILITY: Owns only UI filter, pagination, and selected-detail state for the Admin Audit Logs module.
// DATA FLOW: module API / client state → useAdminAuditLogsStore → consuming Admin feature component.

import type { AdminAuditLogsStore } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerStoreTypes';
import { normalizeAdminSecurityAuditLogsExplorerUrlPage } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerUrlPage';
import { create } from 'zustand';
/**
 * @description useAdminAuditLogsStore: Owns only UI filter, pagination, and selected-detail state for the Admin Audit Logs module.
 * @dependencies Consumes AdminAuditLogsStoreTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminAuditLogsStore = create<AdminAuditLogsStore>((set) => ({
  actorFilter: 'all', setActorFilter: (value) => set({ actorFilter: value, currentPage: 1 }),
  actionFilter: 'all', setActionFilter: (value) => set({ actionFilter: value, currentPage: 1 }),
  entityFilter: 'all', setEntityFilter: (value) => set({ entityFilter: value, currentPage: 1 }),
  dateFrom: '', setDateFrom: (value) => set({ dateFrom: value, currentPage: 1 }),
  dateTo: '', setDateTo: (value) => set({ dateTo: value, currentPage: 1 }),
  currentPage: 1, setCurrentPage: (value) => set({ currentPage: normalizeAdminSecurityAuditLogsExplorerUrlPage(value) }),
  selectedLogId: null, setSelectedLogId: (value) => set({ selectedLogId: value }),
}));
