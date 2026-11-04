'use client';
// RESPONSIBILITY: Owns the browser connection-status signal used by PublicLanding network forms.
// DATA FLOW: Browser online/offline events → local status → form availability/connection notice.
import { useEffect, useState } from 'react';

/**
 * Tracks browser connectivity for the public booking/contact workflows.
 * @dependencies Browser navigator.onLine and online/offline events.
 * @edge-cases SSR has no navigator, so the initial state is optimistic and corrected after mount.
 */
export function usePublicLandingOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    setIsOnline(window.navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
