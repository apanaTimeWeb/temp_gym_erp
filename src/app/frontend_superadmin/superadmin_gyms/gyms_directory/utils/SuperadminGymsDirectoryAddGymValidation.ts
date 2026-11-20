import { validateGymName, validateEmail, validateIndianPhone, validateAadhaar, validatePassword } from './SuperadminGymsDirectoryValidators';
import type { CreateTenantInput } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface AddGymFormStateValues {
  gymName: string;
  tenantSlug?: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  temporaryPassword: string;
  planId: string;
  memberCount: number;
  rawAadhaar: string;
}

export function computeAddGymExpiryDate(startDate: string, startType: 'TRIAL' | 'PAID', trialDays: number): string {
  if (!startDate) return '';
  const base = new Date(`${startDate}T00:00:00.000Z`);
  if (isNaN(base.getTime())) return '';
  const addDuration = startType === 'TRIAL' ? trialDays || 14 : 30;
  return new Date(base.getTime() + addDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
}

export function validateAddGymField(field: string, values: AddGymFormStateValues, emailExistsError: string | null): string | undefined {
  switch (field) {
    case 'gymName': return validateGymName(values.gymName).isValid ? undefined : validateGymName(values.gymName).error;
    case 'tenantSlug': {
      if (!values.tenantSlug) return undefined;
      return /^[a-z0-9-]{3,30}$/.test(values.tenantSlug) ? undefined : 'Slug must be 3-30 lowercase alphanumeric chars or hyphens';
    }
    case 'ownerName': return !values.ownerName || values.ownerName.trim().length < 2 ? 'Owner name is required (min 2 characters)' : undefined;
    case 'adminEmail': {
      const res = validateEmail(values.adminEmail);
      if (!res.isValid) return res.error;
      return emailExistsError || undefined;
    }
    case 'phone': return validateIndianPhone(values.phone).isValid ? undefined : validateIndianPhone(values.phone).error;
    case 'temporaryPassword': return validatePassword(values.temporaryPassword).isValid ? undefined : validatePassword(values.temporaryPassword).error;
    case 'planId': return !values.planId ? 'SaaS plan is required' : undefined;
    case 'memberCount': return values.memberCount === undefined || values.memberCount === null || isNaN(values.memberCount) || values.memberCount < 0 ? 'Member count must be a non-negative integer' : undefined;
    case 'rawAadhaar': return values.rawAadhaar ? (validateAadhaar(values.rawAadhaar).isValid ? undefined : validateAadhaar(values.rawAadhaar).error) : undefined;
    default: return undefined;
  }
}

export function buildCreateTenantPayload(
  values: AddGymFormStateValues & {
    startType: 'TRIAL' | 'PAID';
    trialDays: number;
    startDate: string;
    expiryDate: string;
    city: string;
    state: string;
    gstNumber: string;
    sendWelcomeEmail: boolean;
    currency?: string;
    timezone?: string;
    address?: string;
    postalCode?: string;
    billingCycle?: 'MONTHLY' | 'ANNUAL';
  }
): CreateTenantInput {
  return {
    gymName: values.gymName.trim(),
    tenantSlug: values.tenantSlug?.trim() || values.gymName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 24),
    ownerName: values.ownerName.trim(),
    adminEmail: values.adminEmail.trim().toLowerCase(),
    phone: values.phone.trim(),
    temporaryPassword: values.temporaryPassword.trim(),
    planId: values.planId,
    memberCount: Number(values.memberCount) || 0,
    startType: values.startType,
    trialDays: values.startType === 'TRIAL' ? values.trialDays : undefined,
    startDate: values.startDate,
    expiryDate: values.expiryDate,
    city: values.city.trim() || undefined,
    state: values.state.trim() || undefined,
    address: values.address?.trim() || undefined,
    postalCode: values.postalCode?.trim() || undefined,
    currency: values.currency || 'INR',
    timezone: values.timezone || 'Asia/Kolkata',
    billingCycle: values.billingCycle || 'MONTHLY',
    gstNumber: values.gstNumber.trim() || undefined,
    sendWelcomeEmail: values.sendWelcomeEmail,
  };
}
