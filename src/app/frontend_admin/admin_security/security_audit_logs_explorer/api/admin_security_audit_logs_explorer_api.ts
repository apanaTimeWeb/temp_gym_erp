// RESPONSIBILITY: Owns the verified typed read-only Audit Logs JSON contract; unverified raw-Blob export is blocked until host transport is defined.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_audit_logs/audit_logs_explorer/api/admin_security_audit_logs_explorer_api.ts)

import { adminAuditLogsExplorerApiFetch as apiFetch } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerApiResponse';
import { ADMIN_AUDIT_LOGS_API } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/config/admin_security_audit_logs_explorer.url_config';
import type { AdminAuditLogsQueryParams, AuditActorsResponse, AuditKPIData, AuditLog, AuditLogDetail, AuditLogExportFilters } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes';
import { auditActorsSchema, auditKpiDataSchema, auditLogDetailSchema, auditLogSchema } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/schemas/AdminSecurityAuditLogsExplorerSchemas';
import { z } from 'zod';

function buildQuery(params?: AdminAuditLogsQueryParams | AuditLogExportFilters): string {
  const search = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') search.set(key, String(value)); });
  const query = search.toString();
  return query ? `?${query}` : '';
}

export class AdminSecurityAuditLogsExplorerBinaryExportContractError extends Error {
  readonly code = 'BINARY_EXPORT_CONTRACT_UNVERIFIED';

  constructor() {
    super('CSV export is blocked because the host binary-response contract was not supplied.');
    this.name = 'AdminSecurityAuditLogsExplorerBinaryExportContractError';
  }
}

export const AdminAuditLogsApi = {
  fetchAuditLogs: async (params: AdminAuditLogsQueryParams) => apiFetch<AuditLog[]>(`${ADMIN_AUDIT_LOGS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(auditLogSchema) }),
  fetchAuditLogById: async (id: string) => apiFetch<AuditLogDetail>(ADMIN_AUDIT_LOGS_API.detail(id), { method: 'GET', dataSchema: auditLogDetailSchema }),
  fetchAuditKPIs: async () => apiFetch<AuditKPIData>(ADMIN_AUDIT_LOGS_API.kpis, { method: 'GET', dataSchema: auditKpiDataSchema }),
  fetchActors: async () => apiFetch<AuditActorsResponse>(ADMIN_AUDIT_LOGS_API.actors, { method: 'GET', dataSchema: auditActorsSchema }),

  /** @description Blocks binary export until the host API contract defines safe Blob decoding. @param params - Verified export-filter values; not sent while the transport contract is absent. @returns A Blob only after the host transport contract is supplied; currently rejects with a typed contract-block error. */
  exportAuditLogs: async (params: AuditLogExportFilters): Promise<Blob> => {
    // Do not bypass apiFetch or guess how the host wrapper decodes binary responses.
    void params;
    throw new AdminSecurityAuditLogsExplorerBinaryExportContractError();
  },
};
