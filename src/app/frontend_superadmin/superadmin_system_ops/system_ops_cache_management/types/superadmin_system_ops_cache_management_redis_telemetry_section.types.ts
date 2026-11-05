import type { RedisTelemetry } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/types/superadmin_system_ops_cache_management.types';

export interface SuperadminSystemOpsCacheManagementRedisTelemetrySectionProps {
  isPending: boolean;
  isError: boolean;
  telemetry?: RedisTelemetry;
  onRetry: () => void;
}
