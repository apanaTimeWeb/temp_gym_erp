# Enterprise-Grade, AI-Friendly Web Frontend Architecture Guidelines

## Master Cross-Document Precedence Order

When instructions conflict across documents, apply this exact order of authority:

1. Security, privacy, legal, authorization, tenant isolation, and data-protection rules
2. Accessibility and browser platform safety requirements (WCAG 2.2 AA)
3. Explicit user-approved scope and verified API contracts
4. `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`
5. `WEB_FRONTEND_UI_UX_DESIGN.md` for visual/token decisions
6. Execution workflow documents (when supplied: `FRONTEND_ROLE_MODULE_CREATE_AUDIT_REPAIR_V2_11.md` or standalone execution mode; when unsupplied, `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md` serves as the self-contained authority) for audit sequencing, delivery artifacts, and reporting
7. Sub-module documentation trio (`[role]_[submodule]_features.md`, `[role]_[submodule]_forbidden.md`, `[role]_[submodule]_theme_contract.md`)
8. Existing implementation conventions

A lower-priority rule MUST NOT override a higher-priority rule.
Classify unresolved evidence consistently: use `SOURCE_CONFLICT` for conflicting supplied rules, `CONTRACT_CONFLICT` for a supplied product/API contract that conflicts with an applicable rule, `BLOCKED_BY_SUPPLIED_SCOPE` when required evidence is outside the supplied scope, and `NOT_VERIFIED` when available evidence is insufficient. Reserve `BLOCKED_BY_SUPPLIED_CONTRACT` for a verified contract that makes safe execution impossible. Never resolve a conflict through invention.

## Canonical Rule Reference Policy

When a rule is repeated for convenience:
- The first named canonical section is authoritative;
- Repeated copies must link to or reference the canonical rule;
- Repeated copies must not redefine, weaken, or conflict with the canonical wording;
- Any conflicting duplicate wording is obsolete and must be removed during the next document revision.

> ⛔⛔⛔ **AI AGENT — MANDATORY ENFORCEMENT & INTEGRITY DIRECTIVE — READ FIRST** ⛔⛔⛔
>
> **ARCHITECTURAL COMPLIANCE IS MANDATORY. FOLLOW THE SEVERITY MODEL AND CANONICAL REPAIR PROTOCOL.**
>
> **COMPLIANCE FAILURE HANDLING (EVIDENCE-BASED REPAIR):**
> A compliance violation triggers a mandatory stop only for the affected workstream or file.
> Non-dependent compliant workstreams MUST continue without interruption.
> Missing runtime/host capability (dev server, live API, test runner, browser automation) is NEVER an architectural violation and MUST NOT cause execution to pause or stall (mark as `DEFERRED_TO_HOST_RUNTIME`).
> Previously verified and unaffected work remains valid and must not be discarded.
>
> This document is the **absolute normative authority for all web frontend architectural, design system, and code repair behavior**.
>
> ⛔ **ARCHITECTURAL & UI COMPLETENESS MANDATE (MUST REPAIR & COMPLETE):**
> When web frontend source code has incomplete forms, missing Zod validation schemas, missing modals, raw browser alerts (`window.alert`, `window.confirm`), missing loading skeletons, missing empty states, unstyled buttons, or unhandled UI flows:
> - The AI **MUST ACTIVELY REPAIR, IMPLEMENT, AND COMPLETE THEM** using the Web Design System (`WEB_FRONTEND_UI_UX_DESIGN.md`) and Architecture Rules.
> - Inappropriate alerts (`window.alert()`, `window.confirm()`, single-click deletes) MUST be replaced with the mandated luxury `useConfirm()` dialogs.
> - Forms MUST be fully wired with React Hook Form v7 + Zod v3 schemas and backend 400 validation error mapping.
> - UI modals, empty states, error boundaries, and loading skeletons MUST be fully authored and completed.
>
> ⛔ **ANTI-DESTRUCTION & PARTIAL FEATURE COMPLETION LAW (ZERO FEATURE EVICTION):**
> When web frontend source code contains partially implemented, half-built, or incomplete features (e.g., an unfinished filter drawer, an unwired export button, a half-implemented modal, a partially authored API hook, or an incomplete multi-step form flow):
> - **ZERO FEATURE EVICTION (DO NOT DELETE):** The AI **MUST NOT** delete, remove, comment out, or strip away existing features, UI elements, buttons, form fields, modals, or business flows simply because they are half-built, incomplete, or currently causing type/test errors. Deleting half-built features to get a "clean audit pass" is strictly prohibited as DESTRUCTIVE MALPRACTICE.
> - **MANDATORY ADDITIVE COMPLETION (ADD & CORRECT):** The AI **MUST actively COMPLETE the missing half**: add missing types, wire up API queries/mutations, implement missing Zod schemas, author missing loading/empty/error states, connect handlers, and correct all syntax or architectural violations until the feature is 100% functional and architecture-compliant.
>
> ⛔ **STRICT BOUNDARY OF `CONTRACT_MISSING` (EXTERNAL DOMAIN SPECS ONLY):**
> `CONTRACT_MISSING` applies STRICTLY to **external business contracts that cannot be known from the code or architecture** (e.g., an unprovided external 3rd-party webhook secret, an unprovided backend API endpoint URL that has no specification, or an unknown financial tax formula).
> `CONTRACT_MISSING` **MUST NEVER BE USED AS AN EXCUSE** to leave source code incomplete, leave crude `window.alert()` calls in place, skip form validation, or fail to build proper UI dialogs/modals!
>
> ⛔ **DETERMINISTIC CONFIDENCE TAXONOMY & EVIDENCE STANDARD:**
> Every implementation decision, contract assertion, and audit claim MUST be classified into one of:
> - `VERIFIED`: Proven by supplied source file path, exact line reference, verified API contract, schema, or explicit architecture rule.
> - `DERIVED`: Deterministically derived from verified types/interfaces or architecture-mandated patterns (e.g. deriving a `useConfirm` modal from a raw `window.alert` violation).
> - `CONTRACT_MISSING`: External backend/business behavior or requirement not provided in supplied scope. The AI MUST NOT infer or guess external backend behaviors.
> - `ASSUMED`: Strictly PROHIBITED. Speculative guessing without architectural or contract foundation is an ARCHITECTURE FAILURE.
>
> **Valid Evidence:** Source file path, exact line reference, API contract, schema, mock fixture, repository config, or normative architecture rule.
> **Invalid Evidence (FORBIDDEN):** Speculative AI guessing, naming assumptions, generic industry patterns, or prior project habits.
>
> The following words in this document carry their STRICTEST possible meaning:
>
> | Word | Meaning |
> |------|---------|
> | **MUST** | Absolute requirement — no exception, no omission, no interpretation |
> | **MUST NOT** | Absolute prohibition — no exception under any circumstance |
> | **FORBIDDEN** | Same as MUST NOT — harder emphasis |
> | **REQUIRED** | Same as MUST — mandatory deliverable |
> | **encouraged** / **preferred** | Still a **default requirement** — deviations require explicit documented justification |
> | **Optional** (sub-folders) | Only optional when the module **genuinely has no such artifact** — omitting when the artifact exists = VIOLATION |
> | **except** / **unless** | Only a valid escape when ALL stated conditions for the exception are explicitly met and documented |
>
> **RULES APPLY TO THE ENTIRE DOCUMENT.** An AI that reads only the first half of this document and produces output is producing INCOMPLETE and INVALID output. Every rule from Rule 1 through Rule 84, Extended Rules 14–23, the FRONTEND DELIVERY FREEZE GATE, and the DEFINITION OF DONE is mandatory. The FRONTEND DELIVERY FREEZE GATE applies to every audit finding and deliverable.
>
> ⛔ **BEFORE WRITING ANY CODE OR AUDIT FINDING, CONFIRM:**
> ```text
> [ ] Read complete WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md (every currently defined numbered, lettered, extended, delivery-freeze, and Definition-of-Done rule; do not rely on a static rule count)
> [ ] Confirmed TECHNOLOGY BASELINE — Next.js App Router, Tailwind v4, TanStack Query v5, Zustand, RHF v7, Zod
> [ ] CRITICAL FRONTEND STRUCTURE GATE passed — folder tree verified before any deeper rule
> [ ] Canonical module folder structure confirmed (src/app/frontend_{role}/{role}_{module}/)
> [ ] ROOT QUARANTINE verified — only permitted files in feature root
> [ ] FRONTEND DELIVERY FREEZE GATE & DEFINITION OF DONE loaded into context
> [ ] EXECUTIVE DIAMOND PROTOCOLS CONFIRMED (Anti-Deception ZIP Naming, 3-Table Cross-Check Gate, 1-Click Buttons, Clarification Modals, Roman Hinglish Telemetry, Workload Density)
> [ ] COMMUNICATION FORMAT CONFIRMED: Structured artifacts, statuses, evidence, and code identifiers use English; conversational telemetry may use concise Roman Hinglish when useful (NO Devanagari).
> ```
> **Failure to confirm the above = verification incomplete. Do not proceed until baseline is verified.**
>
> ⛔ **NO-PAUSE ON MISSING RUNTIME / HOST CAPABILITY (MANDATORY ANTI-STALL RULE):**
> Unavailability of a running web server (Next.js/Vite dev server), live backend API, real browser, or Playwright test runner is NEVER a reason to pause, stall, abort, or declare web frontend code creation, audit, or repair "BLOCKED". The AI MUST fix every issue that can be resolved in source files (pages, layouts, components, custom hooks, Zustand stores, Zod schemas, URL configs, MSW mock fixtures, Playwright test files, documentation trio) in this session. Only live browser automation or live API network execution is designated as `DEFERRED_TO_HOST_RUNTIME`. Missing runtime is strictly forbidden as a reason to pause.
> ⛔ **OFFLINE / STATIC SCORING DIRECTIVE:** When live browser or runtime test execution is unavailable in the execution environment, ratings (1 to 10) MUST evaluate **Static Architecture & Code Completeness**. The AI MUST NOT penalize, artificially deduct points, or refuse to rate simply because a live browser or server is absent. State the Static Compliance Rating directly (up to 10.0), noting dynamic execution separately as `DEFERRED_TO_HOST_RUNTIME`.
>
> ⛔ **AI HALLUCINATION REDUCTION DISCIPLINE (TARGET < 5% HALLUCINATION RATE):**
> AI coding models hallucinate when context is ambiguous, dependencies are hidden across deep trees, or contracts are assumed rather than explicitly declared. To reduce AI hallucination from the industry baseline (>80% in multi-file projects) to under 5%:
> 1. The AI MUST NOT invent, guess, or assume API response fields, store actions, Next.js route paths, or UI props. Every contract MUST be verified against Zod schemas, TypeScript types, or `[moduleName]_features.md`.
> 2. When creating or debugging a module, the AI MUST rely primarily on the module's documentation trio (`[role]_[submodule]_features.md`, `[role]_[submodule]_forbidden.md`, `[role]_[submodule]_theme_contract.md`) and mock fixtures (`mocks/fixtures/`), treating source code as the LAST resort.
> 3. Every file and folder MUST satisfy the **5-Second Comprehension Invariant**—a newly initialized AI context or human developer must understand its exact responsibility, inputs, outputs, and boundaries within 5 seconds without inspecting parent or sibling files.
>
> ⛔⛔⛔ **EXECUTIVE CANONICAL DIAMOND PROTOCOLS (WEB FRONTEND ARCHITECTURE) ⛔⛔⛔**
> The following diamond protocols are active from TURN 1 across ALL Web Frontend workflows:
> 1. **Anti-Deception ZIP Naming:** Intermediate archives MUST be labeled `frontend-{role}-v{N}-PARTIAL-rbg{X}.zip`. The label `frontend-{role}-v{N}-ALL-RBGS-COMPLETE.zip` is strictly forbidden unless 100% of RBGs (RBG 1..N) are closed and verified.
> 2. **Pre-Delivery Cross-Check Gate (Zero-Excuse Law):** Must execute and output the 3 physical verification tables (RBG Closure Ledger, Autonomous Submodule Physical File Ledger, and Canonical Rules Verification Sweep) before packaging. Post-delivery excuses ("Oh sorry, cross-check nahi kiya") are strictly banned as P0 audit fraud.
> 3. **1-Click Interactive Button Priority:** Publish RBG Plans and Checkpoints as actionable artifacts (`RequestFeedback: true`) or modals (`ask_question`) so user can approve via 1-click button instead of manual typing.
> 4. **Interactive Clarification Modal with (Recommended) Default:** All questions/decisions MUST use structured modals/checkboxes with Option 1 marked `(Recommended)`. Zero open-ended technical essay questions.
> 5. **Live Progress Heartbeat Telemetry:** Output concise, non-blocking progress lines (`✓ [Done]: ... ⚙️ [In Progress]: ...`). Use Roman Hinglish when conversational context benefits from it; keep statuses, evidence labels, code identifiers, file paths, and syntax in English so downstream tools can parse them reliably.
> 6. **Substantive Workload Density:** Calibrate RBGs by workload floor (min 8 findings / 4 files) and safety ceiling (max 25 findings / 18 files) for a balanced ~5–8 min sprint without token blowouts or hallucinations.

## RULE ENFORCEMENT & SEVERITY MODEL

Rules in this document are classified into three severity levels:

### P0 — Merge Blocker (Architecture Failure)
Security, authentication, tenant isolation, cross-feature business imports (Rule 63), secret leaks, API contract mismatches, broken routing, typecheck (`tsc --noEmit`) failure, or broken build.
A P0 failure means the feature MUST NOT be marked complete, approved, or delivered.

### P1 — Required Before Release
Accessibility (WCAG 2.2 AA), loading/empty/error states (Section 24), co-located test coverage, documentation freshness, responsive collapse, localization (`next-intl`), observability, and performance budgets.
A P1 failure must be repaired in the current session. If host-dependent verification is required (e.g., live browser E2E execution), it must be explicitly designated as `DEFERRED_TO_HOST_RUNTIME` with CLI verification commands and tracking evidence.

### P2 — Maintainability & Polish
Descriptive naming, file-size guidance reviews, JSDoc docstrings, organization, and visual consistency.
A P2 failure must be repaired whenever it materially improves isolation or maintainability.

### Honest Reporting Directive
The AI MUST NOT claim compliance that it cannot verify.
If a rule cannot be verified within the provided scope (e.g. missing live backend), report: `NOT_VERIFIED_IN_SCOPE` or `DEFERRED_TO_HOST_RUNTIME` with the exact missing evidence. False-positive compliance claims are strictly prohibited.

### Exception Rule
A deviation is valid only when documented using:
- Rule ID
- Reason
- Affected files
- Risk
- Compensating control
- Review / expiry date
- Human approver where required

---

## CRITICAL FRONTEND STRUCTURE GATE (NON-NEGOTIABLE)

> ⛔ **STRUCTURE INVARIANT & REPAIR PROTOCOL:**
> - **In Audit Mode:** Failing ANY item = ARCHITECTURE FAILURE. Record `NON_COMPLIANT` with file and line evidence.
> - **In Repair Mode:** Structural violations (folder names, missing documentation trio, duplicate route trees, barrel files) **MUST BE ACTIVELY REPAIRED FIRST (in RBG 1)** before repairing inner feature code.
> - **ANTI-STALL DIRECTIVE:** Structural non-compliance is the reason repair is required — it is **STRICTLY FORBIDDEN** to use structural violations as an excuse to halt, stall, refuse to repair, or declare code repair impossible.

Before generating, auditing, or repairing ANY frontend role module, verify ALL of the following:

