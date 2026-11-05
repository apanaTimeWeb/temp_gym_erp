---
role: superadmin
domain: superadmin_communication
submodule: communication_notifications
version: 18
status: SOURCE_SPLIT_STATIC_AUDIT_REQUIRED
api_contract_source: supplied v12 web ZIP
---
# Superadmin Communication Notifications — Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Notification browsing and read/read-all mutations, independent from message composition. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Standalone notifications page, list, loading/error/empty states, one/read-all actions.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminCommunicationNotificationsList.tsx | Renders/orchestrates SuperadminCommunicationNotificationsList within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminCommunicationNotificationsMain.tsx | Notifications are a deep-linkable workflow with local query/mutation state. |
| components/SuperadminCommunicationNotificationsPageSuspenseSkeleton.tsx | Feature-owned loading fallback with stable dimensions and translated accessibility status. |

## 3. Navigation Contract & User Flows
`/frontend_superadmin/superadmin_communication/communication_notifications` secondary tab. Legacy Messaging `?tab=notifications` redirects.

## 4. API Contract & UI Data Requirements
Exact existing endpoints `GET /superadmin/messaging/notifications`, `PATCH /superadmin/messaging/notifications/:id/read`, `PATCH /superadmin/messaging/notifications/read-all`. Request and response wire shape unchanged.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_communication_notifications.api.ts:7 | GET | SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API.NOTIFICATIONS | Present |
| api/superadmin_communication_notifications.api.ts:8 | PATCH | SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API.NOTIFICATION_READ(id) | Present |
| api/superadmin_communication_notifications.api.ts:9 | PATCH | SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API.NOTIFICATIONS_READ_ALL | Present |
| api/superadmin_communication_notifications_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_communication_notifications.types.ts`, `types/superadmin_communication_notifications_list.types.ts`, `types/superadmin_communication_notifications_mutation.types.ts`.

Validation schemas: `schemas/superadmin_communication_notifications.schema.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 12 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
Local `SUPERADMIN_COMMUNICATION_NOTIFICATIONS_QUERY_KEYS.notifications` and independently owned query invalidation.

## 6. Mutation Inventory & Lifecycle Operations
Mark individual/read-all PATCH actions require local UUIDv4 Idempotency-Key per original API.

## 7. Permissions and Role Rules
Superadmin user only; backend permission enforcement not established by ZIP.

## 8. State Ownership & Architecture Flow
TanStack Query v5 server state, ephemeral UI pending states, no business data persisted in browser storage.

## 9. Offline, Loading, Empty, and Error States
Retains focus/visibility recovery and socket subscribe; host runtime behavior deferred.

## 10. Security and PII Rules (Data Masking & Guards)
Notification metadata rendered safely; no inferred sensitive fields or client secrets.

## 11. Accessibility Requirements (A11y)
Notification action buttons remain keyboard focusable and accessible; WCAG AA live axe verification deferred.

## 12. Background Tasks & Realtime Events
No scheduled jobs; HTTP query and socket adapter handle visible state.

## 13. Feature Flags & Tenant Settings
No invented entitlements/flags.

## 14. Cache Invalidation & Consistency
Original mark-read invalidations now scoped to this independent notifications query key.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Standalone route added; legacy `?tab=notifications` redirects to new canonical URL.

## 16. Test Coverage Map & Quality Gates
Former notification hooks tests moved; isolated MSW handler and harness added.

## 17. Architecture Exceptions (ADRs)
Local copies of host adapter and formatters follow strict WET. No imports from sibling Messaging Center.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
No live backend, host build or browser supplied, so those runtime checks are NOT_VERIFIED.

## 19. Rule Compliance Checklist (35+ Verification Items)
Static import, 5-gate and route integrity checks to be recorded in final report.

## 20. Standalone Run, Mock & Test Harness
`tests/harness/bootstrap.ts` owns MSW lifecycle and QueryClient creation.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminCommunicationNotificationsDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
Integrate leaf into existing host under same communication domain, mount local locale messages and approved core adapters.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/lib/logger |
| @/lib/socket |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
v13 split from v12 Messaging Center. Original message list/compose route preserved.


### RBG-04 local loading recovery
The Next.js `loading.tsx` and `page.tsx` fallbacks now render a locally owned, localized `PageSuspenseSkeleton` component; the owning feature locale files carry the loading accessible-name string. See local tests for the accessible busy status and host integration for runtime execution.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

