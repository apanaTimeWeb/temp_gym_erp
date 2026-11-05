'use client';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

/**
 * @description Central Superadmin API transport adapter; every role API facade routes through this function.
 * @dependencies Wraps the application's canonical apiFetch transport and forwards Zod response-data contracts.
 * @edge-case Adds a current browser locale header when a DOM language is available without overriding explicit caller headers.
 */
export async function SuperadminPlatformShellLayoutApiFetch<T>(url: string, options: Record<string, unknown> = {}): Promise<ApiResponse<T>> {
  const headers = new Headers((options.headers as HeadersInit | undefined) ?? undefined);
  if (!headers.has('Accept-Language')) {
    const locale = typeof document !== 'undefined'
      ? (document.documentElement.lang || 'en')
      : 'en';
    headers.set('Accept-Language', locale);
  }

  return apiFetch<T>(url, { ...options, headers } as Parameters<typeof apiFetch>[1]);
}
