// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutWebSocketProvider.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/components/AdminNavigationLayoutWebSocketProvider.test.tsx)

import React from 'react';
import { render, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutWebSocketProvider, { useAdminNavigationLayoutWebSocketEvent } from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutWebSocketProvider';

const mocks = vi.hoisted(() => ({
  dispatch: null as null | ((eventName: string, payload: unknown) => void),
  socket: {
    on: vi.fn(),
    onAny: vi.fn(),
    connect: vi.fn(),
    close: vi.fn(),
    disconnect: vi.fn(),
    removeAllListeners: vi.fn(),
  },
  io: vi.fn(),
  logErrorToMonitoring: vi.fn(),
}));

vi.mock('socket.io-client', () => ({ io: mocks.io }));
vi.mock('@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMonitoring', () => ({ logErrorToMonitoring: mocks.logErrorToMonitoring }));

const survivor = vi.fn();
function SubscriberFixture() {
  useAdminNavigationLayoutWebSocketEvent('permission.updated', () => { throw new Error('subscriber detail must not escape'); });
  useAdminNavigationLayoutWebSocketEvent('permission.updated', survivor);
  return null;
}

describe('AdminNavigationLayoutWebSocketProvider subscriber isolation', () => {
  beforeEach(() => {
    mocks.dispatch = null;
    mocks.socket.on.mockReset();
    mocks.socket.onAny.mockReset().mockImplementation((handler: (eventName: string, payload: unknown) => void) => { mocks.dispatch = handler; });
    mocks.socket.connect.mockReset();
    mocks.socket.close.mockReset();
    mocks.socket.disconnect.mockReset();
    mocks.socket.removeAllListeners.mockReset();
    mocks.io.mockReset().mockReturnValue(mocks.socket);
    mocks.logErrorToMonitoring.mockReset();
    survivor.mockReset();
  });
  afterEach(() => vi.restoreAllMocks());

  it('uses a single socket with built-in reconnection and cleans it up on unmount', () => {
    const view = render(<AdminNavigationLayoutWebSocketProvider url="ws://localhost/admin"><span>Consumer</span></AdminNavigationLayoutWebSocketProvider>);
    expect(mocks.io).toHaveBeenCalledTimes(1);
    expect(mocks.io).toHaveBeenCalledWith('ws://localhost/admin', expect.objectContaining({ reconnection: true, autoConnect: false }));
    view.unmount();
    expect(mocks.socket.disconnect).toHaveBeenCalledTimes(1);
    expect(mocks.socket.removeAllListeners).toHaveBeenCalledTimes(1);
  });

  it('continues to later subscribers when an earlier subscriber throws', () => {
    render(<AdminNavigationLayoutWebSocketProvider url="ws://localhost/admin"><SubscriberFixture /></AdminNavigationLayoutWebSocketProvider>);
    expect(mocks.dispatch).toBeTypeOf('function');
    act(() => mocks.dispatch?.('permission.updated', { staffId: 'staff-1001' }));
    expect(survivor).toHaveBeenCalledWith({ staffId: 'staff-1001' });
    expect(mocks.logErrorToMonitoring).toHaveBeenCalledWith(expect.any(Error), { module: 'admin_navigation' });
    expect(mocks.logErrorToMonitoring.mock.calls[0]?.[0].message).toBe('Admin WebSocket subscriber callback failed');
  });
});
