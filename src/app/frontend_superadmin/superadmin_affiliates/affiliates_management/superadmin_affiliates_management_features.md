---
feature: "superadmin_affiliates_management"
owner_role: "superadmin"
module_version: 18
source_archive: "frontend-superadmin-v12-FINAL.zip"
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_YET_VERIFIED (target 8/8)"
---

# Superadmin Affiliates Management — Autonomous Sub-Module Contract

This specification was generated from the supplied Superadmin web ZIP and the original domain feature contract `superadmin_affiliates_features.md`. The inherited master contract remains at the parent domain root; this leaf document records the current autonomous leaf ownership after RBG1 structural migration. Any unknown contract is explicitly marked `NOT_VERIFIED` or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than inferred.

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Affiliate directory, commission configuration, status changes and confirmed commission payments for the affiliate aggregate; history is linked to the payout sibling. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

### Route-entry evidence

| Entry file | Filesystem-derived route | Evidence boundary |
| --- | --- | --- |
| `page.tsx` | /frontend_superadmin/superadmin_affiliates/affiliates_management | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `loading.tsx` | `/frontend_superadmin/superadmin_affiliates/affiliates_management (loading.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `error.tsx` | `/frontend_superadmin/superadmin_affiliates/affiliates_management (error.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `not-found.tsx` | `/frontend_superadmin/superadmin_affiliates/affiliates_management (not-found.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |

### Leaf-owned artifact inventory

| Category | File count | Representative source paths (relative to this leaf) |
| --- | ---: | --- |
| `api/` | 2 | `api/superadmin_affiliates_management.api.ts`, `api/superadmin_affiliates_management_api_fetch.api.ts` |
| `components/` | 10 | `components/SuperadminAffiliatesManagementErrorBoundary.tsx`, `components/SuperadminAffiliatesManagementPayoutHistory.tsx`, `components/affiliates_management_empty_state/SuperadminAffiliatesManagementEmptyState.tsx` |
| `config/` | 5 | `constants/superadmin_affiliates_management.constants.ts`, `api/superadmin_affiliates_management.query_keys.ts`, `config/superadmin_affiliates_management.url_config.ts` |
| `contracts/` | 1 | `contracts/host-stubs.d.ts` |
| `hooks/` | 6 | `hooks/useSuperadminAffiliatesManagementDialogA11y.ts`, `hooks/useSuperadminAffiliatesManagementMutation.ts`, `hooks/useSuperadminAffiliatesManagementMutations.ts` |
| `locales/` | 2 | `locales/superadmin_affiliates_management_en.json`, `locales/superadmin_affiliates_management_hi.json` |
| `mocks/` | 4 | `mocks/fixtures/SuperadminAffiliatesManagementMockFixtures.ts`, `mocks/fixtures/SuperadminAffiliatesManagementPayoutHistoryMockFixtures.ts`, `mocks/handlers/SuperadminAffiliatesManagementMockHandlers.ts` |
| `schemas/` | 2 | `schemas/superadmin_affiliates_management_api.schemas.ts`, `schemas/superadmin_affiliates_management_types.schemas.ts` |
| `state/` | 1 | `state/SuperadminAffiliatesManagementGitkeep` |
| `tests/` | 15 | `tests/SuperadminAffiliatesManagementBasic.test.tsx`, `tests/SuperadminAffiliatesManagementTableRow.test.tsx`, `tests/harness/SuperadminAffiliatesManagementHarness.tsx` |
| `types/` | 11 | `types/superadmin_affiliates_management.types.ts`, `types/superadmin_affiliates_management_affiliate_modal.types.ts`, `types/superadmin_affiliates_management_affiliate_status_badge.types.ts` |
| `utils/` | 4 | `utils/SuperadminAffiliatesManagementFormApiErrors.ts`, `utils/SuperadminAffiliatesManagementFormatCurrency.ts`, `utils/SuperadminAffiliatesManagementFormatters.ts` |

### Direct leaf-root files

- `error.tsx`
- `loading.tsx`
- `not-found.tsx`
- `page.tsx`

This inventory is generated from the current filesystem and is authoritative for file placement only. Component responsibility and supported business behavior must be inferred from the actual source implementation, not from filenames alone.



### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminAffiliatesManagementErrorBoundary.tsx | Renders/orchestrates SuperadminAffiliatesManagementErrorBoundary within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminAffiliatesManagementPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for affiliates_management, with no sibling-module dependencies. |
| components/SuperadminAffiliatesManagementPayoutHistory.tsx | Renders/orchestrates SuperadminAffiliatesPayoutHistory within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_empty_state/SuperadminAffiliatesManagementEmptyState.tsx | Renders/orchestrates SuperadminAffiliatesEmptyState within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_header/SuperadminAffiliatesManagementHeader.tsx | Renders/orchestrates SuperadminAffiliatesHeader within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_main/SuperadminAffiliatesManagementMain.tsx | Renders/orchestrates SuperadminAffiliatesMain within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_modals/SuperadminAffiliatesManagementAffiliateModal.tsx | Renders the Create/Edit Affiliate modal form. Receives form state via props from useSuperadminAffiliatesManagementPage. No API calls. |
| components/affiliates_management_stats_bar/SuperadminAffiliatesManagementStatsBar.tsx | Renders/orchestrates SuperadminAffiliatesStatsBar within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_status_badge/SuperadminAffiliatesManagementAffiliateStatusBadge.tsx | Renders/orchestrates SuperadminAffiliatesAffiliateStatusBadge within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_table/SuperadminAffiliatesManagementTable.tsx | Renders/orchestrates SuperadminAffiliatesTable within its owning Superadmin feature module; no direct backend implementation. |
| components/affiliates_management_table/SuperadminAffiliatesManagementTableRow.tsx | Renders/orchestrates SuperadminAffiliatesTableRow within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows

### Route identity evidence

- Leaf route-entry directory: `/frontend_superadmin/superadmin_affiliates/affiliates_management/` (filesystem-derived from this ZIP).
- Leaf entry file present: `page.tsx` = `present`.
- Configured parent/compatibility route value: `/frontend_superadmin/superadmin_affiliates/affiliates_management`.
- Where a parent route shim exists, its redirect and query forwarding are governed by the actual `page.tsx` implementation and the route regression tests; this text does not define a new alias.
- API endpoint paths listed in Section 4 are backend request URLs, not browser page routes.
- Any route alias not evidenced by a route-entry file or the centralized URL config is `NOT_VERIFIED_IN_SCOPE`; retain existing behavior and do not invent routes.

### Navigation behavior source of truth

- Start with the route-entry files and the component tree imported by `page.tsx`.
- Use the feature-owned API operation and mutation inventories in Sections 4 and 6 to identify supported actions.
- Direct detail/add routes outside this leaf are not declared by this leaf contract. Existing Gym legacy route placement and System Ops ownership remain tracked contract exceptions.

## 4. API Contract & UI Data Requirements

### API-client callsites observed in source

The table below records `apiFetch` callsites from this leaf’s `api/` directory. A method shown as `OMITTED_AT_CALLSITE` was not explicitly supplied at the callsite; the host transport default is not verified from this role-only ZIP. Endpoint expressions and schema names are preserved from code, not inferred from backend conventions.

| Operation property | Method | Endpoint expression | Generic response data type | Runtime schema option | Idempotency key present | Source file |
| --- | --- | --- | --- | --- | --- | --- |
| `fetchAffiliates` | `OMITTED_AT_CALLSITE` | ``${SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST}${q}`` | `Affiliate[]` | dataSchema | no / not evidenced in this call | `superadmin_affiliates_management.api.ts` |
| `createAffiliate` | `"POST"` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST` | `Affiliate` | dataSchema | yes | `superadmin_affiliates_management.api.ts` |
| `updateAffiliate` | `"PATCH"` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id)` | `Affiliate` | dataSchema | yes | `superadmin_affiliates_management.api.ts` |
| `updateAffiliateStatus` | `"PATCH"` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.STATUS(id)` | `Affiliate` | dataSchema | yes | `superadmin_affiliates_management.api.ts` |
| `deleteAffiliate` | `"DELETE"` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id)` | `void` | dataSchema | yes | `superadmin_affiliates_management.api.ts` |
| `payAffiliateCommission` | `"POST"` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAY_COMMISSION(id)` | `Affiliate` | dataSchema | yes | `superadmin_affiliates_management.api.ts` |
| `fetchPayoutHistory` | `OMITTED_AT_CALLSITE` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAYOUT_HISTORY` | `AffiliatePayoutRecord[]` | dataSchema | no / not evidenced in this call | `superadmin_affiliates_management.api.ts` |

### Canonical URL configuration values observed in source

| Config symbol / property | Declared value |
| --- | --- |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[BASE]` | `"/superadmin/affiliates"` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[LIST]` | `"/superadmin/affiliates"` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[CREATE]` | `"/superadmin/affiliates"` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[DETAIL]` | `(id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}`` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[STATUS]` | `(id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}/status`` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[DELETE]` | `(id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}`` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[PAY_COMMISSION]` | `(id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}/pay`` |
| `SUPERADMIN_AFFILIATES_MANAGEMENT_API[PAYOUT_HISTORY]` | `"/superadmin/affiliates/payout-history"` |

