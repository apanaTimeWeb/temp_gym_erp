"use client";
﻿import { useState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { TRAINER_MEMBERS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileQueryKeys';

import { useTrainerMembersFilters } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters';


// DATA FLOW: Toolbar input/URL state → local toolbar behavior → parent Members list/filter callbacks.




/**
 * @description Owns useTrainerMembersToolbar behavior in the Trainer module.
 * @dependencies Toolbar input/URL state → local toolbar behavior → parent Members list/filter callbacks.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerMembersToolbar state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerMembersToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, progressStatusFilter, setProgressStatusFilter } = useTrainerMembersFilters();
  const queryClient = useQueryClient();
  const [localSearch, setLocalSearch] = useState(search);

// Effect contract: synchronize the local search input with the external query/URL state.
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

// Effect contract: debounce the member search input before the URL/query state is updated.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: TRAINER_MEMBERS_QUERY_KEYS.lists() });
  };

  return {
    localSearch,
    setLocalSearch,
    statusFilter,
    setStatusFilter,
    progressStatusFilter,
    setProgressStatusFilter,
    handleRefresh
  };
}
