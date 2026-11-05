import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerCommunicationsHistoryEmptyState from '@/app/frontend_manager/manager_communications/communications_history/components/ManagerCommunicationsHistoryEmptyState';

describe('ManagerCommunicationsHistoryEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerCommunicationsHistoryEmptyState />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager-communications-history-empty-state');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_CAMPAIGNS_YETCOPY_SEND_FIRST_CAMPAIGN_USING_COMPOSE_TAB');
  });
});
