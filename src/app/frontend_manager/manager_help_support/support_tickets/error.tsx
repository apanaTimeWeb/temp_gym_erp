// RESPONSIBILITY: Error boundary for Manager Support Tickets route.
'use client';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ManagerSupportTicketsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12" role="alert">
      <div className="w-12 h-12 rounded-full bg-danger-bg text-danger-text flex items-center justify-center mx-auto">
        <AlertCircle size={24} aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold text-text-primary">Failed to load Support Tickets</h2>
      <p className="text-xs text-text-secondary">{error.message || 'An unexpected error occurred while fetching support tickets.'}</p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover active:scale-95 transition-all"
      >
        <RefreshCw size={16} aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}

