---
role: superadmin
domain: superadmin_system_ops
submodule: system_ops_infrastructure
status: SOURCE_SPLIT_STATIC_AUDIT_REQUIRED
version: 18
api_contract_source: supplied v12 web ZIP
last_verified_date: '2026-10-30'
---
# Superadmin System Ops Infrastructure — Autonomous Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Infrastructure node metrics and uptime monitoring. Redis cache reads and confirmed flush operations are now owned by system_ops_cache_management. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Canonical page: `system_ops_infrastructure/page.tsx`. The original `?view=infrastructure` URL remains compatible through the existing Overview route redirect.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminSystemOpsInfrastructureErrorBoundary.tsx | Renders/orchestrates SuperadminSystemOpsInfrastructureErrorBoundary within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsInfrastructureFlushTenantModal.tsx | Renders Superadmin System Ops Infrastructure Flush Tenant Modal using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsInfrastructureFlushTenantModalFooter.tsx | Renders Superadmin System Ops Infrastructure Flush Tenant Modal Footer using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsInfrastructureFlushTenantModalHeader.tsx | Renders Superadmin System Ops Infrastructure Flush Tenant Modal Header using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsInfrastructureFlushTenantModalSelectionControls.tsx | Renders Superadmin System Ops Infrastructure Flush Tenant Modal Selection Controls using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsInfrastructureFlushTenantModalTenantList.tsx | Renders Superadmin System Ops Infrastructure Flush Tenant Modal Tenant List using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsInfrastructureHeader.tsx | Renders/orchestrates SuperadminSystemOpsInfrastructureHeader within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsInfrastructureMain.tsx | Renders and orchestrates SuperadminSystemOpsInfrastructureMain for the owning Superadmin feature module; presentation stays free of direct API calls. |
| components/SuperadminSystemOpsInfrastructurePageSuspenseSkeleton.tsx | Feature-owned loading fallback with stable dimensions and translated accessibility status. |
| components/SuperadminSystemOpsInfrastructureRedisControls.tsx | Renders/orchestrates SuperadminSystemOpsInfrastructureRedisControls within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsInfrastructureRedisTelemetry.tsx | Renders/orchestrates SuperadminSystemOpsInfrastructureRedisTelemetry within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsInfrastructureRedisTelemetrySection.tsx | Renders Superadmin System Ops Infrastructure Redis Telemetry Section using its declared props and feature-local hooks. |
| components/SuperadminSystemOpsInfrastructureResourceMetrics.tsx | Renders/orchestrates SuperadminSystemOpsInfrastructureResourceMetrics within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsInfrastructureUptimeChart.tsx | Renders/orchestrates SuperadminSystemOpsInfrastructureUptimeChart within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
System Ops domain secondary tab Infrastructure. New canonical URL `/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure`.

## 4. API Contract & UI Data Requirements
Preserves exact source-verified endpoints `/superadmin/system-ops/infrastructure`, `/redis`, `/redis/flush-global`, `/redis/flush-tenant`, `/uptime-history`, `/api-health`, and `/superadmin/gyms` using module-local `config/superadmin_system_ops_infrastructure.url_config.ts`.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_system_ops_infrastructure.api.ts:24 | GET | `${SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.BASE}${q}` | Present |
| api/superadmin_system_ops_infrastructure.api.ts:26 | GET | SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_TELEMETRY | Present |
| api/superadmin_system_ops_infrastructure.api.ts:27 | GET | SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.UPTIME_HISTORY | Present |
| api/superadmin_system_ops_infrastructure.api.ts:28 | POST | SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_FLUSH_GLOBAL | Present |
| api/superadmin_system_ops_infrastructure.api.ts:29 | POST | SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_FLUSH_TENANT | Present |
| api/superadmin_system_ops_infrastructure.api.ts:30 | GET | SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.TENANTS | Present |
| api/superadmin_system_ops_infrastructure_api_fetch.api.ts:11 | GET | url | See API wrapper validation |
| api/superadmin_system_ops_infrastructure_health.api.ts:13 | GET | SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH.BACKEND_API.BASE | Present |

