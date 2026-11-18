import { toast } from 'sonner';
import type { Tenant, Plan } from '../types/SuperadminGymsDirectoryTenantTypes';
import { getMrr } from './SuperadminGymsDirectoryTenantUtils';

export function exportGymsCsv(tenants: Tenant[], plansMaster: Plan[]): void {
  if (!tenants || tenants.length === 0) {
    toast.error('No tenants available to export.');
    return;
  }
  const headers = [
    'Gym Code',
    'Gym Name',
    'Owner Name',
    'Admin Email',
    'Phone',
    'Plan',
    'Members',
    'MRR',
    'Subscription State',
    'Access Status',
    'Plan Activated At',
    'Plan Expires At',
    'Last Status Changed At',
    'Last Status Changed By',
  ];
  const rows = tenants.map((t) => [
    t.code,
    `"${t.gymName.replace(/"/g, '""')}"`,
    `"${t.ownerName.replace(/"/g, '""')}"`,
    t.ownerEmail,
    t.phone,
    t.planId.toUpperCase(),
    t.memberCount,
    getMrr(t, plansMaster),
    t.subscriptionState,
    t.accessStatus,
    t.planActivatedAt,
    t.planExpiresAt,
    t.lastStatusChangedAt,
    `"${t.lastStatusChangedBy.replace(/"/g, '""')}"`,
  ]);
  const link = document.createElement('a');
  link.setAttribute(
    'href',
    encodeURI('data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n'))
  );
  link.setAttribute('download', `gyms_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success('Gyms directory report downloaded.');
}
