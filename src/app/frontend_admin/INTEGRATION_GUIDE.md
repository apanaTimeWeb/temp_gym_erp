## RBG 55–57 host verification extension

On approved host: run `npx tsc --noEmit`, `npx vitest run`, `npm run build`, `npx playwright test`. Include the added failure-path tests for Permissions, Coupon, Plans and Blacklist, verify generic error copy in English/Hindi for each affected leaf, confirm form 400 field errors are still associated and retries remain available. Do not resolve ISSUE-038/182/229/230 without backend contract/security owner evidence. No standalone host dependencies are bundled.


# RBG 52–54 — Admin Frontend v51 (2026-11-01)

## Section 1 — Changelog

- **RBG 52 / Settings:** Corrected the translation-marker off-by-one failure in six forms (Gym Profile, GST, Notifications, General, App Integration, Payment Gateway), with a leaf-owned pure helper and new Vitest regression tests.
- **RBG 53 / Finance:** Fixed the same defect independently in Payroll, Salary Advance and Staff Dues forms using *three separate leaf-owned resolvers*. No shared cross-submodule business utility was introduced.
- **RBG 54 / HR Staff:** Fixed validation translation-key truncation in the staff modal. Linked dynamic field errors with stable `aria-describedby`, `aria-invalid` and alert output; translated error messages in role/branch selectors without changing the dropdown API.

## Source verification

- **126 / 126** controlled assertions passed, executing the real transpiled helpers and newly authored test bodies (Vitest assertion stubs, not the official runner).
- **2813** TS/TSX files parsed and **3997** local imports resolved without a reported static failure.
- Source compared to previous verified RBG 51: **15 modified / 10 added / 0 removed**, **3275 prior archive files byte-for-byte unchanged**.
- **44/44** autonomous submodules physically present with documentation trio, URL config and host stub files. This does not establish completeness of canonical 22-section documentation or 8/8 portability.
- Group sizes **9, 12 and 4** affected paths, respectively. The historical suggested/mandated eight-distinct-findings-per-group floor is not met; disclose deviation rather than invent additional findings.

## Release gate

**Remain PARTIAL.** External contract blockers `ISSUE-038`, `ISSUE-182`, `ISSUE-229`, and `ISSUE-230` remain unresolved. Historical 207-issue inventory and 181-rule checklist are retained without status upgrades. No approved host `package.json`, dependency lock, complete route tree or authenticated API is supplied; consequently semantic TypeScript, real Vitest/React, Next.js build, Playwright, assistive technology and RBAC integration testing have **not** been executed.

In a verified host, run `npx tsc --noEmit`, the approved lint command, `npx vitest run` (include five new `ValidationMessages.test.ts` files), `npm run build`, and `npx playwright test`. Verify actual form validation English/Hindi key resolution and HR Staff screen-reader error announcements. Obtain the four authoritative API/security contracts from the owning teams.

---

# RBG 49–51 — Admin Frontend v51 (2026-11-01)

## Section 1 — Changelog

- **RBG 49 / HR Staff:** Protect the module-owned mock against malformed page/limit values, change fallback employee identifiers to UUID-backed format, and author MSW regression coverage; production HR API unchanged.
- **RBG 50 / Usage Analytics:** Replace timestamp-generated mock request IDs with UUIDs, reset module-owned replay/scenario/latest-request state from the standalone harness, and sanitize user-facing read/upgrade errors with the approved EN/HI locale strings. Retain successful backend feedback.
- **RBG 51 / Dashboard:** Prevent backend exception messages from reaching dashboard error UI; use an existing localized retry/support message, preserve the separately localized date-range error and existing query/refetch behavior.

## Verification and source integrity

- Actual transpiled source exercised under explicit dependency stubs: **32 / 32 assertions pass**. This includes MSW callback behavior, UUID uniqueness/replay/reset, hook errors and fallback UI source.
- **2803 TS/TSX grammar files parsed**; **3984 local role imports resolved**. No diagnostic/runtime claim beyond these checks.
- Compared to verified RBG48: **13 modified**, **3 added**, **0 deleted**, **3267 unchanged** archive files before adding RBG49–51 delivery evidence.
- **44/44 submodules** have their required physical documentation trio, URL config, and ambient host stubs present. This is a presence check, not a validation of all 22 documentation sections or runtime isolation.
- All three RBG scopes contain no more than 18 affected paths. The executive suggested minimum of eight distinct findings is not met in these narrowly supported groups; do not infer extra findings to fill the quota. Treat the workload floor as an open process-deviation requiring future process review rather than falsely marking it complied with.

## Outstanding blockers

- **ISSUE-038** — Billing ISO currency identity absent from verified DTO/API contract.
- **ISSUE-182** — Health Alerts GET endpoint unverified.
- **ISSUE-229** — Permissions role-default GET endpoint not confirmed.
- **ISSUE-230** — server-side self-permission denial cannot be proven by client code.
- Other historical issue statuses and the 181-rule sweep are preserved and **not promoted**.
- Semantic `tsc`, Vitest/RTL, Next production build, Playwright, assistive-technology and authenticated backend/RBAC execution remain **DEFERRED_TO_HOST_RUNTIME**.

## Host verification checklist

In a verified host with approved dependencies installed, execute `npx tsc --noEmit`, `npx vitest run`, `npm run build`, and `npx playwright test`, specifically including the three changed submodules' new/updated tests. Audit currency, Health Alerts and Permissions contracts with their API/security owners; authenticate read/write permission and tenant isolation. This archive must stay `PARTIAL`.


---

# Admin Frontend v51 — RBG 40–42 Source Repair Report (2026-11-01)

## Section 1 — Changelog

- **RBG 40 (8 paths):** Finance Payroll and HR Staff read-query state now uses an existing bilingual retry message instead of raw remote `Error.message` strings. Payroll toast paths are also redacted. Queries retain their errors internally and their retry/refetch callbacks. Two module-local React regression tests authored (not run under Vitest).
- **RBG 41 (5 paths):** Coupon create/update idempotency intents include the normalized write payload; identical retries retain their key, changed payloads generate distinct intents. Coupon client edit-eligibility now compares against the local calendar date, matching the date-only form validator. A module-local pure utility and tests were added. Server coupon-expiry timezone remains unverified.
- **RBG 42 (4 paths):** Coupons mock creates UUID-backed record IDs and clamps page and limit to positive safe integers. Added a locally-owned pagination utility and regression tests. Backend API contract is unchanged.

## Verification performed

- 2,790 TS/TSX files parsed without syntax diagnostics; 3,928 local role imports resolved.
- 27 executed assertions against transpiled actual source with controlled React/MSW/API stubs, including sanitized payroll/HR errors, coupon intent identity, mock creation and mock pagination.
- 5 additional executed hook-level checks using an Asia/Kolkata fixed clock for coupon edit eligibility and payload-specific mutation retries.
- **Total controlled assertions: 32 PASS**. They are NOT equivalent to running actual React, MSW, Vitest, semantic TypeScript or the production Next.js build.

## Risks and blockers

- `ISSUE-038`: Currency identity not established by the supplied API contract.
- `ISSUE-182`: Health Alerts GET endpoint cannot be determined from verified backend evidence.
- `ISSUE-229`: Permissions role-default canonical endpoint requires backend owner evidence.
- `ISSUE-230`: Server-enforced self-permission denial needs authenticated backend tests.
- Existing 207-issue historical reconciliation and 181-rule statuses remain unchanged. The legacy per-issue ledgers contain unresolved/partial items.
- Local date-only behavior is corrected in the Coupon UI; **authoritative backend expiry timezone remains contract dependent**.

## Host verification commands

Inside the verified Next.js host with locked dependencies and proper configuration: run `npx tsc --noEmit`, ESLint, `npx vitest run`, `npm run build`, `npx playwright test`. Exercise the two new read-error redaction tests and the Coupon intent/pagination tests with actual library dependencies, including explicit timezone scenarios, screen-reader flows and authenticated RBAC tests.

**Delivery status:** PARTIAL — source repairs and controlled execution verified, not production release certification.

---

# Admin Frontend v51 — RBG 37–39 (2026-11-01)

## Section 1 — Changelog

- **RBG37 (15 source paths):** Coupon, Plan, Announcement, Notification and Payout URL builders now reject empty and dot-only identifiers before insertion as path segments; verified existing endpoint shapes are retained.
- **RBG38 (15 source paths):** Finance Ledger, Gym Health Alerts dismiss, Branch Directory, HR Staff and Blacklist dynamic endpoints receive the same locally-owned path guard; no cross-feature business imports introduced.
- **RBG39 (13 source paths):** Member Directory and Audit Logs path guards; Salary Advance, Staff Dues and Finance Staff Ledger read-query errors now use an already-shipped English/Hindi generic retry message instead of displaying raw Error.message strings. Full client and server failures remain observable in query error status and retries.
- **Evidence:** 243/243 targeted controlled/source checks; 72/72 newly authored URL-test assertions executed with minimal Vitest assertion stubs; 4/4 Finance read hooks executed with controlled dependencies. These checks are not full Vitest or browser proof.
- All 44 autonomous submodules and previous source functionality preserved. No existing source file deleted; archived prior release evidence unchanged unless this checkpoint's files explicitly replace the physical cross-check/report index.
- **External blockers OPEN:** `ISSUE-038`, `ISSUE-182`, `ISSUE-229`, `ISSUE-230`. No API endpoint or currency inferred. The 207-issue and 181-rule historical ledgers remain evidence-bounded, not artificially passed.

## Host integration and verification instructions

1. Integrate with the verified locked Next.js host and its installed React, TanStack Query, Zod, next-intl, MSW, Vitest/RTL and Playwright dependencies. Do not generate unverified host infrastructure.
2. Run `npx tsc --noEmit`, approved ESLint checks, full `vitest run`, production `next build`, Playwright and browser/screen-reader checks in the host. Execute the 12 new module-local `*PathSegmentContract.test.ts` tests and finance query-error tests.
3. Confirm the four external contracts from API owners; test current-admin self-permission rejection and cross-tenant authorization on the backend. Frontend-only guards do not satisfy server authorization requirements.

---

# Admin Frontend v51 — RBG 34–36 source hardening (2026-11-01)

## Section 1 — Changelog

- **RBG34:** Permissions staff/reset API URL parameter encoding; JSON tuple action intent keys; matching mutation cleanup and existing regression expectation updates. Eight source paths affected.
- **RBG35:** Percent-encoded member-ID URL builders in three independent Finance leaves, with separate module-owned route tests and feature contract annotations. Nine paths affected.
- **RBG36:** Payroll staff/payroll update URL segment encoding, local regression coverage, and documentation updates. Four paths affected.
- Verified **89/89 targeted checks** with executed transpiled source helpers and a controlled Permissions hook, **2772** TS/TSX grammar files, and **3927** local imports. No current React/Vitest/Next.js build claimed.
- Source files modified **19**, added **2**, removed **0**, unchanged **3032** versus verified RBG33 baseline.
- Pre-release blockers `ISSUE-038`, `ISSUE-182`, `ISSUE-229`, `ISSUE-230` remain OPEN. The existing 207 issue-reconciliation rows and 181 canonical sweep statuses are not modified.
- Output MUST remain `frontend-admin-v51-PARTIAL-rbg36.zip` until all required contracts and runtime checks are independently verified.

## Host integration / verification checklist

1. Install the approved host project's locked dependencies and run semantic `tsc --noEmit`, ESLint, unit tests (Vitest + RTL), Next.js production build, and Playwright. Do not change package manager without checking the host lockfile.
2. Specifically run Permissions intent/URL tests, Finance Payments/Expenses/Summary URL contract tests, and Payroll URL contract tests.
3. Have API/security owners verify currency identity, Health Alerts GET route, Permissions role-default GET endpoint and server-side self-permission rejection. Perform authenticated RBAC/tenant integration tests; do not rely on client-side permission visibility.

---

# Admin Frontend v51 — RBG 34–36 source hardening (2026-11-01)

## Section 1 — Changelog

- **RBG34:** Permissions staff/reset API URL parameter encoding; JSON tuple action intent keys; matching mutation cleanup and existing regression expectation updates. Eight source paths affected.
- **RBG35:** Percent-encoded member-ID URL builders in three independent Finance leaves, with separate module-owned route tests and feature contract annotations. Nine paths affected.
- **RBG36:** Payroll staff/payroll update URL segment encoding, local regression coverage, and documentation updates. Four paths affected.
- Verified **75/75 targeted checks** with executed transpiled source helpers and a controlled Permissions hook, **2772** TS/TSX grammar files, and **3927** local imports. No current React/Vitest/Next.js build claimed.
- Source files modified **19**, added **2**, removed **0**, unchanged **3032** versus verified RBG33 baseline.
- Pre-release blockers `ISSUE-038`, `ISSUE-182`, `ISSUE-229`, `ISSUE-230` remain OPEN. The existing 207 issue-reconciliation rows and 181 canonical sweep statuses are not modified.
- Output MUST remain `frontend-admin-v51-PARTIAL-rbg36.zip` until all required contracts and runtime checks are independently verified.

## Host integration / verification checklist

1. Install the approved host project's locked dependencies and run semantic `tsc --noEmit`, ESLint, unit tests (Vitest + RTL), Next.js production build, and Playwright. Do not change package manager without checking the host lockfile.
2. Specifically run Permissions intent/URL tests, Finance Payments/Expenses/Summary URL contract tests, and Payroll URL contract tests.
3. Have API/security owners verify currency identity, Health Alerts GET route, Permissions role-default GET endpoint and server-side self-permission rejection. Perform authenticated RBAC/tenant integration tests; do not rely on client-side permission visibility.

---

# Admin v51 — Post-RBG30 validation safety cycle (RBG31–33, 2026-11-01)

## Section 1 — Changelog and exact source scope

- **RBG31 (17 paths):** Fixed exact registered-field-path matching in 13 high-priority validation mappers, including Permissions, Health Alerts, Finance financial mutations, Billing, Members and HR. Permissions mutation idempotency keys now include the intended `enabled` value, keeping identical retries stable while avoiding cross-payload reuse. Added a feature-local Vitest regression and updated its contract notes.
- **RBG32 (16 paths):** Fixed another 14 autonomous modules' error-field mappers, covering Attendance, Subscriptions, Communication, Dashboard and Finance. Added a module-local Vitest test and documentation entry.
- **RBG33 (17 paths):** Fixed the remaining 15 root-only HTTP 400 mapping defects across Finance, Gyms, HR, Navigation and Sales. Added a module-local Vitest test and documentation entry. **All 42 original root-only mappers are patched.**
- Source-level checks: 468/468 controlled assertions (including real transpiled module callbacks) passed, 2,770 TS/TSX grammar files parsed, 3,923 local imports resolved. Complete React/Vitest/Next.js typecheck/build/browser tests are not executed.
- No business feature deleted and all 44 autonomous submodules preserved. Original API endpoints, currency assumptions, and authorization contracts unchanged.
- External blockers **remain open**: ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230. Historic 207-ID reconciliation and 181-rule sweep retained without ungrounded PASS promotion.
- Package naming remains `frontend-admin-v51-PARTIAL-rbg33.zip` until complete release criteria are proven.


## POST-RBG24 PATCH — Evidence and canonical naming correction (RBG25–27)

- **RBG25:** Corrected a *reporting logic error*, not underlying source issue closure. The previous cumulative issue CSV missed 35 RBG1-4 records due to mismatched header names. All **207 source audit issue IDs** now map to one exact CSV row in the 24 existing closure ledgers, including OPEN/PARTIAL issues. This does not mean 207 issues are closed.
- **RBG26 / ISSUE-031:** Renamed two Plans constants/query-key files to canonical `admin_billing_plans_catalog.constants.ts` and `admin_billing_plans_catalog.query_keys.ts`, updating all source importers together. Named exports and runtime values preserved. New Vitest regression file authored (not run under Vitest); **six executed transpiled-source value/query key assertions** passed.
- **RBG27 / ISSUE-010 recurrence:** Corrected five Attendance Reports component export identities and importers. Restored the unchanged host-owned `admin_layout.AdminNavigationLayoutNotFound.*` translation keys; component-name regression test authored (not run under Vitest).
- Whole-role TypeScript syntax parsing, local import-path existence, legacy import checks, 44-submodule physical inventory, 181-rule sweep, and 207-ID source-ledger mapping verified in a standalone Node validation run. It does **not** establish TypeScript semantic typechecking, React rendering or complete architecture compliance.
- **Current packaging status is PARTIAL.** All source-level unresolved issues and external contract/runtime limitations recorded in `OUTSTANDING_FINDINGS_RECONCILIATION.md` remain open.

# Admin Frontend v51 — RBG 18, 19 and 20 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg17.zip` (verified SHA-256 `edb1d8be706da92a12f2ec76457b4b338dc3a8945cedf2b46d9bc5fa151b8768`). Output: `frontend-admin-v51-PARTIAL-rbg20.zip`.

## Implemented work

- **RBG 18 — HR Staff / Blacklist:** HR profile sort button with accessible target, staff create mock validation and reset, blacklist payload-bound idempotency, navigation-safe URL hydration, specific-scope response schema, store/contract tests and documentation. Partial: HR branch location is not present in API reference; a safe fallback is rendered.
- **RBG 19 — Members Directory:** canonical link targets and whole-row keyboard/click navigation, profile drawer Escape/focus behavior, host-visible toast notifications, branch fetch failures with retry, aligned mock branch names, current-month expiry excluding earlier dates, corrected test setup. `ISSUE-197` (host primitive ownership) remains open.
- **RBG 20 — Admin Navigation / Profile:** removed duplicate Socket.IO manual reconnect ownership, neutral missing-role label (EN/HI), improved toast ID collision behavior, updated Profile domain documentation, password error announcement and input association, host confirmation provider consumed by Profile dirty-form guard and mounted in isolated harness; `ISSUE-210` P1 source-level render crash corrected.

## Verification performed and limitations

- **135/135** TypeScript grammar, direct local import resolution, JSON parsing and targeted source checks passed.
- **16/16 controlled executable callbacks** passed using transpiled source: HR mock POST/rejection/reset, Members current-month mock/summary, canonical member path, Toast state and idempotency-key registry. Third-party libraries were stubbed: **not** installed Vitest, production Zod or React.
- **40 modified, 3 new, zero deleted** role source files versus RBG17; **2997** older role files byte-for-byte identical. All **44** autonomous leaves preserve documentation trios, URL configurations and host stubs.
- **NOT EXECUTED:** semantic TypeScript checks with project dependencies, production build, RTL/Vitest, Playwright, browser/screen-reader and authenticated API/security integration.
- **Still OPEN:** `ISSUE-187` location backend contract, `ISSUE-191` residual historical documentation consistency, `ISSUE-197` shared primitive ownership, `ISSUE-182` Health Alerts API route, `ISSUE-038` plan currency and other earlier issues. No complete release claim.

## Physical evidence

