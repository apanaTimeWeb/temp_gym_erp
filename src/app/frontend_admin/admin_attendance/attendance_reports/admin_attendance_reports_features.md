---
feature: "admin_attendance_reports"
owner_role: "admin"
module_version: 1
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-29"
last_verified_commit: "host-unavailable"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Admin Attendance — Autonomous Submodule Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Derived from the supplied Admin role module source and the approved V2.11 decomposition plan. External API/host contracts are not inferred.

## 1. Scope and Non-Scope

**Owning capability:** Attendance reporting within the Admin Attendance domain. The report route, data, filters, branch context, schemas, query state, mocks and tests remain under `admin_attendance/attendance_reports/`.

**In scope:** this leaf’s route entry, workflow component(s), locally copied hooks/API/types/schemas, mock scenario and tests described in the source inventory. **Out of scope:** sibling leaf business code, host-global infrastructure, and unverified backend behavior.

## 2. Screen Inventory

- Route: `/frontend_admin/admin_attendance/attendance_reports`.
- Main capability: `Attendance`.
- Primary view source: `components/attendance/AdminAttendanceReportsTable.tsx` (derived from the pre-split module source).
- Loading/error/not-found route entries remain co-located.

## 3. Navigation Contract
- **Canonical route:** `/frontend_admin/admin_attendance/attendance_reports`.
- **Owning domain:** `admin_attendance/`; this leaf is exposed by its domain's secondary navigation.
- **Routing rule:** this leaf has no compatibility alias or legacy redirect. The parent domain root retains only its architecture-required default redirect to its first canonical leaf.
## 4. API Contract

- Report data endpoint: `/admin/reports/attendance` (source-defined; this is the only report-data endpoint called by this leaf).
- Branch/reference endpoint: `/admin/branches/fetchBranches` (source-defined branch reference contract consumed locally).
- `/admin/reports/export` remains a source-declared URL literal, but the host binary-response/download contract is not supplied. The client must fail closed with the documented `BinaryExportContractError` instead of guessing a Blob or file-name contract.
- No other business-domain report endpoints, response DTOs, query state, fixtures or API clients are owned or imported by this leaf. `admin_reports/reports_cross_domain_overview/` is route catalog only.
## 5. Query Key Registry

The leaf-local query registry namespaces the owning report query and branch-reference query only. The report query is enabled only when its date range is valid. Branch/date filters are local screen inputs; this leaf does not import sibling business-query state.
## 6. Mutation Inventory

This is a read-only report workflow for business entities. The source-declared export action remains contract-gated because the host binary-response/download contract is absent; it must not simulate a successful file export or invent a response. No Sales/Attendance/Finance sibling mutations are imported into this leaf.
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

The report-data and branch-reference queries use leaf-local query keys. This read-only report does not mutate business entities and must not invalidate sibling business caches. Host cache behavior not verifiable from the role source remains `NOT_VERIFIED_IN_SCOPE`.
## 15. Migration and Rollback

- **Migration scope:** This is a frontend feature contract. The supplied source does not establish a database/schema migration or a backend deployment migration for this leaf; do not infer or apply one from this document.
- **Forward change procedure:** Keep changes within this leaf's existing route, API-client, schema/type, hook, UI, locale, mock, and test ownership boundaries. Preserve the canonical URL configuration and all verified request/response behavior. Update source-derived inventory and regression coverage together when ownership changes.
- **Rollback procedure:** Revert the coordinated leaf-owned frontend changes as one unit, including related locale and test updates. Do not restore retired route aliases, stale imports, or undocumented backend contracts as part of rollback.
- **Verification gate:** Resolve leaf-local imports and physical inventory references; parse changed locale JSON and syntax-check changed TypeScript/TSX; run the host typecheck, tests, build, and route/browser checks when the host project environment is available. Those host checks are not claimed as run by this documentation repair.
- **Data safety:** No production data mutation or backend migration is authorized by this section. Any such operation requires a separately supplied, authoritative backend change plan.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/AdminAttendanceReportsDateRangeUtils.test.ts`
- `tests/api/AdminAttendanceReportsFeatureUrlContract.test.ts`
- `tests/hooks/useAdminAttendanceReportsTable.test.ts`
- `tests/hooks/useAdminAttendanceReportsBranchReference.test.ts`
- `tests/hooks/useAdminAttendanceReportsLogic.test.ts`
- `tests/utils/AdminAttendanceReportsApiResponse.test.ts`
- `tests/utils/AdminAttendanceReportsSortAttendanceRows.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

