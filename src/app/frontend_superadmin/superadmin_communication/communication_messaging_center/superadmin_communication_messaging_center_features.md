---
feature: "superadmin_communication_messaging_center"
owner_role: "superadmin"
module_version: 18
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_YET_VERIFIED (target 8/8)"
---

# Superadmin Messaging Center — Autonomous Sub-Module Contract

This specification was generated from the supplied Superadmin web ZIP and the original domain feature contract `superadmin_communication_messaging_features.md`. The inherited master contract remains at the parent domain root; this leaf document records the current autonomous leaf ownership after RBG1 structural migration. Any unknown contract is explicitly marked `NOT_VERIFIED` or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than inferred.

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Message browsing and composition, with URL-owned search, channel, date and pagination state. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

### Route-entry evidence

| Entry file | Filesystem-derived route | Evidence boundary |
| --- | --- | --- |
| `page.tsx` | `/frontend_superadmin/superadmin_communication/communication_messaging_center` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `loading.tsx` | `/frontend_superadmin/superadmin_communication/communication_messaging_center (loading.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `error.tsx` | `/frontend_superadmin/superadmin_communication/communication_messaging_center (error.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `not-found.tsx` | `/frontend_superadmin/superadmin_communication/communication_messaging_center (not-found.tsx)` | Canonical route entry present in owning feature module; host alias redirects are specified separately |

### Leaf-owned artifact inventory

| Category | File count | Notes |
| --- | ---: | --- |
| `components/` | 6 | Example: `components/messaging_center_forms_and_filters/SuperadminCommunicationMessagingCenterDateRangePicker.tsx` |
| `hooks/` | 12 | Example: `hooks/useSuperadminCommunicationMessagingCenter.ts` |
| `api/` | 2 | Example: `api/superadmin_communication_messaging_center.api.ts` |
| `state/` | 1 | Example: `state/SuperadminCommunicationMessagingCenterGitkeep` |
| `types/` | 9 | Example: `types/superadmin_communication_messaging_center.types.ts` |
| `schemas/` | 4 | Example: `schemas/superadmin_communication_messaging_center_api.schemas.ts` |
| `utils/` | 4 | Example: `utils/SuperadminCommunicationMessagingCenterDateRangeUtils.ts` |
| `mocks/` | 3 | Example: `mocks/fixtures/SuperadminCommunicationMessagingCenterMockFixtures.ts` |
| `tests/` | 25 | 22 `*.test.ts`/`*.test.tsx` spec files plus 3 harness/support files |
| `config/` | 5 | Example: `constants/superadmin_communication_messaging_center.constants.ts` |
| `contracts/` | 1 | Example: `contracts/host-stubs.d.ts` |
| `locales/` | 2 | Example: `locales/superadmin_communication_messaging_center_en.json` |

**Total leaf files:** 81.
**Direct leaf-root files:** `error.tsx`, `loading.tsx`, `not-found.tsx`, `page.tsx`, `superadmin_communication_messaging_center_features.md`, `superadmin_communication_messaging_center_forbidden.md`, `superadmin_communication_messaging_center_theme_contract.md`.

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
| components/SuperadminCommunicationMessagingCenterPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for communication_messaging_center, with no sibling-module dependencies. |
| components/messaging_center_forms_and_filters/SuperadminCommunicationMessagingCenterDateRangePicker.tsx | Renders/orchestrates SuperadminCommunicationMessagingDateRangePicker within its owning Superadmin feature module; no direct backend implementation. |
| components/messaging_center_forms_and_filters/SuperadminCommunicationMessagingCenterTenantDropdown.tsx | Renders Superadmin Communication Messaging Center Tenant Dropdown using its declared props and feature-local hooks. |
| components/messaging_center_main/SuperadminCommunicationMessagingCenterMain.tsx | Messaging only: legacy ?tab=notifications redirects to its isolated sibling. |
| components/messaging_center_modals/SuperadminCommunicationMessagingCenterComposeModal.tsx | Renders/orchestrates SuperadminCommunicationMessagingCenterComposeModal within its owning Superadmin feature module; no direct backend implementation. |
| components/messaging_center_tabs/SuperadminCommunicationMessagingCenterMessagesTab.tsx | Renders/orchestrates SuperadminCommunicationMessagingCenterMessagesTab within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows

### Route identity evidence

- Leaf route-entry directory: `/frontend_superadmin/superadmin_communication/communication_messaging_center/` (filesystem-derived from this ZIP).
- Leaf entry file present: `page.tsx` = `present`.
- Configured parent/compatibility route value: `/frontend_superadmin/superadmin_communication/communication_messaging_center`.
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
| `fetchMessages` | `OMITTED_AT_CALLSITE` | `withQuery(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES, params)` | `TenantMessage[]` | responseSchema | no / not evidenced in this call | `superadmin_communication_messaging_center.api.ts` |
| `fetchNotifications` | `OMITTED_AT_CALLSITE` | `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.NOTIFICATIONS` | `SuperadminNotification[]` | responseSchema | no / not evidenced in this call | `superadmin_communication_messaging_center.api.ts` |
| `fetchTenants` | `OMITTED_AT_CALLSITE` | `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.TENANTS` | `MessagingTenant[]` | responseSchema | no / not evidenced in this call | `superadmin_communication_messaging_center.api.ts` |
| `markNotificationRead` | `"PATCH"` | `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.NOTIFICATION_READ(id)` | `SuperadminNotification` | responseSchema | yes | `superadmin_communication_messaging_center.api.ts` |
| `markAllNotificationsRead` | `"PATCH"` | `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.NOTIFICATIONS_READ_ALL` | `SuperadminNotification[]` | responseSchema | yes | `superadmin_communication_messaging_center.api.ts` |
| `sendMessage` | `"POST"` | `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES` | `TenantMessage` | responseSchema | yes | `superadmin_communication_messaging_center.api.ts` |

### Canonical URL configuration values observed in source

| Config symbol / property | Declared value |
| --- | --- |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[BASE]` | `"/superadmin/messaging"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[MESSAGES]` | `"/superadmin/messaging/messages"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[NOTIFICATIONS]` | `"/superadmin/messaging/notifications"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[NOTIFICATION_READ_PATTERN]` | `"/superadmin/messaging/notifications/:id/read"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[TENANTS]` | `"/superadmin/messaging/tenants"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[NOTIFICATION_READ]` | `(id: string) => `/superadmin/messaging/notifications/${encodeURIComponent(id)}/read`` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[NOTIFICATIONS_READ_ALL]` | `"/superadmin/messaging/notifications/read-all"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[WHATSAPP_BASE]` | `"/superadmin/messaging/whatsapp"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[WHATSAPP_BULK_CENTER]` | `"/superadmin/messaging/whatsapp/bulk-center"` |
| `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API[WHATSAPP_CAMPAIGNS]` | `"/superadmin/messaging/whatsapp/campaigns"` |

### Route config and contract boundaries

- URL config file(s): `superadmin_communication_messaging_center.url_config.ts`.
- Configured `*_ROUTES.MAIN` value: `"/frontend_superadmin/superadmin_communication/communication_messaging_center"`.
- Response field shapes and mutation payloads are governed by the TypeScript/Zod schemas and function signatures in this leaf; values not declared there must not be invented.
- Public URL aliases/rewrites outside the supplied role tree and live backend behavior are `NOT_VERIFIED_IN_SCOPE`.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_communication_messaging_center.api.ts:32 | GET | withQuery(SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES, params) | Present |
| api/superadmin_communication_messaging_center.api.ts:35 | GET | SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.TENANTS | Present |
| api/superadmin_communication_messaging_center.api.ts:40 | POST | SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES | Present |
| api/superadmin_communication_messaging_center_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_communication_messaging_center.types.ts`, `types/superadmin_communication_messaging_center_compose.types.ts`, `types/superadmin_communication_messaging_center_compose_modal.types.ts`, `types/superadmin_communication_messaging_center_date_range.types.ts`, `types/superadmin_communication_messaging_center_date_range_picker.types.ts`, `types/superadmin_communication_messaging_center_messages_tab.types.ts`, `types/superadmin_communication_messaging_center_next_error_props.types.ts`, `types/superadmin_communication_messaging_center_tenant_dropdown.types.ts`.

Validation schemas: `schemas/superadmin_communication_messaging_center_api.schemas.ts`, `schemas/superadmin_communication_messaging_center_api_response.schema.ts`, `schemas/superadmin_communication_messaging_center_compose.schemas.ts`, `schemas/superadmin_communication_messaging_center_types.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 42 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

### `api/superadmin_communication_messaging_center.query_keys.ts`

```typescript
/**
 * @description Canonical TanStack Query key registry for the Superadmin Messaging feature.
 * @invariant Server-state identities remain isolated for messages, notifications, tenants, WhatsApp, and insights.
 */
export const SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS = {
  messages: ['superadmin_communication_messaging', 'messaging', 'messages'] as const,
  messagesList: (queryParams: Readonly<Record<string, string>>) => ['superadmin_communication_messaging', 'messaging', 'messages', queryParams] as const,
  notifications: ['superadmin_communication_messaging', 'messaging', 'notifications'] as const,
  tenants: ['superadmin_communication_messaging', 'messaging', 'tenants'] as const,
  whatsappBulkCenter: ['superadmin_communication_messaging', 'messaging', 'whatsapp-bulk-center'] as const,
  templateInsights: ['superadmin_communication_messaging', 'messaging_template_insights'] as const,
} as const;
```

### `api/superadmin_communication_messaging_center.query_keys.ts`

```typescript
/**
 * @description Canonical TanStack Query key registry for the Superadmin Messaging feature.
 * @invariant Server-state identities remain isolated for messages, notifications, tenants, WhatsApp, and insights.
 */
export const SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS = {
  messages: ['superadmin_communication_messaging', 'messaging', 'messages'] as const,
  messagesList: (queryParams: Readonly<Record<string, string>>) => ['superadmin_communication_messaging', 'messaging', 'messages', queryParams] as const,
  notifications: ['superadmin_communication_messaging', 'messaging', 'notifications'] as const,
  tenants: ['superadmin_communication_messaging', 'messaging', 'tenants'] as const,
  whatsappBulkCenter: ['superadmin_communication_messaging', 'messaging', 'whatsapp-bulk-center'] as const,
  templateInsights: ['superadmin_communication_messaging', 'messaging_template_insights'] as const,
} as const;
```

Query-cache invalidation and key consistency are not treated as verified merely because a key file exists. The operation-by-operation audit is assigned to RBG2.

## 6. Mutation Inventory & Lifecycle Operations

| Function | Method evidence | URL expression | Source file |
| --- | --- | --- | --- |
| fetchMessages | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES; method still requires exact call-block verification | superadmin_communication_messaging/messaging_center/api/superadmin_communication_messaging_center.api.ts |
| fetchNotifications | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.NOTIFICATIONS; method still requires exact call-block verification | superadmin_communication_messaging/messaging_center/api/superadmin_communication_messaging_center.api.ts |
| fetchTenants | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.TENANTS; method still requires exact call-block verification | superadmin_communication_messaging/messaging_center/api/superadmin_communication_messaging_center.api.ts |
| markNotificationRead | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.NOTIFICATION_READ(id); method still requires exact call-block verification | superadmin_communication_messaging/messaging_center/api/superadmin_communication_messaging_center.api.ts |
| markAllNotificationsRead | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.NOTIFICATIONS_READ_ALL; method still requires exact call-block verification | superadmin_communication_messaging/messaging_center/api/superadmin_communication_messaging_center.api.ts |
| sendMessage | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.MESSAGES; method still requires exact call-block verification | superadmin_communication_messaging/messaging_center/api/superadmin_communication_messaging_center.api.ts |

**Mutation safety evidence:** the structural migration did not modify API request payloads, endpoint constant values, or mutation function bodies except updating import specifiers. Idempotency UUID generation, stable retry behavior, and one-time key lifecycle remain `NOT_VERIFIED` until RBG2 traces each mutation and its caller.

## 7. Permissions and Role Rules

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_communication_messaging_forbidden.md`; frontend checks do not replace backend authorization.

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

- **Server state:** TanStack Query for API-backed async data where present.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** Feature-local `useSuperadminCommunicationMessagingCenterUrlState` owns shareable list/filter query state; it preserves unrelated query keys and batches updates.
- **Query-key registries:** `api/superadmin_communication_messaging_center.query_keys.ts`

- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

### Files observed in state ownership

| State file | Observed role |
| --- | --- |
| state/SuperadminCommunicationMessagingCenterGitkeep | Module-local state artifact; semantics must be confirmed from its exports before changes. |

Server data is expected to remain under the existing TanStack Query integration; the structural move does not change state ownership behavior.

## 9. Offline, Loading, Empty, and Error States

| File | Line | Source evidence |
| --- | --- | --- |
| hooks/useSuperadminCommunicationMessagingCenterNotifications.ts | 18 | * @edge-case Recovers missed notifications after reconnect and preserves query ownership in TanStack Query. |

The current source scan does not establish a complete offline/reconnect contract. Do not claim offline support from retry handlers alone. If reconnect reconciliation is a product requirement, record it as `CONTRACT_INCOMPLETE` until a verified backend/client contract is supplied.

## 10. Security and PII Rules (Data Masking & Guards)

### Existing forbidden-pattern contract

# superadmin_communication_messaging — Forbidden Patterns

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


---

## Retained in-module documentation archive

**Original path:** `superadmin_communication_messaging/superadmin_communication_messaging_documentation/superadmin_communication_messaging_template_insights_forbidden.md`  
**Disposition:** Historical/supporting documentation retained verbatim for traceability. It is not a separate active module contract unless explicitly stated in the active module documentation.

# Message Templates & Campaign Results — Forbidden Patterns

- Do not place feature data directly inside components, hooks, or stores.
- Do not import another role or business module.
- Do not bypass the module API client to read fixtures directly from UI code.
- Do not use magic API URLs, inline business status maps, or raw financial formatting.
- Do not introduce Recharts or Chart.js; Superadmin analytics use the approved ApexCharts path.

### Implementation evidence scan

| File | Line | Source evidence |
| --- | --- | --- |
| api/superadmin_communication_messaging_center.api.ts | 44 | headers: { 'Idempotency-Key': idempotencyKey }, |
| api/superadmin_communication_messaging_center.api.ts | 49 | headers: { 'Idempotency-Key': idempotencyKey }, |
| api/superadmin_communication_messaging_center.api.ts | 57 | headers: { 'Idempotency-Key': idempotencyKey }, |
| constants/superadmin_communication_messaging_center_status_badge_config.constants.ts | 1 | // RESPONSIBILITY: Owns status-to-semantic-token mapping for the messaging feature only; no cross-feature business registry. |
| constants/superadmin_communication_messaging_center_status_badge_config.constants.ts | 31 | /** Resolves this feature's business status to the global semantic badge tokens. */ |
| error.tsx | 17 | * @dependencies Uses the existing module logger and approved semantic design tokens; no feature business data is owned here. |
| hooks/useSuperadminCommunicationMessagingCenterSendMutation.ts | 22 | * @dependencies Uses the messaging API facade, idempotency-key lifecycle, and TanStack Query cache. |
| mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers.ts | 127 | const idempotencyKey = request.headers.get('Idempotency-Key'); |
| mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers.ts | 128 | if (!idempotencyKey) return HttpResponse.json<ApiResponse<TenantMessage>>({ success: false, message: 'Idempotency-Key is required.', data: null }, { status: StatusCodes.BAD_REQUEST }); |
| tests/constants/SuperadminCommunicationMessagingCenterStatusBadgeConfig.test.ts | 8 | it('maps the documented status to semantic design tokens', () => { |

The RBG1 operation changed file locations and import specifiers, not payload schemas or endpoint literals. A clean security assessment is not claimed until RBG2/RBG3 verify storage, logging, authorization boundaries, mutation keys and user-safe error handling.

## 11. Accessibility Requirements (A11y)


### Canonical theme and responsive contract

The authoritative exact token inventory for this leaf is [`superadmin_communication_messaging_center_theme_contract.md`](superadmin_communication_messaging_center_theme_contract.md). Do not copy or redefine global token mappings here. The global token source (`globals.css` and Tailwind `@theme inline`) is host-owned and not included in this role ZIP, so token definition/mapping existence remains `NOT_VERIFIED_IN_SCOPE`.

Implement focus indicators, keyboard support, semantic labels, sufficient contrast, responsive collapse, and reduced-motion-safe transitions according to `WEB_FRONTEND_UI_UX_DESIGN.md` and the architecture document. Source-level findings are listed in the RBG3 checkpoint; live browser accessibility behavior remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

| File | Line | Source evidence |
| --- | --- | --- |
| components/messaging_center_tabs/SuperadminCommunicationMessagingCenterMessagesTab.tsx | 71 | <td className="px-4 py-3" data-mobile-label={t('ui.mobile_status')}><span data-testid={`superadmin_communication_messaging-message-status-${message.id}`} className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${MESSAGE |
| constants/superadmin_communication_messaging_center.constants.ts | 26 | QUEUED: 'bg-info-bg text-info border border-border', |
| constants/superadmin_communication_messaging_center.constants.ts | 32 | export const SUPERADMIN_COMMUNICATION_MESSAGING_STATUSES = ['SENT', 'DRAFT', 'FAILED', 'SCHEDULED', 'QUEUED'] as const; |
| constants/superadmin_communication_messaging_center.constants.ts | 35 | export const SUPERADMIN_WHATSAPP_QUEUE_STATUSES = ['QUEUED', 'OPENED', 'SENT', 'SKIPPED'] as const; |
| constants/superadmin_communication_messaging_center.constants.ts | 36 | export const SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUSES = ['SENT', 'SKIPPED'] as const; |
| constants/superadmin_communication_messaging_center.constants.ts | 38 | export const SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES = { SENT: 'SENT', DRAFT: 'DRAFT', FAILED: 'FAILED', SCHEDULED: 'SCHEDULED', QUEUED: 'QUEUED' } as const; |
| constants/superadmin_communication_messaging_center.constants.ts | 39 | export const SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES = { QUEUED: 'QUEUED', OPENED: 'OPENED', SENT: 'SENT', SKIPPED: 'SKIPPED' } as const; |
| constants/superadmin_communication_messaging_center.constants.ts | 40 | export const SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUS_CODES = { SENT: 'SENT', SKIPPED: 'SKIPPED' } as const; |
| constants/superadmin_communication_messaging_center_status_badge_config.constants.ts | 20 | QUEUED: 'bg-warning-bg text-warning', |
| hooks/useSuperadminCommunicationMessagingCenterNotifications.ts | 3 | // RESPONSIBILITY: Owns notification server state, read actions, and WebSocket recovery orchestration for the Superadmin Messaging feature. |
| hooks/useSuperadminCommunicationMessagingCenterSocketEvent.ts | 3 | // RESPONSIBILITY: Subscribes the Superadmin Messaging feature to notification WebSocket events through role infrastructure and triggers authoritative recovery fetches. |
| hooks/useSuperadminCommunicationMessagingCenterSocketEvent.ts | 11 | * @description Connects Messaging to role-level socket events without creating a WebSocket inside the feature. |
| locales/superadmin_communication_messaging_center_en.json | 133 | "superadmin_prepares_the_message_and_opens_the_wh_c97b3b4": "Superadmin prepares the message and opens the WhatsApp chat. The operator presses WhatsApp's Send action, then marks the queue item sent or skipped.", |
| locales/superadmin_communication_messaging_center_en.json | 136 | "ready_to_start_tenant_queue_8110062": "Ready to start tenant queue", |
| locales/superadmin_communication_messaging_center_en.json | 139 | "recent_free_whatsapp_queues_created_from_this_su_7facd0f": "Recent free WhatsApp queues created from this Superadmin workspace.", |
| locales/superadmin_communication_messaging_center_en.json | 163 | "see_the_final_personalized_message_before_starti_d88dd9a": "See the final personalized message before starting the queue.", |
| locales/superadmin_communication_messaging_center_en.json | 167 | "each_queue_step_opens_a_whatsapp_chat_with_the_m_7a2a27b": "Each queue step opens a WhatsApp chat with the message already filled in. You press WhatsApp's Send button, then mark the item sent in Superadmin.", |
| locales/superadmin_communication_messaging_center_en.json | 169 | "bulk_whatsapp_queue_6a5b39a": "Bulk WhatsApp queue", |
| locales/superadmin_communication_messaging_center_en.json | 170 | "start_a_campaign_to_build_a_guided_sending_queue_b9c0a23": "Start a campaign to build a guided sending queue.", |
| locales/superadmin_communication_messaging_center_en.json | 171 | "no_active_queue_yet_9782271": "No active queue yet.", |
| locales/superadmin_communication_messaging_center_en.json | 173 | "clear_queue_2e33e90": "Clear queue", |
| locales/superadmin_communication_messaging_center_en.json | 179 | "queue_complete_4ab859a": "Queue complete.", |
| locales/superadmin_communication_messaging_center_en.json | 184 | "all_queue_items_are_complete_c44b765": "All queue items are complete.", |
| locales/superadmin_communication_messaging_center_en.json | 190 | "preparing_queue_5aaf098": "Preparing Queue…", |
| locales/superadmin_communication_messaging_center_en.json | 191 | "start_tenant_whatsapp_queue_3498617": "Start Tenant WhatsApp Queue", |
| locales/superadmin_communication_messaging_center_en.json | 205 | "helper_whatsapp_ready_queue": "WhatsApp-ready queue", |
| locales/superadmin_communication_messaging_center_en.json | 236 | "ui_kpi_helper_whatsapp_ready_queue_v3": "WhatsApp-ready queue", |
| locales/superadmin_communication_messaging_center_en.json | 257 | "status_queued": "Queued", |
| locales/superadmin_communication_messaging_center_hi.json | 106 | "superadmin_prepares_the_message_and_opens_the_wh_c97b3b4": "Superadmin prepares the message and opens the WhatsApp chat. The operator presses WhatsApp's Send action, then marks the queue item sent or skipped.", |
| locales/superadmin_communication_messaging_center_hi.json | 109 | "ready_to_start_tenant_queue_8110062": "Ready to start tenant queue", |
| locales/superadmin_communication_messaging_center_hi.json | 112 | "recent_free_whatsapp_queues_created_from_this_su_7facd0f": "Recent free WhatsApp queues created from this Superadmin workspace.", |
| locales/superadmin_communication_messaging_center_hi.json | 136 | "see_the_final_personalized_message_before_starti_d88dd9a": "See the final personalized message before starting the queue.", |
| locales/superadmin_communication_messaging_center_hi.json | 140 | "each_queue_step_opens_a_whatsapp_chat_with_the_m_7a2a27b": "Each queue step opens a WhatsApp chat with the message already filled in. You press WhatsApp's Send button, then mark the item sent in Superadmin.", |
| locales/superadmin_communication_messaging_center_hi.json | 142 | "bulk_whatsapp_queue_6a5b39a": "Bulk WhatsApp queue", |
| locales/superadmin_communication_messaging_center_hi.json | 143 | "start_a_campaign_to_build_a_guided_sending_queue_b9c0a23": "Start a campaign to build a guided sending queue.", |
| locales/superadmin_communication_messaging_center_hi.json | 144 | "no_active_queue_yet_9782271": "No active queue yet.", |
| locales/superadmin_communication_messaging_center_hi.json | 146 | "clear_queue_2e33e90": "Clear queue", |
| locales/superadmin_communication_messaging_center_hi.json | 152 | "queue_complete_4ab859a": "Queue complete.", |
| locales/superadmin_communication_messaging_center_hi.json | 157 | "all_queue_items_are_complete_c44b765": "All queue items are complete.", |
| locales/superadmin_communication_messaging_center_hi.json | 163 | "preparing_queue_5aaf098": "क्यू तैयार हो रही है…", |
| locales/superadmin_communication_messaging_center_hi.json | 164 | "start_tenant_whatsapp_queue_3498617": "टेनेंट WhatsApp क्यू शुरू करें", |
| locales/superadmin_communication_messaging_center_hi.json | 178 | "helper_whatsapp_ready_queue": "WhatsApp-तैयार कतार", |
| locales/superadmin_communication_messaging_center_hi.json | 209 | "ui_kpi_helper_whatsapp_ready_queue_v3": "WhatsApp के लिए तैयार कतार", |
| locales/superadmin_communication_messaging_center_hi.json | 222 | "status_queued": "कतार में", |
| schemas/superadmin_communication_messaging_center_types.schemas.ts | 18 | status: z.enum(['SENT', 'DRAFT', 'FAILED', 'SCHEDULED', 'QUEUED']), |
| tests/utils/SuperadminCommunicationMessagingCenterFormatters.test.ts | 32 | it('masks WhatsApp queue phone numbers in list-safe form', () => { |

No background-task contract is inferred from a token match alone. The supplied frontend source may consume real-time host capabilities, but event lifecycle, cleanup, retry and authorization require explicit evidence before behavior changes.

## 13. Feature Flags & Tenant Settings

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

If no flag source is found, that means the provided module source did not expose a flag declaration; it does not prove that the product has no host-managed flag system. Flag semantics are `NOT_VERIFIED` unless documented in the master contract or typed configuration.

## 14. Cache Invalidation & Consistency

| File | Line | Source evidence |
| --- | --- | --- |
| hooks/useSuperadminCommunicationMessagingCenterNotificationMutations.ts | 41 | queryClient.setQueryData<NotificationsQueryData>(SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.notifications, |
| hooks/useSuperadminCommunicationMessagingCenterNotificationMutations.ts | 43 | void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.notifications }); |
| hooks/useSuperadminCommunicationMessagingCenterNotificationMutations.ts | 55 | queryClient.setQueryData<NotificationsQueryData>(SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.notifications, response); |
| hooks/useSuperadminCommunicationMessagingCenterNotificationMutations.ts | 56 | void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.notifications }); |
| hooks/useSuperadminCommunicationMessagingCenterNotifications.ts | 33 | void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.notifications }); |
| hooks/useSuperadminCommunicationMessagingCenterSendMutation.ts | 45 | void queryClient.invalidateQueries({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.messages }); |
| tests/hooks/useSuperadminCommunicationMessagingCenterSendMutation.test.tsx | 18 | vi.spyOn(client, 'invalidateQueries'); |
| tests/hooks/useSuperadminCommunicationMessagingCenterSendMutation.test.tsx | 25 | expect(client.invalidateQueries).toHaveBeenCalled(); |

RBG2 must verify each mutation’s invalidated key family, optimistic update/rollback behavior, and list/detail consistency against the existing query-key registry. No cache key was invented during RBG1.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

**Frontend route ownership:** the route entry is physically owned by `superadmin_communication/communication_messaging_center/page.tsx` and resolves to `/frontend_superadmin/superadmin_communication/communication_messaging_center`. Alias-only page files are not duplicated. Historical compatibility redirects are not specified because the original route-preservation evidence was not included in the supplied archive; compare this physical route with the host route registry before adding a redirect. The current physical route matrix is in `INTEGRATION_GUIDE.md`. Host redirect/API collision checks remain `DEFERRED_TO_HOST_RUNTIME`.

**API/data migration:** no backend API endpoint or request/response contract was intentionally changed in this batch. No database migration evidence is included in the supplied frontend ZIP.

**Source rollback:** restore the pre-RBG1 source snapshot/previous `frontend-superadmin-v4-fix.zip` if the migration must be reverted, including the import graph and directory tree as one unit. Do not roll back only the route shims or only the moved components.

## 16. Test Coverage Map & Quality Gates

**Test files in leaf:** 16

- `tests/SuperadminCommunicationMessagingCenterBasic.test.tsx`
- `tests/SuperadminCommunicationMessagingCenterDateRangeUtils.testBehavior.testBehavior.ts`
- `tests/components/SuperadminCommunicationMessagingCenterTenantDropdown.test.tsx`
- `tests/constants/SuperadminCommunicationMessagingCenterStatusBadgeConfig.test.ts`
- `tests/hooks/useSuperadminCommunicationMessagingCenter.test.tsx`
- `tests/hooks/useSuperadminCommunicationMessagingCenterUrlState.test.ts`
- `tests/hooks/useSuperadminCommunicationMessagingCenterDebouncedValue.test.ts`
- `tests/hooks/useSuperadminCommunicationMessagingCenterCompose.test.ts`
- `tests/hooks/useSuperadminCommunicationMessagingCenterDateRangePicker.test.ts`
- `tests/hooks/useSuperadminCommunicationMessagingCenterMainViewModel.test.ts`
- `tests/hooks/useSuperadminCommunicationMessagingCenterNotificationMutations.test.tsx`
- `tests/hooks/useSuperadminCommunicationMessagingCenterNotifications.test.tsx`
- `tests/hooks/useSuperadminCommunicationMessagingCenterSendMutation.test.tsx`
- `tests/hooks/useSuperadminCommunicationMessagingCenterSocketEvent.test.ts`
- `tests/schemas/SuperadminCommunicationMessagingCenterComposeSchema.test.ts`
- `tests/utils/SuperadminCommunicationMessagingCenterDateRangeUtils.test.ts`
- `tests/utils/SuperadminCommunicationMessagingCenterFormatCurrency.test.ts`
- `tests/utils/SuperadminCommunicationMessagingCenterFormatters.test.ts`

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

_No matching source evidence was found in this supplied sub-module; see the verification status._

Any endpoint, DTO field, response envelope, permission, flag or mutation behavior not evidenced in the actual URL config, API facade, Zod schema, TypeScript types, feature specification or mock fixtures must remain `NOT_VERIFIED`. The structural migration did not invent such contracts.

## 19. Rule Compliance Checklist (35+ Verification Items)

The following 35 checks describe the status at this RBG1 checkpoint. `NOT_VERIFIED` is intentionally distinct from `PASS`; the checklist must be refreshed after the later RBGs and final Section 43P gate.

| # | Control | Status | Evidence / next verification |
| --- | --- | --- | --- |
| 1 | Domain root quarantine | PASS | Root page is compatibility redirect; master trio retained. |
| 2 | Canonical leaf name | PASS | `messaging_center/` is the terminal feature leaf. |
| 3 | Canonical category names | PASS | Mapped to standard category directory names in migration manifest. |
| 4 | Centralized URL config location | PASS | config/superadmin_communication_messaging_center.url_config.ts |
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

**Canonical leaf path:** `src/app/frontend_superadmin/superadmin_communication/communication_messaging_center/` (archive-relative path: `frontend_superadmin/superadmin_communication/communication_messaging_center/`).

### Source-present standalone assets

| Artifact | Evidence / status |
| --- | --- |
| Vitest/RTL test source | `22` TypeScript/TSX test files are present; execution is `NOT_VERIFIED_IN_SCOPE` because the supplied archive has no host root package manifest, installed Vitest, or host TypeScript config. |
| Module-owned MSW handlers | `1` handler file(s) present in this leaf. |
| Module-owned fixtures/data | `1` fixture/data file(s) present in this leaf. |
| Harness wrapper | `tests/harness/SuperadminCommunicationMessagingCenterHarness.tsx` — local `NextIntlClientProvider` and `QueryClientProvider` wrapper. |
| Harness/bootstrap | `tests/harness/SuperadminCommunicationMessagingCenterHarnessBootstrap.ts` — registers the owning leaf's handlers and exposes start/reset/stop plus isolated QueryClient functions. |
| Scenario contract | `mocks/scenarios/superadmin_communication_messaging_center.scenarios.ts` — explicit ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED response scenarios; ACTIVE/EMPTY payloads are passed from this leaf's fixtures rather than invented here. |
| Scenario regression tests | `1` focused file(s) under `tests/mocks/scenarios/`; source-authored, runner execution not verified. |
| Host stubs | `contracts/host-stubs.d.ts` is intended for isolated type compatibility only; it is not an implementation of host runtime services. |

### Endpoint and scenario selection

- **Primary configured API endpoint for the scenario harness:** `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API.BASE` in `config/superadmin_communication_messaging_center.url_config.ts`. The API literal remains owned by the config; do not hardcode a parallel copy in production modules.
- **Test scenario query:** append `?__mockScenario=ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, or `UNAUTHORIZED` to that configured endpoint when the feature's scenario handler is installed by the test server. The scenario override is a test/mock facility and does not modify the production API URL or assume the host has enabled runtime scenario toggles.
- **Role/auth fixture:** no host credentials or verified session-claim payload was supplied. Use the host's approved Superadmin test identity; do not invent credentials or treat the API-level 401 scenario as proof of all route-guard behavior.

### Host verification commands (not executed in this environment)

```bash
npm run test -- src/app/frontend_superadmin/superadmin_communication/communication_messaging_center/tests
npx tsc --noEmit
npm run lint
```

These commands require the target host project root, its locked dependencies and its real alias/provider configuration. Source parser/import checks are not substitutes for a semantic host typecheck or test execution.



### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminCommunicationMessagingCenterDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide

1. **Folder transfer:** copy `src/app/frontend_superadmin/superadmin_communication/communication_messaging_center/` as the autonomous leaf. Keep the role-domain master docs and any compatibility route shim in the containing archive when the documented route-preservation matrix requires them; do not pull sibling feature business code into this leaf.
2. **Core contracts:** provide the verified host API transport, auth/session and permission providers, logger/error-monitoring adapter, socket/display-value adapters where used, zero-business UI primitives, `next-intl` messages/provider, Tailwind semantic token mapping, and TanStack Query provider. `contracts/host-stubs.d.ts` is type-only and must not be mistaken for runtime implementations.
3. **Route and URL configuration:** preserve `config/superadmin_communication_messaging_center.url_config.ts` and the exported `SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API` contract exactly. Confirm the host's route prefix and rewrite behavior against the route-preservation matrix; endpoint literals must not be rewritten by inference.
4. **Verification and mocks:** run the leaf tests, the focused mock scenario regression file, `npx tsc --noEmit`, lint and the owning Playwright E2E suite in the actual host. Confirm mutable fixture reset between tests and inspect all five scenario outcomes. Authenticated browser checks remain `DEFERRED_TO_HOST_RUNTIME` until a host base URL, approved storage state and browser runner exist.



### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/SearchableDropdown |
| @/components/ui/Feedback/ConfirmProvider |
| @/components/ui/Pagination |
| @/components/ui/Tooltip |
| @/lib/logger |

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

The domain-level master documents remain authoritative for long-form user flows, existing API narratives, business edge cases, and module-specific constraints. The exact source excerpts incorporated above are from `superadmin_communication_messaging_features.md`; consult that master file before making changes where this leaf contract identifies a gap.

### v13 Notifications boundary
Notification list/acknowledgement state, API, tests and mocks are now in standalone `communication_notifications`. Legacy `?tab=notifications` redirects to its canonical leaf. Messaging now owns outbound messages/compose only.

### v13 ownership cleanup
Notification API methods, notification MSW handlers, notification entity schemas/types, notification-specific hooks, fixtures, and tests have been transferred or rehomed into the standalone notifications leaf. Legacy `?tab=notifications` remains a compatibility navigation contract.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

