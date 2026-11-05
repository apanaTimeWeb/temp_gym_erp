---
role: manager
domain_root: manager_inquiries_crm
submodule: inquiries_pipeline
route: /frontend_manager/manager_inquiries_crm/inquiries_pipeline
compatibility_route: /frontend_manager/manager_inquiries_crm
source_status: migrated-source-host-runtime-not-verified
---

# Manager Inquiries — Autonomous Leaf

## 1. Module Purpose
Manager Inquiries is the lead and conversion workspace. Managers can browse/search/filter incoming inquiries, review inquiry details, create or edit leads, and convert a qualified inquiry into a member. The module owns inquiry data and plan lookup mocks. Conversion and deletion are business-critical and must remain explicitly confirmed and server-authoritative.

Module root: `frontend_manager/manager_inquiries_crm/inquiries_pipeline/`

## 2. Domain Lifecycle and User Flows
The physical leaf owns the source-derived inquiries workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_inquiries_crm/inquiries_pipeline`.
- Compatibility route: `/frontend_manager/manager_inquiries_crm` is the supplied domain redirect and resolves to this canonical leaf. No `/frontend_manager/manager_inquiries` route exists in the supplied archive.
- Canonical views identified in the source route matrix: default (current root screen).
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_inquiries_pipeline.url_config.ts`. Endpoint literals found in the original module URL config: /api/v1/manager/inquiries; /api/v1/manager/inquiries/plans; /api/v1/manager/inquiries/plans-snapshot; /api/v1/manager/inquiries/stats. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_inquiries_pipeline_convert_lead_form.schemas.ts, manager_inquiries_pipeline_form.schemas.ts, manager_inquiries_pipeline.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

## 6. Query Key Registry
All existing query-key constants are leaf-owned under `constants/` and are preserved from the source snapshot. Do not rename key values during migration; key values are runtime cache contracts even when constant identifiers are renamed for leaf ownership.

## 7. Mutation Inventory
The prior root feature map and API client provide the current mutation inventory. Existing API verbs and payload mapping are preserved. No new backend CRUD capability is inferred by the migration.

## 8. Permissions and Role Rules
This is a Manager-facing leaf. Each endpoint below is expected to require an authenticated Manager session and enforce tenant/branch scope on the server. The supplied frontend archive does not include backend policy, OpenAPI security metadata, middleware, or server tests; therefore every server-side enforcement result remains `NOT_VERIFIED` and must not be inferred from UI visibility.

| Endpoint | Operation | Required server-side policy | Evidence status |
|---|---|---|---|
| `/api/v1/manager/inquiries` | GET / POST | Authenticated Manager; tenant/branch-scoped inquiry access and create permission | `NOT_VERIFIED` |
| `/api/v1/manager/inquiries/:id` | GET / PATCH / DELETE | Authenticated Manager; object-level tenant/branch scope; delete permission for destructive operation | `NOT_VERIFIED` |
| `/api/v1/manager/inquiries/:id/convert` | POST | Authenticated Manager; object-level scope; member-conversion permission and authoritative transaction | `NOT_VERIFIED` |
| `/api/v1/manager/inquiries/plans` | GET | Authenticated Manager; tenant-visible plan catalogue | `NOT_VERIFIED` |
| `/api/v1/manager/inquiries/plans-snapshot` | GET | Authenticated Manager; tenant-visible pricing snapshot | `NOT_VERIFIED` |
| `/api/v1/manager/inquiries/stats` | GET | Authenticated Manager; tenant/branch-scoped aggregate projection | `NOT_VERIFIED` |

Frontend route guards and mutation controls are usability boundaries only, not substitutes for the server policies above.

## 9. State Ownership
Server state remains managed by the original query hooks. Existing client UI state and store ownership are preserved under `state/` or the relevant leaf hook, without introducing entity persistence in browser storage.

## 10. Offline and Reconnect Behavior
No authoritative offline/reconnect contract can be verified from the supplied source. Preserve existing query/retry behavior; offline guarantees are `NOT_VERIFIED`.

## 11. Security and PII Rules
Do not add sensitive values to URLs, logs, telemetry, or fixture output. Keep existing validation and permission behavior; host/backend security needs separate verification.

## 12. Accessibility Requirements
Preserve semantic HTML, keyboard focus, labels, announcements, loading/error/empty/recovery states, reduced-motion safeguards, and responsive layout behavior. Existing accessibility test sources moved with the leaf. Browser/axe execution remains `NOT_VERIFIED` without host runtime.

## 13. Background Tasks
No new background jobs, polling loops or recurring tasks are introduced by this move. Any existing task behavior must remain source-backed and isolated in the owning leaf.

## 14. Feature Flags
No new feature flag names or gate behavior are invented. Existing source flags, if any, remain unchanged.

## 15. Cache Invalidation
Preserve existing query keys and invalidation paths. Any future API mutation requires a verified resource contract and explicit invalidation tests.

