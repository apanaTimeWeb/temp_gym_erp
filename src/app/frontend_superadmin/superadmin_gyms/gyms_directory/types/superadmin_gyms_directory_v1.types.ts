/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Runtime-validated contracts for Superadmin tenant business controls and its bulk actions.
import { z } from 'zod';

import { SuperadminGymsV1DataSchema, SuperadminGymsV1BulkMutationRequestSchema, SuperadminGymsV1ResponseSchema, SuperadminGymsV1FilterSchema, SuperadminGymsV1SavedViewSchema, SuperadminGymsV1BulkActionSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas';

export type SuperadminGymsV1Filter = z.infer<typeof SuperadminGymsV1FilterSchema>;
export type SuperadminGymsV1SavedView = z.infer<typeof SuperadminGymsV1SavedViewSchema>;
export type SuperadminGymsV1BulkAction = z.infer<typeof SuperadminGymsV1BulkActionSchema>;
export type SuperadminGymsV1Data = z.infer<typeof SuperadminGymsV1DataSchema>;
export type SuperadminGymsV1BulkMutationRequest = z.infer<typeof SuperadminGymsV1BulkMutationRequestSchema>;
export type SuperadminGymsV1Response = z.infer<typeof SuperadminGymsV1ResponseSchema>;

export interface SuperadminGymsV1SectionProps {
  data: SuperadminGymsV1Data;
}

export interface SuperadminGymsV1FiltersSavedViewsAndBulkActionsSectionProps extends SuperadminGymsV1SectionProps {
  selectedFilterKey: string;
  selectedGymIds: string[];
  onFilterChange: (filterKey: string) => void;
  onSavedViewChange: (filterKey: string) => void;
  onSelectionChange: (gymIds: string[]) => void;
  onBulkAction: (action: SuperadminGymsV1BulkAction, gymIds: string[], targetPlan?: string) => Promise<void>;
  isBulkPending: boolean;
}

export interface SuperadminGymsV1TenantComparisonPanelProps extends SuperadminGymsV1SectionProps {
  selectedGymIds: string[];
  onSelectionChange: (gymIds: string[]) => void;
}
