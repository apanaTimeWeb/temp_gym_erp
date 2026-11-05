import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/config/manager_sales_billing_store_point_of_sale.url_config';
import { STORE_COMPLETED_ORDER_STATUS } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_shared.constants';
import { STORE_RETURN_NONE_STATUS } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_shared.constants';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/mocks/fixtures/ManagerStorePointOfSaleMockData';
import type { Order, Product } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';
import { resolveManagerStorePointOfSaleMockScenario } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/mocks/scenarios/ManagerStorePointOfSaleMockScenarios';

let mockProducts: Product[] = structuredClone(MOCK_PRODUCTS);
let mockOrders: Order[] = structuredClone(MOCK_ORDERS);
let mockOrderIdCounter = 1000;
const idempotentOrders = new Map<string, { fingerprint: string; response: Order }>();
export function resetManagerStorePointOfSaleMockState(): void { mockProducts = structuredClone(MOCK_PRODUCTS); mockOrders = structuredClone(MOCK_ORDERS); mockOrderIdCounter = 1000; idempotentOrders.clear(); }

/** POS contract: product reads plus order creation only. Catalogue CRUD and order history are owned by their respective leaves. */
export const managerStoreHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.PRODUCTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const scenario = resolveManagerStorePointOfSaleMockScenario(request.headers.get('x-manager-mock-scenario'));
    if (scenario.kind === 'server-error') return HttpResponse.json({ success: false, message: 'Mock server error', data: null, errorCode: 'MOCK_SERVER_ERROR', statusCode: 500, requestId: 'mock-pos-error' }, { status: 500 });
    if (scenario.kind === 'unauthorized') return HttpResponse.json({ success: false, message: 'Unauthorized', data: null, errorCode: 'UNAUTHORIZED', statusCode: 401, requestId: 'mock-pos-unauthorized' }, { status: 401 });
    if (scenario.kind === 'empty') return HttpResponse.json({ success: true, message: 'Products fetched', data: { products: [], total: 0 }, requestId: 'mock-pos-empty' }); const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const category = url.searchParams.get('category') ?? 'ALL'; const stock = url.searchParams.get('stock') ?? 'ALL';
    const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1); const limit = Math.max(Number(url.searchParams.get('limit') ?? '12'), 1);
    const filtered = mockProducts.filter((product) => (!search || `${product.name} ${product.category}`.toLowerCase().includes(search)) && (category === 'ALL' || product.category === category) && (stock === 'ALL' || (stock === 'IN_STOCK' ? product.stock > 0 : product.stock <= 0)));
    const start = (page - 1) * limit; return HttpResponse.json({ success: true, message: 'Products fetched', data: { products: filtered.slice(start, start + limit), total: filtered.length }, requestId: 'mock-pos-products' });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.ORDERS_BASE), async ({ request }) => {
    const scenario = resolveManagerStorePointOfSaleMockScenario(request.headers.get('x-manager-mock-scenario'));
    if (scenario.kind === 'server-error') return HttpResponse.json({ success: false, message: 'Mock server error', data: null, errorCode: 'MOCK_SERVER_ERROR', statusCode: 500, requestId: 'mock-pos-order-error' }, { status: 500 });
    if (scenario.kind === 'unauthorized') return HttpResponse.json({ success: false, message: 'Unauthorized', data: null, errorCode: 'UNAUTHORIZED', statusCode: 401, requestId: 'mock-pos-order-unauthorized' }, { status: 401 });
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (!idempotencyKey?.trim()) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'IDEMPOTENCY_KEY_REQUIRED', statusCode: 400, requestId: 'mock-pos-key-required' }, { status: 400 });
    const body = await request.json() as { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerName?: string; total?: number; status?: string };
    if (!body || typeof body !== 'object') return HttpResponse.json({ success: false, message: 'Invalid order payload', data: null, errorCode: 'INVALID_ORDER', statusCode: 400, requestId: 'mock-pos-invalid-body' }, { status: 400 });
    const fingerprint = JSON.stringify({ items: body.items, method: body.method, notes: body.notes, customerName: body.customerName });
    const prior = idempotentOrders.get(idempotencyKey);
    if (prior) {
      if (prior.fingerprint !== fingerprint) return HttpResponse.json({ success: false, message: 'Idempotency key was reused with a different order payload', data: null, errorCode: 'IDEMPOTENCY_CONFLICT', statusCode: 409, requestId: 'mock-pos-idempotency-conflict' }, { status: 409 });
      return HttpResponse.json({ success: true, message: 'Order already created', data: prior.response, requestId: `mock-pos-replay-${prior.response.id}` });
    }
    if (!Array.isArray(body.items) || body.items.length === 0 || typeof body.method !== 'string' || !body.method.trim()) return HttpResponse.json({ success: false, message: 'Order items and payment method are required', data: null, errorCode: 'INVALID_ORDER', statusCode: 400, requestId: 'mock-pos-invalid-order' }, { status: 400 });
    const quantities = new Map<string, number>();
    for (const item of body.items) {
      if (!item || typeof item.productId !== 'string' || !Number.isSafeInteger(item.qty) || item.qty <= 0) return HttpResponse.json({ success: false, message: 'Order items contain an invalid product or quantity', data: null, errorCode: 'INVALID_ORDER_ITEM', statusCode: 400, requestId: 'mock-pos-invalid-item' }, { status: 400 });
      quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.qty);
    }
    const resolved = [] as { product: Product; qty: number }[];
    for (const [productId, qty] of quantities) {
      const product = mockProducts.find((candidate) => candidate.id === productId && candidate.isActive);
      if (!product) return HttpResponse.json({ success: false, message: 'A selected product is unavailable', data: null, errorCode: 'PRODUCT_UNAVAILABLE', statusCode: 404, requestId: 'mock-pos-product-missing' }, { status: 404 });
      if (!Number.isSafeInteger(qty) || qty <= 0) return HttpResponse.json({ success: false, message: 'Product quantity must be a positive whole number', data: null, errorCode: 'INVALID_QUANTITY', statusCode: 400, requestId: 'mock-pos-invalid-quantity' }, { status: 400 });
      if (product.stock < qty) return HttpResponse.json({ success: false, message: `Insufficient stock for ${product.name}`, data: null, errorCode: 'INSUFFICIENT_STOCK', statusCode: 409, requestId: 'mock-pos-stock-conflict' }, { status: 409 });
      resolved.push({ product, qty });
    }
    const items = resolved.map(({ product, qty }, index) => ({ id: `item-${mockOrderIdCounter}-${index}`, qty, price: product.price, product: { name: product.name, unit: product.unit } }));
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (!Number.isSafeInteger(total) || total < 0) return HttpResponse.json({ success: false, message: 'Calculated order total is invalid', data: null, errorCode: 'INVALID_TOTAL', statusCode: 400, requestId: 'mock-pos-invalid-total' }, { status: 400 });
    for (const { product, qty } of resolved) product.stock -= qty;
    const order: Order = { id: `ord-${mockOrderIdCounter++}`, total, method: body.method, status: STORE_COMPLETED_ORDER_STATUS, notes: body.notes, createdAt: new Date().toISOString(), returnStatus: STORE_RETURN_NONE_STATUS, items };
    mockOrders = [order, ...mockOrders];
    idempotentOrders.set(idempotencyKey, { fingerprint, response: order });
    return HttpResponse.json({ success: true, message: 'Order created', data: order, requestId: `mock-pos-created-${order.id}` });
  })
];
