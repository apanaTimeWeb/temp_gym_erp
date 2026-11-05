'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminGymsDetailExitGhostLogin → consuming feature component.


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.query_keys';
import { SUPERADMIN_GYMS_DETAIL_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';
import { useSuperadminGymsDetailGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/state/useSuperadminGymsDetailGymGhostLoginStore';

/**
 * @description Exits the active Ghost Login session through the feature API, then clears local UI state and redirects to the Gyms page.
 * @dependencies Uses the feature API, URL config, and UI-only ghost-login store.
 * @edge-case The same idempotency key is reused when the exit operation is retried until the authoritative exit succeeds.
 */
export function useSuperadminGymsDetailExitGhostLogin() {
  const queryClient = useQueryClient();
  const clearGhostLogin = useSuperadminGymsDetailGymGhostLoginStore((state) => state.clearGhostLogin);
  const keyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: async (idempotencyKey: string) => {
      const response = await gymsApi.exitGhostLogin(idempotencyKey);
      if (!response.success) throw new Error(response.message);
      return response;
    },
    onSuccess: async () => {
      keyRef.current = null;
      clearGhostLogin();
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
      window.location.href = SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list');
    },
  });
  const exitGhostLogin = () => { keyRef.current ??= crypto.randomUUID(); return mutation.mutateAsync(keyRef.current); };
  return { exitGhostLogin, isExitingGhostLogin: mutation.isPending, error: mutation.error };
}
