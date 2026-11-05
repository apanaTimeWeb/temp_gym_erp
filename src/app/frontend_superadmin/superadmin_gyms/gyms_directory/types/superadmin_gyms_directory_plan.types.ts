/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import { z } from 'zod';

import { SuperadminGymsPlanOptionSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_plan_contract.schemas';


// RESPONSIBILITY: Defines the minimum subscription-plan contract required by Gyms forms.
// The Gyms module owns this local UI/API contract to avoid a business dependency on the Plans module.
export type SuperadminGymsPlanOption = z.infer<typeof SuperadminGymsPlanOptionSchema>;
