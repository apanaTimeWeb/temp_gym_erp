import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminNavigationLayoutPagination from '../../components/AdminAttendanceDashboardPagination';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, params?: { page?: number }) => params?.page ? `Page ${params.page}` : key }));

describe('RBG139 attendance page bounds', () => {
  it('bounds an obsolete page and only emits valid navigation', () => {
    const onPageChange = vi.fn();
    const { container } = render(<AdminNavigationLayoutPagination currentPage={99} totalPages={2} totalItems={15} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('2');
    fireEvent.click(screen.getByRole('button', { name: 'Page 1' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
  it('bounds non-finite pages and disabled arrow actions', () => {
    const { container } = render(<AdminNavigationLayoutPagination currentPage={Number.NaN} totalPages={Number.POSITIVE_INFINITY} onPageChange={() => {}} />);
    expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('1');
  });
});
