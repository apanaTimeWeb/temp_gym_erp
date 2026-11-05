---
feature: "superadmin_platform_shell_navigation"
owner_role: "superadmin"
module_version: 18
api_contract_source: "supplied-superadmin-web-zip"
last_verified_date: "2026-10-27"
last_verified_commit: "not-present-in-supplied-zip"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED"
---

# Superadmin Navigation Shell — Autonomous Sub-Module Contract

This contract is grounded in the current supplied `frontend-superadmin-v5-fix.zip` source tree and the existing parent-domain feature contract. It describes the present leaf boundary after the approved RBG-1 restructuring. Any host behavior not represented by this source is explicitly `NOT_VERIFIED`.

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Approved role navigation/header presentation and public route destinations; no sibling business implementation imports. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

Navigation metadata is in `constants/SuperadminPlatformShellNavigationConfig.ts`; role-owned public recovery/navigation URL is `/superadmin/dashboard` in the leaf URL config. The role-owned `SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES` registry holds copied, source-verified navigation hrefs to preserve the zero-cross-leaf-import rule. Actual host route reachability and rewrites remain `NOT_VERIFIED`.

No standalone business screen is declared for this leaf unless an actual route-entry file is present. A runtime URL alias is `NOT_VERIFIED` without host routing configuration.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminPlatformShellNavigationHeader.tsx | Renders/orchestrates SuperadminPlatformShellNavigationHeader within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminPlatformShellNavigationHeaderProfile.tsx | Renders/orchestrates SuperadminPlatformShellNavigationHeaderProfile within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminPlatformShellNavigationMain.tsx | Renders/orchestrates SuperadminPlatformShellNavigationMain within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminPlatformShellNavigationNotFound.tsx | Renders/orchestrates SuperadminPlatformShellNavigationNotFound within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminPlatformShellNavigationSaaSBillingNavigation.tsx | Renders/orchestrates SuperadminPlatformShellNavigationSaaSBillingNavigation within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminPlatformShellNavigationSidebar.tsx | Renders/orchestrates SuperadminPlatformShellNavigationSidebar within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminPlatformShellNavigationTopLoader.tsx | Renders/orchestrates SuperadminPlatformShellNavigationTopLoader within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows

The leaf owns navigation rendering and local collapse state only. Business screens, API data, and feature route segments remain owned by the 21 referenced feature leaves. The feature map was preserved at archive root as `FRONTEND_SUPERADMIN_FEATURE_MAP.md` so it does not violate leaf/domain root quarantine.

Canonical route entries now live beside their owning feature under `frontend_superadmin/`; alias-only entries are removed and documented in the route-preservation matrix. This leaf's route/navigation metadata is sourced from the existing typed URL constants and consuming shell components; do not invent new public paths.

## 4. API Contract & UI Data Requirements

No business API client or API endpoint is owned by this leaf. Navigation uses the leaf-local `SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES` public destination registry; its values were copied from the previously verified feature `MAIN` route entries. The host route owner imports `FRONTEND_SUPERADMIN_PUBLIC_ROUTES` for role-root recovery/navigation. No sibling URL-config imports are permitted.

No business endpoint, payload field, response field, or HTTP method may be introduced on the basis of this leaf alone. Host-provided transport behavior remains subject to the actual `@/lib/api` contract.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|


Response types: `types/superadmin_platform_shell_navigation.types.ts`, `types/superadmin_platform_shell_navigation_main_props.types.ts`.

Validation schemas: .


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 0 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

No leaf-owned TanStack Query key registry is evidenced in the current leaf. If source scans identify a query key after further repair, add it here from its exact `config/` file; otherwise this section remains not applicable.

## 6. Mutation Inventory & Lifecycle Operations

No leaf-owned business mutation is evidenced. User-intent mutations remain owned by the individual business leaf that declares the API operation. The layout transport adapter is a generic transport boundary, not a business mutation API.

## 7. Permissions and Role Rules

Role scope is Superadmin. The source package does not include the full host authorization/session configuration; frontend visibility does not replace backend authorization. Unobserved permission names and business gates are `NOT_VERIFIED`, not inferred.

## 8. State Ownership & Architecture Flow

The navigation shell contains local sidebar-collapse UI state and typed navigation metadata. It must not own business records, feature API orchestration, or sibling business state.

## 9. Offline, Loading, Empty, and Error States

