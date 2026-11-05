'use client';
import { useEffect } from 'react';
import { socketService } from '@/lib/socket';

/** Subscribes notification and chat updates through the approved global socket adapter. */
export function useSuperadminCommunicationNotificationsSocketEvent(onNotificationEvent: () => void): void {
  useEffect(() => socketService.subscribe('notification.received', onNotificationEvent), [onNotificationEvent]);
  useEffect(() => socketService.subscribe('chat_message', onNotificationEvent), [onNotificationEvent]);
}
