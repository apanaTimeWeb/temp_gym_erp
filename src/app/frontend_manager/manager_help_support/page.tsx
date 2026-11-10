// Preserve the domain URL by redirecting to the canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerHelpSupportDomainRedirectPage() {
  redirect('/frontend_manager/manager_help_support/support_tickets');
}

