import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_members/members_directory/components/AdminMembersDirectoryPagination';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, params?: { page?: number }) => params?.page ? `Page ${params.page}` : key }));

describe('RBG137 rendered member pagination bounds', () => {
  it('bounds obsolete page and never calls navigation outside actual total', () => {
    const onPageChange = vi.fn();
    render(<AdminNavigationLayoutPagination currentPage={99} totalPages={2} totalItems={15} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(screen.getByText('15')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Page 2/ }).getAttribute('aria-current')).toBe('page');
    fireEvent.click(screen.getByRole('button', { name: /Page 1/ }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
  it('bounds invalid current pages to the first reachable page', () => {
    const { container } = render(<AdminNavigationLayoutPagination currentPage={-7} totalPages={3} onPageChange={() => {}} />);
    expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('1');
  });
});
