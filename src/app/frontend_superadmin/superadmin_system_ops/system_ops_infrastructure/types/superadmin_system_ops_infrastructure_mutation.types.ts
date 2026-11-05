// RESPONSIBILITY: Defines named mutation input contracts for Infrastructure cache actions.
export interface SuperadminInfrastructureTenantFlushInput {
  tenantIds: string[];
  idempotencyKey: string;
}

export interface SuperadminFlushTenantMutationConfig {
  onFlush: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
  onSuccess: () => void;
}

export interface SuperadminInfrastructureFlushIntent {
  identity: string;
  idempotencyKey: string;
}
