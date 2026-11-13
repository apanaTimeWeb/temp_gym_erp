// RESPONSIBILITY: Defines regression tests for AdminDataExportRequestsMain.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_data_export/data_export_requests/tests/AdminDataExportRequestsMain.test.tsx)

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminDataExportMain from '@/app/frontend_admin/admin_data_export/data_export_requests/components/main_view/AdminDataExportRequestsMain';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    text_title: 'Data Export',
    text_description: 'Export system datasets.'
  }[key] ?? key),
}));

describe('AdminDataExportMain', () => {
  it('renders New Export form and dataset options', () => {
    render(<AdminDataExportMain />);
    expect(screen.getByRole('heading', { name: 'Data Export' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'New Export' })).toBeTruthy();
    expect(screen.getByText('Select data type, format, gyms, and date range')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Generate & Download CSV' })).toBeTruthy();
  });
});
