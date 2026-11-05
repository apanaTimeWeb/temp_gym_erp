'use client';

// DATA FLOW: Profile route → page hook → profile query + dedicated mutation hooks → view components.
// RESPONSIBILITY: Orchestrates profile server state, tab state, mutation intents, and cache reconciliation.


import { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.api';
import { SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.query_keys';
import { useSuperadminAccountProfileOverviewDataExportMutation } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewDataExportMutation';
import { useSuperadminAccountProfileOverviewUpdateProfileMutation } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewUpdateProfileMutation';
import { createSuperadminAccountProfileOverviewFormApiError } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/utils/SuperadminAccountProfileOverviewFormApiErrors';

import type { UpdateSuperadminAccountProfilePayload } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview.types';

/**
 * Purpose: Owns profile route server state and composes dedicated mutation boundaries.
 * Inputs: UI tab changes and validated mutation payloads.
 * Output: profile data, mutation status, and intent-specific action handlers for view components.
 * Side effects: queries, mutations, and intentional profile-query invalidation.
 * Invariant: the view never receives or invokes raw TanStack mutation objects.
 */
/**
 * @description Owns profile server-state loading and feature-local form coordination for the profile page.
 * @dependencies Uses profile queries, mutation hooks, form validation, and unsaved-change infrastructure.
 * @edge-case Preserves recoverable loading/error states and guards dirty forms from accidental navigation.
 */

export function useSuperadminAccountProfileOverviewPage() {
  const idempotencyKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());
  const intentFingerprintSaltRef = useRef<string | null>(null);
  const getIntentKey = async (scope: string, payload: unknown) => {
    // Retain only a salted digest, never a serialized password or other sensitive payload, in hook state.
    intentFingerprintSaltRef.current ??= crypto.randomUUID();
    const serializedPayload = JSON.stringify(payload);
    let fingerprint: string;
    if (globalThis.crypto?.subtle && typeof TextEncoder !== 'undefined') {
      const bytes = new TextEncoder().encode(`${intentFingerprintSaltRef.current}:${serializedPayload}`);
      const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
      fingerprint = Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
    } else {
      // Do not retain sensitive payload text when a secure digest implementation is unavailable.
      fingerprint = crypto.randomUUID();
    }
    const current = idempotencyKeysRef.current.get(scope);
    if (current?.fingerprint === fingerprint) return current.key;
    const key = crypto.randomUUID();
    idempotencyKeysRef.current.set(scope, { fingerprint, key });
    return key;
  };
  const clearIntentKey = (scope: string) => idempotencyKeysRef.current.delete(scope);

  const { data: profileRes, isPending: profileLoading, isError: profileError, refetch: refetchProfile } = useQuery({
    queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all,
    queryFn: async () => {
      const response = await superadminProfileApi.fetchProfile();
      if (!response.success) throw new Error(response.message || 'Failed to load profile');
      return response;
    },
  });
  const profile = profileRes?.data ?? null;

  const updateProfileMutation = useSuperadminAccountProfileOverviewUpdateProfileMutation();
  const dataExportMutation = useSuperadminAccountProfileOverviewDataExportMutation();

  const updatePersonalProfile = async (payload: UpdateSuperadminAccountProfilePayload) => {
    const idempotencyKey = await getIntentKey('profile', payload);
    const response = await updateProfileMutation.mutateAsync({ payload, idempotencyKey });
    if (!response.success) throw createSuperadminAccountProfileOverviewFormApiError(response);
    clearIntentKey('profile');
  };



  return {
    profile,
    profileLoading,
    profileError,
    refetchProfile,
    personalState: updateProfileMutation.isPending ? 'loading' : 'idle',
    updatePersonalProfile,
    requestFullDataExport: dataExportMutation.requestExport,
    isRequestingDataExport: dataExportMutation.isRequesting,
    dataExportCompletionState: dataExportMutation.completionState,
  };
}
