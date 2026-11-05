// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementDueFormTypes.ts)

import type { z } from 'zod';
import type { adminFinanceStaffDuesManagementDueFormSchema } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/schemas/AdminFinanceStaffDuesManagementDueFormSchema';

export type AdminFinanceStaffDuesManagementDueFormValues = z.infer<typeof adminFinanceStaffDuesManagementDueFormSchema>;
