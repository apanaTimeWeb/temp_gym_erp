import { describe, expect, it } from 'vitest';
import { MANAGER_STORE_PRODUCTS_ROUTES } from '@/app/frontend_manager/manager_sales_billing/store_order_management/config/manager_sales_billing_store_order_management.url_config';

describe('Store Order Management route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_STORE_PRODUCTS_ROUTES.PATHS.LEAF).toContain('/store_order_management'); }); });
