# Trainer Frontend v20 — Source Repair Release & Host Integration Guide

**Artifact:** `frontend-trainer-v20`  
**Workflow:** V2.11 Mode B — Audit + Repair  
**Repair plan:** Revision 3, RBG 1–18 complete  
**Release classification:** Source-repaired feature package; host/runtime validation deferred  
**Frozen original archive SHA-256:** `50c2dd7fc5ab355290c592b310e33cf5ab450f69069b53f7ee75c9db151b34f6`

## 1. Delivery truth and scope

This archive is a **Trainer role feature source package**, not a complete standalone Next.js application. It contains the role feature tree, its module-owned documentation, schemas, APIs, mocks, tests, route entries, and Playwright E2E specifications. It intentionally does not contain the host application's package manifest/lockfile, root Next.js configuration, global MSW bootstrap, CI configuration, backend, authentication service, tenant enforcement, or production environment secrets.

No host or runtime is required to **inspect, statically audit, or package** this source tree. A compatible host application is required to **execute** the feature routes and integration/browser tests. This guide does not claim that the feature ZIP can boot as a standalone application without the host's documented Core Application Contracts.

## 2. Architecture inventory

- Role root: `frontend_trainer/`
- Domain roots: 6 (`trainer_account`, `trainer_coaching`, `trainer_dashboard`, `trainer_earnings`, `trainer_members`, `trainer_operations`) plus the role navigation shell `trainer_navigation`.
- Autonomous feature leaves: 17, each at depth 1 below its domain root.
- Every feature leaf has the 22-section feature map, forbidden-pattern document, theme contract, URL config, ambient host stubs, route entry, loading/error/not-found boundaries, module-owned API/types/schemas/locales/mocks/tests, and test harness entry.
- Every leaf now has a typed MSW scenario registry, scenario registration test, accessible scenario selector, and isolated harness wrapper.
- Playwright E2E specs: 17, under `playwright_E2E/frontend_trainer_e2e/`.

### 2.1 Canonical feature routes

All paths below are the exact `*_PAGE_LIST` values in the corresponding module URL config. They use the `/frontend_trainer/...` route prefix; do not silently rewrite them to `/trainer/...`.

| Domain | Feature leaf | Canonical route |
|---|---|---|
| Account | `account_notifications` | `/frontend_trainer/trainer_account/account_notifications` |
| Account | `account_personal_profile` | `/frontend_trainer/trainer_account/account_personal_profile` |
| Account | `account_security` | `/frontend_trainer/trainer_account/account_security` |
| Coaching | `coaching_diet_library_and_assignments` | `/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments` |
| Coaching | `coaching_exercise_management` | `/frontend_trainer/trainer_coaching/coaching_exercise_management` |
| Coaching | `coaching_individual_progress` | `/frontend_trainer/trainer_coaching/coaching_individual_progress` |
| Coaching | `coaching_progress_comparison` | `/frontend_trainer/trainer_coaching/coaching_progress_comparison` |
| Coaching | `coaching_sessions` | `/frontend_trainer/trainer_coaching/coaching_sessions` |
| Coaching | `coaching_workout_plans` | `/frontend_trainer/trainer_coaching/coaching_workout_plans` |
| Dashboard | `dashboard_overview` | `/frontend_trainer/trainer_dashboard/dashboard_overview` |
| Earnings | `earnings_overview_and_ledger` | `/frontend_trainer/trainer_earnings/earnings_overview_and_ledger` |
| Members | `members_directory_and_profile` | `/frontend_trainer/trainer_members/members_directory_and_profile` |
| Members | `members_trainer_notes` | `/frontend_trainer/trainer_members/members_trainer_notes` |
| Operations | `operations_leave_requests` | `/frontend_trainer/trainer_operations/operations_leave_requests` |
| Operations | `operations_member_attendance` | `/frontend_trainer/trainer_operations/operations_member_attendance` |
| Operations | `operations_trainer_attendance` | `/frontend_trainer/trainer_operations/operations_trainer_attendance` |
| Operations | `operations_weekly_availability` | `/frontend_trainer/trainer_operations/operations_weekly_availability` |

