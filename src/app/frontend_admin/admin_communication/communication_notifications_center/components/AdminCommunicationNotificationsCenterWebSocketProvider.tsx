"use client";
// RESPONSIBILITY: Owns the single Admin shell WebSocket lifecycle and exposes event subscriptions to feature hooks.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutWebSocketProvider.tsx)

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_communication/communication_notifications_center/utils/AdminCommunicationNotificationsCenterMonitoring';
import type { AdminNavigationLayoutWebSocketContextValue, AdminNavigationLayoutWebSocketProviderProps, AdminSocketListener } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterShellContractTypes';

import { AdminNavigationLayoutWebSocketContext } from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutWebSocketProvider';

/**
 * @description AdminNavigationLayoutWebSocketProvider owns connection lifecycle/reconnect and exposes a cleanup-safe event subscription API.
 * @dependencies Uses socket.io-client over WebSocket transport only; no feature business logic is stored here.
 * @edge-case When no host-supplied URL exists, the provider stays disconnected and feature recovery falls back to query revalidation.
 */
export default function AdminNavigationLayoutWebSocketProvider({ children, url }: AdminNavigationLayoutWebSocketProviderProps) {
  const [connected, setConnected] = useState(false);
  const listenersRef = useRef(new Map<string, Set<AdminSocketListener>>());
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!url) return;
    let disposed = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let retryDelay = 1000;
    const connect = () => {
      if (disposed) return;
      const socket = io(url, { transports: ['websocket'], autoConnect: false });
      socketRef.current = socket;
      socket.on('connect', () => { retryDelay = 1000; setConnected(true); });
      socket.onAny((eventName, payload) => {
        listenersRef.current.get(eventName)?.forEach((listener) => {
          try { listener(payload); }
          catch { logErrorToMonitoring(new Error('Admin WebSocket subscriber callback failed'), { module: 'admin_navigation' }); }
        });
      });
      socket.on('disconnect', () => {
        setConnected(false); socketRef.current = null;
        if (!disposed) { retryTimer = setTimeout(connect, retryDelay); retryDelay = Math.min(retryDelay * 2, 10000); }
      });
      socket.on('connect_error', () => setConnected(false));
      socket.connect();
    };
    connect();
    return () => { disposed = true; if (retryTimer) clearTimeout(retryTimer); socketRef.current?.close(); socketRef.current = null; setConnected(false); };
  }, [url]);

  const subscribe = useCallback((eventName: string, listener: AdminSocketListener) => {
    const listeners = listenersRef.current.get(eventName) ?? new Set<AdminSocketListener>();
    listeners.add(listener); listenersRef.current.set(eventName, listeners);
    return () => { listeners.delete(listener); if (!listeners.size) listenersRef.current.delete(eventName); };
  }, []);
  const value = useMemo(() => ({ connected, subscribe }), [connected, subscribe]);
  return <AdminNavigationLayoutWebSocketContext.Provider value={value}>{children}</AdminNavigationLayoutWebSocketContext.Provider>;
}

/**
 * @description Subscribes an Admin feature hook to one named WebSocket event without creating a feature-owned connection.
 * @dependencies Requires the nearest AdminNavigationLayoutWebSocketProvider and a stable event listener callback.
 * @edge-case Throws when rendered outside the provider; cleanup is automatic on dependency change/unmount.
 */
export function useAdminNavigationLayoutWebSocketEvent(eventName: string, listener: AdminSocketListener) {
  const context = useContext(AdminNavigationLayoutWebSocketContext);
  useEffect(() => {
    if (!context) return;
    return context.subscribe(eventName, listener);
  }, [context, eventName, listener]);
  return context?.connected ?? false;
}
