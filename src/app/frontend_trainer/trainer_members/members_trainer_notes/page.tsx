import { Suspense } from 'react';
import TrainerMembersTrainerNotesMain from '@/app/frontend_trainer/trainer_members/members_trainer_notes/components/TrainerMembersTrainerNotesMain';
export default function TrainerNotesPage() {
  return <Suspense fallback={<div role="status" className="min-h-24 motion-safe:animate-pulse bg-skeleton-base"/>}><TrainerMembersTrainerNotesMain /></Suspense>;
}
