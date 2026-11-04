# PublicLanding — Feature Map and Operating Contract

## 1. Module Purpose
`src/app/frontend_public/public_landing/` owns the unauthenticated GymSmart marketing/conversion surface. It contains Hero, About, BMI, Plans, Trainers, Services, Schedule, Gallery, Booking, Transformations, Testimonials, Contact, Footer, public navigation, and a newsletter mail-client handoff. Authenticated ERP business logic is outside scope.

## 2. Dependency Manifest
The supplied module imports Next.js `next/image`, `next/link`, `next-intl`, `lucide-react`, TanStack Query, React Hook Form, Zod, `@hookform/resolvers`, and approved host primitives `@/lib/api` and `@/components/ThemeToggle`. The host `package.json` and lockfile were not supplied; exact versions and installed dependency state are `NOT VERIFIED`. Do not add dependencies without inspecting the host manifest and obtaining approval.

## 3. Feature Lifecycle Contract
- Entry: host route/rewrite preserves public URL `/landing` and resolves to this feature module.
- Render: route shell → module query provider → navigation → ordered static sections → footer.
- Booking/contact: validate locally → mutation via approved `apiFetch` infrastructure → validate response envelope → surface backend `message` or localized safe failure.
- Newsletter: validate email and open the configured mail client; no API subscription endpoint is documented.
- Unmount: remove scroll listeners, clear focus timers, restore body overflow and focus when the mobile drawer closes.

## 4. Screens & Entry Points
- `page.tsx`: route entry.
- `layout.tsx`: feature layout wrapper.
- `loading.tsx`: structural loading skeleton and accessible status.
- `error.tsx`: route error boundary with reset action.
- `not-found.tsx`: branded not-found state.
- `PublicLandingMain.tsx`: composition of all landing sections.
- Host-visible URL remains `/landing` via the Option A adapter described in `INTEGRATION_GUIDE.md`; host routing has not been verified.

## 5. Directory Structure
```text
public_landing/
├── page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
├── public_landing_styles/PublicLandingStyles.css
├── public_landing_url_config.ts
├── public_landing_features.md
├── public_landing_forbidden.md
├── public_landing_theme_contract.md
├── public_landing_api/
├── public_landing_components/public_landing_{section}/
├── public_landing_constants/
├── public_landing_hooks/ (all custom hook implementations and hook-focused tests)
├── public_landing_locales/public_landing_{en,hi}.json
├── public_landing_mocks/{fixtures,handlers}/
├── public_landing_schemas/
├── public_landing_tests/
├── public_landing_types/
└── public_landing_utils/
playwright_E2E/frontend_public_e2e/public_landing/public_landing_e2e.spec.ts
```

## 6. User Flows & Interactions
1. Visitor opens `/landing`, navigates by section anchors, and may leave for ERP/SaaS login.
2. BMI: enter height/weight → validate → calculate category → change input clears stale output → recalculate.
3. Booking: choose type, enter name/email/phone/date → client validation → POST `/api/landing/bookings` with UTC timestamp and idempotency key → success/backend message or safe error → retry same intent or edit to create a new intent.
4. Contact: enter name/email/message → validate → POST `/api/landing/contact` with idempotency key → success/backend message or safe error → retry or edit.
5. Newsletter: enter email → validate → mail-client handoff.
6. Mobile nav: open drawer → focus first control → trap Tab → close by Escape/close button/backdrop/link → restore body scroll and focus.

## 7. Data and State Architecture
- Server state: TanStack Query v5 mutation state only; no GET/read endpoints are supplied, so no artificial query cache is defined.
- Local UI state: BMI inputs/result, navbar scroll/menu state, newsletter email/error.
- Forms: React Hook Form + Zod schemas.
- URL state: section anchors and login destinations centralized in `public_landing_url_config.ts`.
- Mock state: module-owned MSW handlers use mutable in-memory records and deduplicate by idempotency key.

## 8. API Contract
- Booking: `POST /api/landing/bookings`.
- Contact: `POST /api/landing/contact`.
- Transport: approved `apiFetch` wrapper via `PublicLandingApi.ts`; do not use direct `fetch`/`axios` in feature components.
- Envelope: `success`, `message`, `data`, optional `meta`, `error`, `errorCode`, `statusCode`, `validationErrors`. The current feature contract specifies `data: null`; schema validation is in `public_landing_schemas/PublicLandingApiResponseSchema.ts`.
- No newsletter API endpoint is documented. Do not infer one.
- The detailed booking API contract takes precedence over the historical `/landing/booking` inventory typo; retain this as a source-conflict note until the product/API owner reconciles the source documents.

