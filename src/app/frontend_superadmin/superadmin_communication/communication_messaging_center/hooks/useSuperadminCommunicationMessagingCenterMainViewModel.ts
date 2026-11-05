'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useSuperadminCommunicationMessagingCenter } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenter';
import { useSuperadminCommunicationMessagingCenterCompose } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterCompose';
import type { SuperadminCommunicationMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_compose.types';

/**
 * @description Coordinates the use Superadmin messaging main view model concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminCommunicationMessagingCenterMainViewModel() {
  const t = useTranslations('superadmin_communication_messaging');
  const messaging = useSuperadminCommunicationMessagingCenter();
  const [composeOpen, setComposeOpen] = useState(false);
  const resolveComposePayload = useSuperadminCommunicationMessagingCenterCompose(messaging.tenants);

  const handleSend = async (values: SuperadminCommunicationMessagingComposeValues): Promise<void> => {
    const payload = resolveComposePayload(values);
    if (!payload) {
      toast.error(t('ui.selected_tenant_unavailable'), { id: 'superadmin-message-tenant-unavailable' });
      return;
    }
    try {
      const response = await messaging.sendMessage(payload);
      if (!response.success || !response.data) {
        toast.error(response.message || t('ui.action_failed_retry'), { id: 'superadmin-message-send-error' });
        return;
      }
      toast.success(response.message, { id: 'superadmin-message-send-success' });
      setComposeOpen(false);
    } catch {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-message-send-error' });
    }
  };
  const openCompose = () => {
    if (messaging.tenantsIsError) {
      toast.error(t('ui.tenants_could_not_be_loaded'), { id: 'superadmin-message-tenants-error' });
      void messaging.refetchTenants();
      return;
    }
    setComposeOpen(true);
  };
  return {
    ...messaging,
    composeOpen,
    openCompose,
    closeCompose: () => setComposeOpen(false),
    handleSend,
  };
}
