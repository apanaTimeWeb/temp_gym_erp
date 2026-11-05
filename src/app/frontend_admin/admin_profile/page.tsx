// RESPONSIBILITY: Defines the page route, lifecycle boundary, or module support artifact for page.tsx; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_profile/page.tsx)

import { redirect } from 'next/navigation';
import { ADMIN_PROFILE_ROUTES } from "@/app/frontend_admin/admin_profile/profile_overview/config/admin_profile_overview.url_config";

/** Domain entry redirects to its autonomous feature leaf. Only canonical leaf routes are supported. */
export default function AdminProfileDomainRedirect() {
  redirect(ADMIN_PROFILE_ROUTES.root);
}
