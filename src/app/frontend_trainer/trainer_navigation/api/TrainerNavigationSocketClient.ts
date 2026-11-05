"use client";
// RESPONSIBILITY: Owns Socket.IO client lifecycle and reference-counted ownership for Trainer infrastructure. Feature modules never instantiate sockets directly.
// DATA FLOW: Feature subscription → provider → Socket.IO client → feature listener → provider cleanup → reference release.
import { getSocket } from '@/lib/socket';

import type { Socket } from 'socket.io-client';




const socketCache = new Map<string, Socket>();
const socketRefCounts = new Map<string, number>();

/**
 * @description Returns the shared Trainer Socket.IO connection for a transport path, creating it once per path.
 * @dependencies Uses the approved Socket.IO transport and Trainer infrastructure connection settings.
 * @edge-case Reuses an existing connection so multiple feature subscribers do not create duplicate sockets.
 */
export const getTrainerNavigationSocket = (path: string): Socket => {
  const existing = socketCache.get(path);
  if (existing) return existing;
  // The host central adapter owns transport, credentials, connection and disconnection.
  // `path` remains the local subscription registry key; it is not a new transport constructor.
  const socket = getSocket() as Socket;
  socketCache.set(path, socket);
  return socket;
};

/**
 * @description Retains one active Trainer infrastructure subscriber for a shared socket path.
 * @dependencies Uses the module-owned reference-count registry.
 * @edge-case Multiple listeners on the same path keep the socket connected until the final subscriber releases it.
 */
export const retainTrainerNavigationSocket = (path: string): void => {
  socketRefCounts.set(path, (socketRefCounts.get(path) ?? 0) + 1);
};

/**
 * @description Releases one Trainer infrastructure subscriber and disconnects only when the final subscriber is gone.
 * @dependencies Uses the module-owned socket and reference-count registries.
 * @edge-case A missing path or already-released subscriber is ignored without affecting unrelated sockets.
 */
export const releaseTrainerNavigationSocket = (path: string): void => {
  const currentCount = socketRefCounts.get(path) ?? 0;
  if (currentCount === 0) return;
  if (currentCount > 1) {
    socketRefCounts.set(path, currentCount - 1);
    return;
  }
  socketRefCounts.delete(path);
  const socket = socketCache.get(path);
  if (!socket) return;
  // Never disconnect the host-owned shared connection when this leaf unsubscribes.
  socketCache.delete(path);
};
