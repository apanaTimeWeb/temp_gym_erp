# Admin Frontend — Forbidden Patterns (v47)

## Physical hierarchy and module ownership

- Do not create business domain folders outside the 13 canonical domain containers listed in `MODULE_MAP.md`.
- Do not restore a separate `admin_layout/` shell tree. The role shell belongs to `admin_navigation/`.
- Do not put loose business code at domain roots. Root-level business logic belongs inside the owning autonomous leaves.
- Do not create generic `common/`, `shared/`, `misc/`, action-only nano-modules, route-group folders, or sub-submodules.

## Import, state and API boundaries

- Do not import business components, stores, hooks, API clients, schemas, fixtures or handlers across sibling business leaves; follow strict isolation and WET duplication.
- `admin_navigation/` may consume typed route contracts and role-shell localization; it must not import feature business components/state/APIs/mocks.
- Role-wide MSW aggregation belongs to archive-level test support, not navigation or a business leaf.
- TanStack Query owns server state; module-scoped Zustand owns transient UI state. Do not persist business entities in browser storage or expose client secrets.
- Do not change backend endpoint literals, methods, payloads, response schemas, tenant/auth boundaries, permissions, query keys, or `Idempotency-Key: UUIDv4` behavior without verified API-contract authority.
- Do not invent the Data Export contract or dedicated 2FA lifecycle. Mark unknown external contracts explicitly.

## UI/UX, accessibility and safety

- Do not use raw browser `alert()`/`confirm()`, one-click destructive actions, unvalidated forms, silent error flows, or inert buttons.
- Do not remove unfinished features to achieve an audit pass; complete them additively.
- Do not bypass React Hook Form v7 + Zod v3, backend 400-error mapping, confirmation flows, or unsaved-change guards.
- Do not use hardcoded colors, inline styles when semantic tokens exist, arbitrary token expressions, semantic-background opacity modifiers, or gradients in authenticated ERP dashboards.
- Do not regress WCAG 2.2 AA, keyboard navigation, focus visibility, reduced motion, localized labels, loading/empty/error states, responsive behavior, or required touch targets.
- Do not claim integrated build/test/runtime compliance without executing it in the host application. Use `DEFERRED_TO_HOST_RUNTIME` or `NOT_VERIFIED_IN_SCOPE` where appropriate.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
