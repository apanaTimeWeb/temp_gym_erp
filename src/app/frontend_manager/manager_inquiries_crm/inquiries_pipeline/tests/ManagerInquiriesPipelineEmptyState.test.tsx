import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerInquiriesPipelineEmptyState from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineEmptyState';

describe('ManagerInquiriesPipelineEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerInquiriesPipelineEmptyState hasFilters={false} />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager_inquiries-pipeline-empty-state');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_INQUIRIES_YET_ADD_FIRST_INQUIRY');
  });
});
