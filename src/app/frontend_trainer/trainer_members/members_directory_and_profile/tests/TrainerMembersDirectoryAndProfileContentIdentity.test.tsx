import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TrainerMembersContent from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileContent';

const harness = vi.hoisted(() => ({
  route: { view: 'progress' as string, memberId: 'MEM-001' as string | null, isProfileView: true },
  query: {
    member: { id: 'MEM-001', name: 'Rahul Sharma', status: 'ACTIVE' } as { id: string; name: string; status: string } | null,
    memberId: 'MEM-001' as string | null,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  },
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore', () => ({
  useTrainerMembersStore: (selector: (state: { msgModal: null; closeMsg: () => void }) => unknown) => selector({ msgModal: null, closeMsg: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileViewState', () => ({
  useTrainerMembersViewState: () => ({ ...harness.route, openMember: vi.fn(), setProfileView: vi.fn(), backToList: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember', () => ({
  useTrainerMembersSelectedMember: () => ({ ...harness.query }),
}));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileKPIs', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileMessageModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileToolbar', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTable', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileView', () => ({
  default: ({ activeView }: { activeView: string }) => <div data-testid="members-profile-view" data-view={activeView} />,
}));

describe('TrainerMembersContent record identity', () => {
  beforeEach(() => {
    harness.route = { view: 'progress', memberId: 'MEM-001', isProfileView: true };
    harness.query.member = { id: 'MEM-001', name: 'Rahul Sharma', status: 'ACTIVE' };
    harness.query.memberId = 'MEM-001';
    harness.query.isPending = false;
    harness.query.isError = false;
  });

  it('renders the requested member profile view when fetched record identity matches the URL ID', () => {
    render(<TrainerMembersContent />);
    expect(screen.getByTestId('members-profile-view')).toHaveAttribute('data-view', 'progress');
  });

  it('does not render a different member record under the requested URL identity', () => {
    harness.query.member = { id: 'MEM-002', name: 'Priya Patel', status: 'ACTIVE' };
    render(<TrainerMembersContent />);
    expect(screen.queryByTestId('members-profile-view')).not.toBeInTheDocument();
    expect(screen.getByTestId('trainer_members-profile-not-found')).toBeInTheDocument();
  });

  it('shows a synchronization/loading state before the URL identity reaches the query store', () => {
    harness.query.memberId = null;
    harness.query.member = null;
    render(<TrainerMembersContent />);
    expect(screen.getByTestId('trainer_members-profile-loading')).toBeInTheDocument();
  });
});
