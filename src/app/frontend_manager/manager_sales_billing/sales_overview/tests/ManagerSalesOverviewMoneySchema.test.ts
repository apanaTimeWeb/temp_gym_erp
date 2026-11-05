import { describe, expect, it } from 'vitest';

import { managerSalesOverviewSchema } from '@/app/frontend_manager/manager_sales_billing/sales_overview/schemas/manager_sales_overview.schemas';

describe('Sales API money schema', () => { it('rejects fractional minor-unit chart revenue', () => { expect(managerSalesOverviewSchema.safeParse({ monthlyRevenue: [{ month: 'Oct', revenue: 1000, storeRevenue: 250, newMembers: 2 }] }).success).toBe(true); expect(managerSalesOverviewSchema.safeParse({ monthlyRevenue: [{ month: 'Oct', revenue: 1000.25 }] }).success).toBe(false); }); });
