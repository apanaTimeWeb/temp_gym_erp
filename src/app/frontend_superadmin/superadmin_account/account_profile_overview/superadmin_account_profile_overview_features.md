---
feature: "superadmin_account_profile_overview"
owner_role: "superadmin"
module_version: 18
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_YET_VERIFIED (target 8/8)"
---

# Superadmin Profile Overview — Autonomous Sub-Module Contract

This specification was generated from the supplied Superadmin web ZIP and the parent domain contract `superadmin_account_features.md`. The inherited master contract remains at the parent domain root; this leaf document records the current autonomous leaf ownership after RBG1 structural migration. Any unknown contract is explicitly marked `NOT_VERIFIED` or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than inferred.


**Parent domain contract:** `superadmin_account_features.md` is the inherited domain-level contract; this leaf document is authoritative for the physical leaf implementation and its current inventory.

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Personal profile and avatar updates, with a single full-data-export action; password and two-factor editing are independently routed in account_security. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

### Route-entry evidence

| Entry file | Filesystem-derived route | Evidence boundary |
| --- | --- | --- |
| `page.tsx` | /frontend_superadmin/superadmin_account/account_profile_overview | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `loading.tsx` | `/frontend_superadmin/superadmin_account/account_profile_overview` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `error.tsx` | `/frontend_superadmin/superadmin_account/account_profile_overview` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `not-found.tsx` | `/frontend_superadmin/superadmin_account/account_profile_overview` | Canonical route entry present in owning feature module; host alias redirects are specified separately |

**Current v12 repair snapshot:** `63` files total in this leaf, including the documentation trio and route entries. Route entries: `error.tsx, loading.tsx, not-found.tsx, page.tsx`. Counts above are recomputed from the supplied v11 baseline plus the approved RBG-01–03 repair changes; browser/runtime routing remains host-dependent.

### Leaf-owned artifact inventory

| Category | File count | Representative source paths (relative to this leaf) |
| --- | ---: | --- |
| `components/` | 5 | `components/profile_overview_avatar_card/SuperadminAccountProfileOverviewAvatarCard.tsx`, `components/profile_overview_data_export_card/SuperadminAccountProfileOverviewDataExportCard.tsx`, `components/profile_overview_main/SuperadminAccountProfileOverviewMain.tsx` |
| `hooks/` | 7 | `hooks/useSuperadminAccountProfileOverviewDataExportMutation.ts`, `hooks/useSuperadminAccountProfileOverviewPage.ts`, `hooks/useSuperadminAccountProfileOverviewToggleTwoFactorMutation.ts` |
| `api/` | 3 | `api/superadmin_account_profile_overview.api.ts`, `api/superadmin_account_profile_overview_data_export.api.ts` |
| `state/` | 1 | `state/SuperadminAccountProfileOverviewGitkeep` |
| `types/` | 5 | `types/superadmin_account_profile_overview.types.ts`, `types/superadmin_account_profile_overview_avatar_card.types.ts`, `types/superadmin_account_profile_overview_data_export.types.ts` |
| `schemas/` | 6 | `schemas/superadmin_account_profile_overview_api.schemas.ts`, `schemas/superadmin_account_profile_overview_data_export.schemas.ts`, `schemas/superadmin_account_profile_overview_personal_form.schemas.ts` |
| `utils/` | 2 | `utils/SuperadminAccountProfileOverviewFormatters.ts` |
| `mocks/` | 3 | `mocks/fixtures/SuperadminAccountProfileOverviewMockFixtures.ts`, `mocks/handlers/SuperadminAccountProfileOverviewMockHandlers.ts` |
| `tests/` | 18 | `tests/SuperadminAccountProfileOverviewBasic.test.tsx`, `tests/components/profile_overview_main/SuperadminAccountProfileOverviewMain.test.tsx`, `tests/constants/SuperadminAccountProfileOverviewConstants.test.ts` |
| `config/` | 3 | `config/superadmin_account_profile_overview.url_config.ts` |
| `contracts/` | 1 | `contracts/host-stubs.d.ts` |
| `locales/` | 2 | `locales/superadmin_account_profile_overview_en.json`, `locales/superadmin_account_profile_overview_hi.json` |
| `constants/` | 2 | `constants/superadmin_account_profile_overview.constants.ts`, `api/superadmin_account_profile_overview.query_keys.ts` |

