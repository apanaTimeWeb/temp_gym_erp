// RESPONSIBILITY: Server route entry that renders the Library client boundary without duplicating client query requests.
import { Suspense } from 'react';

import TrainerLibraryLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsLoadingSkeleton';

import TrainerLibraryMain from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsMain';





/**
 * @description Provides the server-owned Next.js route entry point for the library feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryPage() {
  return (
    <Suspense fallback={<TrainerLibraryLoadingSkeleton />}>
      <TrainerLibraryMain />
    </Suspense>
  );
}
