import { apiFetch } from '@/lib/api';

import { SUPERADMIN_GYMS_DETAIL_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';
import { SuperadminGymDetailDataSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/schemas/superadmin_gyms_detail_contract.schemas';

import type { SuperadminGymDetailData } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail.types';
import type { ApiResponse } from '@/lib/api';

export async function fetchGymDetailBusinessOverview(gymId: string): Promise<ApiResponse<SuperadminGymDetailData>> {
    return apiFetch<SuperadminGymDetailData>(SUPERADMIN_GYMS_MANAGEMENT_API.GYM_DETAIL.BACKEND_API.BY_GYM(gymId), {
        dataSchema: SuperadminGymDetailDataSchema,
    });
}
