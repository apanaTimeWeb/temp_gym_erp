// RESPONSIBILITY: Owns only the Gym Health Alerts filter/search UI state; server results stay in TanStack Query.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_gym_health_alerts/gym_health_alerts_monitoring/state/useAdminGymsHealthAlertsMonitoringStore.ts)

import { create } from 'zustand';
import type { AdminGymHealthAlertsStore } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringStoreTypes';
/**
 * @description useAdminGymHealthAlertsStore: Owns only the Gym Health Alerts filter/search UI state; server results stay in TanStack Query.
 * @dependencies Consumes AdminGymHealthAlertsStoreTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminGymHealthAlertsStore = create<AdminGymHealthAlertsStore>((set) => ({
  severityFilter: 'all',
  search: '',
  setSeverityFilter: (severityFilter) => set({ severityFilter }),
  setSearch: (search) => set({ search }),
}));
