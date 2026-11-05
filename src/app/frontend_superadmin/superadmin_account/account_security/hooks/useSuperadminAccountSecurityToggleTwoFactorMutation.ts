'use client';
// RESPONSIBILITY: Owns the Superadmin two-factor-authentication toggle mutation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_account/account_security/api/superadmin_account_security.api';
import { SUPERADMIN_ACCOUNT_SECURITY_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_account/account_security/api/superadmin_account_security.query_keys';

import type { Toggle2FAPayload } from '@/app/frontend_superadmin/superadmin_account/account_security/types/superadmin_account_security.types';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_account_profile view components.
/**
 * Purpose: Dedicated mutation boundary for enabling/disabling two-factor authentication.
 * Inputs: validated toggle payload plus one idempotency key per confirmed user intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: two-factor update request and backend-message toast.
 * Invariant: the profile query is reconciled by the owning page hook after success.
 */
/**
 * @description Toggles two-factor authentication through the profile API and updates the authoritative profile cache.
 * @dependencies Uses the profile API, idempotency-key lifecycle, and query-key registry.
 * @edge-case Keeps failed attempts retryable and avoids optimistic security-state changes.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminAccountSecurityToggleTwoFactorMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile toggle two factor mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAccountSecurityToggleTwoFactorMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_account_profile');
  return useMutation({
    mutationFn: async ({ payload, idempotencyKey }: { payload: Toggle2FAPayload; idempotencyKey: string }) => {
      const response = await superadminProfileApi.updateTwoFactor(payload, idempotencyKey);
      if (!response.success) throw new Error(response.message || t('ui.action_failed_retry'));
      return response;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_SECURITY_QUERY_KEYS.all });
      toast.success(response.message, { id: 'superadmin-profile-2fa-success' });
    },
    onError: (error: unknown) => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-2fa-error' });
    },
  });
}
