const SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE = '/superadmin/system-ops/jobs';
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_system_ops/system_ops_jobs', CANONICAL_LEAF: '/frontend_superadmin/superadmin_system_ops/system_ops_jobs' } as const),

} as const;
export const SUPERADMIN_SYSTEM_OPS_JOBS_API = {
  ...({ BASE: SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE, RETRY_ALL: `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/retry-all`, JOB_BY_ID: (id: string) => `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/${encodeURIComponent(id)}`, RETRY_JOB: (id: string) => `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/${encodeURIComponent(id)}/retry`, CANCEL_JOB: (id: string) => `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/${encodeURIComponent(id)}/cancel`, CLEAR_COMPLETED: `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/clear-completed`, BULK_RETRY: `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/bulk-retry`, BULK_DELETE: `${SUPERADMIN_SYSTEM_OPS_JOBS_API_BASE}/bulk-delete` } as const),
  SUPERADMIN_SYSTEM_OPS_JOBS_QUEUE_HEALTH: ({ BACKEND_API: { BASE: '/superadmin/system-ops/jobs/queue-health' } } as const),
} as const;
