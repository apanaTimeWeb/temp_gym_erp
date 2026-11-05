// RESPONSIBILITY: Filters the owning Sales memberships directory rows only.
import type { Member } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';

export function filterAdminSalesMembershipsMembers(rows: Member[], search: string): Member[] {
  const query = search.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((member) => [member.id, member.name, member.email, member.phone, member.branch, member.plan?.name, member.status]
    .some((value) => String(value ?? '').toLowerCase().includes(query)));
}
