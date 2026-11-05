import { redirect } from 'next/navigation';
import { ADMIN_SALES_ROUTES } from '@/app/frontend_admin/admin_sales/sales_overview/config/admin_sales_overview.url_config';

/** Domain entry redirects to the primary autonomous workflow; secondary navigation is defined in the domain layout. */
export default function AdminSalesDomainRedirect() { redirect(ADMIN_SALES_ROUTES.root); }
