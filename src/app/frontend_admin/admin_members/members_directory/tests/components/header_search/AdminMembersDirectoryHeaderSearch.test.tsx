// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryHeaderSearch.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/components/header_search/AdminMembersDirectoryHeaderSearch.test.tsx)

import { fireEvent, render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminMembersDirectoryHeaderSearch as AdminMembersHeaderSearch } from '@/app/frontend_admin/admin_members/members_directory/components/header_search/AdminMembersDirectoryHeaderSearch';

const { mockPush, mockResults } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockResults: [{ id: 'member-1', name: 'Ari Member', branchName: 'Central Branch' }],
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));
vi.mock('@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryHeaderSearch', () => ({
  useAdminMembersHeaderSearch: () => ({ data: mockResults }),
}));

describe('AdminMembersHeaderSearch accessible autocomplete', () => {
  beforeEach(() => mockPush.mockClear());

  it('exposes the active suggestion relationship and selects with the keyboard', () => {
    render(<AdminMembersHeaderSearch />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Ari' } });

    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', 'admin-members-global-search-results');
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant', 'admin-members-global-search-option-0');
    expect(screen.getByRole('option', { name: /Ari Member/ })).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockPush).toHaveBeenCalledWith('/frontend_admin/admin_members/members_directory?memberId=member-1');
    expect(input).toHaveValue('');
  });

  it('closes the suggestion surface on Escape', () => {
    render(<AdminMembersHeaderSearch />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Ari' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });
});
