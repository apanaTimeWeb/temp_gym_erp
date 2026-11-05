'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { ManagerConfirmOptions, ManagerConfirmContextValue } from '@/components/ui/manager_confirm_modal/ManagerConfirmModalTypes';

export const ManagerConfirmContext = createContext<ManagerConfirmContextValue | undefined>(undefined);

export function useConfirm(): ManagerConfirmContextValue {
  const context = useContext(ManagerConfirmContext);
  if (!context) {
    return {
      confirm: async () => true,
    };
  }
  return context;
}

export function useManagerConfirm(): ManagerConfirmContextValue {
  return useConfirm();
}

export function ManagerConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ManagerConfirmOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const settle = useCallback((result: boolean) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    resolve?.(result);
    setOptions(null);
    setIsOpen(false);
  }, []);

  const confirm = useCallback((nextOptions: ManagerConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current?.(false);
      resolverRef.current = resolve;
      setOptions(nextOptions);
      setIsOpen(true);
    });
  }, []);

  useEffect(() => () => {
    resolverRef.current?.(false);
  }, []);

  return (
    <ManagerConfirmContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-bold text-primary">{options.title}</h3>
            <p className="mt-2 text-sm text-secondary">{options.message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => settle(false)}
                className="min-h-10 rounded-lg border border-border bg-input px-4 text-sm font-medium text-primary hover:bg-surface-hover"
              >
                {options.cancelText || 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => settle(true)}
                className={`min-h-10 rounded-lg px-4 text-sm font-medium text-white ${
                  options.type === 'danger' ? 'bg-danger hover:bg-danger/90' : 'bg-primary hover:bg-primary-hover'
                }`}
              >
                {options.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ManagerConfirmContext.Provider>
  );
}

