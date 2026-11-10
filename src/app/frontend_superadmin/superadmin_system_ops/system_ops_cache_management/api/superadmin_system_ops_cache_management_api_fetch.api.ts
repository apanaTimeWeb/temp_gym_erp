import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

/** Feature-local adapter over the approved global transport; preserves the active browser locale. */
export async function superadminSystemOpsInfrastructureApiFetch<T>(url: string, options: Record<string, unknown> = {}): Promise<ApiResponse<T>> {
  const existingHeaders = (options.headers as Record<string, string> | undefined) ?? {};
  const locale = typeof document !== 'undefined' ? (document.documentElement.lang || 'en') : 'en';
  const headers: Record<string, string> = {
    'Accept-Language': locale,
    ...existingHeaders,
  };
  return apiFetch<T>(url, { ...options, headers } as Parameters<typeof apiFetch>[1]);
}