## 16. Migration and Rollback
This bounded migration relocates source files into canonical leaf categories and updates imports while preserving the current API URL literals and live domain-root route. Rollback is by restoring the previous physical RBG checkpoint; the root route is kept as a compatibility entry.

## 17. Test Coverage Map
Source tests migrated: 13. Current test files include: ManagerInquiriesPipelineBehavior.test.tsx, ManagerInquiriesPipelineBuildQueryParams.test.ts, ManagerInquiriesPipelineCalculatePriceForCycle.test.ts, ManagerInquiriesPipelineFormatters.test.ts, ManagerInquiriesPipelineQueryKeys.test.ts, ManagerInquiriesPipelineUrlContract.test.ts, useManagerInquiriesPipelineBulkMessageDraft.test.ts, useManagerInquiriesPipelineConvertLeadForm.test.ts, useManagerInquiriesPipelineForm.test.ts, useManagerInquiriesPipelineLogic.test.ts, useManagerInquiriesPipelineMutations.test.ts, useManagerInquiriesPipelineQueries.test.ts, useManagerInquiriesPipelineUiStore.test.ts. New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

## 18. Architecture Exceptions
The root compatibility page remains a thin route adapter because the source route matrix requires the historical root destination to remain operational. Multi-workflow split review is tracked separately for roots with multiple independent entity/API lifecycles; this initial leaf relocation is not a five-gate approval for those cases.

## 19. Known Contract Gaps
Host package/configuration, live backend OpenAPI/authorization contracts, tenant enforcement, and browser runtime are not supplied. These items are `NOT_VERIFIED`, not presumed to pass. The conversion form schema expresses major currency units while the display formatter and plan snapshots use minor-unit values; no authoritative backend amount-unit contract is supplied, so this remains an unresolved source contract conflict and no conversion factor is guessed. The `date` filter is present in URL/query construction but no visible date-filter control is wired in the supplied table/toolbar; it remains a known UI gap until the toolbar target is separately approved. Any route, schema or mock discrepancy discovered from the source must be recorded rather than guessed.

## 20. Rule Compliance Checklist
- [x] Direct-child Tier4 leaf route exists.
- [x] Business source, tests, mocks and locales are owned by the leaf.
- [x] Canonical folders are used; module-owned filenames receive the leaf prefix.
- [x] URL/API config is leaf-local and keeps existing URL values.
- [x] Documentation trio, host contract stub and isolated test harness exist.
- [ ] All five qualification gates and workflow splitting are approved only after the post-migration physical audit.
- [ ] Host test/typecheck/build/browser and accessibility execution remain `NOT_VERIFIED`.

## 21. Standalone Run, Mock and Test Harness
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerInquiriesPipelineHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchInquiries | `/manager/inquiries` | Uses the fetchInquiries workflow with typed request/response handling. | `GET /manager/inquiries` | ✅ Implemented |
| fetchInquiryPlans | `/manager/inquiries` | Uses the fetchInquiryPlans workflow with typed request/response handling. | `GET /manager/inquiries/plans` | ✅ Implemented |
| fetchInquiryPlansSnapshot | `/manager/inquiries` | Uses the fetchInquiryPlansSnapshot workflow with typed request/response handling. | `GET /manager/inquiries/plans-snapshot` | ✅ Implemented |
| convertLead | `/manager/inquiries` | Uses the convertLead workflow with typed request/response handling. | `POST /manager/inquiries/:id/convert` | ✅ Implemented |
| fetchInquiryById | `/manager/inquiries` | Uses the fetchInquiryById workflow with typed request/response handling. | `GET /manager/inquiries/:id` | ✅ Implemented |
| fetchInquiryStats | `/manager/inquiries` | Uses the fetchInquiryStats workflow with typed request/response handling. | `GET /manager/inquiries/stats` | ✅ Implemented |
| createInquiry | `/manager/inquiries` | Uses the createInquiry workflow with typed request/response handling. | `POST /manager/inquiries` | ✅ Implemented |
| updateInquiry | `/manager/inquiries` | Uses the updateInquiry workflow with typed request/response handling. | `PATCH /manager/inquiries/:id` | ✅ Implemented |
| deleteInquiry | `/manager/inquiries` | Uses the deleteInquiry workflow with typed request/response handling. | `DELETE /manager/inquiries/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage inquiries
1. Manager searches and filters the inquiry list.
2. The logic hook propagates debounced search, status, date, page, and limit to fetchInquiries().
3. MSW filters the module-owned fixture and returns the correct total.
4. The table renders the returned page and supports detail/edit actions.
### Flow 2: Convert lead
1. Manager opens an inquiry detail and chooses Convert.
2. The conversion form validates required member/plan inputs with RHF + Zod.
3. convertLead(id, body) sends the request.
4. The authoritative member ID/message is consumed and the inquiry cache is reconciled.