### Route config and contract boundaries

- URL config file(s): `superadmin_affiliates_management.url_config.ts`.
- Configured `*_ROUTES.MAIN` value: `"/frontend_superadmin/superadmin_affiliates"`.
- Response field shapes and mutation payloads are governed by the TypeScript/Zod schemas and function signatures in this leaf; values not declared there must not be invented.
- Public URL aliases/rewrites outside the supplied role tree and live backend behavior are `NOT_VERIFIED_IN_SCOPE`.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_affiliates_management.api.ts:22 | GET | `${SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST}${q}` | Present |
| api/superadmin_affiliates_management.api.ts:24 | POST | SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST | Present |
| api/superadmin_affiliates_management.api.ts:27 | PATCH | SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id) | Present |
| api/superadmin_affiliates_management.api.ts:30 | PATCH | SUPERADMIN_AFFILIATES_MANAGEMENT_API.STATUS(id) | Present |
| api/superadmin_affiliates_management.api.ts:33 | DELETE | SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id) | Present |
| api/superadmin_affiliates_management.api.ts:36 | POST | SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAY_COMMISSION(id) | Present |
| api/superadmin_affiliates_management.api.ts:39 | GET | SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAYOUT_HISTORY | Present |
| api/superadmin_affiliates_management_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_affiliates_management.types.ts`, `types/superadmin_affiliates_management_affiliate_modal.types.ts`, `types/superadmin_affiliates_management_affiliate_status_badge.types.ts`, `types/superadmin_affiliates_management_empty_state.types.ts`, `types/superadmin_affiliates_management_header.types.ts`, `types/superadmin_affiliates_management_main.types.ts`, `types/superadmin_affiliates_management_mutation.types.ts`, `types/superadmin_affiliates_management_next_error_props.types.ts`, `types/superadmin_affiliates_management_payout_history.types.ts`, `types/superadmin_affiliates_management_stats_bar.types.ts`, `types/superadmin_affiliates_management_table.types.ts`, `types/superadmin_affiliates_management_table_row.types.ts`.

Validation schemas: `schemas/superadmin_affiliates_management_api.schemas.ts`, `schemas/superadmin_affiliates_management_types.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 61 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

