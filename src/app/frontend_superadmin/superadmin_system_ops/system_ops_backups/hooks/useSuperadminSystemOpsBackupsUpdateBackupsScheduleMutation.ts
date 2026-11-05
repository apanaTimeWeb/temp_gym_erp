'use client';

// DATA FLOW: Backups schedule form → dedicated mutation → API → query reconciliation → refreshed schedule.
// RESPONSIBILITY: Owns the Backups schedule update mutation and idempotency-key lifecycle.


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.query_keys';
import { SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_schedule.schemas';
import { createSuperadminSystemOpsBackupsFormApiError } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/utils/SuperadminSystemOpsBackupsFormApiErrors';

import type { SuperadminBackupsScheduleInput } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_schedule.types';

/** @description Persists a validated backup schedule and reconciles the canonical query cache. */
export function useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  return useMutation({
    mutationFn: async (input: SuperadminBackupsScheduleInput) => {
      const validated = SuperadminBackupsScheduleInputSchema.parse(input);
      const fingerprint = JSON.stringify(validated);
      if (!idempotencyKeyRef.current || idempotencyKeyRef.current.fingerprint !== fingerprint) idempotencyKeyRef.current = { fingerprint, key: crypto.randomUUID() };
      return updateBackupSchedule(validated, idempotencyKeyRef.current.key);
    },
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw createSuperadminSystemOpsBackupsFormApiError(response);
      idempotencyKeyRef.current = null;
      queryClient.setQueryData(SUPERADMIN_BACKUPS_QUERY_KEYS.schedule, response);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.schedule });
    },
  });
}
