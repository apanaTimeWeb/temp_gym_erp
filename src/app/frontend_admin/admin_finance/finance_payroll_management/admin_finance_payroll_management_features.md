---
feature: "admin_finance_payroll_management"
owner_role: "admin"
module_version: 1
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-29"
last_verified_commit: "host-unavailable"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Admin Payroll — Autonomous Submodule Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Derived from the supplied Admin role module source and the approved V2.11 decomposition plan. External API/host contracts are not inferred.

## 1. Scope and Non-Scope

**Owning capability:** Payroll within the Admin Finance domain. This leaf is a direct child of `admin_finance/` and owns the `payroll` workflow.

**In scope:** this leaf’s route entry, workflow component(s), locally copied hooks/API/types/schemas, mock scenario and tests described in the source inventory. **Out of scope:** sibling leaf business code, host-global infrastructure, and unverified backend behavior.

## 2. Screen Inventory

- Route: `/frontend_admin/admin_finance/finance_payroll_management`.
- Main capability: `Payroll`.
- Primary view source: `components/payroll_table/AdminFinancePayrollManagementPayrollTable.tsx`.
- Loading/error/not-found route entries remain co-located.

## 3. Navigation Contract
- **Canonical route:** `/frontend_admin/admin_finance/finance_payroll_management`.
- **Owning domain:** `admin_finance/`; this leaf is exposed by its domain's secondary navigation.
- **Routing rule:** this leaf has no compatibility alias or legacy redirect. The parent domain root retains only its architecture-required default redirect to its first canonical leaf.
## 4. API Contract

- `staffBase` — `/admin/hr/staff` (read-only staff context used by Finance payroll).
- `staffUpdate` — `/admin/hr/staff/${id}` (source-verified compensation/advance deduction update used by payroll).
- `payrollsBase` — `/admin/hr/payrolls`.
- `payrollUpdate` — `/admin/hr/payrolls/${id}`.
- `summary` — `/admin/hr/summary`.

The API client exposes only operations consumed by this Finance leaf. Existing backend endpoint literals, HTTP methods and request bodies remain source-derived; external behavior not documented in supplied contracts is not inferred.

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
- `tests/api/AdminFinancePayrollManagementFeatureUrlContract.test.ts`
- `tests/hooks/useAdminFinancePayrollManagementLogic.test.ts`
- `tests/hooks/useAdminFinancePayrollManagementPaymentModalForm.test.ts`
- `tests/hooks/useAdminFinancePayrollManagementPayrollModalForm.test.ts`
- `tests/hooks/useAdminFinancePayrollManagementPayrollMutations.test.ts`
- `tests/store/useAdminFinancePayrollManagementStore.test.ts`
- `tests/utils/AdminFinancePayrollManagementApiResponse.test.ts`
- `tests/utils/AdminFinancePayrollManagementFormatCurrency.test.ts`

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

### RBG 11 source repair annotation (2026-11-01)

- The payroll route mounts its **own** feature confirmation provider before rendering any view components that invoke `useAdminFinancePayrollManagementConfirm`. The standalone harness supplies the same provider to custom children. This avoids dependency on the unrelated root `admin_navigation` context.
- Confirmation, payroll-creation, and payroll-payment dialogs use the local keyboard-focus hook. Escape dismissal, Tab containment, focus restoration, and body-scroll locking are implemented at source level; live browser verification remains deferred.
- The staff dropdown exposes `aria-invalid`/`aria-describedby` for its form error, contains the selected value in the trigger accessible name, and refocuses its trigger after selection.
- Payroll API response rejects nullish success data without inventing an endpoint or currency. Mock scenarios intercept GET only. New co-located regression tests are authored and require a host Vitest/RTL runner.
- Monetary display/currency identity is **NOT_VERIFIED** until an authoritative backend currency contract is provided; no INR assumption is introduced.

