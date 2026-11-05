import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminAuditComplianceMain from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/components/compliance_dashboard_main/SuperadminAuditComplianceDashboardMain';
import { useSuperadminAuditComplianceDashboardPage } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/hooks/useSuperadminAuditComplianceDashboardPage';
import { SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/mocks/fixtures/SuperadminAuditComplianceDashboardMockFixtures';


vi.mock('@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/hooks/useSuperadminAuditComplianceDashboardPage', () => ({ useSuperadminAuditComplianceDashboardPage: vi.fn() }));
const mockedUsePage = vi.mocked(useSuperadminAuditComplianceDashboardPage);
describe('Superadmin Tax & Compliance', () => {
    beforeEach(() => {
        mockedUsePage.mockReset();
    });
    it('renders loading and real fixture-backed success states', () => {
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: true,
            isError: false,
            refetch: vi.fn(),
        });
        const { unmount } = render(<SuperadminAuditComplianceMain />);
        expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
        unmount();
        mockedUsePage.mockReturnValue({
            data: SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE,
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminAuditComplianceMain />);
        expect(screen.getByText('Tax & Compliance')).toBeInTheDocument();
        expect(screen.getAllByText('FitLife Andheri')[0]).toBeInTheDocument();
        expect(screen.getAllByText('—')[0]).toBeInTheDocument();
    });
    it('surfaces a retryable error state', () => {
        const refetch = vi.fn();
        mockedUsePage.mockReturnValue({
            data: null,
            isPending: false,
            isError: true,
            refetch,
        });
        render(<SuperadminAuditComplianceMain />);
        expect(screen.getByRole('alert')).toHaveTextContent('Compliance data could not be loaded.');
        fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(refetch).toHaveBeenCalledTimes(1);
    });
    it('renders dedicated empty states when regional and document lists are empty', () => {
        mockedUsePage.mockReturnValue({
            data: { ...SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE, regions: [], documents: [] },
            isPending: false,
            isError: false,
            refetch: vi.fn(),
        });
        render(<SuperadminAuditComplianceMain />);
        expect(screen.getByText('Regional coverage')).toBeInTheDocument();
        expect(screen.getByText('Compliance documents')).toBeInTheDocument();
    });
});
