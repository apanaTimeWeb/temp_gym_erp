import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/components/ManagerStoreProductsCatalogMain';
import Loading from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/loading';

export const dynamic = 'force-dynamic';
export default function StoreProductsCatalogMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
