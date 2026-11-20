"use client";
// RESPONSIBILITY: Renders the error boundary for the gyms comparison module.
// DATA FLOW: Next.js route/lifecycle → gyms_comparison/error.tsx
import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function AdminGymsComparisonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Isolated error monitoring boundary
  }, [error]);

  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-border mt-4" data-testid="admin_gyms_comparison-error-state">
      <AlertTriangle className="text-danger mb-4" size={24} strokeWidth={2} />
      <h3 className="text-lg font-bold text-primary mb-2">Unable to load comparison data</h3>
      <p className="text-sm text-secondary max-w-md mb-4">
        An error occurred while preparing branch comparison metrics. You can try again or return to branch directory.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors min-h-11 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <RotateCcw size={16} />
        Retry Comparison
      </button>
    </div>
  );
}
