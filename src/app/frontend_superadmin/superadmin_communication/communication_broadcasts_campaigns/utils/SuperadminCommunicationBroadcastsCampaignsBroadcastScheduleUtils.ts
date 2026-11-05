/**
 * RESPONSIBILITY: Converts browser-local date/time inputs to the UTC instant required by the Broadcasts API.
 * TIMEZONE CONTRACT: Date/time controls use the current browser's local timezone. Nonexistent spring-forward times and ambiguous fall-back times are rejected instead of silently shifting or picking an arbitrary instant.
 */
import { format, isValid, parse } from 'date-fns';

const SCHEDULE_INPUT_FORMAT = 'yyyy-MM-dd HH:mm';
const OFFSET_SAMPLE_WINDOW_HOURS = 48;
const OFFSET_SAMPLE_INTERVAL_MINUTES = 30;

function isValidCalendarInput(date: string, time: string): boolean {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!dateMatch || !timeMatch) return false;

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(year, month - 1, day);
  utcDate.setUTCHours(hour, minute, 0, 0);
  return utcDate.getUTCFullYear() === year
    && utcDate.getUTCMonth() === month - 1
    && utcDate.getUTCDate() === day
    && utcDate.getUTCHours() === hour
    && utcDate.getUTCMinutes() === minute;
}

/**
 * Finds every instant that maps back to the requested local wall-clock minute.
 * Sampling offsets around the target catches both sides of daylight-saving transitions,
 * including zones that change by 30 minutes rather than one hour.
 */
function findMatchingLocalInstants(input: string, localDate: Date): number[] {
  const [datePart, timePart] = input.split(' ');
  const [year = 0, month = 0, day = 0] = datePart!.split('-').map(Number);
  const [hour, minute] = timePart!.split(':').map(Number);
  const wallClockDate = new Date(0);
  wallClockDate.setUTCFullYear(year!, month! - 1, day!);
  wallClockDate.setUTCHours(hour!, minute!, 0, 0);
  const wallClockAsUtc = wallClockDate.getTime();
  const offsets = new Set<number>();

  for (let deltaMinutes = -OFFSET_SAMPLE_WINDOW_HOURS * 60;
    deltaMinutes <= OFFSET_SAMPLE_WINDOW_HOURS * 60;
    deltaMinutes += OFFSET_SAMPLE_INTERVAL_MINUTES) {
    offsets.add(new Date(localDate.getTime() + deltaMinutes * 60_000).getTimezoneOffset());
  }

  const instants = new Set<number>();
  for (const offsetMinutes of offsets) {
    const candidate = wallClockAsUtc + offsetMinutes * 60_000;
    if (format(new Date(candidate), SCHEDULE_INPUT_FORMAT) === input) instants.add(candidate);
  }
  return [...instants].sort((left, right) => left - right);
}

export function combineSuperadminBroadcastScheduleDateTime(date: string, time: string): string {
  if (!isValidCalendarInput(date, time)) {
    throw new RangeError('Invalid local schedule date/time');
  }

  const input = `${date} ${time}`;
  const localDate = parse(input, SCHEDULE_INPUT_FORMAT, new Date(2000, 0, 1, 0, 0, 0, 0));
  if (!isValid(localDate)) throw new RangeError('Invalid local schedule date/time');
  if (format(localDate, SCHEDULE_INPUT_FORMAT) !== input) {
    throw new RangeError('Nonexistent local schedule time due to daylight-saving transition');
  }

  const matchingInstants = findMatchingLocalInstants(input, localDate);
  if (matchingInstants.length === 0) {
    throw new RangeError('Nonexistent local schedule time due to daylight-saving transition');
  }
  if (matchingInstants.length > 1) {
    throw new RangeError('Ambiguous local schedule time due to daylight-saving transition');
  }
  return new Date(matchingInstants[0]!).toISOString();
}

export function splitSuperadminBroadcastScheduleDateTime(value?: string | null): { date: string; time: string } {
  if (!value) return { date: '', time: '' };
  const parsed = new Date(value);
  if (!isValid(parsed)) return { date: '', time: '' };
  return { date: format(parsed, 'yyyy-MM-dd'), time: format(parsed, 'HH:mm') };
}
