import { formatIstDate } from './SuperadminGymsDirectoryTenantUtils';
import {
  validateGymName,
  validateEmail,
  validateIndianPhone,
  validatePassword,
} from './SuperadminGymsDirectoryValidators';
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

export function validateTenantEditField(
  field: string,
  values: TenantEditFormValues,
  originalStatus: string
): string | undefined {
  switch (field) {
    case 'gymName':
      return validateGymName(values.gymName).isValid ? undefined : validateGymName(values.gymName).error;
    case 'ownerName':
      return !values.ownerName || values.ownerName.trim().length < 2
        ? 'Owner name must be at least 2 characters'
        : undefined;
    case 'adminEmail':
      return validateEmail(values.adminEmail).isValid ? undefined : validateEmail(values.adminEmail).error;
    case 'phone':
      return validateIndianPhone(values.phone).isValid ? undefined : validateIndianPhone(values.phone).error;
    case 'password':
      return values.password ? validatePassword(values.password).error : undefined;
    case 'accessStatus':
      return values.accessStatus !== originalStatus && !values.statusReason.trim()
        ? 'A reason is required when changing access status'
        : undefined;
    default:
      return undefined;
  }
}

export function checkTenantEditFormValid(values: TenantEditFormValues, originalStatus: string): boolean {
  if (!values.gymName || values.gymName.trim().length < 3 || values.gymName.trim().length > 80) return false;
  if (!values.ownerName || values.ownerName.trim().length < 2) return false;
  if (!values.adminEmail || !validateEmail(values.adminEmail).isValid) return false;
  if (!values.phone || !validateIndianPhone(values.phone).isValid) return false;
  if (!values.planId) return false;
  if (values.password && !validatePassword(values.password).isValid) return false;
  if (values.accessStatus !== originalStatus && !values.statusReason.trim()) return false;
  return true;
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

  if (values.password.trim()) changes.temporaryPassword = values.password.trim();
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
    sensitive.push({ field: 'Access Status', from: tenant.accessStatus, to: changedFields.accessStatus });
  }

  if (changedFields.planExpiresAt) {
    sensitive.push({
      field: 'Plan Expiry',
      from: formatIstDate(tenant.planExpiresAt),
      to: formatIstDate(changedFields.planExpiresAt),
    });
  }

  if (changedFields.temporaryPassword) {
    sensitive.push({ field: 'Password', from: '••••••••', to: 'New Password Set' });
  }

  return sensitive;
}
