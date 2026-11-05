import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerGrievanceResolutionEmptyState from '@/app/frontend_manager/manager_grievances/grievance_resolution/components/ManagerGrievanceResolutionEmptyState';

describe('ManagerGrievanceResolutionEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerGrievanceResolutionEmptyState />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager_grievance-manager-grievance-content-status-empty');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_COMPLAINTS_FOUNDCOPY_TRY_CLEARING_SEARCH_LOG_NEW_COMPLAINT');
  });
});
