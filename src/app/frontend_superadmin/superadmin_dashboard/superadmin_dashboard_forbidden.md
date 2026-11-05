# Dashboard — Forbidden Patterns

Domain: `superadmin_dashboard`

The following patterns are forbidden in this domain:

- Mixing unrelated business concerns into this domain.
- Adding artificial organizational parents between `frontend_superadmin/` and this domain.
- Creating feature-bearing submodules inside any terminal leaf.
- Placing business code, API clients, hooks, stores, mocks, tests, or locale resources at this domain root.
- Importing business components/hooks/types/schemas/mocks/state from a sibling leaf.
- Creating `common/`, `shared/`, `misc/`, or other catch-all folders to couple leaves.
- Inventing endpoint paths, request/response fields, permissions, or business flows not supported by a leaf contract or verified source.
- Replacing missing API behavior with fake static-only mocks that do not implement mutations as mutable state.
- Claiming runtime, semantic typecheck, production build, or browser test success without running the host tooling.

Internal views and modals belong in the owning leaf's canonical `components/` category. Every leaf must maintain its own docs trio, URL config, `contracts/host-stubs.d.ts`, and `tests/harness/bootstrap.ts` plus a provider harness.
