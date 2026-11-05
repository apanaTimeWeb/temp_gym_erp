// RESPONSIBILITY: Typed API client for Store Sales orders and summary only.
import { z } from 'zod';
import { ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_store_sales/config/admin_sales_store_sales.url_config';
import { storeOrdersResponseSchema, storeOrdersSummaryResponseSchema } from '@/app/frontend_admin/admin_sales/sales_store_sales/schemas/AdminSalesStoreSalesSchemas';
import { adminSalesStoreSalesApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesApiResponse';
import type { StoreOrder, StoreSummary } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesTypes';
function buildQuery(params:Record<string,string|undefined>={}):string{const query=new URLSearchParams();Object.entries(params).forEach(([key,value])=>{if(value!==undefined&&value!=='')query.set(key,value);});const encoded=query.toString();return encoded?`?${encoded}`:'';}
export const AdminSalesApi={fetchStoreOrders:async(params:Record<string,string>={})=>apiFetch<{orders:StoreOrder[];total:number}>(`${ADMIN_SALES_API.storeOrders}${buildQuery(params)}`,{method:'GET',dataSchema:storeOrdersResponseSchema}),fetchStoreSummary:async(params:Record<string,string>={})=>apiFetch<{summary:StoreSummary}>(`${ADMIN_SALES_API.storeSummary}${buildQuery(params)}`,{method:'GET',dataSchema:storeOrdersSummaryResponseSchema})};
