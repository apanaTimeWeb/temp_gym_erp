import type { NodeStatusSchema, CacheStatusSchema, InfrastructureNodeSchema, RedisTelemetrySchema, SuperadminInfrastructureTenantSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/schemas/superadmin_system_ops_cache_management.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: TypeScript types for the Superadmin Infrastructure module.
export type NodeStatus = ZodInfer<typeof NodeStatusSchema>;
export type CacheStatus = ZodInfer<typeof CacheStatusSchema>;
export type InfrastructureNode = ZodInfer<typeof InfrastructureNodeSchema>;
export type RedisTelemetry = ZodInfer<typeof RedisTelemetrySchema>;
export type SuperadminInfrastructureTenant = ZodInfer<typeof SuperadminInfrastructureTenantSchema>;
