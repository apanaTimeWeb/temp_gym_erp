"use client";
// RESPONSIBILITY: Renders the empty state for the members list when no records exist or match filters.
import React from 'react';

import { Users } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerMembersEmptyStateProps } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileEmptyStateProps';






/**
 * @description Renders the empty state for the members list when no records exist or match filters.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders the members feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerMembersEmptyState({ isFiltered }: TrainerMembersEmptyStateProps) {
  const t = useTranslations('TRAINER_MEMBERS');
  return (
    <div data-testid="trainer_members-empty-state" className="flex flex-col items-center justify-center py-16 bg-card rounded-2xl border border-border">
      <div className="w-16 h-16 bg-primary-subtle rounded-full flex items-center justify-center mb-4 text-primary">
        <Users size={18}  strokeWidth={2}/>
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">
        {isFiltered ? t("TEXT_NO_MEMBERS_FOUND") : t("TEXT_NO_MEMBERS_YET")}
      </h3>
      <p className="text-secondary text-center max-w-md">
        {isFiltered 
          ? t("TEXT_TRY_ADJUSTING_YOUR_SEARCH_OR_STATUS_FILT_596BC1D3") 
          : t("TEXT_YOUR_GYM_IS_CURRENTLY_EMPTY_ADD_YOUR_FIR_3F99E3E4")}
      </p>
    </div>
  );
}

