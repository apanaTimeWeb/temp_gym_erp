---
feature: "admin_hr_staff_management"
owner_role: "admin"
module_version: 1
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-29"
last_verified_commit: "host-unavailable"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Admin Staff — Autonomous Submodule Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Derived from the supplied Admin role module source and the approved V2.11 decomposition plan. External API/host contracts are not inferred.

## 1. Scope and Non-Scope

**Owning capability:** Staff lifecycle within the Admin HR domain. This leaf is a direct child of `admin_hr/` and owns staff CRUD, profile and role administration only.

**In scope:** this leaf’s route entry, workflow component(s), locally copied hooks/API/types/schemas, mock scenario and tests described in the source inventory. **Out of scope:** sibling leaf business code, host-global infrastructure, and unverified backend behavior.

## 2. Screen Inventory

- Route: `/frontend_admin/admin_hr/hr_staff_management`.
- Main capability: `Staff`.
- Primary view source: `components/staff_table/AdminHrStaffManagementStaffTable.tsx` (derived from the pre-split module source).
- Loading/error/not-found route entries remain co-located.

## 3. Navigation Contract
- **Canonical route:** `/frontend_admin/admin_hr/hr_staff_management`.
- **Owning domain:** `admin_hr/`; this leaf is exposed by its domain's secondary navigation.
- **Routing rule:** this leaf has no compatibility alias or legacy redirect. The parent domain root retains only its architecture-required default redirect to its first canonical leaf.
## 4. API Contract

- `staffBase` — source evidence: `staffBase: ADMIN_HR_STAFF_BASE_URL,`
- `staffGetOne` — source evidence: `staffGetOne: ADMIN_HR_STAFF_GET_ONE_URL,`
- `staffUpdate` — source evidence: `staffUpdate: ADMIN_HR_STAFF_UPDATE_URL,`
- `staffDelete` — source evidence: `staffDelete: ADMIN_HR_STAFF_DELETE_URL,`
- `bulkDeactivate` — source evidence: `bulkDeactivate: ADMIN_HR_BULK_DEACTIVATE_URL,`
- `summary` — staff summary reads are exposed only where the staff screen consumes the source-verified summary response; finance mutations are out of scope.
- `branchReference` — source evidence: `branchReference: ADMIN_HR_BRANCH_REFERENCE_URL,`

## 5. Query Key Registry

Query keys remain module-prefixed and are defined in this leaf’s `constants/` category. Only the scoped workflow query is enabled by this leaf-local logic; shared summary/current-context queries are explicitly called out in the implementation. Verify exact keys from the listed `*QueryKeys.ts` file.

## 6. Mutation Inventory

Mutation methods and their payloads are copied from the source module only where imported by this workflow. No endpoint, HTTP method, request parameter, response field, or business invariant is added by this decomposition. State-changing calls must keep the existing UUIDv4 `Idempotency-Key` flow.

## 7. Permissions and Role Rules

Permission and role checks are inherited from the source components/hooks and are not expanded by this move. If the source ZIP does not contain a permission contract for a control, that contract remains `NOT_VERIFIED`; this document does not invent a permission matrix.

## 8. State Ownership

Server data is managed by TanStack Query v5 in leaf-local hooks/API code. URL-backed state remains in Next.js search parameters; transient modal/form state remains in the leaf-local Zustand store and RHF/Zod hooks where present.

## 9. Offline and Reconnect Behavior

The leaf ships local MSW handler/fixture/scenario sources. Runtime offline/reconnect behavior is only claimed where the source hooks define it; network execution is `DEFERRED_TO_HOST_RUNTIME`.

## 10. Security and PII Rules

The decomposition preserves existing masking, nullable-value display, authorization boundaries, tenant identity source, and redaction code by copying those dependency files into the leaf. Do not place business entity records in browser storage or expose client secrets.

## 11. Accessibility Requirements

Interactive controls must retain semantic labels, keyboard operation, focus-visible indicators, live pending/error states, and WCAG 2.2 AA touch-target/contrast requirements. Existing component markup is preserved except for route/workflow ownership and file-path changes.

## 12. Background Tasks

No new background job or scheduler is introduced by this split. Any asynchronous refresh remains owned by the copied query/mutation hook.

## 13. Feature Flags

No new feature flag is invented. A flag is considered present only if a concrete key and its evaluation are found in the supplied source.

## 14. Cache Invalidation

Cache invalidation/query-key behavior is retained from the source module’s hook and mutation implementations. Any behavior not statically traceable is `NOT_VERIFIED` rather than inferred.