| Verification Item | Requirement | Consequence of Failure |
|---|---|---|
| **Role Container** | Must be `src/app/frontend_{role}/` (e.g., `src/app/frontend_admin/`) | Unprefixed role container = ARCHITECTURE VIOLATION. In repair: move to canonical prefix in RBG 1. |
| **Canonical Feature Module** | Must be `{role}_{module}/` inside role container (e.g., `admin_members/`) | Generic name (`members/`) = NON_COMPLIANT. In repair: rename to prefixed module in RBG 1. |
| **No Duplicate Route Tree** | Exactly ONE canonical directory represents the feature. No parallel route tree within supplied scope. | Sibling duplicate (e.g. `dashboard/` + `admin_dashboard/`) = ARCHITECTURE VIOLATION. In repair: consolidate into canonical directory in RBG 1. (Do not demand host route trees). |
| **Root Quarantine** | Feature domain root (`src/app/frontend_{role}/{role}_{module}/`) contains ONLY `layout.tsx` (navigation wrapper/tab bar), `page.tsx` (submodule redirect), master documentation trio, and autonomous sub-module directories `{submodule}/`. 100% of feature business code lives inside autonomous sub-modules. Inside each autonomous sub-module, only route-entry files, `config/`, `contracts/`, and the Documentation Trio (`[role]_[submodule]_features.md`, `[role]_[submodule]_forbidden.md`, `[role]_[submodule]_theme_contract.md`) are allowed in its root. `contracts/host-stubs.d.ts` is the mandatory portability exception. | Any business code in domain root or non-quarantine file in sub-module root = NON_COMPLIANT. In repair: move to child sub-module in RBG 1. |
| **Sub-Module Sub-Folders & File Prefixing** | Inside autonomous sub-modules (`{domain}_{capability}/`), canonical standard subfolder names are used: `components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `constants/`, `locales/`, `mocks/`, `utils/`, `tests/`, `contracts/`, and `config/`. All business files inside them MUST carry the full unique prefix: `[Role][Submodule][Name]` (e.g., `ManagerAttendanceDashboardMetricCard.tsx`, `useManagerAttendanceDashboardMetrics.ts`); framework-reserved route files and locale JSON files follow their documented naming exceptions. Next.js framework dynamic routing folders (`[id]`, `[member_id]`, `[...slug]`, `@modal`, `_private`) are approved routing exceptions and may contain route-entry files only. Route groups like `(group)` are STRICTLY FORBIDDEN to prevent route conflicts. | Unprefixed file names, loose files, or route groups = NON_COMPLIANT. In repair: normalize in RBG 1. |
| **Sub-Module Nesting Depth & Qualification** | Maximum folder depth below `{role}_{module}/` is strictly 1 level (`{domain}_{capability}/`). Sub-submodules are STRICTLY FORBIDDEN. Submodules qualify strictly by secondary navigation tabs, distinct sub-routes, or independent lifecycle per the 5-Gate Matrix; internal modals, slide-overs, and wizard steps MUST live in `components/` (`[Submodule]Views/`, `[Submodule]Modals/`). Goldilocks file count: 5–20 files; zero nano-modules (< 3 files) and zero mega-modules (> 25 files). | Sub-submodules or nano-modules = ARCHITECTURE VIOLATION. In repair: flatten to depth = 1 in RBG 1. |
| **No Barrel Files** | NO `index.ts` or re-export facades. All imports must be direct absolute paths (`@/...`). | Barrel file = CIRCULAR DEPENDENCY RISK. In repair: remove barrel files and update imports in RBG 1. |
| **Sub-Module Documentation Trio** | Every autonomous sub-module MUST contain `[role]_[submodule]_features.md` (with structured YAML frontmatter, all 22 canonical sections, Section 20 Standalone Harness, Section 21 Portability Guide), `[role]_[submodule]_forbidden.md`, and `[role]_[submodule]_theme_contract.md`. | Missing doc artifact = INCOMPLETE MODULE. In repair: generate missing docs from source in RBG 1. |
| **Centralized URL Config** | `[role]_[submodule].url_config.ts` (or `config/[role]_[submodule].url_config.ts`) MUST exist and define all routes and API endpoints as `as const`. | Missing URL config = HARDCODED ROUTE RISK. In repair: generate centralized URL config in RBG 1. |
| **Universal API Envelope Contract** | Every API response MUST conform to the discriminated union `ApiResponse<T> = ApiSuccess<T> | ApiFailure` with `requestId`, `success: boolean`, typed `data` on success, and `errorCode`, `statusCode`, `message` on failure. | Ad-hoc or untyped API response = ARCHITECTURE VIOLATION. In repair: align to canonical envelope in RBG 1. |
| **Ambient Host Contract Stubs** | Every autonomous sub-module MUST declare or include `contracts/host-stubs.d.ts` (stubbing `@/lib/api`, `@/lib/logger`, `@/components/ui/*`, `@/lib/socket`, `@/lib/display_value`) guaranteeing 100% standalone TypeScript compilation (`tsc --noEmit`) and mock test execution when zipped. | Missing ambient stubs for external host contracts = PORTABILITY VIOLATION (P1). In repair: add `contracts/host-stubs.d.ts` in RBG 1. |
| **Production Edge-Case Safety Invariants** | Sub-module code MUST enforce: (1) `Idempotency-Key: UUIDv4` on state-changing mutations, (2) `displayValue()` fallback for nullable data, (3) ≥300ms search debounce, (4) min-w/min-h loading stabilization (CLS < 0.1), (5) toast deduplication `toastId`, (6) `@tanstack/react-virtual` for lists > 50 items, (7) zero client secret exposure, (8) zero business entity persistence in `localStorage`. | Missing safety guards = NON_COMPLIANT. In repair: add required edge-case safety guards in RBG 1. |

> ⛔ **Skipping this gate in audit invalidates downstream compliance results. In repair, all structural defects must be resolved in RBG 1.**

---

Currently, no one writes code manually; AI writes it. Because of this, my primary goal is extreme isolation. **Primary isolation goal:** Prefer single-file repair when the dependency graph allows it. The guaranteed isolation boundary is the owning module. An AI MUST NOT require unrelated business modules for a module-local repair. However, the folder architecture must remain highly organized and visually logical so that human developers can easily navigate it without getting lost in a flat directory of 50+ files.

---

## PLATFORM APPLICABILITY MATRIX

This document governs the **web frontend only** (Next.js / React / TypeScript / Tailwind CSS). Do NOT apply these rules to the React Native mobile application; consult `MOBILE_UI_UX_DESIGN.md` for mobile-specific conventions.

| Concern | Applies To | Notes |
|---|---|---|
| Next.js App Router, RSC, `page.tsx`/`layout.tsx` | Web only | |
| Tailwind CSS, `globals.css`, CSS variables | Web only | |
| Zustand, TanStack Query v5, React Hook Form v7 | Web only | |
| MSW (browser service worker) | Web only | |
| Playwright E2E | Web only | |
| Semantic HTML, ARIA, WCAG 2.2 AA | Web only (RN uses AccessibilityInfo) | |
| Token naming, color palette concepts | Both platforms | Values differ per platform |
| Feature isolation, module naming, AI repair boundary | Both platforms | |
| Security principles (auth, permissions, PII) | Both platforms | |

**Conflict Resolution Hierarchy:** When rules in this document conflict across documents, resolve using the **Master Cross-Document Precedence Order** defined at the top of this document (Security/Privacy > Platform/A11y > Explicit Contracts > Normative Architecture V1 > UI/UX Design > Execution Workflow V2.11 / Standalone Mode > Documentation Trio > Conventions). Within internal concerns, apply:
1. **Security & Privacy** — authentication, authorization, PII handling, XSS prevention
2. **Legal / Compliance** — WCAG 2.2 AA, data protection, financial regulations
3. **Accessibility** — keyboard navigation, screen-reader support, reduced motion
4. **Platform Conventions** — browser/Next.js expected behavior
5. **Product Requirements** — documented business feature needs
6. **Architecture Rules** — isolation, naming, state management
7. **Visual Preferences** — colors, spacing, micro-animations

Deviations from this hierarchy MUST be documented in the affected module's `[moduleName]_features.md`.

### Cross-Platform Backend Interaction Boundary & Separation of Concerns Scope Note

> ⛔ **BACKEND ARCHITECTURE SEPARATION OF CONCERNS:**
> This document strictly governs the **Web Frontend Client Tier** (Next.js / React / TypeScript / Tailwind CSS).
> - **Backend Architectural Patterns Out of Scope for Frontend:** Server-side event-driven architecture patterns (including the Transactional Outbox Pattern, Redis Streams, Kafka event topics, Saga workflow orchestrators, CQRS write/read model segregation, database transaction boundaries, and NestJS/Django service layers) are strictly governed by their dedicated specification: `BACKEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`.
> - **Frontend Interaction Boundaries:** The Web Frontend client interacts with backend services strictly via:
>   1. **RESTful / RPC Command Endpoints:** Mutation operations MUST attach an `Idempotency-Key: UUIDv4` HTTP header (preventing double-submission / race conditions) and conform to the canonical `ApiResponse<T>` envelope.
>   2. **WebSockets:** Real-time data streams (e.g., live attendance tracking, notifications) are consumed exclusively through the centralized `socket.io-client` adapter (`@/lib/socket`). SSE is not part of the approved frontend transport baseline.
>   3. **Strict Isolation:** The frontend client NEVER interacts directly with backend database stores, cache layers, or message brokers. All communication crosses the API Gateway boundary.

---

## TECHNOLOGY BASELINE (Mandatory — Not Illustrative)

All entries below are **required** unless explicitly marked as optional. AI agents MUST NOT substitute or mix alternative libraries without a documented, approved exception.

| Concern | Required Technology | Locked Version / Notes |
|---|---|---|
| Framework | Next.js (App Router) | See `package.json` for locked version. Server Components by default. |
| Language | TypeScript | `strict: true`, `noImplicitAny`, `strictNullChecks`, `verbatimModuleSyntax` |
| Package Manager | `npm` | Do NOT use `yarn`, `pnpm`, or `bun` unless `package.json` already uses one. Check first. |
| Node Version | ≥20 LTS | Verify in `.nvmrc` or `engines` field of `package.json`. |
| Styling | Tailwind CSS v4 + CSS variables via `globals.css` | No inline styles, no CSS Modules for business UI. |
| Server State | TanStack Query **v5** | `useMutation.isPending`, not `isLoading`. See Rule 15C. |
| Client State | Zustand (module-scoped) | No single global store. |
| Forms | React Hook Form **v7** + Zod + `@hookform/resolvers` | No Yup, no Joi. See Rule 15B. |
| Validation | Zod | At API boundary (runtime) and form layer (client). |
| HTTP Client | Global `apiFetch` wrapper at `src/lib/api.ts` | Never use `fetch`/`axios` directly in feature code. |
| Real-Time | `socket.io-client` (WebSocket only) | No SSE, no Pusher, no Supabase real-time. See Rule 21. |
| Icons | `lucide-react` | Size 18px, strokeWidth 2. No mixing icon families. |
| Charts | `react-apexcharts` | Recharts and Chart.js are **forbidden**. |
| Date/Time | `date-fns` | 3.x. No `moment.js`, no `dayjs`. See Rule 24 & Approved Registry. |
| Fonts | `next/font/google` (Inter) | No Google Fonts CDN `@import`. See Rule 56. |
| Images | `next/image` | Raw `<img>` forbidden except documented exceptions. See Rule 33. |
| i18n | `next-intl` | Co-located locale files per module. See Rule 18 / Locale Naming. |
| Unit/Component Tests | Vitest + React Testing Library | |
| API Mocking | MSW (Module Service Worker) | Module-owned handlers. See Rule 75. |
| E2E Tests | Playwright | Separate `playwright_E2E/` directory. See Rule 15A. |
| Linting | ESLint + `@typescript-eslint` + `eslint-plugin-boundaries` | See Rule 61. |
| Formatting | Prettier | |
| Pre-commit | Husky + lint-staged | `tsc --noEmit` + ESLint + format check. See Rule 61. |
| Error Monitoring | Approved adapter (Sentry or equivalent) | See Rule 15E. |
| Deployment | See infrastructure docs | Verify `NEXT_PUBLIC_*` env vars. See Rule 15D. |

> **AI AGENT NOTE:** Before adding any new library, check `package.json` first (Rule 62). Declare explicitly why no existing approved library satisfies the need.

---

Please follow these strict architectural rules:

1. **Micro-Modularization, Canonical Sub-folders & File Size Ceilings (Crucial)**: 
Break down all large or mixed files. Every **React component file** MUST contain one primary React component. Non-component files MAY contain multiple closely related declarations when they represent one cohesive responsibility, such as an API service for one entity family, a schema family, or a constants set. **CRITICAL:** Do not dump all these micro-files into a single flat directory. Group them logically into canonical sub-folders within the autonomous sub-module (`components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `utils/`, `mocks/`, `tests/`, `contracts/`). 
**The 5-Second Comprehension Invariant:** Every file and folder MUST be organized such that an AI agent or engineer understands its exact purpose, role, inputs, and boundaries within 5 seconds without reading past line 5 or inspecting parent/sibling files.
**CANONICAL SUB-MODULE SUB-FOLDERS & FILE PREFIXING (UNIVERSAL STANDARD):** Inside each autonomous sub-module container (`src/app/frontend_{role}/{role}_{domain}/{domain}_{capability}/`), internal business artifacts MUST be organized into canonical standard sub-folders: `components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `utils/`, `mocks/`, `tests/`, `config/`, and `contracts/`. To prevent AI context dilution and eliminate name collisions when referencing files across modules, EVERY file inside these sub-folders MUST carry the canonical Role+Submodule prefix: `[Role][Submodule][Name]` in PascalCase for components (e.g., `SuperadminAnalyticsDashboardKpis.tsx`), camelCase for hooks (e.g., `useSuperadminAnalyticsDashboardMetrics.ts`), and snake_case for api/configs (e.g., `superadmin_analytics_dashboard.api.ts`). Loose files at the domain or sub-module root (other than route entry files, config, and the documentation trio) are STRICTLY FORBIDDEN.
**File Size Ceiling:** React Component: hard maximum 300 lines. If a component's JSX grows beyond that, extract sub-sections into their own child component files inside the same feature folder to force real component-level granularity.

### Extended File Size Ceilings (Hard Ceilings — Zero Exceptions)

> ⛔ **HARD CEILING: Exceeding ANY line count below = IMMEDIATE ARCHITECTURE FAILURE (`NON_COMPLIANT`).**
> **Do NOT mark PASS. Split the file immediately using the procedure below.**

| File Type | Max Lines | Action When Exceeded | Consequence of Violation |
|---|---|---|---|
| React Component (`.tsx`) | **300 lines** | Extract sub-sections into child components in `components/` | Context dilution, re-render cascades, untestable monolithic JSX |
| Custom Hook (`use*.ts`) | **150 lines** | Split into sub-hooks by concern (e.g. `useTableFilters`, `useTableSort`) in `hooks/` | Mixed state/effect spaghetti, broken memoization |
| Utility / Formatter file | **120 lines** | Split into domain-specific formatters inside `utils/` | Unfocused utility soup, untraceable side-effects |
| Zustand Store (`use*Store.ts`) | **180 lines** | Split slices into sub-slice creators or separate module-scoped stores in `state/` | Giant monolithic stores, unnecessary re-renders |
| Zod Schema / Type file | **200 lines** | Split into separate DTO / entity schema files inside `schemas/` and `types/` | Type inference slowdowns, circular type dependencies |
| API Service file (`*Api.ts`) | **200 lines** | Split by entity operation (e.g. `*CrudApi.ts`, `*ExportApi.ts`, `*PaymentApi.ts`) in `api/` | Giant monolithic API blobs, violation of Rule 31 |

### Child Component Size Rule
If a component contains more than **3 major visual sections**, it MUST be split.
- ✅ **GOOD:** `AdminMembersMain` split into `AdminMembersHeader`, `AdminMembersFilters`, `AdminMembersKpis`, `AdminMembersTable` (separate components).
- ❌ **BAD:** A 250-line monster file containing the entire page layout.

### File Ceiling Splitting Procedure (Mandatory)
If a file exceeds its limit:
1. Split by **feature responsibility**, not randomly by line count.
2. Do NOT create generic dumping folders such as `helpers/`, `common/`, or `misc/`.
3. Keep extracted files strictly inside the same feature module sub-folder.
4. Update co-located tests and documentation maps in the same change.

Next.js App Router uses Server Components by default, so you MUST explicitly include `"use client";` at the top of any file that uses hooks (`useState`, `useEffect`) or event listeners.

## 1A. Complete Module Self-Containment Contract

Every feature/module must be self-contained to the maximum practical extent.

Everything that is specific to a feature/module MUST live inside that module's root folder.

This includes:

- Components
- Hooks
- Module-scoped Zustand state
- API clients
- Types
- Schemas
- Constants
- Utilities
- Feature-specific formatters
- Tests
- Mock fixtures
- MSW handlers
- Feature documentation
- Forbidden-pattern documentation
- Theme contract documentation
- Other feature-specific configuration or test-support files

Nothing that is specific to a module's business behavior may be moved into a generic global folder merely for convenience.

The purpose of this rule is AI context isolation:

If an AI agent is asked to fix a bug inside one module, the primary required context MUST be the module folder itself. The module MUST contain the code, tests, mock behavior, and documentation required to understand and safely modify that module.

### Application Infrastructure Boundary

Some framework/application infrastructure MUST remain outside feature modules because it represents application-wide plumbing that cannot safely or meaningfully be duplicated per feature.

Allowed application-level infrastructure includes only genuinely global infrastructure such as:

* Framework-required application routing/layout infrastructure
* Global API transport/base HTTP client
* Global authentication/session/token infrastructure
* Global error-monitoring adapter
* Global application configuration
* Global logging infrastructure
* Global design-system primitives that contain zero business logic
* Global MSW bootstrap/registration infrastructure
* Other framework/application plumbing that is explicitly documented as global

IMPORTANT:

The existence of multiple consumers does NOT automatically make a file global infrastructure.

A file qualifies as application infrastructure only when ALL of the following are true:

1. It provides framework/application plumbing.
2. It contains zero feature-specific business behavior.
3. It is intentionally application-wide.
4. Duplicating it per feature would create conflicting, invalid, or unnecessary framework behavior.
5. Its responsibility is stable and explicitly documented.

The following are NOT global infrastructure:

* feature-specific business components
* feature-specific hooks
* feature-specific stores
* feature-specific API services
* feature-specific types
* feature-specific schemas
* feature-specific constants
* feature-specific utilities
* feature-specific validators
* feature-specific formatters
* feature-specific mock fixtures
* feature-specific MSW handlers
* feature-specific tests
* feature-specific business workflows
* feature-specific permissions
* feature-specific business configuration

Do NOT create a global business layer merely to avoid duplication.

If two features contain similar business behavior, duplication is allowed and is preferred when duplication improves AI isolation and feature portability.

### The "Shared Folder" Trap & Strict WET Invariant

A common architectural antipattern is attempting to resolve cross-module needs by creating a `shared/` or `common/` dumping ground (e.g. `src/shared/`, `src/common/`, `src/components/shared/`, or role-level `frontend_{role}/shared/`).
- **THE TRAP:** Within weeks, developers and AI agents place domain cards, date filters, member status pills, entity dropdowns, and business hooks into `shared/`. Then, modifying a component to satisfy Feature A silently breaks Feature B and Feature C, causing cross-module regressions and destroying tree-shaking.
- **THE LAW:** Generic zero-business infrastructure belongs in `src/lib/` or `src/components/ui/` ONLY. Any component, hook, utility, or type containing a business noun, domain status, or business rule MUST remain strictly feature-local. If two features require similar business UI or logic, DUPLICATE IT LOCALLY under the Strict WET Principle. Creating `shared/` directories for business logic is STRICTLY FORBIDDEN.

> ⛔ **ABSOLUTE PROHIBITION — AI AGENTS (CRITICAL ISOLATION INVARIANT):** 
> **NEVER attempt to "DRY up" business components by moving them to global folders like `src/components/ui/` or `src/shared/`.** 
> **Components like "Date Filters", "Business Dropdowns", "Status Badges", or formatters that contain domain-specific data/constants (e.g. "Last 3 Months", "Active") MUST be duplicated per feature, NEVER globalized.** 
> `src/components/ui/` is strictly for dumb, zero-business primitives (like raw Buttons, Inputs, Dialogs).
> **Consequence of violation:** AI modifying a shared business component to fix Module A will silently break Module B, triggering cross-module regression cascades and defeating bundle tree-shaking.
> **Finding ANY business logic inside `src/components/ui/` or global folders = IMMEDIATE NON_COMPLIANT AUDIT FAILURE.**

### The Feature ZIP Guarantee (Self-Sufficiency Invariant)

Every feature module MUST satisfy the **Feature ZIP Guarantee**:
1. An AI agent or human developer MUST be able to zip ONLY the feature folder (`src/app/frontend_{role}/{role}_{module}/`) along with the Documentation Trio (`[moduleName]_features.md`, `[moduleName]_forbidden.md`, `[moduleName]_theme_contract.md`), drop it into an isolated prompt or project, and completely understand, run, mock, test, and repair it.
2. The feature MUST NEVER require sibling feature code or ask for other role folders.
3. All dependencies on application-level infrastructure (API transport, theme tokens, icons) MUST be satisfied through the documented Core Application Contracts.
4. **Scope of Isolated Sub-Module Testing vs Host E2E:** Inside the isolated sub-module ZIP, 100% self-sufficient testing is achieved via local integration tests and the mock scenario harness (`tests/` and `tests/harness/` with in-memory MSW scenarios). Full-system Playwright E2E test suites reside in the host repository (`playwright_E2E/frontend_{role}_e2e/{role}_{feature}/`) and are classified as `DEFERRED_TO_HOST_RUNTIME` when auditing/testing an isolated sub-module ZIP in a browser-less or standalone AI environment. An isolated sub-module ZIP is 100% self-sufficient for unit, component, and scenario-based harness testing without requiring host Playwright E2E runners.

### Zero Hidden Dependency Principle & Host Contract

A module MUST NEVER rely on implicit global state, unstated route query parameters, or undocumented host runtime contexts.
Every external host capability consumed by the module MUST declare its **Expected Shape** explicitly inside `[moduleName]_features.md` under `## Approved External Dependencies`:
- **Auth Session Shape:** e.g., `interface ExpectedAuthUser { id: string; role: Role; branchId: string; }`
- **Theme Contract:** e.g., `@theme inline` tokens consumed from `globals.css` listed in `[moduleName]_theme_contract.md`
- **API Transport:** e.g., `apiFetch<T>(endpoint, options): Promise<ApiResponse<T>>`
- **Zero Hidden Route Dependencies:** A module must extract all route parameters through typed Next.js `params` or its centralized `[moduleName]_url_config.ts`.

### Mandatory Ambient Host Stubs (`contracts/host-stubs.d.ts`)

> ⛔ **THE SUB-MODULE STANDALONE COMPILATION GUARANTEE:**
> When an autonomous sub-module (e.g., `attendance_dashboard/`) is zipped and handed to an external AI agent or isolated CI environment, the host application files (`@/lib/api`, `@/lib/logger`, `@/components/ui/*`, `@/lib/socket`, `@/lib/display_value`) may not physically exist inside the zip.
> To guarantee that `tsc --noEmit` and mock tests compile and run with 100% mathematical certainty, every sub-module MUST declare or include ambient TypeScript type stubs inside `contracts/host-stubs.d.ts`:

```typescript
// contracts/host-stubs.d.ts
// Ambient host contracts enabling 100% standalone compilation & execution when zipped
declare module '@/lib/api' {
  export interface ApiSuccess<T> {
    success: true;
    message: string;
    data: T;
    meta?: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
    requestId: string;
  }
  export interface ApiFailure {
    success: false;
    message: string;
    data: null;
    error?: string;
    errorCode: string;
    statusCode: number;
    requestId: string;
    validationErrors?: Array<{ field: string; message: string }>;
  }
  export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
  export function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>;
}

declare module '@/lib/logger' {
  export const logger: {
    info: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
    warn: (message: string, ...args: unknown[]) => void;
    debug: (message: string, ...args: unknown[]) => void;
  };
}

declare module '@/lib/socket' {
  export const socketService: {
    subscribe: <T>(event: string, callback: (data: T) => void) => () => void;
    emit: (event: string, payload: unknown) => void;
  };
}

declare module '@/lib/display_value' {
  export function displayValue(value: unknown): string;
}

declare module '@/components/ui/*' {
  import type React from 'react';
  // Ambient fallback stubs for host UI primitives during isolated compilation.
  // Uses generic Record<string, unknown> with PropsWithChildren to satisfy strict Rule 27 (zero raw any).
  export type StubComponentProps = React.PropsWithChildren<Record<string, unknown>>;
  const Component: React.FC<StubComponentProps>;
  export default Component;
  export const Button: React.FC<StubComponentProps>;
  export const Dialog: React.FC<StubComponentProps>;
  export const Input: React.FC<StubComponentProps>;
  export const Card: React.FC<StubComponentProps>;
}
```

### Feature Dependency Budget (Maximum 7 Core Infrastructure Dependencies)

To guarantee portability and prevent spaghetti coupling, every feature module operates under a strict **External Dependency Budget**:
- A feature module MUST NOT import from more than **7 distinct core application infrastructure files** (e.g., `@/lib/api`, `@/lib/logger`, `@/components/ui/button`, `@/components/ui/dialog`, `@/lib/socket`, `@/lib/display_value`, `@/lib/auth`).
- If a feature module requires more than 7 external infrastructure imports, it indicates that the module is over-coupled or trying to do too many unrelated things. It MUST either:
  1. Internalize helper logic locally (Strict WET), or
  2. Split into distinct sub-feature modules.

### The Copy-Paste Test & Feature Removal Test (Deletion Safety)

Every feature module must pass two mechanical portability tests before it is approved for production:
1. **The Copy-Paste Test:** If you copy the feature folder `src/app/frontend_{role}/{role}_{module}/` into an empty host application that supplies only the 7 standard core infrastructure contracts and run `npm test`, all module unit tests and MSW mock scenarios MUST pass immediately with zero compilation errors.
2. **The Feature Removal Test (Deletion Safety):** If an engineer completely deletes the feature folder `src/app/frontend_{role}/{role}_{module}/` from the project:
   - The project TypeScript build (`tsc --noEmit`) MUST STILL PASS.
   - All sibling modules (`{role}_billing`, `{role}_reports`, etc.) MUST CONTINUE TO RUN with zero missing import errors.
   - If deleting a feature breaks another feature's build, the architecture has FAILED the isolation invariant.

### Universal Day-1 Sub-Module Architecture (Zero Exceptions, Zero Refactoring)

> ⛔ **UNIVERSAL LAW: EVERY FEATURE IN THE SYSTEM IS ORGANIZED INTO SUB-MODULES FROM DAY 1**
>
> There are NO special cases, NO file-count thresholds, and NO hardcoded exceptions based on whether a feature has "one screen" or "multiple screens".
> 
> **Every single feature domain across the entire application — whether `manager_profile`, `manager_settings`, `manager_attendance`, `manager_notifications`, or `manager_billing` — MUST be structured as an autonomous Sub-Module Container right from Day 1.**
>
> An engineer or AI agent is STRICTLY FORBIDDEN from creating loose `components/`, `hooks/`, `api/`, `mocks/`, or `utils/` at the domain root level. 100% of executable source code, mocks, and tests MUST live inside a dedicated `{sub_module}/` folder.

#### The Universal 4-Tier Hierarchy:

```text
TIER 1: APPLICATION ROOT (src/app/)
  └── TIER 2: ROLE CONTAINER (e.g., src/app/frontend_manager/)
        └── TIER 3: FEATURE DOMAIN CONTAINER (e.g., manager_profile/, manager_attendance/, manager_settings/)
              ├── layout.tsx                                    # Pure UI Shell / Sub-Nav Tab Bar (zero business code)
              ├── page.tsx                                      # Default redirect to primary sub-module
              ├── [role]_[domain]_features.md                   # High-level domain architectural map
              ├── [role]_[domain]_forbidden.md                  # High-level domain boundaries
              ├── [role]_[domain]_theme_contract.md             # High-level domain theme contract
              │
              ├── TIER 4: AUTONOMOUS SUB-MODULE (e.g., attendance_dashboard/ — 100% Autonomous AI Repair & ZIP Unit)
              │    ├── page.tsx / loading.tsx / error.tsx       # Next.js route entry files
              │    ├── config/[role]_[submodule].url_config.ts  # Centralized route & API endpoints
              │    ├── contracts/host-stubs.d.ts                # Ambient host stubs for standalone compilation
              │    ├── [role]_[submodule]_features.md           # Canonical 22-section specification
              │    ├── [role]_[submodule]_forbidden.md          # Sub-module boundary & WET directives
              │    ├── [role]_[submodule]_theme_contract.md     # Sub-module design token bindings
              │    ├── components/                              # [Role][Submodule][Name].tsx
              │    ├── hooks/                                   # use[Role][Submodule][Name].ts
              │    ├── api/                                     # [role]_[submodule].api.ts & query keys
              │    ├── state/                                   # use[Role][Submodule]Store.ts
              │    ├── types/ & schemas/                        # Zod schemas & types
              │    ├── mocks/                                   # scenarios/, fixtures, MSW handlers
              │    ├── utils/                                   # Feature-local formatters
              │    └── tests/                                   # Co-located unit & integration tests
              │
              └── {sub_module_2}/                               # Additional Sub-Features (Day 1 or Future)
                   └── ... (identical canonical micro-structure)
```

#### Concrete Proof Across ALL Domains (No Exceptions):

| Feature Domain | Day-1 Initial Sub-Module | Future / Additional Sub-Modules |
|---|---|---|
| **Profile** (`manager_profile/`) | `profile_overview/` | `profile_security/`, `profile_preferences/` |
| **Settings** (`manager_settings/`) | `settings_general/` | `settings_notifications/`, `settings_integrations/` |
| **Attendance** (`manager_attendance/`) | `attendance_dashboard/` | `attendance_history/`, `attendance_analytics/`, `attendance_biometrics/` |
| **Billing** (`manager_billing/`) | `billing_invoices/` | `billing_subscriptions/`, `billing_payment_methods/` |
| **Members** (`manager_members/`) | `members_directory/` | `members_profile/`, `members_attendance/` |
| **Notifications** (`manager_notifications/`) | `notifications_inbox/` | `notifications_preferences/`, `notifications_templates/` |

#### Why the Universal Day-1 Rule Kills 100% of AI Hallucinations:
1. **Zero Guesswork:** An AI NEVER has to ask *"Is this 1 screen or 2 screens? Should I put mocks at root or in a subfolder?"* The answer is ALWAYS: **All code lives inside `{sub_module}/`. The domain root is a pure shell.**
2. **Zero Refactoring Forever:** When `manager_profile` gets a `profile_security` tab in month 6, nobody breaks or moves existing files. `profile_overview/` remains completely untouched. You simply add a new sibling folder `profile_security/`!
3. **Predictable AI ZIP Guarantee:** The AI repair unit is ALWAYS `frontend_{role}/{role}_{domain}/{sub_module}/`. An engineer zips only that sub-module, giving any AI a clean 10-15 file context with 100% working mocks and tests.

#### ⛔ The Forbidden Root Code Monolith (Zero Root Code In Domain Folder):
It is **STRICTLY FORBIDDEN** to create loose `mocks/`, `utils/`, `api/`, or `components/` at the feature domain root:
```text
❌ FORBIDDEN ROOT POLLUTION:
manager_profile/
├── mocks/                  <-- ❌ FORBIDDEN! Mocks must live inside profile_overview/mocks/!
├── components/             <-- ❌ FORBIDDEN! Components must live inside profile_overview/components/!
└── profile_overview/
```
The domain root contains ONLY `layout.tsx` (navigation wrapper) and `page.tsx` (redirect). 100% of feature code lives inside sub-modules.

#### Meaningful Domain-Prefixed Submodule Naming Standard & The Clarity-Over-Brevity Law:
Every submodule folder MUST follow the exact semantic formula: `{domain}_{capability}` or `{domain}_{screen_intent}`:
- **The Clarity-Over-Brevity Law (Zero Penalty for Long Descriptive Names):**
  - **Clarity is King; Brevity is strictly subordinated.** Never artificially shorten, compress, or truncate module or submodule folder names.
  - There is **ZERO PENALTY for long descriptive names**. If a submodule needs multiple descriptive words to convey 100% of its internal capabilities and business purpose (e.g. `seat_allocation_and_booking/`, `shift_timings_and_slot_management/`, `locker_assignment_and_key_tracking/`, `attendance_biometric_device_synchronization/`, `accounting_asset_depreciation_and_maintenance/`), **IT MUST BE FULLY EXPANDED**.
  - A developer or AI looking ONLY at the directory tree in a terminal (`ls` or `tree`) MUST instantly know 100% of what is inside without opening a single file.
- ✅ **Compliant Examples:** `attendance_dashboard/`, `attendance_history/`, `attendance_biometrics/`, `seat_allocation_and_booking/`, `shift_timings_and_slot_management/`, `locker_assignment_and_key_tracking/`, `billing_invoices/`, `billing_subscriptions/`, `members_directory/`, `members_detail/`.
- **The 5-Second Comprehension Invariant:** Anyone (developer or AI agent) inspecting ONLY the submodule folder name MUST instantly know within 5 seconds its parent domain and exact business capability/screen intent.
- ❌ **Strictly Banned Cryptic Abbreviations & Truncations:** Never use lazy truncated shorthands (e.g., `seat_alloc/`, `crm_enq/`, `acc_ast/`, `stf_rost/`, `inv_eqp/`, `bio_sync/`).
- ❌ **Strictly Banned Lazy/Ambiguous Names:** Never use generic or lazy names such as `tab1/`, `tab2/`, `main/`, `default/`, `home/`, `view/`, `details/` (must be `members_detail`), `common/`, `shared/`, `temp/`, or `misc/`. Lazy names are treated as **Critical Naming Violations**.


### Sub-Module Isolation Firewall (Zero Cross-Sub-Module Imports & Sub-Module ZIP Guarantee)

> ⛔ **ABSOLUTE RULE: SIBLING SUB-MODULES ARE 100% UNRELATED AT SOURCE CODE LEVEL**
> 
> When an oversized feature is split into sub-navigation domain folders (e.g., `attendance/` split into `attendance_dashboard/`, `attendance_history/`, `attendance_analytics/`, `attendance_biometrics/`), the **Zero Cross-Module Relationship & 100% Isolation Law** applies with identical, ruthless strictness between sibling sub-folders:
>
> 1. **Zero Cross-Sub-Module Imports (Absolute Decoupling):**
>    - `attendance_dashboard` MUST NEVER import any component, hook, state, type, mock, or utility from `attendance_history`.
>    - `attendance_history` MUST NEVER import anything from `attendance_analytics` or `attendance_dashboard`.
>    - Neither sub-folder has ANY knowledge of the internal code, state, or types of any sibling sub-folder.
>
> 2. **100% Self-Contained Sub-Module Directory:**
>    - Every sub-navigation folder is an autonomous, complete micro-modular application:
>      ```text
>      attendance/
>      ├── attendance_dashboard/
>      │    ├── components/
>      │    ├── hooks/
>      │    ├── api/
>      │    ├── state/
>      │    ├── types/
>      │    ├── schemas/
>      │    ├── mocks/
>      │    ├── tests/
>      │    ├── attendance_dashboard_features.md
>      │    ├── attendance_dashboard_forbidden.md
>      │    └── attendance_dashboard_theme_contract.md
>      ├── attendance_history/
>      │    ├── components/
>      │    ├── hooks/
>      │    ├── api/
>      │    ├── state/
>      │    ├── types/
>      │    ├── schemas/
>      │    ├── mocks/
>      │    ├── tests/
>      │    ├── attendance_history_features.md
>      │    ├── attendance_history_forbidden.md
>      │    └── attendance_history_theme_contract.md
>      ├── attendance_analytics/
>      └── attendance_biometrics/
>      ```
>
> 3. **Parent Shared Folders Are STRICTLY FORBIDDEN:**
>    - Creating a shared folder inside the parent (e.g. `attendance/common/`, `attendance/shared/`, or `attendance/components/`) is **STRICTLY PROHIBITED**.
>    - *Why?* A shared parent folder immediately breaks the AI Zip Guarantee. If `attendance_history` depends on `attendance/common/`, zipping only `attendance_history/` will produce broken imports and compilation errors for an AI.
>
> 4. **Strict WET (Write Everything Twice) Between Sub-Modules:**
>    - If both `attendance_dashboard` and `attendance_history` require an `AttendanceStatusBadge`, a date range picker, or a table row formatter, each sub-module MUST define its own copy locally inside its own `components/` or `utils/`.
>    - If the UI element is a pure, domain-agnostic primitive with zero business rules (e.g. generic `<Button>`, `<Dialog>`), it is consumed from core application UI (`@/components/ui/`). But any business-aware UI or logic MUST be duplicated locally.
>
> 5. **The Sub-Module ZIP Guarantee (Granular AI Repair Unit):**
>    - If a bug occurs in `attendance_history`, the developer does NOT need to zip the entire parent `attendance/` folder.
>    - The developer zips **ONLY `attendance_history/`**!
>    - An AI receiving `attendance_history.zip` has 100% complete context, runs its own local unit tests, runs its own MSW mocks, reads its own Documentation Trio, and repairs the bug in one shot with zero missing dependency errors.
>
> 6. **Sub-Module Deletion Safety (Zero Blast-Radius):**
>    - If an engineer completely deletes `attendance_analytics/` or `attendance_biometrics/`:
>      - `tsc --noEmit` MUST compile with zero errors.
>      - `attendance_dashboard` and `attendance_history` MUST continue to build, render, and pass all tests without missing a single import.
>
> 7. **Navigation & Inter-Module Communication Boundary:**
>    - The ONLY permissible communication between sibling sub-modules is via **URL Navigation & Typed Query Parameters** (e.g., navigating from Dashboard to History via `router.push('/attendance/history?employeeId=EMP001')`).
>    - Sibling sub-modules MUST NEVER share React Context, Zustand stores, or in-memory state.
>
> 8. **Sub-Module Role+Submodule Naming Invariant (AI Anti-Hallucination):**
>    - To eliminate AI naming hallucinations across split sub-modules, all artifacts MUST carry the full `[Role][Submodule]` prefix:
>      - Components: `[Role][Submodule][Name].tsx` (e.g., `ManagerAttendanceDashboardMetricCard.tsx`, `ManagerAttendanceHistoryFilterBar.tsx`).
>      - Custom Hooks: `use[Role][Submodule][Name].ts` (e.g., `useManagerAttendanceDashboardMetrics.ts`).
>      - Local Stores: `use[Role][Submodule]Store.ts` (e.g., `useManagerAttendanceDashboardStore.ts`).
>      - URL Config: `config/[role]_[submodule].url_config.ts`.
>      - Query Keys: `api/[role]_[submodule].query_keys.ts`.
>      - Documentation Trio: `[role]_[submodule]_features.md`, `[role]_[submodule]_forbidden.md`, `[role]_[submodule]_theme_contract.md`.
>
> 9. **Zero Root Code in Parent Domain Folder (Parent Quarantine):**
>    - The parent grouping folder (e.g., `attendance/`) MUST NOT contain loose executable source files, shared hooks, or root components.
>    - It serves exclusively as a filesystem directory containing the self-contained sub-modules. Any top-level layout or tab switcher lives in the shell/navigation layer, never as an un-isolated business component directly inside `attendance/`.
>
> 10. **Query Key & MSW Mock Namespace Separation:**
>     - Each sub-module MUST isolate its TanStack Query keys with its own distinct sub-module namespace:
>       ```typescript
>       export const managerAttendanceDashboardKeys = { all: ['manager', 'attendance', 'dashboard'] as const }
>       export const managerAttendanceHistoryKeys = { all: ['manager', 'attendance', 'history'] as const }
>       ```
>     - MSW mock handlers MUST mock distinct sub-feature REST endpoints (e.g., `/api/manager/attendance/dashboard/metrics` vs `/api/manager/attendance/history`). Cross-sub-module query invalidation or shared cache keys are STRICTLY FORBIDDEN.
>
> 11. **Strict Maximum Nesting Depth Law (The Depth Limit Invariant — Sub-Submodules Strictly BANNED):**
>     - Hierarchy depth below the Domain Container (`{role}_{domain}/`) is **STRICTLY BOUNDED TO EXACTLY 1 LEVEL** (`{domain}_{capability}/`).
>     - Tier 4 (`src/app/frontend_{role}/{role}_{domain}/{domain}_{capability}/`) is the **absolute terminal leaf feature execution unit**.
>     - **Sub-submodules are STRICTLY FORBIDDEN:** Creating nested folders inside a sub-module that act as child sub-modules (e.g., `attendance_history/details/` or `attendance_history/table/`) is a **CRITICAL P0 ARCHITECTURE VIOLATION**. All decomposition inside a sub-module happens PURELY via standard canonical category folders (`components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `constants/`, `locales/`, `mocks/`, `utils/`, `tests/`, `contracts/`, `config/`).
>     - Multi-step forms, secondary tabs, detail panels, slide-over drawers, or modals inside a sub-module MUST live inside that sub-module's `components/` folder (e.g. `components/[Submodule]Views/`, `components/[Submodule]Modals/`, `components/[Submodule]Drawers/`), driven by React state or URL search parameters (`?view=`), NEVER by nesting sub-submodule folders.
>
> 12. **Deterministic 5-Gate Sub-Module Qualification Decision Matrix (How AI Decides Sub-Module vs Internal View):**
>     When designing, creating, or auditing features, the AI MUST follow this deterministic decision matrix. Never guess or arbitrarily invent sub-modules:
>
> | Level | Granularity Criteria | Location & Structure | Correct Example | FORBIDDEN Anti-Pattern |
> |---|---|---|---|---|
> | **Domain Container (Tier 3)** | Primary clickable item in role's sidebar/primary drawer. Contains high-level business domain. | `src/app/frontend_{role}/{role}_{domain}/` | `manager_attendance/`, `admin_billing/` | Merging separate sidebar items (`manager_finance_and_expenses/`) |
> | **Autonomous Sub-Module (Tier 4)** | Distinct secondary navigation tab, independent sub-route segment, or standalone operational capability with its own lifecycle. | `{domain}_{capability}/` directly under `{role}_{domain}/` (Depth = 1) | `attendance_dashboard/`, `attendance_history/`, `attendance_biometrics/` | Nested sub-submodule (`attendance_history/details/`) or generic name (`tab1/`) |
> | **Internal Component / Sub-View** | Sub-screen, modal, slide-over drawer, filter drawer, or step within a wizard. Controlled by UI interaction or `?view=`. | Inside sub-module `components/` folder (`components/[Submodule]Views/`) | `ManagerAttendanceHistoryDetailDrawer.tsx` inside `attendance_history/components/` | Creating a standalone sub-module for a single drawer (`attendance_history_drawer/`) |
> | **Local Utility / Reusable UI** | UI badge, status pill, table formatter, card wrapper, or local date helper used across this sub-module. | Inside sub-module `components/` or `utils/` | `ManagerAttendanceStatusBadge.tsx` inside `attendance_history/components/` | Nano-module (`attendance_status_badge/`) or parent shared folder (`attendance/common/`) |
>
>     - **The 5 Deterministic Qualification Gates:**
>       1. **Gate 1 (Navigation Invariant):** Does this capability map to a secondary tab in the domain shell or a distinct URL segment (e.g., `/attendance/history`)? If YES → **Autonomous Sub-Module** (`{domain}_{capability}/`). If NO (triggered by clicking an "Edit" button, a table row, a filter toggle, or a wizard next step) → **Internal Component/View** in `components/`.
>       2. **Gate 2 (State & Lifecycle Independence):** Can this capability be refreshed directly, deep-linked, or reset without depending on live uncommitted in-memory React state of another screen? If YES → **Autonomous Sub-Module**. If NO (e.g., Step 2 of a 3-step checkout or registration wizard that depends on uncommitted form memory from Step 1) → **Internal Component/View** inside the SAME sub-module.
>       3. **Gate 3 (File Count & Granularity Bounds — The Goldilocks Rule: 5–20 Files):**
>          - Target Range: 5 to 20 files per sub-module (orchestrator + 2-4 UI components + 1-2 hooks + 1 api client + 1 store + 1 mock + 1 test + doc trio).
>          - Anti-Pattern 1 (Nano-Module BANNED): Creating a sub-module for a single button, badge, chip, or static card (< 3 files) is STRICTLY FORBIDDEN. Keep it in `components/`.
>          - Anti-Pattern 2 (Mega-Submodule BANNED): Cramming 3+ completely distinct operational workflows into one giant sub-module (> 25 files) is STRICTLY FORBIDDEN. Split into separate sibling sub-modules under that domain container.
>       4. **Gate 4 (Standalone Testability & Mockability — ZIP Guarantee):** Can this capability be extracted, supplied with mock data, and tested in total isolation using its own MSW handlers and local harness? If YES → **Autonomous Sub-Module**.
>       5. **Gate 5 (Backend Entity Lifecycle Alignment):** Sub-modules map 1:1 to cohesive backend sub-module API contracts. Additional CRUD actions or filters on the existing entity belong inside the existing sub-module, NEVER as a new sub-module.
>

---

### 1B. HIERARCHICAL MODULE BOUNDARY — FEATURE MODULE IS THE AI REPAIR UNIT

The project MUST use the following architectural hierarchy:

```text
APPLICATION
  └── ROLE CONTAINER (Prefixed with frontend_)
        └── FEATURE DOMAIN CONTAINER (Pure Domain Shell & Quarantine)
              └── AUTONOMOUS SUB-MODULE (Granular AI Repair Unit)
```

This hierarchy applies to EVERY frontend project regardless of business domain.

### 1C. FRONTEND NAMESPACE PREFIXING (MANDATORY)

Because the project contains a 1-to-1 mapping of frontend and backend roles, the AI MUST explicitly separate frontend folders from backend folders. 
- **The Rule:** EVERY top-level frontend role container or domain folder MUST be prefixed with `frontend_`.
- **Primary Examples:** `src/app/frontend_admin/`, `src/app/frontend_manager/`, `src/app/frontend_superadmin/`.
- **Why?** If an AI is told to "fix the manager billing bug" and the context contains `src/app/frontend_manager/billing/`, it may hallucinate and write backend NestJS code inside a frontend React file. By strictly enforcing `src/app/frontend_manager/manager_billing/`, there is zero ambiguity for the AI or the human developer.

Examples of ROLE CONTAINERS:

```text
src/app/frontend_admin/
src/app/frontend_manager/
src/app/frontend_superadmin/
src/app/frontend_trainer/
```

Examples of FEATURE MODULES may include:

```text
src/app/frontend_admin/admin_members/
src/app/frontend_admin/admin_billing/
src/app/frontend_manager/manager_attendance/
src/app/frontend_superadmin/superadmin_plans/
src/app/frontend_superadmin/superadmin_reports/
src/app/frontend_superadmin/superadmin_gyms/
src/app/frontend_admin/admin_settings/
  └── admin_settings_profile/
src/app/frontend_superadmin/superadmin_analytics/
```

The exact names will differ by project, but the `frontend_` prefix is non-negotiable for root containers.

### 1E. ANTI-DOUBLE-PREFIXING RULE (CRITICAL)

Never double-prefix feature names or files. If an autonomous sub-module is named `analytics_dashboard`, its components must be named `SuperadminAnalyticsDashboard[Name].tsx` and its API client `superadmin_analytics_dashboard.api.ts`, NEVER `superadmin_analytics_analytics_dashboard...` or `SuperadminSuperadminAnalytics...`. Double-prefixing breaks readability and violates the naming contract.

### 1E.1 AI REPAIR BOUNDARY & GRANULAR HAND-OFF (MANDATORY)

> ⛔ **THE SUB-MODULE ZIP GUARANTEE & AI REPAIR BOUNDARY:**
> - **Primary Granular AI Repair Boundary = AUTONOMOUS SUB-MODULE (`{domain}_{capability}/`)**:
>   When repairing or extending a specific capability (e.g. Attendance Dashboard metrics, Plans List filters, Member Directory pagination), the AI MUST be given ONLY the Autonomous Sub-Module directory:
>   `src/app/frontend_{role}/{role}_{domain}/{domain}_{capability}/`
>   (e.g., `src/app/frontend_superadmin/superadmin_plans/plans_list/` or `src/app/frontend_manager/manager_attendance/attendance_dashboard/`).
> - **Parent Domain Navigation / Orchestration Boundary = FEATURE DOMAIN CONTAINER (`{role}_{domain}/`)**:
>   `src/app/frontend_{role}/{role}_{domain}/` owns only domain-level routing shells (`layout.tsx`, `page.tsx`) and the master domain documentation trio. It is the repair boundary ONLY when modifying the top-level tab bar or domain redirect logic.
> - **Role Container (`frontend_[role]/`) = NOT the repair boundary.** Providing an entire role container causes severe AI context dilution, cross-module hallucinations, and accidental sibling regression.

For example:
```text
ROLE CONTAINER (Too Broad — Do NOT hand off):
`/src/app/frontend_superadmin/`

FEATURE DOMAIN CONTAINER (Domain Orchestration Shell):
`/src/app/frontend_superadmin/superadmin_plans/`

AUTONOMOUS SUB-MODULE (Canonical Granular Repair & ZIP Unit):
`/src/app/frontend_superadmin/superadmin_plans/plans_list/`
```

Therefore, when an AI agent is tasked with fixing a Plans List bug or adding an export button to attendance, you provide ONLY:
```text
/src/app/frontend_superadmin/superadmin_plans/plans_list/
```
Inside this folder, the AI has everything required: view components, custom hooks, API service, Zod schemas, local MSW mock handlers, co-located tests, and ambient host stubs (`contracts/host-stubs.d.ts`).

### 1C.1 SIDEBAR NAVIGATION 1-TO-1 FEATURE MODULE MAPPING & ISOLATED REPAIR HAND-OFF (MANDATORY)

> ⛔ **UNIVERSAL APPLICABILITY ACROSS ALL ROLES: This law applies globally, equally, and strictly to EVERY role container in the application (including `frontend_admin`, `frontend_manager`, `frontend_superadmin`, `frontend_trainer`, `frontend_member`, and any future role). Any specific module names (such as `manager_attendance`, `admin_billing`, or `superadmin_plans`) referenced below are non-exhaustive concrete illustrations.**

To guarantee that any AI agent or human engineer can repair or expand a feature without repo-wide cognitive load, the system enforces a strict 1-to-1 isomorphism between navigation links and directory architecture:

1. **The 1:1 Navigation Law & Sidebar Domain Grouping Principle (Universal):**
   - **Domain Container as Sidebar Group & Self-Evident UI Label:** Every top-level clickable item present in ANY role's sidebar (e.g., in Manager: Dashboard, Members, CRM, Attendance, Accounting, Settings; in Admin: Gyms, Billing, Staff, Seats • Shifts • Lockers, Settings; in Superadmin: Tenants, Subscriptions, Platform Analytics; in Trainer: Schedule, Clients, Workouts) MUST map 1-to-1 to an autonomous feature Domain Container directly under that role container (e.g., `src/app/frontend_{role}/{role}_{domain}/`). Furthermore, its **human-facing Sidebar Display Label (UI Title) MUST be 100% self-evident, descriptive, and polished Title Case** (e.g., 🪑 `"Seats, Shifts & Lockers"`, 💰 `"Assets & Maintenance"`). Vague umbrella labels (`"Facilities"`, `"Operations"`, `"Resources"`, `"Others"`) are **STRICTLY BANNED**.
   - **Sidebar Domain Grouping Principle (Zero Flat Submodule Dumping — NO Numeric Lock):** Top-level sidebar navigation MUST represent cohesive, high-level Business Domains (Tier 3 Domain Containers). Dumping granular sub-modules, individual actions, or loose screens directly into the sidebar is a **CRITICAL UX & ARCHITECTURE VIOLATION**. Roles have NO arbitrary numerical limits on domains — a role may have as few or as many domains as its authentic business aggregate roots require.
   - **Sub-Modules as Secondary Navigation & Self-Evident Naming Invariant:** Autonomous sub-modules inside a domain (e.g., inside `admin_seat_shift_locker/`: `seat_allocation_and_booking/`, `shift_timings_and_slot_management/`, `locker_assignment_and_key_tracking/`; inside `manager_crm/`: `crm_enquiries/`, `crm_leads/`, `crm_pipeline/`) MUST follow the **Clarity-Over-Brevity Law** (fully expanded descriptive names, zero penalty for length, zero cryptic abbreviations like `seat_alloc/` or `crm_enq/`), ensuring anyone reading the folder name immediately understands its entire business capability. They MUST be accessed via Secondary Navigation:
     - **Option A (Canonical — Top Tab Bar):** Rendered by the Domain Container's `layout.tsx` across the top of the content area (`[ Enquiries ] [ Leads ] [ Follow-ups ]`), matching the modern Linear/Stripe design standard.
     - **Option B (Collapsible Sidebar Accordion):** An expandable submenu under the parent sidebar item (e.g., `🎯 CRM [▼]` expands to reveal `↳ Enquiries`, `↳ Leads`, `↳ Follow-ups`).
   - **STRICT PROHIBITION ON ACTION NANO-MODULES (THE ANTI-ACTION BAN):**
     - Creating a sub-module or sidebar item for a single action, form, or modal (e.g. `crm_enquiry_add/`, `crm_enquiry_edit/`, `accounting_asset_maintenance_add/`, `member_add/`) is an immediate **P0 ARCHITECTURE FAILURE (NANO-MODULE VIOLATION)**.
     - Creation forms, edit drawers, detail slide-outs, and wizard steps MUST live strictly INSIDE their parent sub-module (`components/` as modals/drawers or child route `create/page.tsx`), NEVER as independent sub-modules or sidebar links.
   - **Grouping multiple distinct sidebar destinations into a single mega-folder (e.g., merging `manager_finance` and `manager_expenses`, or `admin_billing` and `admin_plans`) is STRICTLY FORBIDDEN.**
   - **Creating ad-hoc top-level folders outside the owning feature for sub-views or detail pages is STRICTLY FORBIDDEN.** All sub-screens and secondary workflows must be owned by that feature module according to the Sub-View Routing Decision Matrix below.

### Deterministic 3-Question AI Domain Grouping Decision Tree

Before writing ANY code or creating ANY folder, the AI MUST run this 3-question filter for every screen or feature requirement:

```text
Q1: Is this a core high-level Business Domain (e.g., CRM, Accounting, Members, Attendance)?
    ├── YES ──> Create Tier 3 Domain Container: src/app/frontend_{role}/{role}_{domain}/
    │           (Mounts in primary sidebar; contains layout.tsx tab shell + page.tsx redirect)
    └── NO  ──> Proceed to Q2

Q2: Is this a distinct operational capability with its own entity lifecycle, data table, and filters (5–20 files)?
    ├── YES ──> Create Tier 4 Autonomous Sub-Module: {domain}_{capability}/ inside {role}_{domain}/
    │           (Exposed as secondary tab or accordion item; e.g., crm_enquiries/, accounting_assets/)
    └── NO  ──> Proceed to Q3

Q3: Is this a single action, form, modal, detail drawer, or sub-step (e.g., "Add Enquiry", "Edit Asset")?
    └── YES ──> Place inside parent sub-module: components/ (e.g., ManagerCrmEnquiryCreateModal.tsx)
                or child route: create/page.tsx.
                ⛔ STRICTLY FORBIDDEN to create a separate sub-module or top-level sidebar item!
```

### Sub-View Routing Decision Matrix

Use URL query parameters (`?view=`, `?page=`, `?status=`, `?tab=`) ONLY for state that modifies the view of the SAME resource:
- Search queries, filters, sorting, and pagination
- Table density modes and column toggles
- Selected tab when it does not represent a separate resource lifecycle or permissions boundary

Use nested routes inside the SAME feature module for:
- Entity detail pages (e.g. `[member_id]/page.tsx`)
- Create / add / edit flows (e.g. `create/page.tsx`, `[member_id]/edit/page.tsx`)
- Resource-specific history or activity timeline
- Workflows requiring distinct route-level permissions or distinct Next.js loading/error boundaries
- Independently refreshable and deep-linkable URLs

Allowed hierarchical structure following Universal Day-1 Sub-Module Architecture (Illustrated with CRM & Accounting):
```text
src/app/frontend_manager/
├── manager_crm/                                       ← SIDEBAR ITEM: "CRM" (Tier 3 Domain Container)
│   ├── layout.tsx                                     ← Shell mounting secondary sub-nav tabs: [Enquiries | Leads | Pipeline]
│   ├── page.tsx                                       ← Default redirect to /crm/enquiries
│   ├── manager_crm_features.md                        ← Master domain specification
│   ├── manager_crm_forbidden.md                       ← Master domain forbidden rules
│   ├── manager_crm_theme_contract.md                  ← Master domain theme tokens
│   │
│   ├── crm_enquiries/                                 ← Autonomous Sub-Module 1 (AI Repair Unit)
│   │   ├── components/
│   │   │   ├── ManagerCrmEnquiriesTable.tsx
│   │   │   ├── ManagerCrmEnquiriesFilters.tsx
│   │   │   └── ManagerCrmEnquiriesCreateModal.tsx     ← "Add Enquiry" lives HERE! NOT as a separate submodule!
│   │   ├── hooks/                                     ← useManagerCrmEnquiriesList.ts
│   │   ├── api/                                       ← manager_crm_enquiries.api.ts
│   │   ├── state/                                     ← useManagerCrmEnquiriesStore.ts
│   │   ├── types/ & schemas/
│   │   ├── mocks/                                     ← Mutable MSW handlers & fixtures
│   │   ├── tests/
│   │   ├── config/manager_crm_enquiries.url_config.ts
│   │   ├── manager_crm_enquiries_features.md          ← ALL 22 Canonical Sections
│   │   ├── manager_crm_enquiries_forbidden.md
│   │   └── manager_crm_enquiries_theme_contract.md
│   │
│   ├── crm_leads/                                     ← Autonomous Sub-Module 2 (Secondary Tab)
│   └── crm_pipeline/                                  ← Autonomous Sub-Module 3 (Secondary Tab)
│
└── manager_accounting/                                ← SIDEBAR ITEM: "Accounting" (Tier 3 Domain Container)
    ├── layout.tsx                                     ← Shell mounting secondary tabs: [Assets | Maintenance | Ledgers]
    ├── page.tsx                                       ← Default redirect to /accounting/assets
    ├── manager_accounting_features.md
    │
    ├── accounting_assets/                             ← Autonomous Sub-Module 1 (Secondary Tab)
    │   ├── components/
    │   │   ├── ManagerAccountingAssetsTable.tsx
    │   │   └── ManagerAccountingAssetCreateModal.tsx  ← "Add Asset" lives HERE!
    │   └── ...
    │
    ├── accounting_maintenance/                        ← Autonomous Sub-Module 2 (Secondary Tab)
    └── accounting_ledgers/                            ← Autonomous Sub-Module 3 (Secondary Tab)
```

**Rule:** One primary sidebar item = one feature domain container (Tier 3). All business implementation code MUST live inside autonomous child sub-modules (`{domain}_{capability}/`). Internal actions and forms MUST live inside sub-module `components/`.

### CANONICAL ERP DOMAIN TAXONOMY & ANTI-HALLUCINATION GROUPING INVARIANT (NON-NEGOTIABLE)

To prevent AI agents from arbitrarily inventing nonsensical parent groups (e.g. creating `manager_operations/` or merging `CRM` and `Members`), all grouping MUST adhere strictly to Domain-Driven Design (DDD) Bounded Contexts and the Canonical Domain Taxonomy below.

#### 1. The Universal Single-Domain Purity Law & Bounded Context Integrity (1-Domain = 1-Bounded-Context Mandate):
Every Tier 3 Domain Container (`{role}_{domain}/`) MUST focus strictly on a **SINGLE, UNIFIED BUSINESS BOUNDED CONTEXT & PRIMARY AGGREGATE ROOT**. 

- ⛔ **THE UNIVERSAL BAN ON CONJOINED-TWIN DOMAIN MERGERS (The Universal "X-and-Y" Anti-Pattern):**
  - An AI agent is **STRICTLY PROHIBITED** from conjoining or merging ANY two distinct business domains, departments, or capabilities into a single hybrid domain container (e.g., using `*_and_*`, `*_*`, or composite names that combine two separate bounded contexts).
  - **The Universal Law:** A mere operational relationship, common data reference, or loose thematic connection between two business areas (e.g., *"both touch money"*, *"both touch staff"*, *"both touch members"*, or *"both happen in the gym"*) **DOES NOT JUSTIFY MERGING THEM INTO ONE DOMAIN!**
  - **The 3-Point Deterministic Domain Independence Test:**
    Before proposing or creating ANY domain container, the AI MUST verify these 3 gates. If ANY gate is true, the capabilities **MUST BE SPLIT INTO SEPARATE SIBLING DOMAIN CONTAINERS**:
    1. *Different Entity Lifecycles / Tables:* Do they mutate different core database entities or transactional state machines? (e.g., Invoices vs Ledger Entries; Leads vs Enrolled Members; Shifts vs Payroll).
    2. *Different Operational Personas / User Workflows:* Are they used by different roles or for completely different operational intents? (e.g., Cashier/Customer Payment vs Accountant Ledger Audit; Front-Desk Check-in vs Branch Holiday Planner).
    3. *Different External Integrations / Protocols:* Do they integrate with different third-party systems? (e.g., Stripe/Razorpay Payment Gateway vs Accounting Tally/Quickbooks; Biometric Punch Device vs Academic Calendar).

- ❌ **UNIVERSAL CONJOINED-TWIN MERGER EXAMPLES (Illustrative, NOT Exhaustive — The Law Applies to ALL Modules):**
  - **Customer Billing vs Internal Accounting:** `*_billing_and_finance/` or `*_finance_and_billing/` ➔ **STRICTLY BANNED!** (Billing = Customer-facing invoices, subscriptions, payment gateways, checkouts; Accounting/Finance = Internal general ledgers, P&L, balance sheets, tax/GST, asset depreciation). Must be separate: `admin_billing/` AND `admin_accounting/`!
  - **Pre-Sale Prospects vs Enrolled Members:** `*_crm_and_members/` or `*_leads_and_members/` ➔ **STRICTLY BANNED!** (CRM = Pre-sale inquiries/leads; Members = Post-sale active enrolled users).
  - **HR Schedules vs Fiscal Payroll:** `*_staff_and_payroll/` or `*_staff_and_accounting/` ➔ **STRICTLY BANNED!** (Staff = Profiles, shifts, biometric attendance; Payroll = Financial disbursements).
  - **Operational Check-ins vs Calendar Configs:** `*_attendance_and_calendar/` or `*_attendance_and_holidays/` ➔ **STRICTLY BANNED!** (Attendance = Daily check-ins/punches; Calendar = Gazetted holiday schedules).
  - **Physical Equipment vs Balance Sheet Valuation:** `*_inventory_and_accounting/` ➔ **STRICTLY BANNED!** (Inventory = Physical stock tracking; Accounting = Financial asset books).
  - **ANY OTHER HYBRID CONJOINED DOMAIN:** Creating `*_{domainA}_and_{domainB}/` for ANY two bounded contexts is an **IMMEDIATE CRITICAL P0 ARCHITECTURE FAILURE**.

- ❌ **FORCE-FITTING UNRELATED FEATURES IS STRICTLY FORBIDDEN (ZERO JABARDASTI FIT KARNA):**
  - An AI MUST NOT force-fit an existing feature into an arbitrary domain simply because it doesn't know where to put it or fears creating a new domain.
  - **The Mandate:** If an authentic business feature does not cleanly and 100% logically belong to an existing domain's single Aggregate Root, the AI **MUST CREATE A DEDICATED TIER 3 DOMAIN CONTAINER** (e.g., `superadmin_holiday_calendar/` or `superadmin_operational_calendar/`). Remember: **Roles have ZERO NUMERIC LOCK on domains**—never corrupt domain purity by force-fitting or conjoining domains to keep domain count low!

- ❌ **CROSS-DOMAIN ENTITY SMUGGLING IS STRICTLY FORBIDDEN:**
  - An AI MUST NOT put customer billing invoices or payment gateways inside `Attendance` or `Members` (Invoices belong to `Billing`).
  - An AI MUST NOT put active member subscription management inside `CRM` (Members is post-sale; CRM is pre-sale).
  - An AI MUST NOT merge `Staff` and `Accounting` merely because staff gets paid.

#### 2. The Anti-Junk-Drawer, Anti-Buzzword Law & Code-First Forensic Inspection Invariant:
AI agents are **ABSOLUTELY PROHIBITED** from creating generic, ambiguous, dumping-ground, or abstract corporate buzzword domain names. 

- **The Code-First Forensic Inspection Invariant (Zero Guesswork Naming):**
  - Before proposing or naming ANY domain or submodule, the AI **MUST deeply inspect the actual source code, forms, tables, schemas, and API endpoints first**.
  - If the code contains SMS triggers, push broadcasts, and email templates ➔ Name it `superadmin_push_and_sms_notifications/` (Sidebar: `"Push & SMS Notifications"`), **NEVER** `superadmin_engagement`!
  - If the code contains member gamification challenges and leaderboards ➔ Name it `superadmin_challenges_and_leaderboards/`!
  - Naming MUST be a direct, faithful reflection of the discovered code entities and tables, NEVER an abstract hallucination.
- **The Self-Evident Sidebar Naming Invariant:** Every Tier 3 Domain Container (`{role}_{domain}/`) and its Primary Sidebar label MUST be **100% self-evident and descriptive**. A user or developer looking at the sidebar name MUST know within 1 second exactly what capabilities exist inside without opening folders or clicking tabs.
- **The Physical Resource Composite Exception (Carefully Delimited):**
  - *When is composite naming permitted?* ONLY when multiple physical resources share the exact same atomic reservation/booking transaction (e.g., a study library desk space where `seat_shift_locker` is allocated together in a single pass: `admin_seat_shift_locker/`).
  - *When is it forbidden?* Conjoining two distinct business departments, lifecycles, or operational bounded contexts (e.g. `billing_and_finance`, `crm_and_members`) is **100% PROHIBITED**.
- **Permanently Banned Generic Junk-Drawer, Abstract Buzzwords & Conjoined-Twin Mergers:**
  The following domain patterns are **PERMANENTLY BANNED ACROSS ALL ROLES**:
  - ❌ **ANY Conjoined-Twin Domain Merger (`*_{domainA}_and_{domainB}/` or `*_{domainA}_{domainB}/` combining two distinct bounded contexts):**
    - `*_billing_and_finance/`, `*_finance_and_billing/` (BANNED — Billing is customer invoices/gateways; Finance is general ledgers/P&L/taxes)
    - `*_crm_and_members/`, `*_leads_and_members/` (BANNED — CRM is pre-sale; Members is post-sale)
    - `*_staff_and_payroll/`, `*_staff_and_accounting/` (BANNED — Staff is profiles/schedules; Payroll is disbursements)
    - `*_attendance_and_calendar/` (BANNED — Attendance is check-ins; Calendar is holiday schedules)
    - `*_inventory_and_accounting/` (BANNED — Inventory is physical stock; Accounting is fiscal valuation)
    - ANY hybrid merger joining two distinct aggregate roots = BANNED.
  - ❌ `*_engagement/` (Banned Abstract Buzzword — does it mean push notifications, SMS, challenges, or feedback? Name the specific capability!)
  - ❌ `*_retention/` or `*_growth/` or `*_experience/` (Banned Abstract Buzzwords)
  - ❌ `*_insights/` or `*_intelligence/` (Banned Abstract Buzzwords — must be `*_analytics` or specific reports)
  - ❌ `*_activity/` or `*_workspace/`
  - ❌ `*_operations/` or `*_management/` or `*_general/`
  - ❌ `*_facilities/` (vague black-box — must be explicit like `*_seat_shift_locker/` or `*_equipment_and_rooms/`)
  - ❌ `*_resources/` (vague black-box — must explicitly name what resources)
  - ❌ `*_miscellaneous/` or `*_misc/` or `*_tools/` or `*_actions/`
  - ❌ `*_hub/` or `*_portal/` or `*_services/` or `*_data/`

Creating ANY domain with a banned generic name, abstract buzzword, or hidden mystery bucket is an immediate **P0 ARCHITECTURE FAILURE & MERGE BLOCKER**. Every domain container MUST be either a recognized business noun or an explicit self-descriptive composite from the Canonical Domain Taxonomy below.

#### 3. Canonical ERP Domain Taxonomy (Extensible Baseline Matrix):
The domain containers below represent the canonical baseline for Smart Gym 360. 
- **NO RIGID FIXED COUNT OR ARTIFICIAL CEILING:** Roles are NOT locked to any rigid number of domains (neither 5, nor 6–10, nor any fixed count). A role may contain as few or as many business domains as its authentic business aggregate roots require.
- **Pure Hierarchical Invariant:** The architecture requires that top-level sidebar navigation represents cohesive **High-Level Business Domains (Tier 3 Domain Containers)**, while granular operational capabilities live inside domains as autonomous sub-modules. The violation is flat-dumping submodules/actions, NOT the number of domains.
- **Extensibility:** New legitimate business domains (e.g., `manager_pos`, `manager_nutrition`, `manager_marketing`) MAY be introduced as long as they represent independent Aggregate Roots and avoid banned junk-drawer names.

#### 4. The Domain Promotion Law (When a Dense Capability Promotes to a Primary Sidebar Domain):
Enterprise software architecture (e.g., SAP, Salesforce, Linear) establishes the **Domain Promotion Law**:
> *"When a capability grows so large that it encompasses 3 or more distinct, complex operational workflows, it is NO LONGER a mere sub-module—it has matured into an autonomous High-Level Business Domain!"*

- **The Architectural Trap to Avoid:** Developers or AI agents facing a high-density capability (e.g. "Seats") often make two critical architectural mistakes:
  1. *Sub-submodule nesting trap:* Nesting folders (`seat/designer/canvas/`), which violates the Strict Maximum Nesting Depth Law.
  2. *Mega-submodule bloat:* Cramming 30+ files (canvas, daily allocations, pricing tiers, repair logs) into a single sub-module.
- **The Canonical Solution (Domain Promotion):**
  Because roles have **ZERO RIGID DOMAIN COUNT LOCKS**, the AI is authorized and mandated to **PROMOTE** that capability to a dedicated Tier 3 Domain Container in the primary sidebar:

  **Concrete Scaling Example (Seats, Shifts & Lockers Decomposition):**
  Instead of crowding everything into a giant composite domain, promote them into two cohesive, self-evident primary sidebar domains:
  1. 🪑 **Seats & Floor Layout (`admin_seats/`):**
     - Primary Sidebar Title: `"Seats & Floor Layout"`
     - Secondary Navigation Top Tabs (`layout.tsx`):
       - `[ 🗺️ Floor Designer ]` ➔ `seat_floor_layout_designer/`
       - `[ 🪑 Daily Allocation & Booking ]` ➔ `seat_allocation_and_booking/`
       - `[ 🛠️ Seat Maintenance & Repairs ]` ➔ `seat_maintenance_and_repair/`
  2. ⏱️ **Shifts & Lockers (`admin_shift_and_locker/`):**
     - Primary Sidebar Title: `"Shifts & Lockers"`
     - Secondary Navigation Top Tabs (`layout.tsx`):
       - `[ ⏱️ Shift Timings ]` ➔ `shift_timings_and_slot_management/`
       - `[ 🔒 Locker Assignments ]` ➔ `locker_assignment_and_key_tracking/`

| Role Container | Approved Baseline Domain Containers (Canonical Reference) | Permitted Autonomous Sub-Modules (`{domain}_{capability}`) |
|---|---|---|
| **`frontend_manager`** | 1. `manager_dashboard`<br>2. `manager_members`<br>3. `manager_crm`<br>4. `manager_attendance`<br>5. `manager_accounting`<br>6. `manager_inventory`<br>7. `manager_staff`<br>8. `manager_settings` | • `crm` → `crm_enquiries`, `crm_leads`, `crm_pipeline`<br>• `members` → `members_directory`, `members_plans`, `members_detail`<br>• `attendance` → `attendance_dashboard`, `attendance_history`, `attendance_biometrics`<br>• `accounting` → `accounting_assets`, `accounting_ledgers`, `accounting_maintenance`<br>• `inventory` → `inventory_equipment`, `inventory_supplements`, `inventory_lockers`<br>• `staff` → `staff_directory`, `staff_roster`, `staff_payroll` |
| **`frontend_superadmin`** | 1. `superadmin_dashboard`<br>2. `superadmin_tenants`<br>3. `superadmin_plans`<br>4. `superadmin_billing`<br>5. `superadmin_analytics`<br>6. `superadmin_audit`<br>7. `superadmin_settings` | • `tenants` → `tenants_directory`, `tenants_onboarding`, `tenants_branches`<br>• `plans` → `plans_tiers`, `plans_features`, `plans_pricing`<br>• `billing` → `billing_invoices`, `billing_payouts`, `billing_gateways`<br>• `audit` → `audit_logs`, `audit_security`, `audit_compliance` |
| **`frontend_admin`** | 1. `admin_dashboard`<br>2. `admin_gyms`<br>3. `admin_billing`<br>4. `admin_staff`<br>5. `admin_reports`<br>6. `admin_settings` | • Standard enterprise branch and administrative capabilities |
| **`frontend_trainer`** | 1. `trainer_dashboard`<br>2. `trainer_schedule`<br>3. `trainer_clients`<br>4. `trainer_workouts`<br>5. `trainer_earnings`<br>6. `trainer_settings` | • Personal trainer schedule, member workout logs, and PT commission logs |
| **`frontend_member`** | 1. `member_dashboard`<br>2. `member_membership`<br>3. `member_attendance`<br>4. `member_bookings`<br>5. `member_payments`<br>6. `member_profile` | • Gym member portal views, QR check-in, class bookings, invoices |

#### 4. The Aggregate Root Boundary Test (Dispute Resolution):
If an AI agent is uncertain which domain owns a feature (e.g. "Trainer Payouts: does it belong in Staff or Accounting?"), apply the **Aggregate Root Mutation Test**:
- *"Which core business entity's authoritative state is being created or modified?"*
  - If the operation creates an accounting transaction, tax entry, or ledger disbursement → It belongs to **`accounting`**.
  - If the operation updates trainer employee profiles, hourly rates, or roster status → It belongs to **`staff`**.
  - Cross-references are resolved strictly via read-only API calls across gateway endpoints, NEVER by combining domain folders!

---

2. **Universal Day-1 Sub-Module Architecture & Domain Root Quarantine:**
   - Every feature module folder (`src/app/frontend_{role}/{role}_{domain}/`) is a **Pure Domain Container** containing ONLY:
     1. Navigational shell (`layout.tsx`) mounting sub-navigation tabs/links
     2. Default route redirect (`page.tsx`) redirecting to the primary initial sub-module
     3. Master domain documentation trio (`_features.md`, `_forbidden.md`, `_theme_contract.md`)
     4. One or more autonomous Sub-Modules (`{domain}_{capability}/`, e.g., `attendance_dashboard/`, `attendance_history/`, `members_directory/`, `members_detail/`).
   - **Zero Root Code in Domain Folder (Domain Root Quarantine):** Creating loose `components/`, `hooks/`, `api/`, `mocks/`, `utils/`, or `state/` directly at the feature domain root level is a **CRITICAL ARCHITECTURE VIOLATION**. 100% of executable source code, components, hooks, stores, mocks, and tests MUST live inside autonomous child sub-modules (`{domain}_{capability}/`).
   - **Zero Business Coupling Between Sibling Sub-Modules (Strict Sibling Isolation Firewall & WET Law):** Sibling sub-modules have zero business cross-imports, zero shared mutable state/cache, zero direct mutation coupling, and zero parent shared business folders. Approved navigation registration/route dispatch and documented host infrastructure contracts are not sibling business coupling. UI badges, formatters, and types are duplicated locally (Strict WET).

3. **Autonomous AI Repair Hand-Off & The Sub-Module ZIP Guarantee:**
   - Under the Universal Day-1 Sub-Module Architecture, the **Autonomous Sub-Module** (e.g., `attendance_history/` or `members_directory/`) is the default granular repair unit.
   - When a bug or task arises in ANY capability, the developer provides **ONLY that single sub-module folder** (e.g., `members_directory.zip`) to the AI agent.
   - The AI agent receives a laser-focused 10–15 file context, complete local mocks, and repairs the issue in one shot with 0% risk of breaking sibling sub-modules or the host app.

4. **Navigation Shell Isolation:**
   - The Sidebar and Header presentation components, collapse logic, mobile drawer focus traps, and menu configurations belong strictly to that role's navigation module (e.g., `src/app/frontend_{role}/{role}_navigation/`).
   - Navigation components consume ONLY the exported typed URL contracts (`[submodule]_url_config.ts`) from feature sub-modules. Navigation components MUST NOT import any business components, business stores, or domain hooks from feature modules.
   - If there is an issue with the sidebar layout or navigation menu itself, the repair context is STRICTLY `{role}_navigation/`.

---

## 1D. CANONICAL FILESYSTEM AND NEXT.JS ROUTING RULE — MANDATORY

The frontend MUST have exactly ONE canonical representation of each feature.

The canonical hierarchy is:

```text
APPLICATION
└── ROLE CONTAINER (src/app/frontend_{role}/)
    └── FEATURE DOMAIN CONTAINER ({role}_{domain}/)  <-- Pure Domain Container (Quarantined)
        ├── layout.tsx                                <-- Shell mounting sub-nav tabs/links
        ├── page.tsx                                  <-- Default redirect to initial sub-module
        ├── [role]_[domain]_features.md               <-- Master domain specification
        ├── [role]_[domain]_forbidden.md              <-- Master domain forbidden rules
        ├── [role]_[domain]_theme_contract.md         <-- Master domain theme tokens
        │
        ├── {domain}_{capability_1}/                  <-- Autonomous Sub-Module 1 (AI Repair Unit)
        │   ├── components/                           <-- Standard category folders
        │   ├── hooks/
        │   ├── api/
        │   ├── state/
        │   ├── types/
        │   ├── schemas/
        │   ├── mocks/
        │   ├── utils/
        │   ├── tests/
        │   ├── config/[role]_[submodule].url_config.ts
        │   ├── [role]_[submodule]_features.md        <-- ALL 22 Canonical Sections
        │   ├── [role]_[submodule]_forbidden.md
        │   └── [role]_[submodule]_theme_contract.md
        │
        └── {domain}_{capability_2}/                  <-- Autonomous Sub-Module 2
            └── ... (identical canonical micro-structure)
```

Example:

src/app/frontend_superadmin/
└── superadmin_dashboard/
    ├── layout.tsx
    ├── page.tsx
    └── dashboard_overview/

There MUST NOT simultaneously exist:

src/app/frontend_superadmin/dashboard/
AND
src/app/frontend_superadmin/superadmin_dashboard/

for the same business feature.

No parallel route tree, duplicate route tree, mirror directory, compatibility copy,
or second implementation of the same feature is permitted.

### Next.js Framework Folder Exceptions & Strict Prohibition of Route Groups

Inside each autonomous sub-module, business artifacts are organized into canonical standard sub-folders: `components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `utils/`, `mocks/`, `tests/`, `contracts/`, and `config/`. All files within them carry the `[Role][Submodule][Name]` prefix.

The following Next.js App Router folders are approved framework exceptions:
- dynamic segments: `[id]`, `[member_id]`, `[...slug]`, `[[...slug]]`
- parallel routes: `@slot_name`
- private implementation folders: `_folder_name`

These folders may contain ONLY route-entry infrastructure (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`).
They MUST NOT become a second business implementation.
All business components, hooks, stores, API clients, schemas, mocks, fixtures, and business constants remain inside the canonical sub-module folders.

#### STRICT PROHIBITION OF NEXT.JS ROUTE GROUPS `(group_name)`
Next.js route groups (folders enclosed in parentheses like `(auth)`, `(dashboard)`, `(marketing)`) are **STRICTLY FORBIDDEN**.
- **Reason for Prohibition:** Route groups omit the folder name from the browser URL path. This creates silent URL collisions/conflicts between different roles and modules, breaks clean 1:1 physical file path mapping, and confuses AI during module isolation and repair.
- Every route in the application MUST map explicitly 1:1 to its physical role and feature module folder hierarchy (e.g., `src/app/frontend_admin/admin_members/...`).
- Any folder with parentheses `(group_name)` is an immediate structural violation (`NON_COMPLIANT`).

### NEXT.JS ROUTING

Next.js route files MUST be physically owned by the corresponding feature module.

A feature's `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, dynamic route
segments, and route-specific layout MUST NOT be duplicated outside that feature module.
No parallel route tree, duplicate route tree, mirror directory, compatibility copy, or second implementation of the same feature is permitted.

### SINGLE SOURCE OF TRUTH

For every business feature:

FEATURE MODULE = SINGLE SOURCE OF TRUTH

Any route representation is only a routing entry point and MUST delegate to the
canonical feature module. It MUST NOT duplicate feature implementation.

AI MUST detect and remove duplicate representations before delivery.

### DUPLICATE FEATURE STRUCTURE CHECK

Before final packaging, mechanically verify:

1. Every feature has exactly one canonical feature module.
2. No unprefixed sibling directory represents the same feature.
3. No route directory duplicates a prefixed feature directory.
4. No duplicate page/component implementation exists for the same feature.
5. No duplicate API/hooks/store/schema/constants/fixtures/handlers exist outside
   the owning feature module.
6. The final ZIP contains exactly one role container:
   `frontend_[role]/`
7. The final ZIP contains exactly one canonical module for each business feature.

If any duplicate representation exists:
STATUS = INCOMPLETE
Do not package or deliver the ZIP.

### Sub-Module Self-Containment Requirement (The Sub-Module ZIP Guarantee)

Every autonomous sub-module MUST own all business-specific artifacts required to understand, test, mock, document, and modify that sub-feature independently.

The canonical autonomous sub-module structure MUST contain:

```text
{domain}_{capability}/                                    # Autonomous Sub-Module Container
├── page.tsx / loading.tsx / error.tsx / not-found.tsx    # Next.js route entry files
├── config/
│   └── [role]_[submodule].url_config.ts                  # Centralized routes and endpoints
├── contracts/
│   └── host-stubs.d.ts                                   # Ambient host stubs for standalone compilation
├── [role]_[submodule]_features.md                        # ALL 22 Canonical Sections
├── [role]_[submodule]_forbidden.md                       # Sub-module boundary & WET directives
├── [role]_[submodule]_theme_contract.md                  # Sub-module design token bindings
├── components/                                           # [Role][Submodule][Name].tsx
├── hooks/                                                # use[Role][Submodule][Name].ts
├── api/                                                  # [role]_[submodule].api.ts & query keys
├── types/                                                # [role]_[submodule].types.ts
├── schemas/                                              # [role]_[submodule].schemas.ts (Zod)
├── constants/                                            # [role]_[submodule].constants.ts
├── state/                                                # use[Role][Submodule]Store.ts
├── utils/                                                # [role]_[submodule][Util].ts
├── locales/                                              # [role]_[submodule]_[lang].json
├── mocks/                                                # Local MSW handlers, mock fixtures & scenarios
│   ├── fixtures/
│   │   └── [role]_[submodule].fixtures.ts
│   ├── handlers/
│   │   └── [role]_[submodule].handlers.ts
│   └── scenarios/
│       └── [role]_[submodule].scenarios.ts
└── tests/                                                # Co-located Vitest / RTL tests & test harness
    ├── [role]_[submodule].integration.test.tsx
    └── harness/
        ├── bootstrap.ts
        └── [Role][Submodule]Harness.tsx
```

### Mandatory vs Conditionally Required Artifacts (GAP-FIX)

> ⛔ **NO OMISSION OF REQUIRED ARTIFACTS:**
> AI agents MUST NOT use "only required folders need to exist" as an excuse to omit tests, mocks, schemas, or documentation.
> The classification below is NON-NEGOTIABLE:

| Artifact | Requirement Level | Mandatory Trigger Condition | Consequence of Omission |
|---|---|---|---|
| `[role]_[submodule]_features.md` (or `_features.md`) | **MANDATORY FOR ALL SUB-MODULES** | Every single autonomous sub-module (all 22 canonical sections) | `NON_COMPLIANT` — Sub-module lacks architectural map |
| `[role]_[submodule]_forbidden.md` (or `_forbidden.md`) | **MANDATORY FOR ALL SUB-MODULES** | Every single autonomous sub-module | `NON_COMPLIANT` — Sub-module lacks safety boundaries & WET rules |
| `[role]_[submodule]_theme_contract.md` (or `_theme_contract.md`) | **MANDATORY FOR ALL SUB-MODULES** | Every single autonomous sub-module | `NON_COMPLIANT` — Visual portability contract unverified |
| `config/[role]_[submodule].url_config.ts` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module with routes or API calls | `NON_COMPLIANT` — URL centralization contract broken |
| `contracts/host-stubs.d.ts` | **MANDATORY FOR ALL SUB-MODULES** | Every autonomous sub-module | `NON_COMPLIANT` — Missing ambient host stubs for standalone compilation |
| `components/` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module with UI | `NON_COMPLIANT` — Missing view layer |
| `hooks/` | **MANDATORY FOR ALL SUB-MODULES** | Any component with logic/state | `NON_COMPLIANT` — Logic coupled to view |
| `api/` | **MANDATORY FOR ALL SUB-MODULES** | Any API call | `NON_COMPLIANT` — API centralization broken |
| `types/` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module | `NON_COMPLIANT` — Type isolation contract broken |
| `schemas/` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module with forms/API responses | `NON_COMPLIANT` — Runtime validation missing |
| `constants/` | **Conditionally Required** | MUST exist when sub-module has static enums/options | `NON_COMPLIANT` if magic values are inlined |
| `state/` | **Conditionally Required** | MUST exist when sub-module has shared client state | `NON_COMPLIANT` if client state is stored in global or component state |
| `utils/` | **Conditionally Required** | MUST exist when sub-module has formatters/helpers | `NON_COMPLIANT` if helpers are placed in global `src/lib/` |
| `locales/` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module (`_en.json` + active languages) | `NON_COMPLIANT` — Hardcoded strings in JSX |
| `mocks/` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module (fixtures/, handlers/, scenarios/ for ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED) | `NON_COMPLIANT` — Untestable/unmocked module |
| `tests/` | **MANDATORY FOR ALL SUB-MODULES** | Every sub-module (co-located RTL/Vitest integration tests + tests/harness/bootstrap.ts & [Role][Submodule]Harness.tsx) | `NON_COMPLIANT` — Zero test verification |

Anything containing business behavior specific to the sub-feature MUST live inside that sub-module. Creating empty folders when no artifacts exist is not required, but **omitting a folder when the artifact or trigger condition exists is an ARCHITECTURAL VIOLATION.**

---

### NO ROLE-WIDE BUSINESS BUCKETS

The project MUST NOT create role-wide business folders such as:

```text
superadmin_components/
superadmin_hooks/
superadmin_store/
superadmin_api/
superadmin_types/
superadmin_schemas/
superadmin_constants/
superadmin_utils/
superadmin_mocks/
superadmin_tests/
```

when those files contain business behavior belonging to individual features.

Instead, feature-specific responsibilities MUST remain inside the owning sub-module:

```text
src/app/
└── frontend_superadmin/
    ├── superadmin_plans/
    │   ├── layout.tsx                                    # Tab navigation shell
    │   ├── page.tsx                                      # Default redirect to plans_list
    │   ├── superadmin_plans_features.md                  # Master domain documentation
    │   ├── superadmin_plans_forbidden.md
    │   ├── superadmin_plans_theme_contract.md
    │   │
    │   ├── plans_list/                                   # Autonomous Sub-Module 1 (ZIP Unit)
    │   │   ├── page.tsx
    │   │   ├── components/
    │   │   │   ├── SuperadminPlansListMain.tsx
    │   │   │   ├── SuperadminPlansListTable.tsx
    │   │   │   └── SuperadminPlansListFilters.tsx
    │   │   ├── hooks/
    │   │   │   └── useSuperadminPlansList.ts
    │   │   ├── api/
    │   │   │   ├── superadmin_plans_list.api.ts
    │   │   │   └── superadmin_plans_list.query_keys.ts
    │   │   ├── state/
    │   │   │   └── useSuperadminPlansListStore.ts
    │   │   ├── types/
    │   │   ├── schemas/
    │   │   ├── contracts/
    │   │   │   └── host-stubs.d.ts
    │   │   ├── mocks/
    │   │   │   ├── fixtures/
    │   │   │   │   └── superadmin_plans_list.fixtures.ts
    │   │   │   ├── handlers/
    │   │   │   │   └── superadmin_plans_list.handlers.ts
    │   │   │   └── scenarios/
    │   │   │       └── superadmin_plans_list.scenarios.ts
    │   │   ├── tests/
    │   │   │   ├── superadmin_plans_list.integration.test.tsx
    │   │   │   └── harness/
    │   │   │       ├── bootstrap.ts
    │   │   │       └── SuperadminPlansListHarness.tsx
    │   │   ├── config/
    │   │   │   └── superadmin_plans_list.url_config.ts
    │   │   ├── superadmin_plans_list_features.md
    │   │   ├── superadmin_plans_list_forbidden.md
    │   │   └── superadmin_plans_list_theme_contract.md
    │   │
    │   └── plans_create/                                 # Autonomous Sub-Module 2 (ZIP Unit)
    │       └── ... (identical canonical micro-structure)
    │
    ├── superadmin_invoices/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── invoices_list/
    │       └── ...
    │
    └── superadmin_reports/
        └── ...
```

The same principle applies to every role and every domain.

---

### AI PORTABILITY CONTRACT

A feature module is considered AI-portable only when an AI can receive the feature directory as its primary context and understand the feature's:

* purpose
* user flows
* UI
* state ownership
* API contract
* schemas
* business constants
* business utilities
* mock behavior
* tests
* error handling
* loading/empty behavior
* permissions
* documented external application dependencies

without receiving unrelated sibling business modules.

The canonical workflow is:

```text
FEATURE BUG
   ↓
PROVIDE ONLY THE FEATURE MODULE
   ↓
AI READS THE FEATURE'S FEATURE MAP
   ↓
AI UNDERSTANDS THE FEATURE
   ↓
AI REPAIRS THE FEATURE
   ↓
AI RUNS FEATURE TESTS
   ↓
ONLY FEATURE FILES ARE CHANGED
```

For example, if a bug exists in billing invoices within admin billing:

```text
src/app/frontend_admin/admin_billing/billing_invoices/
```

the preferred AI context under the Sub-Module ZIP Guarantee is:

```text
src/app/frontend_admin/admin_billing/billing_invoices/
```

NOT the parent domain container:

```text
/frontend_admin/admin_billing/
```

and NOT:

```text
/frontend_admin/ (role container) or the entire application
```

unless the feature documentation explicitly identifies an unavoidable application-infrastructure dependency that is genuinely required for the repair.

---

### PORTABILITY TO OTHER PROJECTS

Feature modules MUST be designed so that they can be copied into another compatible frontend application with minimal integration work.

A copied feature MUST NOT depend on hidden business files from its previous application.

After copying, only application-specific integration work MUST be necessary, such as:

* route registration
* application configuration
* authentication wiring
* approved global UI/infrastructure integration
* backend endpoint/environment configuration
* project-specific styling or branding adjustments

Hidden business dependencies from the source application's other modules are forbidden.

---

### DUPLICATION IS ALLOWED AND PREFERRED WHEN IT IMPROVES ISOLATION

Traditional DRY principles MUST NOT override the project's AI isolation requirement.

If two independent features need similar business behavior, they MAY contain duplicated implementations.

Example:

```text
src/app/frontend_admin/admin_billing/admin_billing_utils/
```

and

```text
src/app/frontend_manager/manager_billing/manager_billing_utils/
```

may contain similar code.

This is intentional when duplication prevents cross-feature business coupling.

The primary optimization target is:

```text
AI CONTEXT ISOLATION
+
BOUNDED CHANGE BLAST RADIUS
+
FEATURE PORTABILITY
```

not minimum source-code duplication.

### FEATURE-LOCAL SINGLE SOURCE OF TRUTH

The phrase "single source of truth" applies **ONLY within the owning feature module**.

Allowed:
```text
admin_members/
└── AdminMembersConstants.ts

admin_billing/
└── AdminBillingConstants.ts
```
Both modules may contain similar or even identical business constants. Cross-feature consolidation is NOT required.

AI agents MUST NOT create shared business registries, shared business constants, shared business schemas, shared business hooks, or shared business utilities merely because similar data exists elsewhere.

- **Within a feature:** one authoritative source
- **Across features:** duplication is allowed and preferred when it improves isolation



### Canonical Definition

For this document:

```text
Application
= entire frontend application

Role Container
= route/organizational boundary for a role or application area

Feature Module
= smallest independently understandable business unit

AI Repair Boundary
= Feature Module
```

The term "module" in all isolation, portability, dependency, and AI repair rules MUST refer to the FEATURE MODULE unless a rule explicitly states otherwise.

2. **Total Role Isolation (No Shared Business Components)**:
To completely eliminate the risk of cross-role AI hallucinations, there is no unified global business folder across roles or application areas. Each role gets a completely isolated root folder (e.g., `src/app/frontend_admin/`, `src/app/frontend_manager/`, `src/app/frontend_trainer/`). Business components (like `MembersTable`) must be duplicated into the owning feature module of each role (`AdminMembersTable.tsx` inside `src/app/frontend_admin/admin_members/`, `ManagerMembersTable.tsx` inside `src/app/frontend_manager/manager_members/`). Business components MUST NOT be placed directly in the role container merely because they belong to that role. Only dumb UI components (like `Button`) are shared in `src/components/ui`.

3. **Hyper-Descriptive Naming & Mandatory Role + Module Prefix (CRITICAL)**: 
Rename all components, files, and folders to be extremely descriptive based on exactly what they do. **It does not matter if a filename becomes exceptionally long** (e.g., `AdminMembersSubscriptionRenewalForm.tsx`). Meaningfulness and convenience are the only priorities. 
- **Role + Module Name Prefixing (CRITICAL):** EVERY single file name (not just the containing folder) MUST begin with the parent Role name (e.g., `Manager`, `Admin`) followed by the Module name as a prefix. This applies to EVERYTHING: components, hooks, api services, stores, schemas, constants, and utilities. 
  - ❌ **BAD:** `useMembers.ts`, `members.api.ts`, `members.store.ts`, `MembersTable.tsx`
  - ✅ **GOOD:** `useManagerMembers.ts`, `ManagerMembersApi.ts`, `useManagerMembersStore.ts`, `ManagerMembersTable.tsx`
  This strict 1-to-1 symmetry with the backend guarantees that an AI will never hallucinate between `AdminMembersTable` and `ManagerMembersTable`, or `AdminMembersApi.ts` and `ManagerMembersApi.ts`.
- **Framework-reserved filenames are exempt from the module-prefix naming rule.** This includes `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, and other filenames mandated by Next.js/framework conventions. Standardized tooling-managed locale filenames under `[moduleName]_locales/[moduleName]_{lang}.json` are also an explicit exception. All non-reserved module-owned files MUST use the Role + Module prefix.
- Test files are also module-owned files and MUST follow Role + Module prefixing, while retaining the source artifact's semantic basename. Example: `ManagerMembersTable.test.tsx`, `useManagerMembersTable.test.ts`.
- **Export Name Matching:** The primary React component, class, or primary exported callable inside the file MUST exactly match the filename (minus extension).
- **No Abbreviations**: Never use `Btn`, `Nav`, `Utils`. Use `Button`, `Navigation`, `Utilities`.
- **Strict Suffixing**: Component names must end with their exact UI structural type (e.g., `...Modal.tsx`, `...Table.tsx`, `...Form.tsx`).
- **Prop Naming**: Do not export generic `Props` or `Data` interfaces. Always prefix them (e.g., `export interface ManagerInquiriesTableProps`).

### Canonical File Naming Matrix

To eliminate AI naming hallucinations, strictly follow this pattern:


- **Folders (CRITICAL ENFORCEMENT):** ALL folders MUST use `snake_case` (e.g., role containers `frontend_admin/`, feature domains `admin_members/`, sub-modules `members_directory/`, and canonical sub-folders `components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `constants/`, `utils/`, `mocks/`, `tests/`, `contracts/`, `config/`). You are STRICTLY FORBIDDEN from using PascalCase or camelCase for folder names (e.g., NEVER use `AdminMembers/` or `adminMembers/`). Next.js App Router relies on lowercase/snake_case paths, and mixing casing causes fatal Linux CI/CD build failures.
- **Component Files:** PascalCase with `[Role][Submodule][Name].tsx` (e.g., `AdminMembersDirectoryTable.tsx`, `AdminMembersDirectoryForm.tsx`, `AdminMembersDirectoryEmptyState.tsx`). PascalCase is strictly reserved for React components.
- **API Client:** Lowercase snake_case with dot notation: `[role]_[submodule].api.ts` (e.g., `admin_members_directory.api.ts`).
- **Types:** Lowercase snake_case with dot notation: `[role]_[submodule].types.ts` (e.g., `admin_members_directory.types.ts`).
- **Schemas:** Lowercase snake_case with dot notation: `[role]_[submodule].schemas.ts` (e.g., `admin_members_directory.schemas.ts`).
- **Constants:** Lowercase snake_case with dot notation: `[role]_[submodule].constants.ts` (e.g., `admin_members_directory.constants.ts`).
- **Query Keys:** Lowercase snake_case with dot notation: `[role]_[submodule].query_keys.ts` (e.g., `admin_members_directory.query_keys.ts`).
- **Hook Files:** camelCase with `use` + Role+Submodule: `use[Role][Submodule][Name].ts` (e.g., `useAdminMembersDirectory.ts`, `useAdminMembersDirectoryTable.ts`).
- **Store Files:** camelCase with `use` + Role+Submodule + `Store`: `use[Role][Submodule]Store.ts` (e.g., `useAdminMembersDirectoryStore.ts`).
- **Special Config & Documentation Files:** snake_case with role and submodule (`config/[role]_[submodule].url_config.ts`, `[role]_[submodule]_features.md`, `[role]_[submodule]_forbidden.md`, `[role]_[submodule]_theme_contract.md`).
- **Ban on Dual Casing:** Allowing both PascalCase and snake_case for the same artifact class (e.g. `AdminMembersDirectoryApi.ts` vs `admin_members_directory.api.ts`) is STRICTLY FORBIDDEN. Every artifact class has exactly one canonical casing convention.

### Locale File Naming Convention (GAP-1 Fix)
Locale files MUST follow: `[role]_[submodule]_{lang}.json`
(e.g., `admin_members_directory_en.json`, `admin_members_directory_hi.json`)
The `locales/` folder inside each autonomous sub-module MUST contain ONLY locale files.
Locale files are grouped by sub-module, NOT by language.
Do NOT create `src/locales/en/` global folders.

### URL Config Contract (GAP-2 Fix)
Every autonomous sub-module MUST have exactly one `config/[role]_[submodule].url_config.ts` which MUST export two distinct typed contracts:
1. `[ROLE]_[SUBMODULE]_ROUTES`: Internal UI navigation route paths owned by this module.
2. `[ROLE]_[SUBMODULE]_API`: Backend API endpoint paths consumed by this module.
3. NO hardcoded base URLs — only paths relative to API base.
4. NO business logic — only URL string definitions.

**Usage Restrictions:**
- Navigation components (sidebar, header, breadcrumbs) may import ONLY `[ROLE]_[SUBMODULE]_ROUTES`.
- Feature API clients may import ONLY `[ROLE]_[SUBMODULE]_API`.
- A sibling feature module may NEVER import either object.
- API endpoint strings must NEVER be consumed by navigation UI.

Example export shape:
```typescript
// config/admin_members_directory.url_config.ts
export const ADMIN_MEMBERS_DIRECTORY_ROUTES = {
  root: '/admin/members_directory',
  detail: (id: string) => `/admin/members_directory/${id}`,
} as const;

export const ADMIN_MEMBERS_DIRECTORY_API = {
  list:   '/api/v1/admin/members',
  detail: (id: string) => `/api/v1/admin/members/${id}`,
  create: '/api/v1/admin/members',
} as const;
```

### `[role]_[submodule]_features.md` Content Specification (MANDATORY — GAP-4 Fix)
*(See Rule 13 for the authoritative, complete 22-canonical-section specification and template required for every autonomous sub-module).*
This file MUST contain ALL of:
1. Module Purpose — exact business purpose
2. Routes — all URL paths with their page components
3. User Flows — numbered steps for every major user action
4. Component Tree — rendered hierarchy
5. API Contract Summary — all endpoints with method + URL
6. State Map — TanStack Query vs Zustand vs local
7. Permissions — which role can see/do what
8. External Dependencies — non-local infrastructure imports only
9. Known Forbidden Patterns — cross-reference to _forbidden.md
Generic boilerplate defeats the AI-portable goal.

### Sub-Module & Sub-Folder Naming Contract

Every autonomous child sub-module MUST inherit the domain identity (`{domain}_{capability}/`, e.g., `attendance_dashboard/`, `attendance_history/`, `members_directory/`).
Inside each autonomous sub-module, canonical standard category subfolder names are used: `components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `constants/`, `utils/`, `locales/`, `mocks/`, `tests/`, `contracts/`.
- ✅ **GOOD (Sub-Module Containers):** `members_directory/`, `members_detail/`, `attendance_dashboard/`
- ❌ **BAD (Lazy / Generic Names):** `table/`, `filters/`, `profile/`, `modal/`, `details/`, `tab1/`, `common/`
- ✅ **GOOD (Internal Category Folders & Files):** `members_directory/components/AdminMembersDirectoryTable.tsx`, `members_directory/hooks/useAdminMembersDirectory.ts`, `members_directory/constants/AdminMembersDirectoryConstants.ts`
*Why:* When you ZIP an autonomous sub-module and give it to an AI, it instantly knows the full context without relying on parent path information.

### No Magic / Ambiguous File Names Rule

Generic, uninformative file names degrade AI reasoning speed and create search ambiguity across large codebases.
- ❌ **STRICTLY FORBIDDEN FILE NAMES:**
  `config.ts`, `utils.ts`, `helpers.ts`, `common.ts`, `shared.ts`, `misc.ts`, `types.ts`, `api.ts`, `constants.ts`, `styles.ts`, `store.ts`
- ✅ **MANDATORY DESCRIPTIVE FILE NAMES:**
  Every file MUST state its role, module, and exact domain responsibility:
  - `AdminMembersApiClient.ts` (not `api.ts`)
  - `AdminMembersUrlConfig.ts` (not `config.ts`)
  - `AdminMembersFormatting.ts` (not `utils.ts`)
  - `AdminMembersValidationSchema.ts` (not `schema.ts`)
  - `AdminMembersTypes.ts` (not `types.ts`)
  - `useAdminMembersStore.ts` (not `store.ts`)
  - `AdminMembersPermissionRules.ts` (not `permissions.ts`)
*Enforcing the 1-Glance Comprehension Rule:* An AI or engineer scanning a directory listing must immediately comprehend the exact purpose of every file without opening it.

3B. **Backend-Ready Centralized Data (Single Source of Truth)**: 
Find all hardcoded UI data (dropdown options, filter lists, default preset arrays, payment modes, etc.) scattered across the UI components. Extract them into feature-specific constant files alongside their components (e.g., `AdminBillingPaymentModeConstants.ts` inside the `constants/` folder) or a module-level constants file prefixed with the full Role+Module name (e.g., `AdminBillingConstants.ts`) for data used across multiple sub-folders.
*Why?* Centralizing static UI configuration minimizes UI changes when a backend source is introduced; the backend transition must still update the API contract, types, schema, mock layer, and API client as required. Derive your TypeScript types directly from these central arrays where applicable.

### Constants Organization (No Barrel Files)
Place all module-wide constants strictly inside the `constants/` folder. Do not create barrel files or entry points to re-export constants. Import the specific constant file you need directly using absolute imports.

### Enum Registry Rule
Business statuses MUST originate from one constants source.
Status literals (e.g., `'ACTIVE'`, `'PENDING'`, `'SUSPENDED'`) are completely forbidden outside of constants and schemas. This prevents the AI from scattering magic strings everywhere.

### 3B.1 Static UI Configuration vs Server/API Data

The following separation is mandatory:

Static UI Configuration
→ Feature-specific constants

Server/API Data
→ API contract
→ TypeScript types
→ Zod schema
→ Module-owned MSW fixtures (frontend-first development)
→ Module API client
→ Real backend in production

UI State
→ Local state / module-scoped Zustand

Server State
→ TanStack Query

Never store backend-driven data as ordinary UI constants merely because the backend is not available yet.

For example:

- Status definitions may be feature constants when they are truly static UI configuration.
- Gym records, member records, invoice records, analytics results, etc. are server/API data even when mocked.
- Mocked server data MUST therefore live in the module's mock/fixture layer, not in component constants.

4. **Theme Independence & Portability Contract (No Inline Colors & No Opacity Modifiers)**: 
Remove all hardcoded Tailwind color utilities from the JSX. Map all CSS variables (e.g., `--bg-card`, `--text-primary`) as named tokens so you can use standard Tailwind classes like `bg-card` or `text-primary` **without** arbitrary bracket values. **The canonical pattern is: define variables in `globals.css`, map them as tokens (in Tailwind v4 via `@theme inline { ... }` directly in `globals.css`; in Tailwind v3 via `tailwind.config.ts`), and use semantic Tailwind class names (e.g., `bg-card`) in JSX. Never use `bg-[var(--bg-card)]` or raw hex `bg-[#1A1A2E]` directly in JSX.**
**CRITICAL:** Do NOT use opacity modifiers on semantic backgrounds (e.g., NEVER use `bg-success/10` or `bg-danger/5`). These destroy WCAG contrast and Dark/Light mode scaling. Instead, use the exact semantic variant, such as `bg-success-bg` or `bg-danger-bg`. Furthermore, anytime you use a solid background like `bg-success`, you MUST explicitly pair it with `text-on-success` so it doesn't default to unreadable text.
- **Theme Portability Contract:** Every module must have a small `[moduleName]_theme_contract.md` or a dedicated comment listing exactly which CSS variables it depends on (e.g., `--bg-card`, `--text-primary`, `--danger-text`, `--danger-bg`). This ensures that when copying the module into a new project, we know exactly what variables need to be defined in the new `globals.css`.

## 4A. Module Portability Contract

A module is considered AI-portable only when all feature-specific artifacts are owned by that module.

The module should contain:

- UI
- Components
- Hooks
- State
- API clients
- Types
- Schemas
- Constants
- Utilities
- Tests
- Mock fixtures
- MSW handlers
- Feature documentation
- Forbidden documentation
- Theme contract

External dependencies must be limited to approved global infrastructure.

The module's feature documentation MUST explicitly list every unavoidable external infrastructure dependency.

The goal is:

"Give the AI the module folder first.
Only provide external infrastructure files when the documented repair actually requires them."


5. **Smart & Isolated State Management (The Canonical Decision Boundary)**: 
Because the components will be heavily micro-modularized, avoid creating a massive web of prop drilling. Do NOT bloat the global app state; keep the state architecture isolated to the feature.
**The Canonical Decision Boundary:**
- **React Context:** Context is allowed only for stable cross-tree application concerns that are not server-state ownership, such as theme, locale, session shell, or feature flags. Never put API data or loading states in Context. You MUST implement proper memoization (`useMemo`, `useCallback`) to prevent massive re-render chains.
- **Zustand (module-scoped store):** For UI-only shared state within a module (active filters, selected rows, wizard progress, table column preferences, local draft state). Do NOT store API response data or loading states here — see Rule 15C for the canonical Server State vs Client State decision matrix (TanStack Query is the single source of truth for all server/async data).
- **Local `useState`:** Only for state that is strictly private to a single component and never needs to be shared.

### One Store Rule
**Preferred:** Single primary Zustand store (e.g. `useAdminMembersStore.ts`).
**Allowed:** Multiple stores (like `useManagerMembersTableStore.ts`, `useManagerMembersSelectionStore.ts`) ONLY when they represent genuinely independent repair boundaries for large modules. Explicit documentation is required.
*Why:* Strict single-store rules can collide with Extreme Isolation in massive modules.

### Derived Data Ownership Rule
Derived calculations MUST have exactly one owner.
- ✅ **Allowed:** `fullName`, `membershipStatus`, `expiryIndicator`, `kpiSummaries` centralized in one place.
- ❌ **Forbidden:** Same derivation repeated across components, hooks, and tables.

### Circular Dependency Rule
Forbidden:
- `A -> B -> A`
- `Hooks -> Store -> Hooks`
- `Components -> Components -> Parent`
- `API -> Hook -> API`
Every dependency chain MUST remain acyclic. AI accidentally creates loops, and this strictly bans them.

6. **Separation of Logic and UI (Custom Hooks for Extreme Isolation)**: 
Do not mix complex React logic (`useEffect`, multi-step state calculations, data transformations) with JSX markup.
Extract all heavy logic into an adjacent custom hook file (e.g., `use[ComponentName].ts`). The actual `.tsx` file MUST act purely as a "View" layer that consumes the hook.
*Why?* If there is a bug in the calculation logic, you feed the AI only the `use...` file. It fixes the logic with zero risk of accidentally deleting a `<div>` or altering the UI structure.
*Consequence of violation:* Mixing business/API/state calculations directly inside JSX markup destroys isolation, triggers unnecessary re-renders, makes headless unit testing impossible, and causes regression bugs during logic repairs. Finding business calculations or direct API calls in JSX = `NON_COMPLIANT`.

### Main Component Ownership Rule
Every autonomous sub-module MUST contain exactly one `[Role][Submodule]Main.tsx` (e.g. `AdminMembersDirectoryMain.tsx`). This component MUST be placed inside the sub-module's `components/` folder, NOT in the sub-module root folder. It orchestrates the layout, assembles child components, and manages route-level providers. 
*(Note: `page.tsx` in the sub-module root folder is just a minimal Next.js route-entry wrapper that imports and renders `[Role][Submodule]Main.tsx`).*
- **Forbidden in Main.tsx:** API calls, fetch logic, business calculations, validation logic, transformation logic, large `useEffect` chains.
*Why:* Prevents the AI from creating a monolithic "God Component".

### Dependency Direction Rule
The dependency flow within a module MUST be strictly unidirectional to prevent architectural loops:
- ✅ **Allowed:** `Page -> Main -> Hooks -> API` OR `Page -> Main -> Store`
- ❌ **Forbidden:** `API -> Component`, `Store -> Component`, `Component -> API` (bypassing the hook), `Schema -> Component`

### NO FAKE INTERACTION RULE
A visible user interaction MUST produce its documented downstream behavior.

❌ **Forbidden:**
- Empty `onClick` handlers
- `console.log`-only handlers
- TODO handlers
- Placeholder alerts
- Fake success messages
- Save buttons that do not persist data
- Apply buttons that do not affect results
- Filters that do not affect data
- Pagination that does not change result pages
- Retry buttons that do not retry
- Export buttons that do not generate output

A user interaction is considered complete only when:
```
UI Interaction
→ Handler
→ State Change
→ API / Domain Action
→ Success or Error Feedback
→ UI Update
```
A visible control without functional closure MUST be treated as a defect.

7. **Interface & Type Isolation (The Prop Blueprint)**:
Never define complex `Interfaces` or `Types` directly inside the component files. Extract all TypeScript definitions (Component Props, API Payloads, State Shapes) into a dedicated `types/` folder.
- **No Inline String Type Unions:** Never hardcode string type unions or any values as string literals (e.g., `'idle' | 'loading' | 'success' | 'error'`) inline inside interfaces or hook declarations. Always extract these into a named type inside the module's `constants/` or `types/` folder.

#### SCHEMA ORGANIZATION (NO BARREL FILES)
Place all schema files strictly inside the `schemas/` folder. Do not create barrel files or single entry points to re-export them. Import the specific schema you need directly using absolute imports.

Separate schemas where responsibility requires them. Examples:
- `AdminMembersCreateSchema.ts`
- `AdminMembersUpdateSchema.ts`
- `AdminMembersSearchSchema.ts`

### TypeScript Strictness and Runtime Contract Validation

The project MUST enforce the following `tsconfig.json` settings:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUncheckedIndexedAccess": true,
  "verbatimModuleSyntax": true
}
```

Rules:
- `any` is strictly forbidden. Use `unknown` and narrow it safely.
- `@ts-ignore` and `@ts-nocheck` are forbidden.
- All API response payloads must be validated at the API boundary using Zod before application code consumes them.
- Prefer backend-generated OpenAPI types where an OpenAPI/Swagger contract exists.
- Generated API types must remain separate from domain/UI types.

Recommended structure:
```text
types/
  ManagerMembersApiGenerated.ts
  [Role][Submodule]Types.ts
schemas/
  [Role][Submodule]Schemas.ts
```

8. **Strict Server vs. Client Component Boundaries (Next.js Specific)**: 
Respect the Next.js App Router architecture. `page.tsx` and `layout.tsx` MUST remain Server Components unless a documented framework exception exists.

### Route Ownership Rule
One route = One `page.tsx`.
`page.tsx` owns ONLY rendering, server prefetch, and layout assembly.
- ❌ **Forbidden in page.tsx:** Business calculations, validation, API orchestration.

For data-driven interactive modules using TanStack Query + MSW, prefer the module API client/query layer as the canonical data access path.
Server-side prefetching/hydration MAY be used when explicitly implemented. When the backend is unavailable, server-side prefetch/hydration MUST either be disabled for that feature or use an explicitly documented server-compatible mock transport. Browser MSW remains the standard frontend/client test transport. The module API contract and query key MUST remain identical in either path.
Do not create separate server-only and client-only data contracts for the same feature.

### Server Data vs Client Data Rule

Use Server Components for:
- Initial page-level data required to render the route.
- Secure server-only operations. (See Rule 15C for server state policy).
- SEO-relevant content.
- Reading server-only environment variables.

Use Client Components for:
- Forms, filters, live search, table interactions, modals, dropdowns, charts, and browser APIs.
- Client-side mutation workflows.
- WebSocket-driven UI updates.

Do not duplicate the same endpoint fetch in both `page.tsx` and a client hook without an explicit hydration strategy.

If initial server data is passed into a Client Component:
- Document the query key.
- Hydrate/cache it through the approved server-state library.
- Avoid maintaining an unrelated duplicate local state copy.

### Query Key Registry Rule
Every autonomous sub-module MUST contain a dedicated registry for TanStack query keys located strictly inside its `api/` folder (e.g., `api/admin_members_directory.query_keys.ts`):
```typescript
export const ADMIN_MEMBERS_QUERY_KEYS = {
  all: ['admin_members'] as const,
  lists: () => [...ADMIN_MEMBERS_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...ADMIN_MEMBERS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_MEMBERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_MEMBERS_QUERY_KEYS.details(), id] as const,
};
```
*Why:* Prevents the AI from inventing random, uncoordinated query keys like `['members']`, `['member']`, or `['member-list']`. This factory pattern also allows surgical invalidation.

#### RESOURCE IDENTITY PRESERVATION RULE
Whenever data belongs to a specific resource, query keys MUST include the resource identity.

❌ **Forbidden:**
- `['member']`
- `['profile']`
- `['gym']`

✅ **Required:**
- `['admin_members', 'detail', memberId]`
- `['manager_attendance', 'profile', memberId]`
- `['superadmin_gyms', 'detail', gymId]`

Two different resources MUST NOT share the same cache entry.

Resource identity must remain consistent across:
```
Route
→ Selected Resource
→ Query Key
→ Request Parameter
→ API Response
→ Rendered UI
```
A route representing Resource A MUST NOT display cached data from Resource B. Failure to preserve resource identity is a **CRITICAL architectural violation**.

### Mutation Hook Rule
Mutations MUST be orchestrated through dedicated mutation hooks (e.g., `useCreateAdminMember.ts`, `useUpdateAdminMember.ts`, `useDeleteAdminMember.ts`).
Components MUST NEVER call TanStack mutations directly or mix mutation logic inside JSX.

9. **Leverage Next.js Native Features & Typed Error Boundaries**: 
Ensure that the module properly utilizes Next.js native routing features for a great user experience.
- **Top Routing Progress:** Every Next.js route transition MUST trigger a top progress bar (`nextjs-toploader`) to indicate background navigation. Color: `--primary`.
- **`loading.tsx` (Skeleton UI):** You MUST extract loading states into a `loading.tsx` file wherever applicable in the module's directory. Never use a generic spinning circle for a full page load. Instead, design a premium Skeleton UI that mimics the actual layout of the page (using `bg-skeleton-base` and `bg-skeleton-highlight`).
- **`error.tsx` (Error Boundaries):** Beyond the global `error.tsx`, every module must have a typed React Error Boundary component (`[ModuleName]ErrorBoundary.tsx` or a standard Next.js `error.tsx`) that serves as the route-segment error boundary. It must display a module-specific fallback UI matching the app shell (not a generic "Something went wrong" browser error) and include a primary "Retry" button that calls `reset()`.

### Granular Error Boundary and Error Reporting Rules

Route-level `error.tsx` is mandatory but not enough.

Section Error Boundaries protect against render/component/runtime failures. TanStack Query request failures should use inline section error UI unless the query is explicitly configured to throw into the Error Boundary. Every independently loaded or independently fetched UI section must be wrapped in a section-level Error Boundary where failure should not crash the entire route.

Examples:
- Dashboard chart
- Analytics widget
- Data table
- Payment summary panel
- WebSocket activity feed

Requirements:
- Use a standard shared `ErrorBoundary` implementation.
- Display a module-specific fallback matching the global design system.
- Provide a Retry action where retrying is meaningful.
- Never expose raw stack traces, backend errors, tokens, or internal error details to users.
- Log caught errors to the approved monitoring provider with:
  - route
  - module name
  - user ID if safely available
  - error digest / request ID
  - timestamp

Error fallback hierarchy:
1. Component/section boundary
2. Module-level boundary
3. Route-level `error.tsx`
4. Global application boundary
- **`not-found.tsx` (404 Handling):** Handle missing dynamic routes gracefully by defining a `not-found.tsx` file. It MUST be beautifully branded and offer a clear "Back to Dashboard" button.

10. **Absolute Imports Only (No Relative Paths)**: 
Never use relative imports (like `../../` or `./`) for importing components, contexts, utilities, or types. Always use absolute imports starting with `@/` (e.g., `@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_context/SuperadminGymsContext`).
*Why?* This allows files to be moved around easily without breaking import paths and makes it much easier to copy-paste code snippets or have an AI generate standalone code without worrying about relative directory depth.
*Consequence of violation:* Relative imports break module extraction and portability, produce fragile import chains that fail during refactoring, and bypass ESLint boundary protection. Finding ANY relative import (`../` or `./`) outside of Next.js routing convention = IMMEDIATE `NON_COMPLIANT` AUDIT FAILURE.

### Generated Code Exception to Absolute Imports

The absolute-import rule applies strictly to handwritten application and feature code.

Generated code located under `src/generated/**` (such as OpenAPI, Orval, or swagger-codegen artifacts) may use internal relative imports as required by the generator engine. Generated files MUST NOT be manually refactored, edited, or rewritten merely to satisfy handwritten import style conventions.

Generator configuration and generated output integrity must be verified automatically in CI. Handwritten feature code consuming generated contracts MUST import them exclusively through approved absolute paths (e.g., `@/generated/openapi/...`).

11. **Centralized URL Configuration (No Hardcoded URLs)**: 
Never hardcode URLs (e.g., `/api/auth/refresh`, `/login`, etc.) directly into API wrappers or React components. Each autonomous sub-module must have exactly one centralized URL configuration file, placed at `config/[role]_[submodule].url_config.ts` (e.g., `config/admin_billing_invoices.url_config.ts`). This file must export all internal page routes and external API routes used by that module as named constants: `[ROLE]_[SUBMODULE]_ROUTES` and `[ROLE]_[SUBMODULE]_API`. Module-owned API/navigation call sites MUST use their module URL config. Global infrastructure may receive a fully constructed path/URL as an argument and MUST NOT own module-specific URLs.
*Consequence of violation:* Hardcoded URLs create silent 404s upon routing refactors, break multi-tenant reverse proxy mappings, and make centralized URL auditing impossible. Finding raw endpoint strings in components or hooks = `NON_COMPLIANT`.

### CANONICAL `config/[role]_[submodule].url_config.ts` TEMPLATE (GAP-18 Fix)

Every sub-module `config/[role]_[submodule].url_config.ts` MUST follow this exact shape. AI agents MUST generate this file for every module — no improvisation allowed.

```typescript
// config/[role]_[submodule].url_config.ts
// Owned by: [role]/[domain]/[submodule] autonomous sub-module
// API endpoint exports MUST NOT be imported outside this feature module.
// Route exports may be imported only by the owning role-level navigation layer
// for navigation wiring. Sibling business features must never import either export.

// ─── Internal Navigation Routes ────────────────────────────────────────────
// These are the Next.js page routes owned by this module.
export const [MODULE_NAME]_ROUTES = {
  /** Root list / index page */
  root: '/[role]/[module]' as const,
  /** Dynamic detail page — usage: `[MODULE_NAME]_ROUTES.detail(memberId)` */
  detail: (id: string) => `/[role]/[module]/${id}` as const,
  /** Create/add page (if applicable) */
  create: '/[role]/[module]/add' as const,
} as const;

