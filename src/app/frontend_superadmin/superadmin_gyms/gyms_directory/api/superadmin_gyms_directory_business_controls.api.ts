import { apiFetch } from '@/lib/api';

import { SUPERADMIN_GYMS_DIRECTORY_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { SuperadminGymsV1DataSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas';
import { SuperadminGymsV1BulkMutationRequestSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas';

import type { SuperadminGymsV1BulkMutationRequest, SuperadminGymsV1Data } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_v1.types';
import type { ApiResponse } from '@/lib/api';

export async function fetchGymsBusinessControls(params?: Record<string, string>): Promise<ApiResponse<SuperadminGymsV1Data>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiFetch<SuperadminGymsV1Data>(`${SUPERADMIN_GYMS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminGymsV1DataSchema });
}

export async function updateGymsBulkAction(
  body: SuperadminGymsV1BulkMutationRequest,
  idempotencyKey: string,
): Promise<ApiResponse<SuperadminGymsV1Data>> {
  const payload = SuperadminGymsV1BulkMutationRequestSchema.parse(body);
  return apiFetch<SuperadminGymsV1Data>(SUPERADMIN_GYMS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: SuperadminGymsV1DataSchema,
  });
}
