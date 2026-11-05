/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */


export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}
