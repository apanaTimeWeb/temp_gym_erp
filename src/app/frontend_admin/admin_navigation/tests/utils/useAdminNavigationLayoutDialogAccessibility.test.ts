"use client";
// RESPONSIBILITY: Defines regression tests for useAdminNavigationLayoutDialogAccessibility.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/useAdminNavigationLayoutDialogAccessibility.test.ts)

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useAdminNavigationLayoutDialogAccessibility } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutDialogAccessibility';

beforeEach(() => {
  window.requestAnimationFrame = ((callback: FrameRequestCallback) => { callback(0); return 1; }) as typeof window.requestAnimationFrame;
  window.cancelAnimationFrame = (() => {}) as typeof window.cancelAnimationFrame;
});

afterEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

describe('useAdminNavigationLayoutDialogAccessibility', () => {
  it('closes an open dialog on Escape and restores body scroll state', () => {
    const container = document.createElement('div');
    container.tabIndex = -1;
    document.body.appendChild(container);
    const onClose = vi.fn();
    const ref = { current: container };
    const { rerender } = renderHook(({ open }) => useAdminNavigationLayoutDialogAccessibility({ isOpen: open, containerRef: ref, onClose }), { initialProps: { open: true } });
    expect(document.body.style.overflow).toBe('hidden');
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
    expect(onClose).toHaveBeenCalledTimes(1);
    rerender({ open: false });
    expect(document.body.style.overflow).toBe('');
  });
});