**Route decision blocker — ISSUE-005:** Supplied Members documentation contains conflicting statements about the legacy `/trainer/members` path. The route-owner/product decision is not present in the supplied source. No redirect, compatibility route, or retirement decision was invented during this repair. The route constants above describe the current source; they do not resolve the legacy-path conflict.

## 3. Repair-group closure ledger

All user-approved RBGs 1–18 are complete. RBG 1–10 cover audit batches 1–38; RBG 11–18 are the separately approved global focus-token remediation groups under Plan Revision 3.

| RBG | Scope | Source work completed | Allocated files | Allocated token replacements |
|---|---|---|---:|---:|
| 1 | Audit batches 1–4 | Theme aliases, focus foundation, Notifications fixture envelope, documentation conflict recorded | 14 | — |
| 2 | Audit batches 5–8 | Notifications/Profile/Security ownership and API failure handling; retired dead Profile artifacts | 15 | — |
| 3 | Audit batches 9–12 | Diet/Exercise API and mock behavior, focus-trap lifecycle, related fixtures | 18 | — |
| 4 | Audit batches 13–16 | Progress/Comparison API, pagination, accessibility and focus behavior | 15 | — |
| 5 | Audit batches 17–20 | Sessions/Workout Plans/Comparison API, retry/idempotency and focus behavior | 15 | — |
| 6 | Audit batches 21–24 | Workout Plans, Earnings query and pagination recovery | 13 | — |
| 7 | Audit batches 25–28 | Members API, Notes, idempotency, WhatsApp handoff and focus behavior | 10 | — |
| 8 | Audit batches 32–35 | Attendance APIs, pagination, profile recovery and modal focus | 12 | — |
| 9 | Audit batches 29–31 | Leave Requests idempotency and Member Attendance pagination/state | 11 | — |
| 10 | Audit batches 36–38 | Weekly Availability boundary and shared navigation socket subscription | 18 | — |
| 11 | Global ISSUE-002 slice 1 | Dedicated focus ring token mapping | 18 | 35 |
| 12 | Global ISSUE-002 slice 2 | Dedicated focus ring token mapping | 18 | 53 |
| 13 | Global ISSUE-002 slice 3 | Dedicated focus ring token mapping | 18 | 52 |
| 14 | Global ISSUE-002 slice 4 | Dedicated focus ring token mapping | 18 | 37 |
| 15 | Global ISSUE-002 slice 5 | Dedicated focus ring token mapping | 18 | 55 |
| 16 | Global ISSUE-002 slice 6 | Dedicated focus ring token mapping | 18 | 55 |
| 17 | Global ISSUE-002 slice 7 | Dedicated focus ring token mapping | 18 | 48 |
| 18 | Global ISSUE-002 slice 8 | Dedicated focus ring token mapping | 5 | 14 |

RBG 11–18 changed only the allocated utility occurrences from `focus-visible:ring-primary` to `focus-visible:ring-focus-ring`. The global TSX scan now reports zero remaining occurrences.

### 3.1 Final audit source-level additions

The final audit identified and repaired the previously absent module-owned scenario/harness artifacts and type placement:

- Added 17 `mocks/scenarios/*.scenarios.ts` registries with `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403` handlers.
- Added 17 scenario-registry tests and 17 accessible scenario selectors.
- Added 17 isolated harness wrappers. Each creates a local TanStack Query client, initializes a browser MSW worker through the leaf bootstrap, supports scenario switching, wraps the leaf-local provider where present, and permits host-owned session/theme providers to be injected rather than fabricated.
- Moved 51 implementation-local type declarations into module-owned `types/` files; updated imports and preserved direct type re-exports where existing consumers depended on them.
- Updated all 17 feature maps with the final source-repair and runtime-deferral status.

The harness expects the caller to pass the module's existing handlers, its existing GET endpoint, and schema-shaped fixture data. It does not invent a backend route or DTO. Host session and theme adapters remain injectable because their concrete implementations belong to the host application.

## 4. Finding disposition

The original audit inventory contains 44 unique findings. The source repair reports and final source reconciliation show 42 findings closed in source and two external/contract decisions still open:

