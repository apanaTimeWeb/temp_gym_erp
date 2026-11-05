// RESPONSIBILITY: Server-owned Dashboard domain navigation shell.
// The dashboard currently has one cohesive autonomous overview capability.
// During the bounded RBG migration, preserve the original route and all URL-backed query state.
import type { ReactNode } from 'react';

/** Owns the Dashboard domain shell while autonomous source files migrate safely. */
export default function TrainerDashboardDomainLayout({ children }: { children: ReactNode }) {
  return children;
}
