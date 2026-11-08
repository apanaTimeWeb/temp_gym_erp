import { describe, expect, it } from 'vitest';

import { MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MEMBER_GENDER_OPTIONS, MEMBER_STATUS_OPTIONS, MEMBERS_CYCLE_LABELS, MEMBERS_STATUS_COLORS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';

describe('ManagerMembersDirectoryUiConstants', () => {
  it('uses the canonical status tuple for both the schema and filter options', () => {
    expect(MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES).toEqual(['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']);
    expect(MEMBER_STATUS_OPTIONS.map((option) => option.value).filter((value) => value !== 'All')).toEqual(MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES);
  });
  it('keeps status options aligned with semantic status colors', () => {
    const values = MEMBER_STATUS_OPTIONS.map((option) => option.value).filter((value) => value !== 'All');
    expect(values.every((value) => Boolean(MEMBERS_STATUS_COLORS[value]))).toBe(true);
  });

  it('exposes supported membership cycle labels', () => {
    expect(Object.keys(MEMBERS_CYCLE_LABELS)).toEqual(expect.arrayContaining([
      'ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'TWELVE_MONTHS', 'CUSTOM',
    ]));
  });

  it('keeps gender filter values explicit and stable', () => {
    expect(MEMBER_GENDER_OPTIONS).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'All Genders', value: 'All' }),
      expect.objectContaining({ label: 'Male', value: 'MALE' }),
      expect.objectContaining({ label: 'Female', value: 'FEMALE' }),
      expect.objectContaining({ label: 'Other', value: 'OTHER' }),
    ]));
  });
});


describe('Manager Members canonical status and localization options', () => {
  it('uses the canonical status set for filter options', () => {
    expect(MEMBER_STATUS_OPTIONS.map((option) => option.value)).toEqual(['All', 'ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']);
  });
  it('maps legacy billing-cycle labels to translation keys', () => {
    expect(MEMBERS_CYCLE_LABELS.Annual).toBe('COPY_TWELVE_MONTHS');
    expect(MEMBERS_CYCLE_LABELS.Quarterly).toBe('COPY_THREE_MONTHS');
  });
});
