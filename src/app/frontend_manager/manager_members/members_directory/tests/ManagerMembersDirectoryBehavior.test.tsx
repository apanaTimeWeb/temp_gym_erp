// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { ManagerMocksTestProviders } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksTestProviders';
import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';



import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';
import ManagerMembersDirectoryMain from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryMain';
import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MOCK_MEMBERS } from '@/app/frontend_manager/manager_members/members_directory/mocks/fixtures/ManagerMembersDirectoryMockData';
import { memberSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_entity.schemas';
import { MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS, resolveManagerMembersDirectoryMockScenario } from '@/app/frontend_manager/manager_members/members_directory/mocks/scenarios/ManagerMembersDirectoryMockScenarios';
import { managerMembersMockState, resetManagerMembersDirectoryMockState } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockState';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  managerMswServer.resetHandlers();
  resetManagerMembersDirectoryMockState();
});
afterAll(() => managerMswServer.close());

describe('Manager Members user-visible behavior', () => {
  it('resolves every declared mock scenario into an executable outcome', () => {
    for (const name of Object.keys(MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS) as Array<keyof typeof MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS>) {
      expect(resolveManagerMembersDirectoryMockScenario(name)).toHaveProperty('kind', MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS[name].kind);
    }
  });

  it('keeps the canonical member fixture aligned with the runtime API entity schema', () => {
    const fixture = MOCK_MEMBERS.find((member) => member.id === 'm1');
    if (!fixture) throw new Error('Canonical member fixture m1 is missing');
    const parsed = memberSchema.parse(fixture);
    expect(parsed.id).toBe('m1');
    expect(parsed.name).toBe('Aarav Patel');
    expect(parsed.plan?.price12Month).toBe(1500000);
  });

  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerMocksTestProviders><ManagerMembersDirectoryMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Member Management')).toBeInTheDocument();
  });
  it('renders an actual API member row, not a generic API result harness', async () => {
    render(<ManagerMocksTestProviders><ManagerMembersDirectoryMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Aarav Patel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by name or phone...')).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerMembersDirectoryApi.fetchMembers({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.members?.length ?? 0).toBeGreaterThan(0);
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { members : [], total: 0 } }))
    );
    render(<ManagerMocksTestProviders><ManagerMembersDirectoryMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('No members yet')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerMocksTestProviders><ManagerMembersDirectoryMain /></ManagerMocksTestProviders>);
    const errorText = await screen.findByText(/Unable to load members\./i);
    expect(errorText).toBeInTheDocument();
  });

  it('proves the real search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerMocksTestProviders><ManagerMembersDirectoryMain /></ManagerMocksTestProviders>);
    expect(await screen.findByText('Aarav Patel')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search by name or phone...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No members yet')).toBeInTheDocument();
    expect(screen.queryByText('Aarav Patel')).not.toBeInTheDocument();
  });


  it('keeps member KPIs synchronized through create, update, delete, and an empty-state create', async () => {
    const canonicalMember = MOCK_MEMBERS[0];
    expect(canonicalMember).toBeDefined();
    if (!canonicalMember) return;

    // Simulate an empty collection after ordinary mutable demo interactions.
    managerMembersMockState.members = [];
    const emptyStats = await ManagerMembersDirectoryApi.fetchMemberStats();
    expect(emptyStats.data).toEqual({ total: 0, active: 0, pending: 0, expired: 0 });

    const created = await ManagerMembersDirectoryApi.createMember(
      { ...canonicalMember, name: 'Created from empty collection' },
      'v17-create-from-empty',
    );
    expect(created.success).toBe(true);
    expect(created.data?.id).toBe('mem-1000');

    const createdStats = await ManagerMembersDirectoryApi.fetchMemberStats();
    expect(createdStats.data).toEqual({ total: 1, active: 1, pending: 0, expired: 0 });

    await ManagerMembersDirectoryApi.updateMember(
      'mem-1000',
      { status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PENDING },
      'v17-update-created-status',
    );
    const updatedStats = await ManagerMembersDirectoryApi.fetchMemberStats();
    expect(updatedStats.data).toEqual({ total: 1, active: 0, pending: 1, expired: 0 });

    const deleted = await ManagerMembersDirectoryApi.deleteMember('mem-1000', 'v17-delete-created-member');
    expect(deleted.data?.id).toBe('mem-1000');
    const deletedStats = await ManagerMembersDirectoryApi.fetchMemberStats();
    expect(deletedStats.data).toEqual({ total: 0, active: 0, pending: 0, expired: 0 });
  });

});