| Finding | Status | Required external input |
|---|---|---|
| ISSUE-005 | `SOURCE_CONFLICT / EXTERNAL_PRODUCT_DECISION_BLOCKED` | Product/route owner must resolve the legacy Members route documentation conflict. |
| ISSUE-033 | `CONTRACT_INCOMPLETE` | Backend/API contract owner must confirm Earnings history pagination metadata guarantees and response shape. |

All other original source finding IDs are closed by the RBG reports and their cross-batch slices. The global focus-token remediation is also closed at source level.

## 5. Static verification performed in this environment

The following checks were executed against the current source tree after the final audit additions:

| Check | Result |
|---|---|
| TypeScript/TSX syntax parse (TypeScript 5.8.3 parser) | 1,344 files; 0 parse diagnostics |
| Internal relative and role-alias import resolution | 3,847 imports checked; 0 unresolved; 0 case mismatches |
| Explicit TypeScript `any` type nodes | 0 |
| Implementation-local interface/type declarations outside `types/`, `schemas/`, `contracts/`, and tests | 0 |
| Cross-feature business imports | 0 detected |
| `console.log`, `@ts-ignore`, `@ts-nocheck` | 0 detected |
| `key={index}` / `key={i}` | 0 detected |
| Inline raw color values in TS/TSX | 0 detected |
| Barrel `index.ts` files | 0 detected |
| TODO/FIXME/placeholder implementation markers in scanned source | 0 detected |
| TSX component line ceiling | No TSX component exceeds 300 lines |
| Feature documentation trio | 17/17 leaves present; each feature map has 22 numbered sections |
| Module scenario registry, registration test, selector, harness | 17/17 leaves present |
| Global `focus-visible:ring-primary` occurrences in TSX | 0 |
| Original archive integrity | ZIP CRC PASS; 1,358 original entries; frozen SHA-256 unchanged |

These are source/static checks. A TypeScript parser pass is **not** a semantic `tsc --noEmit` typecheck and is not a Next.js build.

## 6. Explicit host/runtime deferrals

The supplied source archive does not include the host package manifest, lockfile, installed dependencies, root `tsconfig`, ESLint/Prettier configuration, Next.js config, backend, or browser runtime. The following are therefore recorded as `DEFERRED_TO_HOST_RUNTIME` or `OUTSIDE_SUPPLIED_SCOPE`, not as passed:

- Semantic `tsc --noEmit` typecheck using the host's exact dependency versions and tsconfig.
- Next.js production build, ESLint, Prettier, dependency/SCA and secret scanning.
- Vitest/React Testing Library execution, including the newly added scenario-registry tests.
- Playwright E2E execution across the 17 specs.
- Real browser keyboard/screen-reader/WCAG 2.2 AA verification, visual comparison, and all required viewport tests (including 320px/375px/768px/1024px/1440px/1920px).
- Authenticated route behavior, backend authorization, tenant isolation, live API contracts, session expiry redirects, and production WebSocket lifecycle.
- CI/CD branch protection, CODEOWNERS enforcement, source-map policy, and host dependency allowlist.

The archive can be inspected and packaged without these services. It cannot be truthfully certified as host-built, browser-tested, backend-authorized, or production-ready without them. `RELEASE_MANIFEST.json` records the exact source-tree digest, original archive identity, static verification and explicit release limitations.

## 7. Structural qualification and release caveats

The supplied product/route documentation does not provide an approved split decision for the larger leaves. Several leaves exceed the architecture guide's 25-file “mega-module” review threshold. The 5-gate feature-boundary qualification for those leaves is not evidenced sufficiently to justify speculative route/workflow splits. This remains a documented architecture review item; no new routes or sibling business modules were invented.

The following checks are not silently promoted to PASS:

- `ISSUE-005` Members route conflict.
- `ISSUE-033` Earnings pagination backend contract gap.
- Feature-boundary decomposition decisions requiring product/route-owner evidence.
- Host-only build, semantic typecheck, test, browser, accessibility, backend authorization, tenant-isolation and CI controls.

## 8. Host integration requirements

A compatible host must provide the documented Core Application Contracts consumed by the feature leaves, including the configured API transport/environment adapter, logger/error telemetry, authenticated session/role context, tenant/branch scoping, theme tokens/global CSS, icon/UI primitives, display-value formatting, navigation/router, localization provider, and shared socket ownership where applicable.

