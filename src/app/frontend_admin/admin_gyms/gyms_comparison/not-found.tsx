"use client";
// RESPONSIBILITY: 404 Not Found fallback for gyms comparison route.
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { ADMIN_GYMS_COMPARISON_ROUTES } from './config/admin_gyms_comparison.url_config';

export default function AdminGymsComparisonNotFound() {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-border mt-4">
      <AlertCircle className="text-secondary mb-4" size={24} strokeWidth={2} />
      <h3 className="text-lg font-bold text-text-primary mb-2">Comparison View Not Found</h3>
      <p className="text-sm text-secondary mb-6">The requested branch comparison report could not be located.</p>
      <Link
        href={ADMIN_GYMS_COMPARISON_ROUTES.branchesDirectory}
        className="min-h-11 inline-flex items-center justify-center px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover font-semibold text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        Return to Branches Directory
      </Link>
    </div>
  );
}
