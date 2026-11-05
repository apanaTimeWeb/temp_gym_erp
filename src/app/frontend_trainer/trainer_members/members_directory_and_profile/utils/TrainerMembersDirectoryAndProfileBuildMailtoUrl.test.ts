import { describe, expect, it } from 'vitest';

import { TrainerMembersBuildMailtoUrl } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileBuildMailtoUrl';

describe('TrainerMembersBuildMailtoUrl', () => {
  it('encodes subject and body for mailto delivery', () => {
    expect(TrainerMembersBuildMailtoUrl('member@example.com', 'GymSmart & You', 'Line one & line two')).toBe(
      'mailto:member@example.com?subject=GymSmart%20%26%20You&body=Line%20one%20%26%20line%20two'
    );
  });
  it('refuses missing and header-injection recipients', () => {
    expect(TrainerMembersBuildMailtoUrl('', 'Hello', 'Hi')).toBe('');
    expect(TrainerMembersBuildMailtoUrl('member@example.com?bcc=other@example.com', 'Hello', 'Hi')).toBe('');
    expect(TrainerMembersBuildMailtoUrl('first@example.com,second@example.com', 'Hello', 'Hi')).toBe('');
  });
});