// ─── External API Endpoints ─────────────────────────────────────────────────
// These are the backend API endpoint paths consumed by this module.
export const [MODULE_NAME]_API = {
  /** GET  /api/v1/[role]/[module]  — paginated list */
  list: '/api/v1/[role]/[module]' as const,
  /** POST /api/v1/[role]/[module]  — create */
  create: '/api/v1/[role]/[module]' as const,
  /** GET  /api/v1/[role]/[module]/:id  — single record */
  detail: (id: string) => `/api/v1/[role]/[module]/${id}` as const,
  /** PATCH /api/v1/[role]/[module]/:id  — update */
  update: (id: string) => `/api/v1/[role]/[module]/${id}` as const,
  /** DELETE /api/v1/[role]/[module]/:id  — delete */
  delete: (id: string) => `/api/v1/[role]/[module]/${id}` as const,
} as const;
```

### Module URL Config Import Boundary & Allowed Exports

Only two module URL exports are permitted from `[moduleName]_url_config.ts`:
- `[MODULE_NAME]_ROUTES` — internal browser navigation paths
- `[MODULE_NAME]_API` — backend endpoint paths

`[MODULE_NAME]_URLS`, `ROUTES_CONFIG`, endpoint constants scattered across API files, or alternative route naming objects are forbidden.

**Import boundary:**
- `[MODULE_NAME]_API` may be imported only inside the owning feature module (by its own API client and MSW handlers).
- `[MODULE_NAME]_ROUTES` may be imported by:
  1. the owning feature module (for internal links, redirections, and tab views); and
  2. the owning role-level navigation configuration only (sidebar, navbar, breadcrumbs).
- A sibling feature module MUST NOT import another feature's `_ROUTES` or `_API`. Cross-module business consumption is strictly prohibited.

**Rules:**
- Replace `[MODULE_NAME]`, `[role]`, `[module]` with the actual values.
- Add/remove endpoint entries to match the actual backend contract.
- All string literals MUST use `as const` for type safety.
- Dynamic segments use a function form (e.g., `detail: (id: string) => ...`).
- AI MUST NOT hardcode these strings directly in API client files.

#### STRICT SUB-FOLDER PLACEMENT RULE (NO ROOT FACADES)
All files (Constants, Schemas, QueryKeys, API, Main component, etc.) MUST be placed STRICTLY inside their corresponding canonical sub-folders inside the autonomous sub-module (e.g., `api/`, `schemas/`, `components/`, `hooks/`, `state/`, `types/`, `utils/`, `mocks/`, `tests/`, `contracts/`). 
DO NOT place facade files or entry-point files in the root of the feature domain or sub-module folder. 

**THE ROOTS ARE QUARANTINED:**
- **Domain Root Quarantine:** The feature domain root (`src/app/frontend_{role}/{role}_{domain}/`) contains ONLY `layout.tsx` (tab navigation shell), `page.tsx` (sub-module redirect), master domain documentation trio, and autonomous sub-module directories `{domain}_{capability}/`. ZERO business code, components, or API calls allowed.
- **Autonomous Sub-Module Root Quarantine:** The sub-module root (`{domain}_{capability}/`) contains ONLY Next.js route entry files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`), `config/[role]_[submodule].url_config.ts`, `contracts/host-stubs.d.ts`, and the Documentation Trio (`[role]_[submodule]_features.md`, `[role]_[submodule]_forbidden.md`, `[role]_[submodule]_theme_contract.md`). ALL OTHER BUSINESS FILES MUST go inside canonical subfolders (`components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `constants/`, `locales/`, `mocks/`, `utils/`, `tests/`) with `[Role][Submodule][Name]` prefixing where applicable. `contracts/host-stubs.d.ts` is the sole mandatory portability exception. ZERO OTHER ROOT BUSINESS FILES.

For example, `ManagerAttendanceDashboardSchema.ts` MUST live inside `attendance_dashboard/schemas/ManagerAttendanceDashboardSchema.ts`. It MUST NOT be placed at the root of `manager_attendance/` or `attendance_dashboard/`. Any non-whitelisted file placed in root = ARCHITECTURAL VIOLATION = REJECTED MODULE.

#### NO API FACADES (NO BARREL FILES)
Do not create API facade files or barrel files (like `index.ts` or `AdminMembersApi.ts` that just re-export other files). Since we use absolute imports (`@/`), you MUST import the specific file you need directly (e.g., `import { createMember } from '@/app/frontend_admin/admin_members/members_directory/api/AdminMembersDirectoryCrudApi'`). This ensures clean tree-shaking, clear file paths, and prevents circular dependencies.

Internally, the module MUST organize implementation into specific files when required. Examples:
- `AdminMembersCrudApi.ts`
- `AdminMembersExportApi.ts`
- `AdminMembersPaymentApi.ts`

12. **No Hardcoded HTTP Status Codes**: 
Never hardcode numeric HTTP status codes (e.g., `401`, `500`, `200`) in API routes, proxies, or fetch wrappers. Always use standard enums/constants from libraries like `http-status-codes` (e.g., `StatusCodes.UNAUTHORIZED`). This improves code readability and prevents silly typos in status codes.
*Consequence of violation:* Numeric status codes like `401` or `500` obscure intent, introduce magic number errors, and break linting. Finding raw status numbers in logic = `NON_COMPLIANT`. Use `StatusCodes` from `http-status-codes` or framework HTTP status enum.

## AI Context Isolation Contract

The FEATURE MODULE is the canonical AI context boundary.

For a feature-specific task, the AI MUST begin with the owning feature folder and MUST NOT automatically expand context to the role container or application.

Example:

```text
Bug:
Billing invoice filter is broken

Preferred AI context:

/admin_billing/
```

NOT:

```text
/frontend_admin/
/frontend_manager/
/frontend_superadmin/
```

and NOT the entire application.

The AI may expand context only when:

1. the feature's documentation explicitly identifies an external application-infrastructure dependency;
2. the dependency is genuinely infrastructure rather than business behavior;
3. the feature cannot be correctly repaired without inspecting that dependency.

The AI MUST NOT expand context merely because another feature contains similar code.

---

## AI TASK COMPLETION REPORT

Every AI creation, audit, or repair task must conclude with this standardized report:

```markdown
## AI TASK COMPLETION REPORT
1. Scope
   - Owning Feature Module: `[path]`
   - Allowed Infrastructure Inspected: `[paths]`
2. Changed Files
   - Exact path list of modified/created files
3. Rules Verified
   - Verified Rule IDs with concrete source line evidence
4. Deferred to Host Runtime
   - `DEFERRED_TO_HOST_RUNTIME` items with exact CLI verification commands
5. Verified Exceptions
   - Any documented exception with Rule ID, reason, and risk analysis
6. Test Evidence
   - Unit/Component/E2E tests created or updated and behavioral proof
7. Contract Integrity
   - API, schema, MSW, docs, permissions, routes verified unchanged or updated
```

---

## APPROVED APPLICATION INFRASTRUCTURE ALLOWLIST

Feature modules may import ONLY from the following approved external application infrastructure areas:

- `src/lib/api.ts` (Global API transport wrapper)
- `src/config/env.ts` (Validated environment configuration)
- `src/lib/auth/*` (Authentication/session token management)
- `src/lib/permissions/*` (Role and permission evaluator utilities)
- `src/lib/monitoring/*` (Error monitoring and telemetry adapters)
- `src/lib/telemetry/*` (Logging and telemetry infrastructure)
- `src/lib/display_value.ts` (`displayValue()` zero-business neutral null/empty-state primitive only)
- `src/components/ui/*` (Zero-business UI primitives: Button, Input, Dialog, Tooltip, etc.)
- `src/components/providers/*` (Application-level React context providers)
- `src/design-system/*` (Global design tokens and theme constants)
- `src/infrastructure/msw/browser.ts` (Global MSW bootstrap and handler registry)
- `src/generated/openapi/*` (OpenAPI generated transport types)

Every allowed import path must be classified as transport, auth, security, platform provider, design primitive, generated contract, or observability.
Any path not in this allowlist is forbidden by default. Sibling feature modules are strictly excluded from this allowlist.

`src/lib/display_value.ts` may export only `displayValue()` for neutral rendering of nullish or empty UI values.
A global business formatter library is forbidden.
Currency, dates, phone numbers, tax, invoices, membership lifecycle labels, financial values, and feature-specific status formatting MUST remain feature-local inside the autonomous sub-module `utils/` folder.

---

### FEATURE-TO-FEATURE BUSINESS DEPENDENCY FIREWALL

Every feature module is an independent business boundary.

Sibling feature modules MUST be treated as isolated business systems even when they exist under the same role container.

For example:

```text
src/app/frontend_admin/admin_members/
src/app/frontend_admin/admin_billing/
src/app/frontend_admin/admin_reports/
```

are independent business modules.

Therefore:

```text
members → billing business logic       FORBIDDEN
billing → members business logic       FORBIDDEN
reports → billing business logic       FORBIDDEN
```

The same rule applies to all roles and all application areas.

A feature MUST NOT import business behavior from:

* sibling feature components
* sibling feature hooks
* sibling feature stores
* sibling feature contexts
* sibling feature API services
* sibling feature types
* sibling feature schemas
* sibling feature constants
* sibling feature utilities
* sibling feature fixtures
* sibling feature MSW handlers
* sibling feature tests
* role-level business folders
* another role's feature modules

---

### Allowed External Dependencies

A feature MAY depend on:

* framework packages
* third-party packages
* approved application infrastructure
* genuinely generic zero-business-logic UI primitives
* explicitly documented framework/application bootstrap mechanisms

These dependencies MUST be stable infrastructure contracts.

A feature MUST NOT treat another business feature as infrastructure.

---

### LOCAL OWNERSHIP OVER CROSS-FEATURE REUSE

When a feature requires business behavior similar to another feature, the default action is to implement or duplicate the required feature-specific behavior locally.

Do NOT create:

```text
global business utils
global business hooks
global business components
global business API services
global role-wide domain types
global role-wide fixtures
```

merely to avoid duplication.

If extracting shared code would create hidden business coupling or increase AI context requirements, prefer local duplication.

### AI Change Scope Integrity Gate

AI MUST produce a changed-file list and MUST fail the task if files outside the owning module changed unexpectedly, except approved global infrastructure files explicitly listed in the module feature map.

### HARD FEATURE WRITE BOUNDARY

For a feature-specific repair, the default writable scope is:

```text
[owning-feature]/**
```

The AI MUST NOT modify sibling business features or unrelated application code.

Example:

```text
Task:
Fix bug in `src/app/frontend_admin/admin_billing/`

Allowed by default:

src/app/frontend_admin/admin_billing/**
```

Not allowed:

```text
src/app/frontend_admin/admin_members/**
src/app/frontend_admin/admin_reports/**
/frontend_superadmin/**
/frontend_manager/**
```

even if those modules contain similar code.

If a feature-local bug appears to require another business feature to be changed, the AI MUST NOT silently modify that other feature.

Instead, the AI MUST first determine whether:

1. the dependency should be moved into the owning feature;
2. the required behavior should be duplicated locally;
3. the dependency is actually application infrastructure;
4. the issue is outside the feature's documented scope.

Normal feature repairs should end with changes contained within the owning feature.

---

### CHANGE SCOPE FAILURE CONDITION

A feature repair FAILS the architecture gate when the AI:

* changes an unrelated business module;
* creates a new sibling-feature dependency;
* moves feature business logic into a role-level folder;
* creates a new global business helper merely to solve the local bug;
* imports another feature's business fixtures;
* modifies another feature's mock handlers;
* modifies unrelated feature state;
* changes unrelated routes without documented necessity.

The AI MUST report the complete changed-file list at the end of the task.

The expected normal result is:

```text
Changed files:
[moduleName]/**
```

with only documented application-infrastructure changes allowed as exceptions.

13. **Update AI-Context Documentation (The Feature Map)**:
Once the entire refactor is complete, generate or update a `[moduleName]_features.md` documentation file inside the module's root folder. This document MUST serve as a master map for future AI sessions and human developers. A future AI reading only this file must be able to answer: What does this module do? What can the user do in it? What files handle what? What are the API endpoints? What must never be broken?

### Source Code as Last Resort Mandate
An AI agent or engineer MUST be able to completely understand the feature's business purpose, user flows, state lifecycle, API contracts, permissions, test requirements, and edge cases purely by reading `[moduleName]_features.md` and `[moduleName]_forbidden.md`.
- **The Rule:** Source code inspection MUST be the last resort, never the starting point.
- **The Rationale:** When an AI is forced to reverse-engineer business intent from JSX markup and complex React hooks, hallucinations soar to 80%. When the AI operates against verified contract documentation, guessing drops below 5%. If an AI cannot understand the feature without opening source code files, the documentation has FAILED.

### The Documentation Quality Standard

**CRITICAL — The difference between useful and useless documentation:**

❌ **BAD (what AI agents produce by default — completely useless):**
```
## Module Purpose
Handles gyms operations, UI display, and logic isolation.

## Feature Inventory
| Feature Name | Route Path | Description      | API Endpoint | Status        |
|--------------|------------|------------------|--------------|---------------|
| Core UI      | /gyms      | Main module view | TBD          | Frontend Team |

## Edge Cases / AI Warnings
- Do not bypass API interceptors.
- Do not mix complex React logic with JSX markup.
```

✅ **GOOD (what this rule mandates — gives full context to any AI or human):**
```
## Module Purpose
The Gyms module is the master tenant registry for the Smart Gym Management SaaS platform. Superadmins
use it to onboard new gym branches, view all active/suspended tenants, manage their
subscription tier, and drill into per-gym usage metrics. It is the entry point for all
tenant lifecycle operations (create → activate → suspend).

## Feature Inventory
| Feature         | Route                                         | What the User Can Do                                                                 | Key Components                   | Main API Calls                                       | Status  |
|-----------------|-----------------------------------------------|--------------------------------------------------------------------------------------|----------------------------------|------------------------------------------------------|---------|
| Gym List        | /frontend_superadmin/superadmin_gyms          | Paginated table of all tenants with status badges, search, and filter by plan/status | `SuperadminGymsTable.tsx`        | GET /api/v1/superadmin/gyms?page&limit&search&status&planId | ✅ Live |
| Add Gym         | /frontend_superadmin/superadmin_gyms/add      | Multi-step onboarding form: gym details → owner account → plan selection → confirm   | `SuperadminGymsAddWizard.tsx`    | POST /api/v1/superadmin/gyms                         | ✅ Live |
| Gym Detail      | /frontend_superadmin/superadmin_gyms/[id]     | Full profile: contact info, subscription history, usage stats, staff count           | `SuperadminGymsProfile.tsx`      | GET /api/v1/superadmin/gyms/:id                      | ✅ Live |
| Suspend/Restore | /frontend_superadmin/superadmin_gyms (inline) | Toggle gym active status — requires double-confirm modal                             | `SuperadminGymsSuspendModal.tsx` | PATCH /api/v1/superadmin/gyms/:id/status             | ✅ Live |

## Edge Cases / AI Warnings
- Suspending a gym immediately blocks ALL users of that tenant from logging in — this is
  irreversible until manually restored. Always use useConfirm() from SuperadminConfirmProvider with a typed warning message.
- The Add Gym form is a 3-step wizard. Step 3 (plan selection) fetches live plan data from
  GET /api/v1/superadmin/plans — do NOT hardcode plan options.
- Gym IDs are UUIDs, not sequential integers. Never use array index as a key.
- The status badge color mapping lives in SuperadminGymsConstants.ts — do not inline colors.
```

The rule is simple: **if a section contains "TBD", "Main module view", "Do not bypass API interceptors", or any other generic filler, the documentation FAILS this rule and must be rewritten.**

### Mandatory `[moduleName]_features.md` Template with Content Requirements

Every module feature map MUST use this structure. Each section has mandatory content depth requirements listed below it.

```markdown
---
feature: "[role]_[submodule]"
owner_role: "[role]"
module_version: 1
api_contract_source: "verified-api-contract | normative-rules"
last_verified_date: "YYYY-MM-DD"
last_verified_commit: "commit-sha-or-host-unavailable"
documentation_status: "current"
portability_score: "8/8"
---

# [Module Name] — Feature Map (ALL 22 CANONICAL SECTIONS)

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)
[REQUIRED: 3–6 sentences. Must answer: (1) What business problem does this module solve?
(2) Who uses it (which role/persona)? (3) What are the 3–5 most important things a user
can DO in this module? (4) What is strictly OFF-LIMITS for this role in this module?
If an AI or engineer has only 30 seconds, reading this section alone must convey complete business context.
Generic phrases like "handles X operations" are forbidden.]

### Feature Ownership & System Context
- **Feature / Role Owner:** [e.g., "Gym Manager / Operations Team"]
- **Backend Microservice / API Base:** [e.g., "members-service (`/api/v1/manager/members`)"]
- **Authoritative Database Tables:** [e.g., `members`, `memberships`, `member_attendance_logs`]
- **Background / Queued Jobs:** [e.g., `member_sync_queue`, `biometric_device_sync_cron` — "None" if purely synchronous]

### Dependency Manifest
- **State Pattern:** TanStack Query v5 (server state) + Zustand (UI state) + URL search params
- **Form & Validation:** React Hook Form + Zod schemas
- **Icons & Primitives:** Lucide React + headless primitives

### Autonomous Sub-Module Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `components/` | Renders the paginated member list table, modals, and detail views | `ManagerMembersTable.tsx`, `ManagerMembersTableRow.tsx`, `ManagerMembersProfileModal.tsx` |
| `hooks/` | Domain query and mutation hooks | `useManagerMembersList.ts`, `useManagerMembersMutations.ts` |
| `api/` | All API calls for member CRUD, renewal, payment recording | `ManagerMembersCrudApi.ts` |
| `types/` | TypeScript interfaces for Member, MembershipRecord, PaymentRecord, form DTOs | `ManagerMembersTypes.ts` |
| `schemas/` | Zod validation schemas for forms and payloads | `ManagerMembersSchemas.ts` |
| `state/` | Zustand store for selected member ID, active tab, filter state | `useManagerMembersStore.ts` |
| `utils/` | Feature-local formatters and helpers (Strict WET) | `ManagerMembersFormatters.ts` |
| `mocks/` | Module-specific MSW handlers and fixtures | `ManagerMembersMockHandlers.ts`, `ManagerMembersMockFixtures.ts` |
| `tests/` | Unit, component tests and standalone mounting harness | `ManagerMembersTable.test.tsx`, `ManagerMembersHarness.tsx` |

### Approved External Dependencies & Expected Host Contract
[REQUIRED: Maximum 7 Application Infrastructure items permitted under the Feature Dependency Budget. Each dependency MUST document its exact expected TypeScript interface/contract so an isolated AI never guesses.]

- `@/lib/api` — `apiFetch<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>`
- `@/lib/logger` — `logger.info(msg, meta)`, `logger.error(msg, error)`
- `@/components/ui/Dialog` — zero-business-logic primitive `{ open: boolean, onOpenChange: (open: boolean) => void }`
- Host Session Context — `interface ExpectedAuthUser { id: string; role: Role; branchId: string; }`

Business Feature Dependencies:
- None (STRICTLY FORBIDDEN under Strict WET Principle)

Role-Level Business Dependencies:
- None

## 2. Screen Inventory & Component Responsibility Map
[REQUIRED: Every distinct user-facing feature/tab gets its own row. "Core UI" is NOT a feature.
Each row must have a real Purpose description (what the user actually does), real API
endpoints (not "TBD"), and an accurate Status. Minimum 1 row per meaningful UI section.]

| Feature / Screen | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Members Directory | `/frontend_manager/manager_members` | View paginated list, search by name/phone, filter by status, trigger member modals | `ManagerMembersTable.tsx`, `ManagerMembersSearch.tsx` | `fetchMembers()` | Complete |
| Member Detail Modal | Modal view over directory | View profile tabs (Overview, Membership, Attendance, Billing) | `ManagerMembersProfileModal.tsx` | `fetchMemberById()` | Complete |
| Member Registration | Modal view over directory | 3-tab registration wizard: Personal Info → Membership Plan → Payment | `ManagerMembersAddModal.tsx` | `createMember()` | Complete |

### Component Responsibility Map
[REQUIRED: Lists every component file with a one-line responsibility statement so an AI knows exactly which file to open.]

| Component File | Responsibility |
|---|---|
| `ManagerMembersMain.tsx` | Root client orchestrator. Owns layout, renders toolbar + KPIs + table. No direct API calls. |
| `ManagerMembersTable.tsx` | Renders paginated member rows. Handles row-click → opens profile modal. |
| `ManagerMembersProfileModal.tsx` | Full member detail modal with tabs. Receives `memberId` prop, renders profile using query-hook-provided data. |
| `ManagerMembersAddModal.tsx` | 3-tab add member form. Renders form and delegates submission to form/mutation hook. Closes on success. |
| `ManagerMembersKPIs.tsx` | 4 stat cards (Total, Active, Expired, Due Today). Read-only display. |
| `ManagerMembersEmptyState.tsx` | Empty state UI shown when table has zero rows. Has "Add Member" CTA. |

## 3. Navigation Contract & User Flows
[REQUIRED: Document the 2–4 most important multi-step user journeys in this module, route parameters, and zero-code logical integration points.]

### Flow 1: Add New Member
1. User clicks "Add Member" button in `ManagerMembersMain` toolbar
2. `ManagerMembersAddModal` opens (managed by `useManagerMembersStore.openAddModal`)
3. User fills 3-tab form: Personal Info → Membership Plan → Payment
4. On submit, `createMember(dto)` is called from `ManagerMembersCrudApi.ts`
5. On success: reconcile/invalidate the relevant TanStack Query cache using the authoritative backend response, modal closes, toast shows backend message
6. On error: form preserves entered data, inline error shown from `res.validationErrors` or `res.error`

### Flow 2: Renew Membership
1. User clicks any member row → `ManagerMembersProfileModal` opens
2. User navigates to "Membership" tab → clicks "Renew"
3. `ManagerMembersRenewalModal` opens with pre-filled current plan
4. On confirm: `renewMembership(memberId, dto)` called → Query cache invalidated/updated → toast shown

### Logical Integration Points (Zero Code Imports)
| Target Domain / Feature | Interaction Type | Data Flow / Event | Isolation Mechanism |
|---|---|---|---|
| `admin_members` | Entity Identity | Consumes `memberId` via route param or URL query | Zero code imports; state passed purely via URL / route params |
| `admin_billing` | Payment Status | Triggers billing redirect or receives payment verification via API | Decoupled via centralized API endpoint / route config |
| `notifications` | Async Alert | Dispatches or listens to server-sent WebSocket events | Centralized `WebSocketContext` at `@/lib/socket`, zero module-to-module imports |

## 4. API Contract & UI Data Requirements
[REQUIRED: Every API function in the module's API file must be listed with its exact
HTTP method, endpoint, request shape, and response type. All calls go through `apiFetch` with `ApiResponse<T>`.]

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchMembers(params)` | GET | `/api/v1/manager/members` | `{ page, limit, search, status }` | `Member[]` + `PaginationMeta` |
| `fetchMemberById(id)` | GET | `/api/v1/manager/members/:id` | — | `MemberDetail` |
| `createMember(dto)` | POST | `/api/v1/manager/members` | `CreateMemberDto` | `Member` |
| `updateMember(id, dto)` | PATCH | `/api/v1/manager/members/:id` | `UpdateMemberDto` | `Member` |
| `deleteMember(id)` | DELETE | `/api/v1/manager/members/:id` | — | `null` |
| `renewMembership(id, dto)` | POST | `/api/v1/manager/members/:id/renew` | `RenewalDto` | `MembershipRecord` |

### UI Data Requirements Mapping
| UI Element | Required Field(s) | API Endpoint | Response Path | Availability | Nullable? | Mocked? | UI Behavior When Unavailable |
|---|---|---|---|---|---|---|---|
| Table: Member Name | `name` | `GET /api/v1/manager/members` | `data.items[].name` | `required` | No | Yes | Render fallback text |
| Table: Status Badge | `status` | `GET /api/v1/manager/members` | `data.items[].status` | `required` | No | Yes | Neutral badge |
| Table: Phone | `phone` | `GET /api/v1/manager/members` | `data.items[].phone` | `permission_masked` in list | No | Yes | `maskSensitiveData()` |
| KPI: Total Revenue | `monthlyRevenue` | `GET /api/v1/manager/finance/stats` | `data.monthlyRevenue` | `permission_masked` | No | Yes | Hide KPI, show authorized summary |
| Filter: Status | `status` | `GET /api/v1/manager/members` | `data.items[].status` | `required` | No | Yes | All options |

Availability values: `required` (mandatory data), `nullable` (rendered via `displayValue()`), `permission_masked` (hidden/masked without breaking layout), `feature_flagged` (conditional field), `not_applicable` (static UI).

## 5. Query Key Registry & Server State
[REQUIRED: Strict query key factory to prevent cache collisions and enforce granular invalidation.]

```typescript
export const managerMembersKeys = {
  all: ['manager_members'] as const,
  lists: () => [...managerMembersKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...managerMembersKeys.lists(), params] as const,
  details: () => [...managerMembersKeys.all, 'detail'] as const,
  detail: (id: string) => [...managerMembersKeys.details(), id] as const,
};
```

- **Default Stale Time:** 60,000ms (1 minute)
- **Garbage Collection Time (`gcTime`):** 300,000ms (5 minutes)
- **Refetch on Window Focus:** `false` for large tabular reports; `true` for status-critical screens

## 6. Mutation Inventory & Lifecycle Operations
[REQUIRED: Document every state-modifying action, idempotency keys, and cache invalidation targets.]

| Mutation Action | HTTP Method | Target Endpoint | Payload DTO | Idempotency Key? | Cache Invalidation Target |
|---|---|---|---|---|---|
| Create Member | POST | `/api/v1/manager/members` | `CreateMemberDto` | Yes (`Idempotency-Key: UUIDv4`) | `managerMembersKeys.lists()` |
| Update Profile | PATCH | `/api/v1/manager/members/:id` | `UpdateMemberDto` | No | `managerMembersKeys.detail(id)`, `managerMembersKeys.lists()` |
| Renew Membership | POST | `/api/v1/manager/members/:id/renew` | `RenewalDto` | Yes (`Idempotency-Key: UUIDv4`) | `managerMembersKeys.detail(id)`, `managerMembersKeys.lists()` |
| Delete Member | DELETE | `/api/v1/manager/members/:id` | None | No | `managerMembersKeys.lists()` |

## 7. Permissions and Role Rules
[REQUIRED: Specify exact roles, protected actions, and guards. Generic statements are forbidden.]

- **Required role:** `MANAGER` — enforced by `middleware.ts` checking session token
- **Destructive actions and their guards:** Delete member → `useConfirm()` modal with warning: "This will permanently delete the member and all their records."
- **Sensitive data handling:** Phone numbers masked via `maskSensitiveData()` in list view. Full number visible only in profile modal.
- **Cross-role isolation:** Zero imports from `src/app/frontend_admin`, `src/app/frontend_trainer`, `src/app/frontend_superadmin`.
- **CODEOWNERS:** Operations / Security team review required for payment and deletion handlers.

## 8. State Ownership & Architecture Flow
- **Server State:** TanStack Query v5 (`useQuery`, `useMutation`). Authoritative server response reconciliation.
- **UI Transient State:** Zustand store (`useManagerMembersStore.ts`) — selected member ID, modal open states, active profile tab.
- **URL Search Params:** Search query (`?q=`), current page (`?page=`), active status filter (`?status=`). Never stored in Zustand.
- **Local Storage:** None (Strictly forbidden for business data).

### Module Architecture Flow
```text
Page (Route Entry & Quarantine: page.tsx)
      ↓
Child Components (Thin Composition, ≤300 lines in components/)
      ↓
Custom Hooks / Store (Zustand UI State + TanStack Query Server State)
      ↓
Module API Client (api/*Api.ts via apiFetch with ApiResponse<T>)
      ↓
MSW Handlers / Fixtures (Dev/Test) OR Real Backend API (Prod)
```

## 9. Offline, Loading, Empty, and Error States
[REQUIRED: Explicit state handling per major UI section.]

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking toolbar + 8 KPI cards + table with 5 ghost rows | N/A | `error.tsx` — module-branded error with Retry button calling `reset()` |
| Members table | Table-shaped skeleton matching rows/columns while query is fetching | `ManagerMembersEmptyState.tsx` — icon + "No members found" + "Add Member" CTA | Inline error banner with retry link |
| Profile modal | Skeleton tabs + ghost text lines | N/A | Inline "Failed to load profile" with retry |

- **Network Offline Fallback:** Surfaces user-friendly i18n message (`t('errors.network')`), never exposes raw fetch errors.

## 10. Security and PII Rules (Data Masking & Guards)
- **PII Fields:** Member phone numbers and email addresses masked in list views using `maskSensitiveData(phone)`.
- **Zero Client Secrets:** No backend API keys or service tokens embedded in client bundles.
- **Input Sanitization:** All text inputs validated and sanitized via Zod schemas before API submission.
- **Authorization Verification:** In-component role verification prevents rendering unauthorized mutation buttons.

## 11. Accessibility Requirements (A11y)
- **Keyboard Navigation:** Full Tab order through table rows, action buttons, and modal dialogs.
- **Modal Focus Traps:** Focus locked within active modals (`ManagerMembersAddModal`, `ManagerMembersProfileModal`) until dismissed.
- **ARIA Attributes:** `aria-expanded` on accordion rows, `aria-haspopup="dialog"` on modal trigger buttons.
- **Color Contrast:** All text passes WCAG AA minimum 4.5:1 contrast against surface backgrounds.

## 12. Background Tasks & Realtime Events
- **Realtime Attendance Feed:** Centralized `WebSocketContext` at `@/lib/socket` dispatches `MEMBER_CHECKIN` events.
- **Toast Notifications:** Standard backend-driven toast triggers upon successful mutation or async event.
- **Polling Fallback:** 30s background poll when WebSockets are unavailable.

## 13. Feature Flags & Tenant Settings
- **Biometric Sync Flag:** `useFeatureFlag('enable_biometric_sync')` controls biometric registration tab in modal.
- **Graceful Fallback:** If disabled, the biometric tab is cleanly omitted without layout breakage.
- **Tenant Currency & Timezone:** Consumed via Tenant Config Provider for locale-accurate formatting.

## 14. Cache Invalidation & Consistency
- **Authoritative Reconciliation:** Mutations return updated entity or triggers `queryClient.invalidateQueries({ queryKey: managerMembersKeys.lists() })`.
- **Multi-Tab Sync:** Query refetches on window focus for critical member status changes.
- **Optimistic Updates:** Disallowed for complex financial or biometric mutations; authoritative server response required.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
[REQUIRED: Specific, non-generic warnings for THIS module.]

- **Never call `window.confirm()` for member deletion:** Always use `useConfirm()` from `ManagerConfirmProvider`. `window.confirm()` is blocked in iframes and breaks styling.
- **Renewal form pre-fills current plan — do not reset on open:** `ManagerMembersRenewalModal` receives `currentPlan` as a prop and pre-fills the plan selector.
- **`deleteMember` removes ALL membership history:** Irreversible operation; confirm dialog must state this explicitly.
- **Member status badge colors are defined in `ManagerMembersConstants.ts`:** Never add inline color classes for status.
- **Phone number masking applies to list view only:** List view uses `maskSensitiveData()`, profile modal reveals full number.

## 16. Test Coverage Map & Quality Gates
- **Unit Test Files:** `ManagerMembersFormatters.test.ts`, `useManagerMembersList.test.ts`
- **Component Tests:** `ManagerMembersTable.test.tsx`, `ManagerMembersAddModal.test.tsx`
- **Mock Scenario Coverage:** ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED in `mocks/scenarios/`
- **Stress Datasets:** Tier 1 (10), Tier 2 (100), Tier 3 (500+) records in `mocks/fixtures/`

## 17. Architecture Exceptions (ADRs)
| Decision / Parameter | Chosen Approach | Rationale / Trade-Off | Date / Approver |
|---|---|---|---|
| Pagination Page Size | 50 rows default | Balanced throughput vs DOM node count for gym member tables | Standard Arch |
| Mutation State Update | Invalidation over Optimistic | Complex backend triggers (biometrics, billing recalculations) require authoritative server response | Standard Arch |
| Local Utility Duplication | Formatter kept module-local | WET principle strictly enforced to preserve AI portability and zero cross-module coupling | Rule 1A Compliance |

## 18. Known Contract Gaps & Bug Log
None

## 19. Rule Compliance Checklist (35+ Verification Items)
- [ ] Rule 0A.2: Universal Day-1 Sub-Module Architecture — Autonomous sub-modules at depth = 1
- [ ] Rule 1: Micro-modularization — sub-module subfolders, 300-line ceiling
- [ ] Rule 2: Total Role Isolation — zero cross-role imports verified
- [ ] Rule 3: Hyper-descriptive naming — role prefix on all files
- [ ] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX
- [ ] Rule 5: Smart State Management — Zustand for UI state, TanStack Query for server state
- [ ] Rule 6: Logic/UI Separation — custom hooks extract all useEffect/logic
- [ ] Rule 7: Type Isolation — all types in `types/` folder, no inline interfaces
- [ ] Rule 8: Server/Client Boundary — `page.tsx` = Server Component, `*Main.tsx` = Client
- [ ] Rule 9: Loading/error/not-found — `loading.tsx` + `error.tsx` present and non-generic
- [ ] Rule 11: Centralized URL Config — `[moduleName]_url_config.ts` file present, no hardcoded URLs
- [ ] Rule 13: Feature Map — this document is complete and non-generic
- [ ] Rule 14: Backend-driven messages — no hardcoded toast/alert strings
- [ ] Rule 15A: Tests present — co-located test files for hooks and utils
- [ ] Rule 15B: Forms use React Hook Form + Zod
- [ ] Rule 15C: State placed per Server/Client decision matrix
- [ ] Rule 15D: Env vars validated centrally, none exposed unsafely
- [ ] Rule 15E: Error monitoring wired for critical flows
- [ ] Rule 19: Clickable table rows — `cursor-pointer` on all `<tr>` elements
- [ ] Rule 26: Loading button states — `Loader2` spinners on all async actions
- [ ] Rule 30: Table controls — pagination, sorting, filtering implemented
- [ ] Rule 32: No barrel files — no `index.ts` re-exports
- [ ] Rule 40: `*_forbidden.md` file present and specific
- [ ] Rule 43: Sensitive data masking — `maskSensitiveData()` used in list views
- [ ] Rule 44: No `console.log` in production code
- [ ] Rule 48: Empty state component present per entity list
- [ ] Rule 55: No `key={index}` on reorderable/filterable lists
- [ ] Rule 64: Mobile-first — `flex-col sm:flex-row`, responsive breakpoints verified (320px, 375px, 768px, 1024px, 1440px)
- [ ] Rule 68: Table column count matches header count exactly
- [ ] Rule 71: Double verification — destructive actions use `useConfirm()` modal
- [ ] Rule 72: API function naming follows verb contract
- [ ] Rule 73: `import type` used for all type-only imports
- [ ] Rule 74: Security scan gates passed (SCA + secrets)
- [ ] Rule 75: Module-Owned MSW — feature-specific handlers live inside the owning module
- [ ] Module-Owned Fixtures — feature-specific mock data lives inside the owning module
- [ ] Global MSW Bootstrap Isolation — global MSW code contains infrastructure only
- [ ] Rule 75D: MSW fixture covers ALL UI fields — no missing table columns, KPIs, chart series, filters, or detail fields
- [ ] Mock Scenario Registry — `mocks/scenarios/` covers ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED
- [ ] Standalone Harness — `bootstrap.ts` / `[Role][Submodule]Harness.tsx` allows isolated component preview
- [ ] Module Self-Containment — all code, state, types, mocks, and docs owned by this feature module
- [ ] Feature Dependency Firewall — zero imports from sibling business features or parent shared folders
- [ ] Strict Maximum Nesting Depth Law — depth = 1 below domain container; sub-submodules strictly BANNED
- [ ] Deterministic 5-Gate Qualification Matrix — sub-module satisfies all 5 qualification gates
- [ ] AI Portability — this sub-module can be zipped independently as the default repair context
- [ ] Rule 76: CODEOWNERS covers security-critical paths
- [ ] Rule 78: En-dash fallback — `displayValue()` used for all nullable fields
- [ ] Rule 79: Unsaved changes guard — `useUnsavedChangesGuard(isDirty)` on all forms
- [ ] Rule 80: Currency formatting — feature-local formatter used, no raw `.toFixed()` in JSX
- [ ] Rule 81: Button loading width stability — `min-w` pattern used
- [ ] Rule 82: Toast deduplication — stable `id` passed to all `toast()` calls
- [ ] Mutation Safety: `Idempotency-Key` (UUIDv4) attached to all state-changing mutations
- [ ] Debounced Search: All live search/filter inputs debounced by ≥300ms
- [ ] Zero Horizontal Scroll: Verified across 320px, 375px, 425px, 768px, 1024px, 1440px, 1920px

## 20. Standalone Run, Mock & Test Harness
[REQUIRED: Exact commands, route paths, test credentials, and MSW mock scenario toggles to run, verify, and mock THIS specific sub-module in complete isolation.]

- **Primary Route Path:** `/frontend_{role}/{role}_{domain}/{domain}_{capability}`
- **Unit / Component Test Suite:** `npm run test -- src/app/frontend_{role}/{role}_{domain}/{domain}_{capability}`
- **Playwright E2E Suite:** `playwright_E2E/frontend_{role}_e2e/{role}_{domain}/{domain}_{capability}.spec.ts`
- **Seed Test User & Role:** `role: "MANAGER"`, `branchId: "branch-001"`, `tenantId: "tenant-dev"`
- **Mock Scenario Toggles:**
  - *Standard List:* MSW returns seeded fixtures array from `mocks/fixtures/`
  - *Empty State:* Query flag `?empty=true` triggers empty state component
  - *Error State:* Trigger 500 error / network failure to verify `error.tsx` boundary with retry CTA
  - *Permission Denied:* Set role to unauthorized to verify 403 / redirect
  - *Slow Network:* Simulated 2000ms latency to verify loading skeletons and button spinners

## 21. Module Portability & Host Integration Guide
[REQUIRED: Exact 4-step instructions to copy and plug this sub-module into another project or host app.]

1. **Folder Transfer:** Copy `src/app/frontend_{role}/{role}_{domain}/{domain}_{capability}` into target host.
2. **Route Registration:** Register route in host navigation/router config.
3. **Core Contracts Alignment:** Verify target host provides core plumbing (`@/lib/api`, `@/lib/logger`, `@/components/ui/` primitives).
4. **Mock / Live Backend Verification:** Verify immediate standalone execution via sub-module MSW fixtures, or connect to production backend via `_url_config.ts`.

## 22. Deliverables & Version History (8/8 Portability Score)
[REQUIRED: Every sub-module must score 8/8 before delivery freeze. Any unchecked box rejects the sub-module.]

### Feature Self-Audit & ZIP Portability Score
- [ ] **1. ZIP Self-Sufficiency:** Sub-module can be zipped and given to an external AI agent with zero parent codebase context and zero missing types.
- [ ] **2. Zero Cross-Module Business Imports:** Zero imports from sibling sub-modules or parent shared folders.
- [ ] **3. Mock Parity & Scenario Completeness:** Handlers cover all 5 canonical scenarios (ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED).
- [ ] **4. Standalone Harness / Bootstrap:** `bootstrap.ts` / `[Role][Submodule]Harness.tsx` mounts the sub-module in total isolation.
- [ ] **5. Token Integrity:** Zero hardcoded hex, RGB, or magic sizes; 100% theme token consumption.
- [ ] **6. Triad UI States:** Skeleton loading, non-generic EmptyState, and ErrorFallback with retry CTA verified.
- [ ] **7. Mutation Safety:** Idempotency key attached to all state-changing calls, double-click prevention verified.
- [ ] **8. Responsive Breakpoints:** Verified on 320px, 375px, 768px, 1024px, and 1440px viewports without horizontal overflow.

### Module Changelog & Revision History
| Version | Date | Author / Agent | Changes & Architectural Rationale |
|---|---|---|---|
| v1.0.0 | [YYYY-MM-DD] | [Engineer/AI] | Initial canonical sub-module implementation with MSW mocks and doc trio |
```

### Autonomous Sub-Module Documentation Trio (`_features.md`, `_forbidden.md`, `_theme_contract.md`)

> ⛔ **UNIVERSAL SUB-MODULE DOCUMENTATION TRIO LAW (MANDATORY FROM DAY 1):**
> Under the Universal Day-1 Sub-Module Architecture (Rule 0A.2), **EVERY autonomous sub-module** (e.g., `attendance_dashboard/`, `attendance_history/`, `profile_overview/`) MUST maintain its own dedicated Documentation Trio right inside its directory:
> 1. `[role]_[submodule]_features.md` — MUST contain all 22 canonical sections, including Section 20 (Module Run, Mock & Test Harness) and Section 21 (Module Portability & Host Integration Guide).
> 2. `[role]_[submodule]_forbidden.md` — MUST enforce strict sibling sub-module decoupling (zero cross-submodule imports), zero parent shared folders (`attendance/common/` or `attendance/components/` strictly forbidden), and strict WET law.
> 3. `[role]_[submodule]_theme_contract.md` — MUST document all global semantic design tokens consumed by the sub-module.

Sub-module documentation files with only generic boilerplate content or missing any of the 22 canonical sections are considered **undocumented** and MUST be regenerated.

### Documentation Freshness Rule

The `[moduleName]_features.md` for a module MUST be updated in the same commit when the change affects ANY of:
- User flows (a new step, a changed interaction, a removed action)
- Architecture (a new folder, a new dependency pattern, a changed data flow)
- API contracts (new endpoint, changed request/response shape, removed endpoint)
- Permissions (a new role check, a new protected action)
- Module dependencies (a new approved external dependency added or removed)
- State ownership (switching between TanStack Query / Zustand / local state)
- Route behavior (new page, new dynamic segment, new redirect)
- Business rules (a new validation, a new status, a new lifecycle state)

The `[moduleName]_features.md` does NOT need to be updated for:
- Purely presentational internal child component additions (e.g., extracting `AdminMembersRowSkeleton.tsx` from `AdminMembersTable.tsx` with no behavioral change)
- Renaming internal variables or reorganizing internal file structure with no external contract change
- Styling/spacing adjustments with no layout behavior change
- Adding a JSDoc comment to an existing function

> **Rationale:** Requiring documentation for every minor refactor causes superficial edits (updating line counts, adding boilerplate) that obscure real architectural changes. Targeting updates to behavioral changes keeps the feature map accurate and meaningful.

Stale documentation that misrepresents the current architecture is worse than no documentation because it actively misleads future AI agents.

14. **Layered Error & Feedback Message Policy (Replaces blanket backend-message rule):**

The frontend MUST use a layered approach for user-facing messages. Different failure origins require different message sources.

| Failure Origin | Message Source | Example |
|---|---|---|
| Domain / business error (backend responds) | `res.message` from backend API envelope | "Member already exists with this phone number" |
| Validation error (backend 400) | `res.validationErrors[].message` per field | Shown inline under each field |
| Network failure / offline | Frontend-localized fallback string via `t('errors.network')` | "Connection failed. Please check your internet." |
| Timeout | Frontend-localized fallback via `t('errors.timeout')` | "Request timed out. Please try again." |
| Malformed / unparseable response | Frontend-localized fallback via `t('errors.unexpected')` | "An unexpected error occurred." |
| Browser / JS runtime error | Frontend-localized fallback; never expose stack trace | "Something went wrong. Please refresh." |

**Rules:**
- For **domain outcomes** (mutation success, business validation, permission errors): display `res.message` from the backend envelope as-is. Do NOT hardcode alternatives.
- For **infrastructure failures** (no network, no response, timeout, malformed JSON): use frontend-localized fallback strings from the i18n layer. Do NOT attempt to surface a raw JS error message like `"Failed to fetch"` to the user.
- **Safe rendering:** Never use `dangerouslySetInnerHTML` to render backend messages. Backend message text MUST be treated as plain text only.
- **No raw error objects:** Never expose `error.stack`, `error.message` from caught JS exceptions, backend field names, or internal error codes directly to users.
- **Fallback copy location:** All frontend-localized error fallback strings MUST live in the module's locale file (`[moduleName]_en.json`) under the `errors` namespace.
- **Toast deduplication:** Apply Rule 82 (stable `id`) to all emitted toasts, both backend-driven and frontend-fallback.

```typescript
// ✅ CORRECT — layered policy implementation
try {
  const res = await createMember(dto);
  if (res.success) {
    toast.success(res.message, { id: 'create-member-success' }); // backend message
  } else {
    toast.error(res.message, { id: res.errorCode ?? 'create-member-error' }); // backend message
  }
} catch (error) {
  if (!navigator.onLine) {
    toast.error(t('errors.network'), { id: 'network-error' }); // frontend fallback
  } else {
    toast.error(t('errors.unexpected'), { id: 'unexpected-error' }); // frontend fallback
  }
}

// ❌ FORBIDDEN
toast.success('Member created successfully'); // hardcoded
toast.error(error.message); // raw JS error — could be "Failed to fetch"
<div dangerouslySetInnerHTML={{ __html: res.message }} /> // XSS risk
```

15. **Performance & Optimization Architecture**:
- **Debounce API Calls**: Any search input or filter that triggers backend API calls MUST be debounced (e.g., using a custom `useDebounce` hook or a library like `lodash.debounce`) with at least a 300ms delay.
- **Server-Side Pagination & Filtering**: For server-backed, user-browsable datasets where pagination, sorting, or filtering is applicable, use server-side pagination, sorting, and filtering. Do not fetch large datasets merely to simulate these behaviors on the client.
- **Lazy Loading & Suspense**: For heavy components that are not immediately visible on initial load, use React's `lazy()` or Next.js `next/dynamic` to code-split them.
- **Strict Memoization for Contexts**: If using Context, ensure Provider values are strictly memoized using `useMemo` and `useCallback`.
- **Mutation Source of Truth:** TanStack Query cache is the source of truth for server data. Optimistic updates MAY be used for safe, reversible, non-financial operations when explicitly justified. Optimistic updates are FORBIDDEN for destructive, irreversible, permission-sensitive, and financial operations. Successful mutations MUST reconcile the Query cache with the authoritative backend response. Zustand MUST NOT be used as the primary server-data store.

### Additional Performance Requirements

- Use `next/image` for all content images. Raw `<img>` tags are forbidden unless there is a documented technical exception.
- Above-the-fold images must have explicit dimensions and appropriate priority behavior.
- Heavy charts, editors, maps, PDF viewers, and rich media components must use dynamic import/code splitting.
- Every asynchronous data section must show a skeleton matching its final layout.
- Use a spinner only for short button-level loading states.
- Do not apply `React.memo`, `useMemo`, or `useCallback` blindly.
  - Use `React.memo` only for frequently re-rendering presentational children.
  - Use `useMemo` only for measurably expensive calculations.
  - Use `useCallback` only when necessary for memoized child props or dependency stability.
- Bundle impact must be checked for large dependency additions or major feature releases.
- Avoid importing full libraries where tree-shakable or lighter alternatives exist.

### Performance Budgets (Measurable & Enforceable)

Performance is not subjective. The following budgets are mandatory and must be validated in CI:

| Metric | Budget | Enforcement |
|---|---|---|
| Route JS bundle (per route, gzipped) | < 200 KB | Bundle analyzer on PRs with major changes |
| Total initial JS (First Load) | < 500 KB gzipped | `next build` output check |
| Largest image (above fold) | < 200 KB (WebP/AVIF) | `next/image` + CI asset size check |
| Largest Contentful Paint (LCP) | < 2.5 s | Lighthouse CI or Web Vitals monitoring |
| Interaction to Next Paint (INP) | < 200 ms | Web Vitals monitoring |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals monitoring |
| API request deduplication | 0 duplicate requests per page render | TanStack Query cache verification |
| Frontend error rate | < 0.5% of sessions | Error monitoring alert |

**Production Observability Requirements (extending Rule 15E):**
- Web vitals (LCP, INP, CLS) MUST be tracked in production and correlated to release versions.
- Frontend exception rate MUST be monitored with alerting on threshold breach.
- Failed API call rate MUST be tracked by endpoint to detect backend degradation.
- Each production release MUST be tagged/correlated in the error monitoring platform.
- Performance regressions (bundle +20% or vitals crossing budget) MUST block deployment.

15A. **Mandatory Testing Architecture**:
AI-generated code is not considered complete until the required tests exist.

Approved stack:
- Unit tests: Vitest
- React component tests: React Testing Library
- E2E tests: Playwright
- API/network mocking: MSW

Co-location rule (Unit & Component Tests ONLY):
- ManagerMembersTable.tsx → ManagerMembersTable.test.tsx
- useManagerMembersTable.ts → useManagerMembersTable.test.ts
- ManagerMembersFormatting.ts → ManagerMembersFormatting.test.ts

**Complete Isolation for E2E Testing (The AI Zip Principle):**
1. **Top-Level Mirrored Folders:** All E2E tests MUST live in a completely separate top-level `playwright_E2E/` directory, entirely decoupled from the `src/` app folder. The internal directory structure of `playwright_E2E/` MUST mirror the frontend route structure, but the role container must be suffixed with `_e2e` (e.g., `playwright_E2E/frontend_admin_e2e/admin_members/admin_members_e2e.spec.ts`).
### E2E WET/DRY Boundary

Business-specific E2E fixtures, feature workflows, permissions, data setup, assertions, and domain helpers MUST remain module-local and may be duplicated under WET.

Approved global E2E infrastructure may be shared only for:
- authenticated session/bootstrap setup;
- browser/context lifecycle;
- non-business accessibility helpers;
- screenshot/video/reporting setup;
- environment/base URL configuration;
- test-account provisioning where centrally required.

Global E2E helpers MUST NOT contain business fixtures, module-specific workflow logic, feature assertions, or role-specific product behavior.
A test script in `playwright_E2E/frontend_manager_e2e/manager_members/` MUST NOT import a business fixture or business helper from `playwright_E2E/frontend_manager_e2e/manager_billing/`.

### Controlled Framework-Neutral Test-Support Layer (Exception to WET Rule)

A narrow, **framework-neutral** test-support layer is permitted at `playwright_E2E/_support/` for genuine application infrastructure only. This layer MUST NOT contain business fixtures, business workflows, or feature-specific assertions.

**Permitted in `playwright_E2E/_support/`:**
- `auth-setup.ts` — common browser authentication setup (navigates to login page, fills credentials from env vars, saves storage state)
- `msw-utils.ts` — MSW service worker registration helpers for Playwright context
- `render-utils.ts` — RTL-compatible test render wrapper (providers, query client)
- `factory.ts` — stable synthetic data factories for non-business primitive types (e.g., UUID generator, date builder)

**Forbidden in `playwright_E2E/_support/`:**
- Business fixtures (member records, invoice data, gym records)
- Feature-specific workflows ("add a member", "create an invoice")
- Business assertions ("member status should be Active")
- Module-specific MSW handlers

The AI Zip Principle remains intact for business tests: module E2E folders must still be independently zip-able and AI-repairable without needing sibling module files.

Minimum expectations:
- Utilities: 90% branch coverage
- Custom hooks: 80% coverage
- Core components: interaction tests for all user events (clicks, typing, dropdowns), loading, success, empty, error, and disabled states.

**Component Testing vs Frontend E2E Philosophy (No Playwright for Components):**
1. **Co-located Unit & Component Tests (Vitest/RTL):** MUST live directly inside the feature module folder as shown above. For internal frontend logic, you MUST use React Testing Library (RTL) + MSW to verify that:
   - Buttons trigger the correct actions and loading states.
   - Dropdowns open and select the correct values.
   - Modals appear and close correctly.
   - Component empty, error, and success states render properly.
2. **Frontend E2E Scope:** The frontend does not own backend/system-level E2E infrastructure. However, the frontend MUST provide isolated Playwright E2E coverage for applicable critical user journeys. These tests MUST live in the separate `playwright_E2E/` tree and follow the module-isolation rules defined above. Backend/system-level E2E orchestration may remain in the external QA pipeline.

Mandatory E2E flows:
- Login/logout/session expiry
- Permission-denied states
- Create/edit/delete workflows
- Type-to-confirm destructive action flows
- Billing or payment workflows
- Important table filtering, pagination, and export workflows


Testing rules:
- Test user-visible behavior, not internal implementation details.
- Do not use snapshots for dynamic, complex UI as a substitute for assertions.
- Reuse Module-Owned MSW handlers in unit/component tests.
- A bug fix must include a regression test if reasonably testable.

### AI Test Integrity Gate

A test file existing is NOT sufficient evidence that the feature is actually tested.

AI-generated tests MUST verify real behavior and MUST NOT be created merely to
satisfy coverage or checklist requirements.

The AI MUST NOT satisfy testing requirements with:
- Placeholder assertions such as `expect(true).toBe(true)` or `expect(1).toBe(1)`.
- Empty test bodies.
- Tests that only render/mount a component without asserting meaningful behavior.
- Snapshot-only tests for dynamic business UI.
- Assertions against implementation details when user-visible behavior can be asserted.
- Tests that mock away the exact behavior the feature is supposed to prove.
- Tests that pass only because the expected value is copied from the implementation
  rather than the documented requirement.
- Tests that bypass the real feature API path when API behavior is part of the requirement.

For every non-trivial data-driven feature, tests MUST verify, where applicable:

1. API-driven data reaches the UI through the real feature API layer.
2. Every documented UI Data Requirement renders from the response contract (Rule 75D).
3. Loading state renders correctly.
4. Empty state can actually be triggered.
5. Error state can actually be triggered.
6. Search/filter/sort/pagination behavior changes the request or rendered result appropriately.
7. Form validation and submission behavior work through the real feature flow.
8. Mutation success uses the backend response as the source of truth.
9. Backend `message` is surfaced correctly where required (Rule 14).
10. Security/permission-denied UI behaves correctly.
11. Regression tests exist for bug fixes whenever the behavior is testable.

A passing test suite is NOT accepted as proof of correctness if the tests themselves
are meaningless.

**AI completion gate:**
- Read the test code.
- Identify what real behavior each test proves.
- Confirm each critical requirement has at least one meaningful assertion.
- Reject tests that would still pass if the actual feature behavior were broken.

15B. **Form Management, Validation, and Submission Architecture**:
All non-trivial forms MUST use:
- React Hook Form **v7** (the project-locked version)
- Zod
- `@hookform/resolvers`

### React Hook Form Canonical Import Pattern (GAP-17 Fix)

AI agents MUST use this exact import pattern. Do NOT use v6 patterns:

```typescript
// ✅ CORRECT — React Hook Form v7 pattern
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema definition
const [ModuleName]Schema = z.object({
  fieldName: z.string().min(1, 'Required'),
  // ... more fields
});

type [ModuleName]FormValues = z.infer<typeof [ModuleName]Schema>;

// Hook usage
const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<[ModuleName]FormValues>({
  resolver: zodResolver([ModuleName]Schema),
  defaultValues: { fieldName: '' },
});

// ❌ FORBIDDEN — v6 pattern (do NOT use these)
// import { useForm } from 'react-hook-form';
// yupResolver, joiResolver, or any non-Zod resolver
// errors.fieldName?.message?.toString() (v6 casting pattern) — use errors.fieldName?.message directly
```

**Version-Specific Rules:**
- Use `register()` for simple uncontrolled inputs.
- Use `Controller` component (or `useController` hook) for custom/third-party UI components (e.g., selects, date pickers).
- Use `formState.isSubmitting` (not a custom `loading` state) to disable the submit button during pending requests.
- Trigger `form.setError('root', { message: ... })` for server-level errors returned from the API.

Form structure:
```text
[ModuleName]Form/
  [ModuleName]Form.tsx
  use[ModuleName]Form.ts
  [ModuleName]Schema.ts
  [ModuleName]Form.test.tsx
```

Responsibilities:
- Form component: layout and field composition only.
- Custom form hook: form setup, submit orchestration, mutation state.
- Zod schema: validation and typed input/output contract.
- API layer: request/response communication only.

Validation rules:
- Validate client-side for immediate UX.
- Backend remains the final authority for validation.
- Display field validation errors inline below fields.
- Display backend response `message` for server-level errors as per Rule 14.
- Never show raw API error objects to users.

Submission rules:
- Disable submit button while the request is pending.
- Prevent duplicate submission.
- Reset only after confirmed successful response.
- Preserve entered data after failed requests unless product requirements say otherwise.
- All destructive form actions must follow the global Type-to-Confirm design rule.

File upload rules:
- Validate MIME type, extension, and max file size before upload.
- Show upload progress where supported.
- Never trust client validation alone; backend validation remains mandatory.



## CLIENT STATE vs SERVER STATE — CANONICAL DEFINITIONS

This is the most common source of AI confusion in React Query + Zustand projects. Read this BEFORE writing any state management code.

### Server State
**Definition:** Any data whose source of truth lives on the server or in an external API.

Properties:
- It can be stale (your local copy may be outdated)
- It needs fetching, caching, background-refetching, and invalidation
- Multiple clients may have conflicting versions

**Owner: TanStack Query (ALWAYS)**

Examples:
- Member list from `GET /api/v1/admin/members`
- Invoice records
- Subscription status
- Gym settings
- Analytics results
- Any data fetched from an API endpoint

### Client State
**Definition:** UI-only state that exists only on the client, has no server representation, and does not need caching or syncing.

Properties:
- It never goes stale (no server to sync with)
- It is local, transient, and UI-driven

**Owner: Zustand (module-scoped) or local `useState`**

Examples:
- Which table row is selected
- Active tab or wizard step
- Modal open/close
- Active filter panel toggle
- Column visibility preferences (unless persisted to server)

### The Mixing Trap — FORBIDDEN Patterns

| ❌ WRONG | ✅ CORRECT |
|---|---|
| Store API response in Zustand | Use TanStack Query for all API data |
| Put `isLoading` from API in Zustand | Use `query.isPending` from TanStack Query |
| Fetch in `useEffect` + store in Context | Use `useQuery` with query key |
| `useQuery` for local UI toggle state | Use `useState` or Zustand |

> **AI RULE:** If the state has ever touched an API — even if you plan to mock it — it is Server State and MUST live in TanStack Query. Zustand is NEVER the cache for API data.

15C. **State Management Decision Matrix**:
State must be placed according to its ownership and lifecycle.

1. **Server State — TanStack Query v5** (the project-locked version — GAP-13 Fix)

> **IMPORTANT:** This project uses TanStack Query **v5**. AI agents MUST NOT use v4 APIs.

Key v5 API changes that AI commonly gets wrong:

| v4 (FORBIDDEN) | v5 (REQUIRED) |
|---|---|
| `mutation.isLoading` | `mutation.isPending` |
| `useQuery({ onSuccess, onError })` | Callbacks removed — use `useEffect` or mutate callbacks |
| `status === 'loading'` | `status === 'pending'` |
| `keepPreviousData: true` | `placeholderData: keepPreviousData` |
| `cacheTime` | `gcTime` |
| Error type `unknown` needs manual cast | Use `isError` narrowing |

Canonical v5 query usage:
```typescript
// ✅ CORRECT — TanStack Query v5
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const { data, isPending, isError } = useQuery({
  queryKey: ADMIN_MEMBERS_QUERY_KEYS.list(filters),
  queryFn: () => fetchMembers(filters),
});

const queryClient = useQueryClient();
const { mutate, isPending: isMutating } = useMutation({
  mutationFn: createMember,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.all });
    toast.success(data.message);
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

Use for:
- API responses
- Loading/error states from APIs
- Caching
- Pagination
- Background refetching
- Mutations and invalidation

Rules:
- Backend data MUST NOT be stored as the primary source of truth in Zustand or Context.
- Every query key must be namespaced by module:
  `['admin_members', 'list', filters]`
  `['admin_members', 'detail', memberId]`
- After mutations, invalidate or update the relevant query cache intentionally.
- Do not refetch the whole application after a small mutation.


2. **Zustand — Module-Level Shared Client State**
Use for:
- Active filter UI state
- Selected rows
- Table column preferences
- Multi-step wizard progress
- Local draft state shared by multiple client components

Rules:
- Stores should remain module-scoped.
- Avoid one giant global store.
- Do not put API response data into a Zustand store unless there is a documented offline/realtime requirement.

3. **React Context**
Use only for stable cross-tree concerns:
- Theme
- Locale
- Auth session shell
- App-wide feature flags

4. **Local State**
Use `useState` or `useReducer` for component-private UI state:
- Modal open/close
- Input visibility
- Hover/focus state
- Local tab selection

Before creating a new global state container, document why local state, props, URL parameters, or React Query cannot solve the need.

15D. **Environment Variable and Runtime Configuration Management**:
Required files:
- `.env.example` — committed; contains every required key with empty/sample values.
- `.env.local` — local secrets; never committed.
- `.env.development` — non-secret development configuration where needed.
- `.env.production` — non-secret production configuration where platform policy permits.

Rules:
- Variables prefixed with `NEXT_PUBLIC_` are public browser-visible values.
- Never place secrets, private API keys, database URLs, token signing keys, or payment secrets in `NEXT_PUBLIC_` variables.
- Do not access `process.env` directly from arbitrary components/hooks.
- Validate environment variables in one central configuration module using Zod.
- Fail fast at startup if required configuration is missing or malformed.
- Document every environment variable in `.env.example`.

Recommended structure:
```text
src/config/env.ts
src/config/app-config.ts
```

15E. **Frontend Observability and Diagnostics**:
Production frontend errors must be observable without exposing sensitive information to users.

Requirements:
- Integrate an approved error-monitoring solution.
- Capture route, module, anonymized user/session context where allowed, request ID, and error digest.
- Never send passwords, tokens, full payment data, or sensitive personal data in logs.
- Use structured frontend events for critical business workflows:
  - login failure
  - payment failure
  - failed export
  - destructive action failure
  - repeated API error
- All application diagnostics must use the centralized logger. `console.log` is forbidden in committed code.
- Define an owner and alert policy for critical failures.

15F. **Core Production Edge-Case Safety Invariants (P0 Directives)**:
To ensure enterprise reliability, prevent double-submissions, guarantee zero data glitches, and eliminate AI hallucinations during automated execution, every autonomous sub-module MUST enforce the following 8 immutable production safety invariants:

1. **Idempotency Key (`Idempotency-Key: UUIDv4`) on All State Mutations:**
   - Every state-changing HTTP mutation (`POST`, `PUT`, `PATCH`, `DELETE`) initiated by an API client or TanStack Query mutation hook MUST attach a unique client-generated UUIDv4 header:
     The canonical HTTP transport header is strictly `Idempotency-Key: UUIDv4` (e.g., injecting `{'Idempotency-Key': crypto.randomUUID()}` or `uuidv4()`). Note: Per Backend Rule 103, server-side infrastructure is configured to accept both `Idempotency-Key` and `X-Idempotency-Key` for multi-platform transport resilience, but frontend mutation clients MUST send `Idempotency-Key: UUIDv4` deterministically.
   - If a network failure occurs and the client retries, the exact same idempotency key is transmitted. This prevents duplicate financial transactions, double billing charges, or redundant entity creations.

2. **Universal Null-Safe Fallback (`displayValue()` Invariant):**
   - Every dynamic, optional, or nullable data point rendered in JSX tables, descriptions, badges, and detail views MUST pass through the canonical zero-business utility `displayValue(val)` (Rule 78).
   - If the value is `null`, `undefined`, or an empty trimmed string (`""`), `displayValue()` MUST return an en-dash (`—`) or an explicit fallback string.
   - Raw `undefined` strings, empty table cells (`<td></td>`), or blank cards are STRICTLY FORBIDDEN. Meaningful `0` and `false` values MUST be preserved and displayed.

3. **Debounced Search & Filter Inputs (≥ 300ms):**
   - Every text search input, search-as-you-type filter, or slider that triggers an API query or expensive client-side filter MUST be debounced by at least **300ms** (e.g., using `useDebounce(searchTerm, 300)`).
   - Instant firing of API requests on every individual keystroke is STRICTLY FORBIDDEN to prevent backend denial-of-service, race conditions, and out-of-order query responses.

4. **Min-Width / Min-Height Loading Stabilization (Cumulative Layout Shift < 0.1):**
   - All skeleton loaders, spinners, and async loading containers MUST declare explicit minimum dimensions (`min-w-[...]`, `min-h-[...]`, or fixed container dimensions matching the final rendered state).
   - Swapping from loading state to resolved data MUST NOT cause sudden layout jank, content reflow, or layout shifts. Cumulative Layout Shift (CLS) MUST remain strictly `< 0.1`.

5. **Toast Notification Deduplication (`toastId`):**
   - Every toast notification dispatched by mutation success/error handlers, global error interceptors, or socket events MUST supply an explicit, deterministic `id` or `toastId` (e.g., `toast.error(message, { id: 'network-timeout' })` or `toast.success(message, { id: 'member-created' })`).
   - Rapid repeated user clicks or rapid API error bursts MUST NOT cascade identical duplicate toasts across the user screen.

6. **List Virtualization Threshold (> 50 Items):**
   - Any list, table, or grid capable of rendering more than **50 items** without server-side pagination MUST use virtualized windowing via `@tanstack/react-virtual`.
   - Rendering 50+ un-virtualized DOM table rows or card elements causes massive memory overhead, DOM bloat, and severe scroll performance degradation.

7. **Zero Client Secret Exposure & Strict Env Variable Separation:**
   - Only variables prefixed with `NEXT_PUBLIC_` are accessible in client-side code.
   - Private API keys, JWT signing secrets, database credentials, AWS access keys, and webhook secrets MUST NEVER appear in client bundles, `.env.local`, or frontend TypeScript files.
   - Any commit or PR introducing a private secret into frontend code causes an immediate `NON_COMPLIANT` security failure.

8. **Business Entity Persistence Banned in `localStorage`:**
   - Browser storage (`localStorage`, `sessionStorage`) is STRICTLY RESTRICTED to non-sensitive user UI preferences (e.g., dark/light mode toggle, sidebar collapsed state, active tab index).
   - Domain business entities, member records, financial ledgers, or sensitive cached objects MUST NEVER be persisted in `localStorage`. All domain data MUST reside in the normalized TanStack Query server cache or secure transient React state.

16. **Robust Form Handling & Validation**:
For any forms with more than two inputs, strictly avoid using individual `useState` hooks. Use a robust form management library (like **React Hook Form**) paired with a schema validation library (like **Zod**). For non-trivial forms, schema location and structure MUST follow Rule 15B. Do not place form schemas in generic `_utils` folders merely for convenience.

17. **Centralized API Error Interception**:
Global interceptor handles only truly global concerns such as authentication expiry, token refresh, transport normalization, and globally applicable status behavior. Module-specific business errors MUST remain available to the module API/query layer and MUST NOT be swallowed or converted into generic global toasts.

18. **Enterprise Accessibility (a11y)**:
Ensure UI components are accessible. Use semantic HTML, include `aria-label` tags for icon-only buttons, and ensure modals and dropdowns can be navigated via keyboard (Tab trapping, Esc to close).

19. **Interactive Data Tables (Clickable Rows & Explicit Interaction Models)**:
A production entity table row MUST be clickable only when that row has one canonical detail destination and clicking the row does not conflict with selection, inline editing, drag-and-drop, bulk actions, or nested interactive controls.
When row navigation is appropriate, add `cursor-pointer` to the `<tr>` element. Remove redundant "View/Eye" buttons. Action buttons (Edit, Delete) must have `e.stopPropagation()`. A clickable table row MUST provide an equivalent keyboard-accessible interaction. Do not rely on `cursor-pointer` alone. Enter/Space or a semantic link/button MUST provide the same navigation/action. Nested Edit/Delete controls MUST remain independently keyboard accessible.

For non-clickable rows, provide explicit accessible row actions where applicable. The module documentation must state the table interaction model: `ROW_NAVIGATION`, `EXPLICIT_ACTIONS`, `INLINE_EDITING`, `SELECTION`, or `READ_ONLY`.

20. **Searchable Dropdowns for Large Datasets & Selection Controls**:
Use a native `<select>` for a small static option set of 20 or fewer options where search is not required.

Use an accessible searchable combobox/popover when any of the following applies:
- more than 20 options;
- asynchronously loaded options;
- server-side search;
- option metadata beyond a plain label;
- user needs to find an item by typing;
- list size can grow beyond the small static threshold.

A custom dropdown MUST implement proper keyboard navigation, focus management, selection announcement, escape behavior, and accessible labels.

21. **Real-Time Communication (In-House WebSocket Architecture)**:
For any real-time in-app communication, the project strictly uses an in-house WebSocket architecture. Real-time communication MUST use WebSocket transport through `socket.io-client`. Long-polling transport MUST be disabled by configuration (`transports: ['websocket']`) unless a documented infrastructure exception exists. Do NOT rely on SSE or external managed services like Pusher/Supabase.

22. **Tenant Context & Centralized Headers (Multi-Tenancy)**:
The backend utilizes a strict Database-per-Tenant architecture. The frontend MUST NOT rely on components to manually send tenant info. For tenant-scoped API requests, the centralized API wrapper automatically injects `x-tenant-id`. Platform/global endpoints MUST explicitly opt out according to the API contract. Client-side tenant header injection is convenience/context propagation only and MUST NEVER be treated as an authorization boundary. Backend authorization and tenant isolation remain authoritative.

23. **Password Visibility Toggle**:
Whenever there is a password input field, you MUST include an eye icon (visibility toggle) to switch between `password` and `text`. Use standard icons from lucide-react.

24. **Date & Time Standardization (Timezone Safety)**:
UI/form layers may use typed date values appropriate to the component; serialization to UTC ISO 8601 MUST occur at the module API boundary before the request is sent. When displaying, convert UTC strings to local time using `date-fns` (Rule 24 & Approved Registry).

25. **Role-Based UI Hiding (RBAC) — Frontend Checks are UX Controls Only:**

> **CRITICAL SECURITY RULE:** Frontend permission checks control **UI visibility only**. They are **NEVER authorization enforcement**. Hiding a button or a route does NOT prevent a technically capable user from calling the underlying API endpoint directly.

**Mandatory requirements:**
- Every protected API endpoint MUST enforce authorization server-side, independently of any frontend permission check.
- Frontend permission checks (`usePermissions()`, role guards, capability flags) are a UX convenience layer that improves user experience by hiding irrelevant controls — nothing more.
- Client-side permission checks MUST be driven by documented, server-provided role claims or capability data (e.g., from the session/auth token). They MUST NOT be computed from client-only state.
- Backend authorization MUST NOT be assumed based on whether a UI button is visible or hidden.
- Every module's `[moduleName]_features.md` MUST document which role can see/do what AND explicitly state "server-side authorization enforced at `[endpoint]`".
- *Consequence of violation:* Critical authorization bypass. If UI hiding is treated as security, any user can invoke sensitive endpoints (DELETE, PATCH) directly via HTTP clients. Features lacking explicit server-side auth verification in `_features.md` = `NON_COMPLIANT`.

```typescript
// ✅ CORRECT — UI control only; server enforces authorization independently
{hasPermission('delete_member') && (
  <DeleteButton onClick={handleDelete} />
)}
// The DELETE /api/v1/manager/members/:id endpoint independently checks
// that the authenticated user's role = MANAGER before processing.

// ❌ WRONG MENTAL MODEL
// "The delete button is hidden for trainers, so trainers can't delete."
// A trainer can still call DELETE /api/v1/manager/members/:id via Postman.
// The server MUST reject that request — not the frontend.
```

`usePermissions()` is approved global security/session infrastructure. It may expose role/capability checks, but MUST NOT contain module-specific UI behavior, business workflows, or feature logic. Module-specific permission rules are declared/documented by the owning module and consumed through this global capability interface. Destructive/restricted UI elements MUST be completely hidden or safely disabled.

26. **Skeleton Loaders over Generic Spinners**:
When fetching complex layout data or lists, implement **Skeleton Loaders** (using Tailwind's `animate-pulse` or a library) that mimic the shape of incoming data instead of full-page spinning circles.

27. **Strict TypeScript (No `any` Rule)**:
The use of the `any` type is strictly forbidden. If a payload is unknown, use the `unknown` type and assert/validate safely via Zod. (Mechanically enforced via ESLint, see Rule 61).
*Consequence of violation:* Complete breakdown of TypeScript type soundness, undetected runtime crashes in production, broken refactoring, and AI hallucination cascades. Finding `any` in committed code = IMMEDIATE `NON_COMPLIANT` AUDIT FAILURE.

28. **Icon-Driven Action Columns**:
Whenever displaying action buttons in data tables/lists, prioritize using semantic icons (e.g., from `lucide-react`) instead of bulky text labels. Include descriptive tooltips and `aria-label`s.

29. **Multi-Medium Sending Selection (Radio Buttons)**:
Whenever the user performs an action that sends a proof/document, present an option to choose between mediums (e.g., WhatsApp vs. Email) using Radio Buttons. Do NOT use checkboxes if only one is to be selected.

30. **Mandatory Table Controls (Pagination, Sorting, & Filtering)**:
Every **user-browsable data table** MUST implement applicable pagination, sorting, and filtering. If a control is not applicable because the dataset is static/small/read-only, the module documentation MUST state why. **Table Header Sorting Indicators:** Any sortable column header MUST include a visible sorting icon (e.g., up/down arrows like `ArrowUpDown`, `ArrowUp`, `ArrowDown` from `lucide-react`). The actively sorted column must highlight the directional arrow (e.g., in a primary/accent color) to clearly indicate the current sort direction.

31. **Modularized API Clients (No Centralized API Blob)**:
Do not define module-specific API routes in a giant global file. Every autonomous sub-module MUST have its own API file inside its dedicated `api/` folder (e.g., `api/[role]_[submodule].api.ts`) importing the core base fetcher.
*Consequence of violation:* Giant monolithic API blobs couple independent features, balloon AI context windows, and create cross-module regression cascades. Finding centralized API blobs = `NON_COMPLIANT`.

32. **The "No Barrel File" Rule — No Barrel Files or Re-export Facades:**

**Default rule:** Strictly avoid using `index.ts`, `index.js`, or any other barrel/facade files to re-export modules. Always import directly from the explicitly named file to prevent circular dependencies and maintain clean tree-shaking. You MUST NOT create files like `*Export.ts`, `*Facade.ts`, or `*public_api.ts` to consolidate exports. Direct absolute imports (`@/`) are mandatory for every file.
*Consequence of violation:* Barrel files cause circular dependency deadlocks, disable tree-shaking, and inflate JavaScript bundle sizes by up to 400%. Finding unauthorized barrel files (`index.ts`, `*Export.ts`, `*Facade.ts`, `*public_api.ts`) = IMMEDIATE `NON_COMPLIANT` AUDIT FAILURE.

**Zero Barrel Exception for Business Modules:**
No public API barrel exception exists for business modules. The allowed root URL contract file (`[moduleName]_url_config.ts`) is a directly imported named contract file, NOT a barrel and NOT a re-export facade. Sibling features must never import from another feature's internal or root files. Cross-module business consumption is strictly prohibited.

33. **Framework-Specific Media Optimization**:
Make Next.js `<Image>` component (`next/image`) default and mandatory. Permit documented exceptions for third-party controlled markup, emails, SVG assets, or technically incompatible external content where standard `<img>` tags are needed.

34. **Environment Variable Segregation & Security**:
Strictly segregate public and private environment variables. Prefix public variables with `NEXT_PUBLIC_`. Never leak secret keys.
*Consequence of violation:* Exposing sensitive API secrets, database credentials, or private keys to client browsers via `NEXT_PUBLIC_` or unvalidated `process.env`. Finding secrets in client-side code = CRITICAL SECURITY DEFECT (`NON_COMPLIANT`).

35. **Strict Prohibition of Magic Strings & Numbers**:
Never use raw strings or numbers directly in logic/UI. All magic values must be defined as TypeScript `enums` or `const` objects. (Mechanically enforced via ESLint, see Rule 61).
Magic strings/numbers mean unexplained business/configuration values that affect behavior. Intentional user-facing copy, accessibility text, CSS classes, TypeScript literals, object keys, test descriptions, and mathematically obvious constants are not considered magic values unless they represent business configuration.

36. **No Arbitrary Tailwind Values (Strict Design System)**:
Arbitrary Tailwind values are forbidden by default. Any unavoidable arbitrary value requires an explicit documented exception. Adhere to standard framework scales (e.g., `w-80`). (Mechanically enforced via ESLint, see Rule 61).

37. **JSDoc for Non-Obvious Logic (Targeted, Not Exhaustive):**

JSDoc is REQUIRED for:
- All exported hooks, utilities, and functions from `src/lib/` (approved global infrastructure).
- Custom hooks containing side effects, unusual dependencies, or non-obvious behavior.
- Business invariants that a future AI or developer would not derive from the code alone.
- Functions with permission requirements or security implications.
- Complex data transformations where the algorithm is not self-evident.
- Any function where `why` is less obvious than `what`.

JSDoc is NOT required for:
- Self-explanatory implementation details (e.g., a `useState` that tracks `isOpen`).
- Simple getter/setter functions whose purpose is clear from their name.
- Boilerplate that follows a documented pattern exactly.

```typescript
// ✅ REQUIRED — non-obvious dependency + side effect
/**
 * Debounces the search query and syncs it to the URL as a query param.
 * Must be used instead of direct router.push to prevent navigation history spam.
 * Dependency: requires useSearchParams to be called from a Server Component boundary.
 */
export function useAdminMembersSearch() { ... }

// ❌ NOT REQUIRED — self-explanatory
const [isOpen, setIsOpen] = useState(false);
```

38. **Strict Component Responsibility Contract**:
Every component file must have a single-line comment at the very top declaring its exact responsibility:
`// RESPONSIBILITY: Renders the read-only member profile header. Receives data via props. No API calls.`
Responsibility comments MUST describe the component's rendering/orchestration responsibility and MUST NOT imply that business/API logic belongs inside the component.

39. **Explicit Data Flow Direction Comments**:
In every Zustand store and custom hook, document the data flow direction at the top:
`// DATA FLOW: API → useManagerMembersTable.ts → useManagerMembersStore → ManagerMembersTable`
*(Note: As per Rule 5, React Context MUST NOT be used for feature data or state. Use Zustand).*

40. **Forbidden Patterns File (`[role]_[submodule]_forbidden.md` / `[moduleName]_forbidden.md`)**:
Every autonomous sub-module (and feature module) must have a dedicated markdown file listing what is explicitly NOT allowed in that unit.

Every sub-module's `[role]_[submodule]_forbidden.md` MUST explicitly document:

- **Zero Cross-Sub-Module Imports:** Do not import any component, hook, store, type, utility, or mock from any sibling sub-module (e.g. `attendance_dashboard` MUST NEVER import from `attendance_history`).
- **Zero Parent Shared Folders:** Do not create or import from parent shared folders (e.g. `attendance/common/`, `attendance/shared/`, or `attendance/components/` are strictly forbidden).
- **Strict WET Principle:** Duplicate shared badges, filters, or formatters locally inside `{submodule}/components/` or `{submodule}/utils/`.
- **Zero In-Memory Cross-Submodule State:** Do not share React Context or Zustand stores between sub-modules; communicate solely via URL navigation and typed query parameters.
- Do not place feature mock data outside this sub-module.
- Do not create duplicate global mock handlers for this sub-module.
- Do not import another sub-module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
*Consequence of violation:* Without explicit sub-module forbidden patterns, future AI sessions re-introduce previously eradicated antipatterns (like barrel files, relative imports, cross-submodule leaks, and fake UI fallbacks). Missing or generic `[role]_[submodule]_forbidden.md` = `NON_COMPLIANT`.

41. **URL as State for Shareable Views**:
Any filterable, searchable, or paginated list page MUST sync its state to the URL as query parameters using `useSearchParams` / `useRouter`.

42. **Network State Enum (No Boolean `isLoading` Flags)**:
**Network State Rule:** For TanStack Query requests, MUST use TanStack Query's native typed query/mutation status (`status`, `isPending`, `isFetching`, `isError`, etc.) and MUST NOT recreate a parallel `FetchState` enum. A custom async-state enum is allowed only for non-TanStack-Query asynchronous workflows.

43. **Sensitive Data Classification & Masking Policy:**

The term "sensitive data" is too broad to implement consistently. Use this classification model:

| Class | Examples | Default Display (List View) | Full Display | Audit Log | Analytics |
|---|---|---|---|---|---|
| **Public** | Member name, gym name, plan name | Full | Full | Allowed | Allowed |
| **Internal** | Creation dates, IDs, record counts | Full | Full | Allowed | Anonymized |
| **Confidential** | Email address, batch assignment | Partial/truncated | Profile only | Allowed | Excluded |
| **Personally Identifiable (PII)** | Phone number, Aadhaar/national ID | Masked (`98****2310`) | Profile only | Role-gated | Excluded |
| **Financial** | Payment amounts in bulk lists, bank account | Summarized total | Per-record in detail | Role-gated | Excluded |
| **Highly Restricted** | Full card numbers, OTPs, reset tokens, passwords | Never display | Never display | Never | Never |

**Implementation rules per class:**
- **PII fields:** MUST be masked in list/table views using `maskSensitiveData()`. Full value visible only in dedicated profile/detail screens where the user explicitly navigates to that record.
- **Financial fields in bulk:** Show summarized totals in list views; per-record amounts in detail views.
- **Highly Restricted:** No copy-to-clipboard affordance, no display in any UI (Rule 47). Never log, never include in analytics.
- **MSW fixtures:** Test fixture data for PII and Financial fields MUST use synthetic/fake values only (no real phone numbers, real IDs, real card numbers).
- **Error logging:** MUST NOT include PII or Financial data in error payloads sent to monitoring tools. Sanitize before logging (Rule 15E).
- **Analytics exclusion:** PII and Financial data MUST be excluded from any analytics event payload.

**Feature module responsibility:** Each module's `[moduleName]_features.md` MUST list every data field it renders and its classification from the table above.
*Consequence of violation:* Unmasked PII or financial data in UI lists or telemetry payloads violates data protection laws (GDPR/DPDP) and exposes customer confidential information. Failing to classify and mask PII fields = SEVERE SECURITY DEFECT (`NON_COMPLIANT`).

44. **No `console.log` in Production**:
All `console.log` calls are strictly forbidden in committed code. Use a centralized logger utility (`src/lib/logger.ts`). (Mechanically enforced via ESLint, see Rule 61).

45. **Co-located Test Files**:
Every custom hook and utility function must have a co-located test file (`use[X].test.ts`).

46. **Unsaved Changes Warning**:
Any modified form/modal must intercept `beforeunload` to warn the user: "You have unsaved changes."

47. **Copy-to-Clipboard on Permitted Identifiers**:
Any field displaying a unique, non-sensitive identifier or tracking code may have a small copy icon next to it. **Forbidden from copying:** credentials, OTPs, reset tokens, full Aadhaar/national ID numbers, full bank account numbers, full card numbers, and any other explicitly sensitive secret. These fields must never expose a copy affordance.

48. **Consistent Empty State per Entity**:
Every list/table MUST have a dedicated empty state component (`[ModuleName]EmptyState.tsx`) with an icon and message. Include a CTA when a meaningful user action can resolve the empty state; otherwise the empty state may be informational/read-only.

49. **Strict Import Order Convention**:
Enforce a strict order using ESLint `import/order`: React core, Third-party, Absolute internal (`@/lib`), Module-specific (`@/app/frontend_superadmin/superadmin_gyms/...`), Types-only.

50. **Prop Spreading is Forbidden (`...props` ban)**:
Never write `<Component {...props} />`. All props must be explicitly named, except for primitive HTML wrappers.

51. **Conditional Rendering Pattern (No Inline Ternary Hell)**:
Deeply nested ternaries are forbidden. For 3+ conditions, use an early return pattern or `renderContent()` helper.

52. **Event Handler Naming Convention**:
Props must use the `on` prefix (`onSubmit`), internal handlers use `handle` prefix (`handleSubmit`).

53. **`useEffect` Dependency Array Audit Comment**:
Every non-trivial `useEffect` MUST document why the effect exists and why its dependency set is correct. Trivial effects that are self-evident may omit a comment.

54. **Global Shared Components Strict Scope**:
`src/components/ui/` is ONLY for generic, zero-business-logic primitives. Global components must NEVER contain module-specific API calls.

55. **`key` Prop Rules for Lists**:
Use stable unique keys. For server entities, prefer backend IDs; for static/local collections, use another stable unique domain key. Never use `index` for reorderable/filterable/dynamic lists.

56. **`next/font` for Font Loading**:
Never use Google Fonts CDN (`@import`). Always use `next/font/google`.

57. **Strict `tsconfig.json` Enforcement**:
Run with `strict: true`. No `@ts-ignore` or `@ts-nocheck`. (Mechanically enforced via pre-commit, see Rule 61).

58. **No Direct Browser Storage Access in Components**:
Never call `window.localStorage`, `sessionStorage`, or `document.cookie` directly inside React components.

Use approved isolated hooks/services:
- `useLocalStorage` for non-sensitive persisted UI preferences.
- Secure HTTP-only cookies for authentication/session tokens.
- Never store access tokens, refresh tokens, passwords, payment data, or permission grants in localStorage.

All storage keys must:
- Be defined in a centralized constants file.
- Be namespaced by application and module.
- Have a documented schema/version where persisted object data is used.

Example:
`APP_MODULE_FILTERS_V1`
`APP_DASHBOARD_LAYOUT_V1`

59. **Standardized `ApiResponse<T>` Generic (Discriminated Union Contract)**:
Every API call must be typed using a global `ApiResponse<T>` discriminated union that matches the canonical envelope defined below. A discriminated union on `success` guarantees that valid payloads always have data and error payloads always have error details, making invalid states (like `success: true` with `data: null` or error codes) impossible in TypeScript.

```typescript
export type ApiSuccess<T> = {
  success: true;                            // true on 2xx
  message: string;                          // human-readable success description
  data: T;                                  // guaranteed non-null payload for success
  meta?: PaginationMeta;                    // present on paginated list responses
  requestId: string;                        // trace identifier from API Gateway
};

export type ApiFailure = {
  success: false;                           // false on all errors (4xx, 5xx)
  message: string;                          // human-readable error message
  data: null;                               // payload is explicitly null on failure
  error?: string;                           // error category (e.g. "NOT_FOUND", "UNAUTHORIZED")
  errorCode: string;                        // stable machine-readable DOMAIN.ENTITY.REASON code
  statusCode: number;                       // HTTP status code (400, 401, 403, 404, 409, 500)
  requestId: string;                        // trace identifier for error tracking and support
  validationErrors?: ValidationErrorItem[]; // present ONLY on 400 validation failures
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface ValidationErrorItem {
  field: string;    // exact DTO property name, dot-notation for nested fields
  message: string;  // human-readable validation error message
}

export interface PaginationMeta {
  total: number;       // total records matching the query
  page: number;        // current page (1-based)
  limit: number;       // records per page
  totalPages: number;  // Math.ceil(total / limit)
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

The backend OpenAPI contract, generated frontend transport types (`@/generated/openapi/*`), module Zod schemas, MSW fixtures, and API clients MUST conform strictly to this discriminated union contract.
- `success: true` MUST always contain valid `data` and `requestId`.
- `success: false` MUST always contain `data: null`, a stable machine-readable `errorCode`, numeric `statusCode`, and `requestId`.
This eliminates ambiguous null/error states and guarantees type narrowing in client code.

60. **No Direct `router.push('/login')` in Components**:
Handle unauthenticated redirects centrally in `middleware.ts` or an API interceptor.

61. **Enforced Tooling Gates (Mechanical Blocking)**:
Rules against arbitrary Tailwind (Rule 36), `any` types (Rule 27), `console.log` (Rule 44), magic strings (Rule 35), and TS ignores (Rule 57) are not just "trust-based suggestions". 
You MUST physically block these using the following exact mechanical ESLint/tooling mappings:

- `Rule 27 (any type)` -> `@typescript-eslint/no-explicit-any`
- `Rule 36 (arbitrary Tailwind)` -> `tailwindcss/no-arbitrary-value`
- `Rule 44 (console.log)` -> `no-console`
- `Rule 57 (TS ignore)` -> `@typescript-eslint/ban-ts-comment`
- `Rule 63 (cross-module imports)` -> enforcement MUST distinguish:
  ```text
  GLOBAL APPLICATION INFRASTRUCTURE
  ROLE CONTAINER
  FEATURE MODULE
  ```
  and MUST block:
  ```text
  FEATURE → SIBLING FEATURE
  FEATURE → ROLE-LEVEL BUSINESS FOLDER
  FEATURE → OTHER ROLE BUSINESS MODULE
  ```
  unless the import is explicitly classified as approved application infrastructure.

  Mechanical tooling MUST use:
  * `eslint-plugin-boundaries`
  * `no-restricted-imports`
  * TypeScript path aliases where useful
  * repository-level architecture validation where necessary

  *Consequence of violation:* Bypassing mechanical tooling gates leads to silent code decay, arbitrary styling regressions, and un-typed runtime failures. Any PR or generated code that disables, bypasses, or ignores tooling gates = `NON_COMPLIANT`.

  The architectural rule is:
  ```text
  Feature → Global Infrastructure       ALLOWED
  Feature → Own Feature                 ALLOWED
  Feature → Child Feature               ALLOWED when ownership remains inside the module
  Feature → Sibling Business Feature    FORBIDDEN
  Feature → Role Business Bucket        FORBIDDEN
  Feature → Other Role Feature          FORBIDDEN
  ```

---

### FINAL FEATURE PORTABILITY ACCEPTANCE TEST

A feature MUST NOT be marked AI-portable merely because its files happen to be stored under one directory.

The following test MUST be satisfied:

```text
STEP 1
Give an AI only:

@/role/feature/

STEP 2
The AI reads the feature's feature map.

STEP 3
The AI identifies:
- business purpose
- routes
- user flows
- UI ownership
- state ownership
- API contracts
- schemas
- mocks
- tests
- permissions
- error/loading/empty behavior
- approved external dependencies

STEP 4
The AI can identify which files it must modify for a normal feature bug.

STEP 5
The AI does not require unrelated business modules.

STEP 6
The AI's normal repair changes only the owning feature.
```

If these conditions are not satisfied, the feature is NOT considered fully modular or AI-portable.

---

### FINAL ARCHITECTURAL PRINCIPLE

The project prioritizes:

```text
AI CONTEXT ISOLATION
>
BUSINESS CODE REUSE
```

and:

```text
BOUNDED CHANGE BLAST RADIUS
>
MINIMUM FILE DUPLICATION
```

The purpose of this architecture is to ensure that a feature can be:

```text
understood independently
+
tested independently
+
repaired independently
+
mocked independently
+
copied independently
+
evolved independently
```

without requiring unrelated business modules.


You MUST implement a **pre-commit hook** (`husky` + `lint-staged`) that runs `tsc --noEmit` and linters before any commit. These rules must be physically blocked by tooling to ensure extreme safety in an AI-driven codebase. Detailed test practices should reside in Rule 15A.

### Required CI Quality Gates

Every pull request must run:

1. Type Check
   - `tsc --noEmit`

2. Lint and Formatting
   - ESLint
   - Tailwind class validation
   - Prettier formatting check

3. Tests
   - Unit and component tests
   - Coverage threshold validation

4. Build
   - Production build must succeed

5. Security
   - Dependency vulnerability scan
   - Secret detection scan

6. E2E Tests
   - Mandatory for authentication, billing, permissions, destructive actions, and critical CRUD flows.

No PR may merge if a required gate fails.

62. **Dependency-Addition Guardrail**:

> ⛔ **STOP BEFORE ANY `npm install` COMMAND.**
> **An AI agent MUST NOT add any new dependency without explicit human approval.**
> **Checking `package.json` first is MANDATORY.**
>
> 1. Check `package.json` to verify if an approved library already satisfies the requirement (e.g. React Hook Form, Zod, date-fns, Zustand, socket.io-client, lucide-react, react-apexcharts).
> 2. Recharts and Chart.js are **FORBIDDEN** (see `global_design_system.md` §10).
> 3. Introducing a package NOT in the approved registry requires: (a) explicit written developer approval, (b) documentation in `_features.md`.
> 4. **Isolated Module Audit Scope:** When auditing an isolated module or role folder without root `package.json`, DO NOT demand the host `package.json` or stall the audit. Assume the approved baseline dependencies (React, Next.js, Tailwind v4, Lucide React, TanStack Query v5, Zustand, React Hook Form, Zod, date-fns) are available. Simply verify that the module does not import unapproved libraries (such as Recharts or Chart.js).
>
> *Consequence of violation:* Unapproved dependencies introduce duplicate bundles, security vulnerabilities, breaking changes, and licensing risks. Any unauthorized `npm install` = IMMEDIATE TASK REJECTION.


63. **Zero Cross-Module Imports & Controlled Infrastructure Dependencies**:
- **Zero Cross-Module Business Imports:** Module A (e.g., `billing`) is explicitly FORBIDDEN from importing business logic from Module B (e.g., `attendance`) — no business components, hooks, stores, schemas, types, constants, API services, or business utilities. This MUST be mechanically enforced using ESLint (`no-restricted-imports` or `eslint-plugin-boundaries`).
- *Consequence of violation:* Cross-module business imports destroy the AI repair boundary. A fix in Module A alters shared business files that silently break Module B, triggering cross-module regression cascades. Finding ANY cross-module business import = IMMEDIATE ARCHITECTURE FAILURE (`NON_COMPLIANT`).
- **Controlled Infrastructure Dependencies:** A feature/module MAY depend on approved application infrastructure that is intentionally global and contains no feature-specific business logic, including:
  - `src/components/ui/` — dumb reusable UI primitives
  - `src/lib/api.ts` — canonical network/API infrastructure
  - `src/lib/logger.ts` — centralized logging infrastructure
  - authentication/session infrastructure
  - approved configuration and observability infrastructure
- `src/lib/` MUST NOT become a generic business-logic dumping ground. Feature-specific business logic MUST remain inside the owning feature/module.
- If a business utility is required by multiple business modules, duplicate it inside those modules rather than moving it into a global shared business utility.

**Portable Folder Definition:**
A feature is considered portable when it has no dependency on another feature's business implementation. Approved global infrastructure dependencies are allowed because they are architectural contracts of the application, not feature business dependencies.

**GOVERNED SHARED-CODE EXTRACTION PROCESS:**

Total isolation (all duplication) creates drift. Total freedom (unowned shared folders) creates coupling. When genuinely reusable infrastructure is needed across modules, use this controlled extraction process:

**Extraction is ONLY permitted when ALL of the following conditions are satisfied:**
1. The code to be shared is **pure infrastructure** — zero business logic, zero feature-specific behavior, no dependency on any business module.
2. A **single named owner** is assigned (team / person responsible for changes and review).
3. The shared code exposes a **stable, versioned public contract** (through a `[name]_public_api.ts` entry point — no internal deep imports permitted).
4. The shared code has **contract tests** that verify the public interface remains stable.
5. **Dependency direction is strictly enforced:** shared infrastructure may be consumed by business modules, but NEVER imports from them.

**Prohibited sharing patterns (banned regardless of team consensus):**
- Generic unowned folders: `src/common/`, `src/utils/`, `src/helpers/`, `src/shared/` without a named owner, stable contract, and enforced dependency direction.
- Shared business logic (domain rules, feature workflows, role-specific constants, API-specific types).
- "Temporary" shared code added to avoid duplication without going through the extraction process.

**Enforcement:** Any new addition to global shared infrastructure MUST be reviewed by the infrastructure owner. ESLint boundary rules MUST be updated to allow the new path before the code is merged.

64. **Strict Mobile-First Enforcement (Tailwind is not magic)**:
Tailwind does not automatically make things responsive. Every component must be built **mobile-first**: base Tailwind classes must target mobile (`<768px`), then overridden with `md:` (tablet) and `lg:/xl:` (desktop) prefixes as needed.
- No component is considered complete unless explicitly checked at all three breakpoints (375px, 768px, 1280px+). 
- Specific Mobile Patterns: KPI card rows must switch to horizontal scrolling or a 2-column grid on mobile. Charts must have reduced height and simplified/collapsed legends on mobile.
- **Button Containers & Filters**: Any flex container holding multiple buttons or filter inputs (like date ranges) MUST use `flex-col sm:flex-row` or `flex-wrap` so they stack natively on mobile rather than bleeding off the edge of the card.
- **Persistent Mobile Table Actions**: Table action buttons (Edit, Delete, etc.) MUST NOT use `opacity-0` globally to hide behind hover states, as mobile devices have no mouse hover. You must use `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` so actions are permanently visible on touch devices.
- **Dropdown Auto-Close**: Any custom filter dropdown menu MUST automatically close (`setShowFilter(false)`) immediately after the user makes a selection.

65. **Hardened Numeric Inputs (Prevent Negative/Invalid Inputs)**:
Never use a naked `<input type="number">` for quantities, prices, or ages without explicit validation. Enforce numeric constraints primarily through form/schema validation and `min`/`max`/`step`. Use key filtering only when the business rule explicitly forbids characters and the filtering does not block valid required input.

66. **Optimistic UI Reconciliation with Authoritative Server Response (No Undefined Rows)**:
When an optimistic update is used, the TanStack Query cache MUST be reconciled with the authoritative backend response after success. Do not permanently retain the optimistic form payload as server data. Failing to replace the optimistic row in the Query cache with `res.data` upon success will result in "undefined" columns and broken subsequent edit/delete actions.

67. **Explicit API Parameter Propagation (Filters & Pagination)**:
Never assume UI state magically filters backend data. Custom hooks (`use[Module]Logic`) MUST explicitly extract all relevant values (e.g., `debouncedSearch`, `page`, `limit`, `statusFilter`) from state or URL query parameters, construct a `params` object, and pass it directly to the API wrapper. If you forget to pass `params` to the API call, the UI search box will appear broken to the user.

68. **Table Header & Column Alignment Integrity**:
You MUST ensure that the length of the headers array (e.g., `TABLE_HEADERS`) EXACTLY matches the number of rendered `<td>` columns in the `<tbody>` row. This includes custom `<td>`s for avatars, checkboxes, or badges. Any empty state `colSpan` values (e.g., `colSpan={9}`) MUST also statically or dynamically match this exact column count. Mismatched columns will completely break the table alignment across all rows.

69. **Social Brand Color Tokens (No Undefined Variables)**:
Never use undefined CSS variables (e.g., `var(--members-whatsapp)`) for standard social action buttons. Map social brand colors to design tokens (in Tailwind v4 via `@theme inline` in `globals.css`; in Tailwind v3 via `tailwind.config.ts`, e.g., `bg-social-whatsapp`). Relying on undefined variables will cause the buttons to become transparent with white text, making them completely invisible in Light Mode.

70. **Interactive KPI Cards as Filters**:
KPI cards MUST function as filters when the KPI represents a meaningful filterable subset of the adjacent table. Informational KPIs MAY remain non-interactive. When functioning as interactive filters, clicking a KPI card MUST filter the table below to show only the relevant rows. Include a visual indicator (e.g., a primary colored border or ring) to show which KPI filter is currently active, and always ensure there is a clear way to reset the filter (such as a "Total" card or toggling off).
*Consequence of violation:* Interactive KPI cards that do not filter the adjacent table are dead controls, violating the Functional Closure Mandate. Record `NON_COMPLIANT`.

71. **Double Verification for Critical Actions (Destructive/Financial)**:
Whenever presenting an action button that triggers a destructive or critical financial mutation (e.g., deleting a record, suspending a user, or marking an invoice/payroll as paid), you MUST implement a double verification confirmation dialog. Never execute these actions instantly on a single click. Utilize a global `useConfirm` hook or a similar custom modal to explicitly ask the user (e.g., "Are you sure you want to mark this as paid?").

72. **Strict API Client Function Naming Convention (The Verb Contract)**:
Every function defined inside a module's `[moduleName]_api.ts` file MUST follow a strict, predictable verb-based naming convention. AI agents must never invent arbitrary function names like `loadMembers()`, `getData()`, or `handleFetch()`. The standard is:
- `fetch[Entities](params)` — For fetching a list (e.g., `fetchMembers(params)`)
- `fetch[Entity]ById(id)` — For fetching a single entity (e.g., `fetchMemberById(id)`)
- `create[Entity](dto)` — For POST creation (e.g., `createMember(dto)`)
- `update[Entity](id, dto)` — For PATCH/PUT updates (e.g., `updateMember(id, dto)`)
- `delete[Entity](id)` — For DELETE (e.g., `deleteMember(id)`)
- `export[Entity]Report(params)` — For report/export generation
- For non-CRUD domain actions, use the exact operation name from the **external API contract** (e.g., `renew[Entity]`, `suspend[Entity]`, `restore[Entity]`, `activate[Entity]`, `assign[Entity]`). Do NOT couple frontend API client names to backend internal service method names. If the backend renames an internal service class or method, the frontend API contract must not break.

73. **`import type` Mandate for Type-Only Imports**:
Whenever importing a TypeScript type, interface, or enum that is used purely for type-checking (not as a runtime value), you MUST use the `import type` syntax. Never use a regular `import` for type-only constructs.
- ❌ **BAD:** `import { AdminMembersTableProps } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersTableProps'`
- ✅ **GOOD:** `import type { AdminMembersTableProps } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersTableProps'`
- **Why:** `import type` statements are completely erased at compile time, reducing bundle size, preventing accidental runtime usage of type definitions, and eliminating a major category of circular dependency errors. TypeScript's `verbatimModuleSyntax` compiler option can mechanically enforce this. This requirement exists to guarantee predictable TypeScript module behavior, reduce accidental runtime imports, and prevent circular dependency problems.

74. **Security Scanning in Frontend CI/CD Tooling Gates (Extending Rule 61)**:
Rule 61 mandates ESLint, `tsc --noEmit`, and pre-commit hooks. This rule adds mandatory **security gates** to the frontend CI/CD pipeline. These security gates are mandatory frontend CI/CD controls for this project:

**Existing gates (required):**
- **Gate 1 — SCA (Dependency Vulnerability Scan):** Run `npm audit --audit-level=high` or an approved SCA tool on every PR. Any `Critical` or `High` severity CVE in a frontend dependency MUST block the merge.
- **Gate 2 — Secrets Detection:** Run `gitleaks detect` on every PR diff. Frontend code frequently contains accidentally committed API keys, Stripe public keys, or environment variables. This gate is non-negotiable.
- **Gate 3 — Pre-Commit Secret Scan:** Add `gitleaks detect --no-git` (staged files only) to the existing `husky + lint-staged` pre-commit hook so secrets are caught locally before pushing.

**Extended gates (additionally required):**
- **Gate 4 — Production Source-Map Policy:** Source maps MUST NOT be publicly deployed to the production CDN/server. Configure `productionBrowserSourceMaps: false` in `next.config.ts`. Verify in CI that no `.map` files are present in the public build output.
- **Gate 5 — Dependency Update Policy:** A weekly automated dependency-update scan (e.g., Dependabot or Renovate) MUST be configured. Security patches for `Critical`/`High` CVEs must be merged within 7 days of disclosure.
- **Gate 6 — CSP / Security Headers:** Production deployments MUST include HTTP security headers: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. Verify via a headers-check CI step or Lighthouse security audit.
- **Gate 7 — Environment Variable Validation:** All environment variables MUST be validated at startup using the Zod schema in `src/config/env.ts` (Rule 15D). CI build MUST fail if required variables are absent or malformed.
- **Gate 8 — Authorization Regression Tests:** Every protected API endpoint covered by a frontend feature MUST have at least one Playwright E2E or Vitest test that verifies the permission-denied behavior (e.g., unauthenticated request returns 401, unauthorized role returns 403). These regression tests run on every PR.
- **Gate 9 — PII-Safe Error Logging Audit:** A CI step (or manual code review gate) MUST verify that no PII (phone numbers, national IDs, full names + contact combos, financial data) is included in error monitoring payloads or `console.*` calls (Rule 43 data classification).
- **Gate 10 — Analytics Redaction:** Any analytics event payload MUST exclude PII and Financial classified fields (Rule 43). A code-review checklist item MUST confirm this for every new analytics call added.

**Why these additional gates matter:** Dependency and secret scans catch supply-chain and credential risks. They do NOT catch exposed source maps (reveals full source to attackers), missing CSP headers (enables XSS), unauthorized API calls from other roles (authorization regression), or PII leaking through client telemetry. These 10 gates together provide defense-in-depth for the frontend security surface.

75. **Module-Owned MSW / Mock Architecture**:

When a backend endpoint does not yet exist, the frontend MUST use MSW to intercept the real frontend API request and return a realistic mock response.

It is strictly forbidden to hardcode fake business data directly inside:

- Components
- Hooks
- Pages
- UI constants
- Stores
- Contexts

Every module MUST own its own feature-specific mock fixtures and MSW handlers.

Example:

src/app/
└── frontend_manager/
    └── manager_members/
        ├── layout.tsx
        ├── page.tsx
        ├── manager_members_features.md
        ├── manager_members_forbidden.md
        ├── manager_members_theme_contract.md
        └── members_directory/
            ├── components/
            │   └── ManagerMembersDirectoryTable.tsx
            ├── hooks/
            │   └── useManagerMembersDirectory.ts
            ├── api/
            │   └── manager_members_directory.api.ts
            ├── types/
            ├── schemas/
            ├── state/
            ├── contracts/
            │   └── host-stubs.d.ts
            ├── tests/
            │   ├── manager_members_directory.integration.test.tsx
            │   └── harness/
            │       ├── bootstrap.ts
            │       └── ManagerMembersDirectoryHarness.tsx
            ├── mocks/
            │   ├── fixtures/
            │   │   └── manager_members_directory.fixtures.ts
            │   ├── handlers/
            │   │   └── manager_members_directory.handlers.ts
            │   └── scenarios/
            │       └── manager_members_directory.scenarios.ts
            ├── config/
            │   └── manager_members_directory.url_config.ts
            ├── manager_members_directory_features.md
            ├── manager_members_directory_forbidden.md
            └── manager_members_directory_theme_contract.md

The exact folder/file names may follow the module naming rules, but ownership is mandatory:

Feature-specific mock fixtures belong to the feature.
Feature-specific MSW handlers belong to the feature.
Feature-specific mock response builders belong to the feature.

Only the MSW application bootstrap/registration mechanism may remain outside the module.

### 75A. Global MSW Bootstrap Exception

A small global MSW bootstrap/registration mechanism MAY exist outside feature modules.

Its responsibilities are limited to:

- Starting MSW
- Registering module-owned handlers
- Enabling MSW in development/test environments
- Disabling MSW in production
- Framework-level MSW configuration

The global bootstrap MUST NOT contain:

- Feature mock fixtures
- Feature business data
- Feature response builders
- Feature-specific request logic
- Feature-specific validation
- Feature-specific business rules
- Feature-specific transformations

The global MSW bootstrap is infrastructure only.

Example:

src/infrastructure/msw/browser.ts

This file may import/register:

- members module handlers
- superadmin module handlers
- trainer module handlers

But it must NOT contain their mock data or handler implementations.

### 75B. No Feature-Specific Mock Outside the Owning Module

Feature-specific mock artifacts MUST NOT be placed in:

- src/mocks/
- src/shared/
- src/common/
- src/utils/
- other modules
- other role folders

unless the file is explicitly classified as genuine global infrastructure.

This includes:

- mock fixtures
- mock datasets
- mock response builders
- mock request helpers containing business behavior
- module-specific MSW handlers
- module-specific mock constants

If a mock represents server/API data for one module, it belongs inside that module.

Do not create a generic global mock-data repository to avoid duplication.

For AI-driven development, localized duplication is preferred over cross-module business coupling.

### 75C. Global Infrastructure vs Module-Owned Logic

A file may remain outside a module only when it is genuine application/framework infrastructure.

The fact that several modules use a file does NOT automatically make it global infrastructure.

A file qualifies as global infrastructure only when:

1. It provides framework/application plumbing.
2. It contains no module-specific business behavior.
3. Duplicating it would cause conflicting global configuration or behavior.
4. Its responsibility is stable and explicitly documented.

Examples of valid global infrastructure:

- Global API transport client
- Authentication/token interceptor
- Global error-monitoring adapter
- Application bootstrap
- Global MSW bootstrap
- Design-system primitives
- Global configuration

Examples that MUST remain module-owned:

- Superadmin gym fixtures
- Member mock records
- Invoice mock responses
- Billing-specific fake data
- Module-specific handlers
- Module-specific validation
- Module-specific business constants
- Module-specific business formatters

75D. **Complete MSW UI Contract & Fixture Coverage — No Missing UI Data**:
MSW is not merely a network mock. During frontend-first development, each MSW handler MUST provide a complete, realistic response that satisfies **every data requirement of the UI that consumes that endpoint**.

An MSW handler MUST NOT return a minimal response containing only a few convenient fields while leaving other rendered UI fields empty, undefined, or permanently unavailable.

Before creating or modifying an MSW handler, the AI agent MUST inspect the complete consuming UI and identify the exact data required by:
- Every table column
- Every table row
- Every KPI / statistic card
- Every chart and chart series
- Every filter
- Every searchable field
- Every sorting field
- Every pagination control
- Every dropdown/select option
- Every detail view
- Every modal/drawer
- Every badge/status indicator
- Every timeline/history entry
- Every summary section
- Every relationship/reference displayed by the UI

### UI-to-API Data Contract Requirement

For every data-consuming feature, the following chain MUST be explicitly aligned:

```text
UI Requirement
      ↓
Module API Contract
      ↓
Module Type
      ↓
Module Zod Schema
      ↓
Module-Owned MSW Fixture
      ↓
Module-Owned MSW Handler
      ↓
TanStack Query
      ↓
Module UI Rendering
```

The mock fixture and handler must belong to the same module as the consuming feature. They must not be retrieved from another business module merely because that module owns similar data.

The AI MUST NOT invent a disconnected mock response merely to satisfy TypeScript.
The MSW response MUST contain all fields that the UI actually consumes.

### Required Data Coverage Matrix

Every feature that depends on MSW MUST document or be able to derive the following mapping (use the `## UI Data Requirements` section of its `[moduleName]_features.md` — see Rule 13):

| UI Element | Required Field(s) | API Endpoint | Response Path | Availability | Nullable? | Mocked? | UI Behavior When Unavailable |
|---|---|---|---|---|---|---|---|
| Table: Gym Name | `name` | `GET /.../gyms` | `data.items[].name` | `required` | No | Yes | Render fallback text |
| Table: Owner | `ownerName` | `GET /.../gyms` | `data.items[].ownerName` | `nullable` | Yes | Yes | `displayValue()` |
| KPI: Active Gyms | `activeCount` | `GET /.../gyms/stats` | `data.activeCount` | `permission_masked` | No | Yes | Hide KPI or show neutral badge |
| Filter: Plan | `planId`, `planName` | `GET /.../gyms` | `data.items[]` | `required` | No | Yes | All options |

The actual project feature MUST use its real field names, endpoint names, and response paths. The example above is illustrative only.

### Fixture Completeness Rules

MSW fixtures MUST contain enough records and value variation to exercise the actual UI. For list/table features, mock data MUST include realistic variation for at least:
- Multiple records
- Different statuses
- Different plans/categories where applicable
- Different dates
- Different numeric values
- Nullable/optional fields
- Long text values where truncation is expected
- Searchable values
- Filterable values
- Sortable values
- Enough records to exercise pagination
- At least one realistic empty-result scenario
- At least one realistic error scenario through a separate MSW handler/state

These fixtures are part of the owning module's test/development boundary and MUST remain physically inside that module.

Fixture completeness must never be achieved by adding hardcoded fallback data to UI components.

The exact number of records is determined by the feature's pagination and UI requirements. Do not artificially limit a paginated feature to one or two records when the UI requires multiple pages to be testable.

### Table Completeness Rule

For every rendered table:
1. Every visible header MUST correspond to a real response field.
2. Every row cell MUST receive its value from the API response or an explicitly documented derived value.
3. No table cell may depend on an undocumented mock-only field.
4. No required cell may silently render `undefined` because the MSW fixture omitted the field.
5. Nullable fields MUST use the canonical nullable display fallback (Rule 78 `displayValue()`).
6. Header count, cell count, and `colSpan` MUST remain consistent (Rule 68).

### KPI and Chart Completeness Rule

For every KPI or chart:
- Every displayed metric MUST have a defined response source.
- Every chart series MUST have mocked values.
- Every chart axis used by the UI MUST have corresponding mock data.
- Empty datasets MUST be explicitly handled.
- Loading, success, empty, and error states MUST all be testable with MSW.

A chart MUST NOT render because static values were embedded directly inside the component.

### Filter / Search / Pagination Rule

If the UI contains search, filter, sort, or pagination, the MSW handler MUST support the corresponding request parameters and return data that makes those interactions visibly testable.

```text
search=active
→ handler receives search parameter
→ handler filters fixture dataset
→ response contains matching records
→ UI visibly changes
```

The AI MUST NOT implement a visually interactive filter that always returns the same mocked dataset.

### Dropdown / Relationship Rule

For dropdowns and relational fields:
- If the options are backend-driven, mock them through an API endpoint/MSW handler.
- If they are truly static UI constants, keep them in the feature-specific constants architecture defined by Rule 3B. Do not duplicate backend-driven options inside component constants.
- When one entity references another entity, the mock response MUST provide the relationship data required by the UI.

```text
Gym
 ├── planId
 ├── planName
 ├── ownerId
 └── ownerName
```

If the UI displays `planName` and `ownerName`, the MSW response must provide those values through the documented API contract or through an explicitly documented relationship mapping.

### No "Minimal Mock" Rule

This pattern is **forbidden**:
```text
UI requires: name, owner, plan, memberCount, revenue, status
MSW returns: id, name, status
```
This creates a false implementation where the page appears structurally complete but cannot render the actual product data correctly. The AI MUST fix the contract/fixture instead of adding hardcoded fallback values to the component.

### No Component-Level Mock Fallback

This pattern is **forbidden**:
```ts
// ❌ FORBIDDEN
const ownerName = apiData.ownerName ?? "Demo Owner";
const revenue = apiData.revenue ?? 125000;
```
when those values are required fields of the API contract. Do not use hardcoded fallback business data to hide an incomplete MSW response.

Correct approach:
```text
UI requires field
→ update API contract
→ update TypeScript type
→ update Zod schema
→ update MSW fixture
→ render from response
```

### Byte-for-Byte Mock & Real API Envelope Symmetry

A critical production bug occurs when an MSW mock handler returns bare data while the production backend returns a canonical response envelope (or vice versa).

```typescript
// ❌ FORBIDDEN MOCK ENVELOPE MISMATCH (Crash Anti-Pattern):
// In MSW Mock Handler:
HttpResponse.json({
  id: "1",
  name: "Rahul Sharma"
})

// But Real Backend API returns canonical ApiResponse<T> envelope:
{
  "success": true,
  "message": "Member fetched successfully",
  "data": {
    "id": "1",
    "name": "Rahul Sharma"
  },
  "meta": { "page": 1, "total": 1 }
}
// Consequence: Frontend code written against the bare mock accesses `response.name`. This passes mock tests, but crashes instantly in production with `TypeError: Cannot read properties of undefined (reading 'name')`!

// ✔ MANDATORY CONTRACT LOCK:
// Every MSW mock handler MUST return the canonical ApiResponse<T> envelope matching @/lib/api:
HttpResponse.json({
  success: true,
  message: "Success",
  data: memberData,
  meta: paginationMeta,
})
```

### Mock Scenarios Registry (`[role]_[submodule].scenarios.ts`)

Every feature module's mock suite MUST define a canonical scenarios registry at `mocks/scenarios/[role]_[submodule].scenarios.ts`.
This ensures any engineer or AI agent can immediately switch scenarios and verify all UI states deterministically without manual mocking hacks.

Standard mandatory scenario keys:
1. `ACTIVE_RECORDS` (Default): Standard populated dataset for sunny-day rendering.
2. `EMPTY_DATA`: Zero records array (`data: []`, `total: 0`) to verify the module's `EmptyState` component.
3. `SERVER_500_ERROR`: Simulated 500 error response to verify the module's `error.tsx` boundary and retry CTA.
4. `NETWORK_TIMEOUT`: Simulated high latency (15,000ms delay) to verify loading skeletons, button disabled states, and timeout errors.
5. `UNAUTHORIZED_401` / `FORBIDDEN_403`: Session expiry or permission denial to verify redirect / auth toast.

```typescript
// Example: members_directory/mocks/scenarios/managerMembersDirectory.scenarios.ts
export const MANAGER_MEMBERS_SCENARIOS = {
  ACTIVE_RECORDS: {
    status: 200,
    envelope: { success: true, message: "OK", data: mockMembersList, meta: mockPaginationMeta, requestId: "req-mock-001" }
  },
  EMPTY_DATA: {
    status: 200,
    envelope: { success: true, message: "No members found", data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasNextPage: false, hasPrevPage: false }, requestId: "req-mock-002" }
  },
  SERVER_500_ERROR: {
    status: 500,
    envelope: { success: false, message: "Internal server error occurred", data: null, errorCode: "ERR_INTERNAL_500", statusCode: 500, requestId: "req-mock-500" }
  },
  NETWORK_TIMEOUT: {
    delayMs: 15000,
    status: 504,
    envelope: { success: false, message: "Gateway timeout", data: null, errorCode: "ERR_TIMEOUT", statusCode: 504, requestId: "req-mock-504" }
  },
  UNAUTHORIZED_401: {
    status: 401,
    envelope: { success: false, message: "Session expired", data: null, errorCode: "ERR_UNAUTHORIZED", statusCode: 401, requestId: "req-mock-401" }
  }
} as const;
```

### Standalone Module Harness / Bootstrap (`bootstrap.ts` / `[Role][Module]Harness.tsx`)

To guarantee absolute **Feature ZIP Portability**, every module MUST include a self-contained mounting harness located inside `tests/harness/` (e.g., `ManagerMembersHarness.tsx` or `bootstrap.ts`).

The Harness MUST:
1. Initialize the module's MSW worker with the active scenario;
2. Wrap the primary client component (`[Role][Module]Main.tsx`) with necessary zero-business providers (`QueryClientProvider`, `ThemeTokenProvider`, mock session context);
3. Expose a scenario selector dropdown in development mode so developers and automated test agents can toggle between `ACTIVE`, `EMPTY`, `500_ERROR`, and `TIMEOUT` live without reloading the whole application.

### Dataset Scale & Stress Testing Fixtures (10, 100, 500+ Records)

To guarantee that UI components, virtualized tables, and pagination controls perform smoothly under enterprise loads without UI freezing or DOM thrashing, every feature module's `mocks/fixtures/` MUST provide three deterministic scale tiers:
1. **Tier 1 (Small / 10 records):** For baseline rendering and snapshot tests.
2. **Tier 2 (Standard / 100 records):** Exercises multi-page pagination, table search filters, and sorting.
3. **Tier 3 (Stress / 500+ records):** Stress-tests virtualization (`@tanstack/react-virtual`), infinite scroll, and browser memory consumption.

```typescript
// Example: members_directory/mocks/fixtures/managerMembersDirectory.fixtures.ts
export const MOCK_MEMBERS_TIER_1_SMALL   = generateMockMembers(10);
export const MOCK_MEMBERS_TIER_2_MEDIUM  = generateMockMembers(100);
export const MOCK_MEMBERS_TIER_3_STRESS  = generateMockMembers(500);
```

### Fixture Source-of-Truth Rule

MSW fixtures are mock implementations of the API contract. They are NOT an alternative business-data architecture.

The following separation MUST be preserved:
```text
Static UI Configuration  → feature constants (Rule 3B)
Server/API Data          → API contract + Zod → MSW fixtures → real backend
UI State                 → local state / Zustand
Server State             → TanStack Query
```

### Backend Transition Rule

When the real backend endpoint becomes available:
- The UI MUST continue consuming the same API contract.
- The feature API client MUST remain the same unless the backend contract legitimately changes.
- Components MUST NOT require a rewrite merely because mocked responses are replaced by real responses.
- Any contract change MUST update the corresponding TypeScript types, Zod schemas, MSW handlers, `[moduleName]_features.md` documentation, and tests in the same change.

### API Contract Compatibility Gate

To prevent MSW mock drift and ensure true backend readiness:
1. The backend OpenAPI contract (`swagger.json` or OpenAPI spec) is the canonical transport contract.
2. Generated API types (`src/generated/openapi/*`) are regenerated in CI when OpenAPI changes.
3. Module Zod response schemas must validate against the OpenAPI contract shape.
4. Each module-owned MSW fixture and mock response must validate against the same Zod response schema.
5. CI must fail when:
   - Frontend API client uses removed or renamed fields;
   - MSW fixture lacks required response fields defined by the OpenAPI schema;
   - Backend breaking change has no version/migration pathway;
   - `## UI Data Requirements` in `[moduleName]_features.md` references a nonexistent API field.

Backend integration does NOT require moving module-owned mocks or handlers into a global mock folder.

The ownership remains:

Development/Test:
Module → Module API Client → Module-Owned MSW Handler → Module-Owned Fixture

Production:
Module → Module API Client → Real Backend

MSW must be disabled in the production path.

Module-owned handlers and fixtures remain available for development, tests, error simulation, empty-state simulation, pagination/filter/sort scenarios, and other deterministic test scenarios.

### AI Verification Requirement

Before declaring a frontend feature complete, the AI MUST verify:
1. Every displayed data field has a documented source (in `## UI Data Requirements` of `[moduleName]_features.md`).
2. Every source exists in the response type/schema.
3. Every required response field is returned by the MSW handler.
4. Every MSW field is consumed correctly by the UI where applicable.
5. Tables display populated values in all intended columns.
6. KPIs display non-placeholder values.
7. Charts receive complete series data.
8. Filters/search/sorting/pagination produce different mocked results where applicable.
9. Empty states can actually be triggered.
10. Error states can actually be triggered.
11. No component/hook contains hidden hardcoded business fallback data.
12. The feature works using the same API access path that will be used with the real backend.

A feature MUST NOT be marked complete merely because TypeScript compiles or the page visually renders.
*Consequence of violation:* Incomplete or minimal MSW fixtures cause table columns, KPIs, and charts to render blank, `undefined`, or with fake hardcoded business fallbacks, producing invalid test results and false compliance. Incomplete MSW coverage = IMMEDIATE `NON_COMPLIANT` AUDIT FAILURE.

### Completion Standard

```text
"Backend does not exist yet"
        DOES NOT MEAN
"Return a tiny fake response"

It means:

"Backend does not exist yet,
so MSW temporarily behaves like the backend
and must faithfully provide the complete API data contract
required by the finished UI."
```

76. **`CODEOWNERS` Human Review Gate for Security-Critical Frontend Code**:
Security-critical frontend changes require mandatory human review. The frontend MUST implement a `CODEOWNERS` file requiring mandatory human reviewer approval on PRs that touch security-critical frontend paths. AI agents cannot self-certify security-critical UI changes.
- **Non-Blocking During AI Development:** This gate applies strictly at Git Pull Request / deployment time before merging into protected branches. It does NOT halt, pause, or block local AI development. AI agents MUST generate the complete source code, comprehensive unit/E2E tests, and the mandatory `## Security Impact Analysis` markdown section autonomously without pausing, stalling, or asking for permission during code generation.
- **Mandatory Human Review Required For (at PR Merge Time):**
  1. **Auth UI** — Any changes to `src/app/auth/` (login form, logout, refresh logic).
  2. **API Interceptor & Token Logic** — Any changes to the centralized `api.ts` wrapper, the token refresh interceptor, or `middleware.ts`.
  3. **Permission Hooks** — Any changes to `usePermissions()` or any hook that conditionally hides/shows restricted UI elements.
  4. **Payment UI** — Any component that triggers a payment, displays financial data, or handles billing actions.
- **PR Description Mandate:** Any PR touching these paths MUST include a `## Security Impact Analysis` section explaining what changed and why it's safe.
- **Why:** A subtle bug in the frontend's token refresh logic or a missing `usePermissions()` check can expose restricted data to unauthorized users — purely a client-side authorization bypass. Automated ESLint and TypeScript checks cannot catch semantic security flaws. A human review is the final gate.

77. **CI/CD Merge Policy and Branch Protection**:
Every pull request must pass the following pipeline before merge:

1. **Quality**
   - ESLint
   - Prettier check
   - Tailwind linting
   - TypeScript type check

2. **Security**
   - Dependency vulnerability scan
   - Secret scan
   - License/compliance scan if required by the organization

3. **Tests**
   - Vitest unit/component tests
   - Coverage thresholds
   - Playwright E2E tests for applicable critical flows

4. **Build**
   - Production Next.js build
   - Bundle analysis for major changes

5. **Review**
   - Mandatory CODEOWNERS approval for auth, permissions, billing, payment, and security-sensitive paths.
   - AI-generated PR descriptions must list files changed, tests run, risk areas, and rollback impact.

Branch protection requirements:
- No direct push to `main`.
- No merge with failing checks.
- No bypass for CODEOWNERS on security-sensitive files.
- Require at least one human approval for all AI-generated changes.

78. **The "En-Dash" Rule for Empty Data (Visual Integrity)**:
Never render completely blank table cells or profile field values when an API returns `null`, `undefined`, or an empty string for optional fields. Always use a meaningful fallback so the user explicitly knows the value is intentionally absent — not a rendering failure or a loading bug.
- **Standard fallback:** Use an en-dash (`—`) for table cells and detail views: `{displayValue(data.optionalField)}`
- **Numeric fields:** MUST use `0` or `—` depending on whether zero is a valid meaningful value (e.g., `totalSessions` MUST show `0`, but `assignedTrainer` MUST show `—`).
- **Why:** A blank cell is visually indistinguishable from a broken render or a missing API field. An en-dash is an explicit, intentional signal to the user that the data does not exist. This is especially critical in financial tables, member profiles, and audit logs where a blank value could be misread as a data integrity issue.
- ❌ **BAD:** `<td>{member.trainerName}</td>` — renders nothing if `null`
- ✅ **GOOD:** `<td>{displayValue(member.trainerName)}</td>` — renders `—` explicitly
- **Centralize the neutral fallback:** Define a shared zero-business utility `displayValue` in `src/lib/display_value.ts`. `displayValue()` accepts primitive display values required by the UI, including string, number, boolean, null, and undefined, rendering an en-dash (`—`) for nullish/empty values while preserving meaningful zero (`0`) and false values.
*(Note: `src/lib/display_value.ts` contains zero business logic and qualifies as approved global presentation infrastructure under Rule 63. No global business formatting library may exist. All business-aware formatters—currency, date, phone, tax, invoice, etc.—MUST remain strictly feature-local inside the autonomous sub-module `utils/` folder per Rule 80).*

79. **Unsaved Changes Guard (Data Loss Prevention)**:
Any complex form or multi-step wizard MUST implement a "Dirty State Guard" to prevent accidental data loss. Rule 79 supersedes Rule 46 for scope; Rule 46 defines only the browser `beforeunload` mechanism.
- **This rule additionally mandates** interception of in-app Next.js router navigation. `beforeunload` does NOT fire on client-side route changes in the Next.js App Router. You MUST implement a `useUnsavedChangesGuard(isDirty: boolean)` custom hook that:
  1. Listens to `beforeunload` for browser-level exits.
  2. Uses a navigation interception pattern (e.g., a custom `useBlocker`-style hook or a prompt triggered before `router.push`) to catch in-app navigation when `formState.isDirty === true`.
  3. Displays a confirmation dialog: *"You have unsaved changes. Are you sure you want to leave? Your changes will be lost."*
  4. Only proceeds with navigation if the user explicitly confirms.
- **Scope:** Apply to all forms with 3+ fields, all multi-step wizards, and any modal where the user has typed or selected values.
- **Reset condition:** The guard must be deactivated immediately after a successful form submission or an explicit "Discard Changes" action.
- ❌ **BAD:** User fills a 3-step Add Member wizard, accidentally clicks a sidebar link, and loses all entered data with no warning.
- ✅ **GOOD:** `useUnsavedChangesGuard(formState.isDirty)` intercepts the navigation and shows a confirm dialog before the route changes.
- *Consequence of violation:* Accidental route changes discard unsaved form inputs, frustrating users and causing data loss. Missing `useUnsavedChangesGuard` on complex forms = `NON_COMPLIANT`.

80. **Currency & Number Formatting Standardization**:
Never manually concatenate currency symbols, format numbers with raw `.toFixed()`, or build locale strings directly inside JSX or component logic. All financial values and large numeric metrics MUST be piped through a centralized formatting utility.
- **Minor-unit contract:** API monetary values are stored as minor units (paise, cents). Always divide by the appropriate currency subunit divisor (e.g., 100 for INR) before formatting. Never pass a raw API minor-unit value to a display formatter that expects major units — this causes a 100× display error.
- **Required utilities:** Define `[module]FormatCurrency(amountMinor: number, currencyCode: string, locale: string): string` locally inside the feature module under the autonomous sub-module `utils/` folder. **Do NOT create or use a global formatters library.** Each feature module must own its own formatting utility to prevent cross-module coupling. The only permitted global presentation utility is `src/lib/display_value.ts` for zero-business en-dash fallbacks.
- **Locale consistency:** The utility must use the `Intl.NumberFormat` API to ensure consistent comma separators, decimal places, and currency symbol placement based on the app's configured locale — never hardcoded.
- **Decimal precision:** Financial values MUST use the feature-local currency formatter. Metric counts (e.g., total members) must display with comma separators but no decimals.
- **This rule is the numeric parallel to Rule 24** (which standardizes date/time formatting via `date-fns`). Just as Rule 24 forbids raw `new Date()` in JSX, this rule forbids raw number concatenation.
- ❌ **BAD:** `<td>₹{payment.amount.toFixed(2)}</td>` — `payment.amount` is in paise; this displays 100× too large.
- ✅ **GOOD:** `<td>{adminBillingFormatCurrency(payment.amount, 'INR', locale)}</td>`
- **ESLint enforcement:** Add a custom ESLint rule or `no-restricted-syntax` pattern to flag direct `.toFixed()` calls and currency symbol string concatenation in `.tsx` files.
- *Consequence of violation:* Displaying minor units directly or using raw `.toFixed()` results in 100× pricing display errors (e.g. ₹9999 instead of ₹99.99), breaking financial trust and localization. Formatting currency outside the module formatter = `NON_COMPLIANT`.

81. **Button Loading Width Stability (No Layout Shifts)**:
Buttons that enter a loading state MUST maintain their exact original width. When a button's text label is replaced by a `Loader2` spinner (as mandated by Rule 26), the button must not shrink or collapse, as this causes a jarring layout shift that breaks the visual rhythm of forms and toolbars.
- **Required pattern:** Apply a semantic `min-w-*` class (e.g., `min-w-32`) dynamically on the button, OR replace only the leading icon with the spinner while keeping the text label visible (e.g., "Saving..."), OR use a fixed-width wrapper.
- **Recommended approach:** Keep the button text visible alongside the spinner during loading (e.g., `<Loader2 className="animate-spin" /> Saving...`) rather than replacing the text entirely. This also improves accessibility by maintaining a readable label for screen readers.
- **Forbidden pattern:** Never let a button collapse to icon-only width during loading if it was originally a full text button. The width change is visually disruptive, especially in form footers where multiple buttons are aligned.
- ❌ **BAD:** Button reads "Save Changes" (120px wide) → loading state shows only `<Loader2>` (32px wide) → layout shifts.
- ✅ **GOOD:** Button reads "Save Changes" → loading state shows `<Loader2 /> Saving...` at the same width, or `min-w` is set to lock the width.
- **Applies to:** All submit buttons, confirmation buttons in modals, and any async action trigger button across the entire application.

82. **Toast Deduplication (No Stacking Identical Notifications)**:
Global toast notifications MUST be deduplicated. If a specific toast (identified by its message string or a semantic error code) is already visible on screen, subsequent identical triggers must either silently refresh the toast's auto-dismiss timer or be completely ignored — never stack multiple identical toasts.
- **Why this matters:** In modules with heavy API interaction (e.g., a billing page where a user rapidly clicks "Retry" on a failing request), the same error toast can stack 5–10 times, flooding the screen and degrading the user experience significantly.
- **Implementation:** Use the toast library's built-in deduplication ID feature. Pass a stable `toastId` derived from the error code or message hash when calling `toast.error(message, { id: errorCode })`. Most toast libraries (e.g., `react-hot-toast`, `sonner`) support this natively.
- **Global Auth/Transport Errors:** Global errors may use a global toast deduplication pattern in the centralized interceptor.
- **Module Business Errors:** Module-specific business errors MUST NOT be toasted globally by the interceptor. The module decides presentation.
- **Canonical pattern (For any emitted toast):**
  ```ts
  // Whenever a toast is actually emitted, pass a stable ID
  toast.error(res.message, { id: res.error ?? `module-action-entityId-${res.message}` });
  ```
- `entityId` must be the actual stable entity/resource identifier when one exists; never use a literal placeholder or message-only ID when distinct entities can legitimately emit the same message.
- **Success toasts:** Apply the same deduplication for success toasts on rapid repeated actions (e.g., toggling a status on/off quickly).
- **Never deduplicate:** Do NOT deduplicate toasts for genuinely distinct events (e.g., two different members being deleted in sequence). Deduplication applies only to identical messages triggered by the same repeated action.
- **ESLint note:** All raw `toast()` calls outside of `src/lib/api.ts` or the approved toast utility wrapper MUST be flagged for review to ensure the `id` field is always passed.

83. **Idempotency-Key Lifecycle & Retry Behavior**:
Rule 14 establishes that applicable mutation API clients require an Idempotency-Key. This rule defines the key lifecycle and retry behavior:
- generate exactly once per user intent;
- generate at confirmation;
- reuse on retry;
- new key only for a new intent;
- never generate a fresh key for a retry.
- **Implementation:** Generate the key in the confirm handler, store it (e.g., in a `useRef`), and reuse it on all retries until the mutation succeeds or is explicitly abandoned.
- ❌ **BAD:** Generating `crypto.randomUUID()` on every retry attempt.
- *Consequence of violation:* Generating a new idempotency key on mutation retries defeats double-spend/double-action protection on the backend, creating duplicate charges or duplicate database records. Re-generating key on retry = SEVERE DATA INTEGRITY DEFECT (`NON_COMPLIANT`).

This rule is the authoritative web frontend rule for Idempotency-Key generation and retry lifecycle.

84. **Strict Case Sensitivity for File Names and Imports (Linux/CI Compatibility)**:
All imports and file paths MUST exactly match the casing of the actual file on disk. While development often happens on Windows/macOS (which have case-insensitive file systems), production deployments and CI pipelines typically run on Linux (which has a strict case-sensitive file system).
- **Rule:** A mismatch between import case (e.g., `trainer_url_config`) and file case (e.g., `Trainer_url_config.ts`) will cause the build to fail in CI/CD.
- **Enforcement:** Always double-check that the casing of module prefixes and filenames in imports matches exactly. If you rename a file, ensure the git index catches the case change (e.g., using `git mv`).
- ❌ **BAD:** File is `Button.tsx`, imported as `import Button from './button'`.
- ✅ **GOOD:** File is `Button.tsx`, imported as `import Button from '@/components/ui/Button'`.

---
*INTERNAL INSTRUCTION: Think step-by-step and create a detailed internal implementation plan. Do NOT stop for user review. Execute it perfectly without breaking existing data flows.*

## Extended Rule 14 — Idempotency for API Mutations

EVERY frontend API client function that performs a mutation MUST require an `idempotencyKey: string` parameter and MUST always inject it into HTTP headers as `{'Idempotency-Key': idempotencyKey}`. The key MUST be generated exactly once per user intent, reused for retries, and regenerated only for a new user intent.

Example:
```typescript
import { apiFetch } from '@/lib/api';
import { MANAGER_MEMBERS_API } from '@/app/frontend_manager/manager_members/manager_members_url_config';

export const updateMemberProfile = async (
  id: string,
  body: unknown,
  idempotencyKey: string,
) => apiFetch(MANAGER_MEMBERS_API.detail(id), {
  method: 'PATCH',
  body: JSON.stringify(body),
  headers: {
    'Idempotency-Key': idempotencyKey,
  },
});
```

## Extended Rule 15 — WebSocket Centralization
* **The Rule:** WebSockets must never be instantiated directly via `new WebSocket()` or `io()` inside UI components. 
* **Implementation:** Always use a centralized `WebSocketContext` or `SocketProvider` to manage connection lifecycles (connect, disconnect, reconnect). Feature modules must consume WebSockets via dedicated custom hooks (e.g., `useSocketEvent('NOTIFICATION_RECEIVED', callback)`). This guarantees that event listeners are correctly cleaned up on component unmount and avoids memory leaks.

## Rule 16 — Role-Based Field Masking & Optional Types
* **The Rule:** The backend strictly masks sensitive data fields (like revenue) based on the user's role before transmitting the response. 
* **Implementation:** Frontend TypeScript interfaces and Zod schemas MUST mark these potentially masked fields as optional (`?`). UI components consuming this data must implement graceful fallback behavior (e.g., hiding a specific chart or displaying a generic placeholder) if a field is `undefined`. The frontend must never crash due to a missing role-restricted field.

## Rule 17 — Strict Cache Invalidation Strategy
* **The Rule:** TanStack Query (React Query) server state must always remain perfectly synchronized with the backend data. 
* **Implementation:** Every mutation hook (`useMutation`) MUST implement an `onSuccess` callback that calls `queryClient.invalidateQueries({ queryKey: [...] })` for any relevant queries affected by the mutation. Failing to invalidate queries will cause the UI to display stale, obsolete data after an update.

## Rule 18 — Internationalization (i18n) & Localization

### Strategy: Module-Co-located Locales + AI-Generated Translations (Zero External Cost)

The frontend uses `next-intl` (Next.js) with **co-located locale files inside each feature module folder** — NOT in a central `src/messages/` directory. This preserves **Extreme Isolation**: each feature module owns its own strings and can be moved, deleted, or versioned independently.

**Translations are written by the AI agent at the time it writes the module code.** No external API is needed. The AI already has full context of the Gym Management domain, making translations accurate and idiomatic.

### Stack
- **Library:** `next-intl` (Next.js) or `react-i18next` (plain React/Vite)
- **Base language:** English (`[moduleName]_en.json`) — written by AI agent when creating the module
- **Other languages:** Written by the AI agent in the same commit
- **Runtime cost:** Zero — all files are static JSON, bundled at build time

### Sub-Module-Level File Structure
Each autonomous sub-module owns its own `locales/` folder:
```text
src/app/
  frontend_admin/
    admin_members/
      members_directory/
        locales/
          admin_members_directory_en.json   ← AI writes this when creating the sub-module
          admin_members_directory_hi.json   ← AI translates this in the same commit
        components/
        hooks/
  frontend_superadmin/
    superadmin_gyms/
      gyms_list/
        locales/
          superadmin_gyms_list_en.json
          superadmin_gyms_list_hi.json
        components/
        hooks/
scripts/
  merge-locales.ts   ← Merges all sub-module locales into one bundle at build time
```

### `locales/[role]_[submodule]_en.json` (Source of Truth per Sub-Module)
```json
{
  "SUPERADMIN_GYMS_LIST": {
    "PAGE_TITLE": "Gyms",
    "ADD_GYM": "Add Gym",
    "EMPTY_STATE": "No gyms found. Add your first gym to get started."
  }
}
```

### AI Agent Translation Rule
When writing a new feature module, the AI MUST:
1. Create `locales/[role]_[submodule]_en.json` with all English UI strings used in the sub-module.
2. In the **same commit**, create locale files for all currently active languages defined in the "Currently Active Languages" section, using its own translation capability.
3. Translations must be **contextually correct** for a Gym Management SaaS.

```json
// locales/[role]_[submodule]_hi.json — AI writes this, context-aware
{
  "MEMBERS": {
    "PAGE_TITLE": "सदस्य",
    "ADD_MEMBER": "सदस्य जोड़ें",
    "EMPTY_STATE": "कोई सदस्य नहीं मिला। शुरू करने के लिए अपना पहला सदस्य जोड़ें।"
  }
}
```

### Using Translations in Components
Always use the `t()` function — **never** hardcode English strings in JSX:
```tsx
import { useTranslations } from 'next-intl';

export const ManagerMembersPage = () => {
  const t = useTranslations('MEMBERS');
  // ❌ BAD: <h1>Members</h1>
  // ✅ GOOD:
  return (
    <>
      <h1>{t('PAGE_TITLE')}</h1>
      <Button>{t('ADD_MEMBER')}</Button>
    </>
  );
};
```

### `scripts/merge-locales.ts` (Build-Time Merge Script)
Merges all sub-module `locales/` folders into a single bundle per language. Runs automatically at build time.

```typescript
// scripts/merge-locales.ts
// Usage: npx ts-node scripts/merge-locales.ts
import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';

const OUTPUT_DIR = 'public/locales';
const merged: Record<string, Record<string, unknown>> = {};

for (const file of globSync('src/app/frontend_*/**/locales/*.json')) {
  const lang = path.basename(file, '.json');         // 'en', 'nl', etc.
  const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
  merged[lang] = { ...merged[lang], ...content };
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (const [lang, data] of Object.entries(merged)) {
  fs.writeFileSync(`${OUTPUT_DIR}/${lang}.json`, JSON.stringify(data, null, 2));
  console.log(`✅ Merged ${lang}.json`);
}
```

Add to `package.json`:
```json
{
  "scripts": {
    "i18n:merge": "npx ts-node scripts/merge-locales.ts",
    "build": "npm run i18n:merge && next build"
  }
}
```

### API Client: `Accept-Language` Header
The central `apiFetch` client MUST attach the current locale to every request:
```typescript
import { getLocale } from 'next-intl/server';

export const apiFetch = async (url: string, options?: RequestInit) => {
  const locale = await getLocale(); // 'nl', 'fr', 'en'
  return fetch(url, {
    ...options,
    headers: { 'Accept-Language': locale, ...options?.headers },
  });
};
```

### Developer Workflow
1. AI writes a new feature module and creates `locales/[role]_[submodule]_en.json`.
2. AI, in the **same response**, creates all currently active target-language `locales/[role]_[submodule]_{lang}.json` files.
3. Run `npm run i18n:merge` (or let CI/build do it automatically).
4. Commit all `locales/` files alongside the feature module code.
5. **Never** put locale files in a central `src/messages/` or `src/i18n/` folder.

### Currently Active Languages
This is the **authoritative list of languages** currently active in the project. When an AI agent creates any new module, it MUST generate `locales/` files ONLY for the languages in this active list, unless the task explicitly requires additional locales.

| Code | Language | Region | Script | Priority |
|------|----------|--------|--------|----------|
| `en` | English | Global | Latin | **Base — always first** |
| `hi` | Hindi | India (North) | Devanagari | High |

### Planned Languages
These languages will be added as the product expands. Do NOT generate locales for these languages by default during new module creation until they are moved to the active list.

| Code | Language | Region | Script | Priority |
|------|----------|--------|--------|----------|
| `nl` | Dutch | Netherlands, Belgium | Latin | High |
| `fr` | French | France, Belgium, Canada | Latin | High |
| `de` | German | Germany, Austria, Switzerland | Latin | High |
| `mr` | Marathi | Maharashtra, India | Devanagari | Medium |
| `ta` | Tamil | Tamil Nadu, Sri Lanka | Tamil | Medium |
| `te` | Telugu | Andhra Pradesh, Telangana | Telugu | Medium |
| `kn` | Kannada | Karnataka, India | Kannada | Medium |
| `bn` | Bengali | West Bengal, Bangladesh | Bengali | Medium |
| `gu` | Gujarati | Gujarat, India | Gujarati | Low |
| `ml` | Malayalam | Kerala, India | Malayalam | Low |
| `pa` | Punjabi | Punjab, India/Pakistan | Gurmukhi | Low |

When a planned language becomes officially active, every affected module MUST add that locale in the same change.

> **Indian Script Note (Web):** Indian scripts (Devanagari, Tamil, Telugu, etc.) require specific fonts. Use `next/font` to load Google Fonts such as `Noto Sans Devanagari`, `Noto Sans Tamil`, `Noto Sans Telugu` etc. for each script. Load fonts lazily — only load a script font when that locale is active. Never embed all script fonts at initial page load.

> **AI AGENT NOTE:** Every UI string in JSX MUST use `t('NAMESPACE.KEY')`. When creating a new feature module, you MUST create `locales/[role]_[submodule]_en.json` AND all currently active target-language files (e.g., `locales/[role]_[submodule]_hi.json`) in the same response. Use your own translation capability — do NOT call external APIs. Hardcoding English strings in JSX is a critical violation.

## Rule 19 — Centralized Feature Flags
* **The Rule:** Never use environment variables (e.g., `NEXT_PUBLIC_ENABLE_FEATURE`) directly in JSX logic to conditionally render UI elements. 
* **Implementation:** Application feature flags must be fetched dynamically from the backend at initialization and stored in Context or Zustand. Features MUST be toggled via a dedicated custom hook (`useFeatureFlag('ENABLE_NEW_BILLING')`). This allows flags to be changed per-tenant or per-user dynamically without needing a frontend deployment.


## Rule 20 — Multi-Currency Monetary Amounts

### The Rule
The backend sends all monetary amounts as **integers in the smallest currency unit** (paise for INR, cents for USD/EUR) alongside an ISO 4217 currency code. The frontend is solely responsible for formatting. Never hardcode a currency symbol or divide raw amounts manually.

### Canonical Formatting Utility
Create ONE shared utility per feature module. All currency display in that module MUST go through this function:
```typescript
// utils/adminBillingFormatCurrency.ts (co-located inside the sub-module utils/ folder)
/**
 * Formats a monetary amount from its smallest unit to a locale-aware display string.
 * @param amount  Integer in smallest unit (e.g., 9999 for ₹99.99)
 * @param currency ISO 4217 currency code (e.g., 'INR', 'USD', 'EUR')
 * @param locale  BCP 47 locale string (e.g., 'en-IN', 'nl-NL', 'en-US')
 */
export const adminBillingFormatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-IN'
): string => {
  const subunitMap: Record<string, number> = {
    JPY: 1, KWD: 1000, BHD: 1000, // no subunit or 3-decimal currencies
  };
  const divisor = subunitMap[currency] ?? 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: divisor === 1000 ? 3 : (divisor === 1 ? 0 : 2),
  }).format(amount / divisor);
};

