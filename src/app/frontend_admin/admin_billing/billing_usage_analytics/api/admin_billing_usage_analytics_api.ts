// RESPONSIBILITY: Owns typed API operations for usage_analytics; it does not implement the global HTTP transport or backend authorization.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_usage/usage_analytics/api/admin_billing_usage_analytics_api.ts)

import { ADMIN_USAGE_API } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/config/admin_billing_usage_analytics.url_config';
import { adminUsageAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/utils/AdminBillingUsageAnalyticsApiResponse';
import { adminUsageDataSchema } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/schemas/AdminBillingUsageAnalyticsSchemas';
import { adminUsageUpgradePayloadSchema, adminUsageUpgradeRequestSchema } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/schemas/AdminBillingUsageAnalyticsUpgradeSchemas';
import type { AdminUsageData } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';
import type { AdminUsageUpgradeRequest } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsUpgradeTypes';

export const AdminUsageApi = {
  fetchMyUsage: async () =>
    apiFetch<AdminUsageData>(ADMIN_USAGE_API.myUsage, {
      method: 'GET',
      dataSchema: adminUsageDataSchema,
    }),

  requestUpgrade: async (planName: string, idempotencyKey: string) => {
    const payload = adminUsageUpgradePayloadSchema.parse({ planName });
    return apiFetch<AdminUsageUpgradeRequest>(ADMIN_USAGE_API.upgradeRequest, {
      method: 'POST',
      body: JSON.stringify(payload),
      dataSchema: adminUsageUpgradeRequestSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    });
  },
};