### `api/superadmin_affiliates_management.query_keys.ts`

```typescript
/**
 * @description Canonical TanStack Query key registry for the superadmin affiliates feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_AFFILIATES_QUERY_KEYS = {
  all: ['superadmin_affiliates', 'affiliates'] as const,
  lists: () => [...SUPERADMIN_AFFILIATES_QUERY_KEYS.all, 'list'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => [...SUPERADMIN_AFFILIATES_QUERY_KEYS.lists(), queryParams] as const,
  payoutHistory: ['superadmin_affiliates', 'affiliates', 'payout-history'] as const,
} as const;
```

### `api/superadmin_affiliates_management.query_keys.ts`

```typescript
/**
 * @description Canonical TanStack Query key registry for the superadmin affiliates feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_AFFILIATES_QUERY_KEYS = {
  all: ['superadmin_affiliates', 'affiliates'] as const,
  lists: () => [...SUPERADMIN_AFFILIATES_QUERY_KEYS.all, 'list'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => [...SUPERADMIN_AFFILIATES_QUERY_KEYS.lists(), queryParams] as const,
  payoutHistory: ['superadmin_affiliates', 'affiliates', 'payout-history'] as const,
} as const;
```

The list query key includes all request-shaping parameters. Successful affiliate mutations invalidate the complete affiliate query-key prefix (including payout history); no captured filtered/page query is manually patched after invalidation.

## 6. Mutation Inventory & Lifecycle Operations

| Function | Method evidence | URL expression | Source file |
| --- | --- | --- | --- |
| `fetchAffiliates` | `GET`; optional query serialized with `URLSearchParams`; response `Affiliate[]` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST` + query string | `api/superadmin_affiliates_management.api.ts` |
| `createAffiliate` | `POST`; JSON body; `Idempotency-Key`; response `Affiliate` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.LIST` | `api/superadmin_affiliates_management.api.ts` |
| `updateAffiliate` | `PATCH`; JSON body; `Idempotency-Key`; response `Affiliate` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id)` | `api/superadmin_affiliates_management.api.ts` |
| `updateAffiliateStatus` | `PATCH`; JSON status body; `Idempotency-Key`; response `Affiliate` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.STATUS(id)` | `api/superadmin_affiliates_management.api.ts` |
| `deleteAffiliate` | `DELETE`; `Idempotency-Key`; void data schema | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.DETAIL(id)` | `api/superadmin_affiliates_management.api.ts` |
| `payAffiliateCommission` | `POST`; `Idempotency-Key`; response `Affiliate` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAY_COMMISSION(id)` | `api/superadmin_affiliates_management.api.ts` |
| `fetchPayoutHistory` | `GET`; response `AffiliatePayoutRecord[]` | `SUPERADMIN_AFFILIATES_MANAGEMENT_API.PAYOUT_HISTORY` | `api/superadmin_affiliates_management.api.ts` |

