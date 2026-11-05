// RESPONSIBILITY: Defines the page route, lifecycle boundary, or module support artifact for page.tsx; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_members/page.tsx)

import { redirect } from 'next/navigation';
import { ADMIN_MEMBERS_ROUTES } from "@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config";

/** Domain entry redirects to its autonomous feature leaf. Only canonical leaf routes are supported. */
export default function AdminMembersDomainRedirect() {
  redirect(ADMIN_MEMBERS_ROUTES.root);
}
