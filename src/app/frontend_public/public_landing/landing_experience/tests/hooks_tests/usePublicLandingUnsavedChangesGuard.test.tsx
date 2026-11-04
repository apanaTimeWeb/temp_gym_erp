import { renderHook, act } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';
import { usePublicLandingUnsavedChangesGuard } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingExperienceUnsavedChangesGuard';
const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));
const wrapper = ({ children }: { children: ReactNode }) => <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>;
function clickHref(href: string) {
  const link = document.createElement('a'); link.href = href; document.body.appendChild(link);
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
  act(() => { link.dispatchEvent(event); }); link.remove(); return event;
}
describe('usePublicLandingUnsavedChangesGuard', () => {
  beforeEach(() => pushMock.mockReset());
  it('blocks internal navigation pending an accessible confirmation and cancels safely', () => {
    const { result } = renderHook(() => usePublicLandingUnsavedChangesGuard(true), { wrapper });
    const event = clickHref('/other?x=1#top');
    expect(event.defaultPrevented).toBe(true);
    expect(result.current.isConfirmOpen).toBe(true);
    expect(pushMock).not.toHaveBeenCalled();
    act(() => result.current.stay());
    expect(result.current.isConfirmOpen).toBe(false);
  });
  it('preserves the full pathname, query, and hash when the user chooses to leave', () => {
    const { result } = renderHook(() => usePublicLandingUnsavedChangesGuard(true), { wrapper });
    clickHref('/membership/details?plan=gold#benefits');
    act(() => result.current.leave());
    expect(pushMock).toHaveBeenCalledWith('/membership/details?plan=gold#benefits');
  });
  it('allows cross-origin links to proceed', () => {
    const { result } = renderHook(() => usePublicLandingUnsavedChangesGuard(true), { wrapper });
    const event = clickHref('https://example.org/outside');
    expect(event.defaultPrevented).toBe(false);
    expect(result.current.isConfirmOpen).toBe(false);
  });
});