## 9. Approved External Dependencies
Only existing host infrastructure and packages already imported by the supplied source are assumed. Exact versions are `NOT VERIFIED` because no host manifest/lockfile was supplied. New packages require manifest review and explicit approval.

## 10. Permissions / Security
The public landing module is unauthenticated and has no documented role matrix. It must not make frontend authorization claims for ERP routes. Never log PII, expose raw transport errors, invent booking/contact success, or treat client-side checks as backend authorization. Contact/booking fields are user-provided personal data and must not be emitted to analytics/logs.

## 11. Platform-Specific Notes
Next.js App Router conventions are inferred from `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`. Host framework version, alias config, global providers, and route tree are not included and remain `NOT VERIFIED`.

## 12. Offline Behavior
A localized non-blocking offline notice is rendered. New network submissions should be disabled or fail with a localized retryable error while retaining form values. The newsletter mail-client handoff is not represented as a server-side subscription.

## 13. Loading / Empty / Error States
- Route: layout-matching semantic skeleton using `bg-skeleton-base` and `bg-skeleton-highlight`, `motion-safe:animate-pulse`, and screen-reader status.
- Error boundary: localized/branded fallback and `reset()` retry.
- Not found: branded message and safe return navigation.
- Booking/contact: field errors, backend domain message when validated, localized fallback for network/malformed response, retained values, retry.
- Static marketing sections have no API-backed empty state; do not add fake business data to cover missing content.

## 14. Background Tasks
No module-owned background jobs, timers, polling, or scheduled work are documented. The navbar's short focus timer is transient UI work and must be cleared during effect cleanup.

## 15. Edge Cases and AI Warnings
- Never replace `/api/landing/bookings` with the historical `/landing/booking` inventory typo.
- Do not duplicate business implementation in a host route adapter.
- Do not invent a newsletter API.
- Do not generate a new idempotency key for a retry of unchanged intent.
- Editing after a failed attempt must invalidate stale retry intent.
- Do not expose raw transport errors or personal data in logs.
- Do not use raw theme colors in JSX; native external social-brand colors are the documented exception in module CSS.
- Preserve `/landing` with a thin host rewrite/adapter; host behavior remains unverified.

## 16. Component Responsibility Map
- `PublicLandingMain`: ordered composition and provider boundary.
- `PublicLandingNavbar` + `usePublicLandingNavbar`: navigation and drawer focus/scroll lifecycle.
- `PublicLandingBooking` + `usePublicLandingBookingForm`: booking form and mutation intent.
- `PublicLandingContact` + `usePublicLandingContactForm`: contact form and mutation intent.
- `PublicLandingBmiCalc` + `usePublicLandingBmi` / `PublicLandingBmiUtils`: BMI input/output.
- `PublicLandingFooter` + `usePublicLandingNewsletter`: footer links/social links/newsletter mail-client handoff.
- Section components render their own section; constants/configuration and API/schema/utilities remain in their named module folders.

## 17. Rule Compliance Checklist
- [x] Canonical `public_landing` feature folder and exactly-once module-prefixed support folders.
- [x] Required module documentation trio and centralized URL config.
- [x] All 15 Vitest/RTL tests live in prefix-grouped `public_landing_tests/`; no test suites remain inside component, hook, API or utility implementation folders.
- [x] No barrel files or relative imports found in the RBG 1 static scan.
- [x] Response envelope schema constrains `data` to `null`.
- [x] Loading state uses semantic skeleton tokens and an accessible status announcement.
- [x] Mobile drawer backdrop is not a focusable control behind the modal; focus timer cleanup is implemented.
- [x] Footer/social target sizing and conditional error description were improved.
- [ ] Host token mapping, contrast, build/typecheck/lint, unit tests, and Playwright execution: `DEFERRED_TO_HOST_RUNTIME` / `NOT VERIFIED`.
- [ ] JSDoc Rule 37 wording conflict (targeted vs exhaustive): owner decision recorded in `INTEGRATION_GUIDE.md`.
- [ ] Full host route rewrite behavior for `/landing`: `DEFERRED_TO_HOST_RUNTIME`.

## 18. Known Issues / Tech Debt
- Host `globals.css`, Tailwind `@theme inline`, providers, aliases, route registration, package scripts, and Playwright config were not supplied.
- `PublicLandingStyles.css` is module-owned under `public_landing_styles/`, outside the feature root quarantine.
- Host route/rewrite for `/landing` must be added/merged as documented in `INTEGRATION_GUIDE.md`.
- Product owner must verify real contact details, social destinations, logo/hero/gallery assets, prices, testimonials/ratings, trainer credentials, and login destinations before production launch.
- Build/test/browser outcomes are not claimed; exact host commands are recorded in the integration guide.
