// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useCallback, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import { useManagerBusinessSettingsMutations } from '@/app/frontend_manager/manager_dashboard/business_settings/hooks/useManagerBusinessSettingsMutations';
import { useManagerBusinessSettingsQuery } from '@/app/frontend_manager/manager_dashboard/business_settings/hooks/useManagerBusinessSettingsQuery';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates settings feature state and its documented UI/API boundary through useManagerBusinessSettingsLogic.
 * @dependencies Uses ManagerIdempotency, useManagerBusinessSettingsQuery, ManagerBusinessSettingsTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerBusinessSettingsLogic owns the settings feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerBusinessSettingsLogic() {
  const t = useTranslations('MANAGER_BUSINESS_SETTINGS');
  const query = useManagerBusinessSettingsQuery();
  const settingsMutation = useManagerBusinessSettingsMutations();
  const idempotencyKeyRef = useRef<string | null>(null);
  const saveSettings = useCallback(async (draft: ManagerAllSettings) => {
    const idempotencyKey = idempotencyKeyRef.current ?? ManagerInfrastructureIdempotency();
    idempotencyKeyRef.current = idempotencyKey;
    const response = await settingsMutation.mutateAsync({ draft, idempotencyKey });
    idempotencyKeyRef.current = null;
    return response;
  }, [settingsMutation]);
  return {
    settings: query.data?.data ?? null,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error ? ManagerInfrastructureGetErrorMessage(query.error, t('TEXT_GENERIC_ERROR')) : '',
    saveSettings,
    retry: query.refetch,
    saving: settingsMutation.isPending,
  };
}
