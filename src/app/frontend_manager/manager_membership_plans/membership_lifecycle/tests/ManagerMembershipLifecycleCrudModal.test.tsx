import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ManagerMembershipLifecycleCrudModal from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleCrudModal';

const mocks = vi.hoisted(() => ({ crudModalPlan: null as null | { id: string; name: string; tier: string; price1Month: number; price3Month: number; price6Month: number; price12Month: number; features: string[]; isActive: boolean }, closeCrudPlan: vi.fn(), close: vi.fn(), submit: vi.fn((event?: { preventDefault?: () => void }) => event?.preventDefault?.()) }));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap', () => ({ useManagerInfrastructureDialogFocusTrap: vi.fn() }));
vi.mock('@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic', () => ({
  useManagerMembershipLifecycleLogic: () => ({ crudModalOpen: true, crudModalPlan: mocks.crudModalPlan, closeCrudPlan: mocks.closeCrudPlan }),
}));
vi.mock('@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleCrudForm', () => ({
  useManagerMembershipLifecycleCrudForm: () => ({
    form: { register: (name: string) => ({ name }), formState: { errors: {}, isSubmitting: false } },
    submit: mocks.submit, saving: false, close: mocks.close,
  }),
}));

describe('ManagerMembershipLifecycleCrudModal', () => {
  beforeEach(() => { mocks.crudModalPlan = null; mocks.close.mockReset(); mocks.submit.mockClear(); });

  it('renders the localized create form and required field groups', () => {
    render(<ManagerMembershipLifecycleCrudModal />);
    expect(screen.getByRole('dialog', { name: 'CRUD_ADD_PLAN_TITLE' })).toBeTruthy();
    expect(screen.getByTestId('manager_plans-managerplanscrudmodal-input-name')).toBeTruthy();
    expect(screen.getByTestId('manager_plans-managerplanscrudmodal-select-tier')).toBeTruthy();
    expect(screen.getByTestId('manager_plans-managerplanscrudmodal-input-price1Month')).toBeTruthy();
    expect(screen.getByTestId('manager_plans-managerplanscrudmodal-textarea-features')).toBeTruthy();
  });

  it('uses the single guarded close handler for header close and cancel', () => {
    render(<ManagerMembershipLifecycleCrudModal />);
    fireEvent.click(screen.getByTestId('manager_plans-managerplanscrudmodal-button-close'));
    fireEvent.click(screen.getByTestId('manager_plans-managerplanscrudmodal-button-cancel'));
    expect(mocks.close).toHaveBeenCalledTimes(2);
  });
  it('keeps a backend tier that is not in the current filter-option set when editing', () => {
    mocks.crudModalPlan = { id: 'plan-legacy', name: 'Existing Plan', tier: 'Pro', price1Month: 10000, price3Month: 27000, price6Month: 50000, price12Month: 90000, features: [], isActive: true };
    render(<ManagerMembershipLifecycleCrudModal />);
    const tier = screen.getByTestId('manager_plans-managerplanscrudmodal-select-tier') as HTMLSelectElement;
    expect(Array.from(tier.options).some((option) => option.value === 'Pro')).toBe(true);
    expect(tier.value).toBe('Pro');
  });

});