### RBG 28–30 route error safety correction
- Forbidden-page selection now uses the explicit numeric `error.status === 403` signal only. Error-message text containing `403` does not establish authorization status.
- The forbidden destination link has a minimum 44px hit area (`min-h-11`), preserving the existing navigation URL and approved semantic theme tokens. Backend enforcement remains authoritative and requires host verification.


## RBG36 — Dynamic URL path parameter safety

The verified `/admin/hr/staff/{id}` and `/admin/hr/payrolls/{id}` route builders now use `encodeURIComponent(id)` so IDs cannot introduce extra path segments, queries or fragments. This is source-level URL construction hardening, not evidence of server-side authorization, endpoint reachability, or data-level tenant isolation. Regression tests authored; host runner/browser execution remains deferred.


### RBG 40 — Read-query error privacy
Untrusted backend exception text is not shown in payroll/HR staff read-query UI state. The already-shipped `hr.AdminAuditRepair.requestFailed` localization is used; retry and raw query-error observability remain available only in the query object. React/host execution remains deferred.


### Source repair verification note (RBG 46–48)
RBG 48: This autonomous MSW leaf generates unique ledger/payroll demonstration IDs and normalizes malformed mock page/limit values; approved backend contracts are unchanged.

### RBG 53 source correction (2026-11-01)
`components/payroll_modal/AdminFinancePayrollManagementPayrollModal.tsx` now uses this submodule’s own Zod marker resolver. It preserves the full seven-character `__i18n:` translation-marker boundary and leaves plain messages unmodified. The regression test is authored; full host runtime remains NOT_VERIFIED.


### RBG 61 — source-verified repair
Three mutation-error toasts no longer interpolate untrusted backend exception text. Existing translated retry guidance, mutation request contracts, status and retry behavior remain unchanged. Host React/Vitest and authenticated API integration not verified.

#### RBG 68 — strict URL page parsing
Inbound route query `page` and outbound `setCurrentPage` now share an autonomous strict positive-integer validator. Invalid text such as `2abc`, fractions and nonfinite values falls back to page 1; existing 100000 cap is preserved. No other query parameter, backend route or API payload changed.

### RBG 75 — Payment mutation boundary safety
- Payment mutation validates the converted positive integer paise amount against loaded pending balance before showing confirmation or mutating. Zero/rounded-to-zero, unsafe/nonfinite, stale-invalid balance and overpayment fail closed without an API mutation; retries for the same minor amount retain intent identity. Backend remains authoritative for concurrent balance changes and authenticated authorization.

## RBG 100 — Mock financial mutation safety

Mock-only guard rejects invalid financial mutation amounts before modifying in-memory fixture records/ledger. Numbers must be finite and genuinely numeric (not booleans or numeric strings). Payroll additionally rejects `paidAmount > amount`, negative paid balances, nonexistent staff and staff reassignment during payroll edit. Valid actions and existing client API endpoints remain unchanged. **Production backend validation, RBAC and concurrent balance enforcement remain UNVERIFIED; mock behavior is not authoritative evidence of server policy.**

### RBG124 — Finance payroll URL, mock-query and selector safety (2026-11-02)
- Consecutive URL filter and sort updates now merge a pending local query and reconcile intermediate router acknowledgments; external Back/Forward navigations supersede stale local drafts. Identical target URLs are skipped, and the existing page reset remains in effect.
- Payroll month parsing rejects year `0000`, impossible months and non-roundtripping dates. The payroll sort setter is typed against the existing `PAYROLL_SORT_KEY_VALUES` union.
- Finance-owned MSW staff and payroll queries use the existing sort-key allowlists, normalize unsupported sort directions, trim whitespace search, bound page/limit inputs to 1..100, and clamp result-page metadata to available pages.
- Leaf searchable dropdown supports Home/End, active-option scrolling, and closed/disabled ARIA state. Leaf pagination clamps display to the available page range.
- Five co-located regression specs and one host-only Playwright spec were authored; official Vitest, real React/browser rendering, backend tenant authorization, and payroll money semantics are **NOT VERIFIED** here. Source-level controlled stand-ins are not production certification.
