// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for store_products.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerStoreProductsHarness } from '@/app/frontend_manager/manager_sales_billing/store_order_management/tests/harness/ManagerStoreProductsHarness';

export function renderManagerStoreProducts(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerStoreProductsHarness>{children}</ManagerStoreProductsHarness> });
}
