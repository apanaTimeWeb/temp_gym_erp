import { describe, expect, it } from 'vitest';

import {
  buildTrainerProfileViewHref,
  canonicalizeTrainerProfileViewParams,
  resolveTrainerProfileScreenView,
} from '@/app/frontend_trainer/trainer_account/account_personal_profile/utils/TrainerAccountPersonalProfileProfileViewUrlUtils';

describe('TrainerProfileViewUrlUtils', () => {
  it('defaults to personal when no screen view is provided', () => {
    expect(resolveTrainerProfileScreenView(new URLSearchParams('mode=compact'))).toBe('personal');
  });

  it('resolves canonical screen views and gives view precedence over obsolete tab', () => {
    expect(resolveTrainerProfileScreenView(new URLSearchParams('view=security'))).toBe('security');
    expect(resolveTrainerProfileScreenView(new URLSearchParams('view=personal&tab=obsolete'))).toBe('personal');
  });

  it('normalizes obsolete tab state and preserves unrelated query parameters', () => {
    const normalized = canonicalizeTrainerProfileViewParams(new URLSearchParams('view=security&tab=obsolete&mode=compact&returnTo=profile'));
    expect(normalized).toBe('mode=compact&returnTo=profile&view=security');
  });

  it('removes invalid view state without discarding unrelated query parameters', () => {
    const normalized = canonicalizeTrainerProfileViewParams(new URLSearchParams('view=unknown&mode=compact'));
    expect(normalized).toBe('mode=compact');
  });

  it('builds replacement hrefs with selected view and preserves unrelated query parameters', () => {
    expect(buildTrainerProfileViewHref('/frontend_trainer/trainer_account/account_personal_profile', new URLSearchParams('mode=compact&view=personal&tab=obsolete'), 'security'))
      .toBe('/frontend_trainer/trainer_account/account_personal_profile?mode=compact&view=security');
  });
});
