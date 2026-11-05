import { http, HttpResponse } from 'msw';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_order_management/config/manager_sales_billing_store_order_management.url_config';
import { MOCK_ORDERS } from '@/app/frontend_manager/manager_sales_billing/store_order_management/mocks/fixtures/ManagerStoreOrderManagementMockData';
import type { Order } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_sales_billing_store_order_management.types';

let mockOrders: Order[] = structuredClone(MOCK_ORDERS);
export function resetManagerStoreOrderManagementMockState(): void { mockOrders = structuredClone(MOCK_ORDERS); }

/** Read-only order list handler. Order creation belongs to the POS leaf. */
export const managerStoreHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.ORDERS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const method = (url.searchParams.get('method') ?? 'ALL').toLowerCase();
    const status = url.searchParams.get('status') ?? 'ALL';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';
    const sortOrder = url.searchParams.get('sortOrder') === 'ASC' ? 'ASC' : 'DESC';
    const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') ?? '10'), 1);
    const filtered = mockOrders.filter((order) => {
      const matchesSearch = !search || order.id.toLowerCase().includes(search) || order.items?.some((item) => item.product.name.toLowerCase().includes(search));
      const matchesMethod = !method || method === 'all' || order.method.toLowerCase() === method;
      const matchesStatus = !status || status.toLowerCase() === 'all' || order.status === status;
      const matchesStart = !startDate || order.createdAt.slice(0, 10) >= startDate;
      const matchesEnd = !endDate || order.createdAt.slice(0, 10) <= endDate;
      return matchesSearch && matchesMethod && matchesStatus && matchesStart && matchesEnd;
    });
    const sorted = [...filtered].sort((a, b) => {
      const comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === 'ASC' ? comparison : -comparison;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Orders fetched', data: { orders: sorted.slice(start, start + limit), total: filtered.length } });
  })
];