// Usage:
// adminBillingFormatCurrency(9999, 'INR', 'en-IN')  →  '₹99.99'
// adminBillingFormatCurrency(9999, 'USD', 'en-US')  →  '$99.99'
// adminBillingFormatCurrency(9999, 'EUR', 'nl-NL')  →  '€99,99'
// adminBillingFormatCurrency(100,  'JPY', 'ja-JP')  →  '¥100'
```

### Rules
- ❌ Never do `amount / 100` inline in JSX.
- ❌ Never hardcode `₹`, `$`, or `€` symbols anywhere in JSX or components.
- ❌ Never store the formatted string in state or TanStack Query cache — store the raw integer.
- ✅ Always derive the locale from the active i18n locale (`useLocale()` from `next-intl`).

```tsx
// ❌ BAD
<Text>₹{plan.amount / 100}</Text>

// ✅ GOOD
import { useLocale } from 'next-intl';
const locale = useLocale();
<Text>{adminBillingFormatCurrency(plan.amount, plan.currency, locale)}</Text>
```

> **AI AGENT NOTE:** Every time you display a monetary amount, use the module-local `[module]FormatCurrency()` utility (e.g., `adminBillingFormatCurrency()`). The raw integer from the API must never be rendered directly in JSX. The locale MUST come from the active i18n context — never hardcode `'en-IN'`. No currency symbol may appear as a literal string anywhere in JSX.


## Rule 21 — Tenant Data Export & Offboarding UX

### The Rule
Data exports take minutes to process and cannot be downloaded synchronously. The frontend MUST handle the export trigger as an asynchronous background request.

### UI Placement
The export functionality must live in a dedicated, clearly visible section: **Admin Settings -> Data Export & Offboarding**. 
- **Role Constraint:** This UI MUST only be available in the **Superadmin** (or top-level Gym Admin) dashboard. Never add export buttons to manager, trainer, or member interfaces.

### Interaction Flow
1. **Button:** Display a clear `[ Request Full Data Export ]` button.
2. **Action:** When clicked, call the exact export endpoint defined by the supplied feature API contract. The AI MUST NOT invent or shorten the endpoint path.
   Canonical project pattern: `POST /api/v1/superadmin/export-data`
3. **Feedback:** Do NOT show a continuous loading spinner waiting for a file download. Since the API returns `202 Accepted` immediately, show a success toast or alert: 
   *"Export started. You will receive an email with a secure download link within a few minutes."*
4. **Format Expectation:** The UI MUST explicitly inform the user that their data will be provided as a ZIP file containing easy-to-read Excel (CSV) files.
5. **Real-time Completion Feedback:** The dashboard MUST listen for a WebSocket event (e.g., `EXPORT.DATA.COMPLETED`) or poll a status endpoint. When received, update the UI to confirm: *"Your data export is ready and the email has been sent."*

> **AI AGENT NOTE:** Do not implement a file download stream or blob parsing for the `/export-data` endpoint. The frontend's only responsibility is to trigger the request and show an async confirmation message.


## Notification & WebSocket Recovery Rule

### The Problem
If the user's browser tab is closed or loses internet connection when a WebSocket event is fired, the event is lost.

### The Rule
The WEB application MUST implement a hybrid notification architecture:
1. **Real-time:** Listen to WebSocket events (e.g., `NOTIFICATION.RECEIVED`) and update the web UI immediately.
2. **Recovery:** On initial application load and after a recovered WebSocket/session connection, fetch missed notifications using the exact endpoint defined by the supplied feature API contract. The AI MUST NOT invent or shorten the notification endpoint.

   Canonical project pattern: `GET /api/v1/{role}/notifications`

   Do not depend exclusively on WebSocket delivery for critical notifications.

### No Duplicate Responsibility Rule
Each responsibility MUST have exactly one owner to kill hallucination vectors:
- Search State -> Store
- Validation -> Schema
- API Calls -> API File
- Formatting -> Utility File
Forbidden: having the same responsibility duplicated in multiple places.

### Entry Point Discovery Rule
An AI MUST be able to discover the sub-module architecture within 60 seconds by reading exactly two files:
1. `[role]_[submodule]_features.md` (e.g., `admin_members_directory_features.md`)
2. `components/[Role][Submodule]Main.tsx` (e.g., `members_directory/components/AdminMembersDirectoryMain.tsx`)
If this is not possible, the sub-module FAILS the portability and architecture review.


## AI Introspection & Agentic Compatibility Rules

### Rule 22 — AI-Testable UI (Accessible Selectors First, data-testid for Ambiguous Cases)
* **The Problem:** When an AI agent writes or executes E2E tests (using Playwright, Cypress, or Puppeteer), it cannot "see" the UI like a human. Without reliable selectors, the AI will fail to interact with the page.
* **Selector Priority Order:** Use selectors in this order — stop at the first that uniquely identifies the element:
  1. **Role + accessible name** (`getByRole('button', { name: 'Save changes' })`) — preferred; validates real accessibility
  2. **Accessible label / aria-label** (`getByLabel('Email address')`)
  3. **Text content** (`getByText('Submit')`) — only for stable, non-duplicated text
  4. **Checked state / value** (`getByRole('checkbox', { checked: true })`)
  5. **`data-testid`** — ONLY when none of the above can uniquely and stably identify the element
* **When `data-testid` IS required:** Non-semantic elements (e.g., a div used as a drag target), repeated sibling elements without distinguishing accessible names, dynamic/generated components, invisible status indicators, or elements with no accessible label.
* **Format:** `data-testid="[moduleName]-[component]-[action/state]"`. Example: `data-testid="admin_members-addform-submit"` or `data-testid="admin_billing-invoice-status-paid"`.
* **Why:** Accessible selectors validate real user interaction AND real accessibility simultaneously. Universal `data-testid` on every element adds DOM noise and discourages tests that prove real accessibility behavior.

### Rule 23 — Component-Level AI Docstrings (JSDoc)
* **The Problem:** The `[moduleName]_features.md` file provides module-level context, but AI agents also need granular, file-level context when editing a specific hook or component.
* **The Rule:** Every Custom Hook, complex React Component, and State Store MUST have an exhaustive JSDoc block directly above its declaration.
* **What to include:** Explain the business intent, state dependencies, and explicit edge cases. Example: `/** @description Manages local wizard state for Member Creation. @dependencies Requires auth session. @edge-case Resets to step 1 if the API throws 409 Conflict. */`
* **Enforcing the 5-Second Comprehension Invariant:** This mandatory docstring ensures that any human engineer or AI agent immediately grasps the exact boundaries, non-responsibilities, and call flow of the file within 5 seconds without reading past line 5.

---

## APPROVED FRONTEND NPM PACKAGE REGISTRY (GAP-21 Fix)

The following are the ONLY approved npm packages for feature modules. AI agents MUST NOT introduce packages outside this list without explicit documented approval.

| Concern | Approved Package | Version Lock | FORBIDDEN Alternatives |
|---|---|---|---|
| Framework | `next` | 15.x | CRA, Remix, Vite standalone |
| UI State | `zustand` | 5.x | Redux, MobX, Jotai, Recoil |
| Server State | `@tanstack/react-query` | 5.x | SWR, Apollo Client |
| List Virtualization | `@tanstack/react-virtual` | 3.x | `react-window`, `react-virtualized` |
| HTTP Status Codes | `http-status-codes` | 2.x | Magic integer literals (e.g., 200, 404, 500) |
| Forms | `react-hook-form` | 7.x | Formik, Final Form |
| Form Validation | `zod` | 3.x | Yup, Joi |
| Form Resolver | `@hookform/resolvers` | 3.x | — |
| Icons | `lucide-react` | latest | heroicons, react-icons mixed use |
| Toast | `sonner` | latest | react-hot-toast, react-toastify |
| HTTP Client | Global `apiFetch` (wrapping `fetch`) | — | axios, ky (in feature modules) |
| Charts | `react-apexcharts` | 1.x | victory, nivo, chart.js, recharts |
| Date Utilities | `date-fns` | 3.x | moment, dayjs |
| Routing Progress | `nextjs-toploader` | latest | — |
| i18n | `next-intl` | latest | i18next, react-i18next |
| Theme | `next-themes` | latest | — |

### Approved Test & Tooling Infrastructure Registry (Scoped to `tests/`, `mocks/`, and `playwright_E2E/`)

The following packages are approved exclusively for testing, mock interception, and test runner execution. They MUST NOT be imported into runtime feature components, hooks, or stores:

| Concern | Approved Package | Version Lock | FORBIDDEN Alternatives |
|---|---|---|---|
| Mock Service Worker | `msw` | 2.x | miragejs, nock (for browser/RTL) |
| Unit / Component Test Runner | `vitest` | latest | jest (for new web features) |
| React Component Testing | `@testing-library/react` | latest | enzyme |
| DOM Assertions | `@testing-library/jest-dom` | latest | chai, custom DOM matchers |
| User Event Simulation | `@testing-library/user-event` | latest | fireEvent raw triggers |
| Browser E2E Testing | `@playwright/test` | latest | cypress, puppeteer, selenium |

**Rules:**
- Introducing a package NOT in this list requires: (a) adding it to this registry, (b) documenting the justification in the feature's `_features.md`, and (c) explicit human developer approval.
- Never use two packages from the "FORBIDDEN Alternatives" column for the same concern.
- Do NOT install and use two different HTTP clients; all feature API calls go through the global `apiFetch` at `@/lib/api`.

---

## CANONICAL `globals.css` STRUCTURE TEMPLATE (GAP-24 Fix)

Every project MUST have a `globals.css` (or equivalent canonical theme stylesheet) following this exact structure. AI agents MUST generate this file if it does not exist — it is the single source of truth for all CSS variables.

```css
/* globals.css — Smart Gym 360 Design System
 * SINGLE SOURCE OF TRUTH for all semantic theme tokens.
 * DO NOT hardcode any of these values in component files.
 * Structure: :root (light) → .dark (dark) → @theme inline (Tailwind mapping)
 * ─────────────────────────────────────────────────────────── */

