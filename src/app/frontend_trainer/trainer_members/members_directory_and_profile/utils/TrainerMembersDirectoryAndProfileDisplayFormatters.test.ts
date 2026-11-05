import { describe, expect, it } from 'vitest';

import {
  TrainerMembersFormatDate,
  TrainerMembersFormatNumber,
  TrainerMembersMaskSensitiveData,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';




describe('Trainer members display formatters', () => {
  it('formats numbers and masks contact values', () => {
    expect(TrainerMembersFormatNumber(1234567, 'en-IN')).toBe('12,34,567');
    expect(TrainerMembersFormatNumber(22.5, 'en-IN')).toBe('22.5');
    expect(TrainerMembersMaskSensitiveData('9876543210')).toBe('98****3210');
  });
  it('renders invalid dates safely', () => {
    expect(TrainerMembersFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
});