**Mutation safety evidence:** all five write operations supply idempotency keys generated by the feature mutation hook. A key is retained for a retry with the same intent and cleared on success. The shared mutation hook invalidates the affiliate query-key prefix before running caller success effects; no post-invalidation filtered/page cache patch is applied. Server-side idempotency enforcement and live backend semantics remain `NOT_VERIFIED`.

## 7. Permissions and Role Rules

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_affiliates_forbidden.md`; frontend checks do not replace backend authorization.

- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

Backend authorization is authoritative. Any omitted host session/permission contract is an explicit integration dependency, not permission to infer a role or expose protected fields.

## 8. State Ownership & Architecture Flow

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

- **Server state:** TanStack Query is used for API-backed async data where present.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** `useUrlState` detected for shareable list/filter state.
- **Query-key registries:** `api/superadmin_affiliates_management.query_keys.ts`
- **Module MSW handlers:** `mocks/handlers/SuperadminAffiliatesManagementMockHandlers.ts`
- **Module MSW fixtures:** `mocks/fixtures/SuperadminAffiliatesManagementMockFixtures.ts`, `mocks/fixtures/SuperadminAffiliatesManagementPayoutHistoryMockFixtures.ts`

- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

### Files observed in state ownership

| State file | Observed role |
| --- | --- |
| state/SuperadminAffiliatesManagementGitkeep | Module-local state artifact; semantics must be confirmed from its exports before changes. |

Server data is expected to remain under the existing TanStack Query integration; the structural move does not change state ownership behavior.

## 9. Offline, Loading, Empty, and Error States

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

The current source scan does not establish a complete offline/reconnect contract. Do not claim offline support from retry handlers alone. If reconnect reconciliation is a product requirement, record it as `CONTRACT_INCOMPLETE` until a verified backend/client contract is supplied.

## 10. Security and PII Rules (Data Masking & Guards)

### Existing forbidden-pattern contract

# superadmin_affiliates — Forbidden Patterns

The following are forbidden inside this module:

- Cross-feature business imports or sibling-module business utilities.
- Raw `fetch`/`axios` from components.
- Direct TanStack mutations from components.
- Hardcoded backend/API URLs in UI or API wrappers outside URL config.
- Inline query-key arrays when the module query-key registry exists.
- Hardcoded business status literals or currency symbols in JSX.
- Secrets/tokens/passwords/payment data in browser storage.
- `any`, `@ts-ignore`, `@ts-nocheck`, `console.log`.
- Placeholder/fake controls that do not complete a real UI → state/API → feedback → UI loop.
- Snapshot-only or serialization-only tests as the sole proof of a user workflow.
- Raw technical error details shown to users.
- New shared business utilities created merely to reduce duplication.

## Repair discipline
When a violation is found, repair the owning module rather than broadening the blast radius. If a rule genuinely requires application infrastructure, document that dependency before changing it.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.

### Implementation evidence scan

| File | Line | Source evidence |
| --- | --- | --- |
| api/superadmin_affiliates_management.api.ts | 26 | method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema, |
| api/superadmin_affiliates_management.api.ts | 29 | method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), dataSchema: AffiliateRecordSchema, |
| api/superadmin_affiliates_management.api.ts | 32 | method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify({ status }), dataSchema: AffiliateRecordSchema, |
| api/superadmin_affiliates_management.api.ts | 35 | method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminAffiliatesDeleteDataSchema, |
| api/superadmin_affiliates_management.api.ts | 38 | method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: AffiliateRecordSchema, |
| error.tsx | 17 | * @dependencies Uses the existing module logger and approved semantic design tokens; no feature business data is owned here. |
| tests/mocks/affiliates_management_handlers/SuperadminAffiliatesManagementMockHandlers.test.ts | 34 | headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'affiliate-create-1' }, |

The current RBG repair extracted the page query/pagination lifecycle into `hooks/useSuperadminAffiliatesManagementPageQueries.ts` and kept the page orchestrator below the 150-line ceiling; A clean security assessment is not claimed until RBG2/RBG3 verify storage, logging, authorization boundaries, mutation keys and user-safe error handling.

## 11. Accessibility Requirements (A11y)


### Canonical theme and responsive contract

The authoritative exact token inventory for this leaf is [`superadmin_affiliates_management_theme_contract.md`](superadmin_affiliates_management_theme_contract.md). Do not copy or redefine global token mappings here. The global token source (`globals.css` and Tailwind `@theme inline`) is host-owned and not included in this role ZIP, so token definition/mapping existence remains `NOT_VERIFIED_IN_SCOPE`.

Implement focus indicators, keyboard support, semantic labels, sufficient contrast, responsive collapse, and reduced-motion-safe transitions according to `WEB_FRONTEND_UI_UX_DESIGN.md` and the architecture document. Source-level findings are listed in the RBG3 checkpoint; live browser accessibility behavior remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

No background-task contract is inferred from a token match alone. The supplied frontend source may consume real-time host capabilities, but event lifecycle, cleanup, retry and authorization require explicit evidence before behavior changes.

## 13. Feature Flags & Tenant Settings

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

If no flag source is found, that means the provided module source did not expose a flag declaration; it does not prove that the product has no host-managed flag system. Flag semantics are `NOT_VERIFIED` unless documented in the master contract or typed configuration.

## 14. Cache Invalidation & Consistency

| File | Line | Source evidence |
| --- | --- | --- |
| hooks/useSuperadminAffiliatesManagementMutation.ts | 30 | await queryClient.invalidateQueries({ queryKey: SUPERADMIN_AFFILIATES_QUERY_KEYS.all }); |
| hooks/useSuperadminAffiliatesManagementPage.ts | 76 | queryClient.setQueryData(queryKey, (previous: typeof affiliatesResponse \| undefined) => { |
| tests/hooks/useSuperadminAffiliatesManagementMutation.test.tsx | 18 | const invalidateQueries = vi.spyOn(client, 'invalidateQueries').mockResolvedValue(); |
| tests/hooks/useSuperadminAffiliatesManagementMutation.test.tsx | 26 | expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: SUPERADMIN_AFFILIATES_QUERY_KEYS.all }); |

The mutation path uses prefix invalidation rather than optimistic row patching. Refetched query responses are authoritative for all filtered/page variants; server-side idempotency enforcement remains outside the supplied source boundary.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

**Frontend route ownership:** the route entry is physically owned by `superadmin_affiliates/affiliates_management/page.tsx` and resolves to `/frontend_superadmin/superadmin_affiliates/affiliates_management`. Alias-only page files are not duplicated. Historical compatibility redirects are not specified because the original route-preservation evidence was not included in the supplied archive; compare this physical route with the host route registry before adding a redirect. The current physical route matrix is in `INTEGRATION_GUIDE.md`. Host redirect/API collision checks remain `DEFERRED_TO_HOST_RUNTIME`.

**API/data migration:** no backend API endpoint or request/response contract was intentionally changed in this batch. No database migration evidence is included in the supplied frontend ZIP.

**Source rollback:** restore the pre-RBG1 source snapshot/previous `frontend-superadmin-v4-fix.zip` if the migration must be reverted, including the import graph and directory tree as one unit. Do not roll back only the route shims or only the moved components.

## 16. Test Coverage Map & Quality Gates

**Test files in leaf:** 9

- `tests/SuperadminAffiliatesManagementBasic.test.tsx`
- `tests/SuperadminAffiliatesManagementTableRow.test.tsx`
- `tests/hooks/useSuperadminAffiliatesManagementMutation.test.tsx`
- `tests/hooks/useSuperadminAffiliatesManagementMutations.test.tsx`
- `tests/hooks/useSuperadminAffiliatesManagementPage.test.ts`
- `tests/mocks/affiliates_management_handlers/SuperadminAffiliatesManagementMockHandlers.test.ts`
- `tests/utils/SuperadminAffiliatesManagementFormatCurrency.test.ts`
- `tests/utils/SuperadminAffiliatesManagementFormatters.test.ts`
- `tests/utils/SuperadminAffiliatesManagementQueryUtils.test.ts`

Tests are inventoried, not asserted to pass. Vitest/RTL execution and MSW scenario coverage are assigned to RBG3; host runtime and browser E2E remain separately reported as `DEFERRED_TO_HOST_RUNTIME` where unavailable.

## 17. Architecture Exceptions (ADRs)

No `// architecture-exception:` marker was found in this leaf during this static scan. This does not approve cross-feature adapter imports; the role-shell dependency placement is tracked as `BLOCKED_BY_SUPPLIED_CONTRACT` because host infrastructure is outside the ZIP.

