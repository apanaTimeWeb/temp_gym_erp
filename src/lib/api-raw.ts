/**
 * Host implementation of raw HTTP fetch adapter.
 * Preserves raw Response object, status code, and manual redirect handling.
 */
export async function apiFetchRaw(url: string, options: RequestInit = {}): Promise<Response> {
  return fetch(url, {
    ...options,
    cache: 'no-store',
    redirect: 'manual',
  });
}

export default apiFetchRaw;

