import type { SuperadminSystemOpsInfrastructureV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_v1_response.schemas';
import type { SuperadminInfrastructureV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_v1.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Platform API Health.

export type SuperadminInfrastructureV1Data = ZodInfer<typeof SuperadminInfrastructureV1DataSchema>;
export type SuperadminInfrastructureV1Response = ZodInfer<typeof SuperadminSystemOpsInfrastructureV1ResponseSchema>;
export interface SuperadminInfrastructureV1SectionProps {
    data: SuperadminInfrastructureV1Data;
}