The role-level layout/navigation dependencies remain visible in imports because the supplied ZIP does not include the host application tier. Their placement cannot be silently changed or fabricated; the corresponding dependency finding remains `BLOCKED_BY_SUPPLIED_CONTRACT` until the authorized host contract is resolved.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log

| Finding | Severity | Known gap | Closure evidence required |
| --- | --- | --- | --- |
| SA-001 | P0 | Role/domain roots violate canonical quarantine and category-folder names | Every file has one canonical owner, root/category/depth invariant passes, and route/import checks produce zero unexplained violations. |
| SA-003 | P0 | Cross-feature dependency graph conflicts with module isolation and role-infrastructure boundary | Every dependency edge has a valid owner/contract, all forbidden cross-feature business imports are zero, and any irreconcilable role adapter placement is explicitly blocked rather than falsely marked compliant. |
| SA-006 | P2 | Documentation trio is not attached to autonomous leaf modules in canonical format | Every terminal autonomous leaf contains complete, source-grounded documentation trio, host stubs, standalone harness and a passing doc-contract check. |

Any endpoint, DTO field, response envelope, permission, flag or mutation behavior not evidenced in the actual URL config, API facade, Zod schema, TypeScript types, feature specification or mock fixtures must remain `NOT_VERIFIED`. The structural migration did not invent such contracts.

