"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for profile_overview; it does not render the page UI.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_profile/profile_overview/hooks/useAdminProfileOverviewPasswordVisibility.ts)

import { useState } from 'react';

/** @description Manages independent visibility toggles for the three password fields in the Admin profile security form. @dependencies React local state only. @edge-case Toggling one field never changes the visibility state of the other fields. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminProfilePasswordVisibility() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return {
    showCurrent,
    showNew,
    showConfirm,
    toggleCurrent: () => setShowCurrent((value) => !value),
    toggleNew: () => setShowNew((value) => !value),
    toggleConfirm: () => setShowConfirm((value) => !value),
  };
}
