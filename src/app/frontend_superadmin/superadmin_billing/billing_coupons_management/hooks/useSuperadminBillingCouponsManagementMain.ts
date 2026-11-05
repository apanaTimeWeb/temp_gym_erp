'use client';
// DATA FLOW: Coupon page → local drawer event state + useSuperadminBillingCouponsManagement → composed child views.
// RESPONSIBILITY: Owns route-level coupon drawer coordination and delegates CRUD/filter state to the feature hook.
import { useEffect, useState } from 'react';

import { useSuperadminBillingCouponsManagement } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagement';

import type { Coupon } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';



/**
 * @description Coordinates Coupon page drawer state and the feature-owned history-opening browser event.
 * @dependencies Composes the Coupons data hook and registers a scoped event listener during client lifecycle.
 * @edge-case The listener is always removed on unmount so repeated navigation cannot accumulate duplicate drawer openings.
 */
export function useSuperadminBillingCouponsManagementMain() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerCoupon, setDrawerCoupon] = useState<Coupon | null>(null);
// EFFECT INTENT: Subscribes to the module-owned history-open event and removes the exact listener on unmount; dependency array is intentionally empty because the handler is stable for the hook lifetime.
  useEffect(() => {
    const handleOpenHistory = (event: Event) => {
      const customEvent = event as CustomEvent<Coupon>;
      setDrawerCoupon(customEvent.detail);
      setIsDrawerOpen(true);
    };
    document.addEventListener('open-coupon-history', handleOpenHistory);
    return () => document.removeEventListener('open-coupon-history', handleOpenHistory);
  }, []);
  return { ...useSuperadminBillingCouponsManagement(), isDrawerOpen, setIsDrawerOpen, drawerCoupon };
}