## 19. Rule Compliance Checklist (35+ Verification Items)

The following 35 checks describe the status at this RBG1 checkpoint. `NOT_VERIFIED` is intentionally distinct from `PASS`; the checklist must be refreshed after the later RBGs and final Section 43P gate.

| # | Control | Status | Evidence / next verification |
| --- | --- | --- | --- |
| 1 | Domain root quarantine | PASS | Root page is compatibility redirect; master trio retained. |
| 2 | Canonical leaf name | PASS | `affiliates_management/` is the terminal feature leaf. |
| 3 | Canonical category names | PASS | Mapped to standard category directory names in migration manifest. |
| 4 | Centralized URL config location | PASS | config/superadmin_affiliates_management.url_config.ts |
| 5 | Feature documentation trio present | PASS | Generated under this leaf at RBG1. |
| 6 | Ambient host stubs present | PASS | Generated from normative architecture stub contract. |
| 7 | Import paths resolve inside supplied role ZIP | PASS | RBG1 AST rewrite report: 0 unresolved internal role aliases. |
| 8 | Relative import resolution | PASS | RBG1 AST rewrite report: 0 unresolved relative imports. |
| 9 | TypeScript/TSX parser syntax | PASS | RBG1 AST parser report: 0 parser diagnostics before route shim generation; post-swap recheck pending. |
| 10 | Legacy route entry preserved | PASS | Old filesystem route has a redirect shim. |
| 11 | Query-string preservation | PASS | Root shim appends all values from typed searchParams. |
| 12 | API endpoint strings unchanged | PASS | The migration changes import/path names only; endpoint constant content was copied verbatim. |
| 13 | API envelope contract | NOT_VERIFIED | Requires source-to-normative envelope/type verification in RBG2. |
| 14 | Mutation idempotency key lifecycle | NOT_VERIFIED | Requires operation-by-operation lifecycle audit in RBG2. |
| 15 | No guessed API endpoints or fields | PASS | No endpoint or DTO fields were introduced by the structural migration. |
| 16 | Query-key registry | NOT_VERIFIED | See exact registry evidence above; invalidation semantics audited in RBG2. |
| 17 | Mutation cache invalidation | NOT_VERIFIED | Evidence captured above; semantics not yet re-audited. |
| 18 | Mutable mock state | NOT_VERIFIED | Mutable scenario behavior is audited in RBG3. |
| 19 | Unit/component test adequacy | NOT_VERIFIED | Test files inventoried; execution and assertions are deferred to RBG3/host. |
| 20 | Standalone test harness | NOT_VERIFIED | Standalone bootstrap/harness verification remains in RBG3. |
| 21 | WCAG 2.2 AA keyboard behavior | NOT_VERIFIED | Dedicated accessibility audit remains in RBG3. |
| 22 | Semantic theme tokens | NOT_VERIFIED | Token parity/forbidden-value scan remains in RBG3. |
| 23 | Dark/light theme contrast | NOT_VERIFIED | Theme contract exists; runtime contrast verification remains in RBG3/host. |
| 24 | Responsive layout breakpoints | NOT_VERIFIED | Responsive verification remains in RBG3/host. |
| 25 | Loading/empty/error/recovery states | NOT_VERIFIED | Source docs excerpt recorded; control-by-control verification remains in RBG2/RBG3. |
| 26 | Localized EN/HI parity | NOT_VERIFIED | Locale files moved; exact key parity scan is scheduled for RBG4. |
| 27 | Component line ceilings | NOT_VERIFIED | Full file ceiling scan remains in RBG4. |
| 28 | Hook/store/schema/API line ceilings | NOT_VERIFIED | Full file ceiling scan remains in RBG4. |
| 29 | Barrel-file prohibition | NOT_VERIFIED | Full no-index recheck remains in RBG4. |
| 30 | No cross-feature business imports | BLOCKED_BY_SUPPLIED_CONTRACT | Role shell and navigation adapter placement conflicts with module isolation; do not invent host infrastructure. |
| 31 | External dependency budget | NOT_VERIFIED | Dependency-edge classification remains open under SA-003. |
| 32 | Security/PII storage rules | NOT_VERIFIED | Requires RBG2/RBG3 source audit; no security posture is inferred. |
| 33 | Functional closure of interactive controls | NOT_VERIFIED | Action trace in frozen inventory will be repaired/audited in RBG2/RBG3. |
| 34 | Performance/debounce budgets | NOT_VERIFIED | Coupon/Plans/Reports debounce fixes are RBG2. |
| 35 | Feature ZIP portability 8/8 | NOT_VERIFIED | Source leaf now has categories, docs and stubs; runtime/test portability still needs RBG3 and final gate. |

