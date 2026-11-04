# Public Landing Booking — Hard Submodule Boundaries

- No import from any sibling submodule, no parent business buckets, no nested sub-submodules, no CRUD-action nano-modules.
- Do not infer backend response fields, credentials, role permissions, tenant IDs, host route rewrites, or external phone/email values.
- Do not remove existing forms, buttons or event handlers to pass static tests. Preserve current user flow: choose booking type, fill form, validate Zod, submit with stable UUID intent, retry or start another booking.
- Keep status/error, retry/refresh, and offline handling. No localStorage of business PII; no direct browser token exposure.
- Source-specific exception: route entry adapters preserve the original paths but must contain no business implementation.
- Any exceptional dependency must have file/line evidence, documented risk, and review before marking release complete.

- RBG 2 naming integrity: new booking source/test filenames MUST have globally unique `PublicLandingBooking` / `usePublicLandingBooking` prefixes; no reintroduction of `PublicLandingApi.ts`, `PublicLandingApi.test.ts`, or generic sibling-colliding booking file names. The canonical URL config, `host-stubs.d.ts`, and `tests/harness/bootstrap.ts` retain their required filename exceptions.
