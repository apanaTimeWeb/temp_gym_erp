// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_LIBRARY_DIET_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/config/manager_library_diet_plans.url_config';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { beforeAll, afterAll, afterEach, describe, expect, it } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import ManagerLibraryDietPlansMain from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansMain';
import { resetManagerLibraryDietPlansMockState } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/handlers/ManagerLibraryDietPlansMockHandlers';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { managerMswServer.resetHandlers(); resetManagerLibraryDietPlansMockState(); });
afterAll(() => managerMswServer.close());

describe('Manager Library user-visible flows', () => {
  it('switches between Diet Plans and Exercises and renders API-backed records', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerLibraryDietPlansMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Diet Plans')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Exercises' }));
    expect(await screen.findByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Chest, Triceps, Shoulders')).toBeInTheDocument();
  });

  it('search changes the rendered exercise result set through the feature query path', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerLibraryDietPlansMain /></ManagerMocksTestProviders>);
    await user.click(screen.getByRole('tab', { name: 'Exercises' }));
    const search = screen.getByRole('textbox', { name: 'Search exercises' });
    await user.type(search, 'Squat');
    expect(await screen.findByText('Squat')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Bench Press')).not.toBeInTheDocument());
  });

  it('opens exercise creation and blocks invalid submission', async () => {
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerLibraryDietPlansMain /></ManagerMocksTestProviders>);
    await user.click(screen.getByRole('tab', { name: 'Exercises' }));
    await user.click(screen.getByRole('button', { name: 'Add Exercise' }));
    expect(screen.getByRole('dialog', { name: 'Add Exercise' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Add Exercise', exact: true }));
    expect(await screen.findByText('Exercise name is required')).toBeInTheDocument();
  });

  it('renders a real query error with a retry affordance', async () => {
    managerMswServer.use(http.get(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLANS_BASE), () => HttpResponse.json({ success: false, message: 'Library temporarily unavailable', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR })));
    render(<ManagerMocksTestProviders><ManagerLibraryDietPlansMain /></ManagerMocksTestProviders>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Library temporarily unavailable');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });
});
