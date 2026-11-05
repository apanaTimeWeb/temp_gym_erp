'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'default';
}

export interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined);

export function useConfirm(): ConfirmContextValue {
  const context = useContext(ConfirmContext);
  if (!context) {
    return {
      confirm: async () => true,
    };
  }
  return context;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const settle = useCallback((result: boolean) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    resolve?.(result);
    setOptions(null);
    setIsOpen(false);
  }, []);

  const confirm = useCallback((nextOptions: ConfirmOptions) => {
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
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl motion-safe:animate-in motion-safe:zoom-in-95">
            <h3 className="text-lg font-bold text-primary">{options.title}</h3>
            <p className="mt-2 text-sm text-secondary">{options.message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => settle(false)}
                className="min-h-10 rounded-lg border border-border bg-input px-4 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {options.cancelText || 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => settle(true)}
                className={`min-h-10 rounded-lg px-4 text-sm font-medium text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  options.type === 'danger'
                    ? 'bg-danger hover:bg-danger/90'
                    : options.type === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-primary hover:bg-primary-hover'
                }`}
              >
                {options.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

