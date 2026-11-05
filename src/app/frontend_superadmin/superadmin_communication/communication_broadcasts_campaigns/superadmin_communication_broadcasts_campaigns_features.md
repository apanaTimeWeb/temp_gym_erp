---
feature: "superadmin_communication_broadcasts_campaigns"
owner_role: "superadmin"
module_version: 18
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_YET_VERIFIED (target 8/8)"
---

# Superadmin Broadcasts Campaigns — Autonomous Sub-Module Contract

This specification was generated from the supplied Superadmin web ZIP and the original domain feature contract `superadmin_communication_broadcasts_features.md`. The inherited master contract remains at the parent domain root; this leaf document records the current autonomous leaf ownership after RBG1 structural migration. Any unknown contract is explicitly marked `NOT_VERIFIED` or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than inferred.

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Broadcast drafting, scheduling and recipient-delivery tracking; the queue modal remains part of the broadcast lifecycle. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

### Route-entry evidence

| Entry file | Filesystem-derived route | Evidence boundary |
| --- | --- | --- |
| `page.tsx` | `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `loading.tsx` | `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns (loading.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `error.tsx` | `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns (error.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `not-found.tsx` | `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns (not-found.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |

### Leaf-owned artifact inventory

| Category | File count | Notes |
| --- | ---: | --- |
| `components/` | 14 | Example: `components/SuperadminCommunicationBroadcastsCampaignsRouteLoadingSkeleton.tsx` |
| `hooks/` | 12 | Example: `hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery.ts` |
| `api/` | 2 | Example: `api/superadmin_communication_broadcasts_campaigns.api.ts` |
| `state/` | 1 | Example: `state/SuperadminCommunicationBroadcastsCampaignsGitkeep` |
| `types/` | 7 | Example: `types/superadmin_communication_broadcasts_campaigns.types.ts` |
| `schemas/` | 4 | Example: `schemas/superadmin_communication_broadcasts_campaigns_aliases.schemas.ts` |
| `utils/` | 2 | Example: `utils/SuperadminCommunicationBroadcastsCampaignsBroadcastScheduleUtils.ts` |
| `mocks/` | 3 | Example: `mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures.ts` |
| `tests/` | 23 | 20 `*.test.ts`/`*.test.tsx` spec files plus 3 harness/support files |
| `config/` | 3 | Example: `api/superadmin_communication_broadcasts_campaigns.query_keys.ts` |
| `contracts/` | 1 | Example: `contracts/host-stubs.d.ts` |
| `locales/` | 2 | Example: `locales/superadmin_communication_broadcasts_campaigns_en.json` |

**Total leaf files:** 81.
**Direct leaf-root files:** `error.tsx`, `loading.tsx`, `not-found.tsx`, `page.tsx`, `superadmin_communication_broadcasts_campaigns_features.md`, `superadmin_communication_broadcasts_campaigns_forbidden.md`, `superadmin_communication_broadcasts_campaigns_theme_contract.md`.

This inventory is generated from the current v12 working tree. Test-source counts are distinct from harness/bootstrap support files; host test execution remains unverified.

### Direct leaf-root files

- `error.tsx`
- `loading.tsx`
- `not-found.tsx`
- `page.tsx`

This inventory is generated from the current filesystem and is authoritative for file placement only. Component responsibility and supported business behavior must be inferred from the actual source implementation, not from filenames alone.



### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminCommunicationBroadcastsCampaignsPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for communication_broadcasts_campaigns, with no sibling-module dependencies. |
| components/SuperadminCommunicationBroadcastsCampaignsRouteLoadingSkeleton.tsx | Renders Superadmin Communication Broadcasts Campaigns Route Loading Skeleton using its declared props and feature-local hooks. |
| components/SuperadminCommunicationBroadcastsCampaignsStatusField.tsx | Renders Superadmin Communication Broadcasts Campaigns Status Field using its declared props and feature-local hooks. |
| components/broadcasts_campaigns_broadcast_status_badge/SuperadminCommunicationBroadcastsCampaignsBroadcastStatusBadge.tsx | Renders/orchestrates SuperadminCommunicationBroadcastsBroadcastStatusBadge within its owning Superadmin feature module; no direct backend implementation. |
| components/broadcasts_campaigns_empty_state/SuperadminCommunicationBroadcastsCampaignsEmptyState.tsx | Renders/orchestrates SuperadminCommunicationBroadcastsEmptyState within its owning Superadmin feature module; no direct backend implementation. |
| components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsMessageFields.tsx | Renders Superadmin Communication Broadcasts Campaigns Message Fields using its declared props and feature-local hooks. |
| components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsScheduleFields.tsx | Renders Superadmin Communication Broadcasts Campaigns Schedule Fields using its declared props and feature-local hooks. |
| components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsSendConfirmationFields.tsx | Renders Superadmin Communication Broadcasts Campaigns Send Confirmation Fields using its declared props and feature-local hooks. |
| components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsTargetGymSelector.tsx | Renders Superadmin Communication Broadcasts Campaigns Target Gym Selector using its declared props and feature-local hooks. |
| components/broadcasts_campaigns_header/SuperadminCommunicationBroadcastsCampaignsHeader.tsx | Renders/orchestrates SuperadminCommunicationBroadcastsHeader within its owning Superadmin feature module; no direct backend implementation. |
| components/broadcasts_campaigns_main/SuperadminCommunicationBroadcastsCampaignsMain.tsx | Renders and orchestrates SuperadminCommunicationBroadcastsMain for the owning Superadmin feature module; presentation stays free of direct API calls. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastModal.tsx | Renders and composes SuperadminCommunicationBroadcastsBroadcastModal for the owning feature module; business logic and API transport remain in module-owned hooks/services. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | Renders/orchestrates SuperadminCommunicationBroadcastsBroadcastQueueModal within its owning Superadmin feature module; no direct backend implementation. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsSendNowConfirmationDialog.tsx | Renders Superadmin Communication Broadcasts Campaigns Send Now Confirmation Dialog using its declared props and feature-local hooks. |
| components/broadcasts_campaigns_table/SuperadminCommunicationBroadcastsCampaignsTable.tsx | Renders/orchestrates SuperadminCommunicationBroadcastsTable within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows

### Route identity evidence

- Leaf route-entry directory: `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/` (filesystem-derived from this ZIP).
- Leaf entry file present: `page.tsx` = `present`.
- Configured parent/compatibility route value: `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns`.
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
| `fetchBroadcasts` | `OMITTED_AT_CALLSITE` | ``${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE}${q}`` | `Broadcast[]` | dataSchema | no / not evidenced in this call | `superadmin_communication_broadcasts_campaigns.api.ts` |
| `createBroadcast` | `"POST"` | `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE` | `Broadcast` | dataSchema | yes | `superadmin_communication_broadcasts_campaigns.api.ts` |
| `deleteBroadcast` | `"DELETE"` | `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id)` | `Record<string, unknown>` | dataSchema | yes | `superadmin_communication_broadcasts_campaigns.api.ts` |
| `updateBroadcast` | `"PATCH"` | `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id)` | `Broadcast` | dataSchema | yes | `superadmin_communication_broadcasts_campaigns.api.ts` |
| `fetchTenants` | `OMITTED_AT_CALLSITE` | `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.TENANTS` | `SuperadminCommunicationBroadcastsTenant[]` | dataSchema | no / not evidenced in this call | `superadmin_communication_broadcasts_campaigns.api.ts` |
| `fetchRecipientCount` | `OMITTED_AT_CALLSITE` | `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.RECIPIENT_COUNT` | `{
        count: number;
    }` | dataSchema | no / not evidenced in this call | `superadmin_communication_broadcasts_campaigns.api.ts` |
| `deliverBroadcastToRecipient` | `"POST"` | `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DELIVER_TO_RECIPIENT(broadcastId, recipientId)` | `SuperadminBroadcastDeliveryResult` | dataSchema | yes | `superadmin_communication_broadcasts_campaigns.api.ts` |

### Canonical URL configuration values observed in source

| Config symbol / property | Declared value |
| --- | --- |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[BASE]` | `"/superadmin/broadcasts"` |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[TENANTS]` | `"/superadmin/gyms"` |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[DETAIL]` | `(id: string) => `/superadmin/broadcasts/${encodeURIComponent(id)}`` |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[DETAIL_PATTERN]` | `"/superadmin/broadcasts/:id"` |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[RECIPIENT_COUNT]` | `"/superadmin/broadcasts/recipient-count"` |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[DELIVER_TO_RECIPIENT]` | `(broadcastId: string, recipientId: string) => `/superadmin/broadcasts/${encodeURIComponent(broadcastId)}/deliveries/${encodeURIComponent(recipientId)}`` |
| `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API[DELIVER_TO_RECIPIENT_PATTERN]` | `"/superadmin/broadcasts/:id/deliveries/:recipientId"` |

### Route config and contract boundaries

- URL config file(s): `superadmin_communication_broadcasts_campaigns.url_config.ts`.
- Configured `*_ROUTES.MAIN` value: `"/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns"`.
- Response field shapes and mutation payloads are governed by the TypeScript/Zod schemas and function signatures in this leaf; values not declared there must not be invented.
- Public URL aliases/rewrites outside the supplied role tree and live backend behavior are `NOT_VERIFIED_IN_SCOPE`.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_communication_broadcasts_campaigns.api.ts:26 | GET | `${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE}${q}` | Present |
| api/superadmin_communication_broadcasts_campaigns.api.ts:28 | POST | SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE | Present |
| api/superadmin_communication_broadcasts_campaigns.api.ts:32 | DELETE | SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id) | Present |
| api/superadmin_communication_broadcasts_campaigns.api.ts:35 | PATCH | SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id) | Present |
| api/superadmin_communication_broadcasts_campaigns.api.ts:38 | GET | SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.TENANTS | Present |
| api/superadmin_communication_broadcasts_campaigns.api.ts:39 | GET | SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.RECIPIENT_COUNT | Present |
| api/superadmin_communication_broadcasts_campaigns.api.ts:45 | POST | SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DELIVER_TO_RECIPIENT(broadcastId, recipientId) | Present |
| api/superadmin_communication_broadcasts_campaigns_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_communication_broadcasts_campaigns.types.ts`, `types/superadmin_communication_broadcasts_campaigns_broadcast_delivery.types.ts`, `types/superadmin_communication_broadcasts_campaigns_broadcast_modal.types.ts`, `types/superadmin_communication_broadcasts_campaigns_broadcast_modal_field.types.ts`, `types/superadmin_communication_broadcasts_campaigns_broadcast_queue_modal.types.ts`, `types/superadmin_communication_broadcasts_campaigns_broadcast_queue_state.types.ts`, `types/superadmin_communication_broadcasts_campaigns_send_now_confirmation_dialog.types.ts`.

Validation schemas: `schemas/superadmin_communication_broadcasts_campaigns_aliases.schemas.ts`, `schemas/superadmin_communication_broadcasts_campaigns_api.schemas.ts`, `schemas/superadmin_communication_broadcasts_campaigns_broadcast_delivery_contract.schemas.ts`, `schemas/superadmin_communication_broadcasts_campaigns_contract.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 60 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

