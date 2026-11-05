import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerCommunicationsAutomationsEmptyState from '@/app/frontend_manager/manager_communications/communications_automations/components/ManagerCommunicationsAutomationsEmptyState';

describe('ManagerCommunicationsAutomationsEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerCommunicationsAutomationsEmptyState />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager-communications-automations-empty-state');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_AUTOMATIONS_CONFIGURED');
  });
});
