import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerAssignedWorkoutPlansEmptyState from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/components/ManagerAssignedWorkoutPlansEmptyState';

describe('ManagerAssignedWorkoutPlansEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerAssignedWorkoutPlansEmptyState />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager-assigned-workout-plans-empty-state');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_ASSIGNED_PLANS');
  });
});
