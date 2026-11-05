'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations as useFeedbackTranslations } from 'next-intl';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.query_keys';
import { SUPERADMIN_GYMS_DETAIL_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';
import { useSuperadminGymsDetailGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/state/useSuperadminGymsDetailGymGhostLoginStore';
import { resolveSuperadminGymsDetailFeedback } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFeedback';


type GhostLoginGym = { id: string; name: string; plan: string; adminEmail: string };
type GhostLoginIntent = { gymId: string; impersonateKey: string; cookieKey: string };

/** The single authoritative two-step Ghost Login workflow for every Gym entry point. */
export function useSuperadminGymsDetailGhostLoginWorkflow() {
 const feedback = useFeedbackTranslations('superadmin_gyms');

  const t = useTranslations('superadmin_gyms');
  const queryClient = useQueryClient();
  const startGhostLoginState = useSuperadminGymsDetailGymGhostLoginStore((state) => state.startGhostLogin);
  const keysByGym = useRef(new Map<string, { impersonateKey: string; cookieKey: string }>());
  const mutation = useMutation({
    mutationFn: async ({ gymId, impersonateKey, cookieKey }: GhostLoginIntent) => {
      const response = await gymsApi.impersonateTenant(gymId, impersonateKey);
      if (!response.success || !response.data?.token) throw new Error(response.message || t('ui.action_failed_retry'));
      const cookieResponse = await gymsApi.setGhostLoginCookie(response.data.token, cookieKey);
      if (!cookieResponse.success) throw new Error(cookieResponse.message || t('ui.action_failed_retry'));
      return { gymId, response };
    },
    onSuccess: async ({ gymId, response }) => {
      keysByGym.current.delete(gymId);
      startGhostLoginState(gymId);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
      toast.success(response.message, { id: 'superadmin-gym-ghost-login-success' });
      window.location.href = SUPERADMIN_GYMS_MANAGEMENT_ROUTES.ADMIN_DASHBOARD;
    },
    onError: (error: unknown) => toast.error(resolveSuperadminGymsDetailFeedback(error, feedback('errors.unexpected')), { id: 'superadmin-gym-ghost-login-error' }),
  });
  const startGhostLogin = (gym: GhostLoginGym) => {
    const keys = keysByGym.current.get(gym.id) ?? { impersonateKey: crypto.randomUUID(), cookieKey: crypto.randomUUID() };
    keysByGym.current.set(gym.id, keys);
    mutation.mutate({ gymId: gym.id, ...keys });
  };
  return { startGhostLogin, isStartingGhostLogin: mutation.isPending, activeGymId: mutation.variables?.gymId ?? null };
}