### Direct leaf-root files

- `error.tsx`
- `loading.tsx`
- `not-found.tsx`
- `page.tsx`

This inventory is generated from the current filesystem and is authoritative for file placement only. Component responsibility and supported business behavior must be inferred from the actual source implementation, not from filenames alone.



### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminAccountProfileOverviewPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for account_profile_overview, with no sibling-module dependencies. |
| components/profile_overview_avatar_card/SuperadminAccountProfileOverviewAvatarCard.tsx | Renders/orchestrates SuperadminAccountProfileAvatarCard within its owning Superadmin feature module; no direct backend implementation. |
| components/profile_overview_data_export_card/SuperadminAccountProfileOverviewDataExportCard.tsx | Renders/orchestrates SuperadminAccountProfileDataExportCard within its owning Superadmin feature module; no direct backend implementation. |
| components/profile_overview_main/SuperadminAccountProfileOverviewMain.tsx | Renders Superadmin Account Profile Overview Main using its declared props and feature-local hooks. |
| components/profile_overview_personal_form/SuperadminAccountProfileOverviewPersonalForm.tsx | Renders/orchestrates SuperadminAccountProfilePersonalForm within its owning Superadmin feature module; no direct backend implementation. |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | Renders/orchestrates SuperadminAccountProfileSecurityForm within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows

### Route identity evidence

- Leaf route-entry directory: `/frontend_superadmin/superadmin_account/account_profile_overview/` (filesystem-derived from this ZIP).
- Leaf entry file present: `page.tsx` = `present`.
- Configured parent/compatibility route value: `/frontend_superadmin/superadmin_account/account_profile_overview`.
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
| `fetchProfile` | `OMITTED_AT_CALLSITE` | `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE` | `SuperadminAccountProfileData` | dataSchema | no / not evidenced in this call | `superadmin_account_profile_overview.api.ts` |
| `updateProfile` | `"PATCH"` | `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE` | `SuperadminAccountProfileData` | dataSchema | yes | `superadmin_account_profile_overview.api.ts` |
| `updatePassword` | `"PATCH"` | `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.PASSWORD` | `null` | dataSchema | yes | `superadmin_account_profile_overview.api.ts` |
| `updateTwoFactor` | `"PATCH"` | `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.TWO_FACTOR` | `SuperadminAccountProfileData` | dataSchema | yes | `superadmin_account_profile_overview.api.ts` |
| `requestFullDataExport` | `"POST"` | `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.EXPORT_DATA` | `null` | responseSchema | yes | `superadmin_account_profile_overview_data_export.api.ts` |

### Canonical URL configuration values observed in source

| Config symbol / property | Declared value |
| --- | --- |
| `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API[BASE]` | `"/superadmin/profile"` |
| `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API[PASSWORD]` | `"/superadmin/profile/password"` |
| `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API[CHANGE_CREDENTIALS]` | `"/superadmin/profile/password"` |
| `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API[EXPORT_DATA]` | `"/api/v1/superadmin/export-data"` |
| `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API[TWO_FACTOR]` | `"/superadmin/profile/2fa"` |

### Route config and contract boundaries

- URL config file(s): `superadmin_account_profile_overview.url_config.ts`.
- Configured `*_ROUTES.MAIN` value: `"/frontend_superadmin/superadmin_account/account_profile_overview"`.
- Response field shapes and mutation payloads are governed by the TypeScript/Zod schemas and function signatures in this leaf; values not declared there must not be invented.
- Public URL aliases/rewrites outside the supplied role tree and live backend behavior are `NOT_VERIFIED_IN_SCOPE`.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_account_profile_overview.api.ts:20 | GET | SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE | Present |
| api/superadmin_account_profile_overview.api.ts:21 | PATCH | SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE | Present |
| api/superadmin_account_profile_overview.api.ts:27 | PATCH | SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.PASSWORD | Present |
| api/superadmin_account_profile_overview.api.ts:33 | PATCH | SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.TWO_FACTOR | Present |
| api/superadmin_account_profile_overview_api_fetch.api.ts:11 | GET | url | See API wrapper validation |
| api/superadmin_account_profile_overview_data_export.api.ts:20 | POST | SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.EXPORT_DATA | Present |

