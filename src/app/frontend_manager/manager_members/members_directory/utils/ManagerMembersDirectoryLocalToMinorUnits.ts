import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';

/** Converts a validated user-entered major-unit amount into integer minor currency units for API requests using the configured ISO currency precision. */
export function ManagerInfrastructureToManagerMinorUnits(value: number | string, currencyCode = ManagerEnvConfig.currencyCode): number {
  const numericValue = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new RangeError('Currency amount must be a finite non-negative number.');
  }
  const fractionDigits = new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).resolvedOptions().maximumFractionDigits ?? 2;
  return Math.round((numericValue + Number.EPSILON) * (10 ** fractionDigits));
}
