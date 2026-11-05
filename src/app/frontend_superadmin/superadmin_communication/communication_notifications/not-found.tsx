import Link from 'next/link';
import { SUPERADMIN_COMMUNICATION_NOTIFICATIONS_ROUTES } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/config/superadmin_communication_notifications.url_config';
export default function NotificationsNotFound(){return <section className="rounded-xl bg-card p-6"><h2 className="text-primary">Notifications page not found</h2><Link className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-4 py-2 text-on-primary" href={SUPERADMIN_COMMUNICATION_NOTIFICATIONS_ROUTES.MAIN}>Back to notifications</Link></section>;}
