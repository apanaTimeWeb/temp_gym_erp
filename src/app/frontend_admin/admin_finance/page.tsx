import { redirect } from 'next/navigation';
import { ADMIN_FINANCE_ROUTES } from '@/app/frontend_admin/admin_finance/finance_payments/config/admin_finance_payments.url_config';

/** Domain entry redirects to the primary autonomous workflow; secondary navigation is defined in the domain layout. */
export default function AdminFinanceDomainRedirect() { redirect(ADMIN_FINANCE_ROUTES.root); }
