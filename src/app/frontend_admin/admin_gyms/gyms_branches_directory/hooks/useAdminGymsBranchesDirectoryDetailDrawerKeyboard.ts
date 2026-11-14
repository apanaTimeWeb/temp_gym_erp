"use client";
// RESPONSIBILITY: Renders the useAdminGymsBranchesDirectoryDetailDrawerKeyboard UI surface for branches_directory; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → useAdminGymsBranchesDirectoryDetailDrawerKeyboard → accessible UI/events routed to owning hooks (admin_branches/branches_directory/hooks/useAdminGymsBranchesDirectoryDetailDrawerKeyboard.ts)

import { useEffect } from 'react';

/**
 * @description Binds Escape-key dismissal for the branches detail drawer.
 * @dependencies React useEffect and the module-owned closeDetail callback.
 * @edge-case Removes the document listener on close/unmount and when the drawer is disabled.
 */
export function useAdminBranchesDetailDrawerKeyboard(enabled: boolean, closeDetail: () => void) {
  useEffect(() => {
    if (!enabled) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, closeDetail]);
}
