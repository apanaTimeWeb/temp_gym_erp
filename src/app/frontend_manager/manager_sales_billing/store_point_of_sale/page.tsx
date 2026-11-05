import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStorePointOfSaleMain';
import Loading from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/loading';

export default function StorePointOfSaleMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
