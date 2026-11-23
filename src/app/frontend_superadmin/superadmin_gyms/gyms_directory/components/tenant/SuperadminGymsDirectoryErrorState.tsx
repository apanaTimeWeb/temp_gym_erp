'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface SuperadminGymsDirectoryErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export type ErrorStateProps = SuperadminGymsDirectoryErrorStateProps;

export function SuperadminGymsDirectoryErrorState({
  title = 'Failed to load data',
  message = 'An error occurred while communicating with the server. Please check your connection and try again.',
  onRetry,
  retryText = 'Retry',
}: SuperadminGymsDirectoryErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-danger bg-danger-bg my-6"
    >
      <div className="w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center text-danger mb-4 border border-danger">
        <AlertCircle size={28} aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-danger mb-1">{title}</h3>
      <p className="text-sm text-secondary max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-lg bg-card border border-border text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
        >
          <RefreshCw size={16} aria-hidden="true" />
          <span>{retryText}</span>
        </button>
      )}
    </div>
  );
}

export const ErrorState = SuperadminGymsDirectoryErrorState;