- `audit_evidence/ADMIN_V51_RBG18_CLOSURE_LEDGER.csv`, `...RBG19...`, `...RBG20...`
- `audit_evidence/ADMIN_V51_RBG18_20_SOURCE_FILE_MANIFEST.csv` and individual RBG manifests (SHA-256)
- `audit_evidence/ADMIN_V51_RBG18_20_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md` (3 physical tables)
- `audit_evidence/ADMIN_V51_RBG18_20_STATIC_VALIDATION.json`
- `RE_AUDIT_CHECKLIST_RESULT.md` (previous 181-item statuses remain evidence bounded)

---

# Admin Frontend v51 — Cumulative RBG 15, 16 and 17 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg14.zip` (verified SHA-256 `ed2393fa84eabf79ef6231944978d121b6e4458dabcd6257590d8619ea7932ee`). Output: `frontend-admin-v51-PARTIAL-rbg17.zip`.

## Section 1 — Changelog and validated fixes

- **RBG 15 — Finance retry / localization:** `ISSUE-149` Staff Dues and Salary Advance retain the same UUID Idempotency-Key on ambiguous mutation failures; keys clear on user cancellation or confirmed success. Corrected payment-mode namespaces (`ISSUE-155`) and HR Staff dirty-form new-tab/download link handling (`ISSUE-154`).
- **RBG 16 — Staff Dues P1 financial safety:** `ISSUE-161` staff due balances remain integer minor units in API DTO, while the form uses major units: 3500 minor becomes 35 major, the input's maximum comparison is also major, and the payment request converts exactly once back to 3500 minor. Two finance forms now reject more than two decimal places (`ISSUE-160`); bilingual validation labels and source tests added. Salary/Dues confirmation providers wrap their child consumers and standalone harnesses.
- **RBG 17 — Health Alerts / HR:** Health Alerts receives its owning confirmation context, safer localized feedback, stable idempotency keys on ambiguous failures, explicit mock fixture reset and escaped dismiss ID (`ISSUE-149/151/158/183`). Staff CRUD paths encode IDs (`ISSUE-183`), HR Staff searchable dropdown restores focus (`ISSUE-164`), and HR Performance loading and failure recovery expose accessible status and Retry (`ISSUE-185`). Two scenario tests now assert generated UUIDs (`ISSUE-184/186`).

## Executed evidence

- **214/214 targeted source assertions passed:** TypeScript parsing, direct source import existence, relevant EN/HI translations, 44-module physical inventory checks, safe monetary conversion, decimal boundaries, URL path encoding and feature-local idempotency store.
- **5/5 controlled source behavior cases executed:** two finance mutation hooks under injected query/confirm stubs (including ambiguous failure and successful retry), Health Alert mutation idempotency lifecycle, Staff Dues selection effect and Health Alert mock-state reset. These tests run transpiled module logic with stand-ins, **not** the installed React/Vitest or production backend.
- Source delta against verified RBG14: **36 modified + 2 added + 0 deleted** role source files; 2999 previous role source files byte-identical. All **44** autonomous submodules retain physically present doc trios, local URL configs and host stubs.

## Explicitly open, not falsely certified

- **ISSUE-182 P1 remains unresolved:** Health Alerts list endpoint aliases the frontend route. No verified backend route exists in the supplied contract; we cannot invent it.
- RBG15 open: 140, 142, 150, 156; 151/154/158 are partial across further leaves. RBG16 open or unverified: 159 (not assigned), 162, 163, 168, 173, 175; dropdown UI runtime verification pending. RBG17 open or unverified: 176, 179, 181; 184/185/186 still require runner/browser confirmation.
- Prior unresolved currency contracts, cross-leaf host UI ownership, branch authorization, server-global sorting and historical primary-issue evidence remain unresolved. The original 181-rule sweep is retained without upgrading statuses.
- **NOT EXECUTED:** full semantic TypeScript, Next.js build, Vitest/React Testing Library, Playwright, browser/assistive technology, authenticated backend and RBAC/tenant enforcement.

## Artifacts physically present

- `audit_evidence/ADMIN_V51_RBG15_CLOSURE_LEDGER.csv`, `...RBG16...`, `...RBG17...`; each issue is individually classified.
- `audit_evidence/ADMIN_V51_RBG15_17_SOURCE_FILE_MANIFEST.csv` and three per-RBG manifests; physical SHA-256 per changed file.
- `audit_evidence/ADMIN_V51_RBG15_17_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv` (44 physical rows).
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md` (three physically generated verification tables).
- `audit_evidence/ADMIN_V51_RBG15_17_STATIC_VALIDATION.json`, `RE_AUDIT_CHECKLIST_RESULT.md` (181-rule statuses unchanged).

---

# Admin Frontend v51 — Cumulative RBG 15, 16 and 17 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg14.zip` (verified SHA-256 `ed2393fa84eabf79ef6231944978d121b6e4458dabcd6257590d8619ea7932ee`). Output: `frontend-admin-v51-PARTIAL-rbg17.zip`.

## Section 1 — Changelog and validated fixes

- **RBG 15 — Finance retry / localization:** `ISSUE-149` Staff Dues and Salary Advance retain the same UUID Idempotency-Key on ambiguous mutation failures; keys clear on user cancellation or confirmed success. Corrected payment-mode namespaces (`ISSUE-155`) and HR Staff dirty-form new-tab/download link handling (`ISSUE-154`).
- **RBG 16 — Staff Dues P1 financial safety:** `ISSUE-161` staff due balances remain integer minor units in API DTO, while the form uses major units: 3500 minor becomes 35 major, the input's maximum comparison is also major, and the payment request converts exactly once back to 3500 minor. Two finance forms now reject more than two decimal places (`ISSUE-160`); bilingual validation labels and source tests added. Salary/Dues confirmation providers wrap their child consumers and standalone harnesses.
- **RBG 17 — Health Alerts / HR:** Health Alerts receives its owning confirmation context, safer localized feedback, stable idempotency keys on ambiguous failures, explicit mock fixture reset and escaped dismiss ID (`ISSUE-149/151/158/183`). Staff CRUD paths encode IDs (`ISSUE-183`), HR Staff searchable dropdown restores focus (`ISSUE-164`), and HR Performance loading and failure recovery expose accessible status and Retry (`ISSUE-185`). Two scenario tests now assert generated UUIDs (`ISSUE-184/186`).

## Executed evidence

- **211/211 targeted source assertions passed:** TypeScript parsing, direct source import existence, relevant EN/HI translations, 44-module physical inventory checks, safe monetary conversion, decimal boundaries, URL path encoding and feature-local idempotency store.
- **5/5 controlled source behavior cases executed:** two finance mutation hooks under injected query/confirm stubs (including ambiguous failure and successful retry), Health Alert mutation idempotency lifecycle, Staff Dues selection effect and Health Alert mock-state reset. These tests run transpiled module logic with stand-ins, **not** the installed React/Vitest or production backend.
- Source delta against verified RBG14: **36 modified + 2 added + 0 deleted** role source files; 2999 previous role source files byte-identical. All **44** autonomous submodules retain physically present doc trios, local URL configs and host stubs.

## Explicitly open, not falsely certified

- **ISSUE-182 P1 remains unresolved:** Health Alerts list endpoint aliases the frontend route. No verified backend route exists in the supplied contract; we cannot invent it.
- RBG15 open: 140, 142, 150, 156; 151/154/158 are partial across further leaves. RBG16 open or unverified: 159 (not assigned), 162, 163, 168, 173, 175; dropdown UI runtime verification pending. RBG17 open or unverified: 176, 179, 181; 184/185/186 still require runner/browser confirmation.
- Prior unresolved currency contracts, cross-leaf host UI ownership, branch authorization, server-global sorting and historical primary-issue evidence remain unresolved. The original 181-rule sweep is retained without upgrading statuses.
- **NOT EXECUTED:** full semantic TypeScript, Next.js build, Vitest/React Testing Library, Playwright, browser/assistive technology, authenticated backend and RBAC/tenant enforcement.

## Artifacts physically present

- `audit_evidence/ADMIN_V51_RBG15_CLOSURE_LEDGER.csv`, `...RBG16...`, `...RBG17...`; each issue is individually classified.
- `audit_evidence/ADMIN_V51_RBG15_17_SOURCE_FILE_MANIFEST.csv` and three per-RBG manifests; physical SHA-256 per changed file.
- `audit_evidence/ADMIN_V51_RBG15_17_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv` (44 physical rows).
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md` (three physically generated verification tables).
- `audit_evidence/ADMIN_V51_RBG15_17_STATIC_VALIDATION.json`, `RE_AUDIT_CHECKLIST_RESULT.md` (181-rule statuses unchanged).

---

# Admin Frontend v51 — RBG 13 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg12.zip` (SHA-256 `f0f703ca797466b715cc317bb969a5a0e893e8cf680a6c0a8f2657d0f716fb47`). Output: `frontend-admin-v51-PARTIAL-rbg13.zip`.

## Independently verified source repairs

- **ISSUE-114:** The Revenue, P&L and Payroll Report range pickers now initialize a selected calendar month on open but do not reset the visible month during a navigation effect. Navigation/day buttons use minimum 44px targets and a scrollable minimum-width calendar grid. Added two regression cases per picker for cross-month selection and targets (authored, not run with React/RTL).
- **ISSUE-115:** All three mock branch reference lists use the actual `g1`–`g3` IDs and names in their owning report fixture. Executed 12 isolated fixtures (three valid branches + one unknown ID per leaf); no fabricated backend branch identity.
- **ISSUE-116:** Bilingual messages now correctly say both PDF and CSV exports remain blocked until the actual binary API contract is approved. No imaginary response/download scheme.
- **ISSUE-126:** Invalid custom range Retry switches to the known-valid `this_month` preset while preserving unrelated URL parameters; a valid range continues through `query.refetch()`.
- **ISSUE-111/112:** Existing RBG10 Payouts fixes preserved unchanged; no unnecessary duplicate modification.

## Explicitly OPEN and never presented as closed

- **ISSUE-117:** Standalone harness host-owned locale bundle composition not resolved in this RBG. Host translations must be supplied under their verified namespaces.
- **ISSUE-122:** Other count/percentage localization call sites still require audited repairs.
- **ISSUE-127:** Unused Revenue report store state not removed because source-level ownership and consumer evidence must be reconciled before deletion. No business feature eviction.
- All prior unresolved issues remain open, including ISO currency identity, host generic primitive ownership, true backend branch authorization, server-global sorting and any missing primary audit evidence.

## Verification boundaries

- **102/102 source checks PASS**, including TypeScript grammar/transpilation, local import references, locale key parity, source rendering assertions and **12 executed actual report-fixture cases** with a controlled transpilation environment.
- **18 existing role-source files modified; no new files or deletions; 3013 other original role-source files byte-identical**. All **44** autonomous submodules retain documentation trio, URL config and host stubs.
- **NOT EXECUTED:** complete React/Vitest RTL tests, semantic TypeScript checking, Next.js production build, Playwright, browser/screen reader, authenticated backend and network behavior. No host application manifest/runtime provided. Do not label source grammar checks as production compilation.
- **181-rule status sweep retained conservatively:** {'NOT_VERIFIED_IN_SCOPE': 176, 'SOURCE_REPAIR_IMPLEMENTED_HOST_RUNTIME_NOT_VERIFIED': 1, 'EXTERNAL_PRODUCT_DECISION_BLOCKED': 2, 'PASS': 2}; no upgrade of global status based on targeted repairs.

## Mandatory packaging evidence

- `audit_evidence/ADMIN_V51_RBG13_CLOSURE_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG13_SOURCE_FILE_MANIFEST.csv`
- `audit_evidence/ADMIN_V51_RBG13_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG13_STATIC_VALIDATION.json`
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md` (three physical tables)

---

# Admin Frontend v51 — RBG 12 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg11.zip` (SHA-256 `d4723ef547c443627cd3c2a263c6c3b9261ffa3b0b003a25f2467efc08b137fa`).
Output: `frontend-admin-v51-PARTIAL-rbg12.zip` — cumulative RBG 1–12 source checkpoint, **not complete release certification**.

## RBG 12 source-backed repairs

- Finance Expenses now validates `page` and `expensePage` URL values as positive safe decimal integers, rejecting NaN/Infinity/fractions/exponents/unsafe values. Unknown expense category query values fall back to the documented `All` filter. The API endpoint names and server-provided record values remain unchanged.
- The local Expenses searchable dropdown now announces its selected value in the trigger accessible name, restores focus after selection, supports Home/End keyboard navigation, and keeps the active option visible in the scrollable listbox. Existing user interactions are preserved.
- The local Expenses pagination displays and navigates only normalized finite page bounds.
- The Expenses route no longer treats the intentionally disabled Payments query as an Expenses error or includes it in the retry operation. Its existing hook test reflects that declared leaf scope.
- Added co-located tests for page-normalization edge cases, dropdown keyboard/focus behavior, pagination clamping, and URL-backed hook state; test source was checked, but React/Vitest runner was **not** executed.

## Source-to-audit mapping

- `ISSUE-102`–`ISSUE-108`: **NOT_VERIFIED_PRIMARY_ATOMIC_FINDING_MISSING**. Consolidated report contains only the Group 3 index referring back to missing originating atomic reports. This checkpoint independently repairs verified source defects; it does **not** falsely assign those repairs to unspecified issue IDs.
- `ISSUE-109`: documented Payments `aria-sort` repair from RBG10 remains present in code. Its interactive screen-reader behavior remains unverified.
- `ISSUE-110`: Payouts forbidden document accurately lists the same P&L/KPI read endpoints as its feature client; backend authorization remains unverified.
- Previously open currency identity, host UI primitive ownership, branch authorization, global/server sorting, and other unverified findings remain open.

## Checks actually performed

- **59/59 targeted checks passed**: TypeScript grammar and isolated transpile parse, direct local imports, source accessibility/wiring assertions, preservation of `ISSUE-109/110` patches, and **19 executed actual transpiled URL page helper cases**. These are not live browser or full React tests.
- Source delta: **5 modified, 4 added, 0 deleted**, with **3022 previous role-source files preserved byte-identically**. All **44** autonomous submodules retain doc trios, URL configs, host stubs.
- Existing 181-rule sweep remains conservative: {'NOT_VERIFIED_IN_SCOPE': 176, 'SOURCE_REPAIR_IMPLEMENTED_HOST_RUNTIME_NOT_VERIFIED': 1, 'EXTERNAL_PRODUCT_DECISION_BLOCKED': 2, 'PASS': 2}. No audit-wide pass claim.
- **Not executed**: semantic TypeScript typecheck against host dependencies, Vitest/RTL, Next.js production build, Playwright, screen readers, actual MSW/HTTP integrations or authenticated backend/tenant permissions. Host application dependency manifest/runtime unavailable in supplied role ZIP.

## Delivery ledgers

- `audit_evidence/ADMIN_V51_RBG12_CLOSURE_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG12_SOURCE_FILE_MANIFEST.csv`
- `audit_evidence/ADMIN_V51_RBG12_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md` (three independently computed physical tables)

---

# Admin Frontend v51 — RBG 11 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg10.zip` (SHA-256 `718fa4a0071bb56c9b43fe1cc5d4e999feead60e5edac875eefbf32e54239dbc`).
Output: `frontend-admin-v51-PARTIAL-rbg11.zip` (cumulative RBG 1–11; **NOT** complete-release certification).

## Directly verified source defects and repairs

- Payroll page and standalone harness now mount the same **feature-local confirmation provider**, before rendering any children that call the feature-local confirmation hook. Does not replace/delete the confirmation queue or invent an incompatible global provider.
- Payroll's create-form hook had a concrete compile/runtime error: destructuring `savePayroll` as `savePayrollWithValidation`, then redeclaring `savePayrollWithValidation` and calling the missing `savePayroll`. The source now correctly destructures `savePayroll`, with a co-located delegation regression test authored.
- Confirmation, payroll creation, and payroll payment dialogs now consume a co-located focus-management hook for initial focus, Tab containment, Escape dismissal, prior-focus restoration and scroll lock. The payroll staff selector exposes `aria-invalid` and `aria-describedby`; the dropdown announces the selected value, returns focus on choice, and uses feature-owned localizations.
- Payroll successful API response envelopes containing null/undefined `data` are rejected; canonical failure envelopes and valid falsy successful values remain valid. Actual transpiled callback behavior was checked with explicit controlled stubs.
- Payroll scenario overrides now intercept GET requests only, without masking production mutation methods. Controlled scenario callback execution included empty payload and canonical failures.
- English/Hindi locale parity checked; no assumed currency identity or backend endpoint introduced. Monetary UI currency contract remains **NOT_VERIFIED**.

## Verification actually executed

- **75/75 targeted checks PASS:** TypeScript grammar parsing, module-local import resolution, locale parity, source-level provider/focus/ARIA checks, nine executed API-envelope scenarios, and nine executed mock-scenario cases. The callbacks were transpiled and dependencies stubbed; these are not the live host service or MSW runner.
- Full semantic `tsc`, Vitest/React Testing Library execution, Next.js production build, Playwright, browser screen-reader behavior, and authenticated backend permission checks were **not executed** because full host runtime and dependencies were not supplied. New tests are authored, not represented as executed passes.

## Issue closure integrity

- `ISSUE-093`–`ISSUE-101` are **NOT_VERIFIED_PRIMARY_ATOMIC_FINDING_MISSING**. The consolidated Group 3 register cites original batches 83–103 but supplies neither the underlying finding text nor line evidence. Independently demonstrated Payroll fixes cannot be equated with closing those specific audit IDs.
- Previously open currency identity, host generic UI primitive ownership, branch authorization, server-wide sort, and other unverified findings remain open. No deletion of existing business features.

## Source preservation and three-table evidence

- Original role source changes: 15 modified, 3 new, **0 deleted**. All remaining 3009 prior-release source paths preserved byte-for-byte.
- All **44** submodules maintain the physical documentation trio, URL config and ambient host contracts. This physical inventory does not prove submodule runtime correctness.
- `audit_evidence/ADMIN_V51_RBG11_SOURCE_FILE_MANIFEST.csv`, `ADMIN_V51_RBG11_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`, `ADMIN_V51_RBG11_CLOSURE_LEDGER.csv`, `ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md` contain independently generated physical evidence.

---

# Admin Frontend v51 — RBG 10 Source Repair Checkpoint (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg9.zip` (SHA-256 `4fc44f52c75614611fdfcc449ffbe78978d8f34c91d5a4a4ee9787c50e707b6b`).
Output: `frontend-admin-v51-PARTIAL-rbg10.zip` (cumulative RBG 1–10, **not** ALL-RBGS-COMPLETE).

## Directly verified source repairs

