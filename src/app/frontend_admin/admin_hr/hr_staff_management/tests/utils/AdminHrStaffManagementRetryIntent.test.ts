import { describe, expect, it } from 'vitest';
import { getAdminHrGeneratedJoinDateIntent, getAdminHrStatusIntent } from '../../utils/AdminHrStaffManagementRetryIntent';

describe('HR retry identity', () => {
  it('separates activate and suspend while preserving same-action retry identity', () => {
    expect(getAdminHrStatusIntent('id:1', true)).toBe(getAdminHrStatusIntent('id:1', true));
    expect(getAdminHrStatusIntent('id:1', true)).not.toBe(getAdminHrStatusIntent('id:1', false));
    expect(getAdminHrStatusIntent('a:b', true)).not.toBe(getAdminHrStatusIntent('a', true));
  });
  it('uses an unambiguous edit ID and payload, stable across equivalent retries', () => {
    expect(getAdminHrGeneratedJoinDateIntent('id', { name: 'One' })).toBe(getAdminHrGeneratedJoinDateIntent('id', { name: 'One' }));
    expect(getAdminHrGeneratedJoinDateIntent('id', { name: 'One' })).not.toBe(getAdminHrGeneratedJoinDateIntent('id', { name: 'Two' }));
    expect(getAdminHrGeneratedJoinDateIntent(null, { name: 'One' })).not.toBe(getAdminHrGeneratedJoinDateIntent('id', { name: 'One' }));
  });
});
