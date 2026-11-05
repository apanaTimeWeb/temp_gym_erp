---
schema_version: '2.11'
role: trainer
domain: trainer_members
submodule: members_trainer_notes
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
contract_source: frontend-trainer-v6-PARTIAL-rbg10.zip
---

# Trainer Members — Trainer Notes

## 1. Purpose

Independent member note timeline and write flow selected by an explicit member id, without borrowing any member-directory business hook/store.

## 2. Owners and Scope

Owner: `trainer_members/members_trainer_notes`. This autonomous leaf owns only its documented business capability. Stage: SOURCE_FIX_STAGED_RBG_11_15.

## 3. User Stories
- As an authenticated trainer, open the member-notes route with its required `id` query parameter and review the selected member context and note timeline.
- Enter a non-empty note and submit it; the pending state prevents duplicate submission and the note mutation refreshes the timeline.
- If the draft is dirty, confirm or cancel an attempted navigation through the existing alert dialog; load and mutation failures remain visible with a retry path where available. The profile's Notes tab remains a deliberate second entry surface, not a legacy route adapter.

## 4. Routes and Navigation
Canonical UI route: `/frontend_trainer/trainer_members/members_trainer_notes`. This leaf owns the route entry and is listed in `CANONICAL_ROUTE_MANIFEST.json`. No removed legacy `/trainer/...` UI route or compatibility adapter is shipped or claimed by this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical route; any inbound redirect is a separate host-owned decision and is not asserted here. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## 5. Entities and Aggregate

Read projection {id,name,trainerNotes?} and note {id,text,date} derived from original Member schema; add-note request contains only text.

## 6. Permissions and Tenant Boundary

Only trainer-authorized records may be shown. No tenant or branch context is invented. Server-side permissions, gymId/branchId enforcement, and actual token scopes require host verification.

## 7. API Contracts

Verified GET /trainer/trainer_members/:id and POST /trainer/trainer_members/:id/notes. Encodes identifier in URL. UUIDv4 idempotency key on POST.

## 8. Types and Response Shapes

Contracts mirror the original source TypeScript/Zod declarations. Expected generic ApiResponse<T> host envelope is described in Architecture V1; actual host requestId and error mapping are NOT_VERIFIED.

## 9. Data Queries and Cache

Own local TanStack Query cache, useMutation invalidation, RHF+Zod note validation and draft-retention on errors. User-selected member id comes from URL, not sibling Zustand.

## 10. URL and Filter State

Search, page, selected record and view URL state are retained where implemented. Query param handling must not invent backend enum values.

## 11. UI Composition

Semantic Tailwind v4 design tokens only; dedicated components, hooks, schemas, mocks and local state. Original interaction test IDs and canonical leaf boundaries remain preserved.

## 12. Forms and Validation

RHF v7 + Zod v3 trim/min(1); inline error, pending guard and beforeunload warning for dirty drafts. Internal Next navigation blocking not yet verified.

## 13. Actions and Mutations

No functional control may be removed or replaced with console-only feedback. Existing mutation idempotency and query invalidation are preserved where present.

## 14. Loading Empty Error and Not Found

Canonical leaf page + loading + error + not-found files are physically present; complete browser recovery and offline flow NOT_VERIFIED.

## 15. Accessibility and Responsive

WCAG 2.2 AA, keyboard focus, 44px minimum targets, reduced motion and 320px responsiveness are mandatory. Browser-level assertions remain DEFERRED_TO_HOST_RUNTIME.

## 16. Localization and Formatting

Original EN/HI locale values retained or copied module-locally; host next-intl merge and full message-namespace parity require host integration testing.

## 17. Security Privacy and Logging

Never persist member or plan business entities to localStorage, use unverified backend privileges, log private notes or expose client secrets.

## 18. Tests and Regressions

Local Zod contract test, standalone mock bootstrap and new Playwright smoke regression authored. Host MSW/test harness execution deferred.

## 19. Dependency Manifest and Boundary

No sibling business imports, no account PII stored client-side, and no invented note-list API endpoint. Real server role/tenant authorization NOT_VERIFIED.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_members_members_trainer_notes.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.


Own mutable MSW handlers with original MEM-001/Rahul Sharma demo fixture and duplicate POST idempotency cache. Test bootstrap exports local reset.

## 21. Portability Guide

Copy this leaf with its local schemas, UI, mocks, tests, URL config and contracts/host-stubs.d.ts into a compatible Next.js App Router host. Provide approved core infrastructure, next-intl and module-local mock runtime; execute local typecheck, Vitest and Playwright. A runnable isolated test harness is NOT_VERIFIED without installed host dependencies.

## 22. Verification and Definition of Done

Status SOURCE_FIX_STAGED_RBG_11_15 (not certified complete). Static import closure is independently checked. Remaining gates: full typecheck, actual Vitest/Playwright, host API/permission confirmation, design/a11y browser inspection, and all 53 RBG closure verification.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

### V12 note-mutation retry safety
Idempotency key is scoped to the selected member ID and exact draft text. Retrying an unchanged failed submission reuses the same key; editing the draft or changing the member creates a fresh key, and a successful submission clears it. Text editing is disabled while a request is pending.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