## 15. Migration and Rollback

- **Migration scope:** This is a frontend feature contract. The supplied source does not establish a database/schema migration or a backend deployment migration for this leaf; do not infer or apply one from this document.
- **Forward change procedure:** Keep changes within this leaf's existing route, API-client, schema/type, hook, UI, locale, mock, and test ownership boundaries. Preserve the canonical URL configuration and all verified request/response behavior. Update source-derived inventory and regression coverage together when ownership changes.
- **Rollback procedure:** Revert the coordinated leaf-owned frontend changes as one unit, including related locale and test updates. Do not restore retired route aliases, stale imports, or undocumented backend contracts as part of rollback.
- **Verification gate:** Resolve leaf-local imports and physical inventory references; parse changed locale JSON and syntax-check changed TypeScript/TSX; run the host typecheck, tests, build, and route/browser checks when the host project environment is available. Those host checks are not claimed as run by this documentation repair.
- **Data safety:** No production data mutation or backend migration is authorized by this section. Any such operation requires a separately supplied, authoritative backend change plan.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/api/AdminHrStaffManagementFeatureUrlContract.test.ts`
- `tests/components/kpis/AdminHrStaffManagementKPIs.test.tsx`
- `tests/hooks/useAdminHrStaffManagementDebounce.test.ts`
- `tests/hooks/useAdminHrStaffManagementLogic.test.ts`
- `tests/hooks/useAdminHrStaffManagementStaffModalForm.test.ts`
- `tests/hooks/useAdminHrStaffManagementStaffMutations.test.ts`
- `tests/hooks/useAdminHrStaffManagementStaffProfileBranches.test.ts`
- `tests/hooks/useAdminHrStaffManagementUrlState.test.ts`
- `tests/hooks/useAdminHrStaffManagementViewModel.test.ts`
- `tests/store/useAdminHrStaffManagementStore.test.ts`
- `tests/utils/AdminHrStaffManagementApiResponse.test.ts`
- `tests/utils/AdminHrStaffManagementFormatCurrency.test.ts`
- `tests/utils/AdminHrStaffManagementFormatters.test.ts`
- `tests/utils/AdminHrStaffManagementMaskEmail.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

This leaf contains no business imports from sibling leaves. Global dependencies are limited to the approved host infrastructure and zero-business UI primitives. The role navigation shell is owned by `admin_navigation/` and is not a leaf feature dependency. The source module was split by independently navigable tab/workflow and documented endpoint families.

## 18. Known Contract Gaps

Known source conflicts and external contract gaps are recorded in `audit_evidence/ADMIN_V47_API_CONTRACT_PRESERVATION.csv`. The two flagged URL literals remain unchanged pending authoritative contract evidence; Data Export and dedicated 2FA lifecycle behavior are not invented. The host `apiFetch` implementation and public rewrite layer are outside this role ZIP, so integrated envelope and public-route behavior remain `DEFERRED_TO_HOST_RUNTIME` or `NOT_VERIFIED_IN_SCOPE`.

## 19. Rule Compliance Checklist

Evidence classifications are `VERIFIED`, `DERIVED`, `CONTRACT_MISSING`, or `NOT_VERIFIED`. No source/API claim is elevated to `VERIFIED` solely because a folder or documentation file exists.

## 20. Standalone Run, Mock & Test Harness

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, mutable module-owned MSW fixtures/handlers, and at least one local API route contract test are included. The host must provide the documented shared infrastructure stubs/dependencies.

## 21. Module Portability & Host Integration Guide

This module is designed for extraction into the canonical role container. Integration requires Next.js App Router, TypeScript path alias `@/*`, approved core API/logger/UI/socket/display helpers, and the package versions recorded in host configuration. Host config files are outside the supplied role ZIP.

## 22. Deliverables & Version History

Updated during Admin v45 domain-grouping and ownership reconciliation. Canonical route and file references are checked against the final physical tree; backend endpoint literals remain source-defined and any unresolved external contract is called out in the release evidence.


### RBG 18 verified repair note (2026-11-01)
- HR profile branch sort is a keyboard-operable button within its column header; API `location` is optional and missing values use the canonical display fallback. No location value was invented.
- HR staff mock POST validates `staffFormSchema` before creating records and rejects missing required fields with a 400 canonical failure envelope. Fixture reset is exported and called by the standalone MSW bootstrap.
- Source tests for these invariants were authored; live Zod/MSW/RTL execution remains `DEFERRED_TO_HOST_RUNTIME`.

