// RESPONSIBILITY: Fetches only the Sales membership report owned by this autonomous leaf.
// DATA FLOW: report filters → apiFetch → verified membership-report response schema → report query.
import { z } from 'zod';
import { ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_membership_report/config/admin_sales_membership_report.url_config';
import { membershipReportItemSchema, membershipTotalsSchema } from '@/app/frontend_admin/admin_sales/sales_membership_report/schemas/AdminSalesMembershipReportSchemas';
import { adminSalesMembershipReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportApiResponse';
import type { MembershipReportItem, MembershipTotals } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';

function buildQuery(params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, value);
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const AdminSalesApi = {
  fetchMembershipReport: async (
    branchId?: string,
    range?: string,
    search?: string,
    startDate?: string,
    endDate?: string,
  ) => apiFetch<{ report: MembershipReportItem[]; totals: MembershipTotals }>(
    `${ADMIN_SALES_API.membershipReport}${buildQuery({
      branchId: branchId && branchId !== 'all' ? branchId : undefined,
      range,
      search,
      startDate,
      endDate,
    })}`,
    {
      method: 'GET',
      dataSchema: z.object({
        report: z.array(membershipReportItemSchema),
        totals: membershipTotalsSchema,
      }),
    },
  ),
};
