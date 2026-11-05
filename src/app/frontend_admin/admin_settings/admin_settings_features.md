# Admin Settings — Feature Map


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Module Purpose
The Admin Settings module is the administrative configuration workspace for gym-level profile, GST, payment-gateway, notification, application-integration, and role-related settings exposed by the supplied frontend. Users can navigate settings sections, load current configuration, edit supported settings, manage sensitive secret fields with visibility toggles, and preserve changes across validation or unsaved-change warnings. The module owns the settings schema and mutation flows while relying only on approved shell infrastructure. It does not implement the blocked full-data-export backend workflow without an authoritative contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/frontend_admin/admin_settings/settings_management` | ``frontend_admin/admin_settings/page.tsx`` | ``frontend_admin/admin_settings/settings_management/components/admin_settings_main/AdminSettingsMain.tsx`` |

## Dependency Manifest
- Next.js App Router (framework structure detected; exact version NOT_VERIFIED because the host package manifest is absent)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- React Hook Form 7.x
- Zod 3.x
- @hookform/resolvers 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_settings/`. The following inventory is regenerated from the current physical source tree; file names are exact and relative to this module root.

| Folder | Responsibility | Direct Files |
|---|---|---|
| `admin_settings/settings_management/` | Leaf-owned feature implementation files. | admin_settings_management_features.md, admin_settings_management_forbidden.md, admin_settings_management_theme_contract.md, error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_settings/settings_management/api/` | Leaf-owned API transport boundary. | admin_settings_management_api.ts, admin_settings_management_roles_api.ts |
| `admin_settings/settings_management/components/app_integration/` | Leaf-owned feature implementation files. | AdminSettingsManagementAppIntegration.tsx |
| `admin_settings/settings_management/components/banner/` | Leaf-owned feature implementation files. | AdminSettingsManagementBanner.tsx |
| `admin_settings/settings_management/components/content/` | Leaf-owned feature implementation files. | AdminSettingsManagementContent.tsx |
| `admin_settings/settings_management/components/empty_state/` | Leaf-owned feature implementation files. | AdminSettingsManagementEmptyState.tsx |
| `admin_settings/settings_management/components/feedback/` | Leaf-owned feature implementation files. | AdminSettingsManagementBackendMessage.ts, AdminSettingsManagementConfirmModal.tsx, AdminSettingsManagementConfirmProvider.tsx, AdminSettingsManagementToastService.ts |
| `admin_settings/settings_management/components/general/` | Leaf-owned feature implementation files. | AdminSettingsManagementGeneral.tsx |
| `admin_settings/settings_management/components/gst/` | Leaf-owned feature implementation files. | AdminSettingsManagementGST.tsx |
| `admin_settings/settings_management/components/gym_profile/` | Leaf-owned feature implementation files. | AdminSettingsManagementGymProfile.tsx |
| `admin_settings/settings_management/components/main_view/` | Leaf-owned main view and route composition. | AdminSettingsManagementMain.tsx |
| `admin_settings/settings_management/components/nav/` | Leaf-owned feature implementation files. | AdminSettingsManagementNav.tsx |
| `admin_settings/settings_management/components/notifications/` | Leaf-owned feature implementation files. | AdminSettingsManagementNotifications.tsx |
| `admin_settings/settings_management/components/payment_gateway/` | Leaf-owned feature implementation files. | AdminSettingsManagementPaymentGateway.tsx |
| `admin_settings/settings_management/components/roles/` | Leaf-owned feature implementation files. | AdminSettingsManagementRoles.tsx |
| `admin_settings/settings_management/components/shared/` | Leaf-owned feature implementation files. | AdminSettingsManagementToggleSwitch.tsx |
| `admin_settings/settings_management/components/shell/` | Leaf-owned feature implementation files. | AdminSettingsManagementNotFound.tsx |
| `admin_settings/settings_management/config/` | Leaf-owned route and URL configuration. | admin_settings_management.url_config.ts |
| `admin_settings/settings_management/constants/` | Leaf-owned constants and query-key registries. | AdminSettingsManagementConstants.ts, AdminSettingsManagementExternalUrlConstants.ts, AdminSettingsManagementQueryKeys.ts |
| `admin_settings/settings_management/contracts/` | Leaf-owned host contract stubs. | host-stubs.d.ts |
| `admin_settings/settings_management/hooks/` | Leaf-owned data-flow and interaction hooks. | useAdminSettingsManagementConfirm.ts, useAdminSettingsManagementData.ts, useAdminSettingsManagementForms.ts, useAdminSettingsManagementMutation.ts, useAdminSettingsManagementRolesData.ts, useAdminSettingsManagementSectionForm.ts, useAdminSettingsManagementUnsavedChangesGuard.ts |
| `admin_settings/settings_management/locales/` | Leaf-owned localized resources. | admin_settings_management_en.json, admin_settings_management_hi.json |
| `admin_settings/settings_management/mocks/fixtures/` | Leaf-owned mock fixtures. | AdminSettingsManagementMockFixtures.ts |
| `admin_settings/settings_management/mocks/handlers/` | Leaf-owned mock request handlers. | AdminSettingsManagementMockHandlers.ts |
| `admin_settings/settings_management/mocks/scenarios/` | Leaf-owned mock scenarios or scenario tests. | admin_settings_management.scenarios.ts |
| `admin_settings/settings_management/schemas/` | Leaf-owned runtime validation schemas. | AdminSettingsManagementSchemas.ts |
| `admin_settings/settings_management/state/` | Leaf-owned client state. | useAdminSettingsManagementToastStore.ts |
| `admin_settings/settings_management/tests/harness/` | Leaf-owned feature implementation files. | AdminSettingsManagementHarness.tsx, bootstrap.ts |
| `admin_settings/settings_management/tests/hooks/` | Leaf-owned data-flow and interaction hooks. | useAdminSettingsManagementData.test.ts, useAdminSettingsManagementForms.test.ts, useAdminSettingsManagementForms.test.tsx, useAdminSettingsManagementMutation.test.tsx, useAdminSettingsManagementRolesData.test.ts, useAdminSettingsManagementSectionForm.test.tsx, useAdminSettingsManagementUnsavedChangesGuard.test.ts |
| `admin_settings/settings_management/tests/scenarios/` | Leaf-owned mock scenarios or scenario tests. | AdminSettingsManagementScenarios.test.ts |
| `admin_settings/settings_management/tests/schemas/` | Leaf-owned runtime validation schemas. | AdminSettingsManagementSchemas.test.ts |
| `admin_settings/settings_management/tests/utils/` | Leaf-owned deterministic utilities and API response helpers. | AdminSettingsManagementApiResponse.test.ts |
| `admin_settings/settings_management/types/` | Leaf-owned domain, DTO, state, and prop types. | AdminSettingsManagementAppIntegrationPropsTypes.ts, AdminSettingsManagementConfirmModalTypes.ts, AdminSettingsManagementConfirmProviderTypes.ts, AdminSettingsManagementConfirmTypes.ts, AdminSettingsManagementErrorPropsTypes.ts, AdminSettingsManagementGSTPropsTypes.ts, AdminSettingsManagementGeneralPropsTypes.ts, AdminSettingsManagementGymProfilePropsTypes.ts, AdminSettingsManagementMockHandlerTypes.ts, AdminSettingsManagementMonitoringTypes.ts, AdminSettingsManagementMutationTypes.ts, AdminSettingsManagementNotificationsPropsTypes.ts, AdminSettingsManagementPaymentGatewayPropsTypes.ts, AdminSettingsManagementPermissionTypes.ts, AdminSettingsManagementShellContractTypes.ts, AdminSettingsManagementSortTypes.ts, AdminSettingsManagementToastStoreTypes.ts, AdminSettingsManagementToastTypes.ts, AdminSettingsManagementToggleSwitchPropsTypes.ts, AdminSettingsManagementTypes.ts |
| `admin_settings/settings_management/utils/` | Leaf-owned deterministic utilities and API response helpers. | AdminSettingsManagementApiResponse.ts, AdminSettingsManagementCreateIdempotencyKey.ts, AdminSettingsManagementGymConfiguration.ts, AdminSettingsManagementIdempotencyIntentStore.ts, AdminSettingsManagementMonitoring.ts |
## Feature Lifecycle Contract
- **Create:** Not present in the inspected supplied API client.
- **Read:** Present through `fetchSettings` for the supplied route/query surfaces.
- **Update:** Present through `updateSettings` in the inspected supplied API client.
- **Delete:** Not present in the inspected supplied API client.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutGymConfiguration`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastService`
- `@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutIdempotencyIntentStore`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminSettingsAppIntegration.tsx` | `Manages the App Integration settings tab.` |
| `AdminSettingsBanner.tsx` | `Renders the top banner with module title and save status indicator for the Settings page.` |
| `AdminSettingsContent.tsx` | `Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter.` |
| `AdminSettingsEmptyState.tsx` | `Renders the empty state for Admin settings tabular configuration data.` |
| `AdminSettingsGeneral.tsx` | `Manages the General Settings tab.` |
| `AdminSettingsGST.tsx` | `Manages the GST & Tax settings tab.` |
| `AdminSettingsGymProfile.tsx` | `Manages the Gym Profile settings form.` |
| `AdminSettingsMain.tsx` | `Entry component for the Settings module. Wraps the UI in the context provider and handles page layout.` |
| `AdminSettingsNav.tsx` | `Renders the left-side vertical navigation tabs for different settings sections.` |
| `AdminSettingsNotifications.tsx` | `Manages the Notifications settings tab.` |
| `AdminSettingsPaymentGateway.tsx` | `Manages the Payment Gateway settings tab.` |
| `AdminSettingsRoles.tsx` | `Renders the read-only role permission summary for the Settings Roles tab.` |
| `AdminSettingsToggleSwitch.tsx` | `Renders an accessible boolean setting control for the Admin Settings module.` |

## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: updateSettings
updateSettings: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminSettingsData.ts`, `useAdminSettingsForms.ts`, `useAdminSettingsMutation.ts`, `useAdminSettingsRolesData.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `detail`, `list`, `settings`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.

## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `admin_settings_management_api.ts` | `fetchSettings` | `GET` | `—` | `AdminSettingsResponse['data']` |
| `admin_settings_management_api.ts` | `updateSettings` | `POST` | `body: AdminSettingsUpdatePayload, idempotencyKey: string` | `AdminSettingsResponse['data']` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.

## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminSettingsAppIntegration.tsx` | Manages the App Integration settings tab. | 11 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsBanner.tsx` | Renders the top banner with module title and save status indicator for the Settings page. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsEmptyState.tsx` | Renders the empty state for Admin settings tabular configuration data. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsGeneral.tsx` | Manages the General Settings tab. | 12 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsGST.tsx` | Manages the GST & Tax settings tab. | 12 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsGymProfile.tsx` | Manages the Gym Profile settings form. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsMain.tsx` | Entry component for the Settings module. Wraps the UI in the context provider and handles page layout. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsNav.tsx` | Renders the left-side vertical navigation tabs for different settings sections. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsNotifications.tsx` | Manages the Notifications settings tab. | 7 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsPaymentGateway.tsx` | Manages the Payment Gateway settings tab. | 12 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsRoles.tsx` | Renders the read-only role permission summary for the Settings Roles tab. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSettingsToggleSwitch.tsx` | Renders an accessible boolean setting control for the Admin Settings module. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.

## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.

## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminSettingsAppIntegration.tsx` | Manages the App Integration settings tab. | 11 |
| `AdminSettingsBanner.tsx` | Renders the top banner with module title and save status indicator for the Settings page. | 2 |
| `AdminSettingsContent.tsx` | Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter. | 0 |
| `AdminSettingsEmptyState.tsx` | Renders the empty state for Admin settings tabular configuration data. | 1 |
| `AdminSettingsGeneral.tsx` | Manages the General Settings tab. | 12 |
| `AdminSettingsGST.tsx` | Manages the GST & Tax settings tab. | 12 |
| `AdminSettingsGymProfile.tsx` | Manages the Gym Profile settings form. | 4 |
| `AdminSettingsMain.tsx` | Entry component for the Settings module. Wraps the UI in the context provider and handles page layout. | 0 |
| `AdminSettingsNav.tsx` | Renders the left-side vertical navigation tabs for different settings sections. | 1 |
| `AdminSettingsNotifications.tsx` | Manages the Notifications settings tab. | 7 |
| `AdminSettingsPaymentGateway.tsx` | Manages the Payment Gateway settings tab. | 12 |
| `AdminSettingsRoles.tsx` | Renders the read-only role permission summary for the Settings Roles tab. | 1 |
| `AdminSettingsToggleSwitch.tsx` | Renders an accessible boolean setting control for the Admin Settings module. | 1 |

## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.

## Component Tree

`settings_management/components/`
- `admin_settings_app_integration/AdminSettingsAppIntegration.tsx`
- `admin_settings_banner/AdminSettingsBanner.tsx`
- `admin_settings_content/AdminSettingsContent.tsx`
- `admin_settings_empty_state/AdminSettingsEmptyState.tsx`
- `admin_settings_general/AdminSettingsGeneral.tsx`
- `admin_settings_gst/AdminSettingsGST.tsx`
- `admin_settings_gym_profile/AdminSettingsGymProfile.tsx`
- `admin_settings_main/AdminSettingsMain.tsx`
- `admin_settings_nav/AdminSettingsNav.tsx`
- `admin_settings_notifications/AdminSettingsNotifications.tsx`
- `admin_settings_payment_gateway/AdminSettingsPaymentGateway.tsx`
- `admin_settings_roles/AdminSettingsRoles.tsx`
- `admin_settings_shared/AdminSettingsToggleSwitch.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_settings_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

## Current-source repair notes — RBG 5

Settings option fields validate against module-owned option lists through `isAllowed` refinements. Role-permission response validation is defined in `settings_management/schemas/AdminSettingsSchemas.ts` and imported by the API client. The MSW settings update rejects malformed JSON and invalid section payloads instead of reporting success. Purple role-tab text uses the canonical `text-purple` token. Host auth/session behavior and global API transport remain unverified because the supplied archive omits host infrastructure.