### RBG 29 KPI localization and safe error feedback
- Staff KPI metrics use `useLocale()` and feature-local `formatNumber` instead of an implicit platform locale.
- Errors use translated, actionable generic text rather than exposing a raw backend exception; the retry affordance remains available.

### RBG 28–30 route error safety correction
- Forbidden-page selection now uses the explicit numeric `error.status === 403` signal only. Error-message text containing `403` does not establish authorization status.
- The forbidden destination link has a minimum 44px hit area (`min-h-11`), preserving the existing navigation URL and approved semantic theme tokens. Backend enforcement remains authoritative and requires host verification.


## RBG38 — URL path-segment safety (source-backed repair)
The existing ADMIN_HR_STAFF_GET_ONE_URL dynamic URL builder refuses empty, whitespace-only, `.` or `..` identifiers before inserting a dynamic path segment. Other identifiers remain `encodeURIComponent` encoded. The endpoint shape is unchanged. Feature-local regression coverage checks the existing ordinary URL, encoded delimiters, and fail-closed reserved identifiers. External backend authorization and live API reachability remain `DEFERRED_TO_HOST_RUNTIME`; this does not close ISSUE-182 or ISSUE-229/230.


### RBG 40 — Read-query error privacy
Untrusted backend exception text is not shown in payroll/HR staff read-query UI state. The already-shipped `hr.AdminAuditRepair.requestFailed` localization is used; retry and raw query-error observability remain available only in the query object. React/host execution remains deferred.

### RBG 49 — HR Staff mock pagination and identity safety
- The module-owned mock uses finite, positive, safe integer page/limit values, retaining defaults 1/10 for malformed query strings. This affects **only MSW state**, not production API contracts.
- Generated mock employee IDs now use independent UUIDs rather than timestamps, avoiding same-millisecond collisions. Existing employee IDs supplied explicitly by the form remain unchanged.
- Regression coverage: `tests/mocks/AdminHrStaffManagementPaginationAndIdentity.test.ts`; runtime MSW/host execution remains `DEFERRED_TO_HOST_RUNTIME`.

### RBG 54 source correction (2026-11-01)
Staff form validation uses the leaf-owned exact seven-character Zod marker resolver, including branch and role feedback. Dynamic staff input errors are linked by stable `aria-describedby` IDs with `aria-invalid` and alert semantics. Full screen-reader and host runtime verification remain NOT_VERIFIED.


### RBG 61 — source-verified repair
Three mutation-error toasts no longer interpolate untrusted backend exception text. Existing translated retry guidance, mutation request contracts, status and retry behavior remain unchanged. Host React/Vitest and authenticated API integration not verified.

#### RBG 69 — URL pagination boundary
The URL page reader and outbound page setter use the same module-owned strict positive-integer guard. Malformed inputs, fractions and nonfinite values fall back to page 1, and page values above 100000 are bounded to avoid unbounded requests. API endpoints, filters, sorting, and returned query envelopes are unchanged.

### RBG 104 — Joining dates and salary minor-unit safety
Provided join dates are validated as real ISO calendar dates before conversion. Invalid leap/civil dates and unzoned timestamps cannot silently normalize. Existing generated join-date retry stability is unchanged. HR money conversion rejects silently rounded sub-paise amounts. No backend calendar policy inferred.


## RBG128 Source Repair Addendum (2026-11-02)

- URL filter/sort changes compose using pending-query state until navigation acknowledgement, with Back/Forward reset.
- HR staff destructive confirmation: local dialog focus containment, Escape, unique IDs, queued typed-state isolation, and nonblank typed phrase.
- HR staff mock PATCH strips unknown fields and rejects updates with no validated HR form fields; Finance-owned `advanceSalary` / `currentDue` values are not editable through this mock. This is **mock-only**, not backend authorization proof.
- Mock list uses supported sort keys, trimmed search, bounded page size, and clamps obsolete pages.
- Regression specs: `tests/hooks/AdminHrStaffManagementRBG128UrlSync.test.tsx`, `tests/components/AdminHrStaffManagementRBG128ConfirmDialog.test.tsx`, `tests/components/AdminHrStaffManagementRBG128SelectorAndPagination.test.tsx`, `tests/mocks/AdminHrStaffManagementRBG128MockSafety.test.ts`, `playwright_E2E/admin_hr_staff_management_rbg128.spec.ts` (host-only).
- Official Vitest/RTL/MSW and browser validation remains `DEFERRED_TO_HOST_RUNTIME`; backend RBAC/tenant verification not performed.
