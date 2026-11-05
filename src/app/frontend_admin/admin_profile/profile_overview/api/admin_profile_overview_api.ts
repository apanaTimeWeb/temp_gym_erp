// RESPONSIBILITY: API client for the Admin Profile module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_profile/profile_overview/api/admin_profile_overview_api.ts)

import { ADMIN_PROFILE_API } from '@/app/frontend_admin/admin_profile/profile_overview/config/admin_profile_overview.url_config';
import { adminProfileDataSchema, adminProfilePasswordUpdateResponseSchema } from '@/app/frontend_admin/admin_profile/profile_overview/schemas/AdminProfileOverviewSchemas';
import { adminProfileOverviewApiFetch as apiFetch } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewApiResponse';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';
import { type z } from "zod";

export const AdminProfileApi = {
  fetchProfile: async () => {
            return apiFetch<z.infer<typeof adminProfileDataSchema>>(`${ADMIN_PROFILE_API.fetchProfile}`, { method: 'GET', dataSchema: adminProfileDataSchema });
        },
  updateProfile: async (body: UpdateAdminProfilePayload, idempotencyKey: string) => {
            return apiFetch<z.infer<typeof adminProfileDataSchema>>(`${ADMIN_PROFILE_API.updateProfile}`, { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema,
                headers: { 'Idempotency-Key': idempotencyKey }
            });
        },
  updatePassword: async (body: UpdateAdminPasswordPayload, idempotencyKey: string) => {
          return apiFetch<null>(`${ADMIN_PROFILE_API.updatePassword}`, { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfilePasswordUpdateResponseSchema,
              headers: { 'Idempotency-Key': idempotencyKey }
        });
      },
};
