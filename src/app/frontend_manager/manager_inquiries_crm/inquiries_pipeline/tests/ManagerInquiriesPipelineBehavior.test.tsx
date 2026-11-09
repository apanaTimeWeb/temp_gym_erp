// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_INQUIRIES_PIPELINE_API } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/config/manager_inquiries_pipeline.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerInquiriesPipelineApi } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/api/manager_inquiries_pipeline.api';
import ManagerInquiriesPipelineMain from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineMain';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Inquiries user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerInquiriesPipelineMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Inquiries')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerInquiriesPipelineApi.fetchInquiries({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.inquiries?.length ?? 0).toBeGreaterThan(0);
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_INQUIRIES_PIPELINE_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { inquiries : [], total: 0 } }))
    );
    render(<ManagerMocksTestProviders><ManagerInquiriesPipelineMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No inquiries yet. Add your first inquiry!')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_INQUIRIES_PIPELINE_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerInquiriesPipelineMain /></ManagerMocksTestProviders>);
    const errorText = await screen.findByText(/Failed to load/i);
    expect(errorText).toBeInTheDocument();
  });

  it('proves the real inquiry search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerInquiriesPipelineMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Rahul Sharma')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search name or phone...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Inquiry');
    expect(await screen.findByText(/No inquiries match the filter|No inquiries yet/i)).toBeInTheDocument();
  });

});