@import "tailwindcss";

/* ── 1. LIGHT MODE (default) ──────────────────────────────── */
:root {
  /* Core Surface */
  --primary: #EAB308;
  --primary-hover: #CA8A04;
  --primary-subtle: #FEF9C3;
  --bg-page: #F4F4F5;
  --bg-card: #FFFFFF;
  --bg-sidebar: #FAFAFA;
  --bg-header: #FFFFFF;
  --bg-header-translucent: rgba(255, 255, 255, 0.8);
  --bg-input: #FFFFFF;
  --bg-floating: #FFFFFF;
  --bg-overlay: #FAFAFA;
  --bg-popover: #F4F4F5;
  --surface-hover: rgba(234, 179, 8, 0.08);
  --surface-highlight: rgba(234, 179, 8, 0.05);
  --surface-zebra: #FAFAFA;
  --overlay-backdrop: rgba(0, 0, 0, 0.6);
  --focus-ring: #A16207;
  --border: #E4E4E7;
  --border-focus: #A16207;
  /* Text */
  --text-primary: #000000;
  --text-secondary: #52525B;
  --text-disabled: #A1A1AA;
  --text-on-primary: #111111;
  --text-on-danger: #FFFFFF;
  --text-on-warning: #111111;
  --text-on-success: #FFFFFF;
  --text-on-info: #FFFFFF;
  /* Skeleton */
  --skeleton-base: #E4E4E7;
  --skeleton-highlight: #F4F4F5;
  /* Status */
  --success: #047857;
  --warning: #F59E0B;
  --danger: #B91C1C;
  --info: #1D4ED8;
  --success-text: #065F46;
  --success-bg: #D1FAE5;
  --warning-text: #92400E;
  --warning-bg: #FEF3C7;
  --danger-text: #991B1B;
  --danger-bg: #FEE2E2;
  --info-text: #1E40AF;
  --info-bg: #DBEAFE;
  --purple-text: #7E22CE;
  --purple-bg: #EDE9FE;
  /* Pay */
  --pay-cash-text: #0F766E;
  --pay-cash-bg: #CCFBF1;
  --pay-upi-text: #0E7490;
  --pay-upi-bg: #CFFAFE;
  --pay-card-text: #334155;
  --pay-card-bg: #F1F5F9;
  --pay-bank-text: #0369A1;
  --pay-bank-bg: #E0F2FE;
  /* Chart */
  --chart-primary: #EAB308;
  --chart-success: #16A34A;
  --chart-danger: #DC2626;
  --chart-warning: #F59E0B;
  --chart-info: #2563EB;
  --chart-secondary: #7C3AED;
  --chart-grid: rgba(0, 0, 0, 0.06);
  --chart-tooltip-bg: #FFFFFF;
  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-popover: 0 4px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-dialog: 0 20px 60px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.08);
  --shadow-toast: 0 8px 24px rgba(0,0,0,0.12);
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;
  /* Layout */
  --layout-header-height: 64px;
  --layout-sidebar-width: 240px;
  --layout-sidebar-width-collapsed: 60px;
  --layout-content-padding: 24px;
  --control-height: 40px;
  --touch-target-min: 44px;
  --table-row-height: 48px;
  --table-row-height-compact: 32px;
  --modal-width: 480px;
  --drawer-width: 480px;
}

