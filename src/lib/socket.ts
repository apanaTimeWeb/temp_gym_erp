/**
 * Canonical Global WebSocket Transport & Adapter
 */
import { io, Socket } from 'socket.io-client';

type EventHandler = (...args: unknown[]) => void;

class SocketStub {
  private handlers = new Map<string, Set<EventHandler>>();
  public connected = false;

  on(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)?.add(handler);
    return this;
  }

  off(event: string, handler?: EventHandler) {
    if (!handler) {
      this.handlers.delete(event);
    } else {
      this.handlers.get(event)?.delete(handler);
    }
    return this;
  }

  emit(event: string, ...args: unknown[]) {
    this.handlers.get(event)?.forEach((fn) => {
      try {
        fn(...args);
      } catch (err) {
        console.error('Socket event handler error:', err);
      }
    });
    return this;
  }

  connect() {
    this.connected = true;
    return this;
  }

  disconnect() {
    this.connected = false;
    return this;
  }

  close() {
    this.connected = false;
    return this;
  }
}

const defaultSocket = new SocketStub() as unknown as Socket;

export function getSocket(): Socket {
  return defaultSocket;
}

export const socketService = {
  subscribe: <T>(event: string, callback: (data: T) => void): (() => void) => {
    const handler = (data: unknown) => callback(data as T);
    defaultSocket.on(event, handler as EventHandler);
    return () => {
      defaultSocket.off(event, handler as EventHandler);
    };
  },
  emit: (event: string, payload: unknown): void => {
    defaultSocket.emit(event, payload);
  },
};

export default socketService;

