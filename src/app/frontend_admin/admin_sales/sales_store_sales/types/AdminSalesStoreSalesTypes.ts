// RESPONSIBILITY: Response and UI state types for Store Sales only.
import type { QueryStatus } from '@tanstack/react-query';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_store_sales/constants/AdminSalesStoreSalesConstants';
export type DateFilter = (typeof DATE_FILTERS)[number];
export interface StoreProduct { id:string; name:string; category:string; price:number; stock:number; description?:string; imageUrl?:string; isActive:boolean; }
export interface StoreOrderItem { id:string; qty:number; price:number; product:{ name:string }; }
export interface StoreOrder { id:string; total:number; method:string; status:string; branchId?:string; notes?:string; createdAt:string; items?:StoreOrderItem[]; }
export interface StoreSummary { totalProducts:number; totalOrders:number; totalRevenue:number; lowStockProducts:StoreProduct[]; }
export interface AdminSalesStoreSalesState { isCustomRangeBlocked:boolean; startDate:string; endDate:string; search:string; setSearch:(value:string)=>void; currentPage:number; setCurrentPage:(page:number)=>void; storeOrders:StoreOrder[]; storeOrdersTotal:number; storeStatus:QueryStatus; storeError:string; retryStoreOrders:()=>Promise<unknown>; storeSummary:StoreSummary|null; storeSummaryStatus:QueryStatus; storeSummaryError:string; retryStoreSummary:()=>Promise<unknown>; }
