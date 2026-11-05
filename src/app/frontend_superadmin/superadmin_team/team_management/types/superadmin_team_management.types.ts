/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
import type { SuperadminTeamResponseSchema } from '@/app/frontend_superadmin/superadmin_team/team_management/schemas/superadmin_team_management_contract.schemas';
import type { z } from 'zod';


export type SuperadminTeamResponse = z.infer<typeof SuperadminTeamResponseSchema>;
export type SuperadminTeamAlertPreference = SuperadminTeamResponse['alerts'][number];
export interface SuperadminTeamAlertPreferenceUpdate { name: string; enabled: boolean; }
export interface SuperadminTeamSectionProps { data: SuperadminTeamResponse; }
