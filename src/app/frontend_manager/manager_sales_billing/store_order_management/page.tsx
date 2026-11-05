import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreOrderManagementMain';
import Loading from '@/app/frontend_manager/manager_sales_billing/store_order_management/loading';

export default function StoreOrderManagementMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
