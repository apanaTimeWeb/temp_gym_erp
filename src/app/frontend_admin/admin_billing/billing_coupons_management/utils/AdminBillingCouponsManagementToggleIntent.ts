// RESPONSIBILITY: Separates coupon activation and deactivation retry intents.
// DATA FLOW: current coupon state → unambiguous intent tuple → existing idempotency store.
export const adminCouponToggleIntent = (id: string, currentlyActive: boolean): string =>
  JSON.stringify(['toggle-coupon', id, currentlyActive ? 'deactivate' : 'activate']);
