// RESPONSIBILITY: Server Component route entry for the Trainer dashboard; delegates all data access to the client Query layer.
import { Suspense } from 'react';

import TrainerDashboardLoadingSkeleton from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewLoadingSkeleton';

import TrainerDashboardMain from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewMain';





/**
 * @description Provides the server-owned Next.js route entry point for the dashboard feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardOverviewPage() {
  return (
    <Suspense fallback={<TrainerDashboardLoadingSkeleton />}>
      <TrainerDashboardMain />
    </Suspense>
  );
}
