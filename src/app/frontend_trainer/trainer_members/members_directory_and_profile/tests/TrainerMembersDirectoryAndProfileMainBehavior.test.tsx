import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerMembersMain from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileMain';




vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore', () => ({ useTrainerMembersStore: (selector: (state: { msgModal: null; closeMsg: () => void; selectedMemberId: null; profileTab: 'overview'; setSelectedMember: () => void; setProfileTab: () => void }) => unknown) => selector({ msgModal: null, closeMsg: vi.fn(), selectedMemberId: null, profileTab: 'overview', setSelectedMember: vi.fn(), setProfileTab: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember', () => ({ useTrainerMembersSelectedMember: () => ({ member: null, memberId: null, isPending: false, isError: false, refetch: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileViewState', () => ({ useTrainerMembersViewState: () => ({ view: 'list', memberId: null, isProfileView: false, openMember: vi.fn(), setProfileView: vi.fn(), backToList: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileMessageModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileKPIs', () => ({ default: () => <div data-testid="trainer_members-main-behavior-test-member-kpis" /> }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileToolbar', () => ({ default: () => <input aria-label="Search members" data-testid="trainer_members-trainermemberstoolbar-input-1" /> }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTable', () => ({ default: () => <div data-testid="trainer_members-main-behavior-test-member-table">Rahul Sharma</div> }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileView', () => ({ default: () => null }));
describe('TrainerMembersMain behavior', () => {
  it('renders the member search surface and server-backed table region', () => {
    render(<TrainerMembersMain />);
    expect(screen.getByRole('textbox', { name: 'Search members' })).toBeInTheDocument();
    expect(screen.getByTestId('trainer_members-main-behavior-test-member-table')).toHaveTextContent('Rahul Sharma');
  });
});
