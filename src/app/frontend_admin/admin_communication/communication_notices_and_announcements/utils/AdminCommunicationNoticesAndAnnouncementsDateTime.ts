// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for communication_notices_and_announcements; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsDateTime.ts)

/** Converts a browser-local datetime-local value into an explicit UTC instant at the API boundary. @description Implements adminAnnouncementLocalDateTimeToUtc for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function adminAnnouncementLocalDateTimeToUtc(value: string): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(value)) {
    throw new RangeError('A valid local announcement date and time is required.');
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new RangeError('A valid local announcement date and time is required.');
  return date.toISOString();
}

/** Converts an API UTC instant into the browser-local value expected by an HTML datetime-local input. @description Implements adminAnnouncementUtcToLocalDateTime for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function adminAnnouncementUtcToLocalDateTime(value: string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return '';
  const localAdjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localAdjusted.toISOString().slice(0, 16);
}
