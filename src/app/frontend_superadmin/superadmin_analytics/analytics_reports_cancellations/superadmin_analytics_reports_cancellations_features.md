---
role: superadmin
domain: superadmin_analytics
submodule: analytics_reports_cancellations
version: 18
source_contract: v14 verified repository files
status: SOURCE_REPAIRED_STATIC_VERIFIED
---
# analytics_reports_cancellations — contract and source map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Independently filterable cancellation report records, date range and plan/search query parameters. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
One independently routable screen: analytics_reports_cancellations


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminAnalyticsReportsCancellationsMain.tsx | Renders Superadmin Analytics Reports Cancellations Main using its declared props and feature-local hooks. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCancellationsPanel.tsx | Renders/orchestrates SuperadminAnalyticsReportsCancellationsPanel within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
Canonical `/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations`; legacy tab URLs are handled in previous leaf.

## 4. API Contract & UI Data Requirements
Source-verified endpoints only: {"REPORT": "/superadmin/reports/cancellations"}


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_analytics_reports_cancellations.api.ts:22 | GET | `${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/revenue${q}` | Present |
| api/superadmin_analytics_reports_cancellations.api.ts:26 | GET | `${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/cancellations${q}` | Present |
| api/superadmin_analytics_reports_cancellations.api.ts:30 | GET | `${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/health${q}` | Present |
| api/superadmin_analytics_reports_cancellations_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_analytics_reports_cancellations.types.ts`, `types/superadmin_analytics_reports_cancellations_tab.types.ts`.

Validation schemas: `schemas/superadmin_analytics_reports_cancellations_contract.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 14 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
`api/superadmin_analytics_reports_cancellations.query_keys.ts`; isolated from sibling cache ownership.

## 6. Mutation Inventory & Lifecycle Operations
Existing operations only. Any state-changing action must use original method and UUIDv4 Idempotency-Key.

## 7. Permissions and Role Rules
Superadmin visibility as existing; server authorization must be verified with host backend.

## 8. State Ownership & Architecture Flow
Own TanStack query identity and local UI state; never imports sibling feature state.

## 9. Offline, Loading, Empty, and Error States
Pending/error/empty/retry are local; host network reconnection remains DEFERRED_TO_HOST_RUNTIME.

## 10. Security and PII Rules (Data Masking & Guards)
No secrets in URLs, no PII persistence, preserve original validation/mutation payloads.

## 11. Accessibility Requirements (A11y)
Accessible labels, keyboard links, 44px touch targets, focus-ring and reduced-motion tokens.

## 12. Background Tasks & Realtime Events
No background work added.

## 13. Feature Flags & Tenant Settings
No feature flags invented.

## 14. Cache Invalidation & Consistency
Local mutation hooks invalidate their local query identity; host verification deferred.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Original v14 ZIP is immutable; new sibling routes are additive with legacy compatibility.

## 16. Test Coverage Map & Quality Gates
Local tests and harness must assert route, API contract, and separate loading/error/empty success paths.

## 17. Architecture Exceptions (ADRs)
Internal source symbols copied/renamed under Strict WET; no sibling imports.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
Live server contract and host authorization outside supplied role ZIP.

## 19. Rule Compliance Checklist (35+ Verification Items)
Full source graph, file ceilings, URL config, docs, locales and harness checked before delivery.

## 20. Standalone Run, Mock & Test Harness
`tests/harness/bootstrap.ts` creates isolated QueryClient; local fixture contract is tested in this leaf.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminAnalyticsReportsCancellationsDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
Host supplies @/lib/api, UI primitives, next-intl messages and Next.js App Router.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/ChartConstants |
| @/hooks/useUrlState |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
v15 corrective five-gate decomposition from source-proven v14.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