/* ── 2. DARK MODE ──────────────────────────────────────────── */
.dark {
  --primary: #FACC15;
  --primary-hover: #EAB308;
  --primary-subtle: rgba(250, 204, 21, 0.15);
  --bg-page: #050505;
  --bg-card: #111111;
  --bg-sidebar: #050505;
  --bg-header: #111111;
  --bg-header-translucent: rgba(17, 17, 17, 0.8);
  --bg-input: #1A1A1A;
  --bg-floating: #1A1A1A;
  --bg-overlay: #242424;
  --bg-popover: #2E2E2E;
  --surface-hover: rgba(250, 204, 21, 0.08);
  --surface-highlight: rgba(250, 204, 21, 0.05);
  --surface-zebra: #141414;
  --focus-ring: #FACC15;
  --border: #27272A;
  --border-focus: #FACC15;
  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --text-disabled: #52525B;
  --text-on-primary: #111111;
  --skeleton-base: #111111;
  --skeleton-highlight: #1A1A1A;
  --success: #15803D;
  --success-text: #4ADE80;
  --success-bg: #064E3B;
  --warning-text: #FBBF24;
  --warning-bg: #451A03;
  --danger: #B91C1C;
  --danger-text: #F87171;
  --danger-bg: #450A0A;
  --info-text: #60A5FA;
  --info-bg: #172554;
  --purple-text: #D8B4FE;
  --purple-bg: #3B0764;
  --pay-cash-text: #5EEAD4;
  --pay-cash-bg: #134E4A;
  --pay-upi-text: #67E8F9;
  --pay-upi-bg: #164E63;
  --pay-card-text: #CBD5E1;
  --pay-card-bg: #1E293B;
  --pay-bank-text: #7DD3FC;
  --pay-bank-bg: #0C4A6E;
  --chart-primary: #FACC15;
  --chart-grid: rgba(255, 255, 255, 0.05);
  --chart-tooltip-bg: #111111;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.4);
  --shadow-popover: 0 4px 16px rgba(0,0,0,0.5);
  --shadow-dialog: 0 20px 60px rgba(0,0,0,0.6);
  --shadow-toast: 0 8px 24px rgba(0,0,0,0.5);
}