## 20. Standalone Run, Mock & Test Harness

**Canonical leaf path:** `src/app/frontend_superadmin/superadmin_affiliates/affiliates_management/` (archive-relative path: `frontend_superadmin/superadmin_affiliates/affiliates_management/`).

### Source-present standalone assets

| Artifact | Evidence / status |
| --- | --- |
| Vitest/RTL test source | `12` TypeScript/TSX test files are present; execution is `NOT_VERIFIED_IN_SCOPE` because the supplied archive has no host root package manifest, installed Vitest, or host TypeScript config. |
| Module-owned MSW handlers | `1` handler file(s) present in this leaf. |
| Module-owned fixtures/data | `2` fixture/data file(s) present in this leaf. |
| Harness wrapper | `tests/harness/SuperadminAffiliatesManagementHarness.tsx` — local `NextIntlClientProvider` and `QueryClientProvider` wrapper. |
| Harness/bootstrap | `tests/harness/SuperadminAffiliatesManagementHarnessBootstrap.ts` — registers the owning leaf's handlers and exposes start/reset/stop plus isolated QueryClient functions. |
| Scenario contract | `mocks/scenarios/superadmin_affiliates_management.scenarios.ts` — explicit ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED response scenarios; ACTIVE/EMPTY payloads are passed from this leaf's fixtures rather than invented here. |
| Scenario regression tests | `1` focused file(s) under `tests/mocks/scenarios/`; source-authored, runner execution not verified. |
| Host stubs | `contracts/host-stubs.d.ts` is intended for isolated type compatibility only; it is not an implementation of host runtime services. |

### Endpoint and scenario selection

