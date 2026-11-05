'use client';
// RESPONSIBILITY: Owns the Superadmin personal-profile mutation and backend feedback.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.api';
import { SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.query_keys';

import type { UpdateSuperadminAccountProfilePayload } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview.types';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_account_profile view components.
/**
 * Purpose: Dedicated mutation boundary for updating Superadmin personal profile data.
 * Inputs: validated profile payload plus one idempotency key generated for the user intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: network mutation and backend-message toast.
 * Invariant: query/cache ownership remains with the page orchestration hook.
 */
/**
 * @description Updates the authenticated Superadmin profile and reconciles the profile query.
 * @dependencies Uses the profile API, validated form contract, idempotency lifecycle, and TanStack Query.
 * @edge-case Preserves server response values rather than maintaining a conflicting local copy.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminAccountProfileOverviewUpdateProfileMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile update profile mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAccountProfileOverviewUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_account_profile');
  return useMutation({
    mutationFn: async ({ payload, idempotencyKey }: { payload: UpdateSuperadminAccountProfilePayload; idempotencyKey: string }) => {
      const response = await superadminProfileApi.updateProfile(payload, idempotencyKey);
      if (!response.success) throw new Error(response.message || t('ui.action_failed_retry'));
      return response;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all });
      toast.success(response.message, { id: 'superadmin-profile-update-success' });
    },
    onError: (error: unknown) => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-update-error' });
    },
  });
}
