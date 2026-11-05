// RESPONSIBILITY: Defines the minimal, in-memory Ghost Login UI state contract.
export interface SuperadminGymGhostLoginState {
  ghostTenantId: string | null;
  startGhostLogin: (tenantId: string) => void;
  clearGhostLogin: () => void;
}
