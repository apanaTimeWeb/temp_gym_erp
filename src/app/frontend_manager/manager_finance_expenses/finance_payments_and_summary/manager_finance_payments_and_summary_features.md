---
role: manager
domain_root: manager_finance
submodule: finance_payments_and_summary
route: /frontend_manager/manager_finance_expenses/finance_payments_and_summary
compatibility_route: /frontend_manager/manager_finance_expenses
source_status: migrated-source-host-runtime-not-verified
---

# Manager Finance — Autonomous Leaf

## 1. Module Purpose
Manager Finance is the branch payment and revenue workspace. Managers can review payment transactions, filter by member/date, inspect financial summary KPIs and revenue trends, and export payment reports. Financial data is server state and destructive/financial mutations must never use unsafe optimistic updates. The source contains a payment-creation API/form workflow, but the leaf forbidden-pattern contract explicitly prohibits payment collection/refund mutations here. Until the product/domain owner resolves that conflict, payment creation is a legacy source capability only and must not be represented as an approved business capability.

Module root: `frontend_manager/manager_finance/`

## 2. Domain Lifecycle and User Flows
The leaf owns the source-derived finance workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_finance_expenses/finance_payments_and_summary`.
- Compatibility route: `/frontend_manager/manager_finance_expenses` is the physical domain-root redirect registered in `manager_finance_expenses/page.tsx`; it redirects to the canonical leaf route. `/frontend_manager/manager_finance` is not registered in the supplied source route tree.
- Canonical views identified in the source route matrix: payments, summary.
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_finance_payments_and_summary.url_config.ts`. Endpoint literals found in the original module URL config: /api/v1/manager/finance; /api/v1/manager/finance/export; /api/v1/manager/finance/payments; /api/v1/manager/finance/summary. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_finance_payments_and_summary_payment_form.schemas.ts, manager_finance_payments_and_summary.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

## 6. Query Key Registry
All existing query-key constants are leaf-owned under `constants/` and are preserved from the source snapshot. Do not rename key values during migration; key values are runtime cache contracts even when constant identifiers are renamed for leaf ownership.

## 7. Mutation Inventory
The prior root feature map and API client provide the current mutation inventory. Existing API verbs and payload mapping are preserved. No new backend CRUD capability is inferred by the migration.

## 8. Permissions and Role Rules
This source belongs to the Manager frontend. The archive does not include backend authorization, role policy, tenant isolation, or server enforcement evidence. Frontend visibility must not be treated as authorization.

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
Source tests migrated: 15. Current test files include: ManagerFinancePaymentsAndSummaryBehavior.test.tsx, ManagerFinancePaymentsAndSummaryBuildViewSearchParams.test.ts, ManagerFinancePaymentsAndSummaryDateFilterConstants.test.ts, ManagerFinancePaymentsAndSummaryFormatters.test.ts, ManagerFinancePaymentsAndSummaryMoneySchema.test.ts, ManagerFinancePaymentsAndSummaryPaymentFormSchema.test.ts, ManagerFinancePaymentsAndSummaryQueryKeys.test.ts, ManagerFinancePaymentsAndSummarySharedConstants.test.ts, ManagerFinancePaymentsAndSummaryUrlContract.test.ts, ManagerFinancePaymentsAndSummaryViewConstants.test.ts, useManagerFinancePaymentsAndSummaryLogic.test.ts, useManagerFinancePaymentsAndSummaryMutations.test.ts, useManagerFinancePaymentsAndSummaryPaymentForm.test.ts, useManagerFinancePaymentsAndSummaryQueries.test.ts, useManagerFinancePaymentsAndSummaryUiStore.test.ts. New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

## 18. Architecture Exceptions
The root compatibility page remains a thin route adapter because the source route matrix requires the historical root destination to remain operational. Multi-workflow split review is tracked separately for roots with multiple independent entity/API lifecycles; this initial leaf relocation is not a five-gate approval for those cases.

## 19. Known Contract Gaps
Host package/configuration, live backend OpenAPI/authorization contracts, tenant enforcement, and browser runtime are not supplied. These items are `NOT_VERIFIED`, not presumed to pass. Any route, schema or mock discrepancy discovered from the source must be recorded rather than guessed.

## 20. Rule Compliance Checklist
- [x] Direct-child Tier4 leaf route exists.
- [x] Business source, tests, mocks and locales are owned by the leaf.
- [x] Canonical folders are used; module-owned filenames receive the leaf prefix.
- [x] URL/API config is leaf-local and keeps existing URL values.
- [x] Documentation trio, host contract stub and isolated test harness exist.
- [ ] All five qualification gates and workflow splitting are approved only after the post-migration physical audit.
- [ ] Host test/typecheck/build/browser and accessibility execution remain `NOT_VERIFIED`.

## 21. Standalone Run, Mock and Test Harness
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerFinancePaymentsAndSummaryHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchPayments | `/manager/finance` | Uses the fetchPayments workflow with typed request/response handling. | `GET /manager/finance/payments` | ✅ Implemented |
| createPayment | `/manager/finance` | Legacy source API/form workflow; prohibited by the leaf forbidden-pattern contract pending owner decision. | `POST /manager/finance/payments` | CONTRACT_CONFLICT — NOT APPROVED |
| fetchPaymentsByMember | `/manager/finance` | Uses the fetchPaymentsByMember workflow with typed request/response handling. | `GET /manager/finance/payments/member/:memberId` | ✅ Implemented |
| fetchFinanceSummary | `/manager/finance` | Uses the fetchFinanceSummary workflow with typed request/response handling. | `GET /manager/finance/summary` | ✅ Implemented |
| exportPaymentsReport | `/manager/finance` | Uses the exportPaymentsReport workflow with typed request/response handling. | `GET /manager/finance/export?format=csv or ?format=pdf` | ✅ Implemented |

## User Flows & Interactions
### Contract conflict — payment creation
The source inventory and payment form/API contain `createPayment`, while `manager_finance_payments_and_summary_forbidden.md` states that this leaf is analytics read-only and must not implement payment collection or refund creation. These source artifacts conflict. The archive does not provide a product/domain owner decision or an authoritative backend authorization contract. Do not infer permission from the presence of the UI, API client, or mock handler. Keep this workflow classified as `CONTRACT_CONFLICT — NOT APPROVED` until the owner decides whether payment creation belongs here or must be removed/moved.

### Endpoint-level server authorization evidence
| Endpoint | Source operation | Server-side role/tenant authorization evidence in supplied archive |
|---|---|---|
| `GET /api/v1/manager/finance/payments` | List payments | NOT_VERIFIED — backend source/OpenAPI/policy absent |
| `POST /api/v1/manager/finance/payments` | Legacy create workflow; contract conflict above | NOT_VERIFIED — backend source/OpenAPI/policy absent |
| `GET /api/v1/manager/finance/payments/member/:memberId` | List member payments | NOT_VERIFIED — backend source/OpenAPI/policy absent |
| `GET /api/v1/manager/finance/summary` | Read summary | NOT_VERIFIED — backend source/OpenAPI/policy absent |
| `GET /api/v1/manager/finance/export` | Export report | NOT_VERIFIED — backend source/OpenAPI/policy absent |

Frontend route guards and hidden controls are not authorization evidence. Endpoint-level verification requires backend implementation or an authoritative OpenAPI/security test artifact, neither of which is present in this source archive.

### Flow 2: Export payments
1. Manager selects CSV or PDF.
2. exportPaymentsReport(format) calls the dedicated module export endpoint.
3. The response provides the report URL/file contract; the UI does not fabricate an export payload.
