'use client';
import { useEffect, useState } from 'react';

export type FeatureTheme = 'dark' | 'light';
/** Observes the canonical host document theme without coupling this leaf to another feature context. */
export function useSuperadminAnalyticsReportsCancellationsTheme(): { theme: FeatureTheme } {
  const readTheme = (): FeatureTheme => (() => { if (typeof document === 'undefined') { return ('light'); } if (document.documentElement.dataset.theme === 'dark' || document.documentElement.classList.contains('dark')) { return ('dark'); } return ('light'); })();
  const [theme, setTheme] = useState<FeatureTheme>(() => readTheme());
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);
  return { theme };
}
