"use client";
// RESPONSIBILITY: Provides one shared Admin confirmation service and renders its modal.
// DATA FLOW: Admin feature → confirm(options) → FIFO request queue → modal → Promise<boolean>.

import React, { createContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import AdminNavigationLayoutConfirmModal from '@/app/frontend_admin/admin_profile/profile_overview/components/feedback/AdminProfileOverviewConfirmModal';
import type { AdminConfirmContextType, AdminConfirmOptions } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewConfirmTypes';
import type { AdminConfirmProviderProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewConfirmProviderTypes';

import { ConfirmContext } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutConfirmProvider';
export { ConfirmContext };
interface PendingConfirmation {
  options: AdminConfirmOptions;
  resolve: (value: boolean) => void;
}

/** Serializes concurrent confirmation calls so no caller promise is overwritten or left pending. */
export function AdminNavigationLayoutConfirmProvider({ children }: AdminConfirmProviderProps) {
  const queueRef = useRef<PendingConfirmation[]>([]);
  const currentRef = useRef<PendingConfirmation | null>(null);
  const [current, setCurrent] = useState<PendingConfirmation | null>(null);

  const advance = useCallback(() => {
    const next = queueRef.current.shift() ?? null;
    currentRef.current = next;
    setCurrent(next);
  }, []);

  const confirm = useCallback((nextOptions: AdminConfirmOptions) => new Promise<boolean>((resolve) => {
    const request: PendingConfirmation = {
      options: {
        ...nextOptions,
        requireTyping: nextOptions.requireTyping ?? false,
        confirmationPhrase: nextOptions.confirmationPhrase ?? 'CONFIRM',
      },
      resolve,
    };
    if (currentRef.current) {
      queueRef.current.push(request);
      return;
    }
    currentRef.current = request;
    setCurrent(request);
  }), []);

  const complete = useCallback((result: boolean) => {
    const active = currentRef.current;
    if (!active) return;
    currentRef.current = null;
    active.resolve(result);
    advance();
  }, [advance]);

  useEffect(() => () => {
    currentRef.current?.resolve(false);
    currentRef.current = null;
    queueRef.current.splice(0).forEach((request) => request.resolve(false));
  }, []);

  const contextValue = useMemo(() => ({ confirm }), [confirm]);
  const options = current?.options;
  return <ConfirmContext.Provider value={contextValue}>
    {children}
    {options && <AdminNavigationLayoutConfirmModal
      isOpen
      title={options.title}
      message={options.message}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      type={options.type}
      requireTyping={options.requireTyping}
      confirmationPhrase={options.confirmationPhrase}
      onConfirm={() => complete(true)}
      onCancel={() => complete(false)}
    />}
  </ConfirmContext.Provider>;
}
