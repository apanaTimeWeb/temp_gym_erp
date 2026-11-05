"use client";
// RESPONSIBILITY: Main entry point for the Gym Health Alerts module.
// DATA FLOW: feature data/state and user input → AdminGymsHealthAlertsMonitoringMain → accessible UI/events routed to owning hooks (admin_gym_health_alerts/gym_health_alerts_monitoring/components/main_view/AdminGymsHealthAlertsMonitoringMain.tsx)

import AdminGymHealthAlertsKPIs from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/kpis/AdminGymsHealthAlertsMonitoringKPIs';
import AdminGymHealthAlertsFilters from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/filters/AdminGymsHealthAlertsMonitoringFilters';
import AdminGymHealthAlertsTable from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/table/AdminGymsHealthAlertsMonitoringTable';

/**
 * AdminGymsHealthAlertsMonitoringMain renders the admin gym health alerts main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsHealthAlertsMonitoringMain: Main entry point for the Gym Health Alerts module.
 * @dependencies Consumes AdminGymHealthAlertsKPIs, AdminGymHealthAlertsFilters, AdminGymHealthAlertsTable.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsHealthAlertsMonitoringMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminGymHealthAlertsKPIs />
        <AdminGymHealthAlertsFilters />
        <AdminGymHealthAlertsTable />
      </div>
    </div>
  );
}
