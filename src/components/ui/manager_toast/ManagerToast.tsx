'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { ManagerToastProps } from '@/components/ui/manager_toast/ManagerToastTypes';

export default function ManagerToast({
  message,
  type,
  onClose,
  'data-testid': testId,
  className = '',
}: ManagerToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={18} className="text-success shrink-0" />,
    error: <AlertCircle size={18} className="text-danger shrink-0" />,
    warning: <AlertTriangle size={18} className="text-warning shrink-0" />,
    info: <Info size={18} className="text-primary shrink-0" />,
  };

  const borderBgColors = {
    success: 'border-success/30 bg-success-bg text-primary',
    error: 'border-danger/30 bg-danger-bg text-primary',
    warning: 'border-warning/30 bg-warning-bg text-primary',
    info: 'border-primary/30 bg-primary-subtle text-primary',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 flex max-w-md items-center gap-3 rounded-xl border p-4 shadow-xl ${borderBgColors[type]} ${className}`}
      data-testid={testId}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss toast"
        className="rounded-lg p-1 text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
      >
        <X size={16} />
      </button>
    </div>
  );
}

