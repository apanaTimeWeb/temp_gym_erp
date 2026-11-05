// RESPONSIBILITY: Guards the simple Login form against browser-level navigation while user-entered credentials remain unsaved.
// DATA FLOW: React Hook Form isDirty -> beforeunload listener -> browser leave warning.
'use client';

import { useEffect } from 'react';

import { AuthLoginConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessLoginConstants';



/**
 * Prevents accidental browser-level loss of entered Login credentials after the form becomes dirty.
 * @description Implements the documented Auth form data-loss safeguard without creating a client-navigation routing abstraction.
 * @dependencies React useEffect only.
 * @edge-case The listener is removed immediately when the form becomes clean or the component unmounts.
 * @param isDirty Whether the Login form currently contains unsaved user input.
 */
export function useAuthLoginUnsavedChangesGuard(isDirty: boolean): void {
  // USEEFFECT AUDIT: Re-register only while dirty so browser-level navigation warnings are added and removed symmetrically.
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Modern browsers ignore custom beforeunload text and render their own localized warning.
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