Response types: `types/superadmin_system_ops_infrastructure.types.ts`, `types/superadmin_system_ops_infrastructure_flush_tenant_modal.types.ts`, `types/superadmin_system_ops_infrastructure_flush_tenant_modal_footer.types.ts`, `types/superadmin_system_ops_infrastructure_flush_tenant_modal_header.types.ts`, `types/superadmin_system_ops_infrastructure_flush_tenant_modal_selection_controls.types.ts`, `types/superadmin_system_ops_infrastructure_flush_tenant_modal_tenant_list.types.ts`, `types/superadmin_system_ops_infrastructure_header.types.ts`, `types/superadmin_system_ops_infrastructure_mutation.types.ts`, `types/superadmin_system_ops_infrastructure_redis_controls.types.ts`, `types/superadmin_system_ops_infrastructure_redis_telemetry.types.ts`, `types/superadmin_system_ops_infrastructure_redis_telemetry_section.types.ts`, `types/superadmin_system_ops_infrastructure_resource_metrics.types.ts`, `types/superadmin_system_ops_infrastructure_uptime.types.ts`, `types/superadmin_system_ops_infrastructure_v1.types.ts`.

Validation schemas: `schemas/superadmin_system_ops_infrastructure.schemas.ts`, `schemas/superadmin_system_ops_infrastructure_api.schemas.ts`, `schemas/superadmin_system_ops_infrastructure_api_response.schema.ts`, `schemas/superadmin_system_ops_infrastructure_uptime.schemas.ts`, `schemas/superadmin_system_ops_infrastructure_v1.schemas.ts`, `schemas/superadmin_system_ops_infrastructure_v1_response.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 17 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
`SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS` remains in module-owned `constants/` and preserves key string identity.

## 6. Mutation Inventory & Lifecycle Operations
`flushGlobalCache` and `flushTenantCache` retain POST + Idempotency-Key headers; no new server behavior is invented.

## 7. Permissions and Role Rules
Superadmin UI; existing confirmations and disabled states kept. Backend enforcement not verified within isolated ZIP.

## 8. State Ownership & Architecture Flow
TanStack Query for node/Redis/tenant/uptime server data; local hook state for filters/confirmation. No cross-sibling state.

## 9. Offline, Loading, Empty, and Error States
Local loading and failure states preserved; live reconnection behavior is DEFERRED_TO_HOST_RUNTIME.

## 10. Security and PII Rules (Data Masking & Guards)
No tenant data in localStorage; no new authorization assumptions. Redis mutations require confirmation.

## 11. Accessibility Requirements (A11y)
Retain focus-safe dialogs, visible button labels, focus ring tokens, and WCAG AA intent; browser axe remains DEFERRED_TO_HOST_RUNTIME.

## 12. Background Tasks & Realtime Events
No new scheduled tasks; existing telemetry queries remain network-driven.

## 13. Feature Flags & Tenant Settings
No new feature flags or entitlements created.

## 14. Cache Invalidation & Consistency
Preserves module-local infrastructure query keys and existing mutation invalidations.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Source split is additive: legacy query entry redirects to canonical new sibling. Revert by restoring pre-split v12 ZIP.

## 16. Test Coverage Map & Quality Gates
Infrastructure-named source tests moved with this leaf; dedicated MSW setup in `tests/harness/bootstrap.ts`.

## 17. Architecture Exceptions (ADRs)
Infrastructure is independent from Overview; intentionally duplicates required generic feature-owned hooks and wrappers locally under Strict WET.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
No backend source or host dependencies were provided; dynamic browser integration tests require host runtime.

## 19. Rule Compliance Checklist (35+ Verification Items)
Source-level file/import/route inventory must be re-run after packaging; no declaration of live test pass is made.

## 20. Standalone Run, Mock & Test Harness
`tests/harness/bootstrap.ts` provides independent MSW setup. Use host test commands once dependencies are available.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminSystemOpsInfrastructureDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
ZIP only this leaf with `contracts/host-stubs.d.ts`, local APIs, mocks, tests and translations; integrate with host `@/lib/api`, theme, and next-intl messages.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/Feedback/ConfirmProvider |
| @/components/ui/Tooltip |
| @/components/ui/SearchableDropdown |
| @/components/ui/ProgressBar |
| @/lib/logger |
| @/hooks/useUrlState |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
v13 structural split of infrastructure from v12 System Ops Overview; original Overview route retained for compatibility.


### RBG-04 local loading recovery
The Next.js `loading.tsx` and `page.tsx` fallbacks now render a locally owned, localized `PageSuspenseSkeleton` component; the owning feature locale files carry the loading accessible-name string. See local tests for the accessible busy status and host integration for runtime execution.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

