// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutDialogAccessibilityProvider.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/feedback/AdminNavigationLayoutDialogAccessibilityProvider.test.tsx)

import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutDialogAccessibilityProvider from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutDialogAccessibilityProvider';

function NestedDialogFixture() {
  const [nestedOpen, setNestedOpen] = useState(false);
  return <>
    <AdminNavigationLayoutDialogAccessibilityProvider />
    <section data-admin-dialog="true" role="dialog" aria-label="Parent dialog" tabIndex={-1}>
      <button type="button" onClick={() => setNestedOpen(true)}>Open nested</button>
      {nestedOpen && <section data-admin-dialog="true" role="dialog" aria-label="Nested dialog" tabIndex={-1}>
        <button type="button" data-admin-dialog-cancel="true" onClick={() => setNestedOpen(false)}>Close nested</button>
      </section>}
    </section>
  </>;
}

beforeEach(() => {
  window.requestAnimationFrame = ((callback: FrameRequestCallback) => { callback(0); return 1; }) as typeof window.requestAnimationFrame;
  window.cancelAnimationFrame = (() => undefined) as typeof window.cancelAnimationFrame;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('AdminNavigationLayoutDialogAccessibilityProvider focus stack', () => {
  it('moves focus into a nested dialog and restores the parent trigger after it closes', async () => {
    render(<NestedDialogFixture />);
    const trigger = screen.getByRole('button', { name: 'Open nested' });
    trigger.focus();
    fireEvent.click(trigger);
    const nestedClose = await screen.findByRole('button', { name: 'Close nested' });
    await waitFor(() => expect(nestedClose).toHaveFocus());
    fireEvent.click(nestedClose);
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes the topmost dialog through the cancel marker on Escape', async () => {
    render(<NestedDialogFixture />);
    fireEvent.click(screen.getByRole('button', { name: 'Open nested' }));
    await screen.findByRole('button', { name: 'Close nested' });
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Nested dialog' })).toBeNull());
    expect(screen.getByRole('dialog', { name: 'Parent dialog' })).toBeTruthy();
  });

  it('keeps Tab navigation inside the topmost dialog', async () => {
    render(<NestedDialogFixture />);
    const parentTrigger = screen.getByRole('button', { name: 'Open nested' });
    fireEvent.click(parentTrigger);
    const closeButton = await screen.findByRole('button', { name: 'Close nested' });
    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    await waitFor(() => expect(closeButton).toHaveFocus());
  });
});
