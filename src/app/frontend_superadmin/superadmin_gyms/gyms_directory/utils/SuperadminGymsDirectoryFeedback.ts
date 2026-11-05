/** Surfaces verified domain feedback while hiding infrastructure exception details. */
export function resolveSuperadminGymsDirectoryFeedback(error: unknown, fallback: string): string {
 if (error instanceof Error && error.name.endsWith('FormApiError') && error.message.trim()) return error.message;
 return fallback;
}
