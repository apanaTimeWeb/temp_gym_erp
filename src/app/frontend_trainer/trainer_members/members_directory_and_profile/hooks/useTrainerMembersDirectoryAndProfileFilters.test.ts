import { describe, expect, it, vi } from 'vitest';

import { TRAINER_MEMBERS_MEMBER_STATUS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';
import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';




const push = vi.fn();
/**
 * @description Manages Router state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useRouter = vi.fn(() => ({ push }));
/**
 * @description Manages Pathname state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const usePathname = vi.fn(() => TRAINER_MEMBERS_URLS.ROUTES.LIST);
/**
 * @description Manages SearchParams state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useSearchParams = vi.fn();
/**
 * @description Manages Debounce state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useDebounce = vi.fn((value: string) => value);

vi.mock('next/navigation', () => ({ useRouter, usePathname, useSearchParams }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureDebounce', () => ({ useTrainerInfrastructureDebounce: useDebounce }));

describe('useTrainerMembersFilters', () => {
  it('syncs filter changes into URL state and resets pagination', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('page=4&sortBy=name&sortDirection=desc'));
    const { renderHook, act } = await import('@testing-library/react');
    const { useTrainerMembersFilters } = await import('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters');
    const { result } = renderHook(() => useTrainerMembersFilters());
    act(() => result.current.setStatusFilter(TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE));
    expect(push).toHaveBeenCalledWith(expect.stringContaining(`${TRAINER_MEMBERS_URLS.ROUTES.LIST}?`));
    expect(push.mock.calls.at(-1)![0]).toContain(`status=${TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE}`);
    expect(push.mock.calls.at(-1)![0]).toContain('page=1');
  });

  it('toggles sort direction for the same field', async () => {
    useSearchParams.mockReturnValue(new URLSearchParams('sortBy=name&sortDirection=asc'));
    const { renderHook, act } = await import('@testing-library/react');
    const { useTrainerMembersFilters } = await import('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters');
    const { result } = renderHook(() => useTrainerMembersFilters());
    act(() => result.current.setSort('name'));
    expect(push.mock.calls.at(-1)![0]).toContain('sortDirection=desc');
  });
});
