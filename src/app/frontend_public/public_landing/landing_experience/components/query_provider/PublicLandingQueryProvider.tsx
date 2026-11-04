'use client';
// RESPONSIBILITY: Provides an isolated TanStack Query client for PublicLanding module mutations and future server-state flows.
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PublicLandingQueryProviderProps } from '@/app/frontend_public/public_landing/landing_experience/types/PublicLandingExperienceTypes';

/**
 * Owns the module-scoped TanStack Query client used by PublicLanding mutations.
 * @dependencies TanStack Query and PublicLanding query-provider props.
 * @edge-case The client is instantiated once per mounted PublicLanding module to avoid cross-module cache leakage.
 */
/**
 * PublicLandingQueryProvider owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingQueryProvider({ children }: PublicLandingQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
