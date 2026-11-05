/** Domain types are derived from the owning module's runtime contract. */
import type { UsageMeterSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/schemas/superadmin_billing_usage_meters_dashboard_contract.schemas';
import type { z } from 'zod';


export type UsageMeter = z.infer<typeof UsageMeterSchema>;
