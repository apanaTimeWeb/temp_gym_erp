'use client';
// DATA FLOW: Inputs enter useSuperadminTeamManagementAlertPreferences, flow through its feature-owned API/query dependencies, and return typed UI state/actions to the Team panel.
// RESPONSIBILITY: Owns Team alert-preference mutation and Query reconciliation.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { updateTeamAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.api';
import { SUPERADMIN_TEAM_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.query_keys';

import type { SuperadminTeamAlertPreferenceUpdate } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types';

export class SuperadminTeamAlertPreferenceApiError extends Error {
  constructor(message: string) { super(message); this.name = 'SuperadminTeamAlertPreferenceApiError'; }
}

interface SuperadminTeamAlertPreferenceIntent {
  identity: string;
  idempotencyKey: string;
}

/**
 * Purpose: Keeps alert preference persistence out of the Team panel component.
 * Inputs: feature-owned alert preference values.
 * Output: save action, pending state, error.
 * Side effects: refreshes Team Query data after success.
 * Invariant: one idempotency key belongs to one normalized preferences payload.
 */
export function useSuperadminTeamManagementAlertPreferences() {
  const intentRef = useRef<SuperadminTeamAlertPreferenceIntent | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_team');

  const mutation = useMutation({
    mutationFn: async ({ preferences, identity, idempotencyKey }: {
      preferences: SuperadminTeamAlertPreferenceUpdate[];
      identity: string;
      idempotencyKey: string;
    }) => {
      const response = await updateTeamAlertPreferences(preferences, idempotencyKey);
      if (!response.success) throw new SuperadminTeamAlertPreferenceApiError(response.message || t('ui.save_preferences_failed'));
      if (intentRef.current?.identity === identity) intentRef.current = null;
      return response;
    },
    onSuccess: async () => {
      // A successful save remains successful even if a follow-up cache refresh fails.
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: SUPERADMIN_TEAM_QUERY_KEYS.all }),
      ]);
    },
  });

  const savePreferences = (preferences: SuperadminTeamAlertPreferenceUpdate[]) => {
    const identity = JSON.stringify(
      [...preferences]
        .map(({ name, enabled }) => ({ name, enabled }))
        .sort((left, right) => left.name.localeCompare(right.name)),
    );
    if (intentRef.current?.identity !== identity) {
      intentRef.current = { identity, idempotencyKey: crypto.randomUUID() };
    }
    return mutation.mutateAsync({ preferences, identity, idempotencyKey: intentRef.current.idempotencyKey });
  };

  return { savePreferences, isSaving: mutation.isPending, error: mutation.error };
}
