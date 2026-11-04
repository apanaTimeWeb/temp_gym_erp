import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';
import Dialog from '@/app/frontend_public/public_landing/landing_experience/components/confirm_dialog/PublicLandingExperienceUnsavedChangesDialog';
describe('PublicLandingUnsavedChangesDialog', () => {
  it('provides an accessible alertdialog and separate stay/leave actions', () => {
    const stay = vi.fn(); const leave = vi.fn();
    render(<NextIntlClientProvider locale="en" messages={enMessages}><Dialog open onStay={stay} onLeave={leave} /></NextIntlClientProvider>);
    expect(screen.getByRole('alertdialog', { name: 'Leave this page?' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Stay on page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Leave page' }));
    expect(stay).toHaveBeenCalledOnce(); expect(leave).toHaveBeenCalledOnce();
  });
});
