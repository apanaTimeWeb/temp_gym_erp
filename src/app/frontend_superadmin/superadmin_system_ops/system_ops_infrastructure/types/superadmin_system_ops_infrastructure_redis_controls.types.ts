export interface SuperadminSystemOpsInfrastructureRedisControlsProps {
  isFlushingGlobal: boolean;
  onFlushAll: () => Promise<void>;
  onOpenTenantFlush: () => void;
}