This leaf is owned exclusively by the Admin Attendance domain. It contains no business imports from sibling leaves. API clients, report schemas, query state, fixtures, MSW handlers and tests are leaf-local copies, in accordance with strict module isolation/WET rules. The Reports catalog owns navigation links only and must not query or persist this report's business data.
## 18. Known Contract Gaps

- The source-declared `/admin/reports/export` literal lacks the host's raw binary-response/download contract; export must fail closed and must not fabricate a successful download.
- F-025/F-026 source URL conflicts remain unchanged in the owning original modules pending authoritative API evidence.
- Data Export and the dedicated 2FA lifecycle remain external-contract-gated.
- Host API-envelope implementation, public routing/rewrite behavior, and integrated test/build/runtime are outside this role ZIP and remain `DEFERRED_TO_HOST_RUNTIME` or `NOT_VERIFIED_IN_SCOPE`.
## 19. Rule Compliance Checklist

Evidence classifications are `VERIFIED`, `DERIVED`, `CONTRACT_MISSING`, or `NOT_VERIFIED`. No source/API claim is elevated to `VERIFIED` solely because a folder or documentation file exists.

## 20. Standalone Run, Mock & Test Harness

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, mutable module-owned MSW fixtures/handlers, and at least one local API route contract test are included. The host must provide the documented shared infrastructure stubs/dependencies.

## 21. Module Portability & Host Integration Guide

This module is designed for extraction into the canonical role container. Integration requires Next.js App Router, TypeScript path alias `@/*`, approved core API/logger/UI/socket/display helpers, and the package versions recorded in host configuration. Host config files are outside the supplied role ZIP.

## 22. Deliverables & Version History

Updated during Admin v46 domain-ownership correction after review identified that business reports must remain within their business domain. Canonical route and file references are checked against the final physical tree; backend endpoint literals remain source-defined and any unresolved external contract is called out in the release evidence.


### Post-RBG24 source correction (ISSUE-010)

Report component export identifiers now match their actual component file names, and local importers use matching symbols. External host `admin_layout` translations are unchanged.

### RBG 28 URL-contract physical reconciliation
- Canonical source: `config/attendance_reports.url_config.ts` owns the API and dashboard fallback route. The unimported shell-only duplicate was removed after a full supplied-tree import scan. No endpoint values or route destinations were changed.

### RBG 86 — Browser download lifecycle
The scoped report export mutation preserves existing binary transport fail-closed behavior and localized API failure feedback. When a verified Blob is returned, the temporary anchor is mounted only for click and removed in `finally`; its object URL is always revoked. Browser click/setup failures use existing localized export error feedback without surfacing raw error text. Actual browser integration and Blob backend contract remain NOT_VERIFIED.

## RBG138 source-level maintenance checkpoint (2026-11-02)

The feature-owned calendar now uses civil-year-safe date construction for years 0001–9999, bounded month/arrow navigation and Tab-loop containment. An immediate two-click start/end selection retains the pending start while URL props are settling. The URL date filter merges pending local edits, treats browser-history changes as authoritative, and avoids duplicate route replacement. The searchable branch selector supports Home/End, selected-option scrolling, disabled closure and keyboard focus restoration. Report binary exports are single-flight within the mounted feature hook and release the guard on success/failure. No export API contract, endpoint or response shape was invented; the existing fail-closed export transport remains authoritative.

RBG138 added four feature-local native regression specifications and one host-only Playwright specification. **Source syntax/import checks and controlled transpiled-source stand-in assertions executed**; native Next.js, RTL/Vitest, authenticated Playwright, assistive-technology WCAG and backend/tenant/RBAC checks **were not executed** in the supplied role-only archive. This does not constitute production certification.
