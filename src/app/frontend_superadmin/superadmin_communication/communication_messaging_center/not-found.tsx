// RESPONSIBILITY: Renders/orchestrates not-found within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the superadmin_communication_messaging route-segment not-found state and provides the documented recovery navigation.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_ROUTES } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/config/superadmin_communication_messaging_center.url_config';



/**
 * @description Renders the not-found component and its associated UI logic.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function MessagingNotFound() {
  const t = useTranslations('superadmin_communication_messaging');
    return (<div className="empty-state-container" data-testid="superadmin_communication_messaging-not-found-not-found-not-found">
      <div className="w-16 h-16 rounded-full bg-floating flex items-center justify-center">
        <span className="text-3xl font-bold text-secondary">{t('ui.404_4f4adcbf')}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary mb-1">{t('ui.message_not_found_a883ab8')}</h2>
        <p className="text-secondary text-sm max-w-sm">
          
          {t('ui.the_message_or_notification_you_are_looking_for__29e2904')}
        </p>
      </div>
      <Link href={SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_ROUTES.MAIN} className="min-h-11 inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_communication_messaging-not-found-messaging-not-found-back">
        
        {t('ui.back_to_messaging')}
      </Link>
    </div>);
}
