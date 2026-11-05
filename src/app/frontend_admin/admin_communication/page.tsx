import { redirect } from 'next/navigation';
import { ADMIN_ANNOUNCEMENTS_ROUTES } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/config/admin_communication_notices_and_announcements.url_config';

/** Communication domain entry redirects to the notices workflow. */
export default function AdminCommunicationDomainRedirect() { redirect(ADMIN_ANNOUNCEMENTS_ROUTES.root); }
