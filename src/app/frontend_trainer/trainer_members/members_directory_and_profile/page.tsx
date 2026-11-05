// RESPONSIBILITY: Server route entry that renders the Members client boundary without duplicating client query requests.
import { Suspense } from 'react';

import TrainerMembersLoadingSkeleton from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileLoadingSkeleton';

import TrainerMembersMain from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileMain';





/**
 * @description Provides the server-owned Next.js route entry point for the members feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersPage() {
  return (
    <Suspense fallback={<TrainerMembersLoadingSkeleton />}>
      <TrainerMembersMain />
    </Suspense>
  );
}