- Finance Payments, Expenses, Summary and Payouts Management API response wrappers now reject `success: true` envelopes with `data: null` or `data: undefined` while retaining valid zero, false, empty-string and empty-array payloads. Existing canonical failure-envelope behavior preserved. Each module's co-located API response test includes regressions.
- Finance Payments table exposes `aria-sort` on the sortable column headers, in loading and populated states. This reflects *client/page-local* sort state only; server-wide ordering is NOT asserted.
- Payouts P&L and Summary sortable header buttons use at least 44px minimum height/width.
- Finance Payments and Payouts searchable dropdown triggers announce the currently selected option, and focus returns to the trigger following selection. Two co-located RTL tests authored.
- Payouts scenario handler now scopes failure/empty interception to GET rather than all methods; scenario tests use a UUIDv4-format assertion rather than a fictional fixed ID and test that POST retains its handler.
- Payouts forbidden-pattern document has its read-contract list aligned with the *verified feature-local URL config and API client*. This is not evidence of server authorization.

## Verification: source and controlled callback execution

110/110 targeted checks passed: TypeScript **grammar parsing**, direct internal import existence, 32 executed transpiled API envelope callbacks, four mock scenario assertions and selected source accessibility checks. The new Vitest/React tests are **authored, not executed**. Semantic `tsc`, ESLint, Next.js build, Vitest/RTL, actual MSW integration, Playwright, screen-reader tests and authenticated backend behavior are `DEFERRED_TO_HOST_RUNTIME`/`NOT_VERIFIED_IN_SCOPE`.

## Issue closure limitation

Original atomic issue findings for `ISSUE-084`–`ISSUE-092` were not included in the consolidated Group 3 report, which only says to consult originating batch reports for Batches 83–103. The cross-cutting conclusions support the specific source improvements, but none of those nine issue IDs is certified fully closed. Earlier outstanding currency identity, generic host primitives, backend authorization/sorting, and all later RBGs remain open.

## Source preservation

18 source paths changed or added (16 modified, two new regression tests), zero source deletions. All other RBG9 source archive paths are byte-for-byte preserved. 44 submodules retain their required documentation trios, URL configuration and ambient host contracts. See `audit_evidence/ADMIN_V51_RBG10_SOURCE_FILE_MANIFEST.csv` and `audit_evidence/ADMIN_V51_RBG10_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`.

---

# Admin Frontend v51 — RBG 9 (2026-11-01)

Input: `frontend-admin-v51-PARTIAL-rbg8.zip`. Output: `frontend-admin-v51-PARTIAL-rbg9.zip`.
Actual source change: 12 modified, 1 added, zero removed; all other 3009 RBG8 source paths are carried forward byte-for-byte.

**RBG9 source repairs:** Notifications Center now provides per-item accessible read-state labels, disables inert read actions, announces unread count/mark-all progress, restores notification-popover trigger focus on Escape/Close and preserves >=44px navigation target. English/Hindi translations remain parallel and a co-located RTL regression test is authored (not executed). WhatsApp Campaigns, Finance Plan Revenue Analytics and Finance Branch Profit & Loss API wrappers reject `success:true` responses carrying null/undefined data; three co-located tests cover null/undefined and valid falsy data.

**Verification actually run:** 60/60 targeted source/executable checks passed, including 18 executed transpiled API-envelope assertions with controlled transport stubs, syntax parsing, module-local imports and locale parity. Not executed: semantic tsc/typecheck, Vitest/React/RTL tests, production build, Playwright/browser and authenticated backend integration.

**Issue claim limitation:** the consolidated Groups 2–3 audit contains only occurrence indices for ISSUE-074 through ISSUE-083 (except a cross-cutting theme for ISSUE-074/075 and a later summary of ISSUE-081). All RBG9 issue IDs remain open/not fully verified without exact original batch finding details. These verified source patches should not be misreported as full closure of those issue families.

Historical unresolved matters remain: ISSUE-038 currency identity, ISSUE-025/027/043 primitive ownership, ISSUE-031 coordinated filename normalization, backend branch authorization, server sorting, prior missing atomic audit findings, and RBG10–24.

Evidence: `audit_evidence/ADMIN_V51_RBG9_CLOSURE_LEDGER.csv`, `ADMIN_V51_RBG9_SOURCE_FILE_MANIFEST.csv`, `ADMIN_V51_RBG9_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`, `ADMIN_V51_RBG9_STATIC_VALIDATION.json`, and `ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md`.

---

# Admin Frontend v51 — RBG 8 Integration Checkpoint (2026-11-01)

**Archive:** `frontend-admin-v51-PARTIAL-rbg8.zip` contains cumulative RBG 1–8 source changes. **NOT** all RBGs complete. RBG 9–24 and earlier open issue families remain outstanding.

## 1. RBG 8 Changelog

- Notifications Center subscribes to the actual `admin_navigation` WebSocket provider mounted by `frontend_admin/layout.tsx` rather than an unmounted cloned feature-local context; standalone harness uses the same host provider without creating a second connection.
- Notifications mock mutations update cloned state; reset restores seeds. `mark-all` is disabled while mutation is pending, retaining original action/feedback. API response guard rejects missing/undefined success payloads.
- Announcement MSW pagination normalizes invalid page/limit values and bounds limit; creates use UUIDv4 IDs instead of collision-prone timestamps and no longer silently inject a default g1 target when input is missing.
- Corrected stale Notifications page test provider mock, invalid test hook wrapper, fabricated mutation test variable, and client tests that previously asserted a nonexistent test ID or bypassed locale provider. Added two targeted mock regression files, and a missing-success-data API regression.
- Role-wide authorization for branch selection is **not** verified; the backend/host branch contract remains unavailable. Notifications cloned generic provider file remains preserved, but unused by route, pending safe cross-module ownership resolution.
- The supplied Group 2 consolidated audit only provides issue occurrence references (not full atomic Batch 70–78 evidence), so ISSUE-065–073 are *not* all declared closed. See `audit_evidence/ADMIN_V51_RBG8_CLOSURE_LEDGER.csv`.

## 2. Actual Verification

- **63/63 static and source checks passed**, TypeScript syntax for 13 TS/TSX files, 25 executed transpiled mock handler assertions using transport/Zod stubs, in-scope import resolution, and exact RBG7-vs-RBG8 source preservation (13 modified + 2 added, 0 removed).
- **Not executed:** full MSW server runner, Zod form validation tests, Vitest/React Testing Library, semantic `tsc --noEmit`, Next.js build, Playwright, screen-reader/browser and backend/WebSocket authenticated integration. These remain `DEFERRED_TO_HOST_RUNTIME` or outside supplied scope.
- Artifacts: `audit_evidence/ADMIN_V51_RBG8_SOURCE_FILE_MANIFEST.csv`, `ADMIN_V51_RBG8_CLOSURE_LEDGER.csv`, `ADMIN_V51_RBG8_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`, `ADMIN_V51_RBG8_STATIC_VALIDATION.json`, `ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md`, `RE_AUDIT_CHECKLIST_RESULT.md`, and `playwright_E2E/` inherited from earlier checkpoints.

---

# Admin Frontend v51 — RBG 7 Integration Checkpoint (2026-11-01)

**Archive:** `frontend-admin-v51-PARTIAL-rbg7.zip` — cumulative source checkpoints RBG 1–7. NOT `ALL-RBGS-COMPLETE`. RBG 8–24 and recurring findings are outstanding.

## 1. RBG 7 Changelog

- Mounted the Announcements feature-owned confirmation provider above its consumers in the canonical route and standalone harness; retained queue and destructive-action semantics.
- Added feature-local EN/HI confirmation keys and dialog focus initialisation, Tab containment, Escape handling, focus restoration, and scroll locking.
- Reworked Announcements URL/query synchronization to restore removed parameters during history navigation without automatically overwriting new URLs with stale state; normalized invalid page inputs.
- Improved mutation key reuse: same immutable serialized draft keeps the retry key, a changed draft rotates it, and explicit discard clears the key.
- Excluded the forbidden Managers option from authoring-schema validation while preserving backward-compatible response DTO data.
- Prevented dirty-form navigation guard from hijacking download and non-current-tab links; removed raw request exception text from Announcements table errors.
- Replaced Communication domain navigation literals with the three existing canonical route contracts.
- Added three co-located tests (history reset, audience validation, dialog-context integration) and extended a mutation hook test. These tests were authored, NOT executed.

## 2. Evidence & Verification

- `audit_evidence/ADMIN_V51_RBG7_CLOSURE_LEDGER.csv`, `ADMIN_V51_RBG7_SOURCE_FILE_MANIFEST.csv`, `ADMIN_V51_RBG7_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`, `ADMIN_V51_RBG7_STATIC_VALIDATION.json`
- **93/93 targeted checks passed**, including TypeScript syntax parsing of 15 changed/new TS/TSX files, source import resolution and 3 cases of executed transpiled pure idempotency logic. These do not establish a full semantic typecheck or a rendered UI pass.
- **OPEN:** ISSUE-059 branch authorization, ISSUE-063 globally correct sorting, ISSUE-058 comparison semantics, issue IDs missing primary report detail, and the prior unresolved cross-module currency/ownership cases.
- No host `package.json`/runtime installed; full React/Vitest, `tsc --noEmit`, Next.js production build, Playwright/browser/screenreader, and backend authorization remain `DEFERRED_TO_HOST_RUNTIME` or `NOT_VERIFIED`.

---

# Admin Frontend v51 — RBG 6 Integration Checkpoint (2026-11-01)

**Archive:** `frontend-admin-v51-PARTIAL-rbg6.zip` — cumulative RBG 1–6 source changes, NOT an ALL-RBGS-COMPLETE release. RBG 7–24 remain pending. Original v50 historical reports below are not current release sign-off.

## 1. RBG 6 Changelog

- Subscription Plans, Subscriptions Overview and Usage Analytics mount their own feature-local confirmation provider **above** the components executing the confirm hooks. The standalone harnesses also mount the matching context.
- All three confirmation dialogs now have Escape handling, constrained Tab navigation, initial focus, focus restoration and background scroll lock, while preserving the existing confirm queue and typed destructive confirmation.
- Replaced invalid cross-feature `admin_layout` translations with module-owned `confirm`, `cancel` and typed-confirmation keys in both English and Hindi locale bundles.
- Removed duplicate `isSafeAdminSubscriptionsInvoicePdfUrl` import from Subscriptions Overview without altering its guarded PDF action.
- Subscriptions Overview pagination rejects unsafe numeric values, caps limit using the existing module constant, and has a new authored Vitest regression test (not executed).
- Subscription Plans and Overview pages no longer expose raw `Error.message` from requests directly in error UI.
- The consolidated Groups 2 audit contains **issue occurrence indices, not detailed primary Batch 41–80 issue reports**. Accordingly, this checkpoint does not falsely mark all ISSUE-046–054 closed. See the RBG6 closure ledger.

## 2. RBG 6 Verification

