import { describe, expect, it } from 'vitest';

import { TrainerMembersBuildWhatsAppUrl } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileBuildWhatsAppUrl';

describe('TrainerMembersBuildWhatsAppUrl', () => {
  it('encodes the message while preserving the recipient number', () => {
    expect(TrainerMembersBuildWhatsAppUrl('919876543210', 'Hello trainer & member')).toBe(
      'https://wa.me/919876543210?text=Hello%20trainer%20%26%20member'
    );
  });
  it('normalizes formatted international numbers without altering message encoding', () => {
    expect(TrainerMembersBuildWhatsAppUrl('+91 98765-43210', 'Hi & welcome')).toBe('https://wa.me/919876543210?text=Hi%20%26%20welcome');
  });
  it('normalizes 10-digit Indian numbers with country code 91', () => {
    expect(TrainerMembersBuildWhatsAppUrl('9876543210', 'Hello member')).toBe(
      'https://wa.me/919876543210?text=Hello%20member'
    );
  });
  it('normalizes 11-digit numbers with leading 0 to 91 prefix', () => {
    expect(TrainerMembersBuildWhatsAppUrl('09876543210', 'Good morning')).toBe(
      'https://wa.me/919876543210?text=Good%20morning'
    );
  });
  it('preserves valid international numbers without forcing 91 prefix', () => {
    expect(TrainerMembersBuildWhatsAppUrl('14155552671', 'Session booked')).toBe(
      'https://wa.me/14155552671?text=Session%20booked'
    );
  });
  it('refuses empty or path-injection recipients', () => {
    expect(TrainerMembersBuildWhatsAppUrl('', 'Hi')).toBe('');
    expect(TrainerMembersBuildWhatsAppUrl('1', 'Hi')).toBe('');
    expect(TrainerMembersBuildWhatsAppUrl('../?to=bad', 'Hi')).toBe('');
  });
});
