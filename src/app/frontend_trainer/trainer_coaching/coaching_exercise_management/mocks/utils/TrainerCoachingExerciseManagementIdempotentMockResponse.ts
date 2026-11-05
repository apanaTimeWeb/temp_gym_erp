// RESPONSIBILITY: Prevent duplicate offline mutations when a request with the same idempotency key is retried.
// DATA FLOW: MSW handler -> keyed response replay -> original mutation exactly once.
const completed = new Map<string, Response>();
const inFlight = new Map<string, Promise<Response>>();
const MAX_ENTRIES = 100;

export async function replayTrainerMockMutation(
  request: Request, execute: () => Promise<Response>,
): Promise<Response> {
  const key = request.headers.get('Idempotency-Key')?.trim();
  if (!key) return execute();
  const url = new URL(request.url);
  const scopedKey = `${request.method}:${url.pathname}${url.search}:${key}`;
  const replay = completed.get(scopedKey);
  if (replay) return replay.clone();
  const pending = inFlight.get(scopedKey);
  if (pending) return (await pending).clone();

  const result = execute().then(response => {
    if (response.ok) {
      if (completed.size >= MAX_ENTRIES) {
        const oldest = completed.keys().next().value;
        if (oldest !== undefined) completed.delete(oldest);
      }
      completed.set(scopedKey, response.clone());
    }
    return response;
  }).finally(() => inFlight.delete(scopedKey));
  inFlight.set(scopedKey, result);
  return (await result).clone();
}

/** Restores the mock replay registry for isolated tests. */
export function resetTrainerMockMutationReplays(): void {
  completed.clear();
  inFlight.clear();
}
