---
feature: "admin_finance_expenses"
owner_role: "admin"
module_version: 1
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-29"
last_verified_commit: "host-unavailable"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Admin Expenses — Autonomous Submodule Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Derived from the supplied Admin role module source and the approved V2.11 decomposition plan. External API/host contracts are not inferred.

## 1. Scope and Non-Scope

**Owning capability:** Expenses within the Admin Finance domain. This leaf is a direct child of `admin_finance/` and is the autonomous route for the `expenses` workflow.

**In scope:** this leaf’s route entry, workflow component(s), locally copied hooks/API/types/schemas, mock scenario and tests described in the source inventory. **Out of scope:** sibling leaf business code, host-global infrastructure, and unverified backend behavior.

## 2. Screen Inventory

- Route: `/frontend_admin/admin_finance/finance_expenses`.
- Main capability: `Expenses`.
- Primary view source: `components/expenses_table/AdminFinanceExpensesExpensesTable.tsx` (derived from the pre-split module source).
- Loading/error/not-found route entries remain co-located.

## 3. Navigation Contract
- **Canonical route:** `/frontend_admin/admin_finance/finance_expenses`.
- **Owning domain:** `admin_finance/`; this leaf is exposed by its domain's secondary navigation.
- **Routing rule:** this leaf has no compatibility alias or legacy redirect. The parent domain root retains only its architecture-required default redirect to its first canonical leaf.
## 4. API Contract

- `expenses` — source evidence: `// DATA FLOW: page/navigation/API client → this URL contract → canonical route or request endpoint (admin_finance/finance_expenses/config/admin_finance_expenses.url_config.ts)`
- `summary` — source evidence: `export const ADMIN_FINANCE_SUMMARY_URL = '/admin/finance/summary' as const;`

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

No database or backend-schema migration is owned by this frontend leaf. Keep changes confined to the verified Finance Expenses route, UI state, and typed frontend request/response boundary. Roll back a frontend-only change by reverting its versioned source patch; any host rewrite or server-side change requires a separate rollback in the host repository.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/AdminFinanceExpensesDateRangeUtils.test.ts`
- `tests/api/AdminFinanceExpensesFeatureUrlContract.test.ts`
- `tests/hooks/useAdminFinanceExpensesLogic.test.ts`
- `tests/utils/AdminFinanceExpensesNormalizePage.test.ts` (RBG12, hostile URL boundary values)
- `tests/components/AdminFinanceExpensesPagination.test.tsx` (RBG12, accessible clamped pagination)
- `tests/components/AdminFinanceExpensesSearchableDropdownAccessibility.test.tsx` (RBG12, selected label and focus)
- `tests/utils/AdminFinanceExpensesApiResponse.test.ts`
- `tests/utils/AdminFinanceExpensesFormatters.test.ts`

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

## RBG12 — URL and Accessibility Repair Verification (2026-11-01)

- **Source-backed repair:** Expenses URL `expensePage` and generic `page` are normalized to positive safe integers using `utils/AdminFinanceExpensesNormalizePage.ts`; invalid categories fall back to `All` rather than entering query keys or backend filters. This is client-side input validation, not a server authorization control.
- **Isolated dropdown:** the selected value is in the accessible trigger name; keyboard active options scroll into view; selecting returns focus to the trigger. The feature-local dropdown is retained for standalone portability.
- **Disabled queries:** Payments remains disabled in this Expenses leaf and does not contribute to aggregate error state or retry behavior. Tests were corrected to reflect this existing contract.
- **Host verification:** Added Vitest/RTL sources are not claimed executed until the host dependencies are available. No backend endpoint, currency identity, role authorization or sibling module is changed.

### RBG 28–30 route error safety correction
- Forbidden-page selection now uses the explicit numeric `error.status === 403` signal only. Error-message text containing `403` does not establish authorization status.
- The forbidden destination link has a minimum 44px hit area (`min-h-11`), preserving the existing navigation URL and approved semantic theme tokens. Backend enforcement remains authoritative and requires host verification.


## RBG35 — Member path parameter boundary

The existing `paymentsByMember(memberId)` URL builder now percent-encodes `memberId` as one path segment. No backend endpoint shape, authority, authenticated scope, or response field was added or inferred. The feature-local URL contract test exercises `/`, `?`, `#`, `%`, and an ordinary ID. Runtime API and authorization verification remain `DEFERRED_TO_HOST_RUNTIME`.


### RBG 62 — source-verified repair
Display errors use existing localized generic finance message instead of raw server exceptions; query status and refetch stay intact. URL page/expensePage and setter inputs require finite positive safe integers. Invalid expense categories fall back to All. Backend contracts unchanged; production integration unverified.


### RBG 63 — source-verified repair
MSW pagination now normalizes untrusted page and limit inputs to positive safe integers; missing values keep existing endpoint defaults, while malformed decimals/exponents/Infinity and unsafe numbers fall back without changing production endpoint URLs or fixture contracts. Integration and real MSW/Vitest test execution pending.
