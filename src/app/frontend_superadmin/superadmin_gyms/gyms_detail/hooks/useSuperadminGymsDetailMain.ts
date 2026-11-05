'use client';
// DATA FLOW: Route gymId → detail query/action hooks → route-level UI state → Gym Detail Main view.


import { useState } from 'react';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

// RESPONSIBILITY: Owns Gym Detail route orchestration without JSX, API calls in components, or derived UI calculations.
import { SUPERADMIN_GYMS_DETAIL_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';
import { useSuperadminGymsDetail } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetail';
import { useSuperadminGymsDetailActions } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetailActions';

import type { SuperadminGymsGymDetailViewTab } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_main.types';
import type { SuperadminGymDetailStatus } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail.types';

/**
 * @description Orchestrates Gym Detail route state, selected tab, back navigation, and ghost-login action wiring.
 * @dependencies Uses the route gym identifier, detail query/actions, locale, and feature URL configuration.
 * @edge-case Ghost Login is never invoked without a loaded gym record; missing detail data leaves the user on a recoverable loading/error surface.
 */
export function useSuperadminGymsDetailMain(gymId: string) {
  const locale = useLocale();
  const router = useRouter();
  const query = useSuperadminGymsDetail(gymId);
  const gym = query.data?.data;
  const { startGhostLogin, isStartingGhostLogin } = useSuperadminGymsDetailActions();
  const [activeTab, setActiveTab] = useState<SuperadminGymsGymDetailViewTab>('overview');
  const status: SuperadminGymDetailStatus | undefined = gym?.status;
  const gymForGhostLogin = gym ? { id: gym.gymId, name: gym.gymName, plan: gym.plan, adminEmail: gym.adminEmail } : null;
  const goBackToGyms = () => router.push(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list'));
  const handleGhostLogin = () => { if (gymForGhostLogin) return startGhostLogin(gymForGhostLogin); return Promise.resolve(); };
  return { locale, router, query, gym, status, activeTab, setActiveTab, isStartingGhostLogin, handleGhostLogin, goBackToGyms, billingRoute: SUPERADMIN_GYMS_MANAGEMENT_ROUTES.BILLING_PLANS };
}