### `api/superadmin_communication_broadcasts_campaigns.query_keys.ts`

```typescript
/**
 * @description Central TanStack Query key registry for Broadcasts.
 * @dependencies None.
 * @edge-case Keys remain stable across retries so mutations reconcile the exact affected cache.
 */
export const SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS = {
  all: ["superadmin_communication_broadcasts"] as const,
  list: (params: unknown) => ["superadmin_communication_broadcasts", "list", params] as const,
  tenants: ["superadmin_communication_broadcasts", "tenants"] as const,
  modalTenants: ["superadmin_communication_broadcasts", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_communication_broadcasts", "modal-recipient-count"] as const,
  detail: (id: string) => ["superadmin_communication_broadcasts", "detail", id] as const,
} as const;
```

### `api/superadmin_communication_broadcasts_campaigns.query_keys.ts`

```typescript
/**
 * @description Central TanStack Query key registry for Broadcasts.
 * @dependencies None.
 * @edge-case Keys remain stable across retries so mutations reconcile the exact affected cache.
 */
export const SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS = {
  all: ["superadmin_communication_broadcasts"] as const,
  list: (params: unknown) => ["superadmin_communication_broadcasts", "list", params] as const,
  tenants: ["superadmin_communication_broadcasts", "tenants"] as const,
  modalTenants: ["superadmin_communication_broadcasts", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_communication_broadcasts", "modal-recipient-count"] as const,
  detail: (id: string) => ["superadmin_communication_broadcasts", "detail", id] as const,
} as const;
```

