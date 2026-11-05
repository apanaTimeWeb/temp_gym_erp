// RESPONSIBILITY: Owns the reusable client-side lifecycle for one idempotency key per confirmed admin intent.
// DATA FLOW: confirmed user intent → getAdminIdempotencyKey → module mutation API → retry with same key → clear on success/abandon.

import { createAdminIdempotencyKey } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementCreateIdempotencyKey';
import type { AdminIdempotencyIntentRegistry } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementShellContractTypes';

/** Returns the existing key for an intent or creates exactly one new key for that intent. */
export function getAdminIdempotencyKey(
  registry: AdminIdempotencyIntentRegistry,
  intentId: string,
): string {
  const existingKey = registry.get(intentId);
  if (existingKey) return existingKey;

  const createdKey = createAdminIdempotencyKey();
  registry.set(intentId, createdKey);
  return createdKey;
}

/** Removes an intent key after success or explicit abandonment/cancellation. */
export function clearAdminIdempotencyKey(
  registry: AdminIdempotencyIntentRegistry,
  intentId: string,
): void {
  registry.delete(intentId);
}
