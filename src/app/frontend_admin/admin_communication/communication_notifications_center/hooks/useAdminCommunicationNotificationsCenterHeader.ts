"use client";
// RESPONSIBILITY: Renders the useAdminCommunicationNotificationsCenterHeader UI surface for communication_notifications_center; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → useAdminCommunicationNotificationsCenterHeader → accessible UI/events routed to owning hooks (admin_communication/communication_notifications_center/hooks/useAdminCommunicationNotificationsCenterHeader.ts)

import { useEffect, useRef, useState } from 'react';

/**
 * @description Owns notifications header dropdown visibility, DOM ref, and outside-click dismissal.
 * @dependencies React state/ref/effect primitives.
 * @edge-case Cleans the document listener on unmount and never closes the dropdown from inside clicks.
 */
export function useAdminNotificationsHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return { showNotifications, setShowNotifications, notifRef };
}