- **Primary configured API endpoint for the scenario harness:** `SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE` in `config/superadmin_affiliates_management.url_config.ts`. The API literal remains owned by the config; do not hardcode a parallel copy in production modules.
- **Test scenario query:** append `?__mockScenario=ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, or `UNAUTHORIZED` to that configured endpoint when the feature's scenario handler is installed by the test server. The scenario override is a test/mock facility and does not modify the production API URL or assume the host has enabled runtime scenario toggles.
- **Role/auth fixture:** no host credentials or verified session-claim payload was supplied. Use the host's approved Superadmin test identity; do not invent credentials or treat the API-level 401 scenario as proof of all route-guard behavior.

### Host verification commands (not executed in this environment)

```bash
npm run test -- src/app/frontend_superadmin/superadmin_affiliates/affiliates_management/tests
npx tsc --noEmit
npm run lint
```

These commands require the target host project root, its locked dependencies and its real alias/provider configuration. Source parser/import checks are not substitutes for a semantic host typecheck or test execution.



### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminAffiliatesManagementDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide

1. **Folder transfer:** copy `src/app/frontend_superadmin/superadmin_affiliates/affiliates_management/` as the autonomous leaf. Keep the role-domain master docs and any compatibility route shim in the containing archive when the documented route-preservation matrix requires them; do not pull sibling feature business code into this leaf.
2. **Core contracts:** provide the verified host API transport, auth/session and permission providers, logger/error-monitoring adapter, socket/display-value adapters where used, zero-business UI primitives, `next-intl` messages/provider, Tailwind semantic token mapping, and TanStack Query provider. `contracts/host-stubs.d.ts` is type-only and must not be mistaken for runtime implementations.
3. **Route and URL configuration:** preserve `config/superadmin_affiliates_management.url_config.ts` and the exported `SUPERADMIN_AFFILIATES_MANAGEMENT_API` contract exactly. Confirm the host's route prefix and rewrite behavior against the route-preservation matrix; endpoint literals must not be rewritten by inference.
4. **Verification and mocks:** run the leaf tests, the focused mock scenario regression file, `npx tsc --noEmit`, lint and the owning Playwright E2E suite in the actual host. Confirm mutable fixture reset between tests and inspect all five scenario outcomes. Authenticated browser checks remain `DEFERRED_TO_HOST_RUNTIME` until a host base URL, approved storage state and browser runner exist.



### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/Feedback/ConfirmProvider |
| @/components/ui/Pagination |
| @/components/ui/Tooltip |
| @/lib/logger |
| @/hooks/useDebouncedValue |
| @/hooks/useUrlState |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)

**Current version:** `5` (Superadmin frontend repair, RBG4 checkpoint, 2026-10-23). **Commit:** `not produced in this source-only environment`.

**Portability score:** `NOT_YET_VERIFIED`; target required by the normative architecture is **8/8** before final delivery. The following criteria must be evidenced at the final gate:

| Criterion | Current status |
| --- | --- |
| ZIP self-sufficiency and standalone compilation | `NOT_VERIFIED_IN_SCOPE` — host package manifest, root tsconfig and installed dependencies are not supplied. |
| Zero cross-module business imports | `BLOCKED_BY_SUPPLIED_CONTRACT` where the route/navigation/role-shell adapter boundary remains unresolved; see the dependency and route matrices. |
| Mock parity and scenario completeness | `SOURCE_ADDED; EXECUTION_NOT_VERIFIED` — fixture-backed ACTIVE/EMPTY plus SERVER_500, TIMEOUT and UNAUTHORIZED scenario handlers and tests are present; Vitest is unavailable here. |
| Standalone harness/bootstrap | `SOURCE_ADDED; EXECUTION_NOT_VERIFIED` — provider harness and module-owned MSW lifecycle bootstrap are present. |
| Theme-token integrity | `STATIC_SCAN_CLEAN_FOR_RAW_COLORS_AND_SEMANTIC_OPACITY`; host `globals.css` / `@theme inline` mapping remains `NOT_VERIFIED_IN_SCOPE`. |
| Loading/empty/error states and recovery | `SOURCE_AUDITED; HOST_VISUAL_VERIFICATION_DEFERRED` — verify each state and recovery interaction in host runtime. |
| Mutation idempotency and duplicate-action safety | `67/67` scoped state-changing call sites had `Idempotency-Key`; duplicate-action behavior still requires feature/host execution evidence. |
| Responsive breakpoints and no horizontal overflow | `DEFERRED_TO_HOST_RUNTIME` — static class inspection does not prove no overflow at required viewport widths. |


### Revision history

| Version/Batch | Date | Author | Change | Verification |
|---|---|---|---|---|
| RBG4 | 2026-10-23 | AI repair | Moved feature-owned constants/query-key/filter configuration into canonical leaf `config/`; normalized three debounce hook and test filenames; refreshed source dependency/state comments and version references. | Static path/import parse and source scans are clean; host typecheck, unit tests and browser runtime remain deferred. |
| RBG3 | 2026-10-23 | AI repair | Added module-local harness/bootstrap, fixture-backed five-scenario handlers/tests, accessibility/touch-target fixes and refreshed host-verification guidance. | Source parsing and static checks clean; runtime execution not verified. |
| RBG2 | 2026-10-23 | AI repair | Added server-search debounce, canonical URL config exports/placement, API envelope generic corrections, and localized feature-rollout error feedback. | Static source/import checks clean; host tests/runtime not verified. |
| RBG1 | 2026-10-23 | AI repair | Created autonomous leaf documentation trio, host stubs, preserved route compatibility shims and corrected local mock paths. | Structural/static checks clean for verified scope; Gym/System Ops route/ownership exceptions remain blocked by supplied contract. |

### Retained parent contract sections for detailed business context

The domain-level master documents remain authoritative for long-form user flows, existing API narratives, business edge cases, and module-specific constraints. The exact source excerpts incorporated above are from `superadmin_affiliates_features.md`; consult that master file before making changes where this leaf contract identifies a gap.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

