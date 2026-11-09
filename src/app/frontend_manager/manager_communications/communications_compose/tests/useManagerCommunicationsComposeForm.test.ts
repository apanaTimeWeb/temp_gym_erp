import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/communications_compose/hooks/useManagerCommunicationsComposeForm';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useManagerCommunicationsCampaignsForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerCommunicationsCampaignsForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerCommunicationsCampaignsForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook(), { wrapper: createWrapper() });
    expect(result.current).toBeDefined();
  });
});
