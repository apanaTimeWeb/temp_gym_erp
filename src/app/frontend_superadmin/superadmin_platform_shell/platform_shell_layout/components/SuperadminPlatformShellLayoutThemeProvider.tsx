// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellLayoutThemeProvider within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Provides the application theme state and theme-mode presentation contract without owning module business data.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { SuperadminTheme, SuperadminThemeContextValue, SuperadminPlatformShellLayoutThemeProviderProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/types/superadmin_platform_shell_layout_infrastructure.types';



const SuperadminThemeContext = createContext<SuperadminThemeContextValue>({ theme: 'light' });

function readTheme(): SuperadminTheme {
  if (typeof document === 'undefined') return 'light';
  const raw = document.documentElement.dataset.theme ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  return raw === 'dark' ? 'dark' : 'light';
}

/**
 * @description Reads the active application theme through one role-level provider contract for chart consumers.
 * @dependencies Observes the host document theme without creating a second theme system.
 * @edge-case Falls back to light mode until the host document is available and reacts to theme attribute/class changes.
 */
export function SuperadminPlatformShellLayoutThemeProvider({ children }: SuperadminPlatformShellLayoutThemeProviderProps) {
  const [theme, setTheme] = useState<SuperadminTheme>(() => readTheme());

  // EFFECT INTENT: Apply the resolved theme class to the document root and keep the DOM theme synchronized with persisted role/theme state.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const value = useMemo<SuperadminThemeContextValue>(() => ({ theme }), [theme]);
  return <SuperadminThemeContext.Provider value={value}>{children}</SuperadminThemeContext.Provider>;
}

/**
 * @description Returns the current role theme for semantic chart configuration.
 * @dependencies Reads SuperadminPlatformShellLayoutThemeProvider context and preserves a safe dark-mode default.
 * @edge-case Works even when consumed before a provider is mounted, using the context fallback.
 */
export function useSuperadminTheme(): SuperadminThemeContextValue {
  return useContext(SuperadminThemeContext);
}
