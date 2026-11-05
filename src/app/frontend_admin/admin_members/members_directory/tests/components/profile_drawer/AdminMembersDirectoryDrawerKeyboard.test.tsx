// RESPONSIBILITY: Regression coverage for accessible member profile drawer dismissal.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminMembersProfileDrawer from '@/app/frontend_admin/admin_members/members_directory/components/profile_drawer/AdminMembersDirectoryProfileDrawer';
vi.mock('next-intl', () => ({ useLocale: () => 'en', useTranslations: () => (key: string) => key }));
describe('Members directory profile drawer keyboard', () => {
  it('closes on Escape and restores the previously focused element', () => {
    const trigger = document.createElement('button'); document.body.append(trigger); trigger.focus();
    const onClose = vi.fn();
    const view = render(<AdminMembersProfileDrawer member={null} status="pending" error="" onRetry={vi.fn()} onClose={onClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    view.unmount(); expect(document.activeElement).toBe(trigger); trigger.remove();
  });
});
