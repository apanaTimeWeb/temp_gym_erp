'use client';

// DATA FLOW: Backups schedule modal → query registry → schedule API → validated query response.
// RESPONSIBILITY: Owns read-only Backups schedule server state.


import { useQuery } from '@tanstack/react-query';

import { fetchBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.query_keys';
import { createSuperadminSystemOpsBackupsFormApiError } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/utils/SuperadminSystemOpsBackupsFormApiErrors';

/** @description Loads the feature-owned automated backup schedule. */
export function useSuperadminSystemOpsBackupsScheduleQuery(enabled: boolean) {
  const query = useQuery({
    queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.schedule,
    queryFn: async () => {
      const response = await fetchBackupSchedule();
      if (!response.success || !response.data) throw createSuperadminSystemOpsBackupsFormApiError(response);
      return response;
    },
    enabled,
  });
  return { schedule: query.data?.data, isPending: query.isPending, isError: query.isError, error: query.error, refetch: query.refetch };
}
