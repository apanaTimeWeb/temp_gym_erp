# Manager Communications — Communications Campaigns Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_communications/communications_history/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Manager Communications — Forbidden Patterns

## Cross-Role Imports
- NEVER import from `/admin`, `/trainer`, `/superadmin`, or any other role folder.
- Allowed shared imports: `src/components/ui/`, `src/lib/`, `@/components/ui/manager_searchable_dropdown/` (visual primitives only), `@/app/frontend_manager/manager_infrastructure/`.

## No Direct Member Data Mutation
- This module is READ-ONLY with respect to member data. It fetches member segments for targeting but NEVER modifies member records.
- Do NOT import `ManagerMembersDirectoryApi` or any members mutation hook here.

## No Hardcoded Recipient Lists
- Never hardcode a list of phone numbers or emails in JSX or hooks. All recipients must come from `fetchSegmentRecipients()` or `ManagerCommunicationsCampaignsMockData.ts`.

## No Automated Bulk WhatsApp Sending
- WhatsApp prevents automated bulk messaging. `ManagerBulkMessageModal` correctly requires per-recipient manual send.
- Do NOT attempt to automate this with loops or `window.open` in a loop.
- `ManagerBulkMessageModal` lives in `manager_communications/manager_communications_components/manager_communications_bulk_message_modal/`. Never move it to a global shared folder.

## No New External Messaging SDKs
- Do NOT install `nodemailer`, `twilio`, `sendgrid`, or any server-side messaging SDK in this frontend module.

## No Raw Mock Data in Components or Hooks
- All fixture/mock data MUST live in `communications_mocks/fixtures/ManagerCommunicationsCampaignsMockData.ts`.
- Never define `MOCK_*` arrays inside JSX, hooks, or logic files.

## No Arbitrary Style Values
- Never use arbitrary CSS variable utility classes like `bg-[var(--custom-token)]`, `text-[var(--custom-token)]`, raw rgba shadows, or Tailwind color utilities like `bg-green-500`.
- Use only semantic tokens defined in `communications_theme_contract.md`.

## No `any` Types
- `any`, `@ts-ignore`, `@ts-nocheck` are strictly forbidden in this module.

## No Relative Imports
- All imports must be absolute (`@/app/frontend_manager/...`, `@/lib/...`, etc.).

## Do Not Store Server State in Zustand
- `useManagerCommunicationsCampaignsStore` is for UI state only (active tab, composer fields, drawer open/close, pagination).
- Campaign history, KPIs, churned members, and automations must be managed by TanStack Query.

## Do Not Bypass the URL State Layer
- Tab selection, history filters (search, channel), pagination page, and churn filters (search, reason, page) must be reflected in URL query parameters.
- Do not hold searchable/filterable/paginated state in Zustand or local `useState` only.

## No Multiple Competing State Sources
- Do not duplicate searchable/filterable/paginated state in URL + Zustand + local state.
- URL query parameters are the canonical source of truth for search, channel/reason filters, tab, and pagination.
- Zustand may own transient composer/selection UI state only; it must not mirror URL-backed query state.

## No Direct Number Formatting
- Never use `.toFixed()`, `.toLocaleString()`, or manual `₹` concatenation.
- Always use `formatCurrencyFromMinorUnits()`, `formatNumber()`, `formatPercentage()` from `the module-local `ManagerCommunicationsCampaignsFormatters.ts` in `manager_communications_utils/``.

## No Scattered Toast Messages
- Toast success/error strings must come from a centralized message source, not be scattered in mutation `onSuccess`/`onError` callbacks as inline string literals.

## Key Components That Must Not Be Changed Without Review
- `ManagerBulkMessageModal.tsx` — controls the manual per-recipient WhatsApp UX. Any change here could accidentally enable automated bulk sends.
- `useManagerCommunicationsCampaignsChurnRecoveryLogic.ts` — owns the win-back flow. Adding side effects here could unintentionally modify member records.
- `manager_communications_history.api.ts` — API contract boundary. Changes here affect all callers simultaneously.
- `communications_types/manager_communications_history.types.ts` — all consumers depend on this type contract. Breaking changes here require a full module audit.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.

## V28 cross-workflow prohibitions (RBG-35–RBG-50)

No campaign-send, automation-update, or win-back mutation hooks belong in this leaf.
