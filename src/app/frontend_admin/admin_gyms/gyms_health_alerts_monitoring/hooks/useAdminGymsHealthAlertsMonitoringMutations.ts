"use client";
// RESPONSIBILITY: Owns the Admin Gym Health Alerts dismiss mutation and cache recovery.
// DATA FLOW: Alert action → mutation hook → AdminGymHealthAlertsApi → TanStack Query invalidation → alert UI and backend feedback.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/constants/AdminGymsHealthAlertsMonitoringQueryKeys';
import { AdminGymHealthAlertsApi } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/api/admin_gyms_health_alerts_monitoring_api';
import { adminToast } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/feedback/AdminGymsHealthAlertsMonitoringToastService';
import { useTranslations } from 'next-intl';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/utils/AdminGymsHealthAlertsMonitoringIdempotencyIntentStore';
/** @description useAdminGymHealthAlertsMutations: Owns the Admin Gym Health Alerts dismiss mutation and cache recovery. @dependencies Consumes AdminGymHealthAlertsQueryKeys, AdminGymHealthAlertsApi, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminGymHealthAlertsMutations() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  const intentKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const dismissMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminGymHealthAlertsApi.dismissAlert(id, idempotencyKey),
    onSuccess: async (_response, variables) => {
      clearIntentKey(`dismiss:${variables.id}`);
      await queryClient.invalidateQueries({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('list') });
      await queryClient.invalidateQueries({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('summary') });
      adminToast.success(t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissSuccess'), `admin-gym-health-alert-dismiss-${variables.id}`);
    },
    onError: (_error, variables) => {
      // An ambiguous timeout may have committed: keep the same key for a retry.
      void queryClient.invalidateQueries({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('list') });
      adminToast.error(t('gym-health-alerts.GymHealthAlertsError.text_7716400a2c'), `admin-gym-health-alert-dismiss-error-${variables.id}`);
    },
  });
  return { dismissMutation, getIntentKey, clearIntentKey };
}