Integration steps:

1. Copy `frontend_trainer/` into the host's `src/app/frontend_trainer/` location without renaming route folders or URL constants.
2. Confirm the host alias maps `@/` to the correct source root and that the host's exact versions of Next.js App Router, React, TanStack Query, Zustand, React Hook Form, Zod, next-intl, MSW, and UI primitives match the feature documentation.
3. Wire the documented host adapters and session/theme providers. Do not replace `ISSUE-005` or `ISSUE-033` with guessed routes or backend fields.
4. Run the host's actual semantic typecheck, build, lint, Vitest and Playwright scripts, then perform auth/tenant/accessibility/responsive checks and attach evidence to the Section 43P ledger.

No host test credentials, environment variables, API URLs, tenant IDs, or backend guarantees are invented in this package. The host owner must supply approved development fixtures and secure configuration.

## 9. Release classification

This artifact is a **source-repaired feature package with explicit external blockers and host-runtime deferrals**. It is not a production sign-off. Packaging the source does not close the two external findings or imply that host-only checks passed. See `RE_AUDIT_CHECKLIST_RESULT.md` for the per-rule evidence ledger.

## 10. Autonomous Sub-Module Physical File Ledger

The table counts every physical file recursively within each autonomous feature leaf (including docs, tests, mocks, scenarios, harness and type files). The 300-line ceiling is checked against TSX files. A file-count result above 25 is shown as an architecture review item, not silently passed.

| Feature leaf | Total files | TS/TSX | Production TS/TSX | Tests | Mock files | Max TSX lines | Doc trio / numbered sections | Scenario / test / selector / harness |
|---|---:|---:|---:|---:|---:|---:|---|---|
| `trainer_account/account_notifications` | 63 | 58 | 45 | 13 | 4 | 117 | PASS / 22 | 1/1/1/1 |
| `trainer_account/account_personal_profile` | 70 | 65 | 51 | 14 | 4 | 177 | PASS / 22 | 1/1/1/1 |
| `trainer_account/account_security` | 42 | 37 | 30 | 7 | 4 | 67 | PASS / 22 | 1/1/1/1 |
| `trainer_coaching/coaching_diet_library_and_assignments` | 94 | 89 | 82 | 7 | 4 | 177 | PASS / 22 | 1/1/1/1 |
| `trainer_coaching/coaching_exercise_management` | 82 | 77 | 66 | 11 | 4 | 220 | PASS / 22 | 1/1/1/1 |
| `trainer_coaching/coaching_individual_progress` | 120 | 115 | 92 | 23 | 7 | 177 | PASS / 22 | 1/1/1/1 |
| `trainer_coaching/coaching_progress_comparison` | 81 | 76 | 67 | 9 | 4 | 177 | PASS / 22 | 1/1/1/1 |
| `trainer_coaching/coaching_sessions` | 103 | 98 | 91 | 7 | 5 | 177 | PASS / 22 | 1/1/1/1 |
| `trainer_coaching/coaching_workout_plans` | 98 | 93 | 85 | 8 | 5 | 289 | PASS / 22 | 1/1/1/1 |
| `trainer_dashboard/dashboard_overview` | 66 | 61 | 48 | 13 | 4 | 105 | PASS / 22 | 1/1/1/1 |
| `trainer_earnings/earnings_overview_and_ledger` | 68 | 63 | 43 | 20 | 3 | 215 | PASS / 22 | 1/1/1/1 |
| `trainer_members/members_directory_and_profile` | 127 | 122 | 110 | 12 | 8 | 289 | PASS / 22 | 1/1/1/1 |
| `trainer_members/members_trainer_notes` | 26 | 21 | 14 | 7 | 2 | 161 | PASS / 22 | 1/1/1/1 |
| `trainer_operations/operations_leave_requests` | 63 | 58 | 49 | 9 | 4 | 205 | PASS / 22 | 1/1/1/1 |
| `trainer_operations/operations_member_attendance` | 117 | 112 | 89 | 23 | 4 | 261 | PASS / 22 | 1/1/1/1 |
| `trainer_operations/operations_trainer_attendance` | 78 | 73 | 66 | 7 | 4 | 261 | PASS / 22 | 1/1/1/1 |
| `trainer_operations/operations_weekly_availability` | 72 | 67 | 53 | 14 | 4 | 215 | PASS / 22 | 1/1/1/1 |

