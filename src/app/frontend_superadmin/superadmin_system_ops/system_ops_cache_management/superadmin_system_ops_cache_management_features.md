---
feature: superadmin_system_ops_cache_management
owner_role: superadmin
module_version: 18
api_contract_source: supplied-v16-source
documentation_status: current
---

# Cache Management

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Independent Redis telemetry, tenant selection and confirmed global/tenant cache flushing; no infrastructure-node request executes in this workspace. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

page.tsx renders components/SuperadminSystemOpsCacheManagementMain.tsx, RedisTelemetrySection, RedisControls and the tenant-selection modal.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminSystemOpsCacheManagementFlushTenantModal.tsx | Renders Superadmin System Ops Cache Management Flush Tenant Modal using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsCacheManagementFlushTenantModalFooter.tsx | Renders Superadmin System Ops Cache Management Flush Tenant Modal Footer using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsCacheManagementFlushTenantModalHeader.tsx | Renders Superadmin System Ops Cache Management Flush Tenant Modal Header using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsCacheManagementFlushTenantModalSelectionControls.tsx | Renders Superadmin System Ops Cache Management Flush Tenant Modal Selection Controls using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsCacheManagementFlushTenantModalTenantList.tsx | Renders Superadmin System Ops Cache Management Flush Tenant Modal Tenant List using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsCacheManagementMain.tsx | Composes the independently refreshable cache telemetry and confirmed flush workflow. |
| components/SuperadminSystemOpsCacheManagementPageSuspenseSkeleton.tsx | Feature-owned loading fallback with stable dimensions and translated accessibility status. |
| components/SuperadminSystemOpsCacheManagementRedisControls.tsx | Renders/orchestrates SuperadminSystemOpsCacheManagementRedisControls within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsCacheManagementRedisTelemetry.tsx | Renders/orchestrates SuperadminSystemOpsCacheManagementRedisTelemetry within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsCacheManagementRedisTelemetrySection.tsx | Renders Superadmin System Ops Cache Management Redis Telemetry Section using its declared props and feature-local hooks. |

## 3. Navigation Contract & User Flows

Independent secondary destination: /frontend_superadmin/superadmin_system_ops/system_ops_cache_management. The existing infrastructure destination links here; the domain tab exposes the same destination.

## 4. API Contract & UI Data Requirements

GET /superadmin/system-ops/infrastructure/redis; GET /superadmin/gyms; POST /superadmin/system-ops/infrastructure/redis/flush-global; POST /superadmin/system-ops/infrastructure/redis/flush-tenant with { tenantIds }. See the local URL/API/types/schema contracts. Mutations require Idempotency-Key.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_system_ops_cache_management.api.ts:24 | GET | `${SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API.BASE}${q}` | Present |
| api/superadmin_system_ops_cache_management.api.ts:26 | GET | SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API.REDIS_TELEMETRY | Present |
| api/superadmin_system_ops_cache_management.api.ts:27 | GET | SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API.UPTIME_HISTORY | Present |
| api/superadmin_system_ops_cache_management.api.ts:28 | POST | SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API.REDIS_FLUSH_GLOBAL | Present |
| api/superadmin_system_ops_cache_management.api.ts:29 | POST | SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API.REDIS_FLUSH_TENANT | Present |
| api/superadmin_system_ops_cache_management.api.ts:30 | GET | SUPERADMIN_SYSTEM_OPS_CACHE_MANAGEMENT_API.TENANTS | Present |
| api/superadmin_system_ops_cache_management_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_system_ops_cache_management.types.ts`, `types/superadmin_system_ops_cache_management_flush_tenant_modal.types.ts`, `types/superadmin_system_ops_cache_management_flush_tenant_modal_footer.types.ts`, `types/superadmin_system_ops_cache_management_flush_tenant_modal_header.types.ts`, `types/superadmin_system_ops_cache_management_flush_tenant_modal_selection_controls.types.ts`, `types/superadmin_system_ops_cache_management_flush_tenant_modal_tenant_list.types.ts`, `types/superadmin_system_ops_cache_management_mutation.types.ts`, `types/superadmin_system_ops_cache_management_redis_controls.types.ts`, `types/superadmin_system_ops_cache_management_redis_telemetry.types.ts`, `types/superadmin_system_ops_cache_management_redis_telemetry_section.types.ts`, `types/superadmin_system_ops_cache_management_uptime.types.ts`.

Validation schemas: `schemas/superadmin_system_ops_cache_management.schemas.ts`, `schemas/superadmin_system_ops_cache_management_api.schemas.ts`, `schemas/superadmin_system_ops_cache_management_uptime.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 15 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

