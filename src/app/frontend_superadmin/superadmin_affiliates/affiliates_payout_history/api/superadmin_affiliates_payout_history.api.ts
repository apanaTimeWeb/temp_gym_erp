import { superadminAffiliatesManagementApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/api/superadmin_affiliates_payout_history_api_fetch.api';
import { SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_API as SUPERADMIN_AFFILIATES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/config/superadmin_affiliates_payout_history.url_config';
import { SuperadminAffiliatesListDataSchema, SuperadminAffiliatesPayoutHistoryDataSchema, SuperadminAffiliatesDeleteDataSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_api.schemas';
import { AffiliateRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_types.schemas';

import type { Affiliate, AffiliateFormData, AffiliatePayoutRecord, AffiliateStatus } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesApi owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_types.schemas, @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_api.schemas, @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/config/superadmin_affiliates_payout_history.url_config, @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/api/superadmin_affiliates_payout_history_api_fetch.api, @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


export const affiliatesApi = {
  fetchAffiliates: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<Affiliate[]>(`${SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST}${q}`, { dataSchema: SuperadminAffiliatesListDataSchema });
  },
  createAffiliate: (body: AffiliateFormData, idempotencyKey: string) => apiFetch<Affiliate>(SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST, {
    method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliate: (id: string, body: Partial<AffiliateFormData>, idempotencyKey: string) => apiFetch<Affiliate>(SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id), {
    method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema,
  }),
  updateAffiliateStatus: (id: string, status: AffiliateStatus, idempotencyKey: string) => apiFetch<Affiliate>(SUPERADMIN_AFFILIATES_MANAGEMENT_API.STATUS(id), {
    method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify({ status }), dataSchema: AffiliateRecordSchema,
  }),
  deleteAffiliate: (id: string, idempotencyKey: string) => apiFetch<void>(SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id), {
    method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminAffiliatesDeleteDataSchema,
  }),
  payAffiliateCommission: (id: string, idempotencyKey: string) => apiFetch<Affiliate>( SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAY_COMMISSION(id), {
    method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: AffiliateRecordSchema,
  }),
  fetchPayoutHistory: () => apiFetch<AffiliatePayoutRecord[]>(SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAYOUT_HISTORY, { dataSchema: SuperadminAffiliatesPayoutHistoryDataSchema }),
};
