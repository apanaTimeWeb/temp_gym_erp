import {
  validateGymName,
  validateEmail,
  validateIndianPhone,
  validateAadhaar,
  validatePassword,
} from './SuperadminGymsDirectoryValidators';
import type { CreateTenantInput } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface AddGymFormStateValues {
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  temporaryPassword: string;
  planId: string;
  memberCount: number;
  rawAadhaar: string;
}

export function computeAddGymExpiryDate(
  startDate: string,
  startType: 'TRIAL' | 'PAID',
  trialDays: number
): string {
  if (!startDate) return '';
  const base = new Date(`${startDate}T00:00:00.000Z`);
  if (isNaN(base.getTime())) return '';
  const addDuration = startType === 'TRIAL' ? trialDays || 14 : 30;
  const exp = new Date(base.getTime() + addDuration * 24 * 60 * 60 * 1000);
  return exp.toISOString().split('T')[0];
}

export function validateAddGymField(
  field: string,
  values: AddGymFormStateValues,
  emailExistsError: string | null
): string | undefined {
  switch (field) {
    case 'gymName': {
      const res = validateGymName(values.gymName);
      return res.isValid ? undefined : res.error;
    }
    case 'ownerName': {
      return !values.ownerName || values.ownerName.trim().length < 2
        ? 'Owner name is required (min 2 characters)'
        : undefined;
    }
    case 'adminEmail': {
      const res = validateEmail(values.adminEmail);
      if (!res.isValid) return res.error;
      if (emailExistsError) return emailExistsError;
      return undefined;
    }
    case 'phone': {
      const res = validateIndianPhone(values.phone);
      return res.isValid ? undefined : res.error;
    }
    case 'temporaryPassword': {
      const res = validatePassword(values.temporaryPassword);
      return res.isValid ? undefined : res.error;
    }
    case 'planId': {
      return !values.planId ? 'SaaS plan is required' : undefined;
    }
    case 'memberCount': {
      if (
        values.memberCount === undefined ||
        values.memberCount === null ||
        isNaN(values.memberCount) ||
        values.memberCount < 0
      ) {
        return 'Member count must be a non-negative integer';
      }
      return undefined;
    }
    case 'rawAadhaar': {
      if (values.rawAadhaar) {
        const res = validateAadhaar(values.rawAadhaar);
        return res.isValid ? undefined : res.error;
      }
      return undefined;
    }
    default:
      return undefined;
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
  }
): CreateTenantInput {
  return {
    gymName: values.gymName.trim(),
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
    gstNumber: values.gstNumber.trim() || undefined,
    sendWelcomeEmail: values.sendWelcomeEmail,
  };
}
