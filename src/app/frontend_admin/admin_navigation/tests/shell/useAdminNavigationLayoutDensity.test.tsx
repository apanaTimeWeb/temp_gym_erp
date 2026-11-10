// RESPONSIBILITY: Defines regression tests for useAdminNavigationLayoutDensity.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/shell/useAdminNavigationLayoutDensity.test.tsx)

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminNavigationLayoutDensityContext } from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutDensityContext';
import { useAdminNavigationLayoutDensity } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutDensity';

const value = {
  density: 'comfortable' as const,
  setDensity: () => undefined,
  toggleDensity: () => undefined,
};

describe('useAdminNavigationLayoutDensity', () => {
  it('returns the density context value for shell consumers', () => {
    const { result } = renderHook(() => useAdminNavigationLayoutDensity(), {
      wrapper: ({ children }) => (
        <AdminNavigationLayoutDensityContext.Provider value={value}>
          {children}
        </AdminNavigationLayoutDensityContext.Provider>
      ),
    });

    expect(result.current).toBe(value);
  });

  it('throws when rendered outside the provider', () => {
    expect(() => renderHook(() => useAdminNavigationLayoutDensity())).toThrow('useAdminNavigationLayoutDensity must be used inside AdminNavigationLayoutDensityProvider');
  });
});
