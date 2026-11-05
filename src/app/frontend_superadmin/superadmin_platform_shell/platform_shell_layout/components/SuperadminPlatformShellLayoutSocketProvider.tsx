// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellLayoutSocketProvider within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Provides the shared Superadmin WebSocket lifecycle context using socket.io-client and websocket-only transport.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { io } from 'socket.io-client';

import { SuperadminPlatformShellLayoutEnvironmentConfig } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/config/superadmin_platform_shell_layout_environment_config';

import type { SuperadminSocketContextValue, SuperadminSocketHandler, SuperadminPlatformShellLayoutSocketProviderProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/types/superadmin_platform_shell_layout_infrastructure.types';



const SuperadminSocketContext = createContext<SuperadminSocketContextValue>({
  subscribe: () => () => undefined,
  connected: false,
});

/**
 * @description Owns the single Superadmin Socket.IO connection and subscriber registry for real-time UI updates.
 * @dependencies Uses the centrally validated public websocket URL and approved socket.io-client transport.
 * @edge-case Reconnection is bounded by Socket.IO's configured delay range; feature handlers never own transport lifecycle.
 */
export function SuperadminPlatformShellLayoutSocketProvider({ children }: SuperadminPlatformShellLayoutSocketProviderProps) {
  const handlers = useRef(new Map<string, Set<SuperadminSocketHandler>>());
  const [connected, setConnected] = useState(false);

  // EFFECT INTENT: Establish and clean up the single role-level Socket.IO connection.
  // EFFECT DEPENDENCIES: Empty array intentionally binds the transport lifecycle to this provider mount.
  useEffect(() => {
    if (!SuperadminPlatformShellLayoutEnvironmentConfig.websocketUrl) {
      setConnected(false);
      return undefined;
    }

    const socket = io(SuperadminPlatformShellLayoutEnvironmentConfig.websocketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 30000,
      timeout: 10000,
    });

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    const handleAnyEvent = (event: string, payload: unknown) => {
      handlers.current.get(event)?.forEach((handler) => handler(payload));
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.onAny(handleAnyEvent);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.offAny(handleAnyEvent);
      socket.disconnect();
      setConnected(false);
    };
  }, []);

  const subscribe = useCallback((event: string, handler: SuperadminSocketHandler) => {
    const current = handlers.current.get(event) ?? new Set<SuperadminSocketHandler>();
    current.add(handler);
    handlers.current.set(event, current);
    return () => {
      current.delete(handler);
      if (current.size === 0) handlers.current.delete(event);
    };
  }, []);

  const value = useMemo(() => ({ subscribe, connected }), [connected, subscribe]);
  return <SuperadminSocketContext.Provider value={value}>{children}</SuperadminSocketContext.Provider>;
}

/**
 * @description Returns the shared Superadmin socket subscription API without creating feature-local sockets.
 * @dependencies Uses the role-level SuperadminPlatformShellLayoutSocketProvider context.
 * @edge-case Uses a safe inert default when a page is rendered without the optional host provider or URL.
 */
export function useSuperadminSocket(): SuperadminSocketContextValue {
  return useContext(SuperadminSocketContext);
}

/**
 * @description Subscribes one feature responsibility to one role-level WebSocket event without creating a feature-local socket.
 * @dependencies Uses the centralized SuperadminPlatformShellLayoutSocketProvider registry.
 * @edge-case Cleans up the exact handler on dependency changes and component unmount.
 */
export function useSuperadminSocketEvent(event: string, handler: SuperadminSocketHandler): void {
  const { subscribe } = useSuperadminSocket();
  // EFFECT INTENT: Subscribe the feature handler and automatically remove it when the event or handler identity changes.
  // EFFECT DEPENDENCIES: Event, handler, and subscribe are all required for correct subscription ownership.
  useEffect(() => subscribe(event, handler), [event, handler, subscribe]);
}