Query-cache invalidation and key consistency are not treated as verified merely because a key file exists. The operation-by-operation audit is assigned to RBG2.

## 6. Mutation Inventory & Lifecycle Operations

| Function | Method evidence | URL expression | Source file |
| --- | --- | --- | --- |
| fetchBroadcasts | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE; method still requires exact call-block verification | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |
| createBroadcast | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE; method still requires exact call-block verification | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |
| deleteBroadcast | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id); method still requires exact call-block verification | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |
| updateBroadcast | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id); method still requires exact call-block verification | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |
| fetchTenants | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.TENANTS; method still requires exact call-block verification | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |
| fetchRecipientCount | NOT_VERIFIED — inspect this operation call block | NOT_VERIFIED — follow its exact URL-config reference | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |
| deliverBroadcastToRecipient | NOT_VERIFIED | Inspect implementation expression | superadmin_communication_broadcasts/broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api.ts |

**Mutation safety evidence:** the structural migration did not modify API request payloads, endpoint constant values, or mutation function bodies except updating import specifiers. Idempotency UUID generation, stable retry behavior, and one-time key lifecycle remain `NOT_VERIFIED` until RBG2 traces each mutation and its caller.

## 7. Permissions and Role Rules

No dedicated permission section was found in the original master contract. Do not add or loosen permissions based on assumptions. Actual guard imports and conditional rendering require RBG2 verification.