api/superadmin_system_ops_cache_management.query_keys.ts namespaces cache reads under superadmin_system_ops_cache_management. Resource queries do not import or invalidate sibling state.

## 6. Mutation Inventory & Lifecycle Operations

Global flush and tenant flush use confirmation, mutation pending state, same-intent retry keys and authoritative success messages.

## 7. Permissions and Role Rules

Inherited superadmin UI scope. Server-side authorization must be independently enforced; BACKEND_ENFORCEMENT_REQUIRED_NOT_VERIFIABLE_FROM_FRONTEND. No permission grant is inferred from UI visibility.

## 8. State Ownership & Architecture Flow

TanStack Query owns telemetry and tenant API data. Local React state owns the open modal and selection. Idempotency refs contain intent keys only.

## 9. Offline, Loading, Empty, and Error States

Telemetry section renders loading, failure with retry, and zero metrics from valid empty fixtures. Tenant lookup has error/empty/retry behavior. Pending buttons disable repeat submission.

## 10. Security and PII Rules (Data Masking & Guards)

Tenant selector presents only fixture-safe identifiers/names. No browser persistence, auth tokens, or PII telemetry is introduced. Synthetic fixture data only.

## 11. Accessibility Requirements (A11y)

Existing modal focus trap, Escape, focus restoration, labels and 44px controls are preserved. Rendered keyboard/zoom/contrast checks remain DEFERRED_TO_HOST_RUNTIME.

## 12. Background Tasks & Realtime Events

No new realtime contract. Queries refetch after authoritative cache mutations.

## 13. Feature Flags & Tenant Settings

No new feature flag or tenant setting contract.

## 14. Cache Invalidation & Consistency

Mutation success invalidates this leaf query namespace. Failed mutations preserve the intent key for retry.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

Restore the previous archive for rollback. Existing node monitoring route remains valid. No endpoint, DTO or wire enum is renamed.

## 16. Test Coverage Map & Quality Gates

tests/SuperadminSystemOpsCacheManagementApi.test.ts exercises actual local API functions via MSW. Existing infrastructure behavior remains covered by its own tests.

## 17. Architecture Exceptions (ADRs)

Five-gate decision: independent secondary route; independent cache read/mutation lifecycle; multiple prior workflows above 25 files; local mocks/harness; cache flush endpoint family distinct from infrastructure node monitoring. This is a sibling extraction, not a nested submodule or component-only module.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log

Host build, authenticated browser execution and backend enforcement remain outside supplied evidence. Other role-wide audit findings are tracked in the root result; this leaf does not certify them.

## 19. Rule Compliance Checklist (35+ Verification Items)

Source parse/import/type checks and behavioral test results are recorded in root validation evidence. Do not interpret authored tests as executed passes.

## 20. Standalone Run, Mock & Test Harness

Run the supplied isolated-validation Vitest configuration or mount this Main inside the host QueryClient, next-intl, theme and ConfirmProvider. Harness initialization is local under tests/harness/.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.

## 21. Module Portability & Host Integration Guide

Copy this folder into src/app/frontend_superadmin/superadmin_system_ops/. Supply documented apiFetch, ConfirmProvider, next-intl, URL-state and theme host contracts. Register local MSW handlers only in development/test.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/Feedback/ConfirmProvider |
| @/components/ui/Tooltip |
| @/components/ui/ProgressBar |
| @/lib/logger |
| @/hooks/useUrlState |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)

Extracted from v16 infrastructure source. Root delivery status governs readiness; no standalone 8/8 or production certification is asserted without execution evidence.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

