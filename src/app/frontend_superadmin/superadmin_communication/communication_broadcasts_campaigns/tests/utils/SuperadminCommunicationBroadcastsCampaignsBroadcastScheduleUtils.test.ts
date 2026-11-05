import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { combineSuperadminBroadcastScheduleDateTime, splitSuperadminBroadcastScheduleDateTime } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/utils/SuperadminCommunicationBroadcastsCampaignsBroadcastScheduleUtils';

const originalTimezone = process.env.TZ;
beforeAll(() => { process.env.TZ = 'America/Los_Angeles'; });
afterAll(() => { if (originalTimezone === undefined) delete process.env.TZ; else process.env.TZ = originalTimezone; });

describe('SuperadminCommunicationBroadcastsBroadcastScheduleUtils', () => {
  it('converts browser-local wall-clock input into the matching UTC instant', () => {
    const localDate = new Date(2026, 9, 2, 14, 30, 0, 0);
    expect(localDate.getTimezoneOffset()).not.toBe(0);
    expect(combineSuperadminBroadcastScheduleDateTime('2026-10-02', '14:30')).toBe(localDate.toISOString());
  });

  it('round-trips a UTC instant through the current browser-local timezone', () => {
    const instant = new Date(2026, 9, 2, 14, 30, 0, 0).toISOString();
    expect(splitSuperadminBroadcastScheduleDateTime(instant)).toEqual({ date: '2026-10-02', time: '14:30' });
  });

  it('rejects a nonexistent spring-forward time rather than silently shifting it', () => {
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-03-08', '02:30'))
      .toThrow('Nonexistent local schedule time due to daylight-saving transition');
  });

  it('rejects an ambiguous fall-back time rather than arbitrarily choosing an offset', () => {
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-11-01', '01:30'))
      .toThrow('Ambiguous local schedule time due to daylight-saving transition');
  });

  it('accepts unambiguous times adjacent to daylight-saving transitions', () => {
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-03-08', '01:30')).not.toThrow();
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-03-08', '03:30')).not.toThrow();
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-11-01', '00:30')).not.toThrow();
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-11-01', '02:30')).not.toThrow();
  });

  it('returns empty controls for a missing or invalid schedule value', () => {
    expect(splitSuperadminBroadcastScheduleDateTime(null)).toEqual({ date: '', time: '' });
    expect(splitSuperadminBroadcastScheduleDateTime('not-an-instant')).toEqual({ date: '', time: '' });
  });

  it('rejects impossible calendar dates and malformed times', () => {
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-02-30', '14:30')).toThrow(RangeError);
    expect(() => combineSuperadminBroadcastScheduleDateTime('2026-10-02', '25:30')).toThrow(RangeError);
  });
});
