import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

/** Feature-local adapter over the approved global transport; preserves the active browser locale. */
export async function superadminTicketsManagementApiFetch<T>(url: string, options: Record<string, unknown> = {}): Promise<ApiResponse<T>> {
  const headers = new Headers((options.headers as HeadersInit | undefined) ?? undefined);
  if (!headers.has('Accept-Language')) {
    const locale = typeof document !== 'undefined' ? (document.documentElement.lang || 'en') : 'en';
    headers.set('Accept-Language', locale);
  }
  return apiFetch<T>(url, { ...options, headers } as Parameters<typeof apiFetch>[1]);
}
