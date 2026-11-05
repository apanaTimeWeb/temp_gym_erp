// DATA FLOW: socket adapter → real Messaging event hook → notification callback.
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminCommunicationNotificationsSocketEvent } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/hooks/useSuperadminCommunicationNotificationsSocketEvent';

const socketMocks = vi.hoisted(() => ({
  subscribe: vi.fn(),
  unsubscribeNotification: vi.fn(),
  unsubscribeChat: vi.fn(),
}));

vi.mock('@/lib/socket', () => ({
  socketService: { subscribe: socketMocks.subscribe },
}));

describe('useSuperadminCommunicationNotificationsSocketEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    socketMocks.subscribe.mockImplementation((event: string) => (
      event === 'notification.received' ? socketMocks.unsubscribeNotification : socketMocks.unsubscribeChat
    ));
  });

  afterEach(() => vi.clearAllMocks());

  it('subscribes the real hook to notification and chat events and unsubscribes both on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useSuperadminCommunicationNotificationsSocketEvent(callback));

    expect(socketMocks.subscribe).toHaveBeenCalledTimes(2);
    expect(socketMocks.subscribe).toHaveBeenCalledWith('notification.received', callback);
    expect(socketMocks.subscribe).toHaveBeenCalledWith('chat_message', callback);

    unmount();
    expect(socketMocks.unsubscribeNotification).toHaveBeenCalledOnce();
    expect(socketMocks.unsubscribeChat).toHaveBeenCalledOnce();
  });
});