Backend authorization is authoritative. Any omitted host session/permission contract is an explicit integration dependency, not permission to infer a role or expose protected fields.

## 8. State Ownership & Architecture Flow

No state ownership section was found in the original feature document. Current state artifacts are listed below; the query/UI-state split requires source verification before modification.

### Files observed in state ownership

| State file | Observed role |
| --- | --- |
| state/SuperadminCommunicationBroadcastsCampaignsGitkeep | Module-local state artifact; semantics must be confirmed from its exports before changes. |

Server data is expected to remain under the existing TanStack Query integration; the structural move does not change state ownership behavior.

## 9. Offline, Loading, Empty, and Error States

| File | Line | Source evidence |
| --- | --- | --- |
| tests/hooks/useSuperadminCommunicationBroadcastsCampaignsSendAction.test.tsx | 32 | const updateBroadcast = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ success: true }); |

The current source scan does not establish a complete offline/reconnect contract. Do not claim offline support from retry handlers alone. If reconnect reconciliation is a product requirement, record it as `CONTRACT_INCOMPLETE` until a verified backend/client contract is supplied.

## 10. Security and PII Rules (Data Masking & Guards)

### Existing forbidden-pattern contract

# Forbidden Patterns for `superadmin/broadcasts`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix `useEffect` or state hooks inside UI components. All heavy logic MUST reside in the adjacent custom hook.
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/frontend_superadmin/superadmin_communication_broadcasts/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use a customized `ConfirmationDrawer` or `Modal`.
5. **No Context for Async Data:** Do not use React Context for API/server data. Keep server state in TanStack Query; use module-scoped Zustand only for UI/client state.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** UI components should not intercept API errors to show toasts; let the API interceptor or Zustand store handle notifications and state updates.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in custom hooks or stores.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.


---

## Retained in-module documentation archive

**Original path:** `superadmin_communication_broadcasts/superadmin_communication_broadcasts_documentation/superadmin_communication_broadcasts_audience_insights_forbidden.md`  
**Disposition:** Historical/supporting documentation retained verbatim for traceability. It is not a separate active module contract unless explicitly stated in the active module documentation.

# Audience Segmentation — Forbidden Patterns

- Do not place feature data directly inside components, hooks, or stores.
- Do not import another role or business module.
- Do not bypass the module API client to read fixtures directly from UI code.
- Do not use magic API URLs, inline business status maps, or raw financial formatting.
- Do not introduce Recharts or Chart.js; Superadmin analytics use the approved ApexCharts path.

### Implementation evidence scan

