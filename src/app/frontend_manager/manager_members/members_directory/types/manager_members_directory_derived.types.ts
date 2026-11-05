/**
 * @description Derives Manager Members domain types directly from the module-owned Zod schemas.
 * @dependencies Consumes only Manager Members schema files and Zod type inference.
 * @edge-case Preserves runtime/type contract parity by keeping the inferred types tied to the authoritative schemas.
 */
// RESPONSIBILITY: Exposes TypeScript domain types inferred from Manager Members Zod schemas.
import type { z } from 'zod';

import type { memberSchema, memberStatsSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_entity.schemas';
import type { managerMembersFormSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';

export type MemberType = z.infer<typeof memberSchema>;
export type MemberStatsType = z.infer<typeof memberStatsSchema>;
export type MemberFormType = z.infer<typeof managerMembersFormSchema>;