Response types: `types/superadmin_account_profile_overview.types.ts`, `types/superadmin_account_profile_overview_avatar_card.types.ts`, `types/superadmin_account_profile_overview_data_export.types.ts`, `types/superadmin_account_profile_overview_next_error_props.types.ts`, `types/superadmin_account_profile_overview_personal_form.types.ts`, `types/superadmin_account_profile_overview_security_form.types.ts`.

Validation schemas: `schemas/superadmin_account_profile_overview_api.schemas.ts`, `schemas/superadmin_account_profile_overview_api_response.schema.ts`, `schemas/superadmin_account_profile_overview_data_export.schemas.ts`, `schemas/superadmin_account_profile_overview_personal_form.schemas.ts`, `schemas/superadmin_account_profile_overview_security_form.schemas.ts`, `schemas/superadmin_account_profile_overview_types.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 35 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

### `api/superadmin_account_profile_overview.query_keys.ts`

```typescript
/**
 * @description Canonical TanStack Query key registry for the superadmin profile feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS = {
  all: ['superadmin_account_profile', 'profile'] as const,
} as const;
```

### `api/superadmin_account_profile_overview.query_keys.ts`

```typescript
/**
 * @description Canonical TanStack Query key registry for the superadmin profile feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS = {
  all: ['superadmin_account_profile', 'profile'] as const,
} as const;
```

Query-cache invalidation and key consistency are not treated as verified merely because a key file exists. The operation-by-operation audit is assigned to RBG2.

## 6. Mutation Inventory & Lifecycle Operations

| Function | Method evidence | URL expression | Source file |
| --- | --- | --- | --- |
| fetchProfile | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE; method still requires exact call-block verification | /frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.api.ts |
| updateProfile | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE; method still requires exact call-block verification | /frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.api.ts |
| updatePassword | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.PASSWORD; method still requires exact call-block verification | /frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.api.ts |
| updateTwoFactor | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.TWO_FACTOR; method still requires exact call-block verification | /frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.api.ts |
| requestFullDataExport | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.EXPORT_DATA; method still requires exact call-block verification | /frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_data_export.api.ts |

**Mutation safety evidence:** the structural migration did not modify API request payloads, endpoint constant values, or mutation function bodies except updating import specifiers. Idempotency UUID generation, stable retry behavior, and one-time key lifecycle remain `NOT_VERIFIED` until RBG2 traces each mutation and its caller.

## 7. Permissions and Role Rules

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_account_profile_forbidden.md`; frontend checks do not replace backend authorization.

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
- **URL state:** No `useUrlState` usage detected; no module-owned list/filter URL state was evidenced.
- **Query-key registries:** `api/superadmin_account_profile_overview.query_keys.ts`
- **MSW handlers:** `mocks/handlers/SuperadminAccountProfileOverviewMockHandlers.ts`
- **MSW fixtures:** `mocks/fixtures/SuperadminAccountProfileOverviewMockFixtures.ts`

- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

### Files observed in state ownership

| State file | Observed role |
| --- | --- |
| state/SuperadminAccountProfileOverviewGitkeep | Module-local state artifact; semantics must be confirmed from its exports before changes. |

Server data is expected to remain under the existing TanStack Query integration; the structural move does not change state ownership behavior.

## 9. Offline, Loading, Empty, and Error States

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

The current source scan does not establish a complete offline/reconnect contract. Do not claim offline support from retry handlers alone. If reconnect reconciliation is a product requirement, record it as `CONTRACT_INCOMPLETE` until a verified backend/client contract is supplied.

## 10. Security and PII Rules (Data Masking & Guards)

### Existing forbidden-pattern contract

# superadmin_account_profile — Forbidden Patterns

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
| api/superadmin_account_profile_overview.api.ts | 2 | import { SuperadminAccountProfilePasswordResponseDataSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api.schemas'; |
| api/superadmin_account_profile_overview.api.ts | 15 | import type { SuperadminAccountProfileData, UpdateSuperadminAccountProfilePayload, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overv |
| api/superadmin_account_profile_overview.api.ts | 25 | headers: { 'Idempotency-Key': idempotencyKey }, |
| api/superadmin_account_profile_overview.api.ts | 28 | updatePassword: (payload: UpdateSuperadminPasswordPayload, idempotencyKey: string) => apiFetch<ApiResponse<null>>(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.PASSWORD, { |
| api/superadmin_account_profile_overview.api.ts | 31 | headers: { 'Idempotency-Key': idempotencyKey }, |
| api/superadmin_account_profile_overview.api.ts | 32 | dataSchema: SuperadminAccountProfilePasswordResponseDataSchema |
| api/superadmin_account_profile_overview.api.ts | 37 | headers: { 'Idempotency-Key': idempotencyKey }, |
| api/superadmin_account_profile_overview_data_export.api.ts | 23 | headers: { 'Idempotency-Key': idempotencyKey }, |
| components/profile_overview_main/SuperadminAccountProfileOverviewMain.tsx | 24 | const { activeTab, setActiveTab, profile, profileLoading, profileError, refetchProfile, personalState, passwordState, twoFAState, updatePersonalProfile, updatePassword, toggleTwoFactor, requestFullDataExport, isRequestin |
| components/profile_overview_main/SuperadminAccountProfileOverviewMain.tsx | 69 | {activeTab === 'security' && (<SuperadminAccountProfileSecurityForm profile={profile} isSavingPassword={passwordState === 'loading'} isTogglingTwoFA={twoFAState === 'loading'} onSavePassword={updatePassword} onToggle2FA={toggle |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 3 | // RESPONSIBILITY: Security settings form — change password and toggle 2FA. |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 12 | import { passwordSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_security_form.schemas'; |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 15 | import type { SuperadminAccountProfileData, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview.types'; |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 20 | * @description Security settings form — change password and toggle 2FA. |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 24 | export default function SuperadminAccountProfileSecurityForm({ profile, isSavingPassword, isTogglingTwoFA, onSavePassword, onToggle2FA, }: SuperadminAccountProfileSecurityFormProps) { |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 29 | const [twoFAPassword, setTwoFAPassword] = useState(''); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 30 | const [passwordSaveError, setPasswordSaveError] = useState(false); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 32 | const [showTwoFAPassword, setShowTwoFAPassword] = useState(false); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 33 | const { register, handleSubmit, reset, formState: { errors, isDirty }, } = useForm<SuperadminAccountProfileSecurityFormValues>({ resolver: zodResolver(passwordSchema) }); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 34 | useSuperadminPlatformShellLayoutUnsavedChangesGuard(isDirty, t('ui.unsaved_password_changes_leave')); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 35 | async function handlePasswordSubmit(values: SuperadminAccountProfileSecurityFormValues) { |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 36 | setPasswordSaveError(false); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 38 | const { currentPassword, newPassword } = values; |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 40 | await onSavePassword({ currentPassword, newPassword }); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 43 | setPasswordSaveError(true); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 47 | if (!twoFAPassword.trim()) return; |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 50 | await onToggle2FA({ enabled: !profile.twoFactorEnabled, password: twoFAPassword }); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 51 | setTwoFAPassword(''); |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 58 | {/* Change Password */} |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 60 | <h3 className="text-base font-semibold text-primary mb-4">{t('ui.change_password_a006714')}</h3> |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 61 | <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-4" data-testid="superadmin_account_profile-superadmin-profile-security-form-superadmin_account_profile-superadminprofilesecurityform-form-submit"> |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 63 | { id: 'currentPassword', label: t('ui.current_password_6c0a4d8'), show: showCurrent, toggle: () => setShowCurrent((v) => !v) }, |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 64 | { id: 'newPassword', label: t('ui.new_password_054361c'), show: showNew, toggle: () => setShowNew((v) => !v) }, |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 65 | { id: 'confirmPassword', label: t('ui.confirm_new_password_0cd5102'), show: showConfirm, toggle: () => setShowConfirm((v) => !v) }, |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 71 | <input id={`superadmin_account_profile-${id}`} {...register(id as keyof SuperadminAccountProfileSecurityFormValues)} type={show ? 'text' : 'password'} className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prima |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 72 | <button type="button" onClick={toggle} aria-label={show ? t('ui.hide_password_db87709') : t('ui.show_password_636b860')} className="min-w-11 min-h-11 absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-pr |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 81 | {passwordSaveError && <p className="text-sm text-danger" role="alert">{t('ui.action_failed_retry')}</p>} |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 83 | <button type="submit" disabled={isSavingPassword \|\| !isDirty} className="min-h-11 min-w-36 flex items-center gap-2 px-5 py-2.5 bg-primary-subtle hover:bg-primary-hover text-primary hover:text-on-primary font-semibold tex |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 84 | {isSavingPassword && <Loader2 size={18} className="motion-safe:animate-spin" strokeWidth={2}/>} |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 85 | {isSavingPassword ? t('ui.updating') : t('ui.update_password_e103e58')} |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 111 | <label htmlFor="superadmin_account_profile-2fa-password" className="block text-sm font-medium text-secondary mb-1.5"> |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 113 | {t('ui.confirm_with_your_password_88e3b2f')} <span className="text-danger">{t('ui.text_3389dae3')}</span> |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 116 | <input  id="superadmin_account_profile-2fa-password" type={showTwoFAPassword ? 'text' : 'password'} value={twoFAPassword} onChange={(e) => setTwoFAPassword(e.target.value)} placeholder={t('ui.enter_your_current_password_057aa0c' |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 117 | <button  type="button" onClick={() => setShowTwoFAPassword((v) => !v)} aria-label={showTwoFAPassword ? t('ui.hide_password_db87709') : t('ui.show_password_636b860')} className="min-w-11 min-h-11 absolute right-3 top-1/2  |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 118 | {showTwoFAPassword ? <EyeOff size={18} strokeWidth={2}/> : <Eye size={18} strokeWidth={2}/>} |
| components/profile_overview_security_form/SuperadminAccountProfileOverviewSecurityForm.tsx | 123 | <button type="button" onClick={handleToggle2FA} disabled={isTogglingTwoFA \|\| !twoFAPassword.trim()} className={`min-h-11 min-w-36 flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg motion-safe:transitio |
| config/superadmin_account_profile_overview.url_config.ts | 11 | PASSWORD: '/superadmin/profile/password', |
| config/superadmin_account_profile_overview.url_config.ts | 12 | CHANGE_CREDENTIALS: '/superadmin/profile/password', |
| error.tsx | 17 | * @dependencies Uses the existing module logger and approved semantic design tokens; no feature business data is owned here. |
| hooks/useSuperadminAccountProfileOverviewPage.ts | 12 | import { useSuperadminAccountProfileOverviewUpdatePasswordMutation } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewUpdatePasswordMutation'; |

The RBG1 operation changed file locations and import specifiers, not payload schemas or endpoint literals. A clean security assessment is not claimed until RBG2/RBG3 verify storage, logging, authorization boundaries, mutation keys and user-safe error handling.

## 11. Accessibility Requirements (A11y)


### Canonical theme and responsive contract

The authoritative exact token inventory for this leaf is [`superadmin_account_profile_overview_theme_contract.md`](superadmin_account_profile_overview_theme_contract.md). Do not copy or redefine global token mappings here. The global token source (`globals.css` and Tailwind `@theme inline`) is host-owned and not included in this role ZIP, so token definition/mapping existence remains `NOT_VERIFIED_IN_SCOPE`.

Implement focus indicators, keyboard support, semantic labels, sufficient contrast, responsive collapse, and reduced-motion-safe transitions according to `WEB_FRONTEND_UI_UX_DESIGN.md` and the architecture document. Source-level findings are listed in the RBG3 checkpoint; live browser accessibility behavior remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

| File | Line | Source evidence |
| --- | --- | --- |
| components/profile_overview_data_export_card/SuperadminAccountProfileOverviewDataExportCard.tsx | 14 | * @edge-case Never blocks on a file download; the API request is short-lived and completion is reported asynchronously through the role WebSocket flow. |

No background-task contract is inferred from a token match alone. The supplied frontend source may consume real-time host capabilities, but event lifecycle, cleanup, retry and authorization require explicit evidence before behavior changes.

## 13. Feature Flags & Tenant Settings

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

If no flag source is found, that means the provided module source did not expose a flag declaration; it does not prove that the product has no host-managed flag system. Flag semantics are `NOT_VERIFIED` unless documented in the master contract or typed configuration.

## 14. Cache Invalidation & Consistency

| File | Line | Source evidence |
| --- | --- | --- |
| hooks/useSuperadminAccountProfileOverviewDataExportMutation.ts | 42 | void queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all }); |
| hooks/useSuperadminAccountProfileOverviewToggleTwoFactorMutation.ts | 44 | await queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all }); |
| hooks/useSuperadminAccountProfileOverviewUpdatePasswordMutation.ts | 44 | await queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all }); |
| hooks/useSuperadminAccountProfileOverviewUpdateProfileMutation.ts | 44 | await queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all }); |

RBG2 must verify each mutation’s invalidated key family, optimistic update/rollback behavior, and list/detail consistency against the existing query-key registry. No cache key was invented during RBG1.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

**Frontend route ownership:** the route entry is physically owned by `superadmin_account/account_profile_overview/page.tsx` and resolves to `/frontend_superadmin/superadmin_account/account_profile_overview`. Alias-only page files are not duplicated. Historical compatibility redirects are not specified because the original route-preservation evidence was not included in the supplied archive; compare this physical route with the host route registry before adding a redirect. The current physical route matrix is in `INTEGRATION_GUIDE.md`. Host redirect/API collision checks remain `DEFERRED_TO_HOST_RUNTIME`.

**API/data migration:** no backend API endpoint or request/response contract was intentionally changed in this batch. No database migration evidence is included in the supplied frontend ZIP.

**Source rollback:** restore the pre-RBG1 source snapshot/previous `frontend-superadmin-v4-fix.zip` if the migration must be reverted, including the import graph and directory tree as one unit. Do not roll back only the route shims or only the moved components.

## 16. Test Coverage Map & Quality Gates

**Test files in leaf:** 11

- `tests/SuperadminAccountProfileOverviewBasic.test.tsx`
- `tests/components/profile_overview_main/SuperadminAccountProfileOverviewMain.test.tsx`
- `tests/constants/SuperadminAccountProfileOverviewConstants.test.ts`
- `tests/hooks/useSuperadminAccountProfileOverviewDataExportMutation.test.tsx`
- `tests/hooks/useSuperadminAccountProfileOverviewPage.test.tsx`
- `tests/hooks/useSuperadminAccountProfileOverviewToggleTwoFactorMutation.test.tsx`
- `tests/hooks/useSuperadminAccountProfileOverviewUpdatePasswordMutation.test.tsx`
- `tests/hooks/useSuperadminAccountProfileOverviewUpdateProfileMutation.test.tsx`
- `tests/schemas/SuperadminAccountProfileOverviewPersonalFormSchema.test.ts`
- `tests/schemas/SuperadminAccountProfileOverviewSecurityFormSchema.test.ts`
- `tests/utils/SuperadminAccountProfileOverviewFormatters.test.ts`

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
| 2 | Canonical leaf name | PASS | `profile_overview/` is the terminal feature leaf. |
| 3 | Canonical category names | PASS | Mapped to standard category directory names in migration manifest. |
| 4 | Centralized URL config location | PASS | config/superadmin_account_profile_overview.url_config.ts |
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

**Canonical leaf path:** `src/app/frontend_superadmin/superadmin_account/account_profile_overview/` (archive-relative path: `frontend_superadmin/superadmin_account/account_profile_overview/`).

### Source-present standalone assets

| Artifact | Evidence / status |
| --- | --- |
| Vitest/RTL test source | `14` TypeScript/TSX test files are present; execution is `NOT_VERIFIED_IN_SCOPE` because the supplied archive has no host root package manifest, installed Vitest, or host TypeScript config. |
| Module-owned MSW handlers | `1` handler file(s) present in this leaf. |
| Module-owned fixtures/data | `1` fixture/data file(s) present in this leaf. |
| Harness wrapper | `tests/harness/SuperadminAccountProfileOverviewHarness.tsx` — local `NextIntlClientProvider` and `QueryClientProvider` wrapper. |
| Harness/bootstrap | `tests/harness/SuperadminAccountProfileOverviewHarnessBootstrap.ts` — registers the owning leaf's handlers and exposes start/reset/stop plus isolated QueryClient functions. |
| Scenario contract | `mocks/scenarios/superadmin_account_profile_overview.scenarios.ts` — explicit ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED response scenarios; ACTIVE/EMPTY payloads are passed from this leaf's fixtures rather than invented here. |
| Scenario regression tests | `1` focused file(s) under `tests/mocks/scenarios/`; source-authored, runner execution not verified. |
| Host stubs | `contracts/host-stubs.d.ts` is intended for isolated type compatibility only; it is not an implementation of host runtime services. |

### Endpoint and scenario selection

- **Primary configured API endpoint for the scenario harness:** `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE` in `config/superadmin_account_profile_overview.url_config.ts`. The API literal remains owned by the config; do not hardcode a parallel copy in production modules.
- **Test scenario query:** append `?__mockScenario=ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, or `UNAUTHORIZED` to that configured endpoint when the feature's scenario handler is installed by the test server. The scenario override is a test/mock facility and does not modify the production API URL or assume the host has enabled runtime scenario toggles.
- **Role/auth fixture:** no host credentials or verified session-claim payload was supplied. Use the host's approved Superadmin test identity; do not invent credentials or treat the API-level 401 scenario as proof of all route-guard behavior.

### Host verification commands (not executed in this environment)

```bash
npm run test -- src/app/frontend_superadmin/superadmin_account/account_profile_overview/tests
npx tsc --noEmit
npm run lint
```

These commands require the target host project root, its locked dependencies and its real alias/provider configuration. Source parser/import checks are not substitutes for a semantic host typecheck or test execution.



### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminAccountProfileOverviewDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide

1. **Folder transfer:** copy `src/app/frontend_superadmin/superadmin_account/account_profile_overview/` as the autonomous leaf. Keep the role-domain master docs and any compatibility route shim in the containing archive when the documented route-preservation matrix requires them; do not pull sibling feature business code into this leaf.
2. **Core contracts:** provide the verified host API transport, auth/session and permission providers, logger/error-monitoring adapter, socket/display-value adapters where used, zero-business UI primitives, `next-intl` messages/provider, Tailwind semantic token mapping, and TanStack Query provider. `contracts/host-stubs.d.ts` is type-only and must not be mistaken for runtime implementations.
3. **Route and URL configuration:** preserve `config/superadmin_account_profile_overview.url_config.ts` and the exported `SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API` contract exactly. Confirm the host's route prefix and rewrite behavior against the route-preservation matrix; endpoint literals must not be rewritten by inference.
4. **Verification and mocks:** run the leaf tests, the focused mock scenario regression file, `npx tsc --noEmit`, lint and the owning Playwright E2E suite in the actual host. Confirm mutable fixture reset between tests and inspect all five scenario outcomes. Authenticated browser checks remain `DEFERRED_TO_HOST_RUNTIME` until a host base URL, approved storage state and browser runner exist.



### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/lib/logger |
| @/lib/socket |
| @/components/ui/Feedback/ConfirmProvider |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)

**Current version:** `v12 partial` (combined RBG-01–03 repair checkpoint, 2026-10-30). **Commit:** `not produced in this source-only environment`. Earlier RBG1/RBG4 entries are historical records, not the current version label.

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

The domain-level master documents remain authoritative for long-form user flows, existing API narratives, business edge cases, and module-specific constraints. The exact source excerpts incorporated above are from `superadmin_account_profile_features.md`; consult that master file before making changes where this leaf contract identifies a gap.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

