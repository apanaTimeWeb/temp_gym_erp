export interface SuperadminSystemOpsCacheManagementRedisControlsProps {
  isFlushingGlobal: boolean;
  onFlushAll: () => Promise<void>;
  onOpenTenantFlush: () => void;
}