- `audit_evidence/ADMIN_V51_RBG6_CLOSURE_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG6_SOURCE_FILE_MANIFEST.csv`
- `audit_evidence/ADMIN_V51_RBG6_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG6_STATIC_VALIDATION.json`
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md`
- `RE_AUDIT_CHECKLIST_RESULT.md`; `FINAL_REPAIR_REPORT.md`; `playwright_E2E/` (existing suite)

**Tests actually run:** 127 targeted static/source checks and nine executed cases against the transpiled Subscriptions Overview pagination utility. **Tests not executed:** Vitest/RTL, semantic `tsc --noEmit`, complete Next.js build, Playwright/browser/accessibility, backend authorization and integration: `DEFERRED_TO_HOST_RUNTIME`. Unverified work is not a PASS.

---

# Admin Frontend v51 — RBG 5 Incremental Integration Note (2026-11-01)

**Package:** `frontend-admin-v51-PARTIAL-rbg5.zip` (RBG 1–5 cumulative). This v51 checkpoint is **not** an `ALL-RBGS-COMPLETE` release. The historical v50 changelog and its "final" status below describe a different original audit; do not interpret it as verification of the user-supplied 304-batch backlog.

## 1. v51 RBG 5 Changelog

- Plans confirmation dialog now uses its already-owned focus/Escape/Tab/restore hook; co-located RTL regression source added.
- Plans and Coupons unsaved-change hooks leave new-window, download and external links to native browser navigation; ordinary same-tab link guarding is retained.
- Subscription Invoices mocks expose state reset and reset both mutable fixtures in the MSW test harness. Stateful mock regression test source added.
- Invoice pagination uses integer/finite normalization and caps limit to the verified page-size constant (10). API query parsing passes raw numeric values to the normalized boundary.
- Invoice query-hook mock honors `enabled:false` and cannot fabricate data for other subscription leaves.
- Plans forbidden-pattern heading corrected. Local module documentation updated.
- `ISSUE-031` is open due to the 18-file sprint cap (atomic constants rename plus many importers); `ISSUE-043` remains a host-contract ownership conflict, `ISSUE-045` lacks detailed issue evidence. Previously open `ISSUE-038`, `ISSUE-025`, `ISSUE-027` remain open.
- Host `npm` dependencies, integrated TypeScript/Next.js build, Vitest/RTL, Playwright/browser, backend and assistive-technology execution: `DEFERRED_TO_HOST_RUNTIME`. **Only source parsing and controlled transpiled helper/mock callbacks actually executed.**

## 2. v51 RBG 5 Evidence

- `audit_evidence/ADMIN_V51_RBG5_CLOSURE_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG5_SOURCE_FILE_MANIFEST.csv`
- `audit_evidence/ADMIN_V51_RBG5_AUTONOMOUS_SUBMODULE_PHYSICAL_LEDGER.csv`
- `audit_evidence/ADMIN_V51_RBG5_STATIC_VALIDATION.json`
- `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md`
- `RE_AUDIT_CHECKLIST_RESULT.md` and `FINAL_REPAIR_REPORT.md`

---

# Admin v51 RBG4 — Incremental Integration and Changelog

**Status:** `frontend-admin-v51-PARTIAL-rbg4.zip`; RBG1–4 source checkpoints, not a final role release. **RBG5–24 pending.** `ISSUE-025/027`, `ISSUE-038`, recurring type/toast items and host runtime verification remain open. Previous integration guidance follows unchanged as historical context.

## Section 1 — RBG4 Changelog

- Coupons: fix browser URL/history default restoration with controlled hydration; add regression test.
- Coupons: validate canonical date-only API DTO and form fields locally without UTC midnight round-trip; add timezone and malformed-date tests.
- Coupons: use decimal-safe amount precision rather than binary floating-point times 100.
- Coupons: correct create-mutation test payload and enum fixtures; canonicalize two confirmation type files and full names; align unsaved-changes hook name/test imports.
- Coupons: mount local confirm context in route and harness; add accessible loading status.
- Plans Catalog: correct host-import portability documentation from actual source and identify unmerged generic UI copies as open ownership/architecture review.
- Delta: 14 modified, 4 new, 2 old type paths renamed; 65/65 targeted static/pure-function checks passed. Full build/semantic typecheck/test/browser not executed.

## Host verification commands

```bash
npm ci
npx tsc --noEmit
npm run lint
npx vitest run src/app/frontend_admin/admin_billing/billing_coupons_management/tests
npx playwright test playwright_E2E
npm run build
```

> **Current deliverable: v51 PARTIAL-rbg3.** RBG1 and RBG2 code and evidence remain retained, RBG3 nine issue families patched within 18-file cap. ISSUE-038 external currency contract remains open; ISSUE-010/016 recurring billing instances are not closed role-wide. RBG4–24 not started. Build/Vitest/Playwright/browser require host execution. `FINAL_REPAIR_REPORT.md` and `RE_AUDIT_CHECKLIST_RESULT.md` are the current status; earlier v50 text is archival, not current certification.

## v51 RBG 3 Changelog

- Fixed Reports error fallback component name, its 44px return link, and date-fns-only forbidden documentation.
- Expanded Reports calendar month controls and day targets to 44x44 CSS px with scroll-safe narrow layout and source tests.
- Separated `attendance_reports` and `attendance_dashboard` TanStack Query cache prefixes, including previously identical branch-reference key.
- Corrected Reports export translation lookups to existing EN/HI keys and added accessible localized route-loading status.
- Reconciled Reports mock branch selector to the three fixture-backed gyms, with scoped data regression coverage; production IDs remain unverified.
- Enforced explicit toast dispatch IDs in Reports with no message-derived fallback, plus dedup regression test; other billing occurrences deferred to their own RBGs.
- Reject Reports success-envelope `null`/`undefined` payloads while preserving legal falsy values; wrote guard tests.
- Added 300ms Coupon query debounce preserving immediate input/store value, with Vitest fake-timer test authored.
- 17 modified files, 1 new test; 114/114 targeted source and compiled-function assertions passed. Full Vitest, Next.js integration/build, and browser a11y not executed.

# Admin Frontend v51 — Partial RBG 1 Integration Addendum

> **Authoritative v51 status:** `frontend-admin-v51-PARTIAL-rbg1.zip` is **NOT** an all-groups release. Only the user-approved billing RBG 1 scope was changed. RBG 2–24 remain unapproved/unexecuted. `ISSUE-038` remains blocked by an externally verified currency-code contract. The historical v50 guide below is retained as prior-release narrative, not current v51 closure evidence; its references to missing V50 audit archives are not claimed as packaged here.

## v51 RBG 2 release delta

- ISSUE-001: present v51 evidence is physically packaged; stale v50 evidence references below are historical only.
- ISSUE-002: Attendance feature state map identifies both physical leaf-owned stores.
- ISSUE-003: archived as `frontend-admin-v51-PARTIAL-rbg2.zip` until every RBG is verified closed.
- ISSUE-004–009: Attendance accessibility, chart theme, URL pagination, neutral trends, localized loading, and canonical display-value import updated. See leaf feature contract.
- Host-global `@/lib/display_value` behavior, theme mapping, and integrated Next.js/Vitest/Playwright testing: `NOT_VERIFIED_IN_SCOPE` / `DEFERRED_TO_HOST_RUNTIME`.

## 1. Changelog — v51 RBG 1

- Fixed the Plans precision validator to accept valid two-decimal entered values without IEEE-754 exact-integer comparisons; added five-field valid/invalid price regression vectors.
- Preserved optional `priceCustom` in in-memory Plan mock create and update responses, with MSW regression cases and a separately executed transpiled-handler check.
- Corrected the plan modal's `__i18n:` message marker extraction, added `plans.validation.maxTwoDecimals` in both English and Hindi locale files, and removed the brittle hardcoded `requestId` expectation.
- Wired each of Plans Catalog and Subscription Invoices canonical routes and isolated test harnesses to their own existing feature-local confirmation provider; added provider resolve/cancel regression tests, retaining all confirmation UI and existing hooks.
- Removed the duplicate PDF safety-import binding in Subscription Invoices while keeping the guarded download control.
- `ISSUE-038` remains open: Plans/Invoice DTOs do not verify the ISO-4217 identity and existing safe `—` fallback remains. No currency fabricated.
- Source-preservation check: exactly 14 original files modified and two additional co-located tests created. All 3,025 other original files retained byte-for-byte. Original archive unchanged.

## 2. Host integration & verification

Copy `frontend_admin/` into the corresponding host `src/app/frontend_admin/`, retaining its canonical paths and existing integration contracts. Use the host package manager and the host's npm scripts (`npm ci`, `npx tsc --noEmit`, lint, Vitest/RTL, Playwright, and build). The source ZIP omits root `package.json`, lockfile, Next.js config, global theme stylesheet, and host auth runtime; no build, semantic typecheck, authenticated browser, or live backend behavior is claimed verified. See `RE_AUDIT_CHECKLIST_RESULT.md` and `audit_evidence/` for exact statuses.

**Evidence in this v51 ZIP:** `audit_evidence/ADMIN_V51_PRE_DELIVERY_CROSSCHECK.md`, `ADMIN_V51_RBG1_CLOSURE_LEDGER.csv`, `ADMIN_V51_PHYSICAL_SUBMODULE_LEDGER.csv`, `ADMIN_V51_CANONICAL_RULES_VERIFICATION_SWEEP.csv`, `ADMIN_V51_RBG1_SOURCE_FILE_MANIFEST.csv`, `ADMIN_V51_RBG1_STATIC_VALIDATION.json` and `RE_AUDIT_CHECKLIST_RESULT.md`. Historical `ADMIN_V50_*` paths described below were not present in the supplied v50 archive and are not invented.

---

# Admin Frontend Integration Guide — Admin v50 Final Repair Release

> **Current status (2026-10-29):** All 15 repair RBGs have been executed (RBGs 12–14 perform baseline-preservation cleanup and RBG 15 cleans stale docs references). The 41 original supplied-audit findings and three additional confirmed source-level issue families are repaired. Static source checks pass for all 44 business leaves. This is a final repair release for the supplied scope, not a claim that every broad checklist rule has been verified: 146 checklist items remain `NOT_VERIFIED`, host/runtime checks are deferred, and ISSUE-006/ISSUE-007 require authoritative external contracts.

## 1. Changelog

- **RBG 10 — reports catalog physical compliance:** added the required fixture/scenario/handler structure, completed isolated host-stub declarations, and added regression assertions. The MSW handler registry remains intentionally empty because the feature contract forbids backend calls; no endpoint or payload was invented.
- **RBG 11 — billing feature isolation:** removed four imports from `admin_navigation/hooks/useAdminNavigationLayoutDialogAccessibility`. Three feature-local dialog accessibility hooks now serve the four modal consumers in subscription invoices, coupons management, and plans catalog.
- **RBGs 12–14 — preservation cleanup:** restored all 38 canonical URL configs to exact v48 bytes plus only the expected `ADMIN_DASHBOARD_URL` fallback export where absent; 4 configs with pre-existing fallback remain byte-identical.
- **RBG 15 — documentation consistency:** updated three domain-level feature docs to remove references to deleted duplicate shell URL-config files; final source/docs scan finds zero stale mentions.
- **RBGs 1–9 — supplied audit repairs:** removed 38 duplicate shell URL-config files and rewired 48 importer files; added two missing pass-through domain layouts while preserving original redirect pages byte-for-byte; moved both Branch P&L chart `/100` conversions into `formatCompactMinorUnitKPI` with locale regression assertions.
- **Audit classification:** requirements without item-specific evidence are marked `NOT_VERIFIED`, not as proven defects or passes. Runtime-only checks remain `DEFERRED_TO_HOST_RUNTIME`.

## 2. Business-domain ownership

| Primary domain | Leaf count | Responsibility boundary |
|---|---:|---|
| `admin_dashboard/` | 1 | Dashboard/landing overview |
| `admin_members/` | 2 | Members directory and blacklist |
| `admin_attendance/` | 2 | Attendance dashboard and Attendance reports |
| `admin_sales/` | 6 | Sales overview, memberships, store sales, membership reports, pending Sales payments |
| `admin_billing/` | 7 | Plans, coupons, subscriptions, invoices, payment methods, usage analytics |
| `admin_finance/` | 13 | Payments, expenses, summary, payouts, branch P&L, plan revenue, payroll, advances, dues, ledger and Finance reports |
| `admin_hr/` | 2 | Staff lifecycle and performance; Finance owns payroll/disbursement/advances/dues/ledger |
| `admin_gyms/` | 2 | Gym/branch directory and health alerts |
| `admin_communication/` | 3 | Notices/announcements, WhatsApp campaigns, notifications |
| `admin_security/` | 2 | Permissions and audit logs |
| `admin_reports/` | 1 | Read-only report catalog; no duplicate business APIs/state |
| `admin_data_export/` | 1 | Data export requests; lifecycle contract remains missing |
| `admin_settings/` | 1 | System settings; dedicated 2FA lifecycle remains contract-gated |

Total: **43 business leaves across 13 domains**, plus one header-linked profile leaf. `admin_navigation/` is role-owned shell infrastructure, not a business domain.

## 3. Source-level verification

- **Physical structure:** 44/44 leaf modules have the documentation trio, URL config, tests/harness, fixtures/handlers/scenarios, host stubs, and types.
- **Internal import resolution:** 3,816 `@/app/frontend_admin/*` imports checked; 0 unresolved internal targets and 0 cross-leaf imports.
- **URL-config family:** 38 duplicate `*shell.url_config.url_config.ts` files removed; all 48 original direct importer files point to canonical feature-local configs.
- **Domain layouts:** `admin_data_export/layout.tsx` and `admin_settings/layout.tsx` exist; both domain-root redirect pages are byte-identical to the v48 baseline.
- **P&L chart:** both previous raw `/100` operations use `formatCompactMinorUnitKPI`; the chart component has zero raw `/100` expressions. Currency identity remains unguessed.
- **Syntax parse:** TypeScript `transpileModule` parsed 2,681 `.ts/.tsx` files with zero syntax diagnostics (declaration files excluded). This is not semantic typechecking.
- **JSON:** 92 JSON files parsed with zero errors.
- **Scoped quick scans:** zero style-like raw hex token matches, zero TSX files over 300 lines, zero `window.confirm`, direct local/session storage, or `dangerouslySetInnerHTML` matches.

## 4. Host integration boundary

This is an isolated role-module ZIP, not the complete host application. The host root `package.json`, `tsconfig.json`, Next.js configuration, dependency lockfile, global CSS token map, auth middleware, central API implementation, CI settings, installed test runner and authenticated browser state were not supplied. Integrate this role module into its matching host app before running the host-defined checks.

## 5. Runtime verification — deferred

The following have **not** been claimed as passing: semantic `tsc --noEmit`, lint/format, Vitest/React Testing Library, production build, authenticated Playwright, interactive keyboard/screen-reader/responsive browser validation, and live API/auth/tenant/socket behavior. These are `DEFERRED_TO_HOST_RUNTIME` or `OUTSIDE_SUPPLIED_SCOPE` until run in the host repository.

## 6. External contract gates — do not guess

| Finding | Status | Disposition |
|---|---|---|
| ISSUE-006 — Data Export async flow | `EXTERNAL_PRODUCT_DECISION_BLOCKED` | No endpoint, response fields, job states, secure-download behavior or expiry policy invented. |
| ISSUE-007 — Branch P&L currency identity | `CONTRACT_MISSING / EXTERNAL_PRODUCT_DECISION_BLOCKED` | No INR or locale-based currency inference; safe en-dash fallback remains until an authoritative ISO currency source is supplied. |

## 7. Evidence index

- `FINAL_REPAIR_REPORT.md` — concise release summary and unresolved items.
- `RE_AUDIT_CHECKLIST_RESULT.md` — all 181 checklist IDs, source lines, statuses and evidence.
- `audit_evidence/ADMIN_V50_PRE_DELIVERY_CROSSCHECK.md` — the three mandatory physical cross-check tables.
- `audit_evidence/ADMIN_V50_RBG_CLOSURE_LEDGER.csv` — RBG 1–11 closure ledger.
- `audit_evidence/ADMIN_V50_CANONICAL_RULES_VERIFICATION_SWEEP.csv` — 181-item status/evidence ledger.
- `audit_evidence/ADMIN_V50_PHYSICAL_STRUCTURE_LEDGER.csv` — per-leaf physical inventory.
- `audit_evidence/ADMIN_V50_FINAL_STATIC_AUDIT.json` — machine-readable static checks and status counts.
- `audit_evidence/ADMIN_V50_CROSS_LEAF_IMPORT_SCAN.json` — import resolution/isolation scan.
- `audit_evidence/ADMIN_V50_CHANGED_PATHS.json` — RBG 10/11 changed-path lists.
- `audit_evidence/ADMIN_V50_FINDINGS_RESOLUTION.csv` — repaired findings and preserved contract blockers.
- `audit_evidence/ADMIN_V50_SOURCE_FILE_MANIFEST.csv` — SHA-256 manifest excluding itself by design.

## Delivery status

`SOURCE_REPAIRS_COMPLETE_WITH_NOT_VERIFIED_RULES_AND_RUNTIME_DEFERRED`

All confirmed source-level fixes in the supplied scope are applied. The ZIP is a final repair release, but not an assertion of full application compliance: broad checklist requirements remain `NOT_VERIFIED`, host/runtime checks remain deferred, and ISSUE-006/ISSUE-007 require authoritative contracts.

## RBG 14 Changelog — partial source repair checkpoint

- Payroll month switching resets list pagination to page 1 while keeping other URL filters.
- Branch P&L period/status use the URL as the single source of truth, with keyboard-observable period selected state.
- Revenue/Payroll/P&L report branch options show loading/error/retry, and missing branch response data is an error, not an empty list.
- Three report feature docs now distinguish sourced security from unverified backend permissions and explicitly record undated fixture limitations.
- Four RTL/Vitest regression test files were authored/updated (including existing P&L logic test); tests were not run.
- Host tasks: install approved dependencies; run `npx tsc --noEmit`, Vitest, Next build, Playwright keyboard/AT checks and authenticated API permissions; supply dated report fixtures for `ISSUE-132`.
- **Delivery:** `frontend-admin-v51-PARTIAL-rbg14.zip` only; prior release-style statements in inherited documents do not constitute completion of all 24 RBGs.


## RBG 21–23 changelog / integration notes (2026-11-01)
- Reports and Sales harnesses now merge explicitly verified Admin host localization namespaces for standalone tests.
- Permissions and Settings routes and harnesses mount feature-local confirmation providers; host root confirmation provider remains separate. Validate route-level React integration in the target host.
- Settings HTTPS-only store links, payment confirmation and role-query errors need Vitest + Playwright verification before release.
- The authoritative Permissions role-default endpoint and self-permission enforcement contracts are not supplied. Do not deploy these workflows as fully certified.


## RBG24 integration notes

- New local `utils/AdminSettingsManagementResolveTab.ts` is imported by Settings Nav and Content; no new external dependency.
- Back/Forward guard relies on the feature's existing confirm provider; run browser-router integration before deployment.
- Flat Settings validation field mapping rejects unrendered nested paths. Server generic failure feedback still flows through Settings mutation toast handling.
- Read-only 2FA status remains intact; no backend enrollment changes.
- Run host TypeScript, Vitest, Playwright, accessibility and permissions/currency API checks before a release decision.
- `OUTSTANDING_FINDINGS_RECONCILIATION.md` is mandatory reading; this ZIP is PARTIAL.

## RBG 28–30 — Post-24 source correction checkpoint
- RBG 28: isolated ownership of Attendance Reports and Sales Membership Growth URL configs; removed only two import-unreferenced duplicate shell constants; preserved all verified URL values and routes. Related Sales error boundaries use exact numeric 403 status and touch-safe return links.
- RBG 29: HR Staff KPI values now format in the active UI locale; error panel no longer exposes raw backend exceptions; selected HR/Finance route error boundaries now classify forbidden by numeric HTTP status rather than message text.
- RBG 30: remaining confirmed route error boundaries have strict status-only classification and 44px return links; one module-local regression test was authored.
- No existing user-visible feature, API endpoint, or business flow was removed. Only the two proven-unimported duplicate shell config files were deleted, with canonical configs retained.
- Runtime-dependent checks (`tsc --noEmit` with host libraries, Vitest/RTL, Next build, Playwright/AT, backend RBAC) remain `DEFERRED_TO_HOST_RUNTIME`. Tests authored are not asserted as executed.
- External blocked contracts remain: ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230, among other open records. Historical 207 issue IDs and 181 rule-sweep verdicts are preserved without promotion.


## RBG 43–45 checkpoint — 2026-11-01

# Admin Frontend v51 — RBG 43–45 Source Repair Checkpoint (2026-11-01)

## Section 1 — Changelog

- **RBG 43 — Plans Catalog**: The Plans create/update request idempotency key now binds to its normalized Plan payload signature. Identical retries keep the same key; changing price/tier/features rotates the key; successful mutations and explicit modal abandonment still clear the same base intent registry. Existing API endpoints and business flows remain unchanged.
- **RBG 44 — Subscription Plans**: Auto-renew on/off now use distinct client intent IDs; on success the exactly submitted direction's key is cleared. The server-facing `toggleAutoRenew(idempotencyKey)` contract remains unchanged. Added module-local utility and regression tests.
- **RBG 45 — Subscription Payment Methods**: The same independent, module-local correction with the WET isolation rule. No cross-submodule runtime imports were added.


Detailed evidence: `RBG43_45_REPAIR_REPORT.md` and `audit_evidence/ADMIN_V51_RBG43_45_*`. Full host tests and the four external blockers remain open; this archive is PARTIAL.


## RBG 46–48 — Section 1 Changelog Addendum
- Audit Logs errors now show localizable generic error content while preserving retries and contract-blocked export status.
- Blacklist and Finance mocks use UUID-based new record IDs and reject invalid page/limit parameters.
- New regression source tests are included but host Vitest, tsc and E2E remain unexecuted.
- Four authoritative backend contracts remain unresolved.


## RBG 46–48 — Section 1 Changelog Addendum
- Audit Logs errors now show localizable generic error content while preserving retries and contract-blocked export status.
- Blacklist and Finance mocks use UUID-based new record IDs and reject invalid page/limit parameters.
- New regression source tests are included but host Vitest, tsc and E2E remain unexecuted.
- Four authoritative backend contracts remain unresolved.

## RBG 58–60 (PARTIAL) integration note

Use the latest archive only as the cumulative role-module candidate. It adds bilingual safe retry feedback for Billing, Communication, Attendance and Sales, plus a branch-detail fallback and Sales Memberships debounce symbol repair. Ensure the host next-intl EN/HI namespace aggregator merges module-local `AdminRepair` keys in `subscriptions`, `notifications`, `announcements`, `attendance`, and `sales`. A full host-level language-provider test remains required. Do not connect to guessed Health Alerts or Permissions endpoints. Real hosted API, RBAC, semantic typecheck and browser tests must precede release. Detailed evidence: `RBG58_60_REPAIR_REPORT.md`.

## RBG 58–60 (PARTIAL) integration note

Use the latest archive only as the cumulative role-module candidate. It adds bilingual safe retry feedback for Billing, Communication, Attendance and Sales, plus a branch-detail fallback and Sales Memberships debounce symbol repair. Ensure the host next-intl EN/HI namespace aggregator merges module-local `AdminRepair` keys in `subscriptions`, `notifications`, `announcements`, `attendance`, and `sales`. A full host-level language-provider test remains required. Do not connect to guessed Health Alerts or Permissions endpoints. Real hosted API, RBAC, semantic typecheck and browser tests must precede release. Detailed evidence: `RBG58_60_REPAIR_REPORT.md`.



## RBG61–63 integration delta — PARTIAL

Integrate this cumulative source tree over the prior RBG60 role tree; do not selectively replace one autonomous leaf's URL/translation/contracts with a sibling's implementation. RBG61 makes HR status idempotency direction-dependent and missing join-date retries stable, replacing raw mutation error toasts with existing localized generic messages. RBG62 normalizes independent Finance read-query URL pagination, category filters and error panels. RBG63 changes only Billing/Finance mock pagination fallback. No backend endpoint/envelope has been introduced. Run full host `tsc --noEmit`, Vitest/RTL, Next build, Playwright, screen reader and authenticated backend/RBAC tests once real application host and API are available. Contract approvals for ISSUE-038, ISSUE-182, ISSUE-229 and ISSUE-230 remain required.


## RBG64–66 cumulative integration addendum — PARTIAL

Integrate all RBG64–66 edits as one cumulative module-isolated source tree. Seven mock HTTP handlers now reject malformed page and limit values before slicing; four URL-sync hooks reject invalid page values before changing store state. The new pure pagination helpers are **owned by their respective autonomous leaves**, not shared across leaf boundaries. The API URLs and existing response envelopes are unchanged. A normalizer only protects frontend mocks or URL-sync, never substitutes backend request validation. Run actual host `tsc --noEmit`, Vitest/MSW, React Testing Library, Next production build, Playwright and authenticated RBAC once host dependencies and backend test environment are available. Backend authority for ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230 is still required.

## RBG 67–69 host integration checklist

Run the new 11 `*MockPagination.test.ts` / `*UrlPage.test.ts` test files via the host Vitest configuration, along with all prior suites. Verify malformed `page`/`limit` inputs in browser history navigation, MSW routes, and paginated API query parameters; then run semantic tsc, lint, Next.js build, Playwright, WCAG and authenticated RBAC checks. The frontend-only page cap of 100000 and mock-only limit cap of 100 are not backend API contract assertions. Four authoritative backend contract blockers remain open.

## RBG 67–69 host integration checklist

Run the new 11 `*MockPagination.test.ts` / `*UrlPage.test.ts` test files via the host Vitest configuration, along with all prior suites. Verify malformed `page`/`limit` inputs in browser history navigation, MSW routes, and paginated API query parameters; then run semantic tsc, lint, Next.js build, Playwright, WCAG and authenticated RBAC checks. The frontend-only page cap of 100000 and mock-only limit cap of 100 are not backend API contract assertions. Four authoritative backend contract blockers remain open.


## RBG70–72 integration delta (PARTIAL)
- Bring forward the Invoice and Subscription Overview auto-renew direction-specific idempotency actions and tests together. **Do not** change the existing verified toggle endpoint into set-on/off without backend confirmation. Validate server deduplication/atomicity, concurrent tabs and stale subscription state under authenticated integration.
- Keep new page parsing utilities module-local. Validate Invoice and Sales Pending Payments browser URL input, pagination controls and history navigation with the host router.
- Required host gates remain semantic tsc, lint, Vitest/RTL, Next.js build, Playwright, keyboard/WCAG and tenant/RBAC backend tests. None are certified here.


## RBG70–72 integration delta (PARTIAL)
- Bring forward the Invoice and Subscription Overview auto-renew direction-specific idempotency actions and tests together. **Do not** change the existing verified toggle endpoint into set-on/off without backend confirmation. Validate server deduplication/atomicity, concurrent tabs and stale subscription state under authenticated integration.
- Keep new page parsing utilities module-local. Validate Invoice and Sales Pending Payments browser URL input, pagination controls and history navigation with the host router.
- Required host gates remain semantic tsc, lint, Vitest/RTL, Next.js build, Playwright, keyboard/WCAG and tenant/RBAC backend tests. None are certified here.


## RBG 73–75 integration delta — PARTIAL
- Preserve module-owned page parsing utilities alongside Announcements and Subscription Invoices MSW/URL callers, and run official MSW/React/URL history tests.
- Ensure Finance Payroll minor-unit balance validation is exercised with authoritative server rejection of stale/overlapping payments. Confirm server-side idempotency and access controls before enabling real disbursements.
- Required gates: approved host dependencies, full `tsc --noEmit`, lint, full `vitest run`, `npm run build`, Playwright, accessibility and authenticated RBAC/tenant tests. No host completion claimed here.


## RBG 76–78 integration delta — PARTIAL
- Include the three new module-local URL page helpers and strict Zustand page setter guards. Run official browser history/query synchronization tests in host.
- Check server-side pagination, rate limits, tenant isolation, and 4 open authoritative contract issues.
- Full host typecheck, Vitest, production build, Playwright, accessibility and RBAC checks required before release.


## RBG 79–81 integration delta — PARTIAL
- Include module-local pin/coupon/blacklist action-intent helpers; run official Vitest/RTL test bodies and accessible live error states in verified host.
- Test coupon local-day actions across UTC boundaries against backend-approved expiry timezone.
- Test actual backend toggle retry/replay semantics and server-side permissions for member/announcement/coupon toggles; do not infer from frontend keys.
- Run full host `tsc --noEmit`, Vitest/RTL, Next.js production build, Playwright, WCAG and authenticated RBAC tests before release.


## RBG 82–84 integration delta — PARTIAL
- Run the authored Members Directory, Audit Logs and Finance P&L CSV regression tests via official host Vitest/RTL. Verify imports and executable CSV content in an approved spreadsheet application.
- Validate server-generated CSV/Blob contract and field-level data authorization against authenticated backend evidence; the mock Audit CSV change does not enable production binary export.
- Confirm host frontend integration and full typecheck/build/Playwright/WCAG/tenant-RBAC tests before release.


## RBG85–87 integration note
Sales Overview now uses its owning CSV encoder at both entrypoints. Attendance, Growth, Revenue, Payroll and P&L report downloads require host Blob binary transport and real browser validation. No API endpoint or DTO contract was modified. All issues listed in RBG85_87_REPAIR_REPORT remain pending where external evidence is required.


## RBG88–90 — export/download host integration note
The three autonomous download helpers require a browser DOM supporting Blob and URL.createObjectURL/revokeObjectURL. Audit Logs binary API export remains contract blocked by its original source. Finance Branch P&L preserves deferred revocation on the success path. Sales and Audit Logs revoke after click. All three browser download paths need real browser tests; the included module-local tests are not evidence of Next.js production integration. Preserve the feature-local EN/HI translation registries when installing these leaves. No endpoint or DTO changes.


## RBG91–93 host integration addendum
Run the official semantic application `tsc --noEmit`, approved Vitest/RTL suite, Next.js production build and Playwright tests on the verified host. For Members, test browser Blob/DOM click refusal and false-success suppression in both locales; for Branch P&L CSV, inspect Excel/LibreOffice behavior with signed numeric amounts and formula-like strings; for Settings, validate app-store URLs with and without userinfo through real Zod forms and rendered navigation. No new backend endpoints or DTO changes; unresolved ISSUE-038/182/229/230 require signed-off API/security owner evidence.

## RBG 94–96 verification extension

After integrating into the approved Next.js host, run the application semantic typecheck, official Vitest/RTL tests, Next.js build, Playwright browser suites and authenticated backend tests. In both invoice leaves, verify that valid same-origin PDF paths open and encoded dot/slash paths are disabled. In Sales Pending Payments, verify a 10-digit Indian recipient and `+91` input produce the same `wa.me/91...` destination, invalid numbers disable the reminder with translated accessible name, and no popup is opened for an invalid destination. Obtain product approval before international-country support. Do not mark ISSUE-038/182/229/230 closed without owners' contracts.


## RBG97–99 — Host integration acceptance
Mount the existing Settings/Campaigns/Sales leaf components in the real App Router host. Execute `npx tsc --noEmit`, official `npx vitest run`, `npm run build`, `npx playwright test` with authenticated backend test fixtures. Verify malformed phone configuration disables contact anchors, `window.open`/`location.replace`/`close` exception behavior keeps recipient QUEUED, and invalid Sales membership expiry renders neutral unknown rather than expired. Resolve the four external contract issues with backend owner sign-off before release.

## RBG 100–102 mock financial mutation verification

Use the approved host dependency tree to execute the new leaf-local Vitest+MSW suites for Payroll, Salary Advance and Staff Dues, then run semantic tsc, official full Vitest/RTL, Next.js production build and Playwright. Confirm real authenticated backends independently enforce amount bounds, staff ownership, idempotency, authorization and concurrent balance updates. Mock-only response validation does not establish backend safety. Retain unresolved ISSUE-038/182/229/230 as OPEN until owner contracts are supplied.

## RBG 100–102 mock financial mutation verification

Use the approved host dependency tree to execute the new leaf-local Vitest+MSW suites for Payroll, Salary Advance and Staff Dues, then run semantic tsc, official full Vitest/RTL, Next.js production build and Playwright. Confirm real authenticated backends independently enforce amount bounds, staff ownership, idempotency, authorization and concurrent balance updates. Mock-only response validation does not establish backend safety. Retain unresolved ISSUE-038/182/229/230 as OPEN until owner contracts are supplied.

## RBG 103–105 host integration steps

Run the three newly added autonomous-module Vitest files using the approved host dependency tree; verify the coupon/HR form and mutation boundaries with React Testing Library, and the Members Directory MSW summary/list routes with full Vitest. Run full host semantic tsc, Next.js production build, Playwright and authenticated RBAC/data tests. Confirm external contract decisions for currency, Health Alerts and Permissions before calling this ZIP production-ready. Coupon/HR numeric and date boundaries are source-level only.


## RBG106 — Sales Memberships ISO expiry integration acceptance

- Mount the standalone Sales Memberships leaf under the approved host; run its authored `tests/utils/AdminSalesMembershipsFormatters.test.ts`, `tests/components/AdminSalesMembershipsInvalidExpiryDisplay.test.tsx`, and `tests/mocks/AdminSalesMembershipsInvalidCivilExpiryMock.test.ts` under the real Vitest + MSW + RTL dependency tree.
- Check impossible expiry dates display neutral unknown (not expired or expiring), valid leap/timestamp dates preserve full 24-hour math, and actual authenticated backend classifies date-only expiry consistently with the approved product timezone. No API/DTO or design-token change was authorized by RBG106.
- Run official host full semantic tsc, Vitest, Next build, Playwright, WCAG/AT, and authenticated backend/RBAC checks. Keep ISSUE-038/182/229/230 OPEN until authoritative contracts and enforcement evidence exist.


## RBG 107 — Membership Growth custom calendar integration

- Mount `sales_membership_growth_report` at the existing canonical Admin Sales route. Preserve approved URL parameters `range=custom`, `startDate`, `endDate` and API response/data query contract.
- Under the real host dependencies, run the leaf’s `tests/AdminSalesMembershipGrowthReportDateRangePicker.test.tsx` and `tests/AdminSalesMembershipGrowthReportDateRangeUtils.test.ts`; verify next/previous month buttons, cross-month arrow focus, Home/End and PageUp/Down, month-end leap clamping, rapid two-date selection, invalid date reporting, Escape/focus return and screen-reader announcements.
- Run `playwright_E2E/frontend_admin_e2e/admin_sales/sales_membership_growth_report_calendar.spec.ts` with a real Admin session via `PLAYWRIGHT_AUTH_STATE`, and real `PLAYWRIGHT_BASE_URL`; do not synthesize privileged credentials.
- Run full host-installed `tsc --noEmit`, Vitest/RTL, Next build, browser accessibility/AT and backend/RBAC verification. Keep ISSUE-038, ISSUE-182, ISSUE-229 and ISSUE-230 open pending authoritative evidence. The controlled local checks used stubs and are not release certification.

## RBG108 — Pending Payments host integration acceptance

- Mount the existing canonical `admin_sales/sales_pending_payments` route and run the authored leaf tests `AdminSalesPendingPaymentsDateFilterDropdown.test.tsx`, `AdminSalesPendingPaymentsSearchableDropdown.test.tsx`, `mocks/AdminSalesPendingPaymentsMockSearchWhitespace.test.ts`, and the extended `hooks/useAdminSalesPendingPaymentsLogic.test.ts` using real React, date-fns, MSW and Vitest/RTL dependencies.
- Verify two rapid date edits preserve both start/end dates, malformed manual URL dates are communicated accessibly, combobox Home/End and focus/scroll work, and successful out-of-range pages recover without redirecting on pending/error. Run `playwright_E2E/frontend_admin_e2e/admin_sales/sales_pending_payments_accessibility.spec.ts` with `PLAYWRIGHT_AUTH_STATE` against the real host.
- Run full host `tsc --noEmit`, Vitest, Next build, authenticated Playwright, WCAG/AT, backend and RBAC checks. Do not treat the controlled transpiled source harness or temporary type stubs as host certification. Four external decisions ISSUE-038/182/229/230 remain open.

## RBG109 — Store Sales host acceptance

Mount the existing canonical `admin_sales/sales_store_sales` route in the authenticated Next.js Admin host and run newly authored `AdminSalesStoreSalesDateFilterDropdown.test.tsx`, `AdminSalesStoreSalesSearchableDropdown.test.tsx`, `mocks/AdminSalesStoreSalesMockSearchWhitespace.test.ts`, and extended `hooks/useAdminSalesStoreSalesLogic.test.ts` with real React/date-fns/MSW/Vitest. Verify rapid date changes preserve both boundaries, malformed custom dates are announced, combobox focus and scrolling work, and verified successful page recovery does not redirect on pending/error. Run `playwright_E2E/frontend_admin_e2e/admin_sales/sales_store_sales_date_accessibility.spec.ts` with authenticated host state. Perform full Next build, host TypeScript, real accessibility and RBAC. Four historical contract blockers remain open.

## RBG110 — Sales Overview host acceptance

Mount the existing canonical `admin_sales/sales_overview` leaf in the real authenticated Next.js host. Run added `AdminSalesOverviewDateFilterDropdown.test.tsx`, `AdminSalesOverviewSearchableDropdown.test.tsx`, `AdminSalesOverviewChartAndExportStates.test.tsx` in the official RTL/Vitest environment. Run host-only Playwright `sales_overview_date_and_empty.spec.ts` with valid auth and server fixtures. Verify real branch query preservation under concurrent date edits, focus/scroll behavior, blocked/empty chart states, and disabled CSV action on unverified data. Run full Next build, semantic typecheck, screen-reader audit, RBAC, and backend contract checks. Clarify the unsupported overview `search` URL before any implementation. Four external blockers remain open.

## RBG111 — Sales Membership Report host acceptance

Mount the canonical `admin_sales/sales_membership_report` leaf in the authenticated Next.js host. Execute `AdminSalesMembershipReportDateFilterDropdown.test.tsx`, `AdminSalesMembershipReportSearchableDropdown.test.tsx`, `AdminSalesMembershipReportSortSemantics.test.tsx`, and `tests/utils/AdminSalesMembershipReportSortRows.test.ts` in the real Vitest/RTL environment. Execute `playwright_E2E/frontend_admin_e2e/admin_sales/sales_membership_report_date_and_sort.spec.ts` with valid authenticated state, seed fixtures, and browser. Check rapid URL edits, invalid civil date messages, keyboard focus/scroll, and table header sorting in real browser. Run full semantic typecheck, production build, screen-reader/WCAG checks and API/RBAC/tenant verification. Open historical blockers remain.

## RBG112 — Finance Revenue Report host acceptance

Mount canonical `frontend_admin/admin_finance/finance_revenue_report` leaf in authenticated Next.js host. Run existing DateRangePicker/DateRangeUtils tests and new `AdminFinanceRevenueReportCalendarNavigationRBG112.test.tsx`, `AdminFinanceRevenueReportSearchableDropdownRBG112.test.tsx`, `AdminFinanceRevenueReportDateFilterRBG112.test.tsx`, `AdminFinanceRevenueReportProgressLocaleRBG112.test.tsx` with real Vitest/RTL, real date-fns and locale provider. Run host-only `playwright_E2E/frontend_admin_e2e/admin_finance/finance_revenue_report_calendar_rbg112.spec.ts` in authenticated real browser. Check date and navigation race, keyboard focus, locale percentage geometry, full Next.js build, real WCAG/screen reader, live API/RBAC. Historical external blockers persist.

## RBG113 checkpoint — Finance Summary (INTEGRATION_GUIDE.md)

# Admin Frontend v51 — RBG113 scoped source repair

**DELIVERY: PARTIAL — NOT PRODUCTION CERTIFIED.** Exact baseline `frontend-admin-v51-PARTIAL-rbg112.zip` SHA-256 `be0b26ca61d97e4755ffb91cb1ee045d70c6b6c88998e03fe243d0a5337a0fe9`. Ownership limited to `frontend_admin/admin_finance/finance_summary/`. No API or permissions contract modifications; sibling modules preserved byte-identically.

## Thirteen source-backed findings addressed

1. **RBG113-FIN-DATE-SNAPSHOT** — Consecutive custom date changes use a stale searchParams snapshot. **Source correction:** Stage pending URL changes until router snapshot catches up.
2. **RBG113-FIN-DATE-PAGE** — Switching date periods leaves stale pagination active. **Source correction:** Remove the payments page parameter when date range changes.
3. **RBG113-FIN-DATE-BOUND** — An impossible date may become the other input’s native min/max constraint. **Source correction:** Set native boundaries only with validated civil-date keys.
4. **RBG113-FIN-DATE-ARIA** — Error aria-invalid is tied only to reversed lexical order, not missing/impossible dates. **Source correction:** Reflect validated custom-range status in both input aria-invalid values and live status.
5. **RBG113-FIN-DATE-YEAR** — new Date(year,..) misclassifies canonical year 0042 by remapping to 1942. **Source correction:** Validate with setFullYear avoiding year-0..99 remapping, reject year 0000.
6. **RBG113-FIN-DATE-FORMAT** — Date keys with civil year below 0100 are emitted without four digits. **Source correction:** Pad year to four canonical digits in date-key formatter.
7. **RBG113-FIN-DATE-PRESET** — Preset construction remaps civil years 1..99 into 1900s. **Source correction:** Construct civil period endpoints with setFullYear instead of new Date(year,...).
8. **RBG113-FIN-COMBO-FOCUS** — Selecting from the combobox unmounts the focused input without returning focus. **Source correction:** Restore focus to trigger after selection.
9. **RBG113-FIN-COMBO-DISABLED** — Disabling the open selector can leave expanded aria state after hiding its list. **Source correction:** Close on disabled and match aria-expanded/aria-controls to visible popover.
10. **RBG113-FIN-COMBO-SCROLL** — Active keyboard-selected options may remain below the scroll viewport. **Source correction:** Scroll active option into view after selection index changes.
11. **RBG113-FIN-COMBO-HOMEEND** — Combobox lacks Home/End keyboard navigation. **Source correction:** Add first/last option navigation with preventDefault.
12. **RBG113-FIN-MOCK-SEARCH** — Payment mock search retains leading/trailing request whitespace. **Source correction:** Trim case-folded search value before matching.
13. **RBG113-FIN-MOCK-METHOD** — Payment-method filtering normalizes separators differently for query and record fields. **Source correction:** Normalize spaces, underscores and hyphens consistently across method and paymentMode.

## Evidence and limitations

- 2958 TypeScript/TSX source files passed syntax parsing; 4123 direct local imports resolved.
- 43 controlled assertions executed **transpiled actual owner sources** using simplified React, Next, and MSW stand-ins. Covers consecutive date edits, civil-date validation, combobox keyboard/focus, and mock search normalization. This is not real React, MSW or browser integration verification.
- Scoped TypeScript with compile-only host stubs: PASS; stubs are located outside the ZIP. Full Next.js host semantic typecheck not performed.
- Four new co-located RTL/Vitest/MSW test specs and one Playwright spec: **AUTHORED, NOT EXECUTED.** Existing suite preserved.
- Baseline diff: 4 owner source files modified, 4 owner regression test files added, no source deletion; 3231 prior role paths byte-identical.
- All 44 autonomous leaf artifact sets preserved, along with 181 historical canonical rule records and 207 issue records. Physical preservation is not runtime verification.

## Remaining blockers and release gates

**RELEASE: PARTIAL, not production-certified.** Full Next.js build, real Vitest/RTL/MSW, authenticated Playwright and live accessibility, backend contracts and RBAC/tenant testing NOT EXECUTED. Historical ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230 still OPEN; Sales Overview search contract decision unresolved. Next checkpoint RBG114.

## RBG115 checkpoint — Finance Branch P&L

# Admin Frontend v51 — RBG115 scoped source repair

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Baseline `frontend-admin-v51-PARTIAL-rbg114.zip` SHA-256 `e9b9d442e39310dafc0aad8365771888926a229c20c5385bf49013de37956971`. Scope `frontend_admin/admin_finance/finance_branch_profit_and_loss/`. No host API endpoint, role permission, tenant policy, or sibling leaf altered.

## Source-backed findings addressed (12)

1. **RBG115-URL-RACE**: Rapid period and status updates use the same stale searchParams snapshot, dropping the earlier edit. **Fix:** Stage pending URL writes and merge subsequent edits.
2. **RBG115-URL-READ**: Before router acknowledgment, filter getters return outdated URL values. **Fix:** Get pending filter values from staged URL while router snapshot is unchanged.
3. **RBG115-URL-BACK**: Staged pending edits must not override external Back/Forward route navigation. **Fix:** Clear pending writes when an external router snapshot arrives.
4. **RBG115-URL-DUPLICATE**: Repeated selection can append duplicate history entries before navigation acknowledgment. **Fix:** Skip push when the staged URL already matches the selected filter.
5. **RBG115-MOCK-PERIOD**: Untrusted period reaches fixture lookup through a type assertion without runtime validation. **Fix:** Validate period against defined options with THIS_MONTH fallback.
6. **RBG115-MOCK-STATUS**: Unknown status filters silently produce an empty report instead of normalized default. **Fix:** Allowlist status against documented contract values.
7. **RBG115-MOCK-SORTKEY**: Untrusted sortKey allows arbitrary object property access during mock sorting. **Fix:** Allowlist declared sortable keys with netProfit fallback.
8. **RBG115-MOCK-SORTDIR**: Unrecognized sort direction silently falls into descending behavior without explicit normalization. **Fix:** Normalize sort direction to asc or desc.
9. **RBG115-EXPORT-PENDING**: Cached rows remain exportable while a reporting query is pending or refetching. **Fix:** Gate both export handler and visible enabled state on !isPending.
10. **RBG115-DISCLOSURE-ARIA**: Expandable branch button has aria-expanded but no programmatic relationship to details. **Fix:** Give expanded detail row a stable ID and connect aria-controls when expanded.
11. **RBG115-FOOTER-LOCALE**: Footer appends English-only es suffix to localized Hindi label and displays an unlocalized count. **Fix:** Use Intl.NumberFormat and translation-owned branch label with no appended English suffix.
12. **RBG115-CHART-LABELS**: Chart reduces branch labels to first two words, causing collisions between distinct branches. **Fix:** Use complete branch names in chart categories and legend labels.

## Executed checks and truthful limits

- **2966** TypeScript/TSX files parsed across the complete role source, with **4137** internal import resolutions checked.
- **48** controlled assertions executed against transpiled production components/hooks/handlers, using stand-ins for React, Next.js, MSW, Query and ApexCharts. No real host or browser execution is implied.
- **Scoped strict TypeScript:** PASS with compile-only stand-ins outside ZIP (7 owner source files + their imports); this does not mean the complete host TypeScript build passed.
- Four co-located Vitest/RTL/MSW regression tests and one Playwright spec **AUTHORED, NOT EXECUTED**.
- **Archive preservation:** 7 existing leaf files changed; 4 leaf tests added; 0 role files deleted; 3236 previous role paths byte-identical. All 44 autonomous module document sets physically present. All 181 original canonical-rule records and 207 original issue records retained without rewriting their statuses.

## Remaining dependencies

- Historical external contract blockers **ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230** remain unresolved.
- Sales Overview search API behavior and Plan Revenue currency identity remain unverified; no backend functionality or currency has been invented.
- Full host Next.js build, host TypeScript, official Vitest/RTL/MSW, authenticated Playwright, real accessibility verification and authenticated backend/RBAC/tenant checks are **NOT EXECUTED**.
- Next checkpoint **RBG116**; deliver only under `PARTIAL` naming until required production gates pass.

## RBG116 checkpoint — Finance Profit & Loss Report

# Admin Frontend v51 — RBG116 scoped source repair

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Baseline `frontend-admin-v51-PARTIAL-rbg115.zip` SHA-256 `14ecc24bf5d831d4f1db18445b3b2a6f7b39a3e6a1558d14a2f8bf4bf8c45bd5`. Scope `frontend_admin/admin_finance/finance_profit_and_loss_report/`. No host API endpoint, role permission, tenant policy, or sibling leaf altered. The payroll KPI in the mock remains a contract-dependent global value, not a verified branch-scoped metric.

## Source-backed findings addressed (13)

1. **RBG116-URL-RACE**: Two custom date edits start from a stale Next.js searchParams snapshot. **Fix:** Stage query writes and merge subsequent date selections before URL acknowledgment.
2. **RBG116-URL-DUPLICATE**: Unchanged range interactions dispatch unnecessary router replacements. **Fix:** Suppress redundant replace when staged query is unchanged.
3. **RBG116-URL-PAGE**: Changing report date while a page parameter is set can preserve stale pagination. **Fix:** Clear page only when date-range selection changes.
4. **RBG116-DATE-VALIDATION**: Date picker uses a separate raw JS Date parser instead of the validated report date key utility. **Fix:** Reuse the report date parsing/formatting utility including leap and historical-year checks.
5. **RBG116-CALENDAR-PENDING**: Rapid two-click date selections can reselect the start because parent props lag behind router writes. **Fix:** Stage first click locally and commit the correct inclusive range on second click.
6. **RBG116-CALENDAR-FOCUS**: Calendar focus work inside render-cycle listener effect and animation-frame lookup can miss the new month. **Fix:** Focus target day after the new month has rendered using a dedicated focus effect.
7. **RBG116-CALENDAR-KEYBOARD**: Calendar only handles arrow keys, omitting Home/End and month/year page navigation. **Fix:** Support Monday/Sunday Home/End and PageUp/PageDown with Shift year jump and day clamp.
8. **RBG116-CALENDAR-MONTH**: Month-arrow navigation can leave roving tabindex stranded on another month. **Fix:** Recenter focused date while retaining keyboard focus on the month arrow.
9. **RBG116-SELECTOR-FOCUS**: Selecting an option closes dropdown without restoring trigger focus. **Fix:** Return focus to the trigger after selection.
10. **RBG116-SELECTOR-NAV**: Searchable combobox supports arrows but not Home/End to reach bounds. **Fix:** Add Home/End active option handling.
11. **RBG116-SELECTOR-SCROLL**: Keyboard-active listbox option may be outside the scroll viewport. **Fix:** Scroll the active option into view when its index changes.
12. **RBG116-SELECTOR-DISABLE**: Dropdown can remain logically expanded when disabled while open. **Fix:** Close on disable and align aria-expanded/aria-controls with visible list.
13. **RBG116-MOCK-KPI**: Branch-scoped mock rows retain global revenue, expenses and net profit KPI totals. **Fix:** Recompute only these three verified financial sums from returned branch rows; preserve payroll as unverified global contract field.

## Executed checks and truthful limits

- **2970** TypeScript/TSX files parsed across the complete role source, with **4142** internal import resolutions checked.
- **53** controlled assertions executed against transpiled production components/hooks/handlers, using stand-ins for React, Next.js, MSW, Query and ApexCharts. No real host or browser execution is implied.
- **Scoped strict TypeScript:** PASS with compile-only stand-ins outside ZIP (5 owner source files + their imports); this does not mean the complete host TypeScript build passed.
- Four co-located Vitest/RTL/MSW regression tests and one Playwright spec **AUTHORED, NOT EXECUTED**.
- **Archive preservation:** 5 existing leaf files changed; 4 leaf tests added; 0 role files deleted; 3242 previous role paths byte-identical. All 44 autonomous module document sets physically present. All 181 original canonical-rule records and 207 original issue records retained without rewriting their statuses.

## Remaining dependencies

- Historical external contract blockers **ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230** remain unresolved.
- Sales Overview search API behavior and Plan Revenue currency identity remain unverified; no backend functionality or currency has been invented.
- Full host Next.js build, host TypeScript, official Vitest/RTL/MSW, authenticated Playwright, real accessibility verification and authenticated backend/RBAC/tenant checks are **NOT EXECUTED**. Branch-scoped payroll currency/meaning is also unverified and not synthesized.
- Next checkpoint **RBG117**; deliver only under `PARTIAL` naming until required production gates pass.

## RBG117 checkpoint — Finance Expenses

# Admin Frontend v51 — RBG117 scoped source repair

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Baseline `frontend-admin-v51-PARTIAL-rbg116.zip` SHA-256 `9d4478b9c7d7557d3d6823d8987ee68f1e01db90c551f7a82aa648a9f91de605`. Scope `frontend_admin/admin_finance/finance_expenses/`. No backend endpoint, role permission, tenant policy, or sibling autonomous leaf changed. Expenses search is not exposed because the Expenses query has no verified search parameter in its documented contract.

## Source-backed findings addressed (15)

1. **RBG117-DATE-STAGED**: Back-to-back date edits started from stale Next.js searchParams. **Source fix:** Stage pending query writes and merge each edit.
2. **RBG117-DATE-DUPLICATE**: Unchanged date input generated redundant router.replace. **Source fix:** Skip unchanged staged query.
3. **RBG117-DATE-EXPENSE-PAGE**: Date range edits preserved stale expense pagination and unrelated payments page. **Source fix:** Reset expenses pagination to 1 and clear stale page on date changes.
4. **RBG117-DATE-INVALID-CONSTRAINT**: Impossible ISO date supplied as native date-input min/max constraint. **Source fix:** Only supply verified calendar dates as min/max.
5. **RBG117-DATE-A11Y**: Custom invalid date fields were not consistently marked invalid. **Source fix:** Set aria-invalid for every invalid custom range; retain shared help region.
6. **RBG117-DATE-HISTORIC**: new Date(year,month,day) normalizes years 0000–0099 as 1900–1999. **Source fix:** Validate real historical year via setFullYear; disallow civil year 0000 and pad date format.
7. **RBG117-EXPENSE-URL-RACE**: Consecutive expense category and page actions lost prior edits. **Source fix:** Stage and merge query writes inside expenses state hook.
8. **RBG117-EXPENSE-URL-DUPLICATE**: Same expense filter generated redundant history entries. **Source fix:** Short-circuit unchanged query writes.
9. **RBG117-EXPENSE-PAGE-RECOVERY**: Bookmark to removed expense page left the UI on a permanent empty result. **Source fix:** Recover to last valid page after successful query metadata.
10. **RBG117-SELECTOR-DISABLED**: Disabling an expanded selector left aria-expanded true and stale listbox ownership. **Source fix:** Close on disable and align aria-expanded and aria-controls with mounted list.
11. **RBG117-SEARCH-UNBOUND**: Expenses route exposed search field hooked only to disabled Payments query. **Source fix:** Remove misleading search control pending verified Expenses search endpoint contract.
12. **RBG117-MOCK-BOUNDS**: Valid huge mock limit could allocate or return unbounded pages. **Source fix:** Bound permitted pagination integers to 100 and preserve existing fallbacks.
13. **RBG117-MOCK-TRIM**: Mock payments search compared untrimmed user input. **Source fix:** Normalize query whitespace before comparison.
14. **RBG117-PAGE-SUMMARY**: Pagination could display a start item larger than total items. **Source fix:** Suppress invalid item-range summary until the URL recovers.
15. **RBG117-EVENT-TYPES**: Owner UI handlers relied on implicit any event/record types under scoped strict TS. **Source fix:** Give explicit React input/select and Expense record types.

## Executed verification and limits

- **2974** TypeScript/TSX role files parsed with TypeScript, and **4146** local module import resolutions verified.
- **42** controlled executable assertions ran against transpiled real source through React/Next.js/MSW/Query stand-ins. These are not real browser or official unit test runs.
- **Scoped strict TypeScript:** PASS on changed owning production files with compile-only dependency stubs located *outside* the ZIP. Does not establish host TypeScript validity.
- Four repository-native tests and one host-only Playwright specification **AUTHORED, NOT EXECUTED**.
- **Archive preservation:** 8 owner existing files modified, 4 new owner regression tests, no deletions; 3243 prior files remain byte-identical. All 44 autonomous leaf artifact sets present; all 181 original canonical-rule rows and 207 original issue rows unchanged.

## Remaining dependencies and decisions

- ISSUE-038, ISSUE-182, ISSUE-229 and ISSUE-230 remain blocked on verified external contracts.
- The Sales Overview search API and Plan Revenue currency identity remain unverified. Expenses search is also not implemented; no new endpoint or client-side fake aggregate search was fabricated.
- Full host Next.js build, full host TypeScript, official Vitest/RTL/MSW, authenticated Playwright, real accessibility audits, tenant enforcement, and real backend/RBAC integration were **NOT EXECUTED**.
- Continue at RBG118; retain PARTIAL delivery naming until release gates are demonstrably passed.

## RBG118 checkpoint — Finance Payments

# Admin Frontend v51 — RBG118 scoped source repair

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Baseline `frontend-admin-v51-PARTIAL-rbg117.zip` SHA-256 `0eff89ae8ec5c78a9e83d752438a8abdf36d369271db05f2ff890859a7dd4b31`. Scope `frontend_admin/admin_finance/finance_payments/`. No backend endpoint, role permission, tenant policy, or sibling autonomous leaf changed.

## Source-backed findings addressed (15)

1. **RBG118-URL-RACE**: Rapid method and status edits rebuilt navigation from the original searchParams snapshot. **Source fix:** Stage pending URL changes and merge consecutive edits.
2. **RBG118-URL-REPEAT**: Repeated payment filter values caused redundant navigation. **Source fix:** Skip staged updates that do not alter query parameters.
3. **RBG118-PAGE-RECOVERY**: Payment URLs bookmarked to an obsolete page stayed empty after successful query results. **Source fix:** Recover to the highest valid page after a successful settled query.
4. **RBG118-DATE-URL-RACE**: Custom start and end dates changed quickly could overwrite the previous input. **Source fix:** Stage date URL state before Next.js acknowledges navigation.
5. **RBG118-DATE-REPEAT**: Unchanged date edits generated unnecessary router.replace calls. **Source fix:** Suppress unchanged date URL updates.
6. **RBG118-DATE-PAGE**: Date selection retained a stale payment page. **Source fix:** Reset payments page to 1 upon changed date filters.
7. **RBG118-DATE-INVALID-CONSTRAINT**: Invalid date strings became native input bounds and invalid custom dates were not consistently marked for assistive technology. **Source fix:** Validate civil dates before setting input min/max and flag the full invalid custom range.
8. **RBG118-CIVIL-DATE**: JavaScript Date normalizes years 0000-0099 and impossible calendar days. **Source fix:** Use setFullYear with strict YYYY-MM-DD validation and padded year formatting.
9. **RBG118-DROPDOWN-KEYBOARD**: Searchable payment selectors lacked Home/End keyboard navigation. **Source fix:** Implement Home/End alongside arrow-key active descendant tracking.
10. **RBG118-DROPDOWN-SCROLL**: Keyboard selection could advance beyond a visible list window. **Source fix:** Scroll the active option into view within the listbox.
11. **RBG118-DROPDOWN-DISABLED**: A dropdown disabled while expanded exposed stale ARIA expanded and controls state. **Source fix:** Close on disabled, clear selection search, match ARIA to mounted popover.
12. **RBG118-MOCK-LIMIT**: Valid but very large mock page limit could return unbounded pages. **Source fix:** Bound mock positive integer page and limit inputs to <=100.
13. **RBG118-MOCK-SEARCH**: Whitespace-only payment mock searches could behave as a filter. **Source fix:** Trim search whitespace before matching.
14. **RBG118-PAGINATION-SUMMARY**: Obsolete page displayed impossible start-to-total records. **Source fix:** Suppress item-range summary until page metadata is coherent.
15. **RBG118-SCOPED-STRICT-TYPES**: Payments page change handler and permanently narrowed module scope failed scoped strict TypeScript. **Source fix:** Type the ChangeEvent explicitly and avoid literal-only scope narrowing in multifunction hook.

## Executed verification and limits

- **2978** TypeScript/TSX files parsed in the role and **4151** local module import resolutions verified.
- **55** controlled behavioral assertions executed against transpiled Payments code using React/Next.js/MSW/Query stand-ins. This is **not** an official host or browser runtime verification.
- **Scoped strict TypeScript:** PASS with compile-only dependency stubs located *outside* the ZIP. This does not prove full host TypeScript correctness.
- Four leaf regression specs and one host-only Playwright specification **AUTHORED, NOT EXECUTED**.
- **Archive preservation:** 7 owner existing source files modified, 4 new owner regression tests, zero existing file deletions; 3248 prior role files byte-identical. All 44 autonomous leaf artifact sets present; all 181 original canonical-rule rows and 207 historical issue rows unchanged.

## Remaining dependencies and decisions

- ISSUE-038, ISSUE-182, ISSUE-229, and ISSUE-230 remain blocked pending authoritative external contracts.
- The Sales Overview search API, Plan Revenue currency identity, Expenses search endpoint, and expense-record date filtering are unverified; no contract behavior was invented.
- Full host Next.js build, full host TypeScript, official Vitest/RTL/MSW, authenticated Playwright, real accessibility audits, tenant enforcement, and backend/RBAC integration **NOT EXECUTED**.
- Continue at RBG119; retain `PARTIAL` naming until release gates are demonstrably passed.

## RBG119 checkpoint — Payouts Management

# Admin Frontend v51 — RBG119 scoped repair (Finance Payouts Management)

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Exact previous baseline `frontend-admin-v51-PARTIAL-rbg118.zip` with SHA-256 `f40cd033bc0c19cf6ddcc9fc972a643e894be9f6ea8426c0479ffee519b9fd21`. Scope `frontend_admin/admin_finance/finance_payouts_management/`. No sibling leaf, endpoint, backend contract, or permission policy changed.

## Source-backed findings addressed (14)

1. **RBG119-URL-HYDRATE:** URL hydration depended on filter state changes and could reapply old parameters. **Source change:** Only hydrate from distinct URL navigation events.
2. **RBG119-URL-LOCAL-STATE:** Shareable local filter changes could be reset to the stale URL while router.replace was pending. **Source change:** Separate URL navigation synchronization from local filter synchronization.
3. **RBG119-URL-RAPID-EDITS:** Rapid month/gym/status changes could construct URL updates from the same stale query. **Source change:** Merge pending route writes before browser acknowledgment.
4. **RBG119-URL-ACK:** Intermediate URL acknowledgments could revert a later pending change. **Source change:** Track locally issued queries and ignore intermediate acknowledgments.
5. **RBG119-URL-DEFAULTS:** Browser Back to a URL missing filter parameters failed to restore in-memory defaults. **Source change:** Apply default values for omitted URL parameters during external navigation.
6. **RBG119-MONTH-VALIDITY:** Month URL binding accepted non-calendar months like 2026-13. **Source change:** Require valid 01–12 month and four-digit nonzero civil year.
7. **RBG119-OBSOLETE-PAGE:** Saved payout page could exceed the total pages after result-count changes. **Source change:** Recover obsolete page only after settled successful query response.
8. **RBG119-DROPDOWN-HOME-END:** Searchable gym/status dropdown lacked Home/End navigation. **Source change:** Add standard Home/End focus movement to available options.
9. **RBG119-DROPDOWN-SCROLL:** Keyboard-highlighted dropdown options could move outside scroll viewport. **Source change:** Scroll active listbox option into view.
10. **RBG119-DROPDOWN-DISABLED:** Disabled dropdown could expose stale aria-expanded/aria-controls state. **Source change:** Close and clear stale popover accessibility state when disabled.
11. **RBG119-MOCK-BOUNDS:** Oversized valid mock page/limit could create unsafe pagination offsets. **Source change:** Bound accepted page and limit numbers to 100.
12. **RBG119-MOCK-PAYOUT-SORT:** Mock payout sorting indexed arbitrary user-provided object properties. **Source change:** Allowlist verified payout sorting keys and directions.
13. **RBG119-MOCK-PNL-SORT:** Mock P&L sorting indexed arbitrary user-provided object properties. **Source change:** Allowlist verified P&L sorting keys and directions.
14. **RBG119-PAGINATION-SUMMARY:** Obsolete payout pages could show start-item values above total items. **Source change:** Show a page summary instead of impossible item ranges.

## Executed checks and limits

- Role-level syntax parse: **2982** TypeScript/TSX files.
- Local module import resolutions: **4157**.
- **46** source-harness behavioral assertions using React/Next/MSW/Query stand-ins, **not actual host integration**.
- Scoped strict TypeScript: **PASS with compile-only dependency stubs outside the ZIP**; not full host TS.
- Four repository-native regression specs and one host-only Playwright specification **AUTHORED, NOT EXECUTED**.
- Archive diff: **6 existing leaf files modified; 4 new leaf tests; 0 source deletions**. 3253 pre-existing role files byte-identical. All **44** autonomous leaf artifact sets present. All **181** canonical rules and **207** historical issue rows preserved without retroactive status upgrades.

## Pending evidence and decisions

- Original contract blockers ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230 remain unresolved.
- Sales Overview search API, Plan Revenue currency identity, Expenses search and record-date filtering remain unverified. No backend contracts were invented.
- Official Vitest/RTL/MSW, full Next.js build, authenticated Playwright, real accessibility technology, backend RBAC and tenant enforcement **NOT EXECUTED**.
- Archive is not a production certification. Continue at **RBG120**.

## RBG121 checkpoint — Staff Dues Management

# Admin Frontend v51 — RBG121 scoped repair (Finance Staff Dues Management)

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Exact previous baseline `frontend-admin-v51-PARTIAL-rbg120.zip` SHA-256 `8143426feab4f47b9ef6ebbee8be091acf3a2d6d3d1f35429fa6f876c1bf350a`. Scope `frontend_admin/admin_finance/finance_staff_dues_management/`. No sibling leaf, endpoint, backend contract, or permission policy changed.

## Source-backed findings addressed (16)

1. **RBG121-VALIDATION-IMPORT:** Due payment table referenced an unimported validation message resolver that would fail on error render. **Source change:** Import the owning translated validation resolver.
2. **RBG121-NOTES-ARIA:** Notes error had no stable ID or accessible link from its textarea. **Source change:** Add aria-invalid, aria-describedby and a stable notes error ID.
3. **RBG121-STAFF-EVENT-TYPE:** Staff dropdown change callback relied on implicit event typing. **Source change:** Type native select change event explicitly.
4. **RBG121-URL-RAPID-FILTERS:** Consecutive role, search and branch edits each built from stale query snapshot. **Source change:** Merge URL patch writes through pending params.
5. **RBG121-URL-SORT-MERGE:** Staff and payroll sort setters discarded unacknowledged filters. **Source change:** Route sort changes through shared pending URL writer.
6. **RBG121-URL-ACK:** Intermediate navigation acknowledgments could overwrite most recent pending edit. **Source change:** Track issued URLs and preserve newer pending writes until acknowledgment.
7. **RBG121-URL-HISTORY:** Browser Back or externally provided URL could retain stale local changes. **Source change:** Discard pending local state for unrecognized external URL changes.
8. **RBG121-URL-NOOP:** Repeated identical URL changes caused redundant navigation. **Source change:** Suppress identical pending or current writes.
9. **RBG121-URL-MONTH:** Noncanonical and year-zero month parameters could be treated as valid. **Source change:** Use nonzero year format and canonical date round-trip.
10. **RBG121-MOCK-PAGE-BOUND:** Mock page and limit parser allowed huge safe integer inputs. **Source change:** Require canonical integer syntax and bound to 1..100.
11. **RBG121-MOCK-SORT-KEY:** Mock staff sort accepted arbitrary dynamic Staff property names. **Source change:** Allowlist only verified staff sort keys.
12. **RBG121-MOCK-SORT-DIRECTION:** Mock staff sort accepted arbitrary direction values. **Source change:** Normalize direction to asc or desc.
13. **RBG121-MOCK-SEARCH:** Whitespace-only mock search narrowed staff results unexpectedly. **Source change:** Trim mock search before matching.
14. **RBG121-MOCK-OBSOLETE-PAGE:** Obsolete mock page returned empty results with inconsistent navigation metadata. **Source change:** Clamp effective page and recompute hasNext and hasPrev.
15. **RBG121-QUERY-PAGE-RECOVERY:** Real staff response for an obsolete bookmarked page could leave UI empty. **Source change:** Return page to last page after verified total on successful staff response.
16. **RBG121-IDEMPOTENCY-DETAILS:** Dues payment retry identity omitted payment mode and notes for otherwise identical requests. **Source change:** Include payment mode and notes in unambiguous JSON tuple intent identity.

## Executed checks and limits

- Role-level syntax parse: **2990** TypeScript/TSX files.
- Local module import resolutions: **4170**.
- **50** controlled behavioral assertions against transpiled source with React/Next/MSW/Query stand-ins, **not actual host integration**.
- Scoped strict TypeScript: **PASS with compile-only dependency stubs outside the ZIP**; not full host TS.
- Four repository-native regression specs and one host-only Playwright specification **AUTHORED, NOT EXECUTED**.
- Archive diff: **5 existing leaf files modified; 4 new leaf tests; 0 source deletions**. 3262 pre-existing role files byte-identical. All **44** autonomous leaf artifact sets present. All **181** canonical rules and **207** historical issue rows preserved without retroactive status upgrades.

## Pending evidence and decisions

- Original contract blockers ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230 remain unresolved.
- Sales Overview search API, Plan Revenue currency identity, Expenses search and record-date filtering remain unverified; no backend contract invented.
- Official Vitest/RTL/MSW, full Next.js build, authenticated Playwright, real accessibility technology, backend RBAC and tenant enforcement **NOT EXECUTED**.
- The source-level mock normalization does not establish real backend pagination or idempotency semantics; the API and external service must be validated separately.
- This archive is not production certification. Continue at **RBG122**.

## RBG121 checkpoint — Staff Dues Management

# Admin Frontend v51 — RBG121 scoped repair (Finance Staff Dues Management)

**RELEASE STATUS: PARTIAL — NOT PRODUCTION CERTIFIED.** Exact previous baseline `frontend-admin-v51-PARTIAL-rbg120.zip` SHA-256 `8143426feab4f47b9ef6ebbee8be091acf3a2d6d3d1f35429fa6f876c1bf350a`. Scope `frontend_admin/admin_finance/finance_staff_dues_management/`. No sibling leaf, endpoint, backend contract, or permission policy changed.

## Source-backed findings addressed (16)

1. **RBG121-VALIDATION-IMPORT:** Due payment table referenced an unimported validation message resolver that would fail on error render. **Source change:** Import the owning translated validation resolver.
2. **RBG121-NOTES-ARIA:** Notes error had no stable ID or accessible link from its textarea. **Source change:** Add aria-invalid, aria-describedby and a stable notes error ID.
3. **RBG121-STAFF-EVENT-TYPE:** Staff dropdown change callback relied on implicit event typing. **Source change:** Type native select change event explicitly.
4. **RBG121-URL-RAPID-FILTERS:** Consecutive role, search and branch edits each built from stale query snapshot. **Source change:** Merge URL patch writes through pending params.
5. **RBG121-URL-SORT-MERGE:** Staff and payroll sort setters discarded unacknowledged filters. **Source change:** Route sort changes through shared pending URL writer.
6. **RBG121-URL-ACK:** Intermediate navigation acknowledgments could overwrite most recent pending edit. **Source change:** Track issued URLs and preserve newer pending writes until acknowledgment.
7. **RBG121-URL-HISTORY:** Browser Back or externally provided URL could retain stale local changes. **Source change:** Discard pending local state for unrecognized external URL changes.
8. **RBG121-URL-NOOP:** Repeated identical URL changes caused redundant navigation. **Source change:** Suppress identical pending or current writes.
9. **RBG121-URL-MONTH:** Noncanonical and year-zero month parameters could be treated as valid. **Source change:** Use nonzero year format and canonical date round-trip.
10. **RBG121-MOCK-PAGE-BOUND:** Mock page and limit parser allowed huge safe integer inputs. **Source change:** Require canonical integer syntax and bound to 1..100.
11. **RBG121-MOCK-SORT-KEY:** Mock staff sort accepted arbitrary dynamic Staff property names. **Source change:** Allowlist only verified staff sort keys.
12. **RBG121-MOCK-SORT-DIRECTION:** Mock staff sort accepted arbitrary direction values. **Source change:** Normalize direction to asc or desc.
13. **RBG121-MOCK-SEARCH:** Whitespace-only mock search narrowed staff results unexpectedly. **Source change:** Trim mock search before matching.
14. **RBG121-MOCK-OBSOLETE-PAGE:** Obsolete mock page returned empty results with inconsistent navigation metadata. **Source change:** Clamp effective page and recompute hasNext and hasPrev.
15. **RBG121-QUERY-PAGE-RECOVERY:** Real staff response for an obsolete bookmarked page could leave UI empty. **Source change:** Return page to last page after verified total on successful staff response.
16. **RBG121-IDEMPOTENCY-DETAILS:** Dues payment retry identity omitted payment mode and notes for otherwise identical requests. **Source change:** Include payment mode and notes in unambiguous JSON tuple intent identity.

## Executed checks and limits

- Role-level syntax parse: **2990** TypeScript/TSX files.
- Local module import resolutions: **4170**.
- **50** controlled behavioral assertions against transpiled source with React/Next/MSW/Query stand-ins, **not actual host integration**.
- Scoped strict TypeScript: **PASS with compile-only dependency stubs outside the ZIP**; not full host TS.
- Four repository-native regression specs and one host-only Playwright specification **AUTHORED, NOT EXECUTED**.
- Archive diff: **6 existing leaf files modified; 4 new leaf tests; 0 source deletions**. 3261 pre-existing role files byte-identical. All **44** autonomous leaf artifact sets present. All **181** canonical rules and **207** historical issue rows preserved without retroactive status upgrades.

## Pending evidence and decisions

- Original contract blockers ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230 remain unresolved.
- Sales Overview search API, Plan Revenue currency identity, Expenses search and record-date filtering remain unverified; no backend contract invented.
- Official Vitest/RTL/MSW, full Next.js build, authenticated Playwright, real accessibility technology, backend RBAC and tenant enforcement **NOT EXECUTED**.
- The source-level mock normalization does not establish real backend pagination or idempotency semantics; the API and external service must be validated separately.
- This archive is not production certification. Continue at **RBG122**.

## RBG122 checkpoint — Finance Payroll Report

# Admin Frontend v51 — RBG122 scoped source repairs (Finance Payroll Report)

**RELEASE: PARTIAL — NOT PRODUCTION CERTIFIED.** Input `frontend-admin-v51-PARTIAL-rbg121.zip`, SHA-256 `066086c2033b9c31d4e8046d1a62186d7eaf785221ca9799e3a1b6ed0695a776`. Only owner `frontend_admin/admin_finance/finance_payroll_report/` has source changes. No sibling business module, backend endpoint, RBAC policy, or external API contract was altered.

## Source-backed findings addressed (18)

1. **RBG122-URL_RAPID_EDIT:** Consecutive custom range changes rebuilt an outdated Next.js searchParams snapshot. **Repair:** Merge local pending URL patches until navigation acknowledgment.
2. **RBG122-URL_INTERMEDIATE_ACK:** Intermediate router snapshots risked overriding a later local date edit. **Repair:** Track issued URL snapshots and retain the latest unacknowledged draft.
3. **RBG122-URL_EXTERNAL_HISTORY:** Browser history updates could reuse stale local pending date params. **Repair:** Discard pending draft on an unrecognized external URL snapshot.
4. **RBG122-URL_REDUNDANT:** Identical filter changes produced unnecessary history navigation. **Repair:** Skip URL replacements where the target matches the current draft.
5. **RBG122-URL_PAGE_RESET:** Date edits retained an obsolete page query parameter. **Repair:** Remove stale page when changing the date filter.
6. **RBG122-DATE_STATUS_MISMATCH:** Filter treated malformed civil date strings as valid if their lexicographic order was correct. **Repair:** Use the report query date-range validator for the visible status.
7. **RBG122-DATE_YEAR_ZERO:** Validator accepted year 0000 while the interactive calendar could not handle that as a valid civil year. **Repair:** Reject year zero in the existing feature-local date-range validator.
8. **RBG122-DATE_FROM_KEY:** Date key construction parsed years 0001..0099 as years 1901..1999. **Repair:** Construct dates with setFullYear and a canonical four-digit round-trip.
9. **RBG122-DATE_CALENDAR_GRID:** Calendar day cells for historical years were built with the 1900-mapping Date constructor. **Repair:** Use the leaf-owned civil-date constructor for grid generation.
10. **RBG122-DATE_YEAR_BOUNDS:** Keyboard and month navigation could leave the supported four-digit year interval. **Repair:** Guard 0001..9999 and disable out-of-range month buttons.
11. **RBG122-DATE_PENDING_START:** Two fast calendar day clicks before parent URL rerender could ignore the new start date. **Repair:** Maintain a transient pending start ref until range completion or dismissal.
12. **RBG122-DATE_FOCUS_COMMIT:** Precommit animation-frame focus targeting could fail when a keyboard move crossed months. **Repair:** Focus the rendered day from an effect after the destination month commits.
13. **RBG122-DATE_EXTENDED_KEYS:** Calendar supported arrows only and lacked week/month/year keyboard navigation. **Repair:** Add Home End PageUp PageDown and Shift-modified year navigation.
14. **RBG122-DATE_MONTH_BUTTON_FOCUS:** Visible month changes could transfer focus unexpectedly from repeated month-button clicks. **Repair:** Preserve month-button focus and separate mouse navigation from keyboard day focus.
15. **RBG122-SELECTOR_HOME_END:** Searchable selector lacked Home/End active-option shortcuts. **Repair:** Support Home and End keys without submitting the search input.
16. **RBG122-SELECTOR_RESTORE_FOCUS:** Selecting an option removed its focused popover input without restoring keyboard focus. **Repair:** Return focus to the owning trigger after selection.
17. **RBG122-SELECTOR_ACTIVE_SCROLL:** Keyboard highlight could move outside the scrollable options viewport. **Repair:** Scroll the active option into view when highlight changes.
18. **RBG122-SELECTOR_DISABLED_OPEN:** Disabling a currently-open selector could retain stale transient search/popover state. **Repair:** Close and reset the selector on disable and reflect expanded=false.

## Executed verification and limitations

- **2994** TypeScript/TSX sources parsed; **4174** source-local imports resolved.
- **51** controlled assertions executed against transpiled actual leaf code using React/Next/date-fns stand-ins; not equivalent to official runtime tests.
- Scoped strict `tsc --noEmit`: **PASS with compile-only dependency stubs outside the ZIP**, not host semantic certification.
- **4** repository-native regression specs and **1** Playwright host spec authored but **NOT EXECUTED** because verified Next.js/React/Vitest/Playwright/date-fns host dependencies and authenticated backend are unavailable.
- Exact source preservation: **5 existing owner files modified, 4 new owner tests, 0 existing role files deleted, 3266 prior role files byte-identical**, 44 independent leaf artifact sets physically present.
- **181** historical canonical-rule records and **207** issue-reconciliation records retained without false PASS upgrades. Their presence does not certify compliance.

## Open release gates

- Historical blockers **ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230** remain external and unresolved. Sales Overview search contract, Plan Revenue currency identity, Expenses search/date filtering and Payroll Report binary export contract remain unverified.
- The full locked host TypeScript, official Vitest/RTL/MSW, `next build`, authenticated Playwright, WCAG assistive-tech, API integration, backend RBAC/tenant enforcement and production deployment tests were **NOT EXECUTED**.
- Source-only mock tests do not prove date-accurate payroll fixture data, true historical reporting or binary exports. This artifact remains a PARTIAL checkpoint. **Next: RBG123.**

## RBG123 checkpoint — Finance Staff Ledger Management

# Admin Frontend v51 — RBG123 scoped source repairs (Finance Staff Ledger Management)

**RELEASE: PARTIAL — NOT PRODUCTION CERTIFIED.** Input `frontend-admin-v51-PARTIAL-rbg122.zip`, SHA-256 `a97306ab23e30c2c9720fd9c8e41a6255f83be3e0fb0c863f2331b4e798f6663`. Only owner `frontend_admin/admin_finance/finance_staff_ledger_management/` has source changes. No sibling leaf, backend endpoint, RBAC policy, or external API contract altered.

## Source-backed findings addressed (19)

1. **RBG123-URL_RAPID_EDIT:** Consecutive staff search/role/branch edits rebuilt an outdated searchParams snapshot. **Repair:** Merge pending local URL patches.
2. **RBG123-URL_INTERMEDIATE_ACK:** Intermediate router acknowledgment could discard a later pending filter edit. **Repair:** Track issued snapshots until acknowledged.
3. **RBG123-URL_EXTERNAL_HISTORY:** Browser Back/Forward could retain a pending obsolete draft. **Repair:** Discard unrecognized pending URL drafts on external navigation.
4. **RBG123-URL_REDUNDANT:** Equivalent filter writes generated unnecessary router pushes. **Repair:** Skip identical target query.
5. **RBG123-URL_MONTH_PAGE:** Month changes retained an obsolete staff page index. **Repair:** Reset page on month changes.
6. **RBG123-URL_MONTH_YEARZERO:** Payroll month validation accepted year 0000 even though the UI uses civil 4-digit year range. **Repair:** Reject year 0000 and require strict roundtrip month match.
7. **RBG123-MOCK_SORT_KEY:** Staff mock GET allowed arbitrary object properties as sort fields. **Repair:** Use existing staff sort-key allowlist.
8. **RBG123-MOCK_SORT_DIR:** Unsupported mock sort direction silently inverted the expected default sort. **Repair:** Normalize to explicitly recognized asc/desc.
9. **RBG123-MOCK_SEARCH_SPACE:** Whitespace-only fixture search returned no results instead of unfiltered results. **Repair:** Trim search query before lowercasing.
10. **RBG123-MOCK_PAGINATION_LIMIT:** Positive but unbounded mock limit values could produce oversized slices. **Repair:** Bound page/limit to safe decimal integers 1..100.
11. **RBG123-MOCK_OBSOLETE_PAGE:** Out-of-range mock pages returned empty records with impossible hasPrevPage metadata. **Repair:** Clamp returned page and recalculate navigation metadata.
12. **RBG123-LIVE_PAGE_RECOVERY:** After successful staff read an obsolete bookmarked page could trap the UI on empty results. **Repair:** Recover page from returned total after success.
13. **RBG123-SELECT_KEY_HOME_END:** Searchable staff selector lacked first/last-option keyboard navigation. **Repair:** Implement Home and End with correct aria-activedescendant.
14. **RBG123-SELECT_FOCUS:** Selecting an option unmounted its focused input without returning keyboard focus. **Repair:** Restore focus to trigger after selection.
15. **RBG123-SELECT_ACTIVE_SCROLL:** Keyboard-highlighted option could move outside visible list. **Repair:** Scroll active option into view.
16. **RBG123-SELECT_DISABLED_STATE:** Disabling an open staff selector left stale expanded and search state. **Repair:** Close/reset on disable and suppress expanded state.
17. **RBG123-LEDGER_NO_STAFF_PENDING:** Disabled ledger query without a staff selection displayed an indefinite spinner. **Repair:** Gate loading state behind actual selection.
18. **RBG123-LEDGER_ERROR_STATE:** Failed ledger request rendered a misleading no-records state. **Repair:** Present translated generic error as alert.
19. **RBG123-LEDGER_RETRY:** Ledger failure had no visible retry action. **Repair:** Expose query refetch and connect a localized retry button.

## Executed verification and limitations

- **2998** TS/TSX sources parsed and **4181** local imports resolved in the complete extracted role.
- **54** behavioral assertions executed against transpiled actual leaf code using controlled React/Next/date-fns/MSW substitutes. They are **not** official runtime tests.
- Scoped strict `tsc --noEmit`: **PASS**, with compile-only host dependency stubs outside the deliverable ZIP. The full host project TypeScript check is **NOT EXECUTED**.
- **4** repository-native regression specs and one host-only Playwright spec authored, **NOT EXECUTED** without verified installed host dependencies.
- Exact preservation: **8 owner files modified, 4 owner tests added, zero original role files deleted, 3267 earlier role files byte-identical**, all 44 independent artifact sets present.
- **181** historical canonical rules and **207** issue records retained in their previous statuses; their presence is **not** a compliance pass.

## Open release gates

- Historical blockers **ISSUE-038, ISSUE-182, ISSUE-229, ISSUE-230** remain unresolved. Sales Overview search, Plan Revenue currency, Expenses search/date filtering and Payroll binary export decisions also remain open.
- Complete host TypeScript, Vitest/RTL/MSW, Next.js build, authenticated Playwright, WCAG assistive-tech testing, live API integration and backend RBAC/tenant enforcement are **NOT EXECUTED**.
- Financial ledger mock pagination and error retries do not certify real server behavior, historical ledger balances, or cross-tenant security. **Next checkpoint: RBG124.**



## RBG124 source checkpoint (2026-11-02)
RBG124 Finance Payroll Management: 18 source-backed findings implemented in 5 owner files. 62 controlled stand-in assertions, 3003 syntax parses and 4186 local imports pass; 5 regression specs and 1 host-only browser spec authored, not run. The 44 autonomous leaves and all prior audit records are preserved. Full host/build/security/accessibility/backend checks remain NOT EXECUTED; contract blockers and prior rule statuses unchanged. Release remains PARTIAL. Detailed ledger: `audit_evidence/ADMIN_V51_RBG124_CLOSURE_LEDGER.csv`.


## RBG125 scoped checkpoint

Security Audit Logs Explorer source redaction, URL sync, selector accessibility and pagination were repaired in 9 existing leaf files; 16 findings with owner path evidence. Executed 53 controlled source-level assertions and 3007 syntax / 4191 local import checks. Four unit/RTL specs and one Playwright spec authored, NOT EXECUTED. All 44 modules and 207 issue / 181 rule records preserved. This checkpoint remains PARTIAL; authenticated host, backend/RBAC and accessibility tests are NOT EXECUTED; four historical contract blockers stay open. See RBG125_REPAIR_REPORT.md and audit_evidence/ADMIN_V51_RBG125_CLOSURE_LEDGER.csv.


## RBG126 — Security Permissions scoped checkpoint

10 owner-source findings repaired in Permissions Management; 3010 TS/TSX syntax checks, 4194 local import resolutions and 38 compiled-source stand-in assertions passed. Three unit/UI and one host E2E regression specs authored (not executed). 44 leaves and 207/181 issue/rule records preserved. Full host/a11y/security/backend certification NOT EXECUTED, inherited contract blockers open; release remains PARTIAL. See `RBG126_REPAIR_REPORT.md`.


## RBG127 — Settings Management source checkpoint

11 source-backed Settings owner findings repaired; 3013 syntax parses, 4197 local imports and 31 controlled assertions passed. Three Vitest/RTL and one host Playwright specifications authored but NOT EXECUTED. 44 autonomous leaf artifact sets, 207 issue and 181 canonical rule rows preserved. Host build/a11y/backend security verification NOT EXECUTED; release remains PARTIAL. See `RBG127_REPAIR_REPORT.md`.

## RBG128 Checkpoint
RBG128 host handoff: install host dependencies and execute complete tsc, Vitest/RTL/MSW, authenticated Playwright, accessibility, and RBAC tenant-safety tests before certification.


## RBG129 — Billing Payment Methods source checkpoint

17 owner findings addressed; 3,021 grammar parses, 4,207 local imports, and 47 controlled assertions passed. Four Vitest/RTL and one host Playwright regression specs AUTHORED ONLY, not executed. 44 module artifact sets, 207 issue rows, 181 canonical rule rows preserved. Full host/backend testing not executed. Release PARTIAL. See `RBG129_REPAIR_REPORT.md`.


## RBG130 — Billing Subscription Invoices source checkpoint

16 owner findings addressed; 3,025 grammar parses, 4,213 local imports, and 64 controlled assertions passed. Four Vitest/RTL and one host Playwright regression specs AUTHORED ONLY, not executed. 44 module artifact sets, 207 issue rows, 181 canonical rule rows preserved. Full host/backend testing not executed. Release PARTIAL. See `RBG130_REPAIR_REPORT.md`.


## RBG131 — Billing Coupons scoped checkpoint

18 source-backed findings addressed in the isolated Billing Coupons leaf. 3,029 syntax parses, 4,218 local imports, and 48 controlled assertions passed with stand-ins. Four RTL/Vitest and one host Playwright specs authored, NOT EXECUTED. 44 documentation sets, 207 issues, 181 rule rows preserved; external blockers open; full host/backend tests not executed. Release remains PARTIAL. See `RBG131_REPAIR_REPORT.md`.


## RBG132 — Billing Subscription Plans scoped checkpoint

16 source-backed findings addressed within the isolated subscription-plans leaf. 3,033 syntax parses, 4,225 resolved local imports, 77 controlled assertions passed using stand-ins. Four official regression specs and one host Playwright spec AUTHORED, NOT EXECUTED. 44 module artifact sets, 207 issue rows and 181 rule rows preserved; unresolved external blockers remain. Release PARTIAL; see RBG132_REPAIR_REPORT.md.


## RBG133 — Billing Plans Catalog scoped checkpoint

21 source-backed findings addressed inside the owning plans-catalog leaf. 3,037 syntax parses, 4,235 local imports and 63 controlled assertions passed. Four Vitest/RTL and one host Playwright test AUTHORED, NOT EXECUTED. 44 module contract sets, 207 historical issue rows and 181 canonical rule rows preserved; four external blockers remain open. Release PARTIAL; see RBG133_REPAIR_REPORT.md.


## RBG134 Billing Subscriptions Overview integration
Use existing module API routes and permission boundaries. Host must execute native regression suite, authenticated Playwright, full build/typecheck and backend financial/RBAC idempotency verification. No host root edits made.


## RBG135 Billing Usage Analytics integration
Use existing module API routes and permission boundaries. Host must execute native regression suite, authenticated Playwright, full build/typecheck and backend financial/RBAC idempotency verification. No host root edits made.


## RBG136 Members Blacklist Management integration
Use existing member blacklist API routes and permission boundaries. Host must execute native regression suite, authenticated Playwright, full build/typecheck and backend blacklist/RBAC/idempotency verification. No host root edits made.



## RBG137 continuation
RBG137: Members Directory URL, mocks, pagination, dropdown; run authored native specs in authenticated host. No endpoint/authorization changes.


## RBG138 checkpoint (PARTIAL)

# RBG138 — Admin Attendance Reports source repair

**Release: PARTIAL — NOT PRODUCTION CERTIFIED**. Exact prior baseline `frontend-admin-v51-PARTIAL-rbg137.zip`, SHA256 `97c51186fdf26270008a31ffaaa1d59b1df5f310725be39fb23bde6d4d32d7d1`. All source modifications confined to `frontend_admin/admin_attendance/attendance_reports/`. One host-only Playwright specification added; no unrelated role leaf or backend contract changed.

## Source-backed findings (18)

- **RBG138-DATE-0042** — JavaScript constructor coerced historical years 0001–0099 to the 1900s. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-DATE-KEY** — Calendar date keys were not consistently four-digit-padded. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-DATE-MONTH-BOUND** — Month buttons could navigate beyond supported years 0001–9999. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-DATE-ARROW-BOUND** — Arrow-key navigation could focus unsupported civil years. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-DATE-KEYBOARD-TRAP** — Calendar dialog did not loop Tab / Shift+Tab focus. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-DATE-STALE-START** — Second calendar selection could use stale parent startDate while URL update pending. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-DATE-FOCUS-SCOPE** — Calendar arrow navigation focused a page-wide query instead of its owning dialog. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker.tsx`.
- **RBG138-URL-MERGE** — Sequential custom range changes overwrote pending query navigation. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown.tsx`.
- **RBG138-URL-ACK** — Delayed navigation acknowledgement could drop newer pending filter changes. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown.tsx`.
- **RBG138-URL-HISTORY** — External browser-history navigation needed priority over pending local query state. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown.tsx`.
- **RBG138-URL-DUPLICATE** — Duplicate filter writes need not push redundant router.replace requests. Owner: `frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown.tsx`.
- **RBG138-SELECT-HOMEEND** — Searchable attendance dropdown lacked Home/End keyboard navigation. Owner: `frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown.tsx`.
- **RBG138-SELECT-FOCUS** — Dropdown selection did not restore trigger keyboard focus. Owner: `frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown.tsx`.
- **RBG138-SELECT-SCROLL** — Keyboard active option could remain outside scroll viewport. Owner: `frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown.tsx`.
- **RBG138-SELECT-DISABLED** — Disabled dropdown could retain open search state. Owner: `frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown.tsx`.
- **RBG138-SELECT-TRIM** — Whitespace-only search did not normalize to all options. Owner: `frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown.tsx`.
- **RBG138-EXPORT-OVERLAP** — Rapid export actions could start overlapping mutation/download flows. Owner: `frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsMutations.ts`.
- **RBG138-EXPORT-RELEASE** — Export guard must release on both transport failure and successful cleanup. Owner: `frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsMutations.ts`.

## Executed verification and unexecuted gates

- Role-wide **3057** TS/TSX syntax parses: PASS; **4268** resolved local imports: PASS.
- **21** controlled behavioral assertions: PASS on actual transpiled owner modules using explicit React/Next/TanStack stubs. This is **not** a native RTL/Vitest/Playwright or app build result.
- Four native regression tests and one host-only Playwright test: **AUTHORED / NOT EXECUTED**.
- Original role files modified **5**, original role files byte-identically preserved **3329**, new native regression files **4**, original deletions **0**.
- Physical module contract sets **44/44**; historical issue ledger **207** and canonical rules ledger **181** preserved verbatim. Rules with `NOT_VERIFIED`: **177**.
- Actual host-build readiness inspection: `package.json`, root `tsconfig.json`, and dependency lockfiles absent. `next`, `react`, `date-fns`, `vitest`, and `@playwright/test` unavailable. Therefore the full Next.js build, complete TypeScript check, framework unit tests, authenticated browser flows, assistive-technology accessibility, backend/RBAC/tenant/idempotency are all **NOT VERIFIED**. No fake substitutes claimed.
- Historical blockers `ISSUE-038`, `ISSUE-182`, `ISSUE-229`, `ISSUE-230` remain unresolved.

## Source ownership and integration

The attendance report continues to use only its previously documented GET report and branch-reference endpoints and existing fail-closed binary export contract. Calendar fixes, query navigation merging, dropdown accessibility and single-flight export are local. Integration must be completed in the authorized host and retested with real routing, dependencies and backend policies before production certification.



## RBG139 (source-only, partial)

# RBG139 — Admin Attendance Dashboard source repair

**Release: PARTIAL — NOT PRODUCTION CERTIFIED**. Exact baseline `frontend-admin-v51-PARTIAL-rbg138.zip` (SHA256 `9c07dde365ceab30464c171c619abfcb08ba456445e313ad688a255789cce10c`). Source changes only within `frontend_admin/admin_attendance/attendance_dashboard/`; one host-only Playwright regression added, no sibling feature or backend contracts modified.

## Source-backed findings (17)

- **RBG139-URL-DEFAULT** — Missing history URL query keys were not restored to filter defaults. Source: `frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync.ts`.
- **RBG139-URL-RACE** — Rapid consecutive filter edits could overwrite pending router replacements. Source: `frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync.ts`.
- **RBG139-URL-ACK** — Delayed navigation acknowledgement could discard newer local pending edits. Source: `frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync.ts`.
- **RBG139-URL-HISTORY** — External Back/Forward navigation could be overwritten by obsolete store snapshot. Source: `frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync.ts`.
- **RBG139-URL-DUP** — Equivalent filter writes could cause redundant URL navigation. Source: `frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardUrlQuerySync.ts`.
- **RBG139-SELECT-TRIM** — Leading search whitespace distorted dropdown option matching. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown.tsx`.
- **RBG139-SELECT-HOME** — Dropdown did not support Home/End list navigation. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown.tsx`.
- **RBG139-SELECT-FOCUS** — Dropdown option selection did not restore trigger focus. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown.tsx`.
- **RBG139-SELECT-DISABLED** — Dropdown could retain open state after becoming disabled. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown.tsx`.
- **RBG139-SELECT-VIEW** — Keyboard active option could be outside the dropdown scroll viewport. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown.tsx`.
- **RBG139-MOCK-LIMIT** — Untrusted mock limit input could exceed safe list page size. Source: `frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardMockPagination.ts`.
- **RBG139-MOCK-PAGE** — Obsolete mock page could exceed actual total pages and report inconsistent metadata. Source: `frontend_admin/admin_attendance/attendance_dashboard/mocks/handlers/AdminAttendanceDashboardMockHandlers.ts`.
- **RBG139-MOCK-INPUT** — Non-finite or malformed mock pagination input needed a bounded fallback. Source: `frontend_admin/admin_attendance/attendance_dashboard/mocks/handlers/AdminAttendanceDashboardMockHandlers.ts`.
- **RBG139-MOCK-SEARCH** — Whitespace-only mock attendance search matched nothing instead of all records. Source: `frontend_admin/admin_attendance/attendance_dashboard/mocks/handlers/AdminAttendanceDashboardMockHandlers.ts`.
- **RBG139-PAGE-BOUNDS** — Pagination component could display an obsolete current page outside page range. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/AdminAttendanceDashboardPagination.tsx`.
- **RBG139-PAGE-RANGE** — Pagination record start/end could exceed total results on obsolete pages. Source: `frontend_admin/admin_attendance/attendance_dashboard/components/AdminAttendanceDashboardPagination.tsx`.
- **RBG139-PAGE-RECOVERY** — Successful attendance list response could leave state on a nonexistent page after filter change. Source: `frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardLogic.ts`.

## Executed verification and pending gates

- Source-wide **3061** TS/TSX syntax parses: PASS; **4273** local import resolutions: PASS.
- **50** controlled executable source assertions: PASS, using actual transpiled module source and explicit React/Next/MSW stand-ins. This is **not** a native framework or browser test result.
- Four native Vitest/RTL regression specifications and one authenticated-host Playwright specification: **AUTHORED, NOT EXECUTED**.
- Source files modified **6**; other role source files preserved **3332**; native tests added **4**, host-only spec **1**, original deletions **0**.
- Autonomous documentation trios **44/44** physically present; historical **207** issue rows and **181** canonical rule rows byte-preserved; canonical rules containing `NOT_VERIFIED`: **177**.
- Archive lacks root `package.json`, `tsconfig.json`, host-installed Next.js/React/Vitest/Playwright and backend environment. Full host build, complete strict typecheck, native Vitest/RTL/MSW, authenticated browser tests, assistive-technology accessibility, and backend RBAC/tenant/API contract proof: **NOT EXECUTED / NOT VERIFIED**.
- `ISSUE-038`, `ISSUE-182`, `ISSUE-229`, `ISSUE-230` remain historical unresolved external blockers.

## Scope/risks

Read-only Attendance Dashboard routes continue to use the existing `/admin/attendance/records`, `/admin/attendance/summary`, `/admin/attendance/trend`, and branch-reference GET contracts. The module-local source changes cover URL hydration/race avoidance, dropdown keyboard/focus, mock request bounds, and truthful pagination. Runtime host integration is required before release qualification.


## RBG140 — Final consolidated handoff (not production-certified)

# RBG140 — Security Permissions cross-component concurrency and final-source handoff

**Source repair complete, application certification still PARTIAL.** Baseline `frontend-admin-v51-PARTIAL-rbg139.zip` SHA256 `efbf479a5e6fcd975da2591ee6e199744a87f0ab75c08acac3b7fbd0b6a0bc40`.

## 9 source-backed repair findings

- **RBG140-SHARED-LOCK** — Each independently mounted permission hook had its own staff mutation lock; competing component writes could overlap. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic.ts`.
- **RBG140-CROSS-ACTION** — A reset could race with permission enable/disable from another hook on the same staff identity. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic.ts`.
- **RBG140-CONFIRM-FLIGHT** — Per-hook locks did not serialize confirmation windows across the separately mounted staff action consumers. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic.ts`.
- **RBG140-SAVING-STATE** — Saving state only reflected mutations on one hook, so other consumers could show unlocked controls during a pending action. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic.ts`.
- **RBG140-INTENT-CROSS-HOOK** — Idempotency keys were kept in a hook-local ref and could differ across mounted consumers on retry. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations.ts`.
- **RBG140-INTENT-REMOUNT** — Unmounting and remounting discarded the retry identity for an ambiguously failed permission update. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations.ts`.
- **RBG140-EMPTY-STAFF** — An empty or whitespace-only staff identifier was not rejected before requesting confirmation/permission write. Source: `frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore.ts`.
- **RBG140-BOOLEAN-VALIDATION** — Runtime invalid nonboolean enabled arguments were not blocked by TypeScript-only declarations. Source: `frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic.ts`.
- **RBG140-DICTIONARY-KEY** — A plain object operation registry could confuse inherited property names with real staff IDs without an own-key guard. Source: `frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore.ts`.

## Executed checks

- Role-wide grammar parses: **3063 PASS**.
- Local source import resolutions: **4277 PASS**.
- Actual transpiled owner-source controlled behavioral assertions: **48 PASS**, with framework stand-ins.
- Two native regression specifications **AUTHORED, NOT EXECUTED**; two older permission hook specs synchronized with new store contract, **NOT EXECUTED**.
- Modified original owner files: **8**; added tests **2**; original deletions **0**; unchanged role files **3334**.
- Native strict TypeScript/Next.js/Vitest/Playwright/WCAG/live API/RBAC checks: **NOT EXECUTED / NOT VERIFIED**.

## Unresolved critical boundaries

The feature uses existing permission endpoints and makes no new permission contract assumption. **ISSUE-229, ISSUE-230**, server-side tenant/RBAC enforcement, backend audit persistence and human CODEOWNERS approval remain open. Additionally **ISSUE-038 and ISSUE-182** remain external. Source repairs do not resolve other 181-rule canonical audit statuses or the missing RBG46/RBG47/RBG48 individual ledger evidence.

See FINAL_RELEASE_STATUS.md and FINAL_HOST_VERIFICATION_RUNBOOK.md for missing host, contracts, and release gates.
