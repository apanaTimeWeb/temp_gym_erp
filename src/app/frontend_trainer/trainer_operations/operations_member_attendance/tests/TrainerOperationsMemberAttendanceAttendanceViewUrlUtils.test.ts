import { describe, expect, it } from 'vitest';

import { canonicalizeTrainerAttendanceViewParams, resolveTrainerAttendanceScreenView } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceViewUrlUtils';

describe('TrainerAttendanceViewUrlUtils', () => {
  it('defaults to members when the URL has no screen-view state', () => {
    expect(resolveTrainerAttendanceScreenView(new URLSearchParams('search=Riya&page=2'))).toBe('members');
  });

  it('uses a valid canonical view as the source of truth', () => {
    expect(resolveTrainerAttendanceScreenView(new URLSearchParams('view=my-attendance&tab=obsolete'))).toBe('my-attendance');
  });

  it.each([['MEMBERS', 'members'], ['MY_ATTENDANCE', 'my-attendance']])('normalizes obsolete tab %s to view=%s and retains other query parameters', (tab, view) => {
    const params = new URLSearchParams(`tab=${tab}&search=Riya&page=2&sortBy=date&sortDirection=asc&date=TODAY`);
    const normalized = canonicalizeTrainerAttendanceViewParams(params);
    expect(normalized).not.toBeNull();
    const result = new URLSearchParams(normalized ?? '');
    expect(result.get('view')).toBe(view);
    expect(result.has('tab')).toBe(false);
    expect(result.get('search')).toBe('Riya');
    expect(result.get('page')).toBe('2');
    expect(result.get('sortBy')).toBe('date');
    expect(result.get('sortDirection')).toBe('asc');
    expect(result.get('date')).toBe('TODAY');
  });

  it('removes an invalid view without dropping unrelated parameters', () => {
    const normalized = canonicalizeTrainerAttendanceViewParams(new URLSearchParams('view=unknown&search=Riya&page=4'));
    expect(new URLSearchParams(normalized ?? '').has('view')).toBe(false);
    expect(new URLSearchParams(normalized ?? '').get('search')).toBe('Riya');
    expect(new URLSearchParams(normalized ?? '').get('page')).toBe('4');
  });

  it('does not rewrite an already canonical URL', () => {
    expect(canonicalizeTrainerAttendanceViewParams(new URLSearchParams('view=members&page=2'))).toBeNull();
  });
});
