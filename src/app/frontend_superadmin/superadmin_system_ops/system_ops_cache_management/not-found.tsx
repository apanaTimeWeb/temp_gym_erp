import Link from 'next/link';
import { SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/config/superadmin_system_ops_cache_management.url_config';
export default function SystemOpsInfrastructureNotFound() {
  return <section className="rounded-xl border border-border bg-card p-8 text-center"><h2 className="text-lg font-semibold text-primary">Infrastructure page not found</h2><Link className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2 font-semibold text-on-primary focus-visible:ring-2 focus-visible:ring-primary" href={SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_ROUTES.MAIN}>Back to Infrastructure</Link></section>;
}