**Physical structure observation:** all 17 leaves exceed 25 total files when mandatory documentation, tests, fixtures, API, schema, locale and harness artifacts are counted; 16 leaves also exceed 25 production TS/TSX files. The supplied 5-gate matrix does not contain approved decomposition decisions for these leaves. Do not split or move routes without product/route-owner approval. The per-leaf maximum TSX file length is 289 lines, so the 300-line component ceiling passes.


## 11. Canonical 181-Rule Verification Sweep

Every Section 43P row now has an explicit disposition and evidence note. Status counts below are computed from `RE_AUDIT_CHECKLIST_RESULT.md`; non-PASS statuses remain visible.

| Disposition | Count | Meaning |
|---|---:|---|
| `PASS` | 80 | Source evidence checked and the stated static requirement passed. |
| `DEFERRED_TO_HOST_RUNTIME` | 57 | Requires semantic build/typecheck, installed test runner, browser, accessibility, responsive, backend or live host execution. |
| `OUTSIDE_SUPPLIED_SCOPE` | 14 | Host package/config/CI/backend files are not present in the supplied feature archive. |
| `NOT_VERIFIED_IN_SCOPE` | 13 | Static/source review is not sufficiently complete to claim PASS; these rows remain explicit and open. |
| `NOT_APPLICABLE` | 10 | Conditional behavior is not present in this Trainer feature scope. |
| `EXTERNAL_PRODUCT_DECISION_BLOCKED` | 7 | Requires route/API/product or feature-boundary decision evidence not supplied. |
| **Total** | **181** | **No unverified/deferred/out-of-scope item is represented as PASS.** |

## 12. RBG Closure & Final Source Verification Table

| Measure | Final result | Evidence / interpretation |
|---|---:|---|
| RBGs completed | 18/18 | All user-approved RBGs 1–18 completed and checkpointed. |
| Original audit findings | 42/44 source-closed | ISSUE-005 and ISSUE-033 remain explicit external/contract blockers. |
| Global focus token | 0 TSX occurrences | `focus-visible:ring-primary` is absent from all TSX source; `focus-visible:ring-focus-ring` is used. |
| TypeScript/TSX syntax | 1,344 files / 0 parse diagnostics | TypeScript 5.8.3 parser only; not semantic typecheck. |
| Internal import resolution | 3,847 / 0 unresolved / 0 case mismatch | Relative and `@/app/frontend_trainer/` imports checked. |
| Cross-leaf business imports | 0 | Static sibling-boundary scan. |
| Explicit `any` type nodes | 0 | TypeScript AST scan. |
| Inline type declarations outside types/schemas/contracts/tests | 0 | 51 declarations moved to module-owned `types/` files. |
| Arbitrary Tailwind bracket utilities | 0 | Replaced with semantic `max-h-dialog-mobile`, `max-h-dialog-desktop`, and `z-skip-link` utilities. |
| Global CSS parse | PASS | PostCSS parser accepted `globals.css`; all three new semantic utilities were recognized as balanced `@utility` rules. |
| Component responsibility comments | 245/245 | Production components carry the required responsibility note. |
| Hook/store data-flow comments | 100% of production hooks/stores | Required data-flow comments present; type-only contracts and tests excluded. |
| Current source tree files | 1,461 total; 1,344 TS/TSX | Final static inventory after audit remediation. |
| Source/archive delta | 327 modified, 113 added, 10 retired; 450 unique paths | Exact byte comparison against frozen original ZIP. |
| Original ZIP integrity | CRC PASS / SHA unchanged | Frozen source archive remains immutable. |

**Release decision:** source repair work is packaged as a source-repaired feature release with explicit audit limitations. It is not a production sign-off. The 13 `NOT_VERIFIED_IN_SCOPE` rules, 57 host/runtime deferrals, 14 out-of-scope items, 10 not-applicable items and 7 external decision blockers remain explicitly recorded in the Section 43P ledger.

