# Enterprise-Grade, AI-Friendly Backend Architecture Guidelines

> ⛔⛔⛔ **AI AGENT — MANDATORY ENFORCEMENT HEADER — READ BEFORE ANYTHING ELSE** ⛔⛔⛔
>
> **VIOLATION OF ANY RULE IN THIS DOCUMENT = ARCHITECTURE NON-COMPLIANCE.**
> The violation MUST be explicitly recorded and handled according to the Failure Handling Protocol: audit it in Audit Mode, repair it within the approved writable scope in Repair Mode, or mark it BLOCKED_BY_SUPPLIED_SCOPE / AUTHORITATIVE_CONFLICT where applicable.
>
## Failure Handling Protocol

A rule violation is never silently ignored.

### Audit Mode
- Record the violation as `NON_COMPLIANT`.
- Provide rule ID, exact evidence, affected file/path, impact, and remediation.
- Continue auditing unrelated rules where evidence is available.
- Do not mark the affected item as compliant.

### Repair Mode
- Repair violations that are inside the supplied writable scope.
- Repair structural violations before business-logic violations.
- Do not halt solely because a repair is required.
- If the fix requires files outside the supplied writable scope, record `BLOCKED_BY_SUPPLIED_SCOPE` and provide the exact owner action required.

### Hard Stop Conditions
The AI must stop only when:
1. A security-sensitive action is ambiguous and could cause data exposure, tenant leakage, financial loss, or irreversible deletion.
2. A required owner decision is missing due to an authoritative conflict.
3. The requested implementation requires an unapproved dependency.
4. The task requires production secrets, credentials, or live infrastructure access.

Previously verified and unaffected work remains valid and MUST NOT be discarded.
The AI MUST NOT silently continue after detecting a violation.
>
> This document is the **absolute normative authority for all backend architectural, API contract, and code repair behavior**.
>
> ⛔ **ARCHITECTURAL & CODE COMPLETENESS MANDATE (MUST REPAIR & COMPLETE):**
> When backend source code has incomplete DTO validation, missing class-validators, missing multi-tenancy query filters (`gymId`), raw unhandled error throws, missing idempotency checks, missing database migrations, or missing test suites:
> - The AI **MUST ACTIVELY REPAIR, IMPLEMENT, AND COMPLETE THEM** using the Backend Architecture Rules (`BACKEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`).
> - Raw errors (`throw new Error`) MUST be replaced with standardized `ApiResponse<T>` error envelopes.
> - DTOs MUST be fully decorated with `class-validator` rules.
> - Database repositories MUST be completed with dual-layer multi-tenancy predicates.
>
> ⛔ **ANTI-DESTRUCTION & PARTIAL FEATURE COMPLETION LAW (ZERO FEATURE EVICTION):**
> When backend source code contains partially implemented, half-built, or incomplete features (e.g., an unfinished controller endpoint, an uncompleted service method, a half-authored repository query, or an incomplete transaction block):
> - **ZERO FEATURE EVICTION (DO NOT DELETE):** The AI **MUST NOT** delete, remove, comment out, or strip away existing endpoints, service methods, entities, or business flows simply because they are half-built, incomplete, or currently failing tests/build. Deleting half-built backend features to get a "clean audit pass" is strictly prohibited as DESTRUCTIVE MALPRACTICE.
> - **MANDATORY ADDITIVE COMPLETION (ADD & CORRECT):** The AI **MUST actively COMPLETE the missing half**: add missing DTOs, implement missing service business logic, write database repository queries, author unit/integration tests, and correct all architectural violations until the feature is 100% functional and architecture-compliant.
>
> ⛔ **STRICT BOUNDARY OF `CONTRACT_MISSING` (EXTERNAL UNKNOWN SPECS ONLY):**
> `CONTRACT_MISSING` applies STRICTLY to **external business contracts that cannot be known from the code or architecture** (e.g., an unprovided external 3rd-party webhook secret, unprovided payment gateway API keys, or an unknown financial commission percentage).
> `CONTRACT_MISSING` **MUST NEVER BE USED AS AN EXCUSE** to leave source code incomplete, skip DTO validations, leave raw exceptions unhandled, or fail to build proper services/repositories!
>
> ⛔ **DETERMINISTIC CONFIDENCE TAXONOMY & EVIDENCE STANDARD:**
> Every implementation decision, contract assertion, and audit claim MUST be classified into one of:
> - `VERIFIED`: Proven by supplied source file path, exact line reference, verified API contract, schema, or explicit architecture rule.
> - `DERIVED`: Deterministically derived from verified types/interfaces or architecture-mandated patterns (e.g. deriving a DTO validation pipe from a raw payload).
> - `CONTRACT_MISSING`: External third-party behavior or requirement not provided in supplied scope. The AI MUST NOT infer or guess external third-party behaviors.
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
> **RULES APPLY TO THE ENTIRE DOCUMENT.** An AI that reads only the first half of this document and produces output is producing INCOMPLETE and INVALID output. Every rule from Rule 0A through Rule 124 is mandatory, including all lettered rules, the Structure Gate, the Minimum Evidence Standard, and mobile-first rules. The MINIMUM EVIDENCE STANDARD (near end of document) applies to every audit finding.
>
> ⛔ **BEFORE WRITING ANY CODE OR AUDIT FINDING, CONFIRM:**
> ```
> [ ] Read complete BACKEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md (all rules, including Mobile-First Rules 120–124)
> [ ] Identified active framework (NestJS or Django) — marked FRAMEWORK_NOT_VERIFIED if unknown
> [ ] Confirmed PROJECT STACK BASELINE — no unapproved substitutions
> [ ] CRITICAL STRUCTURE GATE passed — folder tree verified before any deeper rule
> [ ] CANONICAL RULE INDEX consulted
> [ ] MINIMUM EVIDENCE STANDARD (bottom of document) loaded into context
> ```
> **Failure to complete the above = the affected item MUST NOT be marked COMPLIANT.**
> The AI must record the missing evidence and continue only where safe and within scope.
>
> ⛔⛔⛔ **EXECUTIVE CANONICAL DIAMOND PROTOCOLS (BACKEND ARCHITECTURE)** ⛔⛔⛔
> The following diamond protocols are active from TURN 1 across ALL execution modes:
> 1. **Anti-Deception ZIP Naming:** Intermediate archives MUST be labeled `backend-{role}-v{N}-PARTIAL-rbg{X}.zip`. The label `backend-{role}-v{N}-ALL-RBGS-COMPLETE.zip` is strictly forbidden unless 100% of RBGs (RBG 1..N) are closed and verified.
> 2. **Pre-Delivery Cross-Check Gate (Zero-Excuse Law):** Must execute and output the 3 physical verification tables (RBG Closure Ledger, Autonomous Submodule Physical Ledger, Canonical Rules Sweep) before packaging. Post-delivery excuses ("Oh sorry, cross-check nahi kiya") are strictly banned as P0 audit fraud.
> 3. **1-Click Interactive Button Priority:** Publish RBG Plans and Checkpoints as actionable artifacts (`RequestFeedback: true`) or modals (`ask_question`) so user can approve via 1-click button instead of manual typing across all checkpoints (Stage 1 Freeze, RBG Plan, and RBG sprints).
> 4. **Interactive Clarification Modal with (Recommended) Default:** All questions/decisions MUST use structured modals/checkboxes with Option 1 marked `(Recommended)`. Zero open-ended technical essay questions.
> 5. **Live Progress Heartbeat Telemetry:** Output concise, non-blocking progress lines (`✓ [Done]: ... ⚙️ [In Progress]: ...`). Use Roman Hinglish when conversational context benefits from it; keep statuses, evidence labels, code identifiers, file paths, and syntax in English so downstream tools can parse them reliably.
> 6. **Substantive Workload Density:** Calibrate RBGs by workload floor (min 8 findings / 4 files) and safety ceiling (max 25 findings / 18 files) for a balanced ~5–8 min sprint without token blowouts or hallucinations.

## The Core Philosophy
This document outlines the strict architectural rules for building the backend using the approved project framework, primarily **NestJS (TypeScript)** or **Django (Python)**, while preserving the same isolation and architectural principles. The primary goal is **Extreme Isolation**.

Currently, human developers act as orchestrators, while AI (LLMs) writes the code. Because of this, the architecture must be designed to accommodate the AI's constraints (context limits, hallucination risks) and strengths (laser-focused problem solving).

Tomorrow, if you ask an AI to fix a specific bug in "Payment Processing", the primary AI context MUST be restricted to the owning feature module. The preferred code repair is a single file, but multi-file repairs within the feature's dependency graph are allowed when genuinely required. The default writable scope is the owning feature module only.

**Minimum-Context Principle:** Prefer the smallest coherent change set. Single-file repair is the goal when the dependency graph permits it. Multi-file changes are **allowed — and expected** when required by architectural contracts such as transactions (Orchestrator → services → repositories), API contract updates, co-located tests, or shared infrastructure extensions. The AI MUST NOT expand context beyond the minimum required set. If a bug fix genuinely requires touching an Orchestrator, an internal sub-service, and a repository together, that is correct — not a sign of bad architecture. If it requires touching 10 unrelated files, the architecture is too coupled.

## Master Cross-Document Precedence Order

When instructions conflict across documents or layers, apply this exact order of authority:

1. Security, privacy, authorization, tenant isolation, legal/compliance, and data-integrity requirements
2. Database constraint, migration backward compatibility, and transactional integrity rules
3. Explicit user-approved scope and verified API / domain contracts
4. `BACKEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`
5. `BACKEND_ROLE_MODULE_CREATE_AUDIT_REPAIR_FROM_FRONTEND_V6_4.md` for audit sequencing, RBG planning, and repair execution
6. Frontend API client/network behavior and verified contract fixtures
7. Feature-local documentation (`_features.md`, `_forbidden.md`)
8. Existing repository implementation conventions

A lower-priority rule MUST NOT override a higher-priority rule.
Classify unresolved evidence consistently: use `SOURCE_CONFLICT` for conflicting supplied rules, `CONTRACT_CONFLICT` for a supplied product/API contract that conflicts with an applicable rule, `BLOCKED_BY_SUPPLIED_SCOPE` when required evidence is outside the supplied scope, and `NOT_VERIFIED` when available evidence is insufficient. Reserve `BLOCKED_BY_SUPPLIED_CONTRACT` for a verified contract that makes safe execution impossible. Never resolve a conflict through invention.

---

## CRITICAL STRUCTURE GATE (NON-NEGOTIABLE)

> ⛔ **STRUCTURE INVARIANT & REPAIR PROTOCOL:**
> - **In Audit Mode:** Failing ANY item = ARCHITECTURE FAILURE. Record `NON_COMPLIANT` with file and line evidence.
> - **In Repair Mode:** Structural violations (folder layout, missing core wrappers, misplaced feature modules, unprefixed sub-folders) **MUST BE ACTIVELY REPAIRED FIRST (in RBG 1)** before repairing inner feature code.
> - **ANTI-STALL DIRECTIVE:** Structural non-compliance is the reason repair is required — it is **STRICTLY FORBIDDEN** to use structural violations as an excuse to halt, stall, refuse to repair, or declare code repair impossible.
> - **ISOLATED MODULE INPUT SCOPE:** When auditing an isolated backend role/feature module (e.g., `superadmin.zip` or `trainer_attendance/`), host-level infrastructure or sibling modules are host responsibilities; their absence outside the supplied module tree MUST NOT be used to halt execution.

Before generating, auditing, or repairing ANY backend role module, verify ALL of the following within the supplied scope:

```text
[ ] backend-{role}/ exists (or is created/normalized in RBG 1)
[ ] {role}-core/ exists inside backend-{role}/ (or host-provided when feature slice is audited)
[ ] {role}-modules/ exists inside backend-{role}/ (or feature module directory normalized in RBG 1)
[ ] ALL business feature domain modules exist ONLY inside {role}-modules/
[ ] Domain Module Quarantine: Domain module root contains ONLY [role]-[module].module.ts (aggregator module), master documentation, and child autonomous sub-modules {sub-module}/. Zero business implementation code in domain root.
[ ] Sub-Module Autonomous Structure: 100% of controllers, services, repositories, DTOs, entities, and tests live inside autonomous sub-modules {sub-module}/
[ ] Sub-Module Folder Pattern: Every business artifact sub-folder inside a sub-module follows the {submodule}-{artifact}/ pattern (e.g. dashboard-controllers/, dashboard-services/). The mandatory portability folder `contracts/` and its documented test/locale subfolder exceptions are explicitly allowed and do not count as child sub-modules.
[ ] Sub-Module Documentation Trio: Every autonomous sub-module contains [role]-[submodule]-backend-feature.md (with structured YAML frontmatter, all 22 canonical sections, Section 20 Standalone Harness, Section 21 Portability Guide), [role]-[submodule]-backend-forbidden.md, and [role]-[submodule]-backend-contract.md
[ ] Universal API Response Envelope: Standardized discriminated union ApiResponse<T> = ApiSuccess<T> | ApiFailure with requestId, success, data, error, errorCode, statusCode
[ ] Mandatory Ambient Host Stubs & Manifest: Sub-module contains contracts/core-contracts.stub.ts (stubbing core types, tenant context, event publisher, logger) and required-core-contracts.json (declaring external dependency budget <= 7)
[ ] Standard Mock Scenario Catalog: Sub-module test harness/mocks implement the 8 standard scenarios (ACTIVE, EMPTY, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, VALIDATION_ERROR, SERVER_500, TIMEOUT)
[ ] Dual-Layer Multi-Tenancy Invariant: Database-per-tenant connection routing + mandatory gymId/branchId query predicate in every repository query
[ ] Production Safety Guards: Idempotency-Key: UUIDv4 header on state mutations (accepts Idempotency-Key or X-Idempotency-Key), distributed locking for concurrent resources, rate-limiting, and zero raw secrets
[ ] EXECUTIVE DIAMOND PROTOCOLS CONFIRMED (Anti-Deception ZIP Naming, 3-Table Cross-Check Gate, 1-Click Buttons, Clarification Modals, Roman Hinglish Telemetry, Workload Density)
[ ] COMMUNICATION FORMAT CONFIRMED: Structured artifacts, statuses, evidence, and code identifiers use English; conversational telemetry may use concise Roman Hinglish when useful (NO Devanagari).
```

**✅ COMPLIANT structure (Universal Day-1 Sub-Module Hierarchy):**

```text
backend-manager/
├── manager-core/
└── manager-modules/
    └── manager-attendance/
        ├── manager-attendance.module.ts              # Pure Aggregator NestJS Module
        ├── manager-attendance-backend-feature.md     # Master Domain Architecture Map
        ├── manager-attendance-backend-forbidden.md   # Master Domain Boundary Directives
        ├── manager-attendance-backend-contract.md   # Master Domain Contract
        │
        ├── attendance-dashboard/                     # Autonomous Sub-Module 1 (AI Repair & ZIP Unit)
        │   ├── dashboard-controllers/                # {submodule}-controllers/
        │   ├── dashboard-services/                   # {submodule}-services/
        │   ├── dashboard-dto/                        # {submodule}-dto/ (Strict WET)
        │   ├── dashboard-repositories/               # {submodule}-repositories/ (contains ORM entities)
        │   ├── dashboard-mappers/                    # {submodule}-mappers/ (Rule 89 toDomain/toEntity)
        │   ├── dashboard-domain/                     # {submodule}-domain/ (Pure domain models)
        │   ├── dashboard-tests/                      # {submodule}-tests/ (unit & integration)
        │   │   ├── harness/                          # Standalone seeder & test harness
        │   │   └── fixtures/                         # Mock scenario catalog (ACTIVE, EMPTY, etc.)
        │   ├── contracts/                            # contracts/
        │   │   └── core-contracts.stub.ts            # Ambient host stubs for standalone compilation
        │   ├── required-core-contracts.json          # Machine-readable dependency manifest (<= 7)
        │   ├── attendance-dashboard.module.ts        # Sub-Module NestJS definition
        │   ├── attendance-dashboard-backend-feature.md
        │   ├── attendance-dashboard-backend-forbidden.md
        │   └── attendance-dashboard-backend-contract.md
        │
        └── attendance-history/                       # Autonomous Sub-Module 2 (AI Repair & ZIP Unit)
            └── ... (identical canonical micro-structure)
```

**❌ NON-COMPLIANT structure (ARCHITECTURE FAILURE — STOP IMMEDIATELY):**

```text
backend-manager/
├── manager-core/
├── manager-attendance/  ← WRONG: must be inside manager-modules/ — RECORD NON_COMPLIANT
│   ├── loose-service.ts ← WRONG: zero root business code permitted in domain module root!
│   └── common/          ← WRONG: parent shared folders strictly forbidden under WET!
```

> **Failing ANY item above in Audit Mode = ARCHITECTURE FAILURE. Record `NON_COMPLIANT` with file and line evidence.**
> **In Repair Mode, structural violations (folder layout, missing core wrappers, misplaced feature modules, unprefixed sub-folders) MUST BE ACTIVELY REPAIRED FIRST (in RBG 1) before repairing inner feature code.**
> AI agents MUST verify this gate BEFORE evaluating any deeper architecture rule.
> This check takes priority over all other structural evaluations.

---

## CANONICAL RULE INDEX

Every AI agent MUST consult this index before beginning any audit or implementation. Every rule listed here is MANDATORY unless marked as conditional with explicit applicability criteria.

| Rule ID | Rule Name | Category | Applies To | Mandatory Evidence |
|---|---|---|---|---|
| 0A | Hierarchical Module Boundary | Structure | All backend modules | Folder tree, import graph, module registration |
| 0B | Hard Feature Write Boundary | Structure | All backend repairs | Affected file list, sibling-module non-touch confirmation |
| 0C | Change Scope Failure Condition | Structure | All backend repairs | Sibling module change audit |
| 0D | Backend Namespace Prefixing | Naming | Backend role/domain folders | Folder paths and package/module names |
| 0E | Modular Monolith (not Microservice) | Structure | Isolated feature modules | No `.forRoot()` / global DB init in feature |
| 0F | Anti-Double-Prefixing | Naming | Backend feature sub-folders | Folder tree and imports |
| 0G | Multi-Tenancy Contract | Security | All data endpoints | JWT extraction, tenant filter in every query, response DTO |
| 0G-A | Approved NPM Package Registry | Dependencies | All NestJS modules | Package.json, no unapproved packages |
| 0G-B | Seed File Specification | Database | All seed files | Seed file naming, idempotency, transaction |
| 0G-C | Redis Responsibility Decision Table | Infrastructure | All Redis usage | Redis mechanism matches scenario table |
| 0G-D | Strict Sub-Folder Placement | Naming | All feature modules | No implementation files in module root |
| 0H | Canonical Naming Single Source of Truth | Naming | All files and folders | Naming matches Rule 0H table |
| 2 | Descriptive AI-Contextual Filenames | Naming | All backend files | Files begin with role+module prefix |
| 82A | Complete UI Data Contract | API Contract | UI-backed endpoints | Response DTO, serializer, frontend contract test |
| 116 | OpenAPI Documentation and MCP-Ready API Design | API Documentation | REST endpoints | Controller annotations / spec output |
| 117 | Universal RAG-Ready Projections | Query/API | All GET query endpoints | `?format=rag` returns token-optimized text |

> ⛔ **AI MANDATORY NOTE — THIS IS NOT OPTIONAL:**
> **Every rule in this document is mandatory** — whether or not it appears in the index above.
> This index is a navigation aid only. Unlisted rules are NOT lower priority — they have equal authority.
>
> ## Canonical Rule Reference Policy
> Audit and repair workflows MUST reference rules by their official canonical names and section titles rather than fragile numerical spans alone. Audits evaluate against all currently numbered and lettered rules in `BACKEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`, including the Structure Gate, Multi-Tenancy Contract, Mobile-First Rules (Rules 120–124), and Minimum Evidence Standard.
> **Stopping early or "not having time" to read the full document = incomplete output = task failure.**

---



## CANONICAL LAW: WET vs DRY GOVERNANCE BOUNDARY

> ⛔ **ARCHITECTURAL GOVERNANCE INVARIANT — READ CAREFULLY:**
> This codebase enforces a strict, mathematically defined boundary between **WET** (Write Everything Twice / Deliberate Isolation) and **DRY** (Don't Repeat Yourself / Reusable Platform Foundation).
> - **WET applies STRICTLY to Business Logic & Feature Sub-Modules.**
> - **DRY applies STRICTLY to Core Platform Infrastructure.**
> Attempting to share business DTOs or feature logic across sub-modules creates cascading coupling that destroys autonomous AI repairability. Conversely, duplicating core security, tenant resolution, or response envelopes creates dangerous divergence.

### The Canonical WET vs DRY Governance Matrix

| Architectural Layer | Paradigm | Governance Rule & Scope | What Must Be Done | What Is Strictly Forbidden |
|---|---|---|---|---|
| **Business Feature DTOs** | **STRICT WET** | Sub-Module Local | Each `{submodule}-dto/` defines independent input/output DTOs with local class-validator rules | NEVER import or share DTOs with sibling sub-modules or parent domains |
| **Business Services & Repositories** | **STRICT WET** | Sub-Module Local | Every sub-module owns its private query logic, domain rules, and entity mappers | NEVER inject sibling services or query sibling repositories directly |
| **Feature Tests & Mock Scenarios** | **STRICT WET** | Sub-Module Local | Each `{submodule}-tests/` owns its local seeder, harness, and 8-state mock catalog (`fixtures/`) | NEVER depend on sibling test fixtures or shared business mock helpers |
| **API Envelope & Serialization** | **STRICT DRY** | Platform Core (`src/core/`) | Universal `ApiResponse<T> = ApiSuccess<T> \| ApiFailure` discriminated union with `requestId` | Sub-modules MUST NOT define custom JSON wrapper envelopes |
| **Tenant Context & Dynamic Routing** | **STRICT DRY** | Platform Core (`src/core/`) | Centralized JWT auth guard, AsyncLocalStorage `TenantContext`, and DataSource pool router | Sub-modules MUST NOT implement custom tenant resolution or bypass `TenantContext` |
| **Database Pool Budget & Driver Config** | **STRICT DRY** | Platform Core (`src/core/`) | Centralized connection pool limits, timeouts, and statement timeouts (Rule 63) | Sub-modules MUST NOT open raw database connections or override pool limits |
| **Structured Logging & Tracing** | **STRICT DRY** | Platform Core (`src/core/`) | Global `nestjs-pino` / structured logger injecting correlation ID, span ID, and tenant scope | Sub-modules MUST NOT introduce ad-hoc loggers or raw `console.log` |
| **Event Bus & Outbox Infrastructure** | **STRICT DRY** | Platform Core (`src/core/`) | Shared transactional outbox publisher and message broker transport (Redis Streams) | Sub-modules emit typed events to the core bus; never communicate via HTTP with siblings |

### AI Portability Resolution (How WET Sub-Modules Consume DRY Core)
When a sub-module (e.g. `attendance-history/`) is zipped in isolation for autonomous AI repair:
1. It contains a lightweight **Ambient Core Stub** (`contracts/core-contracts.stub.ts`) stubbing the core platform interfaces (`TenantContext`, `ApiResponse`, `EventPublisher`, `Logger`).
2. It contains a **Machine-Readable Dependency Manifest** (`required-core-contracts.json`) declaring its consumed platform contracts (budget ≤ 7).
3. The AI can compile, run unit tests, and verify repairs 100% offline without needing the entire monolith source tree.

---

## PROJECT STACK BASELINE — NORMATIVE PROJECT DECISION

This project uses a fixed production stack. AI agents MUST NOT invent, substitute, or introduce alternative infrastructure when implementing or repairing backend code.

### NestJS / TypeScript

- Framework: NestJS
- Language: TypeScript
- ORM: TypeORM
- Database: PostgreSQL
- Cache / distributed state: Redis
- Background job queue: BullMQ backed by Redis
- Durable domain-event transport: Redis Streams
- Real-time horizontal fan-out: Redis Pub/Sub
- Authentication: JWT
- Migration tool: TypeORM migrations
- TypeScript path alias: `@/` → `src/`
- API documentation: OpenAPI / Swagger
- Unit testing: Jest
- API E2E testing: Python pytest
- UI E2E testing: Python Selenium

### Django / Python

When the backend framework is Django:

- Framework: Django
- Language: Python
- ORM: Django ORM
- Database: PostgreSQL
- Cache / distributed state: Redis
- Background task queue: Celery backed by Redis
- Durable domain-event transport: Redis Streams
- Real-time horizontal fan-out: Redis Pub/Sub
- Authentication: JWT
- Migration tool: Django migrations
- API documentation: the Django framework mapping defined by this document

### Fixed Infrastructure Policy

The following are NOT approved alternatives for this project:

- Prisma
- MySQL
- Memcached
- RabbitMQ
- Kafka
- a second ORM
- a second primary cache/message-broker system

Redis responsibilities MUST remain separated:

- Redis cache → caching
- BullMQ + Redis → NestJS background jobs
- Celery + Redis → Django background jobs
- Redis Streams → durable domain events
- Redis Pub/Sub → real-time horizontal fan-out
- Redis distributed locks → distributed locking where explicitly required

Redis Pub/Sub MUST NOT be treated as a durable replacement for Redis Streams.

When a supplied repository uses a conflicting technology, record:

`STACK_CONFLICT`

Do not silently accept or introduce a competing stack.

### 0A. HIERARCHICAL MODULE BOUNDARY — FEATURE MODULE IS THE AI REPAIR UNIT

The backend strictly follows a 4-tier hierarchy (Universal Day-1 Sub-Module Architecture):

```text
APPLICATION
  └── ROLE CONTAINER (e.g., backend-manager/)
        └── FEATURE DOMAIN MODULE (e.g., manager-modules/manager-attendance/)
              └── AUTONOMOUS SUB-MODULE / USE CASE (e.g., attendance-dashboard/, attendance-history/)
```

**AI Repair Boundary = AUTONOMOUS SUB-MODULE (Default Granular AI Repair Unit) or FEATURE DOMAIN (Complete Domain Slice)**
**Role/Domain Container = NOT the default repair boundary**

### 0A.1 1-TO-1 FRONTEND FEATURE ISOMORPHISM & AI REPAIR HAND-OFF (MANDATORY)

> ⛔ **UNIVERSAL APPLICABILITY ACROSS ALL ROLES: This law applies globally, equally, and strictly to EVERY backend role container (`backend-admin`, `backend-manager`, `backend-superadmin`, `backend-trainer`, and any future role). Any specific module names (such as `manager-attendance`, `admin-billing`, or `superadmin-plans`) referenced below are non-exhaustive concrete illustrations.**

To prevent architectural drift and eliminate monolithic backend sprawl, the backend mandates strict 1-to-1 isomorphism with frontend feature modules:
1. **1-to-1 Feature Mapping Law (Universal):** Every primary feature module exposed on the frontend across ANY role (e.g., in Manager: Attendance, Finance, HR, Members, Plans; in Admin: Gyms, Billing, Staff; in Superadmin: Tenants, Subscriptions, Platform Analytics; in Trainer: Schedule, Clients) MUST map 1-to-1 to a dedicated autonomous backend feature module under the corresponding role container (e.g., `src/backend-{role}/{role}-modules/{role}-{feature}/`).
   - Merging separate frontend feature endpoints into a monolithic mega-module (e.g., combining `manager-finance` and `manager-expenses`, or `admin-billing` and `admin-plans`) is STRICTLY PROHIBITED.
   - Scattering endpoints for a single feature across arbitrary role controllers is STRICTLY PROHIBITED.
2. **Complete Domain Self-Containment:** 100% of the controllers, services, repositories, entities, DTOs, events, migrations, unit tests, and OpenAPI schemas for that feature MUST live INSIDE that feature module folder (`{role}-{feature}/`). Sibling feature modules MUST NEVER import business logic, services, or internal repositories directly from each other (Zero Cross-Feature Business Coupling).
3. **Autonomous AI Repair Hand-off:** When an API defect, data calculation bug, or validation issue occurs in ANY feature (e.g. Attendance, Billing, or Schedule):
   - The developer provides **ONLY** that feature module folder (`src/backend-{role}/{role}-modules/{role}-{feature}/`) to the AI agent.
   - The AI agent will audit, repair, test, and deliver that module in complete isolation without requiring or modifying sibling modules or host application slices (`app.module.ts`, `main.ts`).

### 0A.2 UNIVERSAL DAY-1 SUB-MODULE ARCHITECTURE & 1-TO-1 SUB-FEATURE ISOMORPHISM (MANDATORY)

> ⛔ **THE LAW: BACKEND MIRRORS THE EXACT SAME SUB-MODULE GRANULARITY AS THE FRONTEND FROM DAY 1**
>
> Just as the frontend breaks every feature domain into autonomous sub-modules right from Day 1, the backend MUST mirror this exact same granularity to preserve **1-to-1 Architectural Isomorphism & Granular AI Repairability**.
>
> 1. **The Universal Backend 4-Tier Hierarchy:**
>    ```text
>    APPLICATION
>      └── ROLE CONTAINER (e.g., src/backend-manager/)
>            └── FEATURE DOMAIN MODULE (e.g., manager-modules/manager-attendance/)
>                  ├── [role]-[module].module.ts              # Pure Aggregator NestJS Module (imports child sub-modules)
>                  ├── [role]-[module]-backend-feature.md     # Master Domain Documentation
>                  ├── [role]-[module]-backend-forbidden.md   # Domain-level Forbidden Invariants
>                  ├── [role]-[module]-dependencies.md        # Cross-Domain & Event Dependencies Map (Rule 49)
>                  │
>                  ├── {sub-module-1}/                       # 100% Autonomous Backend Sub-Module (e.g., attendance-dashboard/)
>                  │    ├── {submodule}-controllers/         # dashboard-controllers/
>                  │    │    └── [role]-[submodule]-[desc].controller.ts
>                  │    ├── {submodule}-services/            # dashboard-services/
>                  │    │    └── [role]-[submodule]-[desc].service.ts
>                  │    ├── {submodule}-dto/                 # dashboard-dto/
>                  │    │    └── [role]-[submodule]-[desc].dto.ts
>                  │    ├── {submodule}-repositories/        # dashboard-repositories/
>                  │    ├── {submodule}-mappers/             # dashboard-mappers/
>                  │    ├── {submodule}-domain/              # dashboard-domain/
>                  │    ├── {submodule}-types/               # dashboard-types/
>                  │    ├── {submodule}-constants/           # dashboard-constants/
>                  │    ├── {submodule}-exceptions/          # dashboard-exceptions/
>                  │    ├── {submodule}-tests/               # Unit, integration & harness tests
>                  │    │    ├── unit/
>                  │    │    └── harness/                    # Standalone Run & Test Harness (SQLite/in-memory)
>                  │    ├── {sub-module}.module.ts           # Sub-module NestJS definition
>                  │    ├── {sub-module}-backend-feature.md  # Autonomous Sub-Module Spec (all 22 canonical sections)
>                  │    ├── {sub-module}-backend-forbidden.md# Sibling isolation & WET rules
>                  │    └── {sub-module}-backend-contract.md # Exposed API & Event contracts
>                  │
>                  └── {sub-module-2}/                       # Autonomous Backend Sub-Module (e.g., attendance-history/)
>                       ├── {submodule}-controllers/         # history-controllers/
>                       ├── {submodule}-services/            # history-services/
>                       ├── {submodule}-dto/                 # history-dto/
>                       ├── {submodule}-repositories/        # history-repositories/
>                       ├── {submodule}-tests/               # history-tests/
>                       ├── {sub-module}.module.ts           # Sub-module NestJS definition
>                       ├── {sub-module}-backend-feature.md  # All 22 canonical sections
>                       ├── {sub-module}-backend-forbidden.md
>                       └── {sub-module}-backend-contract.md
>    ```
>
> 2. **Zero Root Business Code in Domain Module (Domain Quarantine):**
>    - The parent domain module root (`manager-attendance/`) contains ONLY the parent aggregator module (`manager-attendance.module.ts`), master documentation, and child sub-module folders.
>    - Placing loose controllers, services, repositories, entities, or DTOs directly at the domain root is a **CRITICAL ARCHITECTURE VIOLATION**. 100% of implementation code lives inside its respective sub-module.
>
> 3. **Parent Shared Folder Ban (No Domain "Common" or "Shared"):**
>    - Creating `manager-attendance/common/`, `manager-attendance/shared/`, `manager-attendance/services/`, or `manager-attendance/utils/` is **STRICTLY PROHIBITED**.
>    - Every reusable helper, DTO, mapper, or query helper needed by multiple sub-modules MUST be duplicated locally in each sub-module following the Strict WET Principle, or promoted to `{role}-core/` only if universally required across all domains of the role.
>
> 4. **Sibling Sub-Module Isolation & NestJS DI Boundary (Zero Cross-Submodule Imports):**
>    - `attendance-dashboard` backend services MUST NEVER directly import internal repositories, services, or DTOs from `attendance-history` (`import from '../attendance-history'`).
>    - In NestJS, a sub-module MUST NOT import a sibling sub-module's `@Module` or inject a sibling's `@Injectable()` service directly. Direct inter-submodule imports create invisible tight coupling that breaks the Backend Sub-Module ZIP Guarantee.
>
> 5. **Framework Boundary Invariants (Foreign Keys & Reads vs Events vs Transactions):**
>    - **Read Queries & Foreign Keys:** TypeORM / Prisma / SQL relations and foreign keys for reads are 100% permitted within query builders, services, and repositories (e.g., joining `members` with `attendance` records for a dashboard query). Reading related tables via ORM relations does NOT violate isolation.
>    - **Cross-Domain/Cross-Submodule Mutation Side-Effects:** Mutations that trigger side-effects in other domains or sibling sub-modules (e.g., attendance check-in awards reward points or sends a push notification) MUST be decoupled via Domain Events (emitted to Redis Streams / Transactional Outbox pattern). The triggering sub-module never directly calls the secondary sub-module's mutation service.
>    - **Multi-Table Atomic Transactions:** When an atomic workflow genuinely requires coordinated mutations across multiple database tables, it MUST be orchestrated by an approved Application Workflow Orchestrator service (e.g., Saga/Orchestrator) at an approved boundary, not by direct inter-submodule imports.
>
> 6. **Strict WET Principle for Backend Sub-Modules:**
>    - Do not create premature abstractions across sibling sub-modules. Duplicate DTOs, mappers, and response transformers locally inside each `{submodule}-dto/` and `{submodule}-services/`.
>    - If `attendance-dashboard` needs a member summary shape and `attendance-history` also needs a member summary shape, each sub-module defines its own local DTO/interface tailored specifically to its API contract.
>
> 7. **Backend Sub-Module ZIP Guarantee & AI Dependency Boundary (Granular AI Repair Unit):**
>    - When an API defect or logic bug occurs in `attendance-history`, the developer can zip ONLY `src/backend-manager/manager-modules/manager-attendance/attendance-history/`.
>    - An AI receiving this zip gets a laser-focused context (controllers, services, DTOs, unit tests for history only), with 0% risk of breaking dashboard or analytics code.
>    - **Ambient Host Stubs (`contracts/core-contracts.stub.ts`):** Every sub-module includes local TypeScript declaration stubs for core host interfaces (`TenantContext`, `ApiResponse`, `EventPublisher`, `Logger`, `ConfigService`). This guarantees the sub-module achieves 100% clean standalone compilation (`tsc --noEmit`) and offline unit test execution without needing the rest of the monolith repo.
>    - **Machine-Readable Dependency Manifest (`required-core-contracts.json`):** Every sub-module declares its host contracts in a standardized manifest:
>      ```json
>      {
>        "submodule": "attendance-history",
>        "role": "manager",
>        "domain": "manager-attendance",
>        "externalDependencyBudget": 7,
>        "consumedHostContracts": [
>          "TenantContext",
>          "ApiResponse",
>          "EventPublisher",
>          "PinoLogger",
>          "AuthGuard"
>        ],
>        "mockCatalogImplemented": true,
>        "offlineTestable": true
>      }
>      ```
>    - **External Dependency Budget (Hard Ceiling ≤ 7):** A sub-module is strictly forbidden from depending on more than 7 host-level core contracts. Allowed core contracts: (1) Base Logger, (2) TenantContext / Multi-Tenancy DataSource, (3) Universal ApiResponse Envelope, (4) Auth Guard / Principal, (5) Event Publisher / Outbox, (6) Distributed Lock, (7) Cache / Rate Limiter.
>    - **Sub-Module Local Event Constants:** Sub-modules define their emitted event names locally (e.g. `history-constants/attendance-history.events.ts`). The host aggregates them into `event-registry.constants.ts`. The sub-module never imports global event registries.
>
> 8. **Clean Sub-Folder vs Globally Unique File Naming:**
>    - Sub-folders inside a sub-module use: `{submodule}-{artifact}/` (e.g. `dashboard-controllers/`, `dashboard-services/`, `dashboard-dto/`, `history-controllers/`).
>    - Files inside those folders use: `[role]-[submodule]-[description].[type].ts` (e.g. `manager-attendance-dashboard-metrics.controller.ts`, `manager-attendance-history-query.service.ts`).
>
> 9. **Universal Mapping Across All Roles (Frontend ➔ Backend 1:1 Parity):**
>    - `manager_profile/profile_overview` ➔ `manager-profile/profile-overview/`
>    - `manager_profile/profile_security` ➔ `manager-profile/profile-security/`
>    - `manager_attendance/attendance_dashboard` ➔ `manager-attendance/attendance-dashboard/`
>    - `manager_attendance/attendance_history` ➔ `manager-attendance/attendance-history/`
>    - `manager_billing/billing_invoices` ➔ `manager-billing/billing-invoices/`
>    - `manager_members/members_directory` ➔ `manager-members/members-directory/`
>
> 10. **Meaningful Domain-Prefixed Submodule Naming Standard & The Clarity-Over-Brevity Law:**
>    - **The Clarity-Over-Brevity Law (Zero Penalty for Long Descriptive Names):** Clarity is King; Brevity is strictly subordinated. Never artificially shorten, compress, or truncate backend module or submodule folder names. There is **ZERO PENALTY for long descriptive names**. If a backend submodule needs multiple descriptive words to convey 100% of its internal business capabilities, schemas, and API endpoints (e.g. `seat-allocation-and-booking/`, `shift-timings-and-slot-management/`, `locker-assignment-and-key-tracking/`, `attendance-biometric-device-synchronization/`, `accounting-asset-depreciation-and-maintenance/`), **IT MUST BE FULLY EXPANDED**. Anyone inspecting ONLY the submodule folder name in terminal (`tree` or `ls`) MUST instantly understand 100% of its business domain, API contracts, and aggregate boundaries without reading internal controller files.
>    - Every backend submodule folder MUST follow the exact semantic formula: `{submodule}` where `{submodule}` matches `{domain}-{capability}` (e.g., `attendance-dashboard/`, `attendance-history/`, `seat-allocation-and-booking/`, `shift-timings-and-slot-management/`, `locker-assignment-and-key-tracking/`, `profile-overview/`, `billing-invoices/`).
>    - **The 5-Second Comprehension Invariant:** Anyone inspecting ONLY the submodule folder name MUST instantly know within 5 seconds its parent domain and exact business capability/API intent.
>    - ❌ **Strictly Banned Cryptic Abbreviations & Truncations:** Never use lazy truncated shorthands (e.g., `seat-alloc/`, `crm-enq/`, `acc-ast/`, `stf-rost/`, `inv-eqp/`, `bio-sync/`).
>    - ❌ **Strictly Banned Lazy/Ambiguous Names:** Never use generic or lazy names such as `tab1/`, `main/`, `default/`, `api/`, `details/` (must be `members-detail`), `common/`, `shared/`, `temp/`, or `misc/`. Lazy names are treated as **Critical Naming Violations**.
>
> 11. **Zero Flat Submodule Dumping Law (Tier 3 Domain Containers vs Tier 4 Submodules):**
>    - Granular backend sub-modules (`crm-enquiries/`, `crm-leads/`, `accounting-assets/`, `accounting-asset-maintenance/`) MUST NEVER be dumped directly under `{role}-modules/` (e.g., dumping `backend-superadmin/superadmin-modules/accounting-assets/` directly under the role root is a critical architecture failure).
>    - Every backend sub-module MUST be enclosed within its parent Tier 3 Domain Module (`backend-{role}/{role}-modules/{role}-{domain}/{submodule}/`, e.g., `backend-superadmin/superadmin-modules/superadmin-accounting/accounting-assets/`).
>    - Tier 3 Domain Modules mirror Frontend Tier 3 Domain Containers 1-to-1, preserving strict domain bounded contexts and modular monolith boundaries.
>
> 12. **Strict Anti-Action Nano-Module Ban:**
>    - Creating a backend sub-module or module for a single CRUD action, form, or UI interaction (e.g., `crm-enquiry-add/`, `crm-enquiry-create/`, `member-create/`, `asset-maintenance-add/`) is a **CRITICAL P0 ARCHITECTURE VIOLATION**.
>    - In the backend, actions are NOT sub-modules. They are simply controller routes (`POST /api/v1/...`), controller methods (`createEnquiry`), service methods (`create`), and DTOs (`CreateEnquiryDto`) living directly inside the parent entity's autonomous sub-module (`crm-enquiries/`).
>
> 13. **The Universal Single-Domain Purity Law & Bounded Context Integrity (1-Domain = 1-Bounded-Context Mandate):**
>    - Every Tier 3 Backend Domain Module (`backend-{role}/{role}-modules/{role}-{domain}/`) MUST focus strictly on a **SINGLE, UNIFIED BUSINESS BOUNDED CONTEXT & PRIMARY AGGREGATE ROOT**.
>    - ⛔ **THE UNIVERSAL BAN ON CONJOINED-TWIN DOMAIN MERGERS (The Universal "X-and-Y" Anti-Pattern):**
>      - An AI agent is **STRICTLY PROHIBITED** from conjoining or merging ANY two distinct business domains, departments, or capabilities into a single hybrid domain module (e.g., using a composite name containing `-and-` or otherwise combining two separate bounded contexts). Ordinary hyphenated names such as `admin-members` and `members-directory` remain valid.
>      - **The Universal Law:** A mere operational relationship, common database foreign key, or loose thematic connection between two business areas (e.g., *"both touch money"*, *"both touch staff"*, *"both touch members"*) **DOES NOT JUSTIFY MERGING THEM INTO ONE DOMAIN MODULE!**
>      - **The 3-Point Deterministic Domain Independence Test:**
>        Before proposing or creating ANY backend domain module, the AI MUST verify these 3 gates. If ANY gate is true, the capabilities **MUST BE SPLIT INTO SEPARATE SIBLING DOMAIN MODULES**:
>        1. *Different Entity Lifecycles / Tables:* Do they mutate different core database tables or transactional state machines? (e.g., Invoices vs Ledger Entries; Leads vs Enrolled Members; Shifts vs Payroll).
>        2. *Different Operational Personas / API Consumers:* Are they consumed by different client roles or for completely different operational intents? (e.g., Customer Checkout Gateway vs Accountant Audit API; Check-in Punch vs Holiday Schedule).
>        3. *Different External Services:* Do they integrate with different third-party vendors/protocols? (e.g., Stripe/Razorpay vs Accounting ERPs; Biometric Hardware vs Calendar).
>    - ❌ **UNIVERSAL CONJOINED-TWIN MERGER EXAMPLES (Illustrative, NOT Exhaustive — The Law Applies Universally To ALL Modules):**
>      - **Billing vs Accounting:** `*-billing-and-finance/`, `*-finance-and-billing/` ➔ **STRICTLY BANNED!** (Billing = Customer invoices/subscriptions/gateways; Accounting = Ledgers/P&L/balance sheet/taxes).
>      - **Pre-Sale vs Post-Sale:** `*-crm-and-members/`, `*-leads-and-members/` ➔ **STRICTLY BANNED!** (CRM = Pre-sale leads; Members = Enrolled users).
>      - **HR vs Payroll:** `*-staff-and-payroll/`, `*-staff-and-accounting/` ➔ **STRICTLY BANNED!** (Staff = Profiles/shifts; Payroll = Disbursements).
>      - **Check-ins vs Calendar:** `*-attendance-and-calendar/` ➔ **STRICTLY BANNED!** (Attendance = Punches; Calendar = Holiday schedules).
>      - **Physical Stock vs Financial Valuation:** `*-inventory-and-accounting/` ➔ **STRICTLY BANNED!**
>      - **ANY OTHER CONJOINED HYBRID:** Creating `*-{domainA}-and-{domainB}/` for ANY two bounded contexts is an **IMMEDIATE CRITICAL P0 ARCHITECTURE FAILURE**.
>    - ❌ **FORCE-FITTING UNRELATED FEATURES IS STRICTLY FORBIDDEN (ZERO JABARDASTI FIT KARNA):**
>      - An AI MUST NOT force-fit an existing feature into an arbitrary domain simply because it doesn't know where to put it or fears creating a new domain (e.g., shoving `holiday-calendar` into `attendance` is a P0 failure).
>      - **The Mandate:** If an authentic business feature does not cleanly and 100% logically belong to an existing domain's Aggregate Root, the AI **MUST CREATE A DEDICATED TIER 3 DOMAIN MODULE** (e.g., `superadmin-holiday-calendar/`). Roles have ZERO NUMERIC DOMAIN LOCKS!
>    - **The Code-First Forensic Inspection Invariant (Zero Guesswork Naming):**
>      - Before proposing or naming ANY backend domain or submodule, the AI **MUST deeply inspect the actual database entities, tables, schemas, and controller routes first**.
>      - Naming MUST be a direct, faithful reflection of the discovered code entities and tables, NEVER an abstract buzzword.
>    - **The Self-Evident Domain Naming Invariant:** Every Tier 3 Backend Domain Module MUST be **100% self-evident, descriptive, and transparent**.
>    - **The Physical Resource Composite Exception (Carefully Delimited):**
>      - ONLY permitted when multiple physical resources share the exact same atomic reservation/booking transaction (e.g. `admin-seat-shift-locker/`). Conjoining two distinct business departments or bounded contexts is 100% PROHIBITED.
>    - **Permanently Banned Generic Junk-Drawer, Abstract Buzzword & Conjoined-Twin Mergers:**
>      - ❌ ANY conjoined-twin domain merger (`*-billing-and-finance/`, `*-crm-and-members/`, `*-staff-and-payroll/`, `*-inventory-and-accounting/`).
>      - ❌ Abstract buzzwords (`*-engagement/`, `*-retention/`, `*-growth/`, `*-insights/`).
>      - ❌ Junk-drawer catch-alls (`*-operations/`, `*-management/`, `*-general/`, `*-facilities/`, `*-resources/`, `*-misc/`, `*-tools/`, `*-hub/`, `*-portal/`, `*-services/`, `*-data/`).
>
> 14. **Zero Domain Count Lock (No Rigid Hardcoding):**
>    - The number of domain containers per role is determined purely by the business domain bounded contexts of that role. There is **NO hardcoded number or artificial ceiling** (neither 5, nor 6–10, nor any fixed count). NEVER force-merge or artificially split domains to satisfy an arbitrary numeric range!
>
> 15. **The Domain Promotion Law (When a Dense Capability Promotes to a Primary Backend Domain):**
>    - When a capability grows so large that it encompasses 3 or more distinct, complex operational backend workflows, entities, and API contracts (e.g. Floor Designer, Daily Allocations, Maintenance Logs), it is NO LONGER a mere sub-module—it has matured into an autonomous High-Level Business Domain Module (`backend-{role}/{role}-modules/{role}-{promoted-domain}/`).
>    - **Concrete Scaling Example:**
>      - `admin-seats/` (Sub-modules: `seat-floor-layout-designer/`, `seat-allocation-and-booking/`, `seat-maintenance-and-repair/`)
>      - `admin-shift-and-locker/` (Sub-modules: `shift-timings-and-slot-management/`, `locker-assignment-and-key-tracking/`)
>    - This mirrors the Frontend Domain Promotion 1-to-1, maintaining strict bounded context purity without sub-submodule nesting.


### Cross-Feature Workflow Exception

Feature modules must not directly import sibling feature repositories, services, entities, or internal business logic.

If a genuinely atomic workflow spans multiple bounded contexts, it must be owned by an explicitly named workflow/orchestration module under `src/infrastructure/` or an approved application-workflow boundary.

Rules:
1. The workflow must depend only on published feature interfaces/contracts, never sibling internal repositories.
2. The workflow must be documented in every affected module's `{role}-{module}-dependencies.md`.
3. The workflow owner must define the transaction boundary, failure behavior, idempotency behavior, and emitted events.
4. A direct sibling import remains forbidden.
5. If atomicity is not genuinely required, use an outbox-backed domain event instead.

### 0D. BACKEND NAMESPACE PREFIXING (MANDATORY)

Because the project contains a 1-to-1 mapping of frontend and backend roles, the AI MUST explicitly separate backend folders from frontend folders. 
- **The Rule:** Every top-level backend role container MUST be prefixed with `backend-`; its child domain folders use the canonical `{role}-{domain}` pattern. Do not add a second `backend-` prefix to child domains.
- **Primary Examples:** `backend-admin/`, `backend-manager/`, `backend-superadmin/`.
- **E2E / Selenium Testing Folders:** If tests are grouped in a separate root directory, the test root AND the role subfolders inside it MUST carry the namespace to maintain context.
  - Example E2E: `backend-e2e/backend-admin-e2e/`, `backend-e2e/backend-manager-e2e/`
  - Example Selenium: `backend-selenium/backend-admin-selenium/`
- **Why?** If an AI is told to "fix the manager billing bug" and the context contains `src/manager/billing/`, it may hallucinate and write frontend React code inside a backend NestJS file. By strictly enforcing `src/backend-manager/manager-modules/manager-billing/` and `backend-e2e/backend-manager-e2e/`, there is zero ambiguity for the AI or the human developer.

When fixing a bug in `backend-superadmin/superadmin-modules/superadmin-billing`, the AI repair boundary is `billing`, not the entire `superadmin` domain container.

## QUICK NAMING REFERENCE (AI PRE-CREATION CHECK)

**FEATURE DOMAIN MODULE (Tier 3 — Quarantined Aggregator)**
`admin-members/` (contains ONLY `admin-members.module.ts`, master docs, and child `{submodule}/` folders)

**AUTONOMOUS SUB-MODULE (Tier 4 — Terminal Leaf AI Repair Unit)**
`members-directory/` (or `members-registration/`, matching `{domain}-{capability}`)

**SUB-FOLDERS (Inside Autonomous Sub-Module)**
`directory-services/`
`directory-controllers/`
`directory-dto/`
`directory-repositories/` (contains ORM entities)
`directory-mappers/`
`directory-domain/`
`... etc.` (Pattern: `{submodule}-{artifact}/`)

**FILES (Inside Sub-Folders)**
`admin-members-directory-command.controller.ts`
`admin-members-directory-query.controller.ts`
`admin-members-directory-query.service.ts`
`admin-members-directory-filter.dto.ts`
`... etc.` (Pattern: `[role]-[submodule]-[description].[type].ts`)

**RULE:**
Sub-folders use:
`{submodule}-{artifact}/`

Files use:
`[role]-[submodule]-[description].[type].ts`

Never invert these rules.

### 0F. ANTI-DOUBLE-PREFIXING RULE (CRITICAL)

Never double-prefix feature names or folders. If a backend module is named `admin-billing`, its child **sub-folders** MUST be named using the **module name only** as prefix (e.g., `billing-controllers/`, `billing-services/`), NEVER using the full role+module (e.g., NEVER `admin-billing-controllers/`). The role prefix applies to **file names** inside those folders (e.g., `admin-billing-invoice-search.service.ts`), NOT to the folder name itself. This is the single canonical rule — there is no alternative.

### 0H. CANONICAL NAMING SINGLE SOURCE OF TRUTH (GAP-14 Fix)

To eliminate all ambiguity between Rule 0F, Rule 0A.2, and Rule 2 (file naming), the following is the definitive unified rule across the hierarchy:

| Level | Pattern | Correct Example | FORBIDDEN Example |
|---|---|---|---|
| Role Container | `backend-{role}/` | `backend-admin/` | `admin/` or `backend_admin/` |
| Feature Domain Module | `{role}-{domain}/` | `admin-members/`, `manager-attendance/` | `members/` or `admin-admin-members/` |
| Autonomous Sub-Module | `{submodule}/` | `members-directory/`, `attendance-dashboard/` | `tab1/`, `api/`, `shared/`, `common/` |
| Sub-folders inside Sub-Module | `{submodule}-{artifact}/` ONLY | `directory-services/`, `dashboard-controllers/` | `admin-directory-services/`, `common/` |
| Files inside Sub-Module folders | `[role]-[submodule]-[description].[type].ts` | `admin-members-directory-command.controller.ts` | `directory-command.controller.ts` |

**The key rule in one sentence:** Sub-folders inside a sub-module use the SUBMODULE capability as prefix; files inside those folders use the ROLE+SUBMODULE+DESCRIPTION formula. Never mix them up.

- **Sub-Module NestJS Registration File Exemption:** Sub-module registration files (`{submodule}.module.ts`, e.g., `members-directory.module.ts`, `attendance-dashboard.module.ts`) and sub-module documentation trio files (`{submodule}-backend-feature.md`, `{submodule}-backend-forbidden.md`, `{submodule}-backend-contract.md`) are explicitly exempt from the `[role]-` prefix rule because they represent the autonomous capability itself and are uniquely identified by their sub-module directory name. All executable service, controller, repository, and DTO files inside `{submodule}-{artifact}/` MUST carry the full `[role]-[submodule]-[description].[type].ts` prefix.

```text
backend-admin/
└── admin-modules/
    └── admin-members/                                            ← domain root: {role}-{domain} (quarantined)
        ├── admin-members.module.ts                               ← domain aggregator module
        ├── admin-members-backend-feature.md                      ← domain master doc
        ├── admin-members-backend-forbidden.md                    ← domain forbidden rules
        ├── admin-members-dependencies.md                         ← cross-domain & event dependencies map (Rule 49)
        │
        └── members-directory/                                    ← autonomous sub-module: {submodule}
            ├── directory-controllers/                            ← sub-folder: {submodule}-{artifact}
            │   ├── admin-members-directory-command.controller.ts ← file: {role}-{submodule}-{desc}
            │   └── admin-members-directory-query.controller.ts
            ├── directory-services/                               ← sub-folder: {submodule}-{artifact}
            │   └── admin-members-directory-query.service.ts      ← file: {role}-{submodule}-{desc}
            ├── directory-dto/                                    ← sub-folder: {submodule}-{artifact}
            │   └── admin-members-directory-filter.dto.ts
            ├── directory-repositories/
            ├── directory-tests/
            │   └── harness/                                      ← standalone test harness
            ├── members-directory.module.ts                       ← sub-module NestJS definition (exempt from role-prefix)
            ├── members-directory-backend-feature.md              ← documentation trio (22 canonical sections)
            ├── members-directory-backend-forbidden.md
            └── members-directory-backend-contract.md
```

AI agents MUST consult this table before creating any folder or file name. Any deviation = architecture violation.

### 0I. STRICT MAXIMUM NESTING DEPTH LAW (THE DEPTH INVARIANT — SUB-SUBMODULES BANNED)

1. **The 4-Tier Terminal Leaf Boundary:** The backend architectural hierarchy stops strictly at Tier 4:
   - Tier 1: `src/` (Source Root)
   - Tier 2: `backend-{role}/` (Role Container)
   - Tier 3: `{role}-modules/` ➔ `{role}-{domain}/` (Pure Feature Domain Module — Aggregator & Quarantine)
   - Tier 4: `{submodule}/` (Autonomous Sub-Module — **TERMINAL LEAF BUSINESS EXECUTION UNIT**)
2. **Business Depth = 1 Law (Sub-Submodules STRICTLY FORBIDDEN):**
   Inside an autonomous sub-module (`{submodule}/`), the **business nesting depth is strictly 1**. Creating nested folders that act as child business modules (e.g., `members-directory/directory-export/` or `attendance-history/biometrics/`) is a **CRITICAL P0 ARCHITECTURE VIOLATION**. All business code lives directly within standard single-level `{submodule}-{artifact}/` folders.
3. **Artifact Depth Exemptions (Permitted Leaf Sub-Directories):**
   The following deterministic leaf artifact directories are strictly permitted and exempt from the depth count:
   - `{submodule}-tests/` (may contain sub-folders `harness/`, `fixtures/`, `unit/`, `integration/`)
   - `{submodule}-locales/` (may contain language codes `en/`, `hi/` where backend localization is used)
   - `contracts/` (contains `core-contracts.stub.ts`)
   No other sub-directories of any kind are permitted beyond this depth boundary.
4. **Artifact-Only Decomposition:** All decomposition inside an autonomous sub-module happens PURELY via standard canonical artifact folders (`{submodule}-controllers/`, `{submodule}-services/`, `{submodule}-repositories/`, `{submodule}-dto/`, `{submodule}-mappers/`, `{submodule}-domain/`, `{submodule}-types/`, `{submodule}-tests/`).
5. **Deterministic 5-Gate Sub-Module Qualification Decision Matrix (Backend):**
   - **Gate 1 (Frontend Route / Tab Isomorphism):** Does this capability correspond to a distinct secondary tab or dedicated sub-route on the frontend (e.g., `/attendance/history`, `/billing/invoices`)? If YES → **Autonomous Sub-Module** (`{submodule}/`).
   - **Gate 2 (Entity / Lifecycle Independence):** Does this capability manage an independent sub-domain entity or distinct transactional lifecycle? If YES → **Autonomous Sub-Module**. If it is merely an additional query filter, patch endpoint, or export method on the existing entity → **Method/Controller** inside the existing sub-module.
   - **Gate 3 (File Count & Granularity Bounds — The Goldilocks Rule: 5–20 Files):**
     - Target: 5 to 20 files per sub-module (controllers + services + repositories + DTOs + entity + tests + harness + doc trio).
     - Nano-Module Banned: Creating a sub-module for a single utility or single endpoint (< 3 files) is FORBIDDEN.
     - Mega-Submodule Banned: Cramming 3+ distinct sub-domain entity lifecycles into one sub-module (> 25 files) is FORBIDDEN; split into sibling sub-modules under `{role}-{domain}/`.
   - **Gate 4 (Standalone Testability & Mockability):** Can this sub-module run isolated unit/integration tests with its own seeders and harness? If YES → **Autonomous Sub-Module**.
   - **Gate 5 (DI & Sibling Isolation Boundary):** Sibling sub-modules NEVER import each other's NestJS `@Module`, `@Injectable()` services, or repositories. Cross-domain side-effects use Domain Events (Transactional Outbox).

### 0B. HARD FEATURE WRITE BOUNDARY

For a feature-specific task, the default writable scope is:

```text
[owning-feature]/**
```

The AI MUST NOT modify sibling feature modules, other domain business modules, or global business folders. Only explicitly documented core/infrastructure files may be modified as exceptions.

### 0C. CHANGE SCOPE FAILURE CONDITION

A feature repair FAILS the architecture gate when the AI:
* changes an unrelated business module;
* creates a new sibling-feature dependency;
* moves feature business logic into a domain-level folder;
* modifies another feature's database queries or mock handlers.

**Clarification — Event-Based Runtime Dependencies:** A direct business-code import from a sibling feature is forbidden and fails this gate. A declared, runtime event-based dependency (Rule 49) is explicitly permitted — emitting or consuming a named event from `event-registry.constants.ts` is NOT a sibling-feature code dependency. The distinction is: direct business-code dependency is forbidden; declared event-based runtime dependency is allowed.

### 0E. ISOLATED CONTEXT IMPLIES MODULAR MONOLITH, NOT MICROSERVICE (CRITICAL)

When an AI is provided with a single feature module or domain folder in isolation (e.g., a developer zips only the `backend-manager` folder or provides only the `dashboard` module), the AI MUST assume the module operates within a **Modular Monolith architecture**, NOT as an independent Microservice.
* **The Rule:** Never attempt to bootstrap independent database connections, isolated global infrastructure (like Config or Redis setup), or framework-level root configurations within a feature module. 
* **Framework-independent contract:** Rely on the global application monolith to provide the core infrastructure.
* **NestJS implementation:** Feature modules should strictly rely on `.forFeature()` registrations and should bundle/export their domain-specific providers into a module so the global Monolithic App can safely consume them. Never use `.forRoot()` / `.forRootAsync()` in a feature module.
* **Django implementation:** Feature apps must rely on `settings.py` for all database and infrastructure configuration. Do not attempt to initialize new database connections or Redis pools inside `apps.py` or feature views.
* **Why:** If the AI assumes the folder is a standalone microservice, it will attempt to instantiate redundant database connection pools and global infrastructure inside the local module, which instantly crashes the global monolith on startup due to duplicated context boundaries.

---

## CANONICAL COMPLIANCE STATUS VOCABULARY

Only the following statuses may be used in audit reports, enforcement matrices, and findings. Unlisted statuses (e.g., "blocked", "missing", "unverified", "outside scope") are FORBIDDEN — use the canonical equivalents below.

| Status | Meaning |
|---|---|
| `COMPLIANT` | Rule verified with sufficient evidence |
| `NON_COMPLIANT` | Rule violated with evidence |
| `PARTIALLY_COMPLIANT` | Rule partially satisfied; gap documented |
| `NOT_APPLICABLE` | Rule does not apply; justification and source evidence provided |
| `SUPPLIED_AND_VERIFIED` | Dependency supplied and confirmed correct |
| `SUPPLIED_BUT_MISMATCHED` | Dependency supplied but does not match requirement |
| `SUPPLIED_BUT_INCOMPLETE` | Dependency supplied but missing required parts |
| `OUTSIDE_SUPPLIED_SCOPE` | Dependency exists but is not in the supplied input |
| `BLOCKED_BY_SUPPLIED_SCOPE` | Cannot verify because required evidence is outside supplied scope |
| `DEFERRED_TO_HOST_RUNTIME` | Static code is complete and compliant; dynamic command/test execution is deferred to host/developer |
| `EXTERNAL_DEPENDENCY_REQUIRED` | Requires an external system or team action before resolution |
| `FRONTEND_CHANGE_REQUIRED` | Backend is correct; frontend must change to align |
| `NOT_VERIFIED` | Insufficient evidence to establish presence or absence |
| `STACK_CONFLICT` | Supplied code uses a technology not approved by this architecture document |
| `FRAMEWORK_NOT_VERIFIED` | Active framework cannot be determined from supplied evidence |
| `DATA_COMPATIBILITY_NOT_VERIFIED` | Existing data compatibility for a schema change cannot be verified |

> ⛔ **NOTE ON RUNTIME UNVERIFIABILITY:**
> Absence of a live running database, Redis cache, message broker, or framework server in the AI execution environment MUST NOT be classified as `BLOCKED_BY_ENVIRONMENT` or used to fail an architecture rule. Source code, entities, DTOs, controllers, services, repositories, migrations, and mock-based unit tests MUST be evaluated statically as `COMPLIANT` (up to 10.0), with live dynamic execution recorded as `DEFERRED_TO_HOST_RUNTIME`.

Every status MUST include:
- **Evidence:** what was read or executed to determine this status
- **Affected artifact(s):** which files, endpoints, or rules are affected
- **Remediation path** or reason no remediation was performed

---

## FRAMEWORK APPLICABILITY GATE — MANDATORY

Before implementing or auditing code, the AI MUST determine the active backend
framework from the supplied project/repository evidence.

Only the rule set applicable to that framework may be enforced.

NestJS-specific requirements apply only to NestJS/TypeScript.
Django-specific requirements apply only to Django/Python.

The AI MUST NOT combine framework-specific implementations.

If the active framework cannot be determined from supplied evidence,
mark `FRAMEWORK_NOT_VERIFIED` rather than guessing.

> **IMPORTANT:** Supported backend frameworks for this project are ONLY NestJS/TypeScript and Django/Python.
> No Spring Boot/Java implementation is part of the normative project architecture.
> AI MUST NOT introduce any Spring Boot/Java code.

---

## 0G. MULTI-TENANCY CONTRACT — MANDATORY (GAP-23 Fix)

> ⛔ **P0 SECURITY REQUIREMENT — HARD STOP GATE**
> **Any endpoint that does NOT enforce tenant isolation = P0 Security Failure.**
> **Do NOT mark any data endpoint PASS until ALL items in the checklist below are verified.**
> **Consequence of failure:** Cross-tenant data leakage — the most severe failure mode in this architecture. A single missing `gymId` filter can expose all data from every gym to any authenticated user.

This application is **multi-tenant**. Every feature module across every role MUST enforce tenant isolation at every layer. No exceptions exist for this rule.

### Tenant Identity Contract

| Field | Source | Description |
|---|---|---|
| `gymId` | JWT payload ONLY | Primary tenant identifier (the gym/organization) |
| `branchId` | JWT payload ONLY | Sub-tenant identifier (the gym branch) |

### Canonical Dual-Layer Multi-Tenancy Architecture (The Belt-and-Suspenders Invariant)

To guarantee 100% mathematical protection against cross-tenant data leaks without placing an unreasonable cognitive or implementation burden on feature developers or AI agents, the architecture enforces a **Dual-Layer Defense Model**:

1. **Layer 1: Physical Infrastructure Isolation (Connection Routing — Rule 39):**
   - The platform core dynamically resolves and routes requests to the specific tenant's dedicated database via `TenantContext` created strictly from the authenticated JWT.
   - Cross-tenant SQL execution is physically blocked at the database instance/schema boundary.

2. **Layer 2: Logical Application Isolation (Repository Query Predicates — Rule 0G):**
   - Every ORM query, repository method, and SQL statement MUST explicitly bind `gymId` (and `branchId` where scoped) into the `WHERE` clause.
   - **Why this is NOT redundant:** If a developer accidentally references a master DataSource, if connection pool caching leaks under high concurrency, or if an isolated test harness runs against an in-memory SQLite database, Layer 2 completely prevents cross-tenant data exposure.

3. **Automated Enforcement (Zero Developer Burden):**
   - Feature repositories extend the platform `TenantAwareRepository<T>` base class (or use TypeORM entity subscribers / Django tenant managers) which automatically injects `where: { gymId: currentTenant.gymId }` into AST query trees.
   - Sub-modules declare their tenant scope in DTOs/repositories; the base repository handles AST predicate injection automatically, eliminating manual query duplication while guaranteeing mathematical security.

### Tenant Scope Classification

Not every record has the same tenant scope. Every entity and repository method must declare one of these scopes:

| Scope | Required filter | Description |
|---|---|---|
| `MASTER_GLOBAL` | Master database only; no gym/branch business data | Global users, tenants registry, system feature flags |
| `GYM_SCOPED` | `gymId` is mandatory | Subscription plans, membership types, roles/permissions |
| `BRANCH_SCOPED` | `gymId` and `branchId` are mandatory | Attendance logs, local equipment, shift schedules |
| `PLATFORM_SCOPED` | Superadmin-only master data | SaaS billing, platform analytics, tenant provisioning |
| `IMMUTABLE_AUDIT` | Scope follows originating record | Audit logs, security events, compliance archives |

Rules:
1. `branchId` must not be forced onto gym-wide entities where it has no meaning.
2. Every repository method must declare its expected tenant scope in its method documentation or responsibility map.
3. A repository query must apply the filters required by its declared scope.
4. A missing required scope filter is a P0 security failure.
5. A repository method handling a master/global entity must use the master DataSource and must never accidentally run against a tenant DataSource.

**ABSOLUTE RULES — NO EXCEPTIONS:**
1. `gymId` and `branchId` MUST be extracted from the authenticated JWT payload — NEVER from the request body, URL query string, or client-supplied headers. **Consequence of violation:** Client-controlled tenant ID = complete tenant isolation bypass — any user can forge access to any gym's data.
2. Services MUST NOT accept `gymId`/`branchId` as input parameters from controllers — they receive them from the auth context/JWT payload resolved by the auth guard. **Consequence of violation:** Business logic becomes responsible for tenant enforcement — a missed parameter causes cross-tenant leakage.
3. Route parameters containing a resource ID (e.g., `/members/:memberId`) MUST be verified against the JWT tenant before returning data. **Consequence of violation:** Any authenticated user from any tenant can access any resource by guessing its UUID.

### Repository Tenant Filter Rule (P0 Security Requirement)

Every repository query that retrieves or modifies business data MUST include a tenant filter. **NO EXCEPTIONS.** A query without a tenant filter is a critical vulnerability regardless of context:

```typescript
// NestJS/TypeORM example
await this.memberRepo.findOne({
  where: {
    id: memberId,
    gymId: jwtPayload.gymId,      // MANDATORY — never omit — STOP if missing
    branchId: jwtPayload.branchId, // MANDATORY where applicable — STOP if missing
  }
});
```

```python
# Django ORM example
Member.objects.filter(
    id=member_id,
    gym_id=request.user.gym_id,       # MANDATORY — never omit — STOP if missing
    branch_id=request.user.branch_id,  # MANDATORY where applicable — STOP if missing
)
```

**Omitting the tenant filter = P0 Security Failure. Record `NON_COMPLIANT`. Do NOT mark PASS. Do NOT ship.**

### Response DTO Tenant Safety

- Response DTOs MUST NOT expose `gymId`/`branchId` to the client unless explicitly required by the frontend contract. **Consequence of violation:** Internal tenant structure leakage.
- Response DTOs MUST NOT include internal IDs or relationship references that could leak cross-tenant information. **Consequence of violation:** Cross-tenant enumeration attacks become possible.

### AI Audit Checklist for Tenant Isolation — HARD STOP GATE

> ⛔ **STOP. Do NOT mark any data endpoint PASS until every item below is verified. Partial verification = endpoint marked `PARTIALLY_COMPLIANT`, not COMPLIANT.**

Before marking any data endpoint PASS, ALL of the following MUST be verified with evidence:

```text
[ ] JWT payload extraction verified at auth guard level (not from body/query) — STOP if missing
[ ] gymId/branchId NEVER accepted from request body params — STOP if accepted
[ ] Every findOne/findMany/update/delete query includes tenant filter — STOP if any query is missing it
[ ] Response DTOs do not leak cross-tenant identifiers — STOP if they do
[ ] Route param IDs (e.g., :memberId) are validated against JWT tenant — STOP if not validated
[ ] Tests verify that Tenant A cannot access Tenant B data — STOP if tests absent
[ ] Bulk operations (where clauses) include tenant scope — STOP if missing
```
**Any unchecked item = endpoint is `NON_COMPLIANT`. Do not mark it PASS.**

### 0G-D. STRICT SUB-FOLDER PLACEMENT RULE (NO ROOT CLUTTER)

All implementation files (Controllers, Services, DTOs, Mappers, Domain Models, Constants) MUST be placed STRICTLY inside their corresponding prefixed sub-folders (e.g., `{module}-controllers/`, `{module}-dto/`). 
DO NOT place any of these implementation files in the root of the feature module folder. 

For example, in NestJS, the ONLY `.ts` file that belongs in the root of the feature module folder is the `[role]-[module].module.ts` file itself (alongside the mandatory `.md` documentation files like `-backend-feature.md`). Everything else MUST go into sub-folders. This keeps the backend feature module root entirely clean and identical in philosophy to the frontend root folder rule.

---

## 0G-A. APPROVED BACKEND NPM PACKAGE REGISTRY (GAP-22 Fix)

The following are the ONLY approved npm packages for backend feature modules. AI agents MUST NOT introduce packages outside this list without explicit documented approval.

| Concern | Approved Package | FORBIDDEN Alternatives |
|---|---|---|
| Framework | `@nestjs/core`, `@nestjs/common` | Express raw, Fastify standalone |
| ORM | `typeorm` | Prisma, Sequelize, Drizzle |
| Database Driver | `pg` (via TypeORM config) | `mysql2`, `better-sqlite3` |
| Validation | `class-validator`, `class-transformer` | Joi, Zod (backend), Yup |
| Redis Client | `ioredis` | `redis` npm v4 (conflicting API surface) |
| Queue | `bullmq` | `bull` (deprecated), `agenda`, `bee-queue` |
| Logging | `nestjs-pino`, `pino` | Winston, `console.log` direct |
| Config | `@nestjs/config` + Zod env schema | `dotenv` direct usage |
| JWT | `@nestjs/jwt` | `jsonwebtoken` direct usage |
| API Docs | `@nestjs/swagger` | none |
| Unit Testing | `jest`, `@nestjs/testing` | mocha, vitest, jasmine |
| E2E Testing | Python `pytest` + `httpx` | Jest E2E, Supertest |

**Django equivalent packages:** `djangorestframework`, `celery`, `django-redis`, `python-jose` or `djangorestframework-simplejwt`, `pytest-django`, `httpx` for E2E.

### Mandatory Infrastructure Package Approval Matrix

The project owner MUST maintain a version-pinned approved infrastructure package matrix. Any dependency required by a mandatory architecture rule MUST appear here before an AI is instructed to implement that rule.

The approved matrix must include, where applicable:

| Concern | Approved Package / Owner-Approved Implementation |
|---|---|
| HTTP security headers | Helmet or framework-approved equivalent (`helmet`) |
| HTTP compression | compression or framework-approved equivalent (`compression`) |
| Metrics | prom-client or framework-approved equivalent (`prom-client`) |
| Distributed tracing | OpenTelemetry packages (`@opentelemetry/api`, `@opentelemetry/sdk-node`) |
| Image processing | Approved image transformation package (`sharp`) |
| Object storage | Approved cloud object-storage SDK (`@aws-sdk/client-s3`) |
| Encryption | Approved AES-256 cryptography implementation (`crypto` native or approved wrapper) |
| Import-boundary enforcement | eslint-plugin-boundaries or no-restricted-imports |
| Secret scanning | gitleaks |
| SAST / dependency scanning | Owner-approved CI security tooling |
| Git hooks | husky and lint-staged, where Node.js is active |

Zod is forbidden for business request DTO validation but is explicitly permitted only for centralized environment/configuration schema validation.
---

## 0G-B. SEED FILE SPECIFICATION (GAP-15 Fix)

Seed files MUST follow these rules without exception:

1. **Location:** `{feature-module}/{module}-seeds/`
2. **Naming:** `{role}-{module}-{description}.seed.ts`
   - Example: `admin-members-default-plans.seed.ts`
3. **Idempotency:** MANDATORY — repeated execution MUST NOT create duplicate data. Use `upsert` or explicit existence checks.
4. **Export shape:**
   ```typescript
   export async function seedAdminMembersDefaultPlans(dataSource: DataSource): Promise<void>
   ```
5. **Scope:** ONLY seed reference/initial data required for the application to function. NEVER seed production-exclusive or demo-only data.
6. **Transaction:** Seed operations MUST run inside a transaction for atomicity.

---

## 0G-C. REDIS RESPONSIBILITY DECISION TABLE (GAP-16 Fix)

Before choosing a Redis mechanism, consult this table:

| Scenario | Correct Redis Mechanism | FORBIDDEN Alternatives |
|---|---|---|
| Cache API response for 5–60 min | Redis Cache (ioredis + TTL) | Pub/Sub, Streams |
| Background email / SMS after event | BullMQ job | Pub/Sub (not durable — subscriber must be online) |
| Critical domain event that must not be lost | Redis Streams | Pub/Sub (ephemeral — lost if no active subscriber) |
| Real-time dashboard metric broadcast | Redis Pub/Sub | Streams (overkill for ephemeral fan-out) |
| Prevent double-processing a payment | Redis Distributed Lock | Streams, BullMQ |
| Rate limiting per user / IP | Redis Cache + sliding window TTL | BullMQ |
| Session storage / token blacklist | Redis Cache + TTL | Pub/Sub |

> **CRITICAL:** Redis Pub/Sub is ephemeral. A message published when there are no active subscribers is permanently lost. NEVER use Pub/Sub for critical business events that must survive a service restart or a subscriber being temporarily offline. Use Redis Streams for durable event delivery.

---


Do not create monolithic Services, Controllers, or Views. A generic `UserService` or `MemberController` will quickly grow to 1000+ lines. When you feed a 1000-line file to an AI, token costs explode, and the AI loses focus, increasing the chance of collateral damage.

**The Solution: Use-Case Driven Files**
Break down large files into micro-features. Every file must handle only one specific business flow.
- ❌ **BAD:** `admin-members.service.ts` (Handles registration, billing, attendance, emails — monolithic)
- ✅ **GOOD:** 
  - `admin-members-registration.service.ts`
  - `admin-members-billing.service.ts`
  - `admin-members-attendance.service.ts`
  - `admin-members-notifications.service.ts`

**IMPORTANT FOLDER NAMING (CRITICAL ENFORCEMENT):** ALL folders in the backend MUST use `kebab-case` (e.g., `members-services/`, `billing-dto/`). You are STRICTLY FORBIDDEN from using PascalCase, camelCase, or snake_case for folder names (e.g., NEVER use `ManagerMembersServices/` or `admin_billing`). Always group these micro-files logically into cohesive sub-folders within the module using this casing.

### Sub-Folder Naming Standard (MANDATORY — No Exceptions)

Every feature module sub-folder MUST be named using the module name as prefix followed by the artifact type. The following table is the ONLY permitted naming convention:

| Artifact Type | Mandatory Folder Name | ❌ Forbidden Alternatives |
|---|---|---|
| Services | `{module}-services/` | `service/`, `services/`, `svc/` |
| Controllers | `{module}-controllers/` | `controller/`, `controllers/`, `ctrl/` |
| Repositories | `{module}-repositories/` | `repo/`, `repositories/`, `data/` |
| DTOs | `{module}-dto/` | `dto/`, `dtos/`, `DTO/`, `schemas/` |
| Mappers | `{module}-mappers/` | `mappers/`, `mapper/`, `utils/` |
| Domain Models | `{module}-domain/` | `domain/`, `models/`, `entities/` |
| Types/Interfaces | `{module}-types/` | `types/`, `interfaces/`, `typings/` |
| Constants/Enums | `{module}-constants/` | `constants/`, `enums/`, `config/` |
| Exceptions | `{module}-exceptions/` | `exceptions/`, `errors/`, `exception/` |
| Locales | `{module}-locales/` | `_locales/`, `locale/`, `i18n/` |
| Jobs | `{module}-jobs/` | `jobs/`, `workers/`, `queues/` |
| Adapters | `{module}-adapters/` | `adapters/`, `external/`, `integrations/` |

> **AI AGENT NOTE:** When creating any sub-folder inside a feature module, you MUST consult this table first. Creating a folder not following `{module}-{artifact}/` pattern is an architecture violation and MUST be flagged.
> Under the Universal Day-1 Sub-Module Architecture (Rule 0A.2 & Rule 0H), `{module}` inside autonomous sub-modules represents the `{submodule}` capability (e.g., `members-directory/` contains `directory-services/`, `directory-controllers/`, etc.), while domain module roots (`admin-members/`) are quarantined pure aggregators.

**Examples (role: admin, domain: members, submodule: directory):**
```text
admin-members/
├── admin-members.module.ts       ✅ Pure Aggregator NestJS Module (Tier 3)
└── members-directory/            ✅ Autonomous Sub-Module (Tier 4 AI Repair Unit)
    ├── directory-services/       ✅ CORRECT: {submodule}-{artifact}/
    ├── directory-controllers/    ✅ CORRECT
    ├── directory-repositories/   ✅ CORRECT (contains ORM entities)
    ├── directory-mappers/        ✅ CORRECT (toDomain / toEntity)
    ├── directory-domain/         ✅ CORRECT (pure domain model)
    ├── directory-dto/            ✅ CORRECT
    ├── directory-types/          ✅ CORRECT
    ├── directory-constants/      ✅ CORRECT (sub-module local event constants)
    ├── directory-exceptions/     ✅ CORRECT
    └── directory-tests/          ✅ CORRECT (unit/ & harness/)
```

## 2. Highly Descriptive, AI-Contextual Filenames & Module Prefixing
Rename all controllers, services, and models to be extremely descriptive based on exactly what they do, AND they must strictly begin with the module name as a prefix.
When you tag a file for AI context (e.g., `@[Filename]`), the AI should instantly know exactly what module it belongs to and what it does, even without seeing the folder path. Duplicate filename collisions are eliminated.
- ❌ **BAD:** `auth.py`, `utils.js`, `helpers.ts`, `SearchBar.tsx`
- ✅ **GOOD:** `admin-billing-jwt-token-generator.utils.ts`, `admin-billing-stripe-payment-webhook.controller.ts`, `admin-attendance-member-registration-validator.py`
* **The Rule (CRITICAL):** Every single file name MUST begin with the parent domain/role name (e.g., `superadmin`, `manager`) followed by the module name as a prefix. This applies to EVERYTHING: modules, controllers, services, DTOs, types, constants, utilities, and tests. *(Exceptions: (1) Global configuration, constants, types, utilities, and root tooling files like `api-response.types.ts`, `database.config.ts`, or `event-registry.constants.ts` are exempt from the module prefix rule when placed in global infrastructure directories such as `src/core/`, `src/infrastructure/`, or root-level tooling folders like `scripts/`. (2) Sub-module registration files (`{submodule}.module.ts`, e.g., `members-directory.module.ts`, `attendance-dashboard.module.ts`) and documentation trio files (`{submodule}-backend-feature.md`, `{submodule}-backend-forbidden.md`, `{submodule}-backend-contract.md`) are explicitly exempt from the `[role]-` prefix rule per Rule 0H because they uniquely identify the autonomous sub-module itself.)* Just as the frontend uses `AdminBillingInvoiceSearchBox.tsx`, the backend MUST use `admin-billing-invoice-search-box.controller.ts`.
* **Component/Class Internal Naming:** The exported class name MUST exactly match the filename logic (converted to PascalCase). For example, `superadmin-auth.module.ts` must export `class SuperadminAuthModule`. `manager-auth.controller.ts` must export `class ManagerAuthController`. This prevents AI hallucination.
* **Business Folders Prefixing (CRITICAL):** NEVER use generic names for ANY structural business folders (e.g., `modules/`, `common/`, `config/`, `database/`, `utils/`, `i18n/`, `middleware/`, etc.) anywhere in the project. ALL business folders MUST be explicitly prefixed with their parent domain/role name.
  - ❌ **BAD:** `backend-superadmin/core/`, `backend-manager/modules/`, `backend-admin/config/`, `backend-trainer/utils/`
  - ✅ **GOOD:** `backend-superadmin/superadmin-core/`, `backend-manager/manager-modules/` ..etc

### Mandatory Role Container Structure (NON-OPTIONAL)

Every backend role container MUST contain exactly two top-level business directories:

- `{role}-core/`
- `{role}-modules/`

Direct feature placement under `backend-{role}/` is **forbidden**.

❌ **FORBIDDEN — AI agents MUST flag this as Architecture Violation:**
```text
backend-admin/
├── admin-core/
├── admin-auth/        <-- VIOLATION: feature directly under backend-admin/
├── admin-members/     <-- VIOLATION: feature directly under backend-admin/
└── admin-billing/     <-- VIOLATION: feature directly under backend-admin/
```

✅ **REQUIRED — the ONLY compliant structure:**
```text
backend-admin/
├── admin-core/
│
└── admin-modules/
    ├── admin-auth/
    ├── admin-members/
    └── admin-billing/
```

The `{role}-modules/` folder is **NOT optional**. All business feature modules MUST be located inside `{role}-modules/`. AI agents MUST NOT place feature modules directly under `backend-{role}/`.

### {role}-core/ Scope Restriction (CRITICAL)

The `{role}-core/` folder is strictly a **framework infrastructure container**. It MUST NOT contain any business logic, domain services, or feature helpers.

**Permitted inside `{role}-core/`:**
- Guards (e.g., JWT auth guards, roles guards)
- Decorators (e.g., `@Roles()`, `@CurrentUser()`)
- Interceptors (e.g., response interceptor, logging interceptor)
- Pipes (e.g., validation pipe wrappers)
- Middleware (e.g., tenant resolution middleware)
- Framework infrastructure (e.g., the role's root NestJS module file, `{role}-core-feature-flag.service.ts` per Rule 108 — cross-cutting flag resolution plumbing only, zero domain business logic)

**FORBIDDEN inside `{role}-core/` — Architecture Violation:**
- Any business logic service (e.g., `admin-members-suspension.service.ts`)
- Any feature-specific helper (e.g., `admin-billing-helper.ts`)
- Any repository (e.g., `admin-auth.repository.ts`)
- Any DTO (e.g., `admin-members-create.dto.ts`)
- Any entity or domain model

```text
❌ VIOLATION:
admin-core/
├── admin-guards/
├── admin-members-suspension.service.ts   <-- business logic FORBIDDEN in core
└── admin-billing-helper.ts              <-- feature helper FORBIDDEN in core

✅ COMPLIANT:
admin-core/
├── admin-guards/
│   └── admin-core-jwt-auth.guard.ts
├── admin-decorators/
│   └── admin-core-current-user.decorator.ts
├── admin-interceptors/
│   └── admin-core-response.interceptor.ts
└── admin-core.module.ts
```

* **Global Infrastructure Exception:** The ONLY allowed generic un-prefixed folders are `src/core/` and `src/infrastructure/` which contain NO business logic, only pure framework plumbing (see Rule 10 Edge Case C). These root-level generic folders may contain standard un-prefixed sub-folders (like `src/core/utils/`, `src/core/dtos/`, `src/core/config/`) provided they are strictly global and cross-cutting. Never put business logic in these generic folders.
  
  **Canonical Mandatory Backend Structure — Complete Physical Sub-Module Tree:**

  > The following structure is mandatory. Any deviation is considered architecture non-compliant. AI agents MUST use this tree as the reference template when generating any backend role module.

  ```text
  backend-admin/
  │
  ├── admin-core/                                          <-- Role-level framework infrastructure ONLY
  │   ├── admin-guards/
  │   │   └── admin-core-jwt-auth.guard.ts                <-- RESPONSIBILITY + FLOW comment required
  │   ├── admin-decorators/
  │   │   └── admin-core-current-user.decorator.ts
  │   ├── admin-interceptors/
  │   │   └── admin-core-response.interceptor.ts
  │   └── admin-core.module.ts                            <-- Role root NestJS module
  │
  └── admin-modules/                                      <-- ALL feature domain modules live here
      │
      ├── admin-attendance/                               <-- Domain Module (Domain Quarantine)
      │   ├── admin-attendance.module.ts                  <-- Pure Aggregator NestJS Module (imports child sub-modules)
      │   ├── admin-attendance-backend-feature.md         <-- Master Domain Documentation
      │   ├── admin-attendance-backend-forbidden.md       <-- Master Domain Invariants
      │   │
      │   ├── attendance-dashboard/                       <-- Autonomous Sub-Module (AI Repair Unit)
      │   │   ├── dashboard-controllers/
      │   │   │   ├── admin-attendance-dashboard-command.controller.ts  <-- Mutations (POST/PATCH/DELETE)
      │   │   │   └── admin-attendance-dashboard-query.controller.ts    <-- Queries (GET)
      │   │   ├── dashboard-services/
      │   │   │   ├── admin-attendance-dashboard-metrics.service.ts
      │   │   │   └── admin-attendance-dashboard-orchestrator.service.ts<-- Orchestrator: opens TX, coordinates services
      │   │   ├── dashboard-repositories/
      │   │   │   ├── admin-attendance-dashboard-read.repository.ts     <-- Concern-based split (Rule 7)
      │   │   │   └── admin-attendance-dashboard-write.repository.ts
      │   │   ├── dashboard-mappers/
      │   │   │   └── admin-attendance-dashboard.mapper.ts              <-- toDomain() / toEntity() ONLY
      │   │   ├── dashboard-domain/
      │   │   │   └── admin-attendance-dashboard.domain.ts              <-- Pure domain model — zero ORM imports
      │   │   ├── dashboard-dto/
      │   │   │   ├── admin-attendance-dashboard-filter.dto.ts
      │   │   │   └── admin-attendance-dashboard-summary-response.dto.ts
      │   │   ├── dashboard-types/
      │   │   │   └── admin-attendance-dashboard.types.ts
      │   │   ├── dashboard-constants/
      │   │   │   └── admin-attendance-dashboard.constants.ts
      │   │   ├── dashboard-exceptions/
      │   │   │   └── admin-attendance-dashboard.exceptions.ts
      │   │   ├── dashboard-locales/
      │   │   │   ├── en/
      │   │   │   │   ├── admin-attendance-dashboard-errors.json
      │   │   │   │   └── admin-attendance-dashboard-messages.json
      │   │   │   └── hi/
      │   │   │       ├── admin-attendance-dashboard-errors.json
      │   │   │       └── admin-attendance-dashboard-messages.json
      │   │   ├── dashboard-tests/
      │   │   │   ├── unit/
      │   │   │   │   └── admin-attendance-dashboard-metrics.service.spec.ts
      │   │   │   └── harness/                                      <-- Standalone Run & Test Harness
      │   │   │       ├── attendance-dashboard.harness.ts
      │   │   │       └── attendance-dashboard.seed.ts
      │   │   ├── attendance-dashboard.module.ts                    <-- Sub-module NestJS definition
      │   │   ├── attendance-dashboard-backend-feature.md           <-- MANDATORY: 22 canonical sections
      │   │   ├── attendance-dashboard-backend-forbidden.md         <-- MANDATORY: sibling isolation & WET rules
      │   │   └── attendance-dashboard-backend-contract.md          <-- MANDATORY: exposed contracts
      │   │
      │   └── attendance-history/                         <-- Autonomous Sub-Module (AI Repair Unit)
      │       ├── history-controllers/
      │       ├── history-services/
      │       ├── history-repositories/
      │       ├── history-dto/
      │       ├── history-tests/
      │       │   ├── unit/
      │       │   └── harness/
      │       ├── attendance-history.module.ts
      │       ├── attendance-history-backend-feature.md
      │       ├── attendance-history-backend-forbidden.md
      │       └── attendance-history-backend-contract.md
      │
      └── admin-members/                                  <-- Another feature domain module (same pattern)
          ├── admin-members.module.ts                     <-- Pure Aggregator NestJS Module
          ├── admin-members-backend-feature.md
          ├── admin-members-backend-forbidden.md
          ├── members-directory/                          <-- Autonomous Sub-Module
          │   ├── directory-controllers/
          │   ├── directory-services/
          │   ├── directory-dto/
          │   ├── directory-repositories/
          │   ├── directory-tests/
          │   ├── members-directory.module.ts
          │   ├── members-directory-backend-feature.md
          │   ├── members-directory-backend-forbidden.md
          │   └── members-directory-backend-contract.md
          └── members-registration/                       <-- Autonomous Sub-Module
              └── ... (identical canonical micro-structure)
  ```

### Mandatory Autonomous Sub-Module Structure

> ⛔ **UNIVERSAL SUB-MODULE ISOLATION LAW:**
> Under the Universal Day-1 Sub-Module Architecture (Rule 0A.2), ALL implementation code lives inside autonomous sub-modules (`{sub-module}/`).
> Placing loose controllers, services, repositories, or DTOs directly at the domain module root is a **CRITICAL ARCHITECTURE VIOLATION**.
> Domain module root contains ONLY the pure aggregator module (`[role]-[domain].module.ts`), master documentation, and child sub-module folders.

Every autonomous sub-module MUST contain ALL of these sub-folders:
- `{submodule}-controllers/` — REQUIRED — STOP if absent
- `{submodule}-services/` — REQUIRED — STOP if absent
- `{submodule}-repositories/` — REQUIRED — STOP if absent
- `{submodule}-dto/` — REQUIRED — STOP if absent
- `{submodule}-types/` — REQUIRED — STOP if absent
- `{submodule}-constants/` — REQUIRED — STOP if absent
- `{submodule}-exceptions/` — REQUIRED — STOP if absent
- `{submodule}-domain/` — REQUIRED — STOP if absent (Rule 89 domain/entity separation depends on this)
- `{submodule}-mappers/` — REQUIRED — STOP if absent (Rule 89 mapper pattern depends on this)
- `{submodule}-tests/` — REQUIRED — STOP if absent (MUST contain `unit/` and `harness/` for standalone execution)

Conditionally required (MUST exist when the sub-module has the corresponding artifact — absence when the artifact exists = VIOLATION):
- `{submodule}-locales/` — REQUIRED when the sub-module has user-facing error/message strings (Rule 107)
- `{submodule}-jobs/` — REQUIRED when the sub-module has background jobs (Rule 23, Rule 42)
- `{submodule}-adapters/` — REQUIRED when the sub-module calls external services (Rule 8 Edge Case D)

> **An AI creating an autonomous sub-module MUST create all REQUIRED folders even if they start empty.** Empty sub-folders with a `.gitkeep` file satisfy the structure requirement. Missing folders violate Rules 0A.2, 0F, 0G-D, and 0H.

## 3. Strict Validation & DTO Isolation
Never mix data validation logic (checking if email is valid, password length) with business logic (saving to DB). 
Extract all validation logic (NestJS: Class-Validator DTOs, Django: Forms/Serializers, Config: Zod) into their own isolated files.
- **Why?** If the business logic is fine but the API is rejecting a payload, you only feed the AI `admin-members-create.dto.ts`. The AI won't even see the database logic, guaranteeing 0% chance of breaking the database flow.

## 4. Interface & Type Isolation (The AI's Blueprint)
AI relies heavily on data shapes to write correct code. If the AI knows the exact shape of a `User` or a `PaymentPayload`, it doesn't need to see the database schema or the entire service file.
* **The Rule:** Extract all TypeScript `Interfaces` or `Types` into a dedicated file inside a prefixed types folder (e.g., `billing-types/admin-billing-payment-payload.type.ts`). Never dump them inline or use generic `interfaces.ts` files.
* **Why?** When you want the AI to write a new function, you just feed it the `interfaces` file. The AI instantly knows exactly what properties are available without having to read 500 lines of implementation code.

## 5. Centralized Constants (Single Source of Truth)
Find all hardcoded strings, error messages, magic numbers, and default config values scattered across your backend. Extract them into a module-level `[role]-[module].constants.ts` (or `[role]-[module]-constants.py`).
- ❌ **BAD:** `throw new Error("User age must be over 18")`
- ✅ **GOOD:** `throw new Error(MEMBER_ERRORS.AGE_RESTRICTION)`
- **Why?** Tomorrow, if the business requirement changes from 18 to 21, or if you need to translate error messages to a different language, you only feed the AI `admin-members.constants.ts`. The business logic remains untouched.

## 6. Centralized Custom Exceptions
Handling errors with generic `throw new Error()` makes it hard for AI to write precise unit tests or generic error handlers.
* **The Rule:** Create specific exception classes in an `[role]-[module].exceptions.ts` file (e.g., `class InsufficientFundsException extends Error`).
* **Why?** If an AI is writing an Express error-handling middleware, providing the `exceptions.ts` file gives it a perfect, safe map of every possible error state it needs to catch and format for the frontend.

## 7. Isolated Database/Query Layer (The Repository Pattern)
Never write massive, complex raw SQL or 50-line ORM queries directly inside your business logic services.
Extract complex queries into a dedicated Repository or Query file.
* **The Rule:** The project has a fixed ORM per supported framework. The repository pattern is mandatory.
  - NestJS / TypeScript → TypeORM + PostgreSQL.
  - Django / Python → Django ORM + PostgreSQL.
  - No second ORM is permitted.
  - Prisma is not permitted in this project.
  - ORM-specific implementation MUST remain behind the repository/data-access boundary so business services do not become coupled to ORM-specific APIs.
- **Why?** If the dashboard stats are calculating incorrectly, it's a database query issue. You provide the AI the `repository` file, not the `service` file.

### Repository Naming Standard (MANDATORY)

> **CONCERN-BASED SPLITTING IS THE DEFAULT REQUIRED PATTERN.**
> A single monolithic repository is a **last resort for extremely simple modules only** — it MUST be justified in the module's `-backend-feature.md` if used. Undocumented single-repo modules are treated as non-compliant.
> **Consequence of monolithic repositories:** A 400-line repository cannot be handed to an AI in isolation — token explosion causes hallucination and collateral damage to unrelated query methods.

All modules with more than trivial query complexity MUST split repositories by concern (read, write, search, analytics).

✅ **Required Concern-Based Splitting (DEFAULT):**
- `{role}-{module}-read.repository.ts`
- `{role}-{module}-write.repository.ts`
- `{role}-{module}-search.repository.ts` (when complex search exists)
- `{role}-{module}-analytics.repository.ts` (when analytics queries exist)

A single `{role}-{module}.repository.ts` is ONLY permitted for modules with fewer than 5 total query methods. Any repository exceeding 200 lines MUST be split immediately (see Rule 75 file size ceiling).

**Anti-Fragmentation Rule:**
Concern-based splitting is the default. However, **method-level over-fragmentation is strictly forbidden.** You cannot create a repository for a single find method.

❌ **Forbidden Over-Fragmentation:**
- `member-find-by-id.repository.ts`
- `member-find-by-email.repository.ts`
- `member-find-active.repository.ts`
- `member-update-name.repository.ts`
- `member-delete.repository.ts` (this is method-level fragmentation)

❌ **Forbidden Naming Violations:**
- `member-query.repository.ts` ("query" suffix reserved for CQRS controllers)
- `member.repository.ts` (missing role prefix)

All repositories MUST live inside the module's `{module}-repositories/` sub-folder.

---


> **MODE A (CREATE) STACK BASELINE:** Before creating any backend module in Mode A, the AI MUST read and confirm the project stack from the architecture document or the prompt inputs. Required: (1) ORM + DB engine, (2) message broker/queue, (3) Redis use, (4) auth mechanism, (5) path alias (e.g., `@/`), (6) migration tool. If any of these are not explicitly specified, the AI MUST raise a MISSING_STACK_DEFINITION error before writing any code. Do NOT guess.

## 8. Handling Edge Cases & Complex Scenarios

### Edge Case A: Cross-Module Dependencies (Tight Coupling)
*Scenario:* The `MemberRegistrationService` needs to trigger the `FinanceService` to generate an invoice, and the `EmailService` to send a welcome email. If they are tightly coupled, the AI will need all three files to understand the flow.
*Solution:* **Event-Driven Architecture (Pub/Sub).**
The `MemberRegistrationService` should only save the user and emit an event: `EventBus.emit('MEMBERS.MEMBER.REGISTERED', user)

For events that require durable delivery or cross-instance processing, the application event contract MUST be backed by Redis Streams.

In-process event emitters MUST NOT be treated as the durable transport for critical domain events.

Redis Pub/Sub is reserved for transient real-time fan-out and MUST NOT replace Redis Streams for durable events. The Finance and Email modules listen to this event independently. Now, the modules are 100% decoupled.

### Edge Case A.1: Transactional Outbox for Durable Domain Events

A database mutation and publication of its critical domain event must never rely on two separate non-atomic operations.

Forbidden flow:
1. Save database record
2. Commit transaction
3. Publish Redis Stream event
4. Process crashes before publish (Permanent Event Loss)

Required flow:
1. Start database transaction.
2. Perform domain mutation.
3. Insert a versioned event record into an `events_outbox` table in the same transaction.
4. Commit once.
5. A dedicated outbox relay worker publishes pending events to Redis Streams.
6. Mark the outbox event as published only after publish acknowledgement.
7. Consumers must be idempotent because delivery is at-least-once, not exactly-once.

Every critical event must include:
- `eventId`: UUID v4
- `eventName`: Standardized screaming snake case event name
- `eventVersion`: Monotonically increasing schema version
- `tenantScope`: `gymId` and `branchId` (where applicable)
- `aggregateId`: Primary entity ID
- `occurredAt`: ISO 8601 UTC timestamp
- `correlationId`: Request tracking ID
- `payload`: Versioned event JSON payload

Redis Streams provide durable delivery. The transactional outbox prevents the database/event dual-write failure before the event reaches Redis Streams.

### Edge Case B: Database Transactions (All-or-Nothing Operations)
*Scenario:* You split your logic into `BillingService` and `MembershipService`. But creating a member and charging their card MUST happen in the same database transaction.
*Solution:* **Orchestrator Pattern with UnitOfWork Abstraction.** 
Create a higher-level "Facade" or "Orchestrator" whose ONLY job is to open a transaction, call the sub-services passing a `TransactionContext` or `UnitOfWork` abstraction, and commit/rollback. The sub-services themselves must remain pure and decoupled from the raw ORM transaction object. Direct passing of an ORM-specific `tx` object leaks the ORM abstraction into the business service layer.

```text
Orchestrator
   ↓
TransactionContext / UnitOfWork abstraction
   ↓
Repositories
   ↓
ORM
```

#### Orchestrator Naming Convention (MANDATORY)

All Orchestrators MUST use the following naming pattern — no exceptions:

```
{role}-{module}-orchestrator.service.ts
```

**Examples:**
- `admin-members-orchestrator.service.ts`
- `manager-billing-orchestrator.service.ts`
- `superadmin-gyms-orchestrator.service.ts`

❌ **FORBIDDEN orchestrator names — AI agents MUST NOT use these:**
- `facade.service.ts`
- `workflow.service.ts`
- `transaction-handler.service.ts`
- `admin-members-transaction.service.ts`
- `admin-members.facade.ts`

The exported class MUST follow PascalCase matching the filename: `admin-billing-orchestrator.service.ts` → `class AdminBillingOrchestratorService`.

Orchestrators MUST live inside the module's `{module}-services/` sub-folder alongside other sub-services.

### Module Registration & Aggregator Rule

Under the Universal Day-1 Sub-Module Architecture (Rule 0A.2):
1. **Domain Aggregator Module:** Every domain module root (`admin-members/`, `manager-attendance/`) MUST contain exactly one pure aggregator module:
   - Pattern: `{role}-{domain}.module.ts` (e.g., `admin-members.module.ts`, `manager-attendance.module.ts`).
   - Responsibility: Imports and aggregates child sub-module NestJS modules. Contains zero controllers, services, or repositories directly.
2. **Autonomous Sub-Module Module:** Inside each autonomous sub-module directory, there is exactly one sub-module registration file:
   - Pattern: `{submodule}.module.ts` (e.g., `attendance-dashboard.module.ts`, `attendance-history.module.ts`, `members-directory.module.ts`).
   - Responsibility: Bundles and registers controllers, services, repositories, and local providers for that specific sub-module.
3. Multiple NestJS module definition files within a single sub-module directory are strictly forbidden.

### Edge Case C: Shared Utility Bloat (The "No Common Folder" Rule)
*Scenario:* Developers dump code into a global `utils/`, `common/`, or `shared/` folder to adhere to the DRY (Don't Repeat Yourself) principle. 
*Solution:* **WET over DRY for AI (Write Everything Twice).**
Strictly ban global `common/` or `shared/` folders. If a helper, enum, or type is used by the Billing module, put it in `backend-manager/manager-modules/manager-billing/billing-invoices/invoice-mappers/` (or `invoice-constants/`, `invoice-types/` respectively). If the Attendance module needs the exact same helper, **duplicate the code** into `backend-admin/admin-modules/admin-attendance/attendance-dashboard/dashboard-mappers/`. 
* **Crucial Clarification (Domain vs Sub-Module WET Law):** Under the Universal Day-1 Sub-Module Architecture, WET duplication applies strictly at the **sub-module level**. No shared folder is allowed at ANY level — neither at domain level (e.g., `manager-attendance/common/`, `manager-attendance/shared/`, or `manager-attendance/services/` is strictly banned) nor between sibling sub-modules (e.g., `attendance-dashboard/` vs `attendance-history/`). If both `attendance-dashboard` and `attendance-history` need a date formatter, member query helper, or status enum, each gets its own independent copy locally inside its own sub-module directory. There is NO `attendance/common/` or `attendance/shared/` folder.
* **Why?** In an AI-driven codebase, code repetition is entirely acceptable because AI writes the code. If we use a shared folder, an AI might modify a shared function to fix a bug in HR or Dashboard, inadvertently breaking the Finance or History sub-module. Complete sub-module isolation guarantees 0% cross-submodule side effects.

> ⛔ **ABSOLUTE PROHIBITION — AI AGENTS:**
> **NEVER move business logic, utilities, or services to global folders like `src/shared/` or domain-level folders like `manager-attendance/common/`.**
> **Consequence of violation:** AI modifying a shared function to fix sub-module A will silently break sub-module B — this is architecturally FORBIDDEN and constitutes scope expansion (Invariant 3 violation).
> **Anything containing domain-specific business behavior MUST be duplicated per sub-module, NEVER globalized.**
> **Finding a `src/shared/`, `src/common/`, or domain-level `attendance/common/` folder with business logic = immediate `NON_COMPLIANT` — record it, do not touch the file, request owner decision.**
> Only pure infrastructure plumbing (database connection pools, global interceptors, guards — see infrastructure exception below) belongs in `src/core/` or `src/infrastructure/`.
* **Infrastructure Exception (Framework-Level vs Business-Logic-Level):** The WET-over-DRY / no-shared-folder rule applies strictly to **BUSINESS LOGIC utilities** (domain-specific helpers, formatters, validators). It does **NOT** apply to genuine framework-level infrastructure that every module is architecturally required to **extend OR consistently reference for correctness** (i.e., a single shared registry or config that MUST stay identical across all modules to function correctly — duplicating it would produce inconsistency, not isolation) — e.g. `BaseEntity` (Rule 58), the global `ResponseInterceptor` (Rule 28), `RolesGuard`/`@Roles()` decorator (Rule 83), the structured logger (Rule 14), `AsyncLocalStorage` context propagation (Rule 57), the centralized rate-limit tiers config (Rule 44), the event-registry constants (Rule 50), the Feature Flag Service (Rule 108), and the global database connection pool config (Rule 63). These live in a single, clearly-named `src/core/` or `src/infrastructure/` folder — **NOT** `src/shared/` or `src/common/` (to avoid becoming a dumping ground). This folder is intentionally small, framework-plumbing-only, and rarely touched — it does not carry the same "AI breaks module B while fixing module A" risk because it contains **no business logic**, only structural contracts that every module must extend or reference by architectural design.

### Edge Case D: External Service Adapters (Anti-Corruption Layer)
*Scenario:* When your backend talks to the outside world (Stripe, AWS S3, SendGrid), never put the `axios.post()` or SDK calls directly inside your business logic.
*Solution:* **Create an isolated wrapper or "Adapter"** for third-party tools (e.g., `admin-stripe-payment.adapter.ts`). Your core service should only call generic methods like `paymentAdapter.charge()`.
* **Why?** If Stripe changes their API version, you only give the AI the `admin-stripe-payment.adapter.ts` file. The AI fixes the API call without ever seeing (or risking breaking) your internal checkout logic.

## 9. Avoid Hardcoded HTTP Status Codes

> **MANDATORY — NO EXCEPTIONS.** Hardcoded numeric HTTP status codes are forbidden in ALL files including controllers, exceptions, responses, tests, and seeders.
> **Consequence of violation:** Typos in status codes (e.g., `401` instead of `403`) cause silent auth/authz failures that are impossible to detect by static analysis and produce misleading error messages in production.

Never hardcode HTTP status code numbers (e.g., `200`, `400`, `500`) in controllers, exceptions, or responses.
* **The Rule:** ALWAYS use the framework-provided enum — no alternatives:
  - NestJS: `HttpStatus` from `@nestjs/common` (e.g., `HttpStatus.OK`, `HttpStatus.CREATED`)
  - Django: `rest_framework.status` (e.g., `status.HTTP_200_OK`, `status.HTTP_201_CREATED`)
* **Testing Rule:** This rule applies to EVERY test file without exception. In Python `pytest` suites, ALWAYS use `from http import HTTPStatus` (e.g., `HTTPStatus.OK`, `HTTPStatus.CREATED`). A raw `assert response.status_code == 200` in a test file = architecture violation.
* **Source Code vs Wire Serialization Clarification:** In TypeScript and Python source code, hardcoding integer status codes is strictly forbidden (use `HttpStatus.CREATED`, `HttpStatus.BAD_REQUEST`, etc.). Wire JSON payloads over HTTP network transport serialize these enums to their integer wire representations (`201`, `400`). Documentation examples showing JSON payloads illustrate the serialized wire representation, but in actual source code, `HttpStatus` enum MUST always be referenced.
* **Audit Evidence Required:** When auditing, flag every occurrence of a raw integer HTTP status code in source code as `NON_COMPLIANT`.

## 10. Dynamic / Absolute Imports (No Hardcoded Relative Paths)
*(Applicable to JavaScript/TypeScript Frameworks)*
Never use fragile, hardcoded relative imports (e.g., `../../../utils/helpers`). 
* **The Rule:** Configure the backend framework to use absolute path aliases (e.g., mapping `@/` to the `src/` directory). Always use absolute/aliased imports with `@/` (or your configured alias) instead of traversing directories up and down with `../..`.
* **Why?** It prevents import paths from breaking when files are refactored, moved, or copy-pasted, drastically improving the ability for AI to generate drop-in code without path hallucinations.

---

---

## Django Framework Reference Appendix

For Non-NestJS projects, strictly adhere to the role and module isolation principles. Regardless of the framework, do NOT use generic structural folders like `dtos/`, `services/`, or `controllers/`. File naming MUST follow the role-prefix convention (e.g., `admin-billing-invoice.views.py`).

*(Note: In non-NestJS frameworks like Django, framework-native file naming such as `models.py` or `serializers.py` is permitted, but generic sub-folders must still be module-prefixed.)*

### In Django (Python) — Reference Only
- Avoid massive `views.py`. Create a `my-module-views/` folder and split class-based views into individual files (e.g., `admin-member-registration-view.py`).
- Avoid "fat models". Move complex business logic from `models.py` into a `my-module-services/` directory.
- Keep `serializers.py` strictly for validation and data formatting.


## 11. Co-located Unit & Integration Tests vs Centralized E2E Smoke Suite
Never put unit or integration tests in a global `tests/` directory separate from the application code.
* **The Rule:** Unit and integration tests (`.spec.ts`) and local test harnesses (`harness/`, `fixtures/`) MUST live directly inside the autonomous sub-module under `{submodule}-tests/` (e.g., `admin-members-registration.service.spec.ts`). Conversely, cross-system black-box E2E API tests are written in Python pytest and live in a separate top-level `backend-e2e/` directory (see Rule 27). Do NOT co-locate pytest files inside the NestJS module folders.
* **Why?** When an AI is asked to add a feature or fix a bug in a zipped sub-module, providing the co-located `{submodule}-tests/` folder gives it 100% of the unit-test and harness context needed to verify fixes locally. The pytest E2E suite verifies cross-system behavior in staging/CI completely decoupled from the Node.js runtime.


## 12. Strict API Documentation (Swagger/OpenAPI)
* **The Rule:** Every endpoint MUST be documented using the framework's native OpenAPI/Swagger tools (e.g., `@ApiTags` and `@ApiResponse` in NestJS, `drf-spectacular` in Django).
* **Why:** AI relies heavily on interface contracts. Keeping them mandatory and co-located with the controllers ensures frontend developers (and AI frontend agents) always have a mathematically accurate, up-to-date API contract to work with.

## 13. Environment & Configuration Management
* **The Rule:** Never use raw environment variables (e.g., `process.env.XXX` or `os.environ.get()`) directly inside business logic. Always use a centralized, strongly-typed Config Service or Settings class (e.g., `@nestjs/config` in NestJS, `settings.py` with `django-environ` in Django). The configuration service MUST validate all environment variables at application startup using a strict schema (e.g., Zod or `class-validator`). The app must throw a fatal error and refuse to boot if any required environment variable is missing or incorrectly typed.
* **Why:** If the AI needs to add a new third-party API key or change a timeout value, it should only modify the central configuration schema, not hunt for raw env calls scattered across dozens of different services.

## 14. Standardized Logging & Correlation IDs (nestjs-pino / Python structured logging & OpenTelemetry)
* **The Rule:** Never use raw print statements (e.g., `console.log()` or `print()`). The approved loggers per framework are:
  - NestJS: **`nestjs-pino`** (wrapping `pino`). Do not use Winston or any other logger.
  - Django: Python structured logging using the project's approved structured logging configuration. Do not use ad-hoc `print()` calls.

  Both MUST provide: request ID, trace ID, span ID, tenant context where permitted, route, status, response time, and redaction rules.
* **The Log Structure:** Every log entry must automatically attach the current execution context. A standard log output must include:
  - `method` (HTTP method: GET, POST, PATCH, etc.)
  - `route` / `path` (the matched route template, e.g., `/api/v1/members/:id` — **not** the raw URL with substituted values)
  - `statusCode` (HTTP response status)
  - `requestId` (unique per-request UUID, injected at the middleware boundary)
  - `tenantId` (where permitted by data privacy policy — never log tenant-specific personal data alongside it)
  - `traceId` and `spanId` (injected via OpenTelemetry/AsyncLocalStorage)
  - `context` (the exact class or service name emitting the log, e.g., `AdminMembersRegistrationService`)
  - `responseTime` (milliseconds, for access logs)
* **What MUST NEVER appear in any log line:**
  - Raw `req` or `res` objects — these contain auth headers, cookies, request bodies, and response bodies by default.
  - `Authorization` header, Bearer tokens, API keys, session tokens, refresh tokens.
  - Passwords, PINs, OTPs, biometric data, or any credential.
  - Request or response body payloads (even sanitized partials — if in doubt, omit).
  - Raw PII: full phone numbers, Aadhaar numbers, bank account numbers, card numbers, email addresses (partial masking per Rule 35 is the only exception where explicitly required).
* **Why:** When logs are pushed to an aggregator like Datadog, ELK, or CloudWatch, developers can simply search for `traceId="b8174fe8b671..."` to instantly pull up the exact journey of a request across 15 different micro-files. This rule also ensures that a single misconfigured log line cannot constitute a data breach. Standardized loggers also allow global turning on/off of debug statements.


## 15. Dependency Injection & Inversion of Control
* **The Rule:** Avoid instantiating complex service classes directly using `new MyService()` or `MyService()`. Rely on the framework's Dependency Injection system if it has one (NestJS), or construct dependencies at the highest possible level (module/route boundaries) and pass them in.
* **Why:** AI might take shortcuts and manually instantiate classes inside business logic, creating tight coupling. Enforcing Dependency Injection ensures that tests can easily mock out databases, external APIs, and child services.

## 16. Module-Specific API Collections (Postman/Insomnia)
* **The Rule:** Whenever a module is created or finalized, generate a `[role]-[module]-collection.json` file directly inside the module's folder (e.g., `backend-admin/admin-modules/admin-auth/admin-auth-collection.json`). 
* **Why:** This ensures that any developer (or human QA) can instantly import this JSON into Postman and manually test the module's endpoints without having to manually construct the headers, payloads, or figure out the routes. It provides immediate, highly-accessible testing verification.

## 17. Standardized Pagination, Sorting & Filtering (Enterprise Scale - Backend Driven)
* **The Rule:** Any endpoint that returns tabular or list data (e.g., Orders, Members) MUST ALWAYS support backend-driven pagination, sorting (e.g., `sortOrder=ASC/DESC`), and filtering (e.g., `startDate`, `endDate`, `search`, `status`). Never return raw, unpaginated lists if the dataset can grow large. *(Exception: Bounded/non-paginated lookup endpoints are exempt, and should not return pagination metadata as per Rule 28.)*
* **The "No Frontend In-Memory Filtering" Mandate:** The backend MUST provide dedicated query parameters for every search box, dropdown filter, and date picker on the UI. The frontend is STRICTLY FORBIDDEN from fetching a massive array of 5,000 records and using JavaScript `.filter()` or `.sort()` in memory. All searching (`ILIKE` / Full Text) and filtering (`WHERE` clauses) MUST be executed by the database via the backend API.
* **Implementation:** Always use a standardized wrapper or query DTO (e.g., `limit/offset` based pagination extended with filtering/sorting properties) across all controllers. For example, a search box triggers `?search=john&page=1`, which the backend maps to an SQL `ILIKE '%john%'` query.
* **Why:** Returning thousands of unfiltered rows crashes browsers and creates severe security/performance issues. If the AI is asked to add an endpoint for `MemberAnalytics` or `Orders`, it must proactively build in sorting, searching, and date filtering capabilities so the frontend can display robust, server-driven table controls.

## 18. Strict ES Modules (No `require`)
*(Applicable to JavaScript/TypeScript Frameworks)*
* **The Rule:** Never use the `require()` keyword. It is considered dead/legacy in this architecture. You must exclusively use ES module `import` and `export` statements.
* **Why:** ES Modules are the modern standard, they provide strict typing compatibility out of the box in TypeScript, support better static analysis/tree-shaking, and ensure consistent import syntax across the entire codebase.

## 19. Module-Level Feature Documentation
*(Crucial for AI Context & Onboarding)*
* **The Rule:** Under the Universal Day-1 Sub-Module Architecture (Rule 0A.2), every autonomous backend sub-module MUST contain its dedicated **Autonomous Sub-Module Documentation Trio** directly inside its directory (e.g., `src/backend-manager/manager-modules/manager-attendance/attendance-dashboard/`):
  1. `[role]-[submodule]-backend-feature.md` (or `_backend-feature.md`) — Master architectural map containing ALL 22 Canonical Sections.
  2. `[role]-[submodule]-backend-forbidden.md` (or `_backend-forbidden.md`) — Concrete, sub-module-specific forbidden anti-patterns and boundary invariants.
  3. `[role]-[submodule]-backend-contract.md` (or `_backend-contract.md`) — Frozen API, DTO, and domain event contract definitions.
* **Why:** Before an AI or a new human developer makes any changes to a sub-module, they read this trio first. It acts as the ultimate localized context guide, instantly explaining the routing, file responsibilities, database queries, and invariants, drastically reducing the risk of hallucination or breaking existing architecture.

### Documentation Placement Rule

The Documentation Trio MUST exist directly inside each autonomous sub-module root:
- `{submodule}-backend-feature.md` (or `_backend-feature.md`)
- `{submodule}-backend-forbidden.md` (or `_backend-forbidden.md`)
- `{submodule}-backend-contract.md` (or `_backend-contract.md`)

Master domain-level documentation (`[role]-[domain]-backend-feature.md`, `[role]-[domain]-backend-forbidden.md`) lives at the parent domain root.

These files MUST NOT be placed inside:
- `docs/`
- `documentation/`
- `wiki/`

### Documentation Quality Standard

**The purpose of `-backend-feature.md` is that an AI given ONLY that file + the sub-module folder can fully understand, modify, test, or debug the sub-module without reading anything else. Generic boilerplate defeats this entirely.**

#### ❌ BAD — What AI agents produce without quality enforcement:
```markdown
## Module Purpose
Handles billing operations.

## Feature Inventory
| Endpoint | Path | Description | DTO |
|---|---|---|---|
| POST /billing/charge | /billing/charge | Handles charging | AdminBillingChargeCreateDto |

## Edge Cases / AI Warnings
- TBD
- Do not bypass the Orchestrator.
```
*Why this fails: "Handles billing operations" tells an AI nothing. "TBD" is worse than no doc. "Do not bypass the Orchestrator" with no context is unactionable.*

#### ✅ GOOD — What every `-backend-feature.md` must look like:
```markdown
## Module Purpose
Processes all wallet top-ups, plan purchases, and refunds for gym members.
Wallet balance is stored in paise (integer). All mutations go through
AdminBillingOrchestratorService to guarantee atomic DB + audit log writes.
Never call AdminBillingWalletRepository directly from outside this module.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `AdminBillingWalletCommandController` | POST | `/billing/wallet/topup` | Top up member wallet with real currency | `AdminBillingWalletTopupDto` | `AdminBillingWalletTopupResponseDto` |
| `AdminBillingPlanCommandController` | POST | `/billing/plans/purchase` | Purchase a membership plan | `AdminBillingPlanPurchaseDto` | `AdminBillingPlanPurchaseResponseDto` |

## Edge Cases / AI Warnings
- Wallet deductions use pessimistic locking (Rule 41) — never remove the
  SELECT FOR UPDATE or concurrent requests will produce negative balances.
- Plan purchase and wallet deduction MUST be in the same transaction
  (AdminBillingOrchestratorService) — splitting them causes partial charge bugs.
- Idempotency-Key header is mandatory on /wallet/topup (Rule 103) —
  removing it will cause double-charges on network retries.
```
*Why this works: An AI can read this and immediately know the invariants, the danger zones, and exactly which rules apply — without reading a single source file.*

**Failure Conditions — A `-backend-feature.md` FAILS quality review if it contains:**
- Any section with "TBD" or "N/A" as the entire content
- Module Purpose under 3 sentences
- Edge Cases with fewer than 3 concrete, module-specific entries
- Generic warnings not tied to a specific rule number (e.g., "be careful with transactions" with no Rule citation)
- Feature Inventory rows where Purpose column is just "Handles X"
- Missing any of the 22 Canonical Sections

**Documentation Freshness Rule:** `-backend-feature.md` MUST be updated in the same commit as any code change to the module. A stale feature doc is worse than no doc — it actively misleads AI agents.

---

### Mandatory `[role]-[submodule]-backend-feature.md` Template (22 Canonical Sections)

Every autonomous backend sub-module MUST implement ALL 22 canonical sections below:

```markdown
---
feature: "[role]_[submodule]"
owner_role: "[role]"
module_version: "1.0.0"
api_contract_source: "[role]-[submodule]-backend-contract.md"
last_verified_date: "2026-10-23"
last_verified_commit: "HEAD"
documentation_status: "COMPLETE"
portability_score: "10/10"
---

# [Role] [Sub-Module Name] Backend Feature Map

## 1. Scope and Non-Scope
- **In-Scope**: [REQUIRED: 3+ concrete bullet points defining exact API capabilities owned by this sub-module]
- **Non-Scope / Delegated**: [REQUIRED: Capabilities explicitly owned by other sub-modules or services — e.g., auth verification handled by JwtAuthGuard, payments delegated to payment adapter]

## 2. Sub-Module Directory & Component Inventory
| Directory / File | Type | Responsibility |
|---|---|---|
| `{submodule}-controllers/[role]-[submodule]-command.controller.ts` | Command Controller | Handles write mutations (POST/PATCH/DELETE) |
| `{submodule}-controllers/[role]-[submodule]-query.controller.ts` | Query Controller | Handles read queries (GET) |
| `{submodule}-services/[role]-[submodule]-orchestrator.service.ts` | Orchestrator | Coordinates transactions and domain sub-services |
| `{submodule}-services/[role]-[submodule]-[desc].service.ts` | Domain Service | Encapsulates specific business calculation or logic |
| `{submodule}-repositories/[role]-[submodule]-read.repository.ts` | Read Repository | Executes parameterized read queries & joins |
| `{submodule}-repositories/[role]-[submodule]-write.repository.ts` | Write Repository | Executes transactional mutations with tenant scoping |
| `{submodule}-dto/[role]-[submodule]-[desc].dto.ts` | Validation DTO | Class-validator request payloads |
| `{submodule}-mappers/[role]-[submodule].mapper.ts` | Data Mapper | Pure bidirectional toDomain() and toEntity() transforms |
| `{submodule}-domain/[role]-[submodule].domain.ts` | Domain Model | Framework-free pure domain entities |
| `{submodule}-tests/harness/[submodule].harness.ts` | Test Harness | Standalone execution harness with seeders |

## 3. Controller & Endpoint Inventory
| Controller | Method | Path | Purpose | Status Codes | Auth Guards |
|---|---|---|---|---|---|
| `[role]-[submodule]-command.controller.ts` | POST | `/api/v1/[role]/[submodule]/action` | Performs business mutation | 201, 400, 403, 409 | `JwtAuthGuard`, `RolesGuard` |
| `[role]-[submodule]-query.controller.ts` | GET | `/api/v1/[role]/[submodule]` | Retrieves paginated records | 200, 400, 401 | `JwtAuthGuard`, `RolesGuard` |

## 4. Frozen API Contract
### Request Shapes
| Endpoint | Method | Request DTO | Validated Fields |
|---|---|---|---|
| `POST /...` | POST | `[role]-[submodule]-create.dto.ts` | `field1: string (IsNotEmpty), field2: number (Min(1))` |

### Response Shapes
| Endpoint | Response Envelope DTO | Wrapped Data Fields |
|---|---|---|
| `POST /...` | `ApiResponse<[role]-[submodule]-response.dto.ts>` | `id, status, createdAt, ...` |

## 5. UI-Required Fields Mapping (Rule 82A Parity)
[REQUIRED: List every field consumed by the frontend UI — table columns, KPI cards, charts, badges, filters. Backend MUST guarantee 100% parity with frontend `_features.md`.]
- **Table Columns**: `[col1, col2, col3, statusBadge]`
- **KPI Metrics**: `[metric1, metric2]`
- **Filter / Search Inputs**: `[search, dateRange, statusFilter]`

## 6. Query & Mutation Flow / Key Sequences
[REQUIRED: Exact step-by-step execution chain for non-trivial flows.]
1. Controller receives request, validates DTO via ValidationPipe.
2. Extracts `gymId` and `branchId` from `@CurrentUser()` JWT context.
3. Orchestrator opens database transaction (`UnitOfWork`).
4. Read repository fetches aggregate root with pessimistic lock (`SELECT FOR UPDATE`).
5. Domain service applies business invariants.
6. Write repository persists state change.
7. Outbox record inserted for domain event.
8. Transaction commits and returns canonical ApiResponse envelope.

## 7. Permissions, RBAC & Tenant Isolation Rules
| Endpoint | Required Roles | Tenant Scoping Filter |
|---|---|---|
| `POST /...` | `MANAGER`, `ADMIN` | `where: { gymId: jwt.gymId, branchId: jwt.branchId }` |
| `GET /...` | `MANAGER`, `ADMIN` | `where: { gymId: jwt.gymId }` |

## 8. Data and State Architecture
- **DB Entities**: `[entity names and physical table names]`
- **Table Relationships**: `[Foreign keys and cascade rules]`
- **Soft-Delete Policy**: `deletedAt IS NULL` filter enforced on all queries (Rule 29).

## 9. Repository Layer & Query Methods
- Concern-based splitting: read and write repositories separated.
- N+1 Prevention: All relations eagerly joined or mapped in single query (Rule 34).
- Parameterized Queries: 100% ORM-managed or parameterized query builder (Rule 7).

## 10. Caching Strategy & Redis Key Registry
- **Cache Key Pattern**: `[role]:[domain]:[submodule]:{gymId}:{entityId}`
- **TTL**: `300s`
- **Invalidation Triggers**: Cache evicted on mutation commit via `CacheManager.del()`.

## 11. Event Emitter & Consumer Registry
- **Emitted Events**: `[DOMAIN].[ENTITY].[ACTION]` (from `event-registry.constants.ts`)
- **Transport**: Transactional Outbox ➔ Redis Streams (Rule 8 Edge Case A.1).
- **Consumed Events**: Handled via idempotent event consumers.

## 12. Background Jobs & Distributed Queue Tasks
- **Queue Name**: `[role]-[submodule]-queue`
- **Trigger Condition**: Heavy export, PDF, or bulk operation.
- **Idempotency Guarantee**: BullMQ jobId keyed by `requestId` or entity UUID.

## 13. Concurrency, Locks & Idempotency Rules
- **Pessimistic Locking**: `SELECT FOR UPDATE` applied on inventory/balance mutations (Rule 41).
- **Idempotency Key**: Required on mutation routes via `Idempotency-Key` header (Rule 103).

## 14. Error & Exception Registry
| Exception Class | Domain Error Code | HTTP Status | User Message Key |
|---|---|---|---|
| `[submodule]NotFoundException` | `[DOMAIN].[ENTITY].NOT_FOUND` | `HttpStatus.NOT_FOUND` | `errors.[submodule].notFound` |
| `[submodule]ConflictException` | `[DOMAIN].[ENTITY].CONFLICT` | `HttpStatus.CONFLICT` | `errors.[submodule].conflict` |

## 15. Security, PII & Audit Logging Requirements
- **PII Masking**: Mask phone numbers, emails, and financial identifiers before logging (Rule 35).
- **Audit Logging**: Write audit log entry for every critical mutation (Rule 14).

## 16. Approved External & Infrastructure Dependencies
- **Core Dependencies**: `@/core/guards/`, `@/core/interceptors/`
- **Sibling Sub-Module Dependencies**: **NONE** (Zero cross-submodule imports).
- **External Adapters**: Third-party integrations wrapped in local adapters (Rule 8 Edge Case D).

## 17. File Responsibility Map & Architecture Exceptions
- Every file declares `// RESPONSIBILITY:` and `// FLOW:` header (Rule 76, 79).
- Any documented exception contains `// architecture-exception: [reason]` (Rule 17).

## 18. ADR (Architectural Decision Records) & Known Contract Gaps
- **ADR-001**: [Decision description, rationale, consequences]
- **Known Contract Gaps**: None.

## 19. Rule Compliance Checklist (35+ Verification Items)
- [ ] Rule 0A.2: Universal Day-1 Sub-Module Architecture verified
- [ ] Rule 0A.2: Zero root business code in domain module root (Domain Quarantine)
- [ ] Rule 0A.2: Parent shared folder banned (`manager-attendance/common/` absent)
- [ ] Rule 0A.2: Zero cross-submodule imports; sibling `@Module` or service NOT imported
- [ ] Rule 0A.2: Strict WET Principle applied to DTOs, mappers, and helpers
- [ ] Rule 0A.2: Strict Maximum Nesting Depth verified (depth = 1 below domain module; zero sub-submodules)
- [ ] Rule 0A.2: Sub-Module Sizing & Qualification verified (5-Gate Matrix; zero nano-modules <3 files; zero mega-modules >25 files)
- [ ] Rule 0G: Tenant isolation verified (`gymId`/`branchId` from JWT, never body)
- [ ] Rule 7: Approved project ORM used; parameterized queries only
- [ ] Rule 8: Event-driven cross-module communication (Redis Streams/Outbox)
- [ ] Rule 8: Orchestrator pattern used for multi-table transactions
- [ ] Rule 9: HTTP status codes use `HttpStatus` enum (never raw integers)
- [ ] Rule 11: Co-located unit tests and standalone test harness present
- [ ] Rule 12: OpenAPI / Swagger annotations on all endpoints
- [ ] Rule 13: Strongly typed ConfigService used (no raw `process.env`)
- [ ] Rule 14: Structured logging via `nestjs-pino` with correlation ID
- [ ] Rule 17: Standardized backend-driven pagination, sorting, and filtering
- [ ] Rule 19: Documentation Trio present and up-to-date (Freshness Rule)
- [ ] Rule 20: Standalone Run, Mock & Test Harness fully documented in Section 20
- [ ] Rule 21: Module Portability & Host Integration Guide documented in Section 21
- [ ] Rule 23: Heavy tasks dispatched to BullMQ background queues
- [ ] Rule 28: ResponseInterceptor wraps all responses in canonical envelope
- [ ] Rule 29: Soft-delete by default (`deletedAt IS NULL`)
- [ ] Rule 34: N+1 queries eliminated via eager loading / query builders
- [ ] Rule 36: Fail-Fast null checks applied in domain services
- [ ] Rule 41: Pessimistic locking on concurrent balance/inventory mutations
- [ ] Rule 48: Command (write) and query (read) controllers in separate files
- [ ] Rule 56: `findByIdOrThrow()` used — null never silently propagated
- [ ] Rule 62: Explicit TypeScript return types on all methods
- [ ] Rule 76: Every file starts with `// RESPONSIBILITY:` comment
- [ ] Rule 79: Every file has `// FLOW:` comment below RESPONSIBILITY
- [ ] Rule 80: JSDoc method documentation on all service/repo methods
- [ ] Rule 82A: Complete UI data requirement parity with frontend `_features.md`
- [ ] Rule 83: RBAC enforced at controller layer via `@Roles()` guard
- [ ] Rule 85: Guard clauses used — max 2 nesting levels
- [ ] Rule 86: Verb contract naming applied (`createX`, `findXByIdOrThrow`)
- [ ] Rule 87: Methods adhere to 20-line soft ceiling or decomposed
- [ ] Rule 89: Pure domain models in services; ORM entities stay in repo layer
- [ ] Rule 92: OrderBy/where parameters validated against strict allowlist
- [ ] Rule 103: Idempotency-Key enforced on non-naturally idempotent mutations
- [ ] Rule 115: AI-contextual docstrings on entities, services, controllers
- [ ] Rule 117: Universal RAG projection (`?format=rag`) supported

## 20. Standalone Run, Mock & Test Harness
### How to Run this Sub-Module Standalone
1. **Harness Location**: `{submodule}-tests/harness/[submodule].harness.ts`
2. **In-Memory / SQLite Database**: Harness initializes a lightweight SQLite or Testcontainers PostgreSQL DataSource with local entity definitions.
3. **Local Seed Data**: `{submodule}-tests/harness/[submodule].seed.ts` populates realistic tenant, member, and domain records.
4. **Execution Command**:
   ```bash
   npm test -- src/backend-[role]/[role]-modules/[role]-[domain]/[submodule]/
   ```
5. **Standalone NestJS Testing Module**: Harness exports a standalone `createTestingModule()` with mocked external event busses and cache managers.
6. **Standard 8-State Mock Scenario Catalog (`{submodule}-tests/fixtures/mock-scenarios.ts`)**:
   Every sub-module harness MUST implement and own the 8 canonical mock scenarios for deterministic offline verification:
   - `ACTIVE`: Normal populated success state (valid active tenant, active entity, populated collections).
   - `EMPTY`: Zero records returned (valid tenant, empty results array / null item).
   - `UNAUTHORIZED`: Unauthenticated caller (missing or expired JWT).
   - `FORBIDDEN`: Cross-tenant boundary breach or insufficient role permissions.
   - `NOT_FOUND`: Target resource ID does not exist for the authenticated `gymId`.
   - `VALIDATION_ERROR`: Payload failing DTO class-validator rules (canonical 400 shape).
   - `SERVER_500`: Simulated unhandled database disconnection or infrastructure panic.
   - `TIMEOUT`: Simulated external service adapter timeout (`504`/`408`).

## 21. Module Portability & Host Integration Guide
### 4-Step Host Monolith Integration
1. **Drop-in Directory Placement**:
   Copy `{submodule}/` into `src/backend-[role]/[role]-modules/[role]-[domain]/`.
2. **Aggregator Module Registration**:
   In `[role]-[domain].module.ts`, add `[Submodule]Module` to the `imports` array:
   ```typescript
   @Module({
     imports: [AttendanceDashboardModule, AttendanceHistoryModule],
     exports: [AttendanceDashboardModule, AttendanceHistoryModule],
   })
   export class ManagerAttendanceModule {}
   ```
3. **Database Migration Execution**:
   Run the sub-module migration files to ensure tables and indexes exist.
4. **Environment / Token Verification**:
   Verify required Redis and database environment variables are configured in host `ConfigService`.

## 22. Deliverables & Version History
### Sub-Module Self-Audit & ZIP Compliance Gate (10/10 Required for Release)
- [ ] 1. **Autonomous Directory Structure**: All controllers, services, repositories, DTOs live inside `{submodule}-{artifact}/` sub-folders. Zero root business code in parent domain.
- [ ] 2. **Zero Cross-Submodule Imports**: Sibling submodules do not import each other's `@Module`, `@Injectable()` services, or repositories.
- [ ] 3. **Standalone Test Harness**: Includes working standalone harness in `harness/` with local seeders, runnable independently using SQLite or mocks without host application.
- [ ] 4. **Complete DTO & Validation Isolation**: Every input payload is strictly validated using local Class-Validator DTOs; no shared DTOs with sibling submodules.
- [ ] 5. **Complete Repository & Query Isolation**: All queries live in local repository files with explicit tenant filtering and no leaked ORM entities to controllers.
- [ ] 6. **Documentation Trio Present & Complete**: Submodule contains `_backend-feature.md` (all 22 canonical sections), `_backend-forbidden.md`, and `_backend-contract.md`.
- [ ] 7. **Frozen API Contract Verified**: Complete parity with frontend `_features.md` requirements (Rule 82A satisfied).
- [ ] 8. **Ambient Core Stubs & Machine-Readable Manifest**: Sub-module contains `contracts/core-contracts.stub.ts` and `required-core-contracts.json` declaring host contract consumption within budget (≤ 7).
- [ ] 9. **Standard 8-State Mock Scenario Catalog**: Harness implements the 8 canonical scenarios (`ACTIVE`, `EMPTY`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `SERVER_500`, `TIMEOUT`).
- [ ] 10. **AI Portability Guarantee**: Submodule folder can be independently zipped, provided to an external autonomous AI agent, compiled cleanly (`tsc --noEmit`), tested, audited, and repaired in 100% total isolation.

### Version Changelog
| Version | Date | Author | Changes |
|---|---|---|---|
| `1.0.0` | `2026-10-23` | AI Architect | Initial autonomous sub-module creation with complete 22-section spec |
```

---

### Mandatory `[role]-[submodule]-backend-forbidden.md` Template

Every autonomous sub-module MUST contain a `-backend-forbidden.md` detailing concrete boundary anti-patterns:

```markdown
# [Role] [Sub-Module Name] Forbidden Invariants & Anti-Patterns

## 1. Sibling Sub-Module Isolation Violations (P0 Architecture Failure)
- ❌ **FORBIDDEN**: Importing sibling sub-module services, controllers, repositories, or DTOs:
  `import { AttendanceHistoryService } from '../attendance-history/...'`
- ❌ **FORBIDDEN**: Importing a sibling's `@Module` inside this sub-module's NestJS module.
- ❌ **FORBIDDEN**: Injecting a sibling sub-module's service directly into this sub-module's constructors.
- ✅ **MANDATORY**: Decouple sibling interactions via Domain Events (Redis Streams / Outbox) or an Application Workflow Orchestrator.

## 2. Shared Folder & DRY Violations (P0 Architecture Failure)
- ❌ **FORBIDDEN**: Creating or importing from domain-level shared folders:
  `src/backend-manager/manager-modules/manager-attendance/common/`
  `src/backend-manager/manager-modules/manager-attendance/shared/`
- ❌ **FORBIDDEN**: Moving business helpers, formatters, or DTOs to parent domain root.
- ✅ **MANDATORY**: Follow Strict WET Principle. Duplicate helpers, mappers, and DTOs locally within `{submodule}-dto/`, `{submodule}-services/`, and `{submodule}-mappers/`.

## 3. Multi-Tenancy & Security Violations (P0 Security Failure)
- ❌ **FORBIDDEN**: Accepting `gymId` or `branchId` from request body, query params, or client headers.
- ❌ **FORBIDDEN**: Executing any database query without explicit tenant filter (`gymId: jwt.gymId`).
- ❌ **FORBIDDEN**: Exposing internal `gymId` or `branchId` in response DTOs.
- ✅ **MANDATORY**: Extract tenant identifiers exclusively from the verified JWT payload.

## 4. Database & Query Violations
- ❌ **FORBIDDEN**: Writing raw unparameterized SQL strings.
- ❌ **FORBIDDEN**: Leaking TypeORM / ORM entity instances outside the repository layer to controllers.
- ❌ **FORBIDDEN**: Bypassing soft-delete (`deletedAt IS NULL`) on business entities.
- ❌ **FORBIDDEN**: Omitting pessimistic locking on concurrent balance or inventory mutations.

## 5. Framework & Controller Violations
- ❌ **FORBIDDEN**: Returning hardcoded numeric HTTP status codes (e.g., `res.status(200)`). Use `HttpStatus.OK`.
- ❌ **FORBIDDEN**: Combining command (write) and query (read) endpoints in a single monolithic controller.
- ❌ **FORBIDDEN**: Using raw `process.env` in services. Use strongly-typed `ConfigService`.
```

---

### Mandatory `[role]-[submodule]-backend-contract.md` Template

Every autonomous sub-module MUST contain a `-backend-contract.md` freezing its public external interface:

```markdown
# [Role] [Sub-Module Name] Frozen API & Event Contract

## Public HTTP Endpoints
### 1. `POST /api/v1/[role]/[submodule]/action`
- **Request Headers**:
  - `Authorization: Bearer <jwt>` (Required)
  - `Idempotency-Key: <uuid>` (Required for mutations)
- **Request Body (JSON)**:
  ```json
  {
    "name": "string",
    "amountMinor": 1000
  }
  ```
- **Response Body (JSON - Canonical Envelope)**:
  ```json
  {
    "success": true,
    "statusCode": 201, // Wire representation of HttpStatus.CREATED (Rule 9/28)
    "message": "Resource created successfully",
    "requestId": "123e4567-e89b-12d3-a456-426614174000",
    "data": {
      "id": "uuid",
      "status": "ACTIVE",
      "createdAt": "2026-10-23T00:00:00.000Z"
    }
  }
  ```

## Emitted Domain Events
### `[DOMAIN].[ENTITY].[ACTION]`
- **Topic / Stream**: `[domain]-events`
- **Payload Schema**:
  ```json
  {
    "eventId": "uuid-v4",
    "eventName": "[DOMAIN].[ENTITY].[ACTION]",
    "eventVersion": 1,
    "tenantScope": {
      "gymId": "uuid",
      "branchId": "uuid"
    },
    "aggregateId": "uuid",
    "occurredAt": "2026-10-23T00:00:00.000Z",
    "correlationId": "uuid",
    "payload": {
      "entityId": "uuid",
      "action": "ACTION_NAME"
    }
  }
  ```
```

## 20. Performance & Network Optimization (Compression, Rate Limiting & Caching)
* **The Rule:** Enterprise APIs must protect their bandwidth and server load. 
  1. **Rate Limiting / Redis:** Implement strict rate limiters on all public endpoints (especially Auth and generic GET routes). Use Redis to handle rate limiting and to cache expensive, frequently requested data.
  2. **Response Compression:** Enable gzip/Brotli compression at the framework level (e.g., `compression` middleware in Node.js, `GZipMiddleware` in Django) to drastically reduce JSON response sizes and save bandwidth.
* **Why:** This ensures the backend remains highly available under load and saves massive amounts of egress bandwidth costs.

## 21. Asset Optimization (Modern Delivery Pipeline)
* **The Rule:** Publicly delivered raster images must use an optimized delivery format selected by the asset pipeline, such as WebP or AVIF, with compatibility fallback only where required.
* **Why:** Modern compression formats offer 25-50% smaller file sizes than legacy formats at equivalent quality, dramatically improving mobile and web page load speeds, reducing mobile data consumption, and lowering CDN bandwidth costs.
* **Rules:**
  1. SVG remains permitted for vector logos, diagrams, and icons.
  2. Original uploads may be retained privately only when required for legal, reprocessing, or quality purposes.
  3. Public delivery must use optimized derivatives, never unrestricted raw original uploads.
  4. Orientation normalization, stripping of unsafe EXIF metadata, malware scanning (Rule 65), and MIME validation are mandatory.
  5. Mobile clients must receive image variants appropriate to requested dimensions and device/network constraints.


## 22. Security Headers, CORS, & Protection
* **The Rule:** An enterprise app cannot go to production naked. Always implement security middleware (NestJS: Helmet / framework-approved security middleware, Django: SecurityMiddleware / framework-approved security middleware) to set strict HTTP headers. Configure strict CORS policies (only allowing exact frontend domains). Ensure inputs are stripped of executable scripts (XSS protection) and standard ORMs are used to natively prevent SQL injection.

### Native Mobile CORS Clarification
CORS is a browser enforcement mechanism. Native React Native clients are not protected by browser CORS in the same way as web clients.
Therefore:
- CORS must be strict for browser/web origins.
- Native app security must rely on JWT/session security, certificate/TLS validation, API authorization, tenant isolation, rate limits, app-version policy, and request abuse controls.
- CORS must never be treated as a security boundary for native mobile clients.


## 23. Background Jobs & Queues (No Hanging Requests)
* **The Rule:** An HTTP request should respond in under 500ms. If a user triggers a heavy task (e.g., "Send 1,000 promotional emails", "Generate a 50-page PDF report", "Process a video"), DO NOT process it in the main HTTP thread.
* **Implementation:**

  NestJS: BullMQ backed by Redis

  Django: Celery backed by Redis

  The controller MUST immediately return `202 Accepted` for intentionally asynchronous operations, while the worker performs the heavy processing.

  RabbitMQ and Kafka are NOT approved project infrastructure.

## 24. Database Migrations (No Auto-Syncing & Backward Compatibility)
* **The Rule:** Database schemas MUST be strictly version-controlled using migrations.

  NestJS: TypeORM migrations

  Django: Django migrations

  Production schema auto-synchronization is forbidden.

  NestJS MUST use: `synchronize: false`

  No Prisma Migrate, Flyway, Liquibase, Hibernate schema-update, or alternate migration system is approved for this project.

### Migration File Naming Convention (GAP-3 Fix)

All migration files MUST use this exact naming pattern:

**NestJS / TypeORM:**
```text
{timestamp}-{RoleModule}-{Description}.ts
```
Example:
```text
1720000000000-AdminMembers-AddGymIdIndex.ts
1720000000001-AdminBilling-AddInvoiceStatusColumn.ts
```
- Timestamp MUST be `Date.now()` (milliseconds) at the time of generation.
- `{RoleModule}` MUST use PascalCase and follow the `{Role}{Module}` convention.
- `{Description}` MUST be a plain-English description of what the migration does.
- Every migration file MUST export exactly: `public up()` and `public down()`.
- `down()` MUST reverse EVERY operation in `up()` exactly — it is not optional.

**Django:**
```text
{NNNN}_{role}_{module}_{description}.py
```
Example:
```text
0001_admin_members_add_gym_id_index.py
0002_admin_billing_add_invoice_status_column.py
```
- Django auto-generates the `{NNNN}` prefix — do not invent it.
- Human-authored migration names must match the snake_case pattern above.

### Migration Audit Checklist — HARD STOP GATE

> ⛔ **STOP. Do NOT mark any migration PASS until every item below passes. A single unchecked item = migration is `NON_COMPLIANT`.**
> **Consequence of skipping:** A missing `down()`, a dropped `NOT NULL` column, or an unregistered migration file can cause irreversible data loss or application crash in production with no rollback path.

Before marking any migration PASS, ALL of the following MUST be verified with evidence:
```text
[ ] File name follows the canonical naming pattern above — STOP if pattern violated
[ ] up() performs ONLY the documented schema change — no business logic — STOP if business logic present
[ ] down() correctly reverts EVERY operation in up() — STOP if down() is empty or incorrect
[ ] No column dropped and re-added in the same migration (two-phase rule) — STOP if single-phase destructive change
[ ] No NOT NULL column added to a non-empty table without a DEFAULT value — STOP if violated (production crash risk)
[ ] Migration does not touch tables outside its owning feature module — STOP if cross-module tables touched
[ ] NestJS: migration included in migrations array of TypeORM config — STOP if missing registration
[ ] Django: makemigrations was run and the auto-generated file is committed — STOP if file not committed
```
**Any unchecked item = migration is `NON_COMPLIANT`. Do NOT mark PASS.**

* **Backward Compatibility Requirement:** Existing v1 clients must be supported during DB migrations. Migrations must be strictly backward-compatible. Never drop a column in the same migration that adds a `NOT NULL` replacement. Do it in two phases. Avoid single-step destructive migrations.
* **Why:** If the AI needs to add a new column to a table, it should generate a explicit migration file. This guarantees that production databases can be safely upgraded (or rolled back) without data loss or rogue schema syncing breaking the app, and ensures no downtime for legacy clients.



## 25. Graceful Shutdown & Health Probes (Kubernetes/Docker Ready)
* **The Rule:** Enterprise apps are deployed in containers. You must include a `/health` or `/ping` endpoint for Kubernetes/AWS liveness probes. Furthermore, the application must intercept termination signals (`SIGINT`, `SIGTERM`).
* **Why:** When a server restarts or a container is killed, it shouldn't just die instantly, dropping user requests mid-flight. It must stop accepting new requests, finish processing current ones, safely close the database connection, and *then* shut down.

## 26. API Versioning (URI Based)
* **The Rule:** An enterprise API must never be released without a versioning strategy. Always prefix routes with a version (e.g., `/api/v1/users`). In frameworks like NestJS, enable URI versioning globally. *(Exception: Operational endpoints such as `/health`, `/health/live`, `/health/ready`, and `/metrics` are exempt from `/api/vN` business-route versioning and remain at the root.)*
* **Why:** If the business scales and requires mobile apps or external integrations, releasing a breaking `v2` API should not crash the legacy mobile apps that still rely on `v1`.

## 27. API Testing Strategy (Three-Tier: Jest Unit + API E2E + Selenium UI)
* **The Rule:** This project uses a strict three-tier testing strategy:
  1. **Jest `.spec.ts` (Unit Tests):** Co-located with source files (see Rule 11). Tests individual service methods, DTOs, and utilities in isolation with mocked dependencies. This is the AI's primary safety net when modifying a micro-file.
  2. **Python `pytest` (Black-Box E2E / API Tests):** Lives in a top-level `backend-e2e/` directory, completely decoupled from the Node.js runtime. **CRITICAL: While the `backend-e2e/` folder is separated from `src/`, its internal directory structure MUST strictly mirror the domain-driven grouping of the backend (e2e files MUST end with `-e2e.py` to identify them immediately, e.g., `backend-e2e/backend-superadmin-e2e/superadmin-dashboard/test-superadmin-dashboard-e2e.py`). Never dump test files into a flat `backend-e2e/` root folder.** Tests the running API as a true external client — no knowledge of internal implementation. QA engineers and CI pipelines use this tier.
  3. **Python Selenium (UI Behavior Tests):** Lives in a top-level `backend-selenium/` directory. Tests the complete frontend-to-backend user flow as a real browser would. Files MUST end with `-selenium.py` (e.g., `test-superadmin-dashboard-selenium.py`).
* **Strict Boundary:** Jest is NEVER used for API/E2E testing. Pytest is NEVER used for unit testing internal service logic. These three tiers must never overlap.

## Summary Checklist for Developers Providing Context to AI:
1. Identify the exact layer where the bug/feature resides (Validation? DB Query? Business Logic?).
2. Select the **one or two** micro-files associated with that layer.
3. Pass ONLY those files to the AI.
4. Review the AI's isolated changes.
* **For E2E Test Fixes/Updates:** If an API contract changes and the E2E test needs updating, provide the AI with ONLY the specific feature's E2E folder (e.g., `backend-e2e/backend-superadmin-e2e/superadmin-dashboard/`) and the corresponding backend module. Do NOT feed the entire `backend-e2e/` directory to the AI to prevent token explosion.

---

## 28. Standardized Response Envelope (The API Contract)
* **The Rule:** Every API endpoint — success or failure — must return a response in a single, predictable JSON "envelope" shape. Never return raw objects, raw arrays, or ad-hoc structures directly from controllers. Both Success and Error responses must share the EXACT SAME canonical type definition.
* **The Complete Canonical Schema (Discriminated Union — single source of truth):**
  ```typescript
  // src/core/types/api-response.types.ts
  import { HttpStatus } from '@nestjs/common';

  export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

  export interface ApiSuccess<T> {
    success: true;                           // true on 2xx
    message: string;                         // human-readable, always present
    data: T;                                 // payload data
    meta?: PaginationMeta;                   // present only on paginated list responses
    requestId: string;                       // correlation/tracing UUID for observability
    statusCode?: HttpStatus | number;        // HttpStatus enum in source code; integer over HTTP wire
  }

  export interface ApiFailure {
    success: false;                          // false on all errors
    message: string;                         // human-readable error summary
    data: null;                              // ALWAYS null on error
    error: string;                           // error category (e.g. "NOT_FOUND", "VALIDATION_ERROR")
    errorCode: string;                       // machine-readable DOMAIN.ENTITY.REASON (e.g. "BILLING.SUBSCRIPTION.EXPIRED")
    statusCode: HttpStatus | number;         // HttpStatus enum in source code; integer over HTTP wire
    requestId: string;                       // correlation/tracing UUID matching error log
    validationErrors?: ValidationErrorItem[]; // present on canonical 400 validation failures; 422 only when approved
  }

  export interface ValidationErrorItem {
    field: string;    // exact DTO property name, supports dot-notation for nested (e.g. 'address.city')
    message: string;  // human-readable error from class-validator
  }
  ```
* **Field Presence Conditions — this table is the contract AI agents must follow:**

  | Field | Success (2xx) | Error (4xx/5xx) | Validation Error (400/422) |
  |---|---|---|---|
  | `success` | `true` | `false` | `false` |
  | `message` | Always present | Always present | Always present |
  | `data` | Present with payload `T` | `null` | `null` |
  | `meta` | Present if paginated | Absent | Absent |
  | `requestId` | Always present (UUID) | Always present (UUID) | Always present (UUID) |
  | `error` | Absent | Present | `"VALIDATION_ERROR"` |
  | `errorCode` | Absent | Present where applicable | `"VALIDATION.DTO.FAILED"` |
  | `statusCode` | Optional / 200/201 | Present | Present (`HttpStatus.BAD_REQUEST` / `400`) |
  | `validationErrors` | Absent | Absent | Present (array of field errors) |

* **Rules:**
  - `data` is ALWAYS `null` on error responses. Never put error detail inside `data`.
  - `validationErrors` is ONLY present on validation failures — never on generic errors.
  - `errorCode` follows `DOMAIN.ENTITY.REASON` in `SCREAMING_SNAKE_CASE` (e.g., `BILLING.SUBSCRIPTION.EXPIRED`). The frontend relies on this code to trigger specific UI logic (e.g., redirecting to a payment page). See full definition in Rule 64.
  - `meta` is present only on paginated list responses. For non-paginated lists (e.g., dropdowns), `meta` must be `undefined` — never an empty object `{}`.
  - **Source vs Wire Form:** In TypeScript code, always type and pass `HttpStatus` enum. Over HTTP transport, the interceptor/filter serializes this to the numeric status code.
* **Implement via:** A global `ResponseInterceptor` (NestJS) that wraps all successful controller returns. A global `ValidationExceptionFilter` (Rule 98) that transforms `400` errors into the `validationErrors` shape. The AI should NEVER shape the raw response manually inside a controller or service.
* **Why:** When an AI frontend agent hits an API, it needs a predictable contract. If success and error payloads have totally different shapes, the frontend's generic `ApiResponse<T>` parser becomes brittle. A singular standard envelope with one canonical schema — covering all fields — eliminates all ambiguity and ensures Rules 64 and 98 are never treated as isolated additions.


---

## 29. Soft Deletes (Never Hard-Delete Production Data)
* **The Rule:** Never use destructive `DELETE` SQL / ORM calls directly on production data. Instead, all entities must have an `is_deleted: boolean` (or `deleted_at: timestamp`) column. A "delete" operation only sets this flag — the data is never physically removed.
* **Exemptions (CRITICAL):** Rule 118 immutable event logs (`events_log`) and Rule 119 financial ledger rows (`ledger_entries`) are append-only and permanently exempt from soft-delete mechanics — they must NEVER carry a `deleted_at` column or be filtered by one. See Rule 110 for the full per-record-type retention hierarchy.
* **Why:**
  1. **Audit & Recovery:** If an admin accidentally deletes 1,000 members, the data is instantly recoverable.
  2. **Referential Integrity:** Foreign keys referencing a "deleted" record remain valid, preventing cascade failures.
  3. **AI Safety:** An AI asked to "implement the delete endpoint" will set a flag, not wipe database rows. This prevents catastrophic, irreversible data loss.
* **Implementation:** Add a global soft-delete query filter at the repository layer so that all standard `find` queries automatically exclude soft-deleted records.

  NestJS (TypeORM): use a base repository class that wraps `createQueryBuilder` with `.andWhere('entity.deletedAt IS NULL')`, or apply `@DeleteDateColumn()` combined with `withDeleted(false)` as the default in base query helpers.

  Django: use a custom QuerySet with a `delete_at__isnull=True` default filter, or `django-softdelete`.

  Soft-delete mechanics MUST be applied at the repository layer only — never in service methods. Column hooks (`@DeleteDateColumn` in TypeORM) apply to governed entities only.
* **Data Privacy / Legal Erasure Exception:** Soft-delete is the normal operational mechanism. Legally required data retention and right-to-erasure workflows (Rule 35, Rule 110) are the ONLY explicit hard-deletion/anonymization exceptions, and must be performed via dedicated background jobs with strict audit logging.

---

## 30. Audit Trail / Activity Log (Who Did What & When)
* **The Rule:** Every meaningful state change to critical entities (Members, Payments, Staff, Settings) MUST be recorded in an `audit_logs` table. At minimum, log: `actor_id`, `actor_role`, `action` (e.g., `MEMBER_UPDATED`), `entity_type`, `entity_id`, `old_value` (JSON), `new_value` (JSON), `ip_address`, `timestamp`.
* **Sensitive Data Redaction (CRITICAL):** The `old_value` and `new_value` JSON payloads MUST be scrubbed of sensitive PII (passwords, payment tokens, government IDs) before saving to the audit log. Audit logs must have strict access control, defined retention limits, and encryption for highly sensitive payloads.
* **Completeness Rule:** Mutations occur from HTTP requests, Background Jobs, Event Consumers, Scheduled Jobs, Webhooks, and Internal Commands. The audit trail architecture MUST integrate with the mutation layer (e.g., repository or orchestrator) rather than relying solely on HTTP interceptors to guarantee completeness.
* **How:** Implement this as a cross-cutting concern using:
  - **NestJS:** An interceptor, event listener, or AOP-style wrapper around repositories that fires after mutating actions.
  - **Django:** Model `post_save` / `post_delete` signals.
* **Why:** Regulators, auditors, and enterprise clients will always ask "who changed this record and when?". Building this from day one costs almost nothing. Retrofitting it onto a live production system costs weeks. It also gives AI agents an immutable history to reason about when debugging.

---

## 31. Idempotency Keys for Critical Mutations
* **The Rule:** Any endpoint that triggers a financial transaction, sends a communication, or creates a resource that must never be duplicated MUST support an `Idempotency-Key` request header.
* **Why:** Networks are unreliable. A client might retry a `POST /payments` request after a timeout, not knowing the first one succeeded. Without idempotency, the member gets double-charged.
* **Superseded by Rule 103:** Superseded by Rule 103. Rule 103 defines the retry-safe mutation policy: Idempotency-Key is mandatory for duplicate-sensitive, offline-queueable, financial, communication, bulk, asynchronous, and externally side-effecting actions. Naturally idempotent state-setting operations may omit the header only when repeated requests cannot create duplicate side effects.

---

## 32. Observability: The Three Pillars (Logs, Metrics, Traces)
* **The Rule:** Logging alone is not sufficient for enterprise observability. You MUST implement all three pillars:
  1. **Structured Logs** (Rule 14): Already covered. Use JSON-formatted logs.
  2. **Metrics:** Expose a `/metrics` endpoint (Prometheus format) tracking: request count, request latency histograms, error rates, queue depth, DB connection pool usage. Use libraries like `prom-client` (Node), `django-prometheus` (Django).
  3. **Distributed Traces:** Integrate OpenTelemetry to trace a single request as it flows through controllers → services → repositories → external APIs. Each span should include `correlation_id`, `duration_ms`, and `status`.
* **Why:** When a production request is slow or fails silently, logs tell you WHAT happened, metrics tell you HOW OFTEN it happened, and traces tell you EXACTLY WHERE the bottleneck is. An AI debugging agent with access to all three can diagnose issues orders of magnitude faster.

---

## 33. Secret Management (Never Trust `.env` Files in Production)
* **The Rule:** `.env` files are acceptable in local development ONLY. In staging and production environments, secrets (API keys, DB passwords, JWT secrets) MUST be injected from a dedicated secrets manager:
  - **AWS:** AWS Secrets Manager or Parameter Store
  - **GCP:** Google Secret Manager
  - **Azure:** Azure Key Vault
  - **Self-hosted:** HashiCorp Vault
* **Rules:**
  1. `.env` files must NEVER be committed to source control (enforce with `.gitignore`).
  2. The application must fail fast on startup with a clear error if a required secret is missing.
  3. Secrets must be rotated regularly. The application should support hot-reloading of secrets without a restart.
* **Why:** A leaked `.env` file on GitHub has caused catastrophic security breaches for companies. An AI writing deployment configs must be instructed to always reference the secrets manager, never hardcode credentials.

---

## 34. Database Query Optimization (The N+1 Rule & Index Strategy)
* **The Rule:** The single most common performance killer in any ORM-backed backend is the N+1 query problem. You must proactively prevent it.
  1. **N+1 Prevention:** Always use eager loading / `JOIN` fetching when you know you'll need related data.

     NestJS (TypeORM): use `relations: ['plan']` or `leftJoinAndSelect` in the query builder.

     Django: use `select_related()` for ForeignKey / OneToOne and `prefetch_related()` for ManyToMany / reverse relations.

     Never fetch a list of 100 members and then loop to fetch each one's plan separately.
  2. **Index Strategy:** Indexing should be based on actual query patterns, cardinality, and query plans. Foreign keys and frequently queried columns (in `WHERE` or `ORDER BY` clauses) should be evaluated for indexing. Do not blindly index every column, as this impacts write performance. Indexes should be explicitly defined in migration files — never rely on the ORM to create them automatically.
  3. **Slow Query Logging:** Enable slow query logging in the database (queries > 100ms). Review this log weekly.
* **Why:** An AI asked to write a "Get all members with their plans" repository method will often produce an N+1 query by default. This rule forces a review gate.

---

## 35. GDPR & Data Privacy by Design
* **The Rule:** Data privacy is not a feature — it is a foundation. Implement the following from day one:
  1. **Data Minimization:** Only collect data you absolutely need. Never store sensitive fields (passwords, card numbers) in plaintext. Always hash passwords (bcrypt/argon2) and tokenize payment data.
  2. **Right to Erasure:** The "delete account" flow must be able to fully anonymize or purge a user's PII (Personally Identifiable Information) from all tables, logs, and caches on demand. (Works hand-in-hand with Soft Deletes — Rule 29).
  3. **Data Retention Policy:** Old logs, inactive accounts, and historical records must be automatically purged after a defined retention period (e.g., 3 years). Implement a scheduled background job for this.
  4. **Sensitive Field Masking in Logs:** Never log raw PII. Phone numbers, emails, and names in log lines must be partially masked (e.g., `r***@gmail.com`).
* **Why:** GDPR violations can result in fines up to 4% of global annual revenue. An AI writing a logging statement must be aware it cannot log raw user data.

---

## 36. Defensive Programming & Fail-Fast Principle
* **The Rule:** Never assume inputs are valid at any layer. Every function, service method, and repository call must validate its inputs and fail immediately and loudly if assumptions are violated — rather than silently producing corrupt data downstream.
  - **At the Controller layer:** Validate request shape with DTOs/serializers (Rule 3).
  - **At the Service layer:** Assert that objects received from repositories are not null before operating on them. If a `findById` returns `null`, throw the appropriate custom exception immediately (Rule 6) — don't pass `null` to the next function.
  - **At the Database layer:** Enforce data integrity constraints (NOT NULL, UNIQUE, CHECK constraints, foreign keys) at the database level. Never rely solely on application-level validation.
  - **Critical Operations (Transactions, External APIs, Queues):** Any operation that interacts with unpredictable systems or requires all-or-nothing execution MUST be wrapped in a `try-catch` block.
    1. **Database Transactions:** If a multi-step mutation (e.g., creating a user and charging their card) fails, the `catch` block MUST explicitly rollback the transaction to prevent corrupted, partial data states.
    2. **Debugging & Traceability:** The `catch` block MUST log the exact error using the centralized logger (which automatically attaches the `trace_id`) before returning a controlled error to the frontend. This ensures immediate, pinpoint debugging when transactions or external services fail.
* **Why:** Silent failures are the hardest bugs to find and the most dangerous in production. An AI writing a service method that receives a `null` user and calls `user.email` will produce a `NullPointerException` / `AttributeError` that crashes the request. The Fail-Fast principle ensures errors surface immediately at their origin, with a clear, actionable error message, not silently 10 layers later.


---

## 37. Strict Edge Payload Validation (No Mass Assignment)
* **The Rule:** It is not enough to just validate that `email` and `password` exist in a DTO. Your payload validator MUST strictly strip or reject any unrecognized properties sent by the client. (e.g., in NestJS: `whitelist: true, forbidNonWhitelisted: true`). Additionally, enforce a **default global JSON payload size limit of `1mb`** at the framework middleware level. Individual endpoints that require larger payloads (e.g., file uploads) must explicitly override this limit per-endpoint (see Rule 72).
* **Why:** If a malicious user sends `{ "email": "test@test.com", "role": "admin" }` to the registration endpoint, and you blindly pass the `req.body` to the ORM's save method, you have a Mass Assignment vulnerability. Stripping unknown keys guarantees this is mathematically impossible.

---

## 38. Domain-Driven Module Grouping (The "Route Group" Equivalent)
* **The Rule:** Just like the frontend uses prefixed role containers like `frontend_erp` or `frontend_superadmin` to isolate UI domains, the backend MUST group its modules into top-level role/domain folders before splitting them into specific features.
  - ❌ **BAD:** `src/billing/`, `src/superadmin-stats/`, `src/attendance/` (All dumped into a flat directory).
  - ✅ **GOOD:**
    ```
    src/backend-manager/
    └── manager-modules/
        └── manager-billing/
    src/backend-superadmin/
    └── superadmin-modules/
        └── superadmin-stats/
    src/backend-admin/
    └── admin-modules/
        └── admin-attendance/
    ```
* **Frontend-First Naming Lock:** Since this project follows a frontend-first workflow (UI built with mock data before backend), the frontend feature folder names are the canonical source of truth. When backend development begins, the backend AI/developer MUST reuse the EXACT same folder/module name as the frontend, but translated to kebab-case. Renaming a feature's core semantic meaning during backend development is strictly forbidden.
* **Casing Translation Rule (CRITICAL):** The semantic name stays identical across frontend/backend; ONLY the casing style changes per language/framework convention. The frontend uses `snake_case` and the backend uses `kebab-case` for folders (e.g., frontend `admin_billing`, backend `backend-admin/admin-modules/admin-billing`). This enforces a hard visual boundary between stacks through the mandatory `backend-` namespace prefix (Rule 0D) and the strict casing difference.
* **API Route Grouping & Mirroring:** The API endpoint URLs must strictly mirror this domain grouping (e.g., `/api/v1/superadmin/stats`, `/api/v1/admin/members`). *(Naming Rule: The semantic module name stays identical to the frontend module name — the backend physical namespace only adds the mandatory role prefix. Example: frontend `manager_billing/` → backend folder `manager-billing/`, files `manager-billing-*.ts`, route `/api/v1/manager/billing/...`.)* The **canonical route namespace** is `/api/v1/{role}/{module}/...` for role-scoped routes (e.g., `/api/v1/manager/billing/invoices`) and `/api/v1/{module}/...` for genuinely public/shared endpoints (e.g., `/api/v1/auth/login`). Avoid mixing these two forms within the same module. Furthermore, page-to-endpoint naming must mirror exactly: if the frontend `/auth/` module calls an API, the route MUST be `/api/v1/auth/...`, not `/api/v1/session/...`. This ensures the debugging flow from UI page -> Frontend Folder -> Backend Folder -> Backend Route is 100% identically named (modulo dashes/underscores).
* **1:1 Mirror Mapping:** The backend folder structure (AND the `e2e/` test folder structure) MUST strictly mirror the frontend 4-tier domain hierarchy:
  - Frontend Role Container (`frontend_{role}`) ➔ Backend Role Container (`backend-{role}/`)
  - Frontend Tier 3 Domain Container (`{role}_{domain}`) ➔ Backend Tier 3 Feature Domain Module (`{role}-modules/{role}-{domain}/`)
  - Frontend Tier 4 Autonomous Submodule (`{submodule}`) ➔ Backend Tier 4 Autonomous Sub-Module (`{submodule}/`)
* **Zero Flat Submodule Dumping Law:** Granular sub-modules (e.g., `crm-enquiries`, `crm-leads`, `accounting-assets`, `accounting-invoices`) MUST NEVER be dumped flatly directly under `{role}-modules/`. They MUST be nested inside their owning Tier 3 Feature Domain Module (e.g., `backend-superadmin/superadmin-modules/superadmin-accounting/accounting-assets/`). Flat dumping of sub-modules into the role module root is a **P0 Architecture Violation**.
* **Strict Anti-Action Nano-Module Ban:** Creating a backend module or sub-module for a single CRUD action or form (e.g., `crm-enquiry-add/`, `member-create/`, `asset-maintenance-add/`) is a **CRITICAL P0 ARCHITECTURE VIOLATION**. Actions are NOT modules; they are endpoints, controller methods, service methods, and DTOs within the parent entity's autonomous sub-module (`crm-enquiries/`).
* **Canonical ERP Domain Taxonomy & Anti-Junk-Drawer Law:** Backend domain modules MUST align to standard cohesive business bounded contexts (CRM, Accounting, Attendance, Inventory, HR, Members, Billing, Subscriptions, Platform, Gyms, Reports).
  - **Permanently Banned Generic Junk-Drawer Names:** Never create vague catch-all domain modules such as `*-operations/`, `*-management/`, `*-general/`, `*-misc/`, `*-tools/`, `*-actions/`, `*-hub/`, `*-portal/`, `*-services/`, `*-data/`, or hybrid merged domains like `crm-accounting/`.
  - **Aggregate Root Mutation Test for Bounded Context Affinity:** Domain ownership disputes are resolved by which Aggregate Root owns and mutates the transactional record. Invoices belong to Billing/Accounting; Member profiles belong to Members; Attendance check-ins belong to Attendance. Cross-domain entity smuggling is strictly forbidden.
* **Zero Domain Count Lock (No Rigid Hardcoding):** The number of domain containers per role is determined purely by the business domain bounded contexts of that role. There is **NO hardcoded number or artificial ceiling** (neither 5, nor 6–10, nor any fixed count). NEVER force-merge or artificially split domains to satisfy an arbitrary numeric range!

#### Top-Level Role Structure (MANDATORY — See also Rule 2)

All backend role containers MUST follow this exact two-directory structure. This is not a recommendation — it is a hard architectural constraint:

```text
backend-{role}/
├── {role}-core/
└── {role}-modules/
```

Feature domain modules MUST always be children of `{role}-modules/`. Direct placement of any feature domain module or sub-module under `backend-{role}/` is forbidden.

❌ **FORBIDDEN (Flat Dumping / Missing Role Modules / Action Nano-Modules):**
```text
backend-manager/
├── manager-core/
├── manager-members/             <-- VIOLATION (Missing manager-modules/ parent)
├── member-add/                  <-- VIOLATION (Action nano-module)
└── crm-enquiry-add/             <-- VIOLATION (Action nano-module)

backend-superadmin/
└── superadmin-modules/
    ├── accounting-assets/       <-- VIOLATION (Flat submodule dump; missing superadmin-accounting/)
    ├── accounting-invoices/     <-- VIOLATION (Flat submodule dump; missing superadmin-accounting/)
    └── superadmin-operations/   <-- VIOLATION (Banned junk-drawer domain)
```

✅ **REQUIRED (Strict 4-Tier Hierarchical Domain Grouping):**
```text
backend-superadmin/
├── superadmin-core/
└── superadmin-modules/
    ├── superadmin-accounting/                           <-- Tier 3 Feature Domain Module Container
    │   ├── superadmin-accounting.module.ts              <-- Domain Aggregator Module
    │   ├── superadmin-accounting-backend-feature.md
    │   ├── superadmin-accounting-backend-forbidden.md
    │   ├── superadmin-accounting-dependencies.md
    │   ├── accounting-assets/                           <-- Tier 4 Autonomous Sub-Module
    │   │   ├── assets-controllers/
    │   │   ├── assets-services/
    │   │   ├── assets-dto/
    │   │   ├── assets-repositories/
    │   │   └── accounting-assets.module.ts
    │   └── accounting-invoices/                         <-- Tier 4 Autonomous Sub-Module
    │       ├── invoices-controllers/
    │       ├── invoices-services/
    │       ├── invoices-dto/
    │       ├── invoices-repositories/
    │       └── accounting-invoices.module.ts
    └── superadmin-crm/                                  <-- Tier 3 Feature Domain Module Container
        ├── superadmin-crm.module.ts
        ├── crm-enquiries/                               <-- Tier 4 Autonomous Sub-Module (Add is an endpoint here!)
        └── crm-leads/                                   <-- Tier 4 Autonomous Sub-Module
```

* **Why:** This creates a perfect 1:1 mapped architecture. If a bug occurs in the "Coupons" feature, you provide the AI with exactly two things: `frontend/.../frontend_superadmin/superadmin_coupons/` and `backend/.../backend-superadmin/superadmin-modules/superadmin-coupons/`. The AI gets the complete vertical slice (Frontend UI + Backend Logic) for that specific feature without seeing the rest of the application. This guarantees zero hallucination, massive token savings, and perfect separation of concerns.




---

## 39. True Multi-Tenancy (Database-per-Tenant Architecture)
* **The Rule:** The application MUST be built using a strict **Database-per-Tenant** architecture to guarantee absolute data isolation, high performance, and security. It is unacceptable to dump all gyms' data into a single database with a `tenant_id` column (row-level multi-tenancy).
* **Architecture Strategy:**
  1. **Master Database:** A central database (e.g., `smart_gym_master`) must exist solely to manage global resources: Users, Authentication, Tenants (Gyms), Subscriptions, and Feature Flags.
  2. **Tenant Databases:** Every time a new gym registers, the backend must programmatically create a brand-new database (e.g., `tenant_db_101`) and run all schema migrations on it automatically. *(Note: All these logical databases reside within the same single PostgreSQL server infrastructure unless the infrastructure architecture explicitly defines otherwise; do not spin up new physical servers/VPS per tenant).*
### Dynamic Connection Routing (Request Scoped)

The backend must resolve the tenant database only from a previously authorized TenantContext. The TenantContext is created only after JWT verification and server-side tenant authorization.

Raw client headers, request body fields, query parameters, route parameters, and unverified claims MUST NOT select a tenant database.

The only trusted tenant resolution flow is:
`Request → JWT authentication → actor identity validation → server-side tenant authorization → trusted TenantContext creation → tenant database/DataSource resolution`

Rules:
1. `gymId`, `branchId`, and tenant database identity are derived from the verified JWT and server-side authorization only.
2. A raw client-supplied `x-tenant-id` header MUST NOT be trusted as an authorization source.
3. If a platform/superadmin user can switch tenant context, the backend must issue a short-lived server-signed tenant-context token or explicitly embed the approved tenant selection in a newly issued JWT.
4. The selected tenant context must be written to AsyncLocalStorage only after authorization succeeds.
5. All database routing must use TenantContext, never raw request headers.
6. **Connection Pool Limits:** ⚠️ See Rule 63 before implementing this — the connection pool budget must be calculated across ALL active tenant DataSources combined, not per-tenant. Blindly applying `max: 20` per tenant DataSource will exhaust the database server's connection limit under load.

* **How to Apply to Different Frameworks:**
  - **NestJS (Node/TypeScript):** Do not use a static, monolithic ORM module root configuration. Use request-scoped providers or custom connection factories that cache and resolve database connection/client instances based on the trusted TenantContext created after JWT authentication and tenant authorization.
  - **Django (Python):** Use database routers (`db_for_read`, `db_for_write`) paired with thread-local storage or middleware to dynamically route queries to the correct database alias based on the request.
* **Why:** If Gym A and Gym B share the same database tables, a single missing `WHERE tenant_id = X` clause in a business query results in a catastrophic cross-tenant data breach. Database-per-tenant completely eliminates this risk at the infrastructure level. Furthermore, it reduces dataset size per tenant and avoids multi-tenant table locking bottlenecks.
* **Tenant DB vs Query Filters (The Canonical Dual-Layer Invariant — Rule 0G):** Even though Database-per-Tenant provides physical infrastructure isolation, ALL ORM queries MUST still strictly bind `gymId` and `branchId` filters into repository query ASTs. This belt-and-suspenders architecture guarantees zero data leakage even in local test harnesses (in-memory SQLite) or during connection pool caching edge cases. To eliminate developer/AI implementation friction, repositories extend the core `TenantAwareRepository<T>` base class which injects these filters automatically.

### Tenant Database Lifecycle and Provisioning

Tenant provisioning must be a resumable, auditable state machine:
`REQUESTED → PROVISIONING → MIGRATING → VERIFYING → ACTIVE`

Failure states: `PROVISIONING_FAILED`, `MIGRATION_FAILED`, `SUSPENDED`, `DELETION_PENDING`.

Rules:
1. No tenant traffic may be accepted until migration and version verification are complete.
2. Provisioning must be idempotent; retries must not create duplicate databases.
3. The master database must store tenant database identifier, schema version, status, provisioning attempt ID, backup policy, and lifecycle audit history.
4. Tenant migrations must be versioned and executed through a controlled migration runner.
5. Tenant DataSource caching must have bounded size, idle eviction, and a total connection-budget calculation across active tenants.
6. Backup, restore, tenant suspension, archival, legal retention, and deletion flows must be explicitly documented.

---

## 40. Multi-Medium Sending Architecture (Proof of Delivery)
* **The Rule:** Whenever the system needs to send something to a user as a proof of transaction (e.g., a bill, a receipt, a report, or an alert), the backend MUST architect the payload and services to support at least **two different mediums** (e.g., WhatsApp and Email, or SMS and Email).
* **Mandatory Fallback:** One of the two mediums must always be configured as the mandatory fallback or default. The backend API should accept an explicit `deliveryMedium` parameter (e.g., `WHATSAPP` or `EMAIL`) from the frontend payload and route the message via the chosen service.
* **Why:** This ensures that if one provider fails or a user doesn't have WhatsApp, they can still receive critical proofs via Email or another backup medium.

---

## 41. Transaction Locks & Race Condition Prevention
* **The Rule:** For highly concurrent mutations (e.g., deducting wallet balances, booking limited seats, processing inventory), standard database transactions are not enough to prevent race conditions. You MUST implement **Pessimistic Locking** or **Optimistic Locking**.

  **Pessimistic Locking:**

  NestJS (TypeORM): use `queryRunner.manager.getRepository(Entity).findOne({ where: ..., lock: { mode: 'pessimistic_write' } })` inside a transaction managed by a `QueryRunner`.

  Django: use `select_for_update()` within a `transaction.atomic()` block.

  **Optimistic Locking:** use a `version` or `revision` integer column checked on update — reject writes where the version no longer matches the read version.
* **Why:** If two concurrent requests try to deduct money at the exact same millisecond, a standard transaction might allow both to succeed based on stale read data, causing negative balances. Enforcing this rule ensures AI always explicitly handles concurrency.

---

## 42. Distributed Cron Jobs (No Local Schedulers)
* **The Rule:** Never use local cron jobs (like `setInterval`, `node-cron`, or `@Cron()` without a lock) inside the backend code. You must use a **Distributed Task Scheduler** backed by Redis (like BullMQ in Node, Celery Beat in Python) or a database-backed distributed lock (like Redlock/ShedLock).
* **Why:** In an enterprise environment, your backend will scale horizontally (e.g., 3 instances running behind a load balancer). If you use a local cron job to send "Morning Reminders", all 3 instances will fire it simultaneously, sending 3 duplicate emails. A distributed scheduler provides **single scheduling ownership** across the cluster. However, distributed systems can retry/redeliver, so the job processing itself MUST still be idempotent with deduplication where required.

---

## 43. True E2E Test Database Isolation & Lifecycle Verification
* **The Rule:** End-to-End (E2E) test suites must NEVER run against your local development or production databases. Instead, the test suite setup (e.g., `conftest.py`) must dynamically hit the API to create a brand-new, isolated Test Tenant/Database specifically for that test run. All E2E tests must authenticate using a test JWT whose verified claims contain the test tenant identity. Test code may never use `x-tenant-id` as an authorization source.
* **The Data Lifecycle Rule:** True E2E tests must verify the full CRUD lifecycle within that isolated database. Tests cannot rely on stub IDs. They must:
  1. **POST**: Create a uniquely identifiable record and extract its real ID from the `201` response.
  2. **GET by ID**: Fetch that exact ID and assert `200 OK`.
  3. **PATCH**: Update that exact ID and assert `200 OK`.
  4. **DELETE**: Delete that exact ID, and then make a follow-up `GET` request to mathematically verify a `404 Not Found` response is returned.
* **Why:** This architecture guarantees 100% test isolation, prevents test data pollution in your main database, and actively proves that your database provisioning systems are actually executing correctly under the hood.

---

## 44. Centralized API Rate Limit Tiers
* **The Rule:** Define distinct rate-limit tiers in a centralized `rate-limit.config.ts`. (e.g., Public Auth: 5 req/min, Authenticated Read: 100 req/min, Export: 2 req/min). Never hardcode rate limits inside controllers.
* **Consequence of violation:** Hardcoded rate limits in controllers cannot be changed without touching every controller file — AI will miss some, causing inconsistent protection. Controllers without rate limits on auth endpoints are vulnerable to brute force (see Rule 54).
* **Audit evidence required:** `rate-limit.config.ts` must exist; every controller must reference a tier constant from it — never a raw number.

## 45. Webhook Signature Verification
* **The Rule:** All inbound webhooks (e.g., Payment gateways) MUST verify the provider's documented cryptographic signature mechanism and implement replay-protection requirements (e.g., timestamp bounds checking) before processing. Do not assume HMAC-SHA256 is universally correct; strictly adhere to the third-party provider's official SDK or webhook documentation.
* **Consequence of violation:** An unverified webhook endpoint allows ANY actor on the internet to forge payment success/failure events, triggering real financial state changes (e.g., activating subscriptions without payment, triggering refunds). This is equivalent to an unauthenticated financial mutation endpoint.
* **This module requires human review (Rule 93):** Any code in webhook signature verification paths MUST have CODEOWNERS human approval before merge.

## 46. Strict Input Sanitization Layer
* **The Rule:** Beyond validation, inputs MUST be sanitized before saving. This is not optional — unsanitized inputs must be treated as `NON_COMPLIANT`. Strip HTML/script tags from free-text fields. Strip leading/trailing whitespaces. Normalize emails (lowercase) and phone numbers to canonical formats before saving.
* **Consequence of violation:** Stored XSS — a member's name saved as `<script>alert(1)</script>` will execute in every admin dashboard that renders it, compromising all admin sessions. Unnormalized emails cause duplicate accounts (e.g., `User@Mail.com` vs `user@mail.com` treated as different users).

## 47. Circuit Breaker Pattern for External Services
* **The Rule:** External adapters (WhatsApp, SMS, Payments) MUST be wrapped in a Circuit Breaker. If the external service fails repeatedly, the breaker opens, rejecting requests instantly with `HttpStatus.SERVICE_UNAVAILABLE` (503) to prevent thread pool exhaustion, triggering a defined fallback queue.
* **Consequence of violation:** Without a circuit breaker, a slow WhatsApp API holds every request thread for its full timeout duration (Rule 97). Under load, all threads are consumed by waiting requests, making the ENTIRE application unresponsive — not just the WhatsApp feature. This is a full application outage caused by a single external dependency.
* **Audit evidence required:** Every external adapter file (`{module}-adapters/`) must have circuit breaker configuration visible in the file. No adapter calling an external HTTP endpoint is compliant without it.

## 48. CQRS Lite (Query vs Command Controllers)
* **The Rule:** Read operations (GET) and Write operations (POST/PATCH/PUT/DELETE) must be split into separate controllers (e.g., `[role]-[module]-query.controller.ts` and `[role]-[module]-command.controller.ts`). This guarantees AI never accidentally touches mutation logic when fixing a read query.

## 49. Explicit Module Dependency Graph (Including Runtime Events)
* **The Rule:** Every module must have a `[role]-[module]-dependencies.md` detailing which other modules it depends on, and which modules depend on it. This maps downstream impact instantly.
* **Event Dependency Rule:** Event publication/subscription is a runtime dependency. Every published/consumed event MUST be explicitly listed in the module's `[role]-[module]-dependencies.md`. Undeclared event subscriptions are forbidden. Event payload contracts must be strictly validated at the consumer boundary.

## 50. Standardized Event Naming Convention
* **The Rule:** Event names MUST follow `DOMAIN.ENTITY.ACTION` in SCREAMING_SNAKE_CASE (e.g., `BILLING.PAYMENT.FAILED`, `MEMBERS.MEMBER.REGISTERED`, `ATTENDANCE.SESSION.CLOSED`) and be registered in a centralized `event-registry.constants.ts`. Two-part forms like `MEMBER_REGISTERED` or `MEMBER.REGISTERED` are non-compliant.

### Single Event Registry Enforcement (NON-NEGOTIABLE)

There MUST be exactly **one** global `event-registry.constants.ts` file in the entire codebase, located at:

```
src/core/event-registry.constants.ts
```

This file serves as the **Host Monolith Event Registry Aggregator** that validates and standardizes all domain event names across all bounded contexts. Creation of any loose, ad-hoc secondary event registry files at the root, in `src/shared/`, or at the parent domain root is **strictly forbidden**:

❌ **FORBIDDEN — these MUST NOT exist:**
- `src/billing-events.constants.ts`
- `src/common/member-events.ts`
- `src/backend-admin/admin-event-registry.ts`
- `src/backend-manager/manager-modules/manager-attendance/attendance-events.ts` (domain root event file banned)
- Any loose file attempting to define a secondary global event registry

When a new domain event is created for the host, the AI MUST register it in `src/core/event-registry.constants.ts`. If a secondary loose event registry file is discovered during an audit, it MUST be flagged as an architecture violation and its contents merged into the central registry.

**Sub-Module Local Event Constants Invariant (Rule 0A.2 Item 7):**
Under the Universal Day-1 Sub-Module Architecture (Rule 0A.2 Item 7), an autonomous sub-module defines its locally emitted/consumed event string constants within its own `{submodule}-constants/[role]-[submodule].events.ts` file (and in `contracts/core-contracts.stub.ts` for ambient event typing) so that the sub-module can be zipped and compiled (`tsc --noEmit`) and tested completely offline without importing host monolith files. When integrating into the host monolith, the host's `src/core/event-registry.constants.ts` aggregates or imports these sub-module event constants to guarantee system-wide contract integrity.

> **AI AGENT NOTE:** Before emitting or consuming any event at the host level, verify the event name exists in `src/core/event-registry.constants.ts`. Within an isolated autonomous sub-module, define emitted events locally in `{submodule}-constants/` and declare them in `required-core-contracts.json` per Rule 0A.2 Item 7.

## 51. API Changelog, Deprecation Policy & Consolidated Integration Guide
* **The Rule:** When an endpoint changes destructively, do not delete it immediately. Return a `Deprecation` header with a sunset date, track it in Section 2 (Endpoint Preservation & DTO Matrix) and Section 1 (Changelog) of the consolidated `INTEGRATION_GUIDE.md` at the root of the delivery ZIP, and maintain it for the deprecation window. Never scatter separate loose changelog or migration markdown files at the root of the delivery package.

## 52. JWT Session, Refresh Rotation, Revocation, and Mobile Storage Policy

Access tokens must be short-lived (e.g., 15 minutes).

Refresh tokens must rotate on every successful refresh. Reuse of an already-rotated refresh token must revoke the affected device session, flag the event, and initiate the breach-containment protocol.

### Web client policy
- Refresh tokens must use Secure, HttpOnly, SameSite cookies.
- The browser must never access refresh-token values through JavaScript.

### React Native / native mobile policy
- Refresh tokens must be stored only in the operating system secure credential store such as iOS Keychain or Android Keystore-backed secure storage (`react-native-keychain`).
- Refresh tokens must never be stored in AsyncStorage, Redux/Zustand state, logs, crash reports, plain files, screenshots, or deep-link URLs.
- Each refresh token must be bound to a device session identifier (`deviceSessionId`).
- The backend must support per-device session revocation and global user-session revocation.
- Access tokens should remain in memory where practical and must not be persisted unless a documented platform security decision explicitly approves it.

### Common backend requirements
1. Store refresh-token hashes only; never persist raw refresh tokens in the database.
2. Maintain token/session revocation state in Redis with durable database reconciliation.
3. Include token family, device session ID, issued time, expiry, and rotation metadata.
4. Log token reuse and forced session revocation in the immutable audit trail.
5. Never return refresh tokens in logs, error responses, analytics events, or Swagger examples.


## 53. Sensitive Field Encryption at Rest
* **The Rule:** Aadhaar numbers, bank accounts, and medical notes MUST be encrypted at the application layer (AES-256) before hitting the DB. Use an `@Encrypted` decorator or EncryptionService. Hash is not enough.

## 54. Brute Force & Account Lockout Policy
* **The Rule:** After 5 failed login attempts, the account is temporarily locked via Redis. Lockout state must be logged in the audit trail.

## 55. Deterministic Seed Data Strategy
* **The Rule:** Every module must define seed files that are deterministic and idempotent. Placement and naming (`.seed.ts`) MUST strictly follow the canonical specification defined in Section 0G-B (Seed File Specification). A master seed script orchestrates them in dependency order for local testing.

## 56. Strict Null Safety in Repository Returns
* **The Rule:** Repositories must correctly type `findById()` as returning `Entity | null`. AI must use a dedicated `findByIdOrThrow()` method to ensure null exceptions are handled defensively.

## 57. Request Context Propagation (AsyncLocalStorage)
* **The Rule:** Use Node's `AsyncLocalStorage` to store context (tenant_id, user_id, trace_id) at the request boundary. Deep services/repositories must pull from this context rather than prop-drilling parameters through 5 layers of functions.

## 58. Standardized Database Entity Base Abstraction

* **The Rule:** All SOFT-DELETABLE database entities MUST implement the common base abstraction for:
  - `id` (UUID)
  - `createdAt`
  - `updatedAt`
  - `deletedAt`

* **NestJS / TypeORM:** Use the approved common BaseEntity abstraction for soft-deletable entities.

* **Django:** Use the approved abstract base model for soft-deletable entities.

* **Immutable Entity Exception:** Rule 118 `events_log` and Rule 119 `ledger_entries` are immutable records and MUST NOT contain or depend on `deletedAt` / soft-delete behavior.

  Immutable record types may use a dedicated immutable base abstraction containing only the common immutable metadata required by the architecture.

* AI agents MUST NOT manually redefine common base fields inconsistently across entities.

* Base repository soft-delete filtering applies only to entities governed by soft-delete semantics.

* Immutable event and financial records MUST bypass soft-delete filtering while remaining permanently append-only.

## 59. API Response Time SLA Categories

Every API endpoint must be categorized into an SLA tier and declared in OpenAPI metadata or a central endpoint performance registry (`endpoint-sla.registry.ts`). A code comment is supplementary only and is not authoritative.

SLA Tiers:
- **Tier 1 — Real-Time (< 50ms):** Auth validation, health checks, cached reads, toggle flags.
- **Tier 2 — Standard CRUD (< 200ms):** Single-entity CRUD, paginated lists (< 20 items), simple filters.
- **Tier 3 — Complex Operations (< 800ms):** Aggregations, multi-table joins, search queries, report previews.
- **Tier 4 — Async / Background (> 800ms):** Heavy exports, bulk imports, PDF generation, external API calls. Must return `202 Accepted` immediately with a `jobId`.

The SLA declaration must be validated by automated tests or CI configuration.


## 60. Strict Foreign Key Naming Convention
* **The Rule:** Database columns must use `snake_case` (e.g., `member_id`). TypeScript model/entity properties must use `camelCase` (e.g., `memberId`). Explicitly map them in the ORM model definition.

  NestJS (TypeORM): `@Column({ name: 'member_id' })` and `@JoinColumn({ name: 'branch_id' })`.

  Django: snake_case column names are the default; use `db_column=` on a `Field` only when overriding.

  Foreign key constraints MUST follow the canonical 3-part form `FK_[table]_[referenced_table]_[column]` (e.g., `FK_subscriptions_members_member_id`). This is the same pattern as Rule 100 — the 2-part form `FK_[table]_[referenced_table]` is deprecated and non-compliant.

## 61. Dead Letter Queue (DLQ) for Failed Background Jobs
* **The Rule:** Every background job queue (BullMQ/Celery) MUST have a configured Dead Letter Queue. If a job fails all retries, it must be moved to the DLQ (not discarded) so admins can manually inspect and retry it.

## 62. Explicit Return Types on ALL Service Methods
* **The Rule:** Relying on TypeScript implicit `any` or inferred returns is forbidden for async operations. Every service method and repository method MUST have an explicitly declared return type (e.g., `Promise<ManagerMembersDomainModel>`).

## 63. Database Connection Pool Configuration

Default database connection-pool settings are forbidden.

The project must configure an explicit total connection budget, pool-size limit, connection-acquisition timeout, idle timeout, database statement timeout, and transaction timeout using the exact configuration shape supported by the installed TypeORM and PostgreSQL driver versions.

AI agents MUST verify the installed package versions and official project configuration before selecting option names. They MUST NOT assume that one TypeORM or PostgreSQL pool option name works across every version.

* **NestJS / TypeORM:**
  ```typescript
  // Configure pool options compatible with pg driver & TypeORM DataSource
  extra: {
    max: 20,                       // Maximum connections in pool per active DataSource
    min: 5,                        // Minimum idle connections
    idleTimeoutMillis: 30000,      // Close idle connections after 30s
    connectionTimeoutMillis: 5000, // Fail if connection not acquired in 5s
    statement_timeout: 10000,      // Terminate any query that takes longer than 10 seconds
  }
  ```
* **Critical for Multi-Tenancy (Rule 39):** The connection pool budget must be calculated across ALL active tenant DataSources combined, not per-tenant. Applying `max: 20` blindly per tenant DataSource will exhaust the PostgreSQL server's `max_connections` ceiling. Tenant pools must use smaller pools (e.g. `max: 5-10`), idle eviction, and bounded LRU DataSource caching.


## 64. Structured Machine-Readable Error Codes
* **The Rule:** Error responses must include a machine-readable `errorCode` string following `DOMAIN.ENTITY.REASON` (e.g., `BILLING.SUBSCRIPTION.EXPIRED`). The frontend relies on this code to trigger specific UI logic (e.g., redirecting to a payment page).

## 65. File Upload Security & Validation
* **The Rule:** All file uploads must undergo MIME type validation (not just extension checking) and enforce strict size limits. Files must never be saved directly to the server disk; upload to cloud storage (e.g., S3). Original filenames must be discarded and replaced with a UUID.

## 66. Strict Database Table Naming Convention
* **The Rule:** All table names must be `plural_snake_case` (e.g., `payment_transactions`). Junction tables must combine the two table names alphabetically (e.g., `member_plans`). Never use legacy prefixes like `tbl_`. Enforce explicitly via `@Entity('table_name')`.

## 67. API Contract Freeze & Cross-Layer Approval (Mutual Contract Freeze)
* **The Rule:** The API contract between the frontend and backend MUST be mutually agreed and frozen before backend implementation code is written. This project follows a **frontend-first workflow** — the sequence is:

```text
Frontend Feature Development
    ↓
UI Data Requirements
    ↓
API Contract (endpoints, request shape, response DTO shape)
    ↓
Frontend TypeScript types + Zod schema
    ↓
MSW handler (frontend mock)
    ↓
Mutual Contract Freeze
    ↓
Backend DTO + OpenAPI/Swagger documentation
    ↓
Backend implementation (services, repositories, DB queries)
```

* **What "Mutual Contract Freeze" means:**
  1. The frontend publishes its `## UI Data Requirements` and `## API Contract` in the feature's `_features.md`.
  2. The backend reviews and agrees that the response DTO shape is feasible from the data model.
  3. **Both layers freeze** — no unilateral renaming of fields, adding required fields, or changing response structure after this point without updating both sides in the same PR.
  4. Only then does the backend write DTOs, Swagger docs, and implementation code.

* **What the backend must NOT do:**
  - Write DTOs in isolation before inspecting the frontend's `UI Data Requirements`.
  - Return a "minimal" response DTO and expect the frontend to adapt — see Rule 82A.
  - Rename fields unilaterally (e.g., `ownerName` → `owner_display_name`) after the contract is frozen.
  - Add or remove required fields without updating the frontend types, Zod schemas, MSW handlers, and tests in the same change.

* **Why:** The previous "backend writes DTOs first" rule conflicted with the frontend-first workflow used in this project. The backend AI writing a DTO without inspecting the frontend's UI Data Requirements produces exactly the minimal-response failure mode that Rule 82A is designed to prevent.

## 68. Health Check Depth Levels
* **The Rule:** Implement 3 levels of health checks: `/health/live` (Process alive? 200 OK), `/health/ready` (DB/Redis reachable? Traffic ready), and `/health/deep` (Full dependency chain check, not exposed publicly).

## 69. Strict Compilation / Type Checking
* **NestJS implementation:** The backend MUST run with `strict: true` in `tsconfig.json`. No `implicitAny`, no `implicitThis`. AI must never add `@ts-ignore` or `@ts-nocheck` to bypass type errors.
* **Django implementation:** The backend MUST enforce strict type hinting (e.g., via `mypy --strict`). AI must never use `# type: ignore` to bypass type errors.

## 70. No Raw `any` from ORM
* **The Rule:** Never allow raw `any` types to escape the ORM layer. Query builder results or raw SQL executions must immediately be mapped to a strictly typed DTO or Entity class.

## 71. UTC Datetime Storage Format
* **The Rule:** ALL dates and times MUST be stored in the database as UTC. The backend must never store local timezones. Any datetime conversion for display purposes should happen purely on the frontend.
* **API Transmission:** All dates and timestamps MUST be serialized and returned in API responses strictly as **ISO-8601 formatted strings** (e.g., `2023-10-25T10:30:00Z`). Never return raw Unix epoch milliseconds or local date strings to the frontend.

### Tenant Business Timezone Rule

UTC remains mandatory for timestamp storage and API timestamp transmission.

However, every tenant must have an explicit IANA business timezone, for example `Asia/Kolkata`. Backend business calculations involving attendance day boundaries, membership expiry dates, business opening hours, invoice cutoffs, scheduled notifications, and daily reports MUST use the tenant business timezone, never the individual mobile device timezone.

Date-only business fields MUST use `YYYY-MM-DD` and must not be converted into UTC timestamps merely for storage convenience.

## 72. Per-Endpoint Payload Size Limits
* **The Rule:** The default global `1mb` limit (Rule 37) can be overridden per-endpoint for specific use cases. General endpoints must reject payloads >1MB. File-upload endpoints must explicitly declare their own larger limit (e.g., `10mb` for profile images, `50mb` for bulk import CSVs). These overrides must be declared in the endpoint's controller decorator, not scattered in middleware.

## 73. Currency and Number Formatting (Paise/Cents Integer Storage)
* **The Rule:** All monetary amounts MUST be stored and transmitted over the API as integers in the smallest currency unit (e.g., paise for INR, cents for USD). Never use floating-point types (`float`, `double`) or decimals for API transmission to avoid rounding errors. 
* **Frontend Responsibility:** The backend transmits `12345600` (paise). It is strictly the frontend's responsibility to divide by 100 and format it as `₹1,23,456.00` for display.

## 74. Mechanical Enforcement of Isolation (The "Tooling Gate")
* **The Rule:** The backend MUST explicitly enforce architectural boundaries mechanically — this is not optional tooling. If using Node.js, mandate `eslint-plugin-boundaries` or `no-restricted-imports`. If using Python, mandate `import-linter`. This guarantees that an AI cannot accidentally import an `attendance` repository into a `billing` service. Trust is not enough; the pipeline MUST block cross-module violations.
* **Consequence of absence:** Without mechanical enforcement, an AI asked to fix a billing bug will import from attendance or members to "save time". This creates hidden cross-module coupling that breaks the repair isolation principle — the entire value of this architecture is destroyed.
* **Audit evidence required:** `.eslintrc` (NestJS) or `importlinter.ini` (Django) file must exist with module boundary rules configured. CI pipeline must run boundary checks on every PR. Absence = `NON_COMPLIANT`.

## 75. Hard File-Size Ceilings (AI Context Limits)

> ⛔ **HARD CEILING — NON-NEGOTIABLE. Files exceeding the limits below are `NON_COMPLIANT`.**
> **Consequence of exceeding:** Files over these limits cannot be safely handed to an AI for targeted repair — the AI loses focus, misreads branch boundaries, and produces collateral damage. Any file over its ceiling MUST be refactored before repair work begins.
> **Procedure when a ceiling is exceeded:** STOP current repair task. Record `NON_COMPLIANT` for the oversized file. Propose a refactor plan to split the file. Execute the split FIRST. Then proceed with the original repair.

| File Type | Maximum Lines | Action if Exceeded |
|---|---|---|
| Controller (`*.controller.ts`) | **200 lines** | Split into query + command controllers (Rule 48) |
| Service (`*.service.ts`) | **300 lines** | Extract granular sub-services + Orchestrator within module (Rule 8, Rule 87) |
| Repository (`*.repository.ts`) | **200 lines** | Split by concern: read/write/search/analytics (Rule 7) |
| Entity/DTO (`*.entity.ts`, `*.dto.ts`) | **150 lines** | Split into multiple focused DTOs |
| Module Config (`*.module.ts`) | **100 lines** | Review imports — barrel file may have crept in (Rule 84) |
| Utilities/Mappers | **120 lines** | Split into focused mapper/utility files |

### Controlled File-Size Exception Process

When a complex domain service, atomic transaction sequence, state machine, or data mapper legitimately requires exceeding the line ceiling, the AI MUST NOT perform an uncontrolled, arbitrary split.

Instead, the AI MUST follow this controlled exception process:
1. Document the exception in the feature's `_features.md` under `## Architecture Exceptions`;
2. Record the exact justification (e.g., preserving atomic database transaction boundary, state transition table);
3. Cap the exception at a strict maximum of 1.5x the standard ceiling (e.g., maximum 450 lines for a Service, 300 lines for a Controller);
4. Flag the file with `// ARCHITECTURE-EXCEPTION: Rule 75 [justification] [review-date]`;
5. Any file exceeding 1.5x of the ceiling is `NON_COMPLIANT` without exception and must be structurally refactored.

## 76. Strict File Responsibility Contract
* **The Rule:** Every backend controller, service, or repository MUST start with a single-line comment at the very top of the file explicitly defining its boundary. (e.g., `// RESPONSIBILITY: Processes incoming Stripe webhooks and emits EVENT_PAYMENT_SUCCESS. No direct DB writes.`). This instantly grounds the AI's context when reading the file.

## 77. Dependency-Addition Guardrail

> ⛔ **STOP BEFORE ANY `npm install` OR `pip install` COMMAND.**
> **An AI agent MUST NOT add any new dependency without explicit human approval.**
> **Consequence of violation:** A new dependency may conflict with the approved package registry (Rule 0G-A), introduce a known CVE (Rule 90 Gate 2), or duplicate an already-approved library — all of which block the CI/CD pipeline and require a full revert.

* **The Rule & Dependency Precedence Hierarchy:**
  When determining package validity, the AI MUST apply this strict authority order:
  1. **Existing Repository `package.json` / `requirements.txt` (Highest Authority):** If the supplied repository already contains and actively uses a dependency not listed in the locked reference registry table, the existing repository manifest takes precedence. The AI classifies it as `LEGACY_REPOSITORY_APPROVED` and MUST NOT flag it as an unauthorized violation or refuse to audit/repair.
  2. **Locked Architecture Dependency Registry (Rule 0G-A):** Authoritative for all new feature additions, scaffolding, or clean-slate modules.
  3. **AI Speculative Package Hallucination:** STRICTLY PROHIBITED. The AI MUST NOT invent, guess, or install unapproved packages.

  Before proposing any new library, the AI MUST:
  1. Check `package.json` or `requirements.txt` to verify the package is not already present.
  2. Check Rule 0G-A (Approved Backend NPM Package Registry) to verify the package is approved.
  3. If not in the approved registry: STOP. Record `DEPENDENCY_NOT_APPROVED`. Do NOT add it. Propose it to the human owner for explicit approval before proceeding.
* **The Escape is NOT available:** There is no "it seemed like the best fit" justification. Only packages in Rule 0G-A or with explicit written owner approval may be added.

## 78. Forbidden Patterns File (`[role]-[module]-forbidden.md`)
* **The Rule:** Every backend module must have a `[role]-[module]-forbidden.md` file listing what is explicitly NOT allowed in that specific module.

### `-forbidden.md` Content Quality Standard

**Failure Conditions — A `-forbidden.md` FAILS quality review if it contains:**
- Fewer than 5 entries
- Generic entries not tied to a specific rule number (e.g., "Never bypass the Orchestrator" with no rule citation)
- Entries that apply to every module equally (e.g., "Do not use console.log") — those belong in the global instruction, not here
- Entries with no explanation of the consequence of violation

#### ❌ BAD — Generic, unactionable:
```markdown
# admin-billing-forbidden.md
- Never bypass the Orchestrator for payments.
- Never mutate the DB without pessimistic locking.
- Do not use console.log.
- Do not bypass API interceptors.
```
*Why this fails: "Never bypass the Orchestrator" with no context tells an AI nothing about which specific call paths are forbidden or what breaks if violated.*

#### ✅ GOOD — Specific, rule-cited, consequence-explained:
```markdown
# admin-billing-forbidden.md

## What is NEVER allowed in this module

1. **Never call AdminBillingWalletRepository directly from outside AdminBillingOrchestratorService.**
   Consequence: Wallet deductions outside the Orchestrator bypass the DB transaction
   boundary, causing partial charges where balance is deducted but plan is not activated.
   Rule: 8 — Edge Case B (Orchestrator Pattern), Rule 41 (Pessimistic Locking).

2. **Never remove the SELECT FOR UPDATE lock from deductBalance().**
   Consequence: Concurrent top-up + deduction requests will race, producing negative
   wallet balances that cannot be recovered without manual DB correction.
   Rule: 41 (Transaction Locks & Race Condition Prevention).

3. **Never process a plan purchase and wallet deduction in separate transactions.**
   Consequence: A crash between the two operations leaves the member charged but
   without an active plan — a financial discrepancy requiring manual reconciliation.
   Rule: 8 — Edge Case B (Orchestrator Pattern).

4. **Never omit the Idempotency-Key check on /billing/wallet/topup.**
   Consequence: Network retries from mobile clients will double-charge the member.
   Rule: 31 (Idempotency Keys for Critical Mutations).

5. **Never return raw ManagerMembersEntity or ManagerBillingWalletEntity from billing service methods.**
   Consequence: ORM entity leakage means a DB column rename breaks service-layer
   callers that should be completely unaware of the schema.
   Rule: 89 (Domain Object vs ORM Entity Separation).
```

**Minimum requirement:** Every `-forbidden.md` must have at least **5 entries**, each with a specific consequence and a Rule citation.

---

## 79. Explicit Data Flow Direction Comment (AI Context Chain)
* **The Rule:** Every backend service, controller, and repository source file MUST begin with an explicit responsibility annotation followed immediately by an explicit data-flow annotation.

* **Framework-specific syntax:**

  * TypeScript / JavaScript:
    `// RESPONSIBILITY:`
    immediately followed by
    `// FLOW:`
  * Python / Django:
    `# RESPONSIBILITY:`
    immediately followed by
    `# FLOW:`

* **The semantic requirement is identical across frameworks. Only the source-language comment syntax changes.**

* **Format example — TypeScript / JavaScript:**

  ```text
  // RESPONSIBILITY: Handles member suspension logic. No direct DB writes — emits events only.
  // FLOW: AdminMembersCommandController → AdminMembersSuspensionService → AdminMembersRepository → EventBus.emit('MEMBERS.MEMBER.SUSPENDED')
  ```

* **Format example — Python / Django:**

  ```text
  # RESPONSIBILITY: Handles member suspension logic. No direct DB writes — emits events only.
  # FLOW: AdminMembersCommandController → AdminMembersSuspensionService → AdminMembersRepository → EventBus.emit('MEMBERS.MEMBER.SUSPENDED')
  ```

* The FLOW must represent the actual ownership and execution path.

* Generic, decorative, copied, or inaccurate FLOW comments are non-compliant.

* **Why:** When an AI agent is given a single file to repair, the responsibility + flow annotation must provide enough execution-context information to reduce unnecessary context expansion and hallucinated dependencies.

---

## 80. Mandatory Method Documentation on All Service Methods, Repositories & Utilities

* **The Rule:** Every service method, repository method, adapter method, and utility/private-helper function MUST have exhaustive method documentation.

* **Framework-specific documentation format:**

  * TypeScript / JavaScript → JSDoc block
  * Python / Django → Python docstring

* **The documentation MUST include:**

  1. proper description of what the method does.
  2. Documentation for every non-trivial argument.
  3. The exact return type / return value semantics.
  4. The exact custom exception(s) / error condition(s) it can produce.
  5. For complex business logic, the reason behind important design decisions.

* **TypeScript / JavaScript example (JSDoc):**
  ```typescript
  /**
   * @description Suspends a member by setting their status to SUSPENDED and emitting the lifecycle event.
   * @param memberId - The UUID of the member to suspend.
   * @param actorId - The UUID of the staff member performing the action (for audit log).
   * @returns The updated ManagerMembersDomainModel with status SUSPENDED.
   * @throws MemberNotFoundException if the memberId does not exist.
   * @throws MemberAlreadySuspendedException if the member is already suspended.
   * @remarks Uses a database transaction to ensure the audit log write and status update are atomic.
   */
  async suspendMember(memberId: string, actorId: string): Promise<ManagerMembersDomainModel> { ... }
  ```

* **Python / Django example (docstring):**
  ```python
  def suspend_member(self, member_id: str, actor_id: str) -> ManagerMembersDomainModel:
      """
      Suspends a member by setting their status to SUSPENDED and emitting the lifecycle event.

      Args:
          member_id: The UUID of the member to suspend.
          actor_id: The UUID of the staff member performing the action (for audit log).

      Returns:
          The updated ManagerMembersDomainModel with status SUSPENDED.

      Raises:
          ManagerMembersNotFoundException: If the member_id does not exist.
          ManagerMembersAlreadySuspendedException: If the member is already suspended.

      Note:
          Uses a database transaction to ensure the audit log write and status update are atomic.
      """
      ...
  ```

* Documentation MUST describe the actual behavior. Generic, stale, copied, or misleading documentation is non-compliant.

---

## 81. Mock-First / Stub-First Development (Parallel Workflow Safety)
* **The Rule:** Just as the frontend is built with mock data before the backend exists, the backend MUST follow the reciprocal workflow: **every new endpoint must first be created as a fully-documented, working stub** before real business logic is written.
* **A "stub" means:**
  1. The controller and route exist and are registered.
  2. The Swagger/OpenAPI documentation for that endpoint is complete and accurate.
  3. The endpoint returns a hardcoded, realistic mock payload that exactly matches the final `ApiResponse<T>` envelope (Rule 28).
  4. The endpoint has `// TODO: Replace with real service call` comments.
* **Why this matters for parallel AI development:** If two AI agents are working simultaneously — one on the frontend UI, one on the backend logic — the frontend agent cannot make progress if the endpoint doesn't exist at all. A working stub with realistic mock data allows the frontend to be fully built and tested against the API contract before the backend implementation is written. This prevents entire feature branches from being blocked.
* **Enforcement:** A stub endpoint MUST never be merged to `main` without either: (a) having its real implementation, OR (b) having a GitHub issue linked in a `// STUB: [link]` comment.

---

### Production Safety Constraints for Stubs
A stub endpoint must never be enabled in staging or production when it can mutate data, simulate payment success, return misleading security-sensitive data, or create a false operational expectation.
Stub endpoints must:
- Be read-only unless explicitly approved for non-production sandboxes.
- Return an explicit non-production/stub indicator header (`X-Stub-Response: true`) in development environments.
- Be disabled or replaced before production release.
- Have contract tests proving response parity with the final endpoint.


## 82. Strict Discriminated Union Response Rule (No Ambiguous `data` Shapes)
* **The Rule:** The `data` field in the standardized API envelope (Rule 28) MUST always be a **single, explicitly typed value** — never a polymorphic bag of mixed objects. The shape of `data` on success MUST be identical in structure regardless of the execution path.
  - ❌ **BAD (Ambiguous):** `data: { member: ManagerMembersResponseDto, invoice: AdminBillingInvoiceResponseDto }` — the frontend `ApiResponse<T>` generic breaks because `T` is not a single entity.
  - ✅ **GOOD:** `data: ManagerMembersWithInvoiceDTO` — a single, explicitly defined DTO that contains both.
  - ❌ **BAD (Inconsistent):** One code path returns `data: ManagerMembersResponseDto`, another returns `data: { member: ManagerMembersResponseDto }`.
  - ✅ **GOOD:** Always `data: ManagerMembersResponseDTO` — one shape, all paths.
* **The Discriminated Union Rule for Errors:** Never put different error shapes inside `data`. All error information belongs strictly in the `error` and `errorCode` fields of the envelope (Rule 64). The `data` field must always be `null` on error responses. No exceptions.
* **Why:** The frontend AI agent generating the type-safe API call relies on `ApiResponse<ManagerMembersResponseDto>` mapping exactly. If the backend AI returns `data: { member: ManagerMembersResponseDto }` instead of `data: ManagerMembersResponseDto`, the TypeScript type system on the frontend will silently pass (because of structural typing) but every `res.data.name` call will return `undefined`, creating bugs that are extremely hard to trace.

---

## 82A. Frontend UI Data Contract Completeness
* **The Rule:** Every backend response DTO MUST satisfy the **complete data contract** documented by the consuming frontend feature's `## UI Data Requirements` section. The backend MUST NOT intentionally return a reduced or "minimal" DTO merely because the database entity contains only a subset of the fields currently visible in the UI.

Before implementing an endpoint, the backend AI MUST verify the corresponding frontend feature's
frozen API contract from the `## Frozen API Contract` section inside the backend feature's own
`-backend-feature.md`. At API Contract Freeze (Rule 67), the frontend publishes its complete
data requirements and the backend copies a snapshot into its own `-backend-feature.md` — then
the backend AI can remain inside `src/backend-[role]/...` without needing the frontend folder.

**If the `## Frozen API Contract` section is not yet populated,** the backend AI MUST inspect:
1. Frontend `_features.md` → `## UI Data Requirements`
2. Frontend `_features.md` → `## API Contract`
3. Frontend TypeScript/API types
4. Zod response schema where available

and immediately copy the result into the backend feature's `## Frozen API Contract` section
before implementing any code.

The backend MUST return every field required by the frontend UI, including fields used by:
- Table columns
- KPI cards
- Charts and chart series
- Filters and search
- Sorting and pagination
- Dropdowns and relational references
- Detail views, modals, and drawers
- Status badges and timeline/history displays

### Required Contract Chain

```text
Frontend UI Data Requirements
    ↓
Frontend API Contract
    ↓
Backend Response DTO
    ↓
Service Layer
    ↓
Repository / Query
    ↓
Database
```

### Completeness Rule

Every field consumed by the frontend MUST have:
- An explicitly named Response DTO field
- A defined source or derivation rule (which DB column or JOIN produces it)
- The correct nullability matching the frontend's Zod schema
- An OpenAPI/Swagger `@ApiProperty()` description
- A corresponding value in the stub response during stub-first development (Rule 81)

The backend MUST NOT return `undefined`, omit required fields, rename fields independently, or change nested response structure without updating the frontend contract first (Rule 67).

### No Frontend Reconstruction Rule

Do not force the frontend to reconstruct business-level values such as:
- Owner name derived from owner ID alone
- Plan name derived from plan ID alone
- Member count derived from a separate list query
- Revenue totals derived from individual transaction records
- Status labels assembled from unrelated fields

When the UI contract requires such information, the backend MUST provide it through a **dedicated Response DTO** that assembles the required data via JOINs, aggregations, or dedicated service methods — not by leaving the reconstruction to the frontend.

### Stub Parity Rule

The stub response (Rule 81) MUST contain the **same complete field structure** as the eventual real implementation. A stub is NOT contract-complete if it returns only the fields convenient for initial development. The stub is the frontend's development contract — it must be identical in shape to the final response.

### Minimal DTO Anti-Pattern (Forbidden)

```text
❌ FORBIDDEN:
UI requires: name, ownerName, planName, memberCount, revenue, status
Backend returns: { id, name, status }

✔ REQUIRED:
Backend returns: { id, name, ownerName, planName, memberCount, revenue, status }
with all fields assembled via JOIN or dedicated query.
```

### Contract Change Rule

If a backend implementation cannot provide a field currently required by the frontend:
1. Do NOT silently omit the field from the response.
2. Do NOT fabricate a placeholder value in production.
3. Document the limitation clearly in the `-backend-feature.md`.
4. Propose the contract change explicitly.
5. Update the frontend `## UI Data Requirements`, API Contract, TypeScript types, Zod schema, MSW handler, and tests in the same PR before merging the breaking change.

* **Why:** This prevents the exact failure mode where an MSW response or API returns only a few fields and the remaining table columns, KPI cards, and chart series render empty or `undefined`. The consuming feature's UI data contract prevents the frontend from papering over the gap with hardcoded fallback data — so the backend must provide the complete contract instead.

---

## 83. Centralized RBAC / Permission Guards (Role-Based Access Control)
* **The Rule:** Role and permission checks must NEVER be done inline inside service methods or repository layers (e.g., `if (user.role === 'admin')`). Permission enforcement is strictly a **controller-layer concern** and must be implemented using centralized, declarative guards or decorators.

### Non-HTTP Execution Authorization

Controller guards are the primary authorization boundary for HTTP requests.

For workers, event consumers, scheduled jobs, webhooks, retry processors, and internal commands, authorization and tenant scope MUST be validated using a dedicated application-policy service and a trusted execution context.

Services and repositories MUST NOT contain ad-hoc inline role checks. However, critical domain operations may require an explicit trusted actor/context object so the operation cannot execute without verified authorization, tenant scope, correlation ID, and execution source.
* **How to implement per framework:**
  - **NestJS:** Use a `@Roles(...)` custom decorator paired with a global `RolesGuard` that reads the JWT payload. Never check `req.user.role` inside a service.
  - **Django:** Use Django REST Framework's `IsAuthenticated` + custom `Permission` classes (e.g., `IsAdminOrManager`). Never check `request.user.is_staff` inside a view's business logic.
* **Fine-Grained Resource Permissions:** For resource-level checks (e.g., "Can this manager see only their branch's members?"), create a dedicated `[role]-[module]-authorization.service.ts`. This service receives the actor and the resource and returns a boolean. The controller calls this service before delegating to the business service.
* **Centralized Role Registry:** All role names and permission strings MUST be defined as enums in a central `auth.roles.constants.ts` file. Never use raw strings like `'admin'` or `'manager'` directly in guards or decorators.
  - ❌ **BAD:** `@Roles('admin', 'superadmin')`
  - ✅ **GOOD:** `@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)`
* **Why:** Client-side visibility is not authorization. The backend MUST independently enforce authentication, role, resource, and tenant authorization. An AI writing a new endpoint will forget to add auth checks if there is no standard, centralized pattern to follow. A declarative decorator is impossible to forget because it's visible at the route definition.

---



## 84. No Barrel File / Re-Export Index Rule & Facade Naming
* **The Rule:** Strictly avoid using `index.ts` or `index.js` files to re-export modules (barrel files). This restriction exists to preserve AI context isolation and prevent dependency expansion. Always import directly from the explicitly named source file.
  - ❌ **BAD:** `import { MemberService } from '@/backend-manager/manager-modules/manager-members'` (where `members/index.ts` re-exports everything)
  - ✅ **GOOD:** `import { MemberRegistrationService } from '@/backend-manager/manager-modules/manager-members/members-services/manager-members-registration.service'`
* **Facade / Re-export Naming:** If a module absolutely requires a facade or re-export file (e.g., to export multiple schemas or mappers from a sub-folder into one file), the file name MUST explicitly end with `-export.ts` to immediately signal its purpose to AI and developers.
  - Example: `manager-attendance-schema-export.ts` (placed inside `attendance-schemas/`).
* **Why barrel files are dangerous in AI-driven codebases:**
  1. **Circular Dependencies:** Barrel files are the #1 cause of circular dependency errors in NestJS and Django projects. An AI adding a new export to a barrel file can silently create a circular import cycle that causes runtime crashes.
  2. **AI Context Pollution:** When an AI imports `from '@/backend-manager/manager-modules/manager-members'`, it loads the entire barrel into context — all services, all DTOs, all repositories. With direct imports, the AI only loads exactly what it needs, drastically reducing hallucination risk.
  3. **Dead Code Masking:** Barrel files make tree-shaking and unused-code detection nearly impossible, hiding dead code from AI and human reviewers alike.
* **Enforcement:** Mechanically enforce via ESLint `no-restricted-imports` or a custom rule that flags imports from `index.ts` paths.

---

## 85. Guard Clause / Early Return Pattern (No Nested Conditional Hell)
* **The Rule:** Deeply nested `if/else` blocks inside service methods are strictly forbidden. Guard clauses keep service methods narrow, predictable, and AI-repairable. All service methods MUST use the **Guard Clause** (Early Return) pattern: validate inputs and exit early at the top of the function, keeping the happy path flat and readable.
  - ❌ **BAD (Nested):**
    ```typescript
    async suspendMember(id: string) {
      const member = await this.repo.findById(id);
      if (member) {
        if (member.status !== 'SUSPENDED') {
          if (member.hasActiveSubscription) {
            // ... actual logic buried 3 levels deep
          } else { throw new Error('No subscription'); }
        } else { throw new Error('Already suspended'); }
      } else { throw new Error('Not found'); }
    }
    ```
  - ✅ **GOOD (Guard Clauses + Repository-Owned Mutation):**
    ```typescript
    async suspendMember(id: string): Promise<ManagerMembersDomainModel> {
      const member = await this.memberRepo.findByIdOrThrow(id);

      if (member.status === MemberStatus.SUSPENDED) {
        throw new ManagerMembersAlreadySuspendedException(id);
      }

      if (!member.hasActiveSubscription) {
        throw new ManagerMembersNoActiveSubscriptionException(id);
      }

      return this.memberRepo.suspendById(id, new Date());
    }
    ```
* **Maximum Nesting Depth:** No function body may have more than **2 levels of indentation** for conditional logic. If a third level is needed, extract it into a private helper method.
* **Why:** An AI given a deeply nested 80-line service method will frequently misread the logic branches and introduce bugs at the wrong `else` block. A flat, guard-clause-driven function is scannable in 5 seconds, making AI edits surgical and safe.

---

## 86. Strict Method Naming Convention (The Verb Contract)
* **The Rule:** All service and repository method names MUST follow a strict, predictable verb-based naming convention. AI agents must never invent arbitrary method names. The convention is:

  | Operation | Service Layer Verb | Repository Layer Verb |
  |---|---|---|
  | Create | `create[Entity](dto)` | `create[Entity](data)` |
  | Read single | `find[Entity]ById(id)` | `findById(id)` |
  | Read single (throws) | `find[Entity]ByIdOrThrow(id)` | `findByIdOrThrow(id)` |
  | Read list | `findAll[Entities](filters)` | `findAll(filters)` |
  | Update | `update[Entity](id, dto)` | `updateById(id, dto)` or a domain-specific named mutation |
  | Soft Delete | `delete[Entity](id)` | `softDelete(id)` |
  | Check existence | `does[Entity]Exist(id)` | `existsById(id)` |
  | Count | `count[Entities](filters)` | `count(filters)` |

Repository mutation methods MUST be intention-revealing.
The generic ORM persistence primitive (`save`, `update`, `create`, etc.) is an implementation detail and MUST NOT be part of the public service-facing contract.
Services call named repository methods. Repositories alone may call the underlying ORM persistence APIs.
This rule MUST remain consistent with Rule 99.

* **The `OrThrow` Pattern:** Repository methods that return a single entity MUST have two variants: `findById(id): Entity | null` (returns null if not found) and `findByIdOrThrow(id): Entity` (throws `EntityNotFoundException` if not found). Services must choose explicitly — never let a `null` propagate silently.
* **Why:** When two different AI agents work on two different modules, they will produce consistent, predictable method signatures. Any AI reading a repository interface instantly knows what methods are available without having to read the implementation. This eliminates the most common AI mistake: calling a method that doesn't exist (hallucinated method names).

---

## 87. Single Responsibility at Method Level (The 20-Line Rule)
* **The Rule:** Just as the frontend mandates hook separation to split logic from UI, the backend mandates that **every service method must do exactly ONE thing**. If a method is doing more than one distinct business operation, it must be split into private helper methods or separate sub-services.
* **The 20-Line Soft Ceiling:** A service method body (excluding method documentation) should rarely exceed ~20 lines. If a method grows beyond this, it is a signal that it is doing too much and must be decomposed.
* **Decomposition Pattern:**
  - ❌ **BAD:** A single `registerMember()` method that validates, saves the member, creates a subscription, charges the card, sends a welcome email, and writes an audit log — all in one 80-line function.
  - ✅ **GOOD:** `registerMember()` is an Orchestrator (Rule 8) that calls: `this.memberRepo.createMember(data)`, then emits `EventBus.emit('MEMBERS.MEMBER.REGISTERED', ...)`. The subscription creation, payment charging, and email are handled by separate listeners.
* **Private Helper Rule:** If a method needs a private helper for a sub-calculation (e.g., calculating a pro-rated amount), the helper must be a `private` method with its own framework-appropriate method documentation (Rule 80) clearly named for its specific task (e.g., `private calculateProRatedAmount()`).
* **Why:** An AI asked to "add audit logging to member registration" should be able to do so by touching exactly ONE file and ONE method — the event listener for `MEMBERS.MEMBER.REGISTERED`. If the entire registration flow is monolithic, the AI must read and modify a 200-line method, risking collateral damage.

---

## 88. Strict Import Order Convention (Mechanical ESLint Enforcement)
* **The Rule:** All backend TypeScript/JavaScript files MUST enforce a strict, consistent import order. Configure ESLint's `import/order` rule to enforce the following groups in this exact sequence:
  1. **Node.js built-ins** (e.g., `node:fs`, `node:path`)
  2. **Framework core** (e.g., `@nestjs/common`, `express`, `django`)
  3. **Third-party packages** (e.g., `class-validator`, `class-transformer`, `bcrypt`, `typeorm`)
  4. **Internal absolute imports — Infrastructure** (e.g., `@/infrastructure/config/`, `@/infrastructure/database/`)
  5. **Internal absolute imports — Module-specific** (e.g., `@/backend-manager/manager-modules/manager-billing/...`)
  6. **Relative imports** (strictly forbidden per Rule 10 — this group must always be empty)
  7. **Type-only imports** (`import type { ... }`) must always be last
* **Blank line separation:** Each group must be separated by a blank line. No mixing of groups.
* **Example:**
  ```typescript
  import { Injectable } from '@nestjs/common';

  import { Repository } from 'typeorm';

  import { DatabaseConfig } from '@/infrastructure/config/database.config';

  import { ManagerMembersEntity } from '@/backend-manager/manager-modules/manager-members/members-repositories/manager-members.entity';
  import { ManagerMembersNotFoundException } from '@/backend-manager/manager-modules/manager-members/members-exceptions/manager-members.exceptions';

  import type { ManagerMembersCreateDto } from '@/backend-manager/manager-modules/manager-members/members-dto/manager-members-create.dto';
  ```
* **Why:** Chaotic import ordering in AI-generated code causes two specific problems: (1) Merge conflicts explode because every AI agent adds imports in a different location, (2) Circular dependency detection becomes nearly impossible because the import graph is visually unreadable. A strict, mechanical ESLint rule makes import diffs surgical and circular deps immediately obvious.

---

## 89. Domain Object vs. ORM Entity Separation (Anti-Persistence-Leakage Rule)
* **The Rule:** Never use ORM Entity classes (e.g., TypeORM `@Entity()` classes, Django ORM models) directly inside business logic services. ORM entities are a **persistence infrastructure concern** — they contain database annotations, lazy-loading relations, and schema metadata that have no place in pure business logic.
* **The Pattern — Two Distinct Objects + Mapper:**
  1. **ORM Model / Entity** (`admin-members.entity.ts` for TypeORM, or the corresponding Django ORM model): Contains only database schema definition. Lives in the repository layer only.
  2. **Domain Model** (`admin-members.domain.ts`): A plain TypeScript class/interface with pure business properties and zero ORM imports. Services and event handlers receive and return this. It is NOT the same as a Response DTO.
  2b. **Response DTO** (`admin-members-response.dto.ts`): The API-serializable shape returned to the caller. Explicitly mapped from the Domain Model. Request DTOs are also distinct — never share one DTO for both directions.
  3. **Mapper** (`admin-members.mapper.ts`): A dedicated class with `toDomain(entity)` and `toEntity(domain)` static methods that translate between the two. Only the repository layer calls the mapper.
* **Absolute Rule:** The exception for a "unified model" is strictly forbidden. Maximum AI isolation requires a predictable, exception-free architecture. A mapper must be used even for simple CRUD modules.
* **Why:** AI agents default to using ORM entities everywhere — passing `ManagerMembersEntity` into services, emitting it over the EventBus, returning it from controllers. This "persistence leakage" means a database schema change (e.g., renaming a column) breaks business logic files that should be completely unaware of the database. A Mapper is the single controlled translation point, and it is the only file the AI needs to touch when the schema changes.

### Mapper Physical Location Rule (MANDATORY)

All mappers MUST live inside the owning module's `{module}-mappers/` sub-folder. No other location is permitted.

```
{role}-{module}/
└── {module}-mappers/
    └── {role}-{module}.mapper.ts
```

**Examples:**
- `admin-members/members-mappers/admin-members.mapper.ts`
- `manager-billing/billing-mappers/manager-billing.mapper.ts`

❌ **FORBIDDEN mapper locations:**
- `admin-members/mappers/admin-members.mapper.ts` (unprefixed folder)
- `admin-members/utils/admin-members.mapper.ts` (wrong folder type)
- `admin-members/admin-members.mapper.ts` (root of module — not allowed)

### Domain Model Physical Location Rule (MANDATORY)

All domain models MUST live inside the owning module's `{module}-domain/` sub-folder. No other location is permitted.

```
{role}-{module}/
└── {module}-domain/
    └── {role}-{module}.domain.ts
```

**Examples:**
- `admin-members/members-domain/admin-member.domain.ts`
- `manager-billing/billing-domain/manager-billing.domain.ts`

❌ **FORBIDDEN domain model locations:**
- `admin-members/models/member.ts` (generic, no prefix)
- `admin-members/domain/member.domain.ts` (unprefixed folder)
- `admin-members/entities/member.domain.ts` (entities/ is for ORM entities only)

> **AI AGENT NOTE:** ORM Entity files (`*.entity.ts`) belong ONLY inside the `{module}-repositories/` folder — never in `{module}-domain/`. The domain folder contains pure business objects with zero ORM imports. Mixing them defeats the entire purpose of Rule 89.

---

## 90. Automated Security Gates in CI/CD Pipeline (Shift-Left Security)
* **The Rule:** All backend AI-generated code is **untrusted input** until proven otherwise. AI code suggestions can frequently introduce security vulnerabilities or performance regressions. The CI/CD pipeline MUST implement non-bypassable automated security gates on every Pull Request before any merge is allowed.
* **Mandatory Gate 1 — SAST (Static Application Security Testing):** Run a SAST scanner (e.g., `Semgrep`, `SonarQube`, `CodeQL`) on every PR. Any `Critical` or `High` severity finding MUST block the merge. AI agents cannot self-certify their own code as secure.
* **Mandatory Gate 2 — SCA (Software Composition Analysis):** Run a dependency vulnerability scanner (e.g., `npm audit`, `safety` for Python, `Snyk`) on every PR. Any new dependency with a known `Critical` CVE must block the merge.
* **Mandatory Gate 3 — Secrets Detection:** Run a secrets scanner (e.g., `GitLeaks`, `Trufflehog`) on every PR diff. A single hardcoded API key or database password in a commit is a catastrophic security breach. This gate must never be skipped.
* **Mandatory Gate 4 — Strict Type Check:**
  - **NestJS:** Run `tsc --noEmit` on every PR. The build must pass with zero type errors — no `@ts-ignore` bypasses allowed (Rule 69).
  - **Django:** Run `mypy --strict` on every PR. The build must pass with zero type errors — no `# type: ignore` bypasses allowed (Rule 69).
* **Why:** The backend requires the same discipline as the frontend but with an added focus on security. An AI writing authentication or payment code must have its output automatically vetted before it reaches production.

---

## AI Enforcement Principle

No AI agent can be trusted to enforce architecture rules by instruction alone.

Every high-risk architecture requirement must have at least one mechanical control:
- ESLint/import boundary rule
- TypeScript strict compilation
- unit test
- API contract test
- E2E tenant-isolation test
- database constraint
- migration validation
- CI gate
- CODEOWNERS review
- pre-commit secret scan

If a rule cannot be mechanically enforced, the feature documentation must identify the responsible human review gate.


## 91. Mandatory Backend Pre-Commit Hooks (Blocking Gates Before Commit)
* **The Rule:** The backend repository MUST configure pre-commit hooks using `husky` (Node.js) or `pre-commit` framework (Python) to run fast, blocking checks before every `git commit`. A pre-push hook is an optional additional gate, but pre-commit is mandatory. These hooks run locally on the developer/AI agent's machine — they are the first line of defense before code reaches CI.
* **Required Pre-Commit Checks (must all pass):**
  - **NestJS implementation:**
    1. `tsc --noEmit` — TypeScript type check. Zero errors required.
    2. `eslint --fix` — Auto-fix lint violations; fail if unfixable violations remain.
    3. `prettier --check` — Code format verification.
    4. `gitleaks detect --no-git` — Secret scanning on staged files only (fast).
  - **Django implementation:**
    1. `mypy --strict` — Python type check. Zero errors required.
    2. `ruff check --fix` (or equivalent) — Auto-fix lint violations; fail if unfixable violations remain.
    3. `ruff format --check` (or `black --check`) — Code format verification.
    4. `gitleaks detect --no-git` — Secret scanning on staged files only (fast).
* **Staged Files Only:** Use `lint-staged` (or `pre-commit`) for file-scoped checks; however, strict type checking (`tsc --noEmit` / `mypy`) is intentionally project-wide.
* **Why:** CI/CD gates (Rule 90) catch issues at the PR stage, which means an AI agent can push broken/insecure code to the remote branch. Pre-commit hooks catch the same issues before the push ever happens, providing instant feedback and preventing noise in the PR history.

---

## 92. ORM Raw Input Injection Prevention (The Query Safety Rule)
* **The Rule:** Never interpolate user-controlled input directly into ORM query methods. This is a critical AI-specific risk because AI agents frequently generate "convenient" but insecure query patterns.
* **The Specific Patterns to BAN:**
  - ❌ **BAD (SQL Injection via dynamic sort field):**
    ```typescript
    // NEVER do this — sortField comes from req.query and is unvalidated
    // Works the same way in any ORM with raw query string interpolation
    db.query(`SELECT * FROM members ORDER BY ${req.query.sortField} ASC`);
    ```
  - ✅ **GOOD (Allowlist Pattern):**
    ```typescript
    const ALLOWED_SORT_FIELDS = ['name', 'createdAt', 'status'] as const;
    type SortField = typeof ALLOWED_SORT_FIELDS[number];
    const sortField = ALLOWED_SORT_FIELDS.includes(req.query.sortField as SortField)
      ? req.query.sortField as SortField
      : 'createdAt'; // safe default
    // Pass validated sortField to ORM method or parameterized query
    ```
  - ❌ **BAD (Raw SQL with template literals):**
    ```typescript
    // NEVER — classic SQL injection
    db.query(`SELECT * FROM members WHERE name = '${req.query.name}'`);
    ```
  - ✅ **GOOD (Parameterized query):**
    ```typescript
    const allowedSortFields = {
      name: 'member.name',
      createdAt: 'member.created_at',
      status: 'member.status',
    } as const;

    const sortColumn = allowedSortFields[validatedSortField];

    const members = await repository
      .createQueryBuilder('member')
      .where('member.name = :name', { name: validatedName })
      .orderBy(sortColumn, validatedSortOrder)
      .getMany();
    ```
* **Allowlist-First Mandate:** Any query that uses a user-supplied column name, sort field, or filter key MUST validate it against a strict allowlist defined in the module's constants file before passing it to the ORM.
* **Why:** ORM query builders that accept raw column name strings for `orderBy`, `select`, and `where` do NOT automatically parameterize field names. An AI will generate dynamic field interpolation as a clean, "logical" pattern without realizing it's an injection vulnerability. This rule makes the safe pattern the only acceptable pattern.

---

## 93. Human-in-the-Loop Gate for Security-Critical AI Code
* **The Rule:** Certain backend modules and functions are so security-critical that AI-generated code for them requires mandatory human review before merging — no exceptions, even if all automated gates pass. These are modules where a single bug can cause financial loss, data breach, or unauthorized access.
* **Mandatory Human Review Required For:**
  1. **Authentication & Token Logic** — Any code in `auth/` modules, JWT generation/validation, refresh token rotation (Rule 52), session management.
  2. **Authorization & Permission Guards** — Any new `@Roles()` decorator usage, `RolesGuard` modifications, resource-level authorization services (Rule 83).
  3. **Payment & Financial Mutations** — Any code that triggers charges, refunds, wallet deductions, or invoice generation.
  4. **Database Migration Files** — Any migration that adds `NOT NULL`, drops a column, or modifies a primary key. (Rule 24).
  5. **Webhook Signature Verification** — Any code in webhook handlers that verifies HMAC/cryptographic signatures (Rule 45). A bypass here allows forged payment/delivery events to trigger real financial or state-changing actions — the risk is equivalent to a direct payment mutation.
  6. **Tenant Provisioning & Connection Routing** — Any code that creates a new tenant database, runs migrations programmatically, or resolves an authorized TenantContext to a tenant DataSource (Rule 39). A bug here risks cross-tenant data leakage — the single most severe failure mode in this architecture. This includes both the provisioning flow AND any modification to the request-scoped connection resolver.
* **Implementation:** In GitHub/GitLab, create a `CODEOWNERS` file mapping these folders to specific human reviewers. PRs touching these paths cannot be merged without a human approval even if all CI gates pass.
* **Non-Blocking During AI Development:** This gate applies strictly at Git Pull Request / deployment time before merging into protected branches. It does NOT halt, pause, or block local AI development. AI agents MUST generate the complete source code, comprehensive unit/integration tests, and the mandatory `## Security Impact Analysis` markdown section autonomously without pausing, stalling, or asking for permission during code generation.
* **PR Description Mandate:** Any PR touching these modules MUST include a section titled `## Security Impact Analysis` explaining what changed, what the risk surface is, and why the change is safe.
* **Why:** AI code suggestions can frequently introduce security vulnerabilities, especially in security-critical paths. An AI agent might generate a logically correct but cryptographically weak JWT validation, or a permission guard with a subtle bypass. Automated tools cannot catch all semantic security flaws — a human security review is the final, non-negotiable gate.

---

## 94. Canonical `PaginationMeta` Shape (Response Pagination Envelope Consistency)
* **The Rule:** Rule 28 mandates that the response envelope supports a `meta?: PaginationMeta` field, but never defines its exact shape. Every AI agent left to its own devices will invent a different structure — some return `totalPages`, some return `total`, some return `hasNextPage`, some return all three with different key names. This creates a frontend parsing nightmare.
* **The Canonical `PaginationMeta` Shape — this is the ONLY acceptable definition:**
  ```typescript
  // src/core/types/pagination.types.ts
  export interface PaginationMeta {
    total: number;        // Total number of records matching the query (before pagination)
    page: number;         // Current page number (1-indexed)
    limit: number;        // Number of records per page
    totalPages: number;   // Math.ceil(total / limit) — pre-calculated by the backend
    hasNextPage: boolean; // page < totalPages
    hasPrevPage: boolean; // page > 1
  }
  ```
* **Rules:**
  - `total` is always the count of ALL matching records, not just the current page.
  - `page` is always **1-indexed** (first page = `1`, not `0`).
  - `totalPages`, `hasNextPage`, and `hasPrevPage` MUST be pre-calculated by the backend. The frontend must never compute these from `total` and `limit` — that logic belongs in one place.
  - For non-paginated list endpoints (e.g., dropdown options), `meta` must be `undefined` — never an empty object `{}`.
  - A shared `buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta` utility must exist in `src/core/utils/pagination.utils.ts` and be used by ALL repositories. Never calculate pagination fields inline per-repository.
* **Standard Query DTO:**
  ```typescript
  // src/core/dtos/pagination-query.dto.ts
  export class PaginationQueryDto {
    @IsOptional() @Type(() => Number) @IsInt() @Min(1)
    page?: number = 1;

    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
    limit?: number = 20;
  }
  ```
  All paginated query DTOs MUST extend `PaginationQueryDto`. Never define `page` and `limit` fields independently per-module.
* **Example response:**
  ```json
  {
    "success": true,
    "message": "Members fetched successfully",
    "data": [...],
    "meta": {
      "total": 243,
      "page": 2,
      "limit": 20,
      "totalPages": 13,
      "hasNextPage": true,
      "hasPrevPage": true
    }
  }
  ```
* **Why:** All API consumers MUST treat `PaginationMeta` as the canonical pagination shape. If the backend returns `total_count` instead of `total`, the consumer type breaks silently and pagination controls show `NaN` pages. One canonical shape, defined once, used everywhere.

---

## 95. Enum-Driven Entity Status Fields (No Raw String Columns)
* **Framework-independent contract:** All entity columns that represent a finite set of states (e.g., `status`, `type`, `role`, `medium`, `priority`) MUST use a strictly typed enum structure — never raw string literals. Saving a typo (e.g. `'actve'`) to the database must be a **compile-time or strict validation error**, not a silent data corruption bug discovered in production. Enum values MUST be `SCREAMING_SNAKE_CASE` strings (e.g., `'ACTIVE'`, `'IN_PROGRESS'`) so they are human-readable in raw database queries.

### NestJS implementation
* **Definition:** Use a TypeScript enum. All enums MUST be defined in the module's `[role]-[module].constants.ts` file (Rule 5) — never inline inside the entity file.
* **Database:** Map it to a PostgreSQL enum column.
* **Validation:** DTO validation for enum fields MUST use `@IsEnum(MemberStatus)` from `class-validator` — never `@IsString()`.

Example:
```typescript
export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
}

@Column({
  type: 'enum',
  enum: MemberStatus,
  default: MemberStatus.PENDING,
})
status: MemberStatus;
```

### Django implementation
* **Definition:** Use Django's `models.TextChoices`. Enums must be defined in `constants.py` or closely co-located with the model.
* **Database:** Map it to a `CharField` with `choices=MemberStatus.choices`.
* **Validation:** Serializer validation for enum fields MUST use `ChoiceField(choices=MemberStatus.choices)` or rely on the ModelSerializer mapping.

Example:
```python
class MemberStatus(models.TextChoices):
    ACTIVE = 'ACTIVE', 'Active'
    SUSPENDED = 'SUSPENDED', 'Suspended'
    EXPIRED = 'EXPIRED', 'Expired'
    PENDING = 'PENDING', 'Pending'
    
status = models.CharField(max_length=20, choices=MemberStatus.choices, default=MemberStatus.PENDING)
```

### Database-Level Enforcement
When adding a new enum value, a database migration MUST be generated to update the DB type or constraint. Never rely on ORM auto-sync in production (Rule 24).

* **Why:** AI agents default to `string` columns for status fields because it's the path of least resistance. A single typo (`'actve'` instead of `'active'`) silently corrupts data — the record is saved, no error is thrown, but every `WHERE status = 'ACTIVE'` query silently excludes that record. TypeScript enums make this a compile-time error that is caught before the code ever runs.

---

## 96. Scheduled Job Documentation & Centralized Inventory
* **The Rule:** Rule 42 mandates distributed cron jobs technically, but in a large system with 10+ scheduled jobs across multiple modules, nobody — human or AI — knows what jobs exist, when they run, what data they touch, or what happens if they fail. This is a critical operational blind spot. Every scheduled job MUST be registered in a centralized inventory.
* **Required File (NestJS):** `src/core/scheduled-jobs.registry.ts` — a single file that serves as the master inventory of ALL background scheduled jobs.
* **Required File (Django):** `core/scheduled-jobs-registry.py` (or central Celery Beat schedule configuration) — serves as the master inventory.
  ```typescript
  // Example for NestJS: src/core/scheduled-jobs.registry.ts
  // RESPONSIBILITY: Master inventory of all scheduled jobs. Update this file whenever
  // a new job is added, modified, or removed anywhere in the application.

  export const SCHEDULED_JOBS_REGISTRY = [
    {
      name: 'MembershipExpiryNotifier',
      module: 'members-roster',
      file: 'src/backend-manager/manager-modules/manager-members/members-roster/roster-jobs/manager-members-roster-expiry-notifier.job.ts',
      schedule: '0 9 * * *',          // Every day at 9:00 AM UTC
      description: 'Sends renewal reminder notifications to members whose membership expires in 3 days.',
      touchesEntities: ['members', 'notifications'],
      failureBehavior: 'Logs to DLQ. Member does not receive reminder. Non-critical.',
      idempotent: true,
      lastReviewedBy: 'backend-team',
    },
    {
      name: 'WalletAutoDeductionJob',
      module: 'billing-subscriptions',
      file: 'src/backend-manager/manager-modules/manager-billing/billing-subscriptions/subscriptions-jobs/manager-billing-subscriptions-wallet-auto-deduction.job.ts',
      schedule: '0 0 1 * *',          // 1st of every month at midnight UTC
      description: 'Auto-deducts monthly plan fees from member wallets for active auto-renew subscriptions.',
      touchesEntities: ['wallets', 'subscriptions', 'payment_transactions'],
      failureBehavior: 'CRITICAL — moves to DLQ. Triggers alert to ops team. Member is NOT charged until manual retry.',
      idempotent: true,               // Uses Idempotency-Key per Rule 103
      lastReviewedBy: 'backend-team',
    },
  ] as const;
  ```
* **Mandatory fields per entry:** `name`, `module`, `file`, `schedule` (cron expression), `description` (what it does in plain English), `touchesEntities` (which DB tables it reads/writes), `failureBehavior` (what breaks if the job fails), `idempotent` (boolean — is it safe to run twice?).
* **`-backend-feature.md` Integration:** The "Data and State Architecture" section of every module's `-backend-feature.md` (Rule 19) MUST list all scheduled jobs owned by that module, referencing the registry entry by name.
* **Operational Rules:**
  - A new scheduled job MUST be added to the registry in the same PR as the job implementation. A job without a registry entry is considered undocumented and must be blocked at code review.
  - Any job that touches financial data (`wallets`, `payment_transactions`, `subscriptions`) is automatically subject to the CODEOWNERS human review gate (Rule 93).
  - Every scheduled job MUST have a Dead Letter Queue configured (Rule 61) — no exceptions.
* **Why:** Without a centralized inventory, an AI asked to "add a new cleanup job" has no way of knowing that a similar job already exists in another module, leading to duplicate jobs running simultaneously. More critically, when a production incident occurs at 2 AM and a scheduled job is the suspected cause, the on-call engineer needs to find it in under 60 seconds — not grep through 50 module folders.

---

## 97. API Timeout & Downstream Dependency Timeout Policy
* **The Rule:** Rule 47 covers circuit breakers for when external services fail repeatedly. But circuit breakers only open after failures accumulate. The first line of defense is **explicit timeouts** on every outbound call. An AI will never set timeouts by default — it will write `await axios.get(url)` with no timeout, meaning a slow external service can hold a Node.js thread indefinitely, silently exhausting the connection pool and causing cascading failures across the entire application.
* **Mandatory Timeout Tiers — define these in `src/core/config/timeout.config.ts`:**
  ```typescript
  export const TIMEOUT_CONFIG = {
    // Outbound HTTP calls to external services
    EXTERNAL_API_DEFAULT_MS: 5_000,    // 5s — default for all external HTTP calls
    PAYMENT_GATEWAY_MS: 10_000,        // 10s — payment APIs are slower but critical
    WHATSAPP_API_MS: 4_000,            // 4s — messaging APIs
    SMS_API_MS: 3_000,                 // 3s — SMS APIs

    // Database query timeouts
    DB_QUERY_DEFAULT_MS: 3_000,        // 3s — standard queries
    DB_QUERY_REPORT_MS: 30_000,        // 30s — analytics/report queries
    DB_TRANSACTION_MS: 10_000,         // 10s — multi-step transactions

    // Background job step timeouts
    JOB_STEP_DEFAULT_MS: 30_000,       // 30s — individual job processor step
  } as const;
  ```
* **Enforcement Rules:**
  - Every `axios` / `fetch` / `HttpService` call in an adapter (Rule 8) MUST pass `timeout: TIMEOUT_CONFIG.EXTERNAL_API_DEFAULT_MS` (or the appropriate tier). No raw `axios.get(url)` without a timeout is permitted.
  - ORM/DB query timeouts MUST be configured for all non-trivial queries using the appropriate timeout value from `TIMEOUT_CONFIG`.

    NestJS (TypeORM): configure `statement_timeout` via the `QueryRunner` or pass a raw `SET LOCAL statement_timeout = N` before the query in a transaction block. For repository-level timeouts, use `createQueryBuilder().timeout(TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS)`.

    Django: set `CONN_MAX_AGE` and use `transaction.atomic()` with Django's database options for statement timeouts where the driver supports it.

    Report/analytics queries must explicitly use the `DB_QUERY_REPORT_MS` tier.
  - When a timeout fires, the adapter MUST catch the `ECONNABORTED` / `ETIMEDOUT` error and throw a typed custom exception (Rule 6) — e.g., `PaymentGatewayTimeoutException` — never let the raw Axios error propagate to the service layer.
  - ❌ **BAD:** `await this.httpService.get('https://api.stripe.com/charges').toPromise()`
  - ✅ **GOOD:** `await this.httpService.get('https://api.stripe.com/charges', { timeout: TIMEOUT_CONFIG.PAYMENT_GATEWAY_MS }).toPromise()`
* **SLA Category Integration:** Timeout values must align with the SLA categories defined in Rule 59. The critical-path timeout budget must fit within the endpoint SLA, including application processing overhead. If a downstream call has a 5s timeout, the endpoint cannot be classified as `FAST`.
* **Why:** A single slow WhatsApp API call with no timeout can hold a Node.js async thread for 60+ seconds. Under load, 50 concurrent requests to the same slow endpoint will queue 50 threads, exhausting the connection pool and making the entire application unresponsive — not just the WhatsApp feature. Explicit timeouts are the difference between a degraded feature and a full application outage.

---

## 98. Structured Validation Error Response Shape (The `400` Contract)
* **The Rule:** Rule 3 mandates DTO/Serializer validation, and Rule 28 mandates a standard response envelope. But neither defines what the response looks like when validation fails. Every AI agent will produce a different `400 Bad Request` shape. API consumers need a **predictable, field-keyed error shape** to map inline field errors without any custom parsing logic per-form.
* **NestJS implementation:** Implement a global `ValidationExceptionFilter` (and properly configured `ValidationPipe`) to transform raw `class-validator` errors into the canonical shape.
* **Django implementation:** Implement a custom DRF Exception Handler to transform `ValidationError` into the canonical shape.
* **The Canonical Validation Error Shape:**
  ```typescript
  // This is what EVERY 400 validation error response must look like
  // It fits inside the standard ApiResponse envelope (Rule 28)
  {
    "success": false,
    "message": "Validation failed. Please check the highlighted fields.",
    "data": null,
    "error": "VALIDATION_ERROR",
    "errorCode": "VALIDATION.DTO.FAILED",
    "statusCode": 400, // Wire representation of HttpStatus.BAD_REQUEST (Rule 9/28)
    "requestId": "123e4567-e89b-12d3-a456-426614174000",
    "validationErrors": [
      { "field": "email",    "message": "email must be a valid email address" },
      { "field": "phone",    "message": "phone must not be empty" },
      { "field": "age",      "message": "age must not be less than 18" }
    ]
  }
  ```
* **Required TypeScript type:**
  ```typescript
  // src/core/types/validation-error.types.ts
  export interface ValidationErrorItem {
    field: string;    // The exact DTO property name (e.g., 'email', 'address.city')
    message: string;  // Human-readable error message from class-validator
  }

  // Extends the base ApiResponse envelope
  export interface ValidationErrorResponse extends ApiResponse<null> {
    validationErrors: ValidationErrorItem[];
  }
  ```
* **Implementation — Global Validation Exception Filter:**
  - In NestJS: Create a global `ValidationExceptionFilter` that catches `BadRequestException` thrown by the `ValidationPipe` and transforms the raw `class-validator` error array into the canonical `validationErrors` shape above.
  - The `ValidationPipe` must be configured globally with `{ whitelist: true, forbidNonWhitelisted: true, transform: true }` (Rule 37).
  - Nested DTO errors (e.g., `address.city`) must use dot-notation for the `field` key so the frontend can map them to nested form fields.
  - ❌ **BAD:** Returning NestJS's raw default `{ statusCode: 400, message: ["email must be an email"], error: "Bad Request" }`
  - ✅ **GOOD:** The global filter transforms this into `{ success: false, validationErrors: [{ field: "email", message: "email must be a valid email address" }], ... }`
* **API Consumer Contract:** API consumers can map `validationErrors` directly to field-level validation UI. This maps backend validation errors directly to inline field errors without any custom parsing logic per-form.
* **Why:** Without this rule, every module's validation errors look different. The frontend team ends up writing custom error-parsing logic for every form, and AI agents on the frontend generate brittle one-off parsers. One canonical shape means one shared `handleValidationErrors(form, res)` utility handles every form in the entire application.

---

## 99. Immutable Service Layer (No Direct Entity Mutation Outside Repository)
* **The Rule:** Rule 89 separates ORM entities from domain objects. This rule enforces the complementary constraint: **service methods must never directly mutate ORM entity properties and call `save()` themselves**. All entity persistence — including updates — must go through the repository's explicitly defined methods. A service that reaches into an entity and mutates its fields bypasses audit hooks, soft-delete scopes, base entity `updatedAt` logic, and any future middleware attached to the repository layer.
* **The Forbidden Pattern:**
  ```typescript
  // ❌ BAD — Service directly mutates entity and calls save()
  async suspendMember(id: string): Promise<ManagerMembersDomainModel> {
    const member = await this.memberRepo.findByIdOrThrow(id);
    member.status = MemberStatus.SUSPENDED;   // Direct mutation
    member.suspendedAt = new Date();           // Direct mutation
    return this.memberRepo.save(member);       // Bypasses all repository hooks
  }
  ```
* **The Required Pattern — Repository owns all mutations:**
  ```typescript
  // ✅ GOOD — Repository exposes a named, intention-revealing method
  // In admin-members-write.repository.ts:
  async suspendById(id: string, suspendedAt: Date): Promise<ManagerMembersDomainModel> {
    // All mutation logic, audit hooks, and constraint checks live here
    const entity = await this.repo.save({ id, status: MemberStatus.SUSPENDED, suspendedAt });
    return this.mapper.toDomain(entity);
  }

  // In admin-members-suspension.service.ts:
  async suspendMember(id: string): Promise<ManagerMembersDomainModel> {
    await this.memberRepo.findByIdOrThrow(id); // Existence check
    return this.memberRepo.suspendById(id, new Date()); // Repository owns the mutation
  }
  ```
* **Rules:**
  - Services may call `findByIdOrThrow()` to assert existence and read current state.
  - Services may call named repository mutation methods (e.g., `suspendById`, `updateEmail`, `markAsDeleted`).
  - Services must NEVER call the generic `repo.save(entity)` directly after mutating entity properties inline.
  - The generic `save()` method on the repository is `protected` or `private` — only callable from within the repository class itself.
  - Every repository mutation method must have its own framework-appropriate method documentation (Rule 80) and be listed in the module's `-backend-feature.md` File Responsibility Map (Rule 19).
* **The `partial update` exception:** For simple field updates, the repository may expose a generic `updateById(id: string, updateInput: ManagerMembersUpdateInput): Promise<ManagerMembersDomainModel>` that internally maps the application-layer input to the ORM and calls `repo.update(id, entityUpdate)`. The repository must never accept HTTP DTOs like `ManagerMembersUpdateDto` directly, ensuring the domain layer remains decoupled from the API layer.
* **Why:** When an AI is asked to "add an audit log entry whenever a member is suspended", the correct answer is to add it inside `memberRepo.suspendById()`. If suspension logic is scattered across 5 different service methods that all do `member.status = 'SUSPENDED'; repo.save(member)`, the AI must find and modify all 5 — and will inevitably miss one. A single named repository method is the single place to add cross-cutting concerns.

---

## 100. Database Constraint Naming Convention
* **The Rule:** Rules 60 and 66 define column and table naming conventions. But AI agents generate random, unreadable constraint names like `UQ_3f4a8b2c1d` or `FK_abc123` — names that are meaningless in migration files, error logs, and database admin tools. All database constraints MUST follow a strict, human-readable naming convention defined here.
* **The Canonical Naming Patterns:**

  | Constraint Type | Pattern | Example |
  |---|---|---|
  | Primary Key | `PK_[table]` | `PK_members` |
  | Foreign Key | `FK_[table]_[referenced_table]_[column]` | `FK_subscriptions_members_member_id` |
  | Unique Constraint | `UQ_[table]_[column(s)]` | `UQ_members_email`, `UQ_staff_phone_branch_id` |
  | Index | `IDX_[table]_[column(s)]` | `IDX_members_status`, `IDX_payment_transactions_created_at` |
  | Check Constraint | `CHK_[table]_[rule_description]` | `CHK_members_age_min_18`, `CHK_wallets_balance_non_negative` |
  | Composite Index | `IDX_[table]_[col1]_[col2]` | `IDX_members_branch_id_status` |

* **Implementation (TypeORM entity example):**
  ```typescript
  @Entity({ name: 'members' })
  export class ManagerMembersEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    // PK_members
    id: string;

    @Column({ name: 'email', unique: false })
    email: string;
    // UQ constraint: UQ_members_email — declared in migration

    @Column({ name: 'branch_id', type: 'uuid' })
    branchId: string;
    // FK_members_branches_branch_id — declared via @JoinColumn

    @Column({ name: 'status', type: 'enum', enum: MemberStatus, default: MemberStatus.PENDING })
    status: MemberStatus;
    // IDX_members_status — declared in migration

    @Column({ name: 'balance', type: 'bigint', default: 0, comment: 'Cached balance projection (minor units). Source of truth is ledger_entries (Rule 119). Never mutate directly.' })
    // CHK_wallets_balance_non_negative — enforced via migration DDL
    balance: bigint;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id', referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_members_branches_branch_id' })
    branch: BranchEntity;
  }
  // Indexes and composite unique constraints are declared in the migration file,
  // not via @Index/@Unique decorators, to ensure exact constraint names.
  ```
* **Rules:**
  - Constraint names MUST be explicitly declared in the ORM schema/decorator where the ORM supports it; otherwise declared explicitly and immutably in migration/DDL. Never rely on ORM auto-generated names regardless of ORM choice.
  - Constraint names must be unique across the entire database — prefix with the table name to guarantee this.
  - When a constraint is dropped and recreated in a migration (e.g., adding a column to a composite unique constraint), the migration MUST reference the constraint by its exact name. Auto-generated names make this impossible.
  - Check constraints for business invariants (e.g., `balance >= 0`, `age >= 18`) are MANDATORY for all financial and safety-critical columns. Application-level validation (Rule 3) is the first line of defense; DB check constraints are the last.
  - All constraint names must be added to the module's `-backend-feature.md` under the "Data and State Architecture" section so future AI agents know what constraints exist before writing migration files.
* **Why:** When a production `INSERT` fails with `ERROR: duplicate key value violates unique constraint "UQ_3f4a8b2c1d"`, the on-call engineer has no idea which table or column caused it without running a separate DB query. With `UQ_members_email`, the error message is self-documenting. More critically, when an AI writes a migration to drop and recreate a constraint, it must reference the constraint by name — if the name is auto-generated and unknown, the AI will hallucinate a name, causing the migration to fail in production.

---

## Updated Summary Checklist (v5 — Final):
1. Identify the exact layer (Validation? Query? Business Logic? External Adapter? Permission Guard? Mapper?).
2. Select the **one or two** micro-files associated with that layer.
3. Check the module's `-backend-feature.md` for context before giving the AI any files.
4. Pass ONLY those files to the AI along with the feature doc.
5. After the AI writes code, verify:
   - Is there an N+1 query?
   - Is there a missing null check (use `findByIdOrThrow` where needed)?
   - Is a secret hardcoded? (Auto-blocked by pre-commit hook — Rule 91)
   - Is the response wrapped in the standard envelope with a single consistent `data` shape — is `data` a single explicitly typed value, never a polymorphic bag? (Rule 82)
   - Does the response DTO satisfy the **complete** frontend UI Data Requirements — no missing table columns, KPI fields, chart series, dropdown data, or relationship fields? (Rule 82A)
   - Is the permission guard at the controller layer using typed enums? (Rule 83)
   - Is any ORM `orderBy` or `where` using user input without an allowlist? (Rule 92)
   - Does every paginated endpoint use `PaginationQueryDto` and return the canonical `PaginationMeta` shape via `buildPaginationMeta()`? (Rule 94)
   - Are all status/type/role entity columns using strictly typed enums (TypeScript Enum + `@IsEnum()` for NestJS, or `TextChoices` + `ChoiceField` for Django) — never raw `string` columns? (Rule 95)
   - Is every new scheduled job registered in `src/core/scheduled-jobs.registry.ts` with all mandatory fields? (Rule 96)
   - Do all outbound HTTP calls and DB queries have explicit timeouts from `TIMEOUT_CONFIG`? (Rule 97)
   - Does the global `ValidationExceptionFilter` transform `400` errors into the canonical `validationErrors` shape? (Rule 98)
   - Do service methods call named repository mutation methods — never directly mutating entity properties and calling `save()` inline? (Rule 99)
   - Are all DB constraints (FK, UQ, IDX, CHK) explicitly named following the `FK_[table]_[ref]_[col]` convention — never auto-generated? (Rule 100)
   - Does the role container contain the mandatory `{role}-core/` and `{role}-modules/` directories? (Rule 2 — Mandatory Role Container Structure)
   - Are all feature modules located inside `{role}-modules/` rather than directly under `backend-{role}/`? Direct feature placement under `backend-{role}/` is an Architecture Violation. (Rule 2 + Rule 38)
   - Do all AI-generated tests verify real observable behavior — no placeholder assertions, no tests that would pass if the feature were broken? (Rule 101)
   - Are there any barrel file imports or relative path imports?
   - Does every new method follow the verb naming convention with `OrThrow` where needed? (Rule 86)
   - Is every new method ≤ 20 lines using Guard Clauses? (Rule 85/87)
   - Does every new file have language-appropriate RESPONSIBILITY + FLOW annotations and framework-appropriate method documentation on every method? (TypeScript/JavaScript: `// RESPONSIBILITY:` + `// FLOW:` + JSDoc; Python/Django: `# RESPONSIBILITY:` + `# FLOW:` + Python docstrings) (Rules 76/79/80)
   - Is a Mapper used to translate between ORM entities and domain objects? (Rule 89)
   - For mutation endpoints: is an `Idempotency-Key` header supported to prevent double-execution? (Rule 103)
   - For background job queues: is a Dead Letter Queue configured for all retry-exhausted jobs? (Rule 61)
   - If the change touches `auth/`, `billing/`, `webhooks/`, or `tenant-provisioning/`, has a human reviewed it? (Rule 93)
6. Run automated CI gates: SAST, SCA, secrets scan, `tsc --noEmit` (NestJS) or `mypy --strict` (Django). (Rule 90)
7. Generate `pytest` tests for the live API (execution optional/handled by CI) to confirm contract compliance.
8. For security-critical modules, ensure `CODEOWNERS` human approval is obtained. (Rule 93)
9. Review the AI's isolated changes one final time.

---

## 101. AI Test Integrity Gate — Tests Must Prove Real Behavior

A test file existing is NOT sufficient evidence of correctness.

All AI-generated backend tests MUST verify meaningful application behavior and MUST NOT
exist only to satisfy coverage, file-count, or checklist requirements.

The AI MUST NOT create or keep:
- Placeholder assertions.
- Trivial self-evident assertions (e.g. `expect(true).toBe(true)`, `expect(1).toBe(1)`).
- Empty tests.
- Tests that only instantiate a class without verifying behavior.
- Tests that mock the exact business logic under test.
- Tests that assert implementation details when externally observable behavior can be tested.
- Tests whose expected value is copied directly from the implementation rather than the business contract.
- E2E tests that never exercise the actual HTTP endpoint being claimed as covered.

### Unit Test Integrity

For service/repository/validator tests, verify real branches including:
- successful execution
- validation failure
- not-found behavior
- authorization/permission failure where applicable
- business-rule violations
- persistence failure where applicable
- transaction rollback behavior where applicable
- idempotency behavior for critical mutations
- correct repository method invocation
- correct domain/DTO transformation

### API / E2E Test Integrity

Pytest E2E tests MUST verify:
- actual HTTP method and endpoint
- request validation
- canonical response envelope
- response data shape
- required frontend-facing response fields
- status/error behavior
- authentication/authorization
- pagination/filter/sort behavior where applicable
- mutation side effects where observable
- regression behavior for fixed bugs
### Anti-False-Passing Rule

A test is invalid if the test would still pass after the behavior it claims to protect
is deliberately broken.

Before marking a backend feature complete, the AI MUST review its tests and explain
what real defect each important test would catch.

The build passing is not equivalent to behavioral correctness.

### Strict Case Sensitivity for File Names and Imports (Linux/CI Compatibility)

All imports and file paths MUST exactly match the casing of the actual file on disk. While development often happens on Windows/macOS (which have case-insensitive file systems), production deployments and CI pipelines typically run on Linux (which has a strict case-sensitive file system).
- **Rule:** A mismatch between import case (e.g., `trainer-url-config`) and file case (e.g., `Trainer-url-config.ts`) will cause the build to fail in CI/CD.
- **Enforcement:** Always double-check that the casing of module prefixes and filenames in imports matches exactly. If you rename a file, ensure the git index catches the case change (e.g., using git mv).


## 102. Database Table Naming & Prefixing in Monoliths
* **Scope Note:** Rule 102 applies to tables within the master/shared database only. Tenant-isolated databases (Rule 39) contain standard un-prefixed table names within their own isolated schema — Rule 102 domain-prefixes do not apply inside a tenant DB.
* **The Rule:** When multiple sub-domains (e.g. Admin, Superadmin, Auth) share a single monolithic database, all non-shared database tables MUST be explicitly prefixed with their domain name inside the framework's entity/model definition (e.g., `admin_campaigns`, `superadmin_saas_invoices`).
* **NestJS implementation:** Use the `@Entity('prefix_table')` decorator. Always explicitly hardcode the name rather than using implicit global naming strategies.
* **Django implementation:** Use `class Meta: db_table = 'prefix_table'`. Always explicitly hardcode the name rather than relying on app-label prefixing defaults.
* **Why:** A global Naming Strategy (like implicit global naming strategies) blindly prefixes all tables based on folder structure. This breaks **shared tables** (like `tenants` or `audit_logs`) by splitting them into multiple disconnected tables (`admin_tenants`, `superadmin-gyms`, etc.). Explicit hardcoding ensures shared tables remain central (`core_tenants` or `tenants`) while module-specific tables remain safely isolated and clearly identifiable in code.

## Rule 103 — Retry-Safe Mutation and Idempotency Contract

Every mutation endpoint must declare whether it is naturally idempotent, idempotency-key protected, or intentionally non-retriable.

### Idempotency-Key is mandatory for:
- Financial mutations (payments, refunds, wallet top-ups, deductions)
- Payment initiation, capture, refund, wallet top-up, and wallet deduction
- Resource creation where retry could create duplicates (member registration, plan creation)
- Communication sending (SMS, WhatsApp, Email, Push)
- Bulk batch actions
- Offline-queueable mobile mutations
- Any endpoint that triggers an external side effect (Stripe, payment gateway webhooks)
- Any endpoint returning `202 Accepted` for asynchronous work

### Naturally idempotent operations
A PUT, PATCH, or DELETE endpoint may omit `Idempotency-Key` only if repeated requests with the same desired state cannot create duplicate side effects (e.g., updating a member's profile address to fixed values, setting `is_active = false`).

### Server-side requirements
1. Idempotency records must be stored durably in PostgreSQL (`idempotency_keys` table), not only in Redis.
2. Enforce a unique constraint on: `actorId + tenantScope + endpoint + idempotencyKey`.
3. Store request fingerprint (body hash), final status, and complete final response.
4. A repeated matching request returns the original cached response with `X-Cache: IDEMPOTENCY_HIT`.
5. A repeated key with a different payload returns HTTP 409 Conflict with `errorCode: IDEMPOTENCY.KEY.PAYLOAD_MISMATCH`.
6. Redis distributed locking (`SETNX` with TTL) must be used to prevent race conditions while the first request executes, but PostgreSQL remains the durable source of truth.
7. Payment provider idempotency keys must also be propagated where supported.
8. `GET` endpoints must NEVER require an idempotency key.

## Rule 104 — WebSockets & Real-Time Communication
* **The Rule:** Any real-time push functionality (like live messaging, active session counts, or live notifications) MUST be implemented using a horizontally scalable WebSocket architecture. 
* **NestJS implementation:** Use a WebSocket transport (e.g., `@nestjs/platform-ws` or `@nestjs/platform-socket.io`) paired with a transport-specific adapter for Redis-backed cross-instance fan-out (e.g., `redis-adapter` for socket.io).
* **Django implementation:** Use Django Channels with a Redis channel layer for cross-instance fan-out.
* **Payload Strictness:** WebSocket emitted events and payloads MUST follow a strict shape similar to the `ApiResponse<T>` envelope, avoiding arbitrary, untyped object broadcasts.

## Rule 105 — Role-Based Data Serialization & Field Masking
* **The Rule:** Data intended to be hidden from specific user roles (e.g., hiding internal revenue metrics from a basic Member, but showing it to a Superadmin) MUST be masked at the serialization layer.
* **NestJS implementation:** Use `class-transformer` decorators such as `@Exclude()` or `@Expose({ groups: ['admin'] })` on the DTO. The controller must pass the current user's role to the serialization interceptor so that the DTO automatically strips forbidden fields before sending the JSON response.
* **Django implementation:** Use DRF serializer Context or dynamic field removal within the Serializer `to_representation` or `__init__` methods based on the `request.user` passed in via context.
* **Why:** This ensures data hiding is centralized and declarative, preventing developers from manually trying to `delete user.revenue` in various service methods, which is error-prone.

## Rule 106 — Strict Cache Invalidation Strategy

* **The Rule:** Every cached query MUST have deterministic cache keys and an explicit invalidation strategy.

* Cache invalidation MUST happen only after the corresponding database transaction successfully commits.

* The Orchestrator / UnitOfWork owns the transaction lifecycle and MUST trigger the cache invalidation through an `afterCommit` mechanism.

* Repositories MUST NOT invalidate cache before transaction commit.

* Repositories MUST NOT contain independent pre-commit cache invalidation side effects.

* Mutation operations MUST provide enough information for the Orchestrator / UnitOfWork to deterministically invalidate all affected cache keys after commit.

* TTL alone is insufficient when explicit invalidation is required.

Required flow:

Read
→ deterministic cache key
→ mutation
→ DB transaction
→ commit
→ afterCommit invalidation
→ next read

## Rule 107 — Internationalization (i18n) & Localization

### Strategy: Module-Co-located Locales + AI-Generated Translations (Zero External Cost)

The backend uses framework-native internationalization (e.g., `nestjs-i18n` for NestJS, or `Django translation framework` for Django) with **co-located locale files inside each module folder** — NOT in a central `src/i18n/` directory. This preserves **Extreme Isolation**: each module owns its own strings and can be moved, deleted, or versioned independently.

**Translations are written by the AI agent at the time it writes the module code.** No external API is needed. The AI already has full context of the Gym Management domain, making translations accurate and idiomatic.

### Stack
- **Library:** `nestjs-i18n` (NestJS) or Django native translation framework (Django)
- **Base language:** English (`en/{role}-{module}-errors.json` and `en/{role}-{module}-messages.json`) — written by developer / AI agent
- **Other languages:** Written by the AI agent in the same commit that creates the module
- **Runtime cost:** Zero — all files are static JSON, bundled with the app

### Framework-independent requirements
- Locale files MUST remain inside the owning feature/module.
- No central global business-locale folder.
- Translation keys MUST be namespaced by module.
- `Accept-Language` MUST be respected by the API.
- Validation/error messages MUST resolve through the centralized i18n mechanism.
- Every active launch language MUST have the required locale files.
- Hardcoded user-facing business strings in backend exceptions/responses are forbidden when an i18n key is required.

### NestJS implementation

**Module-Level File Structure**
Each module owns its own `{module}-locales/` folder:
```text
src/
  backend-admin/
    admin-modules/
      admin-members/
        members-locales/
          en/
            admin-members-errors.json   ← AI writes this when creating the module
            admin-members-messages.json
          nl/    ← FUTURE/NON-ACTIVE — DO NOT GENERATE (not in ACTIVE_LANGUAGES)
            admin-members-errors.json
            admin-members-messages.json
          fr/    ← FUTURE/NON-ACTIVE — DO NOT GENERATE (not in ACTIVE_LANGUAGES)
            admin-members-errors.json
            admin-members-messages.json
        members-controllers/
          admin-members-command.controller.ts
        members-services/
          admin-members-registration.service.ts
  backend-superadmin/
    superadmin-modules/
      superadmin-gyms/
        tenants-locales/
          en/
            superadmin-gyms-errors.json
          nl/    ← FUTURE/NON-ACTIVE — DO NOT GENERATE
            superadmin-gyms-errors.json
scripts/                  ← (Global tooling folder exception allowed under Rule 2)
  merge-locales.ts        ← Merges all module locales into one bundle at build time
```

**AI Agent Translation Rule**
When an AI agent writes a new module or adds new error/message keys, it MUST:
1. Create `members-locales/en/admin-members-errors.json` with the English strings.
2. In the **same commit**, create `members-locales/hi/admin-members-errors.json` (and any other currently `ACTIVE_LANGUAGES`), using its own translation capability. Generate ONLY the `ACTIVE_LANGUAGES`.
3. Translations must be **contextually correct** for a Gym Management SaaS — not literal word-for-word.

```json
// members-locales/en/admin-members-errors.json
{
  "ERRORS": {
    "MEMBER_NOT_FOUND": "Member not found.",
    "PLAN_EXPIRED": "Your gym subscription has expired."
  }
}

// members-locales/nl/admin-members-errors.json  ← FUTURE/NON-ACTIVE example only — DO NOT GENERATE unless nl is in ACTIVE_LANGUAGES
{
  "ERRORS": {
    "MEMBER_NOT_FOUND": "Lid niet gevonden.",
    "PLAN_EXPIRED": "Uw gymabonnement is verlopen."
  }
}
```

**Throwing Errors (Correct Pattern)**
Always throw with a module-scoped translation key — never a hardcoded English string:
```typescript
// ❌ FORBIDDEN
throw new NotFoundException('Member not found.');

// ✅ CORRECT — key maps to {module}-locales/{lang}/{role}-{module}-errors.json
throw new NotFoundException({ key: 'members.ERRORS.MEMBER_NOT_FOUND' });
```

### Django implementation

Use Django's native translation framework and the project's approved Django middleware/translation integration.

**App-Level File Structure**
Each app owns its own `{module}-locales/` folder containing `.po`/`.mo` message files.

**AI Agent Translation Rule**
When an AI agent writes a new module or adds new error/message keys, it MUST generate translations using standard `gettext` syntax and ensure locale messages are updated for ALL active languages using `django-admin makemessages`.

**Throwing Errors / Validation (Correct Pattern)**
Always use `gettext_lazy` (or `_`) for user-facing strings — never a hardcoded English string:
```python
# ❌ FORBIDDEN
raise ValidationError('Member not found.')

# ✅ CORRECT
from django.utils.translation import gettext_lazy as _
raise ValidationError(_('Member not found.'))
```

Do NOT create NestJS interceptors, NestJS decorators, `nestjs-i18n`, `nest build`, JSON locale bundles, or NestJS-specific locale merge scripts (like `merge-locales.ts`) in a Django project.

### Framework gate

The AI MUST implement only the branch corresponding to the verified
active framework.

### Configured Target Languages
This is the **authoritative list of languages** this project supports. There is no central config file — this instruction document IS the config. When an AI agent creates any new module, it MUST generate locale files for every currently active language (`{module}-locales/` JSON for NestJS, or `{module}-locales/` message files for Django).

| Code | Language | Region | Script | Priority |
|------|----------|--------|--------|----------|
| `en` | English | Global | Latin | **Base — always first** |
| `nl` | Dutch | Netherlands, Belgium | Latin | High |
| `fr` | French | France, Belgium, Canada | Latin | High |
| `de` | German | Germany, Austria, Switzerland | Latin | High |
| `hi` | Hindi | India (North) | Devanagari | High |
| `mr` | Marathi | Maharashtra, India | Devanagari | Medium |
| `ta` | Tamil | Tamil Nadu, Sri Lanka | Tamil | Medium |
| `te` | Telugu | Andhra Pradesh, Telangana | Telugu | Medium |
| `kn` | Kannada | Karnataka, India | Kannada | Medium |
| `bn` | Bengali | West Bengal, Bangladesh | Bengali | Medium |
| `gu` | Gujarati | Gujarat, India | Gujarati | Low |
| `ml` | Malayalam | Kerala, India | Malayalam | Low |
| `pa` | Punjabi | Punjab, India/Pakistan | Gurmukhi | Low |

> **Phased Rollout:**
> - `SUPPORTED_LANGUAGES`: The full table above represents all future supported languages.
> - `ACTIVE_LANGUAGES`: We currently only ship `en` (English) + `hi` (Hindi) at launch.

> **Indian Script Note:** Devanagari, Tamil, Telugu, Kannada, Bengali, Gujarati, Malayalam, and Gurmukhi are complex scripts. Ensure the server sends correct UTF-8 encoded strings. The native framework translation system handles this natively — no extra configuration needed.

> **AI AGENT NOTE:** When creating any new module/app, you MUST create its locale files (e.g., `{module}-locales/.../{role}-{module}-errors.json` for NestJS or `{module}-locales/.../{role}-{module}-django.po` for Django) for the `ACTIVE_LANGUAGES`. Generate ONLY the `ACTIVE_LANGUAGES`. Use your own translation capability - do NOT call any external translation API. Keys must be namespaced by module name. Hardcoding English strings in exceptions is a critical violation.

## Rule 108 — Centralized Feature Flags
* **The Rule:** Toggling business logic branches based on environment variables (e.g., `if (process.env.ENABLE_NEW_BILLING)`) is strictly forbidden.
* **Implementation:** Always use a centralized `{role}-core-feature-flag.service.ts` (e.g. `AdminCoreFeatureFlagService`, backed by the master database or an external provider like LaunchDarkly). Feature flags must be evaluated dynamically per-tenant, allowing gradual rollouts, canary deployments, and per-gym toggles without requiring a server restart.
* **Framework Infrastructure Classification (Rule 2 Harmony):** Although Rule 2 restricts `{role}-core/` to framework infrastructure with zero domain business logic, the feature flag resolution mechanism (`{role}-core-feature-flag.service.ts`) qualifies as cross-cutting framework infrastructure because it provides tenant/user evaluation plumbing, caching, and LaunchDarkly/DB provider integration without containing any domain business rules or entity logic. Business modules consume this service via contract injection to query flag state (e.g., `this.featureFlagService.isEnabled('tenant-123', 'ENABLE_NEW_BILLING')`).


## Rule 109 — Multi-Currency Monetary Amounts

### The Problem
Storing monetary amounts as floats (e.g., `99.99`) causes rounding errors in financial calculations. Hardcoding currency symbols (₹, $, €) breaks international deployments. Formatting amounts in service methods couples business logic to presentation.

### Storage Contract (Backend is Source of Truth)
- **Always store monetary amounts as integers in the smallest currency unit.**
  - INR: store `9999` for ₹99.99 (paise)
  - USD/EUR: store `9999` for $99.99 (cents)
  - JPY: store `100` for ¥100 (yen has no subunit)
- For NestJS/TypeORM, use PostgreSQL `integer` or `bigint` mapping as appropriate.

For Django, use the corresponding integer/big-integer field.

Never use FLOAT/DOUBLE for monetary amounts.
- Every monetary response field MUST be accompanied by its `currency` code (ISO 4217):

```typescript
// ❌ FORBIDDEN — float and no currency
{ "amount": 99.99 }

// ✅ CORRECT — integer smallest unit + ISO 4217 currency code
{ "amount": 9999, "currency": "INR" }
```

### DTO Rule
Every DTO that includes a monetary field MUST include the paired currency code:
```typescript
export class AdminBillingPlanCreateDto {
  @IsInt()
  @Min(0)
  price: number; // in smallest unit (paise, cents, etc.)

  @IsString()
  @IsISO4217CurrencyCode()
  currency: string; // e.g. 'INR', 'USD', 'EUR'
}
```

### Never Hardcode Currency Symbols
```typescript
// ❌ FORBIDDEN
return `₹${amount / 100}`;

// ✅ CORRECT — pass raw integer + currency code to frontend; let frontend format
return { amount, currency };
```

> **AI AGENT NOTE:** Every monetary field in a DTO or Entity MUST be stored as an `INT` or `BIGINT` in the smallest currency unit (paise/cents). Every monetary response object MUST include a paired `currency: string` (ISO 4217 code). Never divide by 100 or format amounts on the backend — that is the frontend's responsibility using `Intl.NumberFormat`.


## Rule 110 — Tenant Data Export & Offboarding

### The Problem
When a B2B tenant (e.g., Gym) churns and requests their data, a synchronous API call to dump the database will timeout (HTTP 504) for large datasets. Furthermore, non-technical users cannot read raw JSON or SQL dumps.

### Implementation Strategy
All data exports MUST be processed asynchronously via background jobs and delivered as a compressed ZIP of CSV files.
- **Role Constraint:** This functionality belongs strictly to the **Superadmin** (or top-level Gym Admin) role container. Do NOT implement data export routes inside manager, frontdesk, or member modules.

1. **Data Format (Denormalized & Deeply Resolved):** Generate `.csv` files for all core entities. **CRITICAL:** Do NOT export raw database tables with isolated UUID foreign keys. Non-technical business owners cannot perform SQL JOINs. Whether it is a simple Gym or a complex enterprise gym with deep relationships (e.g., Member -> Membership Plan -> Trainer -> Training Session), you MUST use ORM-specific query builders (e.g., TypeORM QueryBuilder for NestJS or the corresponding Django ORM query facilities) to flatten the data completely. All foreign keys MUST be resolved into human-readable reference names (e.g., `Trainer Name`, `Plan Name`, `Class Name`) and included explicitly in the CSV row. Compress these CSVs into a single `.zip` file.
2. **Trigger:** `POST /api/v1/superadmin/export-data` MUST respond immediately with `202 Accepted` and enqueue a job.
3. **Background Job (Project Message Infrastructure):** A worker processes the job using:
   - NestJS → BullMQ backed by Redis
   - Django → Celery backed by Redis

Redis Pub/Sub MUST NOT be used as the durable job queue.
4. **Storage:** The worker saves the `.zip` securely to the local server disk (e.g., in a protected volume) OR uploads to a private S3 bucket if configured.
5. **Delivery:** The backend generates a secure, time-limited **download token/URL** (valid for 24-48 hours) and sends an email to the admin. If using local storage, the URL points to a protected backend route (e.g., `GET /api/v1/superadmin/download-export?token=xyz`) that streams the file.
6. **Real-time Notification:** Upon successful email dispatch, the backend MUST emit a WebSocket event (e.g., `EXPORT.DATA.COMPLETED`) to the Superadmin so the dashboard can reflect the "Email Sent" status.

### Data Retention & Hard Deletion
- When a tenant cancels, their account is **Soft Deleted** (suspended).
- Maintain a **90-day grace period** in case they return.

#### Explicit Retention Hierarchy (applies to all tenant off-boarding)

| Record Type | After Soft-Delete (90-day grace) | After 90-day Hard-Delete | Authority |
|---|---|---|---|
| `members`, `staff`, `plans`, `attendances` | Soft-deleted (accessible) | Hard-deleted | Rule 29 / 110 |
| `audit_logs` | Retained read-only | Anonymized (actor/entity ids pseudonymized) | GDPR / Rule 29 |
| `events_log` (Rule 118) | Retained read-only | Retained — append-only; archive to regulated storage | Rule 118 / 119 |
| `ledger_entries` (Rule 119) | Retained read-only | Retained — must archive; never deleted | Financial law |
| Tenant database | Active | Rows purged per above; schema preserved 30 additional days, then dropped | Rule 39 |
| S3/local export zips | Deleted after 48h download window | N/A | Rule 110 |

An AI agent MUST apply this retention hierarchy. Blanket deletion of all tenant data is a Rule 118/119 violation.
- A distributed scheduled job, executed through the Rule 42 distributed scheduler (NEVER a local @Cron() or similar), MUST permanently hard-delete all tenant data (including generated `.zip` files on disk/S3) after 90 days to comply with GDPR Right to Erasure / Data Portability laws. *(Exception: See Rule 29 for retention hierarchy. Legally required financial/audit ledgers must be explicitly archived/retained rather than blindly deleted.)*

> **AI AGENT NOTE:** Never implement data export as a synchronous API. Always use a Background Job / Message Broker, stream data to CSV, save to secure local disk or S3, email a time-limited download link, and emit a WebSocket completion event. Raw JSON/SQL dumps are forbidden for tenant exports.


## Rule 111 — Persistent WebSockets (Notifications & Chats)

### The Problem
WebSockets are "fire-and-forget". If the backend emits an event (`socket.emit('notification')` or `socket.emit('chat_message')`) while the user is offline or experiencing a network blip, that message is lost forever.

### The Rule
Never emit a critical WebSocket event (like "Export Ready", "Payment Received", or a "Chat Message") without **first saving it to the database**.

1. **Save First:** Insert a record into the `Notifications` or `Chats` table within your database transaction.
2. **Transactional Outbox / Relay:**

The transaction MUST write the persistent notification/chat record AND the corresponding outbox event atomically.

A background relay worker MUST read committed outbox events and publish the real-time notification through Redis Pub/Sub.

For NestJS, the relay worker MUST use BullMQ + Redis where background job processing is required.

For Django, the relay worker MUST use Celery + Redis where background job processing is required.

Do NOT use PostgreSQL LISTEN/NOTIFY as the sole durable event mechanism.

Do NOT rely on:

`await db.commit(); socket.emit(...)`

as the reliability mechanism.

Redis Pub/Sub provides transient real-time fan-out.
The database remains the source of truth for offline recovery.
3. **Recovery:** This ensures that if the user is online, they get the live WebSocket blast. If they are offline, they will see the message when they open the app and the frontend fetches historical data via REST (`GET /api/v1/{role}/notifications` or `GET /api/v1/{role}/chats`).
4. **Soft Delete Mandatory:** All notifications and chat messages MUST use **Soft Deletion** (e.g., `deleted_at: timestamp` or `is_deleted: true`). Never hard-delete chat histories or notifications, as they are crucial for audits, tenant data exports, and dispute resolutions (subject only to the legal-erasure exception defined in Rule 29 / Rule 110).

## Rule 112 — Complete Isolation for E2E and Selenium Testing

### The Philosophy
The "Extreme Isolation" and "WET over DRY" principles apply just as strictly to API E2E (pytest) and Selenium UI testing suites as they do to the backend source code. 

### Implementation Constraints

1. **Strict 1-to-1 Folder Mirroring (The "Suffix Rule"):** The E2E and Selenium directory structure MUST be an exact 1-to-1 mirror of the backend domain structure, but with the specific testing type appended to the folder name.
   - **Root Level:** `src/backend-superadmin/` ➔ `backend-e2e/backend-superadmin-e2e/` (API) or `backend-selenium/backend-superadmin-selenium/` (UI)
   - **Feature Level:** `src/backend-superadmin/superadmin-modules/superadmin-dashboard/` ➔ `backend-e2e/backend-superadmin-e2e/superadmin-modules/superadmin-dashboard/` (API) or `backend-selenium/backend-superadmin-selenium/superadmin-modules/superadmin-dashboard/` (UI)
   - This exact 1-to-1 path mirroring ensures that developers and AI agents always know exactly where the E2E or Selenium test for a specific module lives.
   - ❌ **BAD:** `e2e/admin/` or `selenium/members/`
   - ✅ **GOOD:** `backend-e2e/backend-admin-e2e/` and `backend-selenium/backend-superadmin-selenium/`

2. **Strict File Naming Convention (Suffix Enforced):** Every E2E and Selenium test file MUST encode the role and module name to prevent any ambiguity. Additionally, they MUST end with the explicit suffix (`-e2e.py` or `-selenium.py`) to instantly identify their purpose.
   - **E2E (API) Format:** `test-[role]-[module]-e2e.py` (e.g., `test-superadmin-dashboard-e2e.py`)
   - **Selenium (UI) Format:** `test-[role]-[module]-selenium.py` (e.g., `test-superadmin-dashboard-selenium.py`)
   - ❌ **BAD:** `test_dashboard.py` or `api_test.py`
   - ✅ **GOOD:** `test-admin-members-e2e.py` (lives inside `backend-e2e/backend-admin-e2e/admin-modules/admin-members/`)

3. **WET Over DRY (Module-Level "AI Zip" Principle):** E2E and Selenium tests must be 100% self-contained at the **MODULE level**, exactly like the backend source code. You MUST NOT create a shared `helpers/` or `utils/` folder even within a specific role (e.g., no `backend-manager-e2e/helpers/`). If the `manager-dashboard` test and `manager-billing` test both need a login helper, you MUST duplicate the helper directly into BOTH the `manager-dashboard` and `manager-billing` test folders.
   - **Why:** If a bug occurs in the Dashboard E2E test, a developer must be able to ZIP *only* the `backend-e2e/backend-manager-e2e/manager-modules/manager-dashboard/` folder and feed it to an AI agent. If the test relies on parent or sibling helper directories, the AI loses context, wastes tokens, and breaks other modules.
   - ❌ **BAD:** `backend-e2e/backend-manager-e2e/helpers/auth-helper.py`
   - ✅ **GOOD:** `backend-e2e/backend-manager-e2e/manager-modules/manager-dashboard/manager-auth-helper.py` AND `backend-e2e/backend-manager-e2e/manager-modules/manager-billing/manager-auth-helper.py`

4. **No Cross-Module Imports:** A test script in `backend-manager-e2e/manager-modules/manager-dashboard/` MUST NOT import a fixture, constant, or helper from `backend-manager-e2e/manager-modules/manager-billing/`, nor from `backend-admin-e2e`. Isolation is absolute down to the sub-feature level. Tests are completely siloed to minimize context windows and prevent cascading failures.

5. **Test-Specific Forbidden Patterns (`_test-forbidden.md`):** Every top-level testing role container — both in `backend-e2e/backend-[role]-e2e/` and `backend-selenium/backend-[role]-selenium/` — MUST contain a `_test-forbidden.md` file documenting exactly what external dependencies are forbidden, what databases it is NOT allowed to mock directly, and the consequences of violating these boundaries. Both files are mandatory deliverables. (*Note: `_test-forbidden.md` and global test config files are explicitly exempt from the Rule 2 role-prefixing requirement.*)

6. **Self-Contained Artifacts:** Any mock data (JSON fixtures, mock images, test PDFs) required by Selenium or E2E tests must be stored inside the specific feature's test folder. Do not use a global `tests_data/` folder at the root.

7. **True Test Database (No Database Mocking):** E2E tests MUST be executed against a completely isolated, dedicated `test` database instance. E2E tests must trigger real network requests, hit real controllers, and execute real SQL/ORM queries. Mocking or stubbing the database in E2E tests is strictly forbidden. 

8. **Anti-False-Passing (No "Always-Pass" Dummy Code):** AI agents MUST NOT generate trivial, superficial tests (e.g., `assert True` or just checking if a route returns 200 without inspecting the payload or database side effects) simply to appease test coverage or impress the user. A test is ONLY valid if it asserts the true business logic, validates exact payload shapes, and verifies database state changes. If the test would still pass after the actual business logic is deliberately broken, the test is invalid and will be rejected.

9. **Selenium Strict Locators (The data-testid Contract):** Every Selenium or UI interaction MUST strictly rely on `data-testid` attributes as the primary and only locator for interactive elements. The frontend is architecturally required (Rule 22) to provide a strictly formatted `data-testid` for all interactive elements and states. The UI changes frequently, and tests shouldn't crash because a single CSS class name changed. Do not write fallback locators that use brittle XPaths or CSS classes, as this encourages AI agents to ignore missing `data-testid` contracts.
   - ❌ **BAD:** Hardcoding a brittle locator: `driver.find_element(By.CSS_SELECTOR, ".submit-btn-active")`
   - ✅ **GOOD:** Strictly using the immutable contract: `driver.find_element(By.CSS_SELECTOR, "[data-testid='admin_members-addform-submit']")`

**Why:** E2E and Selenium tests frequently become a tangled, brittle web of shared fixtures and helpers. If an AI agent modifies a shared authentication helper to fix a broken Manager test, it risks silently breaking the entire Admin E2E suite. Complete isolation ensures that test fixes remain highly localized and AI context is minimized. Tests must be real and resilient, not just "green" checkboxes.

## Rule 113 — No AI Runtime Verification Requirement & Capability-Truth Delivery Rule
* **The Rule:** AI agents are NOT required to execute code, run servers, or perform runtime verification to validate their changes, as they often lack the necessary local environment variables, database connections, or API keys.
* **The Expectation:** Instead of failing or complaining about missing environments, the AI MUST rely on its deep knowledge of the framework, TypeScript, and these architectural guidelines to write syntactically and logically correct code. The AI should aim to write code that is "correct by construction" so that when the human developer runs it locally, it works with zero or minimal issues. Do not attempt to spin up local servers or run `npm run start` if the environment is incomplete.

### Capability-Truth Delivery Resolution Rule

AI agents MUST declare delivery truth based strictly on actual tool execution evidence:

1. Test Execution Truth:
   - The AI MUST NEVER fabricate, simulate, or hallucinate test execution results, coverage metrics, or CI pipeline success.
   - If Jest or pytest was not executed via a terminal command tool in the current session, the AI MUST report status as `DEFERRED_TO_HOST_RUNTIME` or `STATIC_STRUCTURE_VERIFIED`.
   - Claiming tests passed without terminal execution evidence is a P0 Compliance Failure.

2. Artifact Delivery Truth:
   Every backend repair or delivery MUST declare exactly one delivery status:
   - `VERIFIED_DELIVERED_ZIP`: Valid ZIP archive generated, written to disk, and verified.
   - `SOURCE_COMPLETE_ARTIFACT_PENDING_HOST_PACKAGING`: All source files, migrations, DTOs, and tests created/modified in workspace tree; host packaging deferred.
   - `SOURCE_COMPLETE_LOCAL_TREE_VERIFIED`: Source tree verified in-place; no ZIP requested.
   - `PARTIALLY_DELIVERED_BLOCKED`: Some deliverables blocked by missing contracts or unresolvable imports.
   - `FAILED_DELIVERY_ENVIRONMENT_LIMITATION`: Tooling or file-system error prevented delivery.

The AI MUST NOT claim `VERIFIED_DELIVERED_ZIP` unless file-writing tool evidence confirms the ZIP exists on disk.

## Rule 114 — Dashboard & UI Data APIs (Avoid "Mega APIs")
* **The Rule:** Never create a single "Mega API" endpoint that fetches an entire dashboard's worth of data (e.g., all KPIs, all charts, and all recent table lists) in one massive response payload. You MUST fragment complex dashboards into **widget-based / feature-sliced APIs** (e.g., `/dashboard/kpis`, `/dashboard/charts`, `/dashboard/recent-members`).
* **Why:**
  1. **Fault Isolation (Debugging):** If the database query for the revenue chart fails, it should not crash the entire dashboard. The user should still see their KPIs and Tables, with only the chart showing an error state. Mega APIs make identifying the failing query extremely difficult.
  2. **Progressive Rendering:** The frontend should be able to render fast data (KPIs) instantly while displaying skeleton loaders for slower data (complex aggregations/charts). A Mega API forces the frontend to wait for the *slowest* query before rendering *anything*.
  3. **Caching & Scalability:** Widget-based APIs allow you to cache heavy/slow queries (like charts) in Redis for 1 hour, while keeping fast queries (like today's attendance) strictly real-time. Mega APIs force an all-or-nothing caching strategy which does not scale for Enterprise apps.



## Rule 115 - Exhaustive, AI-Contextual Documentation for EVERYTHING (The "No-Guessing" Rule)
* **The Rule:** EVERY module-level backend construct MUST carry exhaustive, multi-line documentation. Applies to: Classes, Controllers, Services, DTOs, Entities, Repository methods, Event handlers, Middleware, Guards. Intentionally excluded: delivery artifacts (`stage-*.md`, `INTEGRATION_GUIDE.md`), locale files, seed scripts, and test fixtures. The documentation syntax is framework-specific:
  - **TypeScript / JavaScript classes, methods, DTOs, services, controllers** → JSDoc block comments
  - **Python / Django classes, methods, DTO-equivalent constructs, services, controllers** → Python docstrings
  - **Database columns** → ORM/schema-level documentation mechanism where supported (e.g., TypeORM `@Column({ comment: '...' })` for NestJS, Django model field `help_text='...'` for Django); otherwise documented in migration/DDL
  - **Config variables** → Zod / class-validator configuration-schema documentation and `.env.example` annotations
* **Why:** When an AI reads an entity property `is_active`, it shouldn't guess if it means "email verified" or "billing active". The documentation must explicitly declare it.
* **What MUST be included in every documented construct:**
  1. **Intent:** Deep explanation of the business context.
  2. **Edge Cases:** Explicit mapping of failure states and constraints.
  3. **Side Effects:** Mention cache invalidations, webhooks, or event emissions.
  4. **AI Notes (Crucial):** Required documentation metadata, warnings, or routing instructions for future AIs.

## Rule 116 — OpenAPI Documentation and MCP-Ready API Design
* **The Rule:** The backend must be designed to be "Self-Discoverable" by autonomous AI agents via the **Model Context Protocol (MCP)**. 
* **NestJS implementation:** Every REST endpoint, DTO, and Response object/schema must be heavily annotated using Swagger decorators (`@ApiProperty`, `@ApiOperation`, `@ApiResponse`).
* **Django implementation:** Every REST endpoint, Serializer, and Response object/schema must be heavily annotated using OpenAPI decorators (e.g., `drf-spectacular`'s `@extend_schema`).
* **Framework-independent requirement:** The resulting OpenAPI/Swagger schema must be 100% strictly typed with no missing fields, explicitly documenting the response payload structure.
* **Why:** This allows an MCP Server to ingest the backend's API specification and dynamically convert all your endpoints into **LLM Tools**. An AI agent can then connect to your backend and intuitively execute commands (e.g., `create_member`, `fetch_dashboard_kpis`) natively, treating your backend as an extension of its own brain rather than just static code.

## Rule 117 — Universal RAG-Ready API Projections (All Query Endpoints)
* **The Problem:** Standard REST JSON responses contain excessive noise (UUIDs, nested metadata, timestamps) that waste LLM tokens and degrade AI comprehension when used by an internal Chatbot or AI agent.
* **The Rule:** ALL read/query endpoints (`GET`) across all backend modules MUST support RAG-Ready API projections out-of-the-box. This is a universal architectural standard for all query endpoints — AI agents MUST implement this natively without pausing, asking for approval, or delaying development.
* **Implementation (Autonomous Sub-Module Local RAG Formatter Pattern):** 
  1. Every `GET` endpoint must support the query parameter `?format=rag`.
  2. When `?format=rag` is omitted or false, the endpoint returns the standard JSON response envelope (`ApiResponse<T>`).
  3. When `?format=rag=true` (or `?format=rag`) is passed, the endpoint returns a clean, token-optimized Markdown or flattened plain-text representation of the resource (e.g., returning `"Member: Rahul | Status: Active | Plan Expires: 5 Days"` instead of a 50-line nested JSON tree).
  4. **Autonomous Sub-Module Self-Containment (Zero Global Helpers):** The sub-module implements its RAG projection locally within its own `{submodule}-mappers/{submodule}-rag.mapper.ts` (e.g. `attendance-history-rag.mapper.ts`) with ZERO external formatting dependencies. It directly serializes entity models into clean, deterministic markdown bullet points. An external AI receiving ONLY this sub-module folder can infer, run, test, and repair the RAG formatter without external platform utilities.
  5. RAG endpoints remain strictly within their role and module boundary; do NOT create a generic root-level `_rag` namespace.
* **Automated Security & Sanitization (Zero-Delay Built-in Protection):**
  - Tenant isolation is strictly preserved: RAG projections automatically inherit the query's tenant filter (`gymId`, `branchId` from JWT).
  - Sensitive fields are automatically excluded: Passwords, password hashes, credit card tokens, secret keys, internal salts, and any field marked with `@Exclude()` or serializer exclusion are stripped automatically.
  - Read-Only Scope: Mutating endpoints (`POST`, `PUT`, `PATCH`, `DELETE`) do NOT accept `?format=rag` because they are write operations.
* **Why:** This drastically reduces token costs and hallucinations when feeding entity context into LLMs and Chatbots, while avoiding any human approval bottlenecks during development.


## Rule 118 - Event-Driven Immutable Analytics (Zero-Overwrite Strategy)
* **The Problem:** Standard CRUD operations (like updating a subscription status from 'Active' to 'Cancelled') overwrite historical state, completely destroying the ability to perform deep, time-series analytics (e.g., "How many users cancelled exactly on day 14?").
* **The Rule:** For any critical domain entity (Billing, Attendance, Subscription, Member Lifecycle), apply a **Zero-Overwrite** rule for analytics. 
* **Implementation:** Every critical state change MUST publish an immutable Domain Event (e.g., `BILLING.SUBSCRIPTION.CANCELLED`) to a message broker (Redis Streams) and store it in an append-only `events_log` or timeseries table. 
* **Why:** All AI Analytics engines, forecasting models, and **historical/state-transition analytics (e.g., member lifecycle, revenue trends, forecasting) MUST query this immutable event log**. Current operational widgets (e.g., live attendance, active sessions) MAY query the transactional read model directly (see Rule 114). Dashboards that mix both widget types must source each widget from its appropriate layer (CQRS read-replica pattern) instead of running heavy `JOIN` operations on the live transactional database. This ensures the transactional DB stays fast and analytics are 100% historically accurate.

## Rule 119 - The Double-Entry Financial Ledger (For Billing & Wallets)

**Cached Balance Projection Pattern:**
While the ledger is the absolute source of truth and balances must never be mutated directly via API calls (`UPDATE members SET balance = X`), entities MAY contain a `balance` column (e.g., `balance: bigint`) for **fast read-model caching**. This cached balance column is updated strictly by the backend either synchronously in the same database transaction as the ledger insert, or asynchronously via event handlers. An API consumer must never be allowed to pass a `balance` value in a request payload to update this column.
* **The Problem:** AI agents typically write naive database queries for financial transactions (e.g., `UPDATE members SET wallet_balance = wallet_balance - 500`). In a production environment, concurrent requests or failed network calls lead to race conditions, lost money, and untraceable missing funds.
* **The Rule:** NEVER update a financial balance directly. Any monetary transaction (POS purchase, subscription prorating, refund, wallet top-up) MUST follow the **Immutable Double-Entry Ledger Pattern**. 
* **Implementation:** You must insert rows into a `ledger_entries` table for every transaction. Ledger rows are immutable (no `UPDATE` or `DELETE`); corrections require a reversal journal entry. The schema must require: `journal_id` (unique reference for atomicity), `account_id`, `direction` (DEBIT | CREDIT), and `amount_minor_units` (always > 0). The transaction must guarantee `total_debits == total_credits`. The current balance is dynamically calculated. 
* **Why:** This provides a strong accounting control and makes unbalanced journals detectable/preventable when enforced transactionally, providing a perfect, tamper-proof audit trail for accounting.

---

## 120. Mobile Client Compatibility Contract

The backend must support released mobile app versions for a documented compatibility window. A backend change must never silently break an installed React Native app.

Every mobile request may include:
- `X-Client-Platform`: `IOS` or `ANDROID`
- `X-Client-Version`: semantic app version (e.g., `1.4.2`)
- `X-Request-Id`: client-generated UUID for support and correlation

Rules:
1. These headers are observability/compatibility metadata only and must never decide authorization or tenant identity.
2. Breaking API changes require a new API version (`/api/v2/`) or a documented deprecation period.
3. If an app version must be blocked for security or data-integrity reasons, return a canonical error response with:
   `errorCode: CLIENT.APP.UPGRADE_REQUIRED` (HTTP 426 Upgrade Required).
4. The response must contain the minimum supported version and an optional store URL only when defined by the frozen API contract.
5. Mobile app version information must be included in structured logs and traces but must not include device secrets or personal data.

---

## 121. Offline Sync, Delta Synchronization, and Conflict Resolution

Any feature intended for offline or unstable-network use must define an explicit sync contract in its `{role}-{module}-backend-feature.md`.

The contract must define:
- Whether offline writes are supported
- Sync cursor format and expiry
- Delta endpoint behavior
- Deletion/tombstone behavior
- Conflict strategy
- Retry/idempotency behavior
- Maximum sync page size
- Sensitive data excluded from offline storage

Rules:
1. Sync endpoints must return deltas, not full historical datasets by default.
2. Soft-deleted records must be represented as tombstones (`is_deleted: true`, `deleted_at: string`) so the mobile client can cleanly purge local cached data.
3. Every offline mutation must use Rule 103 retry-safe idempotency.
4. Conflicting writes must return a canonical `409 Conflict` response with a stable error code such as `SYNC.ENTITY.VERSION_CONFLICT`.
5. The feature documentation must explicitly declare one conflict strategy: server-wins, client-wins, last-write-wins with versioning, merge-by-field, or manual-resolution-required.
6. Use server-controlled version/revision fields for conflict detection. Do not trust client timestamps as the authoritative ordering source.
7. Cursor pagination should be available for large feeds, timelines, activity logs, and synchronization endpoints. Offset pagination remains acceptable for normal administrative tables.

---

## 122. Mobile Upload and Download Resilience

Mobile upload endpoints must account for slow networks, application backgrounding, network switching, retry behavior, and duplicate completion callbacks.

Rules:
1. Uploads above the normal request payload threshold must use an approved resumable or pre-authorized upload flow (S3 signed URLs).
2. File metadata creation and file binary upload completion must be separate, idempotent steps.
3. The backend must verify MIME type, file size, checksum where applicable, ownership, and tenant scope before marking an upload usable.
4. Files must remain in `PENDING_UPLOAD`, `PROCESSING`, `READY`, or `FAILED` states.
5. The client must not assume an upload is ready immediately after binary transfer.
6. Signed upload/download URLs must be short-lived (e.g. 15 minutes) and scoped to one actor and one object.
7. Original filenames must not be used as storage keys.
8. Any file-processing failure must expose a stable machine-readable error code.

---

## 123. Mobile Push Notification Device Registration

Push device registration must be treated as a tenant-scoped and user-scoped security resource, not as an anonymous string.

Rules:
1. A device push token must be associated with authenticated user ID, tenant scope, platform, app version, device session ID, and updated timestamp.
2. Re-registering the same device must be idempotent.
3. Invalid, expired, or provider-rejected tokens must be deactivated automatically upon receipt of provider feedback.
4. Logout and device-session revocation must deactivate the device registration immediately.
5. Push notification payloads must not expose sensitive health, payment, identity, or confidential business data on the device lock screen.
6. Actual notification content must be fetched from an authenticated API endpoint when sensitive details are required.

---

## 124. Mobile Time, Currency, and Locale Semantics

1. Database timestamps must be stored as UTC timestamps.
2. Every tenant must have an explicit IANA business timezone, for example `Asia/Kolkata`.
3. Backend business calculations such as attendance day, membership expiry day, billing cycle, cutoff time, and scheduled-job timing must use the tenant business timezone, not the mobile device timezone.
4. Date-only business fields must use `YYYY-MM-DD` and must not be converted into a timestamp merely for storage convenience.
5. Monetary API values must use integer minor units (paise/cents) and include ISO-4217 currency code.
6. Do not assume all currencies use two decimal places. Currency minor-unit formatting belongs to the client presentation layer.

---

## MINIMUM EVIDENCE STANDARD BY RULE CATEGORY

A rule CANNOT be marked `COMPLIANT` without the minimum evidence required for its category. AI agents MUST satisfy all evidence requirements before assigning COMPLIANT status.

| Rule Category | Minimum Required Evidence |
|---|---|
| **Structural rule** | Folder/module tree, import graph, module registration/wiring evidence |
| **API contract rule** | Route, request DTO, response DTO, serializer, error contract, tests |
| **Authorization rule** | Authentication guard, authorization policy/decorator, tenant/resource scope, negative-access tests |
| **Database rule** | Entity/schema file, migration file, constraints, indexes, repository/query evidence |
| **Async/event rule** | Transaction ordering, outbox/event persistence where required, consumer/job evidence, retry/idempotency tests |
| **Cache rule** | Cache key format, invalidation ordering, tenant isolation, tests |
| **Documentation rule** | Required document at correct location, content current and accurate |
| **Deployment/config rule** | Supplied configuration file, registration, and environment variable evidence |
| **Multi-tenancy rule** | gymId/branchId from JWT (never body), tenant filter in every query, cross-tenant negative tests |
| **Naming rule** | Actual file paths and class names verified against naming table |
| **Seed rule** | Seed file exists, idempotency confirmed, wrapped in transaction |

---

## RULE APPLICABILITY CRITERIA TEMPLATE

For conditional rules (WebSockets, RAG output, caching, idempotency, UI automation, multi-tenancy sub-cases), every rule section must define:

```text
### Applicability

This rule applies when one or more of the following conditions are true:
- [condition list]

This rule does NOT apply when:
- [exclusion conditions]

Required evidence when applicable:
- [evidence list]

Required record when NOT applicable:
NOT_APPLICABLE — [justification] — [source evidence supporting non-applicability]
```

An AI MUST NOT skip a conditional rule without recording `NOT_APPLICABLE` with justification.

---

## ARCHITECTURE DOCUMENT VERSIONING AND CHANGE CONTROL

Every rule addition, removal, or semantic change to this document MUST include:

| Field | Required |
|---|---|
| Document version | YES |
| Date of change | YES |
| Affected rule IDs | YES |
| Migration impact | YES — does this require retroactive re-audit of existing modules? |
| Compatibility expectations | YES — does existing passing code remain compliant? |

**Rule numbering policy:**
- Renumbering a rule MUST preserve an alias to the previous rule ID.
- New mandatory rules MUST state their enforcement scope:
  - `PROSPECTIVE_ONLY` — applies to new modules only
  - `NEW_MODULES_AND_NEXT_AUDIT` — applies to new modules now, existing modules at next audit
  - `IMMEDIATE_ALL_MODULES` — applies immediately and retroactively to all modules

---

## UNAVAILABLE INFRASTRUCTURE COMPLIANCE RULE

A feature module MUST NOT claim compliance with an architecture rule that depends on absent shared infrastructure.

When a rule depends on global infrastructure outside the supplied scope:
1. Verify the integration point if available in the supplied inputs.
2. Otherwise mark the dependency using the CANONICAL COMPLIANCE STATUS VOCABULARY:
   - `NOT_VERIFIED` — if existence is unknown
   - `OUTSIDE_SUPPLIED_SCOPE` — if known to exist but not supplied
   - `BLOCKED_BY_SUPPLIED_SCOPE` — if compliance cannot be determined without it
3. Document the exact required interface, registration point, configuration key, and ownership.
4. Do NOT create mock global infrastructure merely to satisfy the rule.

A feature module CANNOT be declared `COMPLIANT` for a rule if a mandatory global dependency for that rule remains `NOT_VERIFIED` or `BLOCKED_BY_SUPPLIED_SCOPE`. The module's overall readiness MUST reflect this as `NOT_READY_DUE_TO_EXTERNAL_BLOCKER`.

⛔ **ISOLATED ROLE / MODULE SCOPE RULE FOR GLOBAL DEPENDENCIES (NON-NEGOTIABLE):**
In a modular monolith, individual role modules (e.g., `backend-superadmin/`, `backend-trainer/`) rely on host-level infrastructure (`backend-core`, `@nestjs/common`, TypeORM DataSource, Redis, BullMQ) by architectural contract design.
- The AI MUST NOT treat missing host-level monolith infrastructure as `BLOCKED_BY_SUPPLIED_SCOPE` or `NOT_READY_DUE_TO_EXTERNAL_BLOCKER`.
- The AI MUST mark host infrastructure integration as `OUTSIDE_SUPPLIED_SCOPE (HOST_MONOLITH_RESPONSIBILITY)`.
- If the feature module correctly implements its side of the contract (e.g. `@UseGuards(JwtAuthGuard)`, valid DTO validation, correct entity mapping), the feature module itself is **COMPLIANT** within its supplied modular boundary.
- The AI MUST NEVER stall, stop, or ask the user to provide host application slices or root bootstrap files.

---

## 14-GATE RELEASE FREEZE & AUTONOMOUS AI SUB-MODULE VERIFICATION MATRIX

> ⛔ **CRITICAL RELEASE INVARIANT — 100% PASS REQUIRED:**
> Before any backend autonomous sub-module (`{submodule}/`) can be certified, committed, frozen, or zipped for autonomous AI development or production deployment, it MUST achieve a deterministic `14/14 PASS` on this verification matrix. A single `FAIL` halts release.

| Gate # | Gate Name | Scope | Verification Standard & Exact Condition | Failure Mode Consequence |
|---|---|---|---|---|
| **Gate 1** | **Universal 4-Tier Hierarchy Gate** | Structure | Tree strictly adheres to `backend-{role}/{role}-modules/{role}-{domain}/{submodule}/`. Aggregator module in domain root; all business logic inside child sub-modules. | Critical Structure Failure |
| **Gate 2** | **Business Depth = 1 Gate** | Structure | Sub-submodules strictly forbidden. Business depth = 1. Artifact exemptions strictly limited to `{submodule}-tests/` (`harness/`, `fixtures/`, `unit/`, `integration/`), `{submodule}-locales/` (`en/`, `hi/`), and `contracts/`. | Nesting Violation |
| **Gate 3** | **Sibling Isolation Firewall Gate** | Boundary | Zero sibling imports (`import '../sibling'`). Zero sibling DTOs, services, or repos imported. Zero domain-level shared business folders (`manager-attendance/common/` banned). | Cross-Submodule Coupling |
| **Gate 4** | **WET vs DRY Governance Gate** | Architecture | Business DTOs, services, repos, mappers, and fixtures are strictly WET (sub-module local). Core infrastructure (logger, tenant context, envelope) is strictly DRY. | Architecture Drift |
| **Gate 5** | **Dual-Layer Multi-Tenancy Gate** | Security | Layer 1: Connection routing via `TenantContext`. Layer 2: Mandatory `where: { gymId }` query AST predicate in all repository queries. JWT payload is sole tenant source. | P0 Cross-Tenant Vulnerability |
| **Gate 6** | **Discriminated Union API Envelope Gate** | Contract | Universal `ApiResponse<T> = ApiSuccess<T> \| ApiFailure` with mandatory `requestId`, `success`, `message`, `data`, and typed `statusCode?: HttpStatus \| number`. | Frontend Contract Breach |
| **Gate 7** | **HTTP Status Enum Law Gate** | Quality | TypeScript and Python source code ALWAYS references framework enum (`HttpStatus.OK`, `HttpStatus.CREATED`). Integer status codes in source code strictly banned. | Silent Auth/Authz Bug |
| **Gate 8** | **Standalone Test Harness & Seeder Gate** | Portability | Working seeder (`[submodule].seed.ts`) and standalone harness (`[submodule].harness.ts`) runnable independently on in-memory SQLite / mock DataSource. | Unrunnable Sub-Module |
| **Gate 9** | **8-State Mock Scenario Catalog Gate** | Quality | Harness fixtures implement the 8 canonical scenarios: `ACTIVE`, `EMPTY`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `SERVER_500`, `TIMEOUT`. | Untestable Error Paths |
| **Gate 10** | **Ambient Core Stubs & Manifest Gate** | Portability | Sub-module owns `contracts/core-contracts.stub.ts` and `required-core-contracts.json`. Consumed host platform contracts within hard budget ceiling (≤ 7). | Non-Compilable ZIP |
| **Gate 11** | **Production Safety Guards Gate** | Safety | `Idempotency-Key` (UUIDv4; accepts `Idempotency-Key` or `X-Idempotency-Key`) on non-naturally idempotent mutations; pessimistic locks on concurrent financial/inventory mutations; zero hardcoded secrets. | Race Condition / Loss |
| **Gate 12** | **Documentation Trio Freshness Gate** | Docs | Contains `_backend-feature.md` (all 22 canonical sections complete), `_backend-forbidden.md`, and `_backend-contract.md`. | Context Hallucination |
| **Gate 13** | **Local RAG Projection Self-Containment Gate** | AI Tools | Read endpoints support `?format=rag` using sub-module local mapper (`{submodule}-rag.mapper.ts`) with zero global helper dependencies. | LLM Tooling Failure |
| **Gate 14** | **Automated CI Portability Gate** | Portability | Sub-module folder zipped alone compiles with `tsc --noEmit` and passes local unit test suite with 0 errors without host repository. | Autonomous ZIP Violation |

---

## AI_REPAIR_SCOPE.md MANDATORY SPECIFICATION

Whenever an autonomous sub-module is zipped or handed to an external AI agent for bug repair or feature enhancement, the root of the sub-module directory MUST contain an `AI_REPAIR_SCOPE.md` file:

```markdown
# AI Repair Scope & Boundary Contract: [submodule-name]

## 1. Allowed Writable Scope
- This sub-module directory ONLY: `[submodule-name]/**`
- Strictly prohibited from creating or modifying files outside this folder.

## 2. Consumed Core Contracts (Budget <= 7)
- Declared in `required-core-contracts.json`:
  1. TenantContext (JWT Tenant Scope: gymId, branchId)
  2. ApiResponse<T> (Universal Discriminated Union Envelope)
  3. EventPublisher (Transactional Outbox Redis Stream)
  4. PinoLogger (Structured Correlation Logger)
  5. AuthGuard / RolesDecorator

## 3. Local Offline Verification
- Execute local test suite: `npm test`
- Execute local compilation check: `npm run type-check` (or `tsc --noEmit`)
- Verify with 8-State Mock Catalog in `tests/fixtures/mock-scenarios.ts`
```
