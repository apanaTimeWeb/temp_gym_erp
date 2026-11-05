# ADR-001 — Manager role support placement

- **Status:** Accepted for this bounded v28 repair batch based on the user's instruction to execute the next five RBGs (RBG-09 through RBG-13).
- **Scope:** `manager_navigation` and zero-business `manager_infrastructure` support only.
- **Decision:** Keep the Next.js route-segment layout at `frontend_manager/layout.tsx`. Place role-wide navigation components/config/types/locales under `frontend_manager/manager_navigation/` and zero-business infrastructure/providers/utilities/config/types under `frontend_manager/manager_infrastructure/`. Keep MSW/test harness support under `frontend_manager/manager_infrastructure/mocks/`.
- **Narrow exception:** This permits only shared role shell plumbing that has no feature-owned business rules or data ownership. It does not permit cross-feature business implementation imports, shared business APIs/query keys/stores/hooks, sibling feature imports, or business state moved into Context/Zustand. TanStack Query remains the server-state owner. Business modules continue to own their API clients, schemas, query keys, and workflows.
- **Consumer boundary:** Only the consumer files explicitly listed in RBG-12 and RBG-13 are migrated in this batch. No unlisted consumers are rewritten here. Legacy source paths remain available until a later full import sweep proves no remaining references.
- **Behavioral constraint:** This is path/placement work only. Export names and runtime behavior are preserved; no API contracts or business features are invented.
- **Verification:** Static import/path checks and TypeScript syntax parsing are performed for the changed source files. Browser, semantic typecheck, lint, and production build are deferred to the host runtime because the supplied overlay lacks package and TypeScript project configuration.
- **Review gate:** Before final v28 completion, re-scan all role-shell imports, validate every direct leaf URL and feature boundary, then remove legacy files only if zero references remain and all regression gates pass.


## Approval and review

This exception is bounded to zero-business role support only and is documented in `ARCHITECTURE_EXCEPTION_MANAGER_ROLE_INFRA.md`. Approval basis: the user explicitly directed completion of all RBGs in this conversation on 2026-10-30. Review/expiry date: 2026-11-30. No business API, query key, state, or workflow is permitted in role-wide infrastructure.
