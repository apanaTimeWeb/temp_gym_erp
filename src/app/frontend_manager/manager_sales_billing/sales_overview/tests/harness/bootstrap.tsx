// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for sales_overview.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerSalesOverviewHarness } from '@/app/frontend_manager/manager_sales_billing/sales_overview/tests/harness/ManagerSalesOverviewHarness';
import messages from '@/app/frontend_manager/manager_sales_billing/sales_overview/locales/manager_sales_overview_en.json';

export function renderManagerSalesOverview(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerSalesOverviewHarness messages={messages}>{children}</ManagerSalesOverviewHarness> });
}