| File | Line | Source evidence |
| --- | --- | --- |
| api/superadmin_communication_broadcasts_campaigns.api.ts | 29 | headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body), |
| api/superadmin_communication_broadcasts_campaigns.api.ts | 32 | deleteBroadcast: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<Record<string, unknown>>>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, |
| api/superadmin_communication_broadcasts_campaigns.api.ts | 35 | updateBroadcast: (id: string, body: Partial<BroadcastFormData>, idempotencyKey: string) => apiFetch<ApiResponse<Broadcast>>(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL(id), { method: 'PATCH', headers: { 'Idempotency-Key': idempoten |
| api/superadmin_communication_broadcasts_campaigns.api.ts | 47 | headers: { 'Idempotency-Key': idempotencyKey }, |
| hooks/useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys.ts | 6 | * @description Owns idempotency-key lifecycle for broadcast user intents. One key is created per logical intent and retained across retries until the server confirms success. |
| mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.ts | 54 | const key = request.headers.get('Idempotency-Key'); |
| mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.ts | 65 | const key = request.headers.get('Idempotency-Key'); |
| mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.ts | 78 | const key = request.headers.get('Idempotency-Key'); |
| mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.ts | 90 | const key = request.headers.get('Idempotency-Key'); |
| not-found.tsx | 13 | * @description Renders the module-local 404 state using semantic design tokens and the owning URL config. |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 46 | headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 66 | headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 79 | const removed = await fetch(`${baseUrl}/${id}`, { method: 'DELETE', headers: { 'Idempotency-Key': 'delete-intent-1' } }); |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 89 | method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'unknown-edit' }, |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 98 | method: 'POST', headers: { 'Idempotency-Key': 'bad-recipient-intent' }, |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 106 | const firstResponse = await fetch(`${baseUrl}/b4/deliveries/t5`, { method: 'POST', headers: { 'Idempotency-Key': key } }); |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 107 | const retryResponse = await fetch(`${baseUrl}/b4/deliveries/t5`, { method: 'POST', headers: { 'Idempotency-Key': key } }); |
| tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts | 118 | const deliver = () => fetch(`${baseUrl}/${id}/deliveries/t3`, { method: 'POST', headers: { 'Idempotency-Key': key } }); |

The RBG1 operation changed file locations and import specifiers, not payload schemas or endpoint literals. A clean security assessment is not claimed until RBG2/RBG3 verify storage, logging, authorization boundaries, mutation keys and user-safe error handling.

## 11. Accessibility Requirements (A11y)


### Canonical theme and responsive contract

The authoritative exact token inventory for this leaf is [`superadmin_communication_broadcasts_campaigns_theme_contract.md`](superadmin_communication_broadcasts_campaigns_theme_contract.md). Do not copy or redefine global token mappings here. The global token source (`globals.css` and Tailwind `@theme inline`) is host-owned and not included in this role ZIP, so token definition/mapping existence remains `NOT_VERIFIED_IN_SCOPE`.

Implement focus indicators, keyboard support, semantic labels, sufficient contrast, responsive collapse, and reduced-motion-safe transitions according to `WEB_FRONTEND_UI_UX_DESIGN.md` and the architecture document. Source-level findings are listed in the RBG3 checkpoint; live browser accessibility behavior remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

| File | Line | Source evidence |
| --- | --- | --- |
| components/broadcasts_campaigns_main/SuperadminCommunicationBroadcastsCampaignsMain.tsx | 7 | * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_communication_broadcasts/superadmin_communication_broadcasts_hooks/useSuperadminCommunicationBroadcastsCampaignsPage, @/app/frontend_superadmin/superadmin_communication_broadcasts/superadmin_communication_broadcasts_components/superadmin_ |
| components/broadcasts_campaigns_main/SuperadminCommunicationBroadcastsCampaignsMain.tsx | 20 | import SuperadminCommunicationBroadcastsBroadcastQueueModal from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal'; |
| components/broadcasts_campaigns_main/SuperadminCommunicationBroadcastsCampaignsMain.tsx | 33 | const { broadcasts, searchQuery, setSearchQuery, statusFilter, setStatusFilter, currentPage, totalPages, setCurrentPage, isModalOpen, setIsModalOpen, form, handleCreateBroadcast, handleDeleteBroadcast, handleSendBroadcas |
| components/broadcasts_campaigns_main/SuperadminCommunicationBroadcastsCampaignsMain.tsx | 52 | <SuperadminCommunicationBroadcastsBroadcastQueueModal isOpen={queueModalOpen} onClose={() => setQueueModalOpen(false)} recipients={queueRecipients} broadcastId={queueBroadcastId} broadcastTitle={queueTitle} onComplete={onQueueComplet |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 1 | // RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationBroadcastsBroadcastQueueModal within its owning Superadmin feature module; no direct backend implementation. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 4 | * RESPONSIBILITY: React component SuperadminCommunicationBroadcastsBroadcastQueueModal owned by the superadmin_communication_broadcasts feature boundary. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 7 | * MODULE DEPENDENCIES: lucide-react, @/lib/formatters, @/app/frontend_superadmin/superadmin_communication_broadcasts/superadmin_communication_broadcasts_hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery, @/app/frontend_superadmin/superadmin_communication_broadcasts |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 11 | // RESPONSIBILITY: Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 20 | import { SUPERADMIN_BROADCAST_QUEUE_STATE_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants'; |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 23 | import type { SuperadminBroadcastRecipient, SuperadminBroadcastQueueRecipientState, SuperadminCommunicationBroadcastsBroadcastQueueModalProps } from '@/app/frontend_superadmin/superadmin_communication_broadcasts/broadcasts_campaigns/types/superadm |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 28 | * @description Owns the SuperadminCommunicationBroadcastsBroadcastQueueModal responsibility within the superadmin_role feature boundary. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 33 | export default function SuperadminCommunicationBroadcastsBroadcastQueueModal({ isOpen, onClose, recipients, broadcastId, broadcastTitle, onComplete }: SuperadminCommunicationBroadcastsBroadcastQueueModalProps) { |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 37 | const [states, setStates] = useState<Record<string, SuperadminBroadcastQueueRecipientState>>({}); |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 44 | // EFFECT INTENT: Initialize or reset a queue session only when the broadcast/recipient identity changes; closing and reopening the modal preserves completed recipient state. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 59 | const initialStates = Object.fromEntries(recipients.map((recipient) => [recipient.id, SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING])); |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 67 | // EFFECT INTENT: Process exactly one recipient at a time through the feature delivery mutation; successful responses advance the queue and failures stop it for explicit retry. |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 73 | if (!recipient \|\| states[recipient.id] === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED \|\| states[recipient.id] === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED) return; |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 75 | setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PROCESSING })); |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 81 | setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED })); |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 90 | setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED })); |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 101 | <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm" role="dialog" aria-modal="true" ref={dialogRef} aria-labelledby="superadmin-broadcast-queue-title" data-testid="superad |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 105 | <h2 id="superadmin-broadcast-queue-title" className="truncate text-on-primary font-bold text-lg">{t('ui.automated_broadcast_ff617205')}</h2> |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 108 | <button type="button" onClick={onClose} aria-label={t('ui.close_broadcast_delivery_queue_c9578fd1')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-on-primary hover:text-on-primary |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 113 | <div className="p-6 max-h-96 overflow-y-auto space-y-3 custom-scrollbar" aria-live="polite" data-testid="superadmin_communication_broadcasts-broadcast-queue-list"> |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 115 | {recipients.length === 0 ? <div role="alert" className="rounded-lg border border-danger bg-danger-bg p-4 text-sm text-danger" data-testid="superadmin_communication_broadcasts-queue-empty-error">{t('ui.no_recipients_to_deliver')}</div> |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 117 | const state = states[recipient.id] ?? SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING; |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 118 | const isProcessing = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PROCESSING; |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 119 | const isDone = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED; |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 120 | const isFailed = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED; |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 126 | {isFailed ? <p className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_communication_broadcasts-broadcast-queue-error">{lastError \|\| t('ui.action_failed_retry')}</p> : null} |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 141 | <button type="button" onClick={() => { setLastError(null); setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING })); const index = recipients.findIndex((item) => item.id  |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 144 | {state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING && !isReady ? <span className="w-2 h-2 rounded-full bg-surface-highlight" aria-hidden="true" /> : null} |
| components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.tsx | 156 | export type { SuperadminBroadcastRecipient } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_queue_modal.types'; |
| constants/superadmin_communication_broadcasts_campaigns_broadcast.constants.ts | 30 | export const SUPERADMIN_BROADCAST_QUEUE_STATE_CODES = Object.freeze({ |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery.ts | 2 | // DATA FLOW: Queue recipient → validated delivery mutation → Broadcasts API/MSW → mutable delivery state → refreshed broadcast result. |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 2 | // DATA FLOW: Inputs enter useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature. |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 5 | import type { SuperadminBroadcastQueueRecipientDraft, SuperadminBroadcastQueueState } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_queue_state |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 9 | /** Owns local draft state for opening and closing the Broadcast delivery queue. */ |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 10 | /** Purpose: Owns the useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */ |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 12 | * @description Manages broadcasts state, queries, and UI interactions for useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState. |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 16 | / DATA FLOW: Module API/query/store state → useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState → consuming feature component. |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 18 | * @description Coordinates the use Superadmin broadcasts broadcast queue state concern within its owning Superadmin feature. |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 22 | export function useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState() { |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 23 | const [queueModalOpen, setQueueModalOpen] = useState(false); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 24 | const [queueRecipients, setQueueRecipients] = useState<SuperadminBroadcastQueueRecipientDraft[]>([]); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 25 | const [queueBroadcastId, setQueueBroadcastId] = useState<string \| null>(null); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 26 | const [queueTitle, setQueueTitle] = useState(''); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.ts | 27 | return { queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, setQueueModalOpen, setQueueRecipients, setQueueBroadcastId, setQueueTitle }; |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 30 | export const useSuperadminCommunicationBroadcastsCampaignsMutations = ({ setIsModalOpen, setEditingId, form, gyms, setQueueRecipients, setQueueBroadcastId, setQueueTitle, setQueueModalOpen }: { |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 35 | setQueueBroadcastId: (val: string \| null) => void; |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 36 | setQueueRecipients: (val: { |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 41 | setQueueTitle: (val: string) => void; |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 42 | setQueueModalOpen: (val: boolean) => void; |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 65 | setQueueRecipients(recipients); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 66 | setQueueBroadcastId(res.data.id); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 67 | setQueueTitle(res.data.title); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 68 | setQueueModalOpen(true); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 106 | setQueueRecipients(recipients); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 107 | setQueueBroadcastId(res.data.id); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 108 | setQueueTitle(res.data.title); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 109 | setQueueModalOpen(true); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 11 | import { useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState'; |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 38 | const queueState = useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState(); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 54 | ...queueState, |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 68 | const onQueueComplete = useCallback((message: string) => { |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 69 | queueState.setQueueModalOpen(false); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 70 | queueState.setQueueBroadcastId(null); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 72 | }, [queueState]); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 119 | queueModalOpen: queueState.queueModalOpen, |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 120 | queueRecipients: queueState.queueRecipients, |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 121 | queueBroadcastId: queueState.queueBroadcastId, |
| hooks/useSuperadminCommunicationBroadcastsCampaignsPage.ts | 122 | queueTitle: queueState.queueTitle, onQueueComplete, setQueueModalOpen: queueState.setQueueModalOpen |
| locales/superadmin_communication_broadcasts_campaigns_en.json | 28 | "close_broadcast_delivery_queue_c9578fd1": "Close broadcast delivery queue", |
| locales/superadmin_communication_broadcasts_campaigns_hi.json | 28 | "close_broadcast_delivery_queue_c9578fd1": "प्रसारण डिलीवरी कतार बंद करें", |
| tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx | 4 | import SuperadminCommunicationBroadcastsBroadcastQueueModal from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_modals/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal'; |
| tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx | 23 | describe('SuperadminCommunicationBroadcastsBroadcastQueueModal', () => { |
| tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx | 33 | render(<SuperadminCommunicationBroadcastsBroadcastQueueModal isOpen onClose={vi.fn()} recipients={recipients} broadcastId="b1" broadcastTitle="Monthly update" onComplete={onComplete} />); |
| tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx | 41 | it('preserves completed recipients when the same delivery queue is closed and reopened', async () => { |
| tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx | 45 | const { rerender } = render(<SuperadminCommunicationBroadcastsBroadcastQueueModal isOpen {...props} />); |
| tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx | 48 | rerender(<SuperadminCommunicationBroadcastsBroadcastQueueModal isOpen={false} {...props} />); |

No background-task contract is inferred from a token match alone. The supplied frontend source may consume real-time host capabilities, but event lifecycle, cleanup, retry and authorization require explicit evidence before behavior changes.

## 13. Feature Flags & Tenant Settings

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

If no flag source is found, that means the provided module source did not expose a flag declaration; it does not prove that the product has no host-managed flag system. Flag semantics are `NOT_VERIFIED` unless documented in the master contract or typed configuration.

## 14. Cache Invalidation & Consistency

| File | Line | Source evidence |
| --- | --- | --- |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery.ts | 47 | await queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.all }); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery.ts | 48 | await queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.detail(variables.broadcastId) }); |
| hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.ts | 45 | const invalidateBroadcasts = () => queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.all }); |

RBG2 must verify each mutation’s invalidated key family, optimistic update/rollback behavior, and list/detail consistency against the existing query-key registry. No cache key was invented during RBG1.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

**Frontend route ownership:** the route entry is physically owned by `superadmin_communication/communication_broadcasts_campaigns/page.tsx` and resolves to `/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns`. Alias-only page files are not duplicated. Historical compatibility redirects are not specified because the original route-preservation evidence was not included in the supplied archive; compare this physical route with the host route registry before adding a redirect. The current physical route matrix is in `INTEGRATION_GUIDE.md`. Host redirect/API collision checks remain `DEFERRED_TO_HOST_RUNTIME`.

**API/data migration:** no backend API endpoint or request/response contract was intentionally changed in this batch. No database migration evidence is included in the supplied frontend ZIP.

**Source rollback:** restore the pre-RBG1 source snapshot/previous `frontend-superadmin-v4-fix.zip` if the migration must be reverted, including the import graph and directory tree as one unit. Do not roll back only the route shims or only the moved components.

## 16. Test Coverage Map & Quality Gates

**Test files in leaf:** 16

- `tests/SuperadminCommunicationBroadcastsCampaignsBasic.test.tsx`
- `tests/SuperadminCommunicationBroadcastsCampaignsBroadcastModal.test.tsx`
- `tests/SuperadminCommunicationBroadcastsCampaignsUrlConfig.test.ts`
- `tests/components/SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal.test.tsx`
- `tests/constants/SuperadminCommunicationBroadcastsCampaignsBroadcastConstants.test.ts`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery.test.tsx`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData.test.tsx`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueueState.test.ts`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsData.test.tsx`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsIdempotencyKeys.test.ts`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsMutations.test.tsx`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsPage.test.ts`
- `tests/hooks/useSuperadminCommunicationBroadcastsCampaignsSendAction.test.tsx`
- `tests/mocks/broadcasts_campaigns_handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers.test.ts`
- `tests/schemas/SuperadminCommunicationBroadcastsCampaignsSchemas.test.ts`
- `tests/utils/SuperadminCommunicationBroadcastsCampaignsBroadcastScheduleUtils.test.ts`

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
| SA-009 | P2 | Component responsibility and hook/store data-flow headers are missing in production source | Every affected production component/hook/store has an accurate canonical header and the follow-up static scan returns zero missing required headers. |

Any endpoint, DTO field, response envelope, permission, flag or mutation behavior not evidenced in the actual URL config, API facade, Zod schema, TypeScript types, feature specification or mock fixtures must remain `NOT_VERIFIED`. The structural migration did not invent such contracts.

## 19. Rule Compliance Checklist (35+ Verification Items)

The following 35 checks describe the status at this RBG1 checkpoint. `NOT_VERIFIED` is intentionally distinct from `PASS`; the checklist must be refreshed after the later RBGs and final Section 43P gate.

| # | Control | Status | Evidence / next verification |
| --- | --- | --- | --- |
| 1 | Domain root quarantine | PASS | Root page is compatibility redirect; master trio retained. |
| 2 | Canonical leaf name | PASS | `broadcasts_campaigns/` is the terminal feature leaf. |
| 3 | Canonical category names | PASS | Mapped to standard category directory names in migration manifest. |
| 4 | Centralized URL config location | PASS | config/superadmin_communication_broadcasts_campaigns.url_config.ts |
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

**Canonical leaf path:** `src/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/` (archive-relative path: `frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/`).

### Source-present standalone assets

| Artifact | Evidence / status |
| --- | --- |
| Vitest/RTL test source | `20` TypeScript/TSX test files are present; execution is `NOT_VERIFIED_IN_SCOPE` because the supplied archive has no host root package manifest, installed Vitest, or host TypeScript config. |
| Module-owned MSW handlers | `1` handler file(s) present in this leaf. |
| Module-owned fixtures/data | `1` fixture/data file(s) present in this leaf. |
| Harness wrapper | `tests/harness/SuperadminCommunicationBroadcastsCampaignsHarness.tsx` — local `NextIntlClientProvider` and `QueryClientProvider` wrapper. |
| Harness/bootstrap | `tests/harness/SuperadminCommunicationBroadcastsCampaignsHarnessBootstrap.ts` — registers the owning leaf's handlers and exposes start/reset/stop plus isolated QueryClient functions. |
| Scenario contract | `mocks/scenarios/superadmin_communication_broadcasts_campaigns.scenarios.ts` — explicit ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED response scenarios; ACTIVE/EMPTY payloads are passed from this leaf's fixtures rather than invented here. |
| Scenario regression tests | `1` focused file(s) under `tests/mocks/scenarios/`; source-authored, runner execution not verified. |
| Host stubs | `contracts/host-stubs.d.ts` is intended for isolated type compatibility only; it is not an implementation of host runtime services. |

### Endpoint and scenario selection

- **Primary configured API endpoint for the scenario harness:** `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE` in `config/superadmin_communication_broadcasts_campaigns.url_config.ts`. The API literal remains owned by the config; do not hardcode a parallel copy in production modules.
- **Test scenario query:** append `?__mockScenario=ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, or `UNAUTHORIZED` to that configured endpoint when the feature's scenario handler is installed by the test server. The scenario override is a test/mock facility and does not modify the production API URL or assume the host has enabled runtime scenario toggles.
- **Role/auth fixture:** no host credentials or verified session-claim payload was supplied. Use the host's approved Superadmin test identity; do not invent credentials or treat the API-level 401 scenario as proof of all route-guard behavior.

### Host verification commands (not executed in this environment)

```bash
npm run test -- src/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/tests
npx tsc --noEmit
npm run lint
```

These commands require the target host project root, its locked dependencies and its real alias/provider configuration. Source parser/import checks are not substitutes for a semantic host typecheck or test execution.



### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminCommunicationBroadcastsCampaignsDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide

1. **Folder transfer:** copy `src/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/` as the autonomous leaf. Keep the role-domain master docs and any compatibility route shim in the containing archive when the documented route-preservation matrix requires them; do not pull sibling feature business code into this leaf.
2. **Core contracts:** provide the verified host API transport, auth/session and permission providers, logger/error-monitoring adapter, socket/display-value adapters where used, zero-business UI primitives, `next-intl` messages/provider, Tailwind semantic token mapping, and TanStack Query provider. `contracts/host-stubs.d.ts` is type-only and must not be mistaken for runtime implementations.
3. **Route and URL configuration:** preserve `config/superadmin_communication_broadcasts_campaigns.url_config.ts` and the exported `SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API` contract exactly. Confirm the host's route prefix and rewrite behavior against the route-preservation matrix; endpoint literals must not be rewritten by inference.
4. **Verification and mocks:** run the leaf tests, the focused mock scenario regression file, `npx tsc --noEmit`, lint and the owning Playwright E2E suite in the actual host. Confirm mutable fixture reset between tests and inspect all five scenario outcomes. Authenticated browser checks remain `DEFERRED_TO_HOST_RUNTIME` until a host base URL, approved storage state and browser runner exist.



### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/SearchableDropdown |
| @/components/ui/Pagination |
| @/components/ui/Feedback/ConfirmProvider |
| @/lib/formatters |
| @/lib/logger |
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

The domain-level master documents remain authoritative for long-form user flows, existing API narratives, business edge cases, and module-specific constraints. The exact source excerpts incorporated above are from `superadmin_communication_broadcasts_features.md`; consult that master file before making changes where this leaf contract identifies a gap.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

