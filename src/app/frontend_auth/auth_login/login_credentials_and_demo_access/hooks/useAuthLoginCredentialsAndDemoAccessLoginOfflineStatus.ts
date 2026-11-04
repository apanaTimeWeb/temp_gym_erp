// RESPONSIBILITY: Tracks browser network status for login UX without conflating it with API errors.
// FLOW: window online/offline events -> local offline state -> login submit disable behavior.
'use client';
import { useEffect, useState } from 'react';
/** Browser offline hint; server errors remain owned by the mutation hook. */
export function useAuthLoginOfflineStatus(): boolean {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  return offline;
}
