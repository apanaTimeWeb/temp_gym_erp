// RESPONSIBILITY: Defines regression tests for AdminDataExportRequestsMain.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_data_export/data_export_requests/tests/AdminDataExportRequestsMain.test.tsx)

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminDataExportMain from '@/app/frontend_admin/admin_data_export/data_export_requests/components/main_view/AdminDataExportRequestsMain';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => ({ text_title: 'Data Export', text_description: 'Export requests are currently unavailable.', text_blocked: 'Export is blocked', text_scope_gap: 'An authoritative export API contract is required.', text_no_invented: 'No request has been sent', text_no_fabrication: 'No endpoint or completion state is fabricated.' }[key] ?? key) }));

describe('AdminDataExportMain', () => {
  it('shows an explicit scope-blocked state and does not invent an export action', () => {
    render(<AdminDataExportMain />);
    expect(screen.getByRole('heading', { name: 'Data Export' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Export is blocked' })).toBeTruthy();
    expect(screen.getByText('An authoritative export API contract is required.')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /export|download|request/i })).toBeNull();
  });
});