/* ── 3. TAILWIND TOKEN MAPPING (@theme inline) ─────────────── */
/* Maps all CSS variables to Tailwind utility class names      */
@theme inline {
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-subtle: var(--primary-subtle);
  --color-page: var(--bg-page);
  --color-card: var(--bg-card);
  --color-sidebar: var(--bg-sidebar);
  --color-header: var(--bg-header);
  --color-header-translucent: var(--bg-header-translucent);
  --color-input: var(--bg-input);
  --color-floating: var(--bg-floating);
  --color-overlay: var(--bg-overlay);
  --color-popover: var(--bg-popover);
  --color-surface-hover: var(--surface-hover);
  --color-surface-highlight: var(--surface-highlight);
  --color-surface-zebra: var(--surface-zebra);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-disabled: var(--text-disabled);
  --color-on-primary: var(--text-on-primary);
  --color-on-danger: var(--text-on-danger);
  --color-on-warning: var(--text-on-warning);
  --color-on-success: var(--text-on-success);
  --color-on-info: var(--text-on-info);
  --color-success: var(--success);
  --color-success-bg: var(--success-bg);
  --color-success-text: var(--success-text);
  --color-warning: var(--warning);
  --color-warning-bg: var(--warning-bg);
  --color-warning-text: var(--warning-text);
  --color-danger: var(--danger);
  --color-danger-bg: var(--danger-bg);
  --color-danger-text: var(--danger-text);
  --color-info: var(--info);
  --color-info-bg: var(--info-bg);
  --color-info-text: var(--info-text);
  --color-purple-text: var(--purple-text);
  --color-purple-bg: var(--purple-bg);
  --color-pay-cash-text: var(--pay-cash-text);
  --color-pay-cash-bg: var(--pay-cash-bg);
  --color-pay-upi-text: var(--pay-upi-text);
  --color-pay-upi-bg: var(--pay-upi-bg);
  --color-pay-card-text: var(--pay-card-text);
  --color-pay-card-bg: var(--pay-card-bg);
  --color-pay-bank-text: var(--pay-bank-text);
  --color-pay-bank-bg: var(--pay-bank-bg);
  --color-skeleton-base: var(--skeleton-base);
  --color-skeleton-highlight: var(--skeleton-highlight);
  --color-border: var(--border);
  --color-border-focus: var(--border-focus);
  --color-focus-ring: var(--focus-ring);
  --color-chart-primary: var(--chart-primary);
  --color-chart-success: var(--chart-success);
  --color-chart-danger: var(--chart-danger);
  --color-chart-warning: var(--chart-warning);
  --color-chart-info: var(--chart-info);
  --color-chart-secondary: var(--chart-secondary);
  --color-chart-grid: var(--chart-grid);
  --color-chart-tooltip-bg: var(--chart-tooltip-bg);
  --shadow-card: var(--shadow-card);
  --shadow-popover: var(--shadow-popover);
  --shadow-dialog: var(--shadow-dialog);
  --shadow-toast: var(--shadow-toast);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-full: var(--radius-full);
  --animate-duration-fast: 150ms;
  --animate-duration-base: 200ms;
  --animate-duration-slow: 300ms;
  --animate-duration-xslow: 500ms;
}

