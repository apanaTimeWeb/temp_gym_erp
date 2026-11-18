import { formatIstDate } from './SuperadminGymsDirectoryTenantUtils';
import type { Tenant, Plan, UpdateTenantInput } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface TenantEditFormValues {
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  planId: string;
  planExpiresAt: string;
  accessStatus: 'ACTIVE' | 'INACTIVE';
  statusReason: string;
  password: string;
}

export function computeTenantChanges(
  tenant: Tenant,
  values: TenantEditFormValues
): Partial<UpdateTenantInput> {
  const changes: Partial<UpdateTenantInput> = {};

  if (values.gymName.trim() !== tenant.gymName) changes.gymName = values.gymName.trim();
  if (values.ownerName.trim() !== tenant.ownerName) changes.ownerName = values.ownerName.trim();
  if (values.adminEmail.trim().toLowerCase() !== tenant.ownerEmail.toLowerCase()) {
    changes.adminEmail = values.adminEmail.trim().toLowerCase();
  }
  if (values.phone.trim() !== tenant.phone.trim()) changes.phone = values.phone.trim();
  if (values.planId !== tenant.planId) changes.planId = values.planId;

  const currentExpiryDatePart = tenant.planExpiresAt ? tenant.planExpiresAt.split('T')[0] : '';
  if (values.planExpiresAt && values.planExpiresAt !== currentExpiryDatePart) {
    changes.planExpiresAt = new Date(`${values.planExpiresAt}T23:59:59.000Z`).toISOString();
  }

  if (values.accessStatus !== tenant.accessStatus) {
    changes.accessStatus = values.accessStatus;
    changes.statusChangeReason = values.statusReason.trim();
  }

  if (values.password.trim()) {
    changes.temporaryPassword = values.password.trim();
  }

  return changes;
}

export function buildSensitiveComparison(
  changedFields: Partial<UpdateTenantInput>,
  tenant: Tenant,
  plans: Plan[]
): Array<{ field: string; from: string; to: string }> {
  const sensitive: Array<{ field: string; from: string; to: string }> = [];

  if (changedFields.planId) {
    const fromPlan = plans.find((p) => p.id === tenant.planId)?.name || tenant.planId;
    const toPlan = plans.find((p) => p.id === changedFields.planId)?.name || changedFields.planId;
    sensitive.push({ field: 'SaaS Plan', from: fromPlan, to: toPlan });
  }

  if (changedFields.accessStatus) {
    sensitive.push({
      field: 'Access Status',
      from: tenant.accessStatus,
      to: changedFields.accessStatus,
    });
  }

  if (changedFields.planExpiresAt) {
    sensitive.push({
      field: 'Plan Expiry',
      from: formatIstDate(tenant.planExpiresAt),
      to: formatIstDate(changedFields.planExpiresAt),
    });
  }

  if (changedFields.temporaryPassword) {
    sensitive.push({
      field: 'Password',
      from: '••••••••',
      to: 'New Password Set',
    });
  }

  return sensitive;
}
