// Regression: collapsed disclosure controls cannot reference an unmounted detail region.
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import AdminSalesAnalyticsStoreSales from '@/app/frontend_admin/admin_sales/sales_store_sales/components/store_sales/AdminSalesStoreSalesStoreSales';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/app/frontend_admin/admin_sales/sales_store_sales/locales/admin_sales_store_sales_en.json';
import { MOCK_ADMIN_STORE_ORDERS } from '@/app/frontend_admin/admin_sales/sales_store_sales/mocks/fixtures/AdminSalesStoreSalesMockFixtures';
vi.mock('@/app/frontend_admin/admin_sales/sales_store_sales/hooks/useAdminSalesStoreSalesLogic', () => ({
  useAdminSalesLogic: () => ({ storeOrders: [MOCK_ADMIN_STORE_ORDERS[0]], storeOrdersTotal: 1, storeStatus: 'success', storeSummaryStatus: 'success', storeSummary: null, currentPage: 1, setCurrentPage: vi.fn() })
}));
describe('store order disclosure', () => {
  it('only exposes aria-controls while its detail region exists', () => {
    const { container } = render(<NextIntlClientProvider locale="en" messages={messages}><AdminSalesAnalyticsStoreSales/></NextIntlClientProvider>);
    const toggle = container.querySelector<HTMLButtonElement>('button[aria-expanded]');
    expect(toggle).not.toBeNull();
    expect(toggle?.getAttribute('aria-controls')).toBeNull();
    fireEvent.click(toggle!);
    expect(toggle?.getAttribute('aria-controls')).toBe(`store-order-${MOCK_ADMIN_STORE_ORDERS[0].id}`);
    expect(document.getElementById(`store-order-${MOCK_ADMIN_STORE_ORDERS[0].id}`)).not.toBeNull();
  });
});
