import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/AdminSecurityAuditLogsExplorerPagination';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string, vars?: Record<string, unknown>) => `${key}${vars?.page ?? ''}` }));

describe('RBG125 audit pagination display', () => {
  it('clamps obsolete page before displaying summary and wiring next/previous', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={99} totalPages={3} totalItems={25} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(screen.getByTestId('admin_navigation-admin-pagination-control').textContent).toContain('21');
    expect(screen.getByTestId('admin_navigation-admin-pagination-control').textContent).toContain('25');
    fireEvent.click(screen.getByTestId('admin_navigation-admin-pagination-click'));
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(screen.getByTestId('admin_navigation-admin-pagination-click-3')).toBeDisabled();
  });
});
