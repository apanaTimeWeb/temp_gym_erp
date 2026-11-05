import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useManagerInfrastructureMounted } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureMounted';

describe('useManagerInfrastructureMounted', () => {
  it('becomes true after mount', () => {
    const { result } = renderHook(() => useManagerInfrastructureMounted());
    expect(result.current).toBe(true);
  });
});
