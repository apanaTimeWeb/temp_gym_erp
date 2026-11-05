import type { SuperadminInfrastructureUptimePointSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_uptime.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the API/runtime contract for historical platform uptime points.
export type SuperadminInfrastructureUptimePoint = ZodInfer<typeof SuperadminInfrastructureUptimePointSchema>;
