import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/config/manager_sales_billing_store_products_catalog.url_config';

import { MANAGER_STORE_PRODUCTS_STATUS_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products.constants';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/mocks/fixtures/ManagerStoreProductsCatalogMockData';
import type { Order, Product } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';

let mockProducts = structuredClone(MOCK_PRODUCTS);
let mockOrders = structuredClone(MOCK_ORDERS);
let mockProductIdCounter = 1000;
let mockOrderIdCounter = 1000;
let mockRequestCounter = 0;
const requestId = () => `mock-store-catalog-${++mockRequestCounter}`;

/**
 * @description Owns the Store module's MSW product/order/summary contracts without importing any sibling business module.
 * @dependencies ManagerStoreProductsUrlConfig, ManagerStoreProductsCatalogMockData, ManagerStoreProductsTypes, and approved global mock infrastructure only.
 * @edge-case Resets all mutable fixture state between tests so list, mutation, and summary flows remain deterministic.
 */
export function resetManagerStoreProductsCatalogMockState(): void {
  mockProducts = structuredClone(MOCK_PRODUCTS);
  mockOrders = structuredClone(MOCK_ORDERS);
  mockProductIdCounter = 1000;
  mockOrderIdCounter = 1000;
  mockRequestCounter = 0;
}

function buildSummary() {
  return {
    totalProducts: mockProducts.length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
    lowStockProducts: mockProducts.filter((product) => product.stock <= (product.reorderThreshold ?? 0)),
  };
}

/**
 * Module-owned MSW handlers for the Manager Store API contract.
 * @dependencies Store fixtures, schemas, and ManagerStoreProductsUrlConfig only.
 * @edge-case Mutations update the mutable in-memory store state so subsequent reads reflect the same resource identity.
 */
export const managerStoreHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.PRODUCTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const category = url.searchParams.get('category') ?? 'ALL';
    const stock = url.searchParams.get('stock') ?? 'ALL';
    const sortBy = url.searchParams.get('sortBy') ?? '';
    const sortOrder = url.searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc';
    const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') ?? '10'), 1);
    let items = mockProducts.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.sku ?? ''}`.toLowerCase();
      const matchesSearch = !search || searchable.includes(search);
      const matchesCategory = category === 'ALL' || product.category === category;
      const matchesStock = stock === 'ALL' || (stock === 'IN_STOCK' && product.stock > 0) || (stock === 'OUT_OF_STOCK' && product.stock <= 0);
      return matchesSearch && matchesCategory && matchesStock;
    });
    if (sortBy === 'name' || sortBy === 'price' || sortBy === 'stock') {
      items = [...items].sort((left, right) => {
        const a = sortBy === 'name' ? left.name : left[sortBy as 'price' | 'stock'];
        const b = sortBy === 'name' ? right.name : right[sortBy as 'price' | 'stock'];
        const comparison = typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) : Number(a) - Number(b);
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }
    const total = items.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Products fetched', data: { products: items.slice(start, start + limit), total }, requestId: requestId() });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.PRODUCTS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Product>;
    const product: Product = {
      id: `prod-${mockProductIdCounter++}`,
      name: String(body.name ?? 'New Product'),
      category: String(body.category ?? 'Others'),
      price: Number(body.price ?? 0),
      stock: Number(body.stock ?? 0),
      description: body.description,
      imageUrl: body.imageUrl,
      isActive: body.isActive ?? true,
      unit: body.unit,
      sku: body.sku,
      barcode: body.barcode,
      costPrice: body.costPrice,
      reorderThreshold: body.reorderThreshold,
    };
    mockProducts = [product, ...mockProducts];
    return HttpResponse.json({ success: true, message: 'Product created', data: product, requestId: requestId() });
  }),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.PRODUCT_UPDATE(':id')), async ({ request, params }) => {
    const id = String(params.id);
    const index = mockProducts.findIndex((product) => product.id === id);
    if (index < 0) return HttpResponse.json({ success: false, message: 'Product not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const body = await request.json() as Partial<Product>;
    const current = mockProducts[index];
    if (!current) return HttpResponse.json({ success: false, message: 'Product not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const updated = { ...current, ...body, id: current.id };
    mockProducts[index] = updated;
    return HttpResponse.json({ success: true, message: 'Product updated', data: updated, requestId: requestId() });
  }),
  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.PRODUCT_DELETE(':id')), ({ params }) => {
    const id = String(params.id);
    const before = mockProducts.length;
    mockProducts = mockProducts.filter((product) => product.id !== id);
    if (mockProducts.length === before) return HttpResponse.json({ success: false, message: 'Product not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Product deleted', data: { id }, requestId: requestId() });
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_STORE_PRODUCTS_API.SUMMARY), () => HttpResponse.json({ success: true, message: 'Store summary fetched', data: buildSummary(), requestId: requestId() }))
];
