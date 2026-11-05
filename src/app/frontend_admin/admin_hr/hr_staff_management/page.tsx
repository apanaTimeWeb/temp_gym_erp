"use client";
import { useTranslations } from 'next-intl';
// Route entry for Admin HR Staff. Workflow logic stays inside this autonomous leaf.
import AdminHrManagementKPIs from '@/app/frontend_admin/admin_hr/hr_staff_management/components/kpis/AdminHrStaffManagementKPIs';
import AdminHrManagementStaffTable from '@/app/frontend_admin/admin_hr/hr_staff_management/components/staff_table/AdminHrStaffManagementStaffTable';
import AdminHrManagementStaffModal from '@/app/frontend_admin/admin_hr/hr_staff_management/components/staff_modal/AdminHrStaffManagementStaffModal';
import AdminHrManagementStaffProfileModal from '@/app/frontend_admin/admin_hr/hr_staff_management/components/staff_profile_modal/AdminHrStaffManagementStaffProfileModal';

export default function AdminHrStaffPage() {
  const t = useTranslations();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header><h1 className="text-2xl font-bold">{t('hr.admin_hr_tabs.tab_staff')}</h1></header>
      <AdminHrManagementKPIs />
      <AdminHrManagementStaffTable />
      <AdminHrManagementStaffModal />
      <AdminHrManagementStaffProfileModal />
  </main>;
}
