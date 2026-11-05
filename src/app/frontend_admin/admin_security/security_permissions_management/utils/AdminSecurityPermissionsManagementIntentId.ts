// RESPONSIBILITY: Forms collision-free, payload-specific idempotency intent identifiers for Permissions mutations.
// DATA FLOW: confirmed user action -> canonical intent key -> leaf-owned idempotency map.

/** JSON tuples avoid ambiguity when identifiers contain colons, slashes or other separators. */
export function adminPermissionsChangeIntentId(staffId: string, permission: string, enabled: boolean): string {
  return JSON.stringify(['permission', staffId, permission, enabled]);
}

export function adminPermissionsResetIntentId(staffId: string): string {
  return JSON.stringify(['reset', staffId]);
}
