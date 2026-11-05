"use client";
// RESPONSIBILITY: Observes host .dark class without owning global theme or persisting business data.
// DATA FLOW: document root/body theme classes → ApexCharts tooltip theme choice.

import { useSyncExternalStore } from 'react';

type AdminAttendanceChartMode = 'dark' | 'light';

function currentChartMode(): AdminAttendanceChartMode {
  return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')
    ? 'dark'
    : 'light';
}

function subscribeChartMode(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

/** Reflect the active design-system light/dark class, including theme toggles. */
export function useAdminAttendanceDashboardChartMode(): AdminAttendanceChartMode {
  return useSyncExternalStore(subscribeChartMode, currentChartMode, () => 'dark');
}