/* ── 4. REDUCED MOTION GLOBAL OVERRIDE ────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ── 5. PREMIUM SCROLLBAR ──────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background-color: var(--border); border-radius: var(--radius-full); }
::-webkit-scrollbar-thumb:hover { background-color: var(--text-disabled); }
```

> **AI AGENT NOTE (GAP-24):** When creating a new frontend project or a new role module, check for `globals.css` first. If it is missing or incomplete, regenerate it using this template before writing any component code. The Tailwind classes like `bg-card`, `text-primary`, etc. will NOT work without this mapping.

---

## FRONTEND DELIVERY FREEZE GATE (GAP-20 Fix)

> ⛔ **HARD STOP — ALL 14 SOURCE-LEVEL GATES BELOW MUST BE REPAIRED WITH PROOF.**
> **Failing or skipping ANY single source-level gate = REPAIR immediately.**
>
> ⛔ **DELIVERY MANDATE & ANTI-DECEPTION NAMING (NEVER WITHHOLD THE REPAIR ZIP):**
> When all fixable source-level code within the supplied module scope is complete, the AI **MUST ALWAYS PACKAGE AND DELIVER THE ZIP** using strict Anti-Deception naming:
> - Mode A First Creation: `frontend-{role}-v1.zip`
> - Mode B Intermediate Checkpoint: `frontend-{role}-v{N}-PARTIAL-rbg{X}.zip` (when any subsequent RBG is pending)
> - Mode B 100% Complete Delivery: `frontend-{role}-v{N}-ALL-RBGS-COMPLETE.zip` (ONLY when 100% of RBGs are closed and Pre-Delivery Cross-Check Gate is passed 100% clean).
> Host-dependent verification steps (`DEFERRED_TO_HOST_RUNTIME`), host infrastructure files (`OUTSIDE_SUPPLIED_SCOPE`), and external product decisions (`EXTERNAL_PRODUCT_DECISION_BLOCKED`) MUST be documented in `RE_AUDIT_CHECKLIST_RESULT.md` and `INTEGRATION_GUIDE.md`, but MUST NEVER trigger `BLOCKED_DELIVERY` or prevent packaging/delivering the repaired ZIP.

| Gate # | Gate Description | Verification Directive | Consequence of Failure |
|---|---|---|---|
| **Gate 1** | No Critical Findings Open | Verify zero broken user flows, wrong resource identity, or data integrity issues | **STOP.** Broken flow = REJECTED DELIVERY |
| **Gate 2** | No Major Architecture Violations | Verify state ownership, zero cross-module imports, strict naming rules | **STOP.** Sibling import = REJECTED DELIVERY |
| **Gate 3** | CSS Token Mapping Verified | `globals.css` / `@theme inline` mapping verified — all semantic tokens produce valid Tailwind classes | **STOP.** Broken styles in light/dark mode |
| **Gate 4** | Zero Hardcoded Colors | Grep JSX for hex `#`, `rgb(`, raw Tailwind colors (`bg-red-500`), or arbitrary CSS var brackets | **STOP.** Hardcoded color = REJECTED DELIVERY |
| **Gate 5** | Zero Forbidden Opacity Modifiers | Grep JSX for `bg-success/10`, `bg-danger/5`, etc. Only semantic background tokens permitted | **STOP.** Contrast/theme violation |
| **Gate 6** | Centralized URL Config Present | `config/[role]_[submodule].url_config.ts` present, exports `[ROLE]_[SUBMODULE]_ROUTES` and `[ROLE]_[SUBMODULE]_API` with real paths (zero placeholders) | **STOP.** Missing config = REJECTED DELIVERY |
| **Gate 7** | Feature Map Non-Generic | `[role]_[submodule]_features.md` complete with real endpoints, flows, component tree, and Module Run, Mock & Test Harness (no TBDs) | **STOP.** Generic doc = INCOMPLETE MODULE |
| **Gate 8** | TanStack Query v5 Compliance | Verify `isPending` used (no `isLoading`), no deprecated callbacks in `useQuery` | **STOP.** Broken server state / crash |
| **Gate 9** | React Hook Form v7 Compliance | Verify `zodResolver` used, schemas co-located, zero Yup/Joi resolvers | **STOP.** Broken form validation |
| **Gate 10** | Zero Barrel Files | Verify zero `index.ts`, `*Export.ts`, or re-export facades across entire module | **STOP.** Circular dependency risk |
| **Gate 11** | Scope Integrity Verified | Changed-file list produced — strictly target module files changed (or approved infrastructure) | **STOP.** Scope leak = REJECTED DELIVERY |
| **Gate 12** | Multi-Tenancy Enforced | Verify `gymId`/`branchId` extracted from auth/session context, never from client body | **STOP.** Cross-tenant data vulnerability |
| **Gate 13** | Complete Async States | Verify loading skeletons, empty states (`[Module]EmptyState.tsx`), and error states implemented | **STOP.** Blank screen on async fetch |
| **Gate 14** | Consolidated Integration Guide & Re-Audit Included | `INTEGRATION_GUIDE.md` (consolidating changelog, route preservation matrix, host integration, and verification commands), `RE_AUDIT_CHECKLIST_RESULT.md`, and local test harness + mirrored `playwright_E2E/` present | **STOP.** Missing deliverable = REJECTED DELIVERY |

> ⛔ **If ANY source-level code gate fails: STATUS = `REPAIR_REQUIRED`. Fix the source code. Once all source-level code fixes are written, package and deliver the ZIP with deferred/out-of-scope items explicitly documented.**


---

## DEFINITION OF DONE — Web Architecture Release Checklist

> ⛔ **HARD STOP — ALL ITEMS BELOW ARE MANDATORY INVARIANTS FOR PRODUCTION RELEASE.**
> **Every item MUST be verified against actual code with file and line evidence. Record `NON_COMPLIANT` for any failure.**

### 1. Architecture & Isolation Gate
- [ ] **AI Portability:** Autonomous sub-module folder alone provides complete context for understanding, mocking, testing, and repairing the feature. — *STOP if sibling business files are required.*
- [ ] **Zero Cross-Module Business Imports:** Zero imports from sibling feature modules or sibling sub-modules. (Verified by ESLint boundaries). — *STOP if `import ... from '../sibling'` found.*
- [ ] **No Role-Wide Business Buckets:** No generic `superadmin_components/`, `admin_hooks/`, etc., containing feature business logic. — *STOP if unowned bucket exists.*
- [ ] **Root Quarantine Compliant:** Pure Domain Container root (`{role}_{domain}/`) contains ONLY `layout.tsx` (tab bar), `page.tsx` (sub-module redirect), master domain doc trio, and child sub-module directories. Autonomous Sub-Module root (`{domain}_{capability}/`) contains ONLY routing entry files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`), `config/[role]_[submodule].url_config.ts`, `contracts/host-stubs.d.ts`, and the sub-module documentation trio (`_features.md`, `_forbidden.md`, `_theme_contract.md`). All other business source lives inside canonical category subfolders (`components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `constants/`, `locales/`, `mocks/`, `tests/`) with `[Role][Submodule][Name]` prefixing where applicable. Zero other loose business files at root. — *STOP if any unapproved code file is at root.*
- [ ] **Feature Map Freshness:** `[role]_[submodule]_features.md` contains all 22 canonical sections, real endpoints, data requirements table, component tree, permissions, and Section 20 Standalone Harness without placeholder text. — *STOP if generic or outdated.*
- [ ] **Forbidden Patterns Enforced:** `[role]_[submodule]_forbidden.md` present and specific to this sub-module. — *STOP if missing.*
- [ ] **Theme Contract Verified:** `[role]_[submodule]_theme_contract.md` lists all consumed design tokens. — *STOP if missing.*
- [ ] **URL Centralization Verified:** `config/[role]_[submodule].url_config.ts` present and consumed by all API and navigation call sites. — *STOP if raw URL in JSX/hooks.*

### 2. State & Data Contract Gate
- [ ] **Server State via TanStack Query v5:** Uses `isPending`, namespaced query keys (Rule 8), no deprecated v4 APIs. — *STOP if `isLoading` on mutation.*
- [ ] **Client UI State via Module Zustand Store:** Module-scoped Zustand store for shared client UI state; zero API response data stored in Zustand as primary source. — *STOP if cache duplicated in store.*
- [ ] **Optimistic Mutation Reconciliation:** All mutations invalidate queries or reconcile Query cache with authoritative `res.data`. — *STOP if optimistic data retained permanently.*
- [ ] **MSW Fixture Completeness (Rule 75D):** MSW fixtures and handlers cover every UI field, table column, KPI, chart series, and filter. — *STOP if minimal mock causes empty table columns.*
- [ ] **En-Dash Nullable Display (Rule 78):** All nullable/optional fields rendered via `displayValue()`. Zero blank table cells. — *STOP if raw null renders blank.*

### 3. Security & Safety Gate
- [ ] **Server-Side Authorization Invariant (Rule 25):** Frontend permission checks control UI visibility only. Every protected operation verified to enforce server-side auth. — *STOP if security relies on button hiding.*
- [ ] **Zero Secret Leaks (Rule 34):** No tokens, passwords, database credentials, or secret keys in `NEXT_PUBLIC_*` or client code. — *STOP if secret committed.*
- [ ] **PII & Financial Masking (Rule 43):** Phone numbers, national IDs, and account numbers masked in list views via `maskSensitiveData()`. Excluded from error telemetry and analytics. — *STOP if raw PII in list.*
- [ ] **Destructive Action Double Verification (Rule 71):** Delete, terminate, suspend, or financial triggers require confirmation modal (`useConfirm`). Single-click execution forbidden. — *STOP if single-click delete exists.*
- [ ] **Source Maps Disabled in Production (Rule 74 Gate 4):** `productionBrowserSourceMaps: false` configured. — *STOP if source maps public.*
- [ ] **Unsaved Changes Guard (Rule 79):** `useUnsavedChangesGuard` active on all complex forms and multi-step wizards. Intercepts both `beforeunload` and router navigation. — *STOP if route change loses form data.*

### 4. Error Handling & Feedback Gate
- [ ] **Layered Error Policy (Rule 14):** Backend domain errors display `res.message`. Network/timeout failures use localized fallback strings. — *STOP if raw JS stack trace shown.*
- [ ] **No `dangerouslySetInnerHTML` on Error Content:** Raw HTML injection on backend error strings strictly forbidden. — *STOP if XSS vector exists.*
- [ ] **Section Error Boundaries (Rule 9):** Error boundary wraps every independently fetched UI section. Section failure does not crash the page. — *STOP if unhandled section crash.*
- [ ] **Toast Deduplication (Rule 82):** Stable `toastId` passed to all emitted toasts. Identical error notifications do not stack. — *STOP if duplicate toasts flood screen.*

### 5. Testing & Verification Gate
- [ ] **Interaction Testing (Behavioral Proof):** Unit/component tests verify real user actions (click -> submit -> visible state update). Button existence checks alone are REJECTED. — *STOP if tests are superficial.*
- [ ] **Coverage Standards:** Custom hooks tested at ≥80% branch coverage; utilities tested at ≥90% branch coverage. — *STOP if coverage below threshold.*
- [ ] **Isolated Playwright E2E:** Critical flows covered in mirrored `playwright_E2E/frontend_{role}_e2e/{role}_{module}/` directory (classified as `DEFERRED_TO_HOST_RUNTIME` during standalone/browser-less AI ZIP evaluation; sub-module `tests/` and `tests/harness/` provide 100% self-sufficient offline verification). — *STOP if E2E missing for critical CRUD.*
- [ ] **Zero Fake Test Assertions:** Zero `expect(true).toBe(true)` or tautological assertions. — *STOP if fake test found.*

### 6. Performance & UX Gate
- [ ] **Bundle Budget:** Route JS bundle < 200 KB gzipped. Heavy components code-split via `next/dynamic`. — *STOP if bundle exceeds budget.*
- [ ] **Button Loading Stability (Rule 81):** Buttons maintain exact width during loading states. No layout shift on spinner activation. — *STOP if button shrinks on submit.*
- [ ] **Image Optimization (Rule 33):** All images use `next/image` with explicit dimensions. Zero unapproved `<img>` tags. — *STOP if raw img used.*
- [ ] **Search & Filter Debounce:** Search inputs debounced ≥300ms before triggering API/query calls. — *STOP if API flooded on every keystroke.*

### 7. Localization Gate
- [ ] **Zero Hardcoded Strings in JSX (Rule 18):** All user-facing text uses `t('KEY')` via `next-intl`. — *STOP if hardcoded English string in JSX.*
- [ ] **Module-Co-located Locales:** `locales/[role]_[submodule]_en.json` and all active language files generated inside autonomous sub-module `locales/` folder. — *STOP if centralized messages folder used.*
- [ ] **Locale-Aware Currency & Numbers (Rule 80):** Currency formatted via module-local `[module]FormatCurrency()`. Minor units correctly divided by subunit divisor. — *STOP if raw minor units rendered.*
- [ ] **Container Translation Expansion:** UI containers accommodate translated text up to 2× English length without truncation or overflow. — *STOP if layout breaks on long text.*

### 8. Observability & CI Gate
- [ ] **Centralized Logger (Rule 44):** Zero `console.log` in committed code. All diagnostics use `src/lib/logger.ts`. — *STOP if console.log committed.*
- [ ] **Tooling Gates Active (Rule 61):** ESLint boundaries, `@typescript-eslint/no-explicit-any`, Prettier, and `tsc --noEmit` passing. — *STOP if lint or type check fails.*
- [ ] **Case Sensitivity Verified (Rule 84):** All file names and import paths verified for exact case matching (Linux/CI safety). — *STOP if case mismatch exists.*
