"use client";
// RESPONSIBILITY: Owns Admin profile and password mutation transport, feedback, and query invalidation.
// DATA FLOW: Profile/password form → mutation hook → AdminProfileApi → TanStack Query invalidation → Profile UI and backend feedback.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_admin/admin_profile/profile_overview/constants/AdminProfileOverviewQueryKeys';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/profile_overview/api/admin_profile_overview_api';
import { adminToast } from '@/app/frontend_admin/admin_profile/profile_overview/components/feedback/AdminProfileOverviewToastService';
import { clearAdminProfileIntentIdempotencyKey, getAdminProfileIntentIdempotencyKey } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewIntentIdempotency';
import type { UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';
/** @description useAdminProfileMutations: Owns Admin profile and password mutation transport, feedback, and query invalidation. @dependencies Consumes AdminProfileQueryKeys, AdminProfileApi, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore, AdminProfileTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminProfileMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const intentSignaturesRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string, payload: object) => getAdminProfileIntentIdempotencyKey(idempotencyKeysRef.current, intentSignaturesRef.current, intentId, payload), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminProfileIntentIdempotencyKey(idempotencyKeysRef.current, intentSignaturesRef.current, intentId), []);

  const profileMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: UpdateAdminProfilePayload; idempotencyKey: string }) => AdminProfileApi.updateProfile(payload, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey('profile-update');
      await queryClient.invalidateQueries({ queryKey: ADMIN_PROFILE_QUERY_KEYS.key('detail') });
      adminToast.success(response.message, 'admin_profile-save');
    },
    onError: () => adminToast.error(t('profile.AdminRepair.requestFailed'), 'admin_profile-save'),
  });

  const passwordMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: UpdateAdminPasswordPayload; idempotencyKey: string }) => AdminProfileApi.updatePassword(payload, idempotencyKey),
    onSuccess: async (response, variables) => {
      clearIntentKey('password-change');
      await queryClient.invalidateQueries({ queryKey: ADMIN_PROFILE_QUERY_KEYS.key('detail') });
      adminToast.success(response.message, 'admin_profile-password');
    },
    onError: () => adminToast.error(t('profile.AdminRepair.requestFailed'), 'admin_profile-password'),
  });

  const updateProfile = useCallback((payload: UpdateAdminProfilePayload) => {
    const intentId = 'profile-update';
    return profileMutation.mutateAsync({ payload, idempotencyKey: getIntentKey(intentId, payload) });
  }, [getIntentKey, profileMutation]);

  const updatePassword = useCallback((payload: UpdateAdminPasswordPayload) => {
    const intentId = 'password-change';
    return passwordMutation.mutateAsync({ payload, idempotencyKey: getIntentKey(intentId, payload) });
  }, [getIntentKey, passwordMutation]);

  return { profileMutation, passwordMutation, updateProfile, updatePassword };
}
