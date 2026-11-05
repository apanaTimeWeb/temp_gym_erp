/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsGymDetailTypes owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/schemas/superadmin_gyms_detail_contract.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the runtime-validated response contract for the Superadmin Gym 360 detail workspace.
import { z } from 'zod';

import { SuperadminGymDetailStatusSchema, SuperadminGymDetailTabSchema, SuperadminGymDetailUsageItemSchema, SuperadminGymDetailDataSchema, SuperadminGymDetailResponseSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/schemas/superadmin_gyms_detail_contract.schemas';



export type SuperadminGymDetailStatus = z.infer<typeof SuperadminGymDetailStatusSchema>;
export type SuperadminGymDetailTab = z.infer<typeof SuperadminGymDetailTabSchema>;
export type SuperadminGymDetailUsageItem = z.infer<typeof SuperadminGymDetailUsageItemSchema>;
export type SuperadminGymDetailData = z.infer<typeof SuperadminGymDetailDataSchema>;
export type SuperadminGymDetail = SuperadminGymDetailData;
export type SuperadminGymDetailResponse = z.infer<typeof SuperadminGymDetailResponseSchema>;
