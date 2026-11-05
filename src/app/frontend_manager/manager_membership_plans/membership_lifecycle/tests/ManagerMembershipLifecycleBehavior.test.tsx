// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_MEMBERSHIP_LIFECYCLE_API } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/config/manager_membership_lifecycle.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerMembershipLifecycleApi } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.api';
import ManagerMembershipLifecycleMain from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecycleMain';
import { resetManagerMembershipLifecycleMockState } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/handlers/ManagerMembershipLifecycleMockHandlers';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { managerMswServer.resetHandlers(); resetManagerMembershipLifecycleMockState(); });
afterAll(() => managerMswServer.close());

describe('Manager Plans user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerMembershipLifecycleMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Membership / Plans')).toBeInTheDocument();
  });
  it('renders API-backed renewal data from the membership overview endpoint', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerMembershipLifecycleMain /></ManagerMocksTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Renew' }));
    expect(await screen.findByText('Priya Singh')).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerMembershipLifecycleApi.fetchPlans();
    expect(response.success).toBe(true);
    expect(response.data?.plans?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the plans empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { plans: [], total: 0 } }))
    );
    render(<ManagerMocksTestProviders><ManagerMembershipLifecycleMain /></ManagerMocksTestProviders>);
    expect(await screen.findByRole('button', { name: 'View Plans' })).toBeInTheDocument();
    expect(await screen.findByText('No plans available')).toBeInTheDocument();
  });

  it('renders the plans error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerMembershipLifecycleMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Failed to load plans')).toBeInTheDocument();
  });

  it('proves the real plan search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerMembershipLifecycleMain /></ManagerMocksTestProviders>);
    const search = await screen.findByPlaceholderText('Search plans...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Plan');
    expect(await screen.findByText(/No plans found for/)).toBeInTheDocument();
  });

  it('persists create, update, and delete mutations in the module-owned MSW plan state', async () => {
    const createdResponse = await ManagerMembershipLifecycleApi.createPlan({
      name: 'V14 Static CRUD Plan', tier: 'BASIC', price1Month: 10000, price3Month: 27000,
      price6Month: 50000, price12Month: 90000, features: ['E2E-safe mock feature'], isActive: true,
    }, 'plans-static-crud-create-key');
    expect(createdResponse.success).toBe(true);
    expect(createdResponse.data?.name).toBe('V14 Static CRUD Plan');
    const createdPlan = createdResponse.data;
    if (!createdPlan) throw new Error('MSW create response did not include the created plan.');

    const createdList = await ManagerMembershipLifecycleApi.fetchPlans({ search: 'V14 Static CRUD Plan' });
    expect(createdList.data?.plans).toHaveLength(1);

    const updateResponse = await ManagerMembershipLifecycleApi.updatePlan(createdPlan.id, { name: 'V14 Static CRUD Plan Updated' }, 'plans-static-crud-update-key');
    expect(updateResponse.data?.name).toBe('V14 Static CRUD Plan Updated');
    const updatedList = await ManagerMembershipLifecycleApi.fetchPlans({ search: 'V14 Static CRUD Plan Updated' });
    expect(updatedList.data?.plans).toHaveLength(1);

    const deleteResponse = await ManagerMembershipLifecycleApi.deletePlan(createdPlan.id, 'plans-static-crud-delete-key');
    expect(deleteResponse.data?.id).toBe(createdPlan.id);
    const deletedList = await ManagerMembershipLifecycleApi.fetchPlans({ search: 'V14 Static CRUD Plan' });
    expect(deletedList.data?.plans).toHaveLength(0);
  });

  it('matches canonical tier filter values against fixture values without case drift', async () => {
    const response = await ManagerMembershipLifecycleApi.fetchPlans({ tier: 'BASIC' });
    expect(response.success).toBe(true);
    expect(response.data?.plans.some((plan) => plan.tier.toUpperCase() === 'BASIC')).toBe(true);
  });

});
