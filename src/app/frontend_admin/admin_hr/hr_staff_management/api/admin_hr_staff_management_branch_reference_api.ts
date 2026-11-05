// RESPONSIBILITY: Fetches minimal branch reference data for the Admin hr module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_hr/hr_staff_management/api/admin_hr_management_branch_reference_api.ts)

import { adminHrManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementApiResponse';
import { z } from 'zod';
import { ADMIN_HR_API } from '@/app/frontend_admin/admin_hr/hr_staff_management/config/admin_hr_staff_management.url_config';
import type { AdminHrBranchReference } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminHrBranchReferenceApi = { fetchHrBranchReferences: () => apiFetch<{ items: AdminHrBranchReference[] }>(`${ADMIN_HR_API.branchReference}?consumer=hr`, { method: 'GET', dataSchema: schema }) };
