// Regression: a second destructive confirmation must not inherit the first request's typed authorization.
import React, { useContext } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminNavigationLayoutConfirmProvider, ConfirmContext } from '../../components/feedback/AdminBillingPlansCatalogConfirmProvider';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
let ask!: NonNullable<React.ContextType<typeof ConfirmContext>>['confirm'];
function Caller() { ask = useContext(ConfirmContext)!.confirm; return <button>Launch</button>; }
describe('plans confirmation queue', () => {
  it('requires newly typed text for each FIFO request and rejects blank direct phrases', async () => {
    render(<AdminNavigationLayoutConfirmProvider><Caller /></AdminNavigationLayoutConfirmProvider>);
    let first!: Promise<boolean>;
    let second!: Promise<boolean>;
    act(() => {
      first = ask({ title: 'Remove Alpha', message: 'One', requireTyping: true, confirmationPhrase: 'DELETE' });
      second = ask({ title: 'Remove Beta', message: 'Two', requireTyping: true, confirmationPhrase: 'DELETE' });
    });
    expect(screen.getByRole('button', { name: /defaultConfirm/ }).hasAttribute('disabled')).toBe(true);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'DELETE' } });
    fireEvent.click(screen.getByRole('button', { name: /defaultConfirm/ }));
    await expect(first).resolves.toBe(true);
    await waitFor(() => expect(screen.getByText('Remove Beta')).toBeTruthy());
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    expect(screen.getByRole('button', { name: /defaultConfirm/ }).hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /defaultCancel/ }));
    await expect(second).resolves.toBe(false);
    let blank!: Promise<boolean>;
    act(() => {
      blank = ask({ title: 'Blank', message: 'Three', requireTyping: true, confirmationPhrase: '   ' });
    });
    await waitFor(() => expect(screen.getByText('Blank')).toBeTruthy());
    expect(screen.getByRole('button', { name: /defaultConfirm/ }).hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /defaultCancel/ }));
    await expect(blank).resolves.toBe(false);
  });
});
