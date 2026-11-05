import { redirect } from 'next/navigation';
import { ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/config/admin_reports_cross_domain_overview.url_config';

/** Reports domain entry redirects to the cross-domain report catalog; each report workflow remains owned by its business domain. */
export default function AdminReportsDomainRedirect() { redirect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.root); }
