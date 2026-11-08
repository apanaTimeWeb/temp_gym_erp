"use client";
// RESPONSIBILITY: Owns Trainer Diet Library view-modal UI state; Manager-only mutations are intentionally absent.
// DATA FLOW: Diet library Query data → view modal state → Diet Library UI.
import { useCallback, useState } from 'react';

import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';




/**
 * @description Owns Trainer Diet Library view-modal UI state; Manager-only mutations are intentionally absent.
 * @dependencies Diet library Query data → view modal state → Diet Library UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerLibraryDiet state and data flow for the library feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerLibraryDiet() {
  const [showDietModal, setShowDietModal] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<TrainerLibraryDietPlan | null>(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [formDietPlan, setFormDietPlan] = useState<TrainerLibraryDietPlan | null>(null);

  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [deleteRequestPlan, setDeleteRequestPlan] = useState<TrainerLibraryDietPlan | null>(null);

  const openViewDiet = useCallback((diet: TrainerLibraryDietPlan) => {
    setSelectedDiet(diet);
    setShowDietModal(true);
  }, []);

  const closeDietModal = useCallback(() => {
    setShowDietModal(false);
    setSelectedDiet(null);
  }, []);

  const openCreateDiet = useCallback(() => {
    setFormDietPlan(null);
    setShowFormModal(true);
  }, []);

  const openEditPlan = useCallback((diet: TrainerLibraryDietPlan) => {
    setFormDietPlan(diet);
    setShowFormModal(true);
  }, []);

  const closeFormModal = useCallback(() => {
    setShowFormModal(false);
    setFormDietPlan(null);
  }, []);

  const openDeleteRequest = useCallback((diet: TrainerLibraryDietPlan) => {
    setDeleteRequestPlan(diet);
    setShowDeleteRequestModal(true);
  }, []);

  const closeDeleteRequestModal = useCallback(() => {
    setShowDeleteRequestModal(false);
    setDeleteRequestPlan(null);
  }, []);

  return {
    showDietModal,
    editDietId: selectedDiet?.id ?? null,
    editDietData: selectedDiet,
    openEditDiet: openViewDiet,
    closeDietModal,

    showFormModal,
    formDietPlan,
    openCreateDiet,
    openEditPlan,
    closeFormModal,

    showDeleteRequestModal,
    deleteRequestPlan,
    openDeleteRequest,
    closeDeleteRequestModal,
  };
}
