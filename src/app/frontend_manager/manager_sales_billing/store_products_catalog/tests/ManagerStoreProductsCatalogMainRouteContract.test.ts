import { describe, expect, it } from 'vitest';
import { MANAGER_STORE_PRODUCTS_ROUTES } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/config/manager_sales_billing_store_products_catalog.url_config';

describe('Store Product Catalogue route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_STORE_PRODUCTS_ROUTES.PATHS.LEAF).toContain('/store_products_catalog'); }); });
