'use client';

import { useQuery } from '@tanstack/react-query';
import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';

/** Owns the edit-modal subscription-plan query and its retry state. */
export function useSuperadminGymsDirectoryGymEditModalPlans() {
  const plansQuery = useQuery({
    queryKey: SUPERADMIN_GYMS_QUERY_KEYS.subscriptionPlans,
    queryFn: async () => {
      const response = await gymsApi.fetchSubscriptionPlans();
      if (!response.success) throw new Error(response.message || 'Failed to load subscription plans');
      return response.data;
    },
  });

  return {
    plans: plansQuery.data ?? [],
    loadingPlans: plansQuery.isPending,
    plansError: plansQuery.isError,
    retryPlans: plansQuery.refetch,
  };
}