A complete offline/reconnect contract is not evidenced in this role-only archive. Do not claim offline support. Any reconnect behavior requiring host services is `NOT_VERIFIED` until the actual host adapter contract and tests are available.

## 10. Security and PII Rules (Data Masking & Guards)

- Never expose credentials, access tokens, secrets, or private tenant data in UI state, logs, navigation metadata, or browser storage.
- Backend authorization remains authoritative.
- Do not introduce `gymId`/`branchId` or other tenant identity into mutation bodies unless an explicitly verified contract requires it; the authentication context governs tenant identity.
- Preserve existing source behavior and test fixtures during structural moves.

## 11. Accessibility Requirements (A11y)

Follow WCAG 2.2 AA, semantic HTML, keyboard operation, visible focus, descriptive accessible names, and reduced-motion preferences from the governing web design system. Preserve the currently supplied keyboard/focus behavior and the leaf-local accessibility tests. Any host-only checks must be labelled `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

No background task, scheduler, or timer-owned business process is declared for this leaf. Loading indicators and route progress UI do not establish a business background-task contract.

## 13. Feature Flags & Tenant Settings

No leaf-owned feature-flag contract is evidenced in current source. Do not infer a rollout flag or invent a new flag name.

## 14. Cache Invalidation & Consistency

No leaf-owned business query cache is evidenced. Do not add query invalidation to shell infrastructure. Feature-owned TanStack Query keys and their cache updates remain in the owning feature leaf.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

RBG-1 removes the seven artificial category parents and promotes domain roots to `frontend_superadmin/`. This leaf is the terminal execution unit below `superadmin_platform_shell_navigation`. If rollback is necessary, use the immutable original `frontend-superadmin-v5-fix.zip`; do not reintroduce the seven category parents into the repaired tree.

## 16. Test Coverage Map & Quality Gates

Current leaf test files:
- `tests/SuperadminPlatformShellNavigationOneToOneMapping.test.ts`
- `tests/SuperadminPlatformShellNavigationSaaSBilling.test.ts`

Test availability is not test success. Tests must be run with the host-supported runner when available; results not executed in this archive environment must remain `DEFERRED_TO_HOST_RUNTIME`.

## 17. Architecture Exceptions (ADRs)

No new architecture exception is introduced by RBG-1. The existing role-shell transport adapter and navigation metadata are retained as found. Any cross-domain infrastructure import constraints are explicitly tracked for a later dependency-isolation pass; no exception is implied by this document.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log

- Host package scripts, TypeScript configuration, root Tailwind tokens, and application routing rewrites are not included in the supplied archive.
- Public route reachability cannot be verified from filesystem entries alone.
- External backend behavior not recorded in source contracts is `CONTRACT_MISSING`.

## 19. Rule Compliance Checklist (35+ Verification Items)

- [x] Leaf directory is exactly one level below its domain container.
- [x] No feature-bearing child submodule exists beneath the leaf.
- [x] Internal organization uses canonical category folders.
- [x] URL configuration is in `config/` and uses the leaf-specific name.
- [ ] Standalone test harness and host contract stubs verified — scheduled for RBG-2.
- [ ] Full 22-section source contract and token reconciliation verified — scheduled for RBG-3 re-audit.

## 20. Standalone Run, Mock & Test Harness

The role archive does not provide the host package manifest needed to assert an executable standalone command. V2.11 requires a leaf-owned `tests/harness/bootstrap.ts` and harness component; these are not present in this RBG-1 checkpoint and are assigned to RBG-2. Existing test filenames are inventoried in Section 16. Do not report a passing isolated run until the harness is authored and the runner is executed.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.

## 21. Module Portability & Host Integration Guide

Imports use the `@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/...` alias convention. The host must resolve `@/features` to the feature source root and supply approved zero-business UI, API, logger, socket and display-value infrastructure. The required `contracts/host-stubs.d.ts` portability boundary is present in this leaf and is statically inventoried. No root host files are requested or changed as part of this role-module repair.


### v18 external dependency manifest


| Approved host file |
|---|
| @/components/ThemeToggle |
| @/lib/api |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)

- Input baseline: `frontend-superadmin-v5-fix.zip` (SHA-256 recorded in the execution state).
- RBG-1 static gate: terminal leaf and canonical category structure verified; route entries preserved; in-scope import and mock path re-audit passed. Resolved cross-leaf dependencies remain open for RBG-2 and are not claimed as isolated.
- Delivery status at this checkpoint: `IN_PROGRESS`; no completion ZIP is claimed.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

