// RESPONSIBILITY: Type contract for the infrastructure tenant cache-flush selection dialog.
export interface SuperadminFlushTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFlush: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
}
