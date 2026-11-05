# superadmin_platform_shell_layout — Forbidden Patterns

- No child feature-bearing submodules, child domain containers, or artificial category parents.
- No cross-role imports or sibling feature-business imports.
- No business records, business API endpoints, or feature-owned state in role-shell infrastructure.
- No unverified host route rewrites or invented endpoint/payload/response contracts.
- No hardcoded theme colors, inline styles, Tailwind arbitrary token values, or semantic-background opacity modifiers.
- No browser `alert()`/`confirm()` calls or controls without real, accessible behavior.
- No direct `fetch`/Axios in feature code; use the approved API adapter.
- No `any`, `@ts-ignore`, fabricated test result, fake fixture contract, or `TODO`/ellipsis placeholder in delivered source.
- Do not use relative imports for internal module artifacts; use direct `@/` aliases.
- Do not store business-entity state in `localStorage`.
- Do not remove existing route entries, features, tests, modals, handlers, or flows to obtain a cleaner audit result.

## Isolation Contract

Owning leaf: `frontend_superadmin/superadmin_platform_shell/platform_shell_layout/`. Internal code stays inside this leaf's canonical folders. Its domain parent may contain only approved route shell/redirect entries, the domain documentation trio, and sibling leaf directories. The leaf root may contain only Next.js route-entry files, its URL config under `config/`, and its feature documentation trio.
