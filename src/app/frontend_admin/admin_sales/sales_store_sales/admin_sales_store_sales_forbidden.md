# Sales Store Sales — Forbidden Patterns for `erp/sales`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix `useEffect` or state hooks inside UI components. All heavy logic MUST reside in the adjacent custom hook.
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/frontend_admin/admin_sales/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use a customized `ConfirmationDrawer` or `Modal`.
5. **No Server Data in Context/Zustand:** Do not store API responses, API loading, or API error state in React Context or Zustand. TanStack Query owns server state; Zustand is only for module UI/client state.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** UI components should not intercept API errors to show toasts; let the API interceptor or Zustand store handle notifications and state updates.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in custom hooks or stores, which then communicate with `sales_api`.

## Canonical Sub-Module Isolation Invariants (Architecture Rule 40)

These constraints apply to this leaf in addition to the feature-specific prohibitions above. The canonical rule authority remains `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`, Rule 40; this list makes the local boundary explicit without changing that authority.

1. **Zero cross-sub-module business imports:** do not import sibling leaf components, hooks, stores, types, schemas, utilities, fixtures, or handlers.
2. **Zero parent shared folders:** do not create or consume parent `common/`, `shared/`, or business-aware `components/` folders.
3. **Strict WET isolation:** duplicate business-specific badges, filters, formatters, and UI patterns locally when sharing them would couple leaves.
4. **Zero cross-sub-module in-memory state:** do not share React Context, Zustand stores, or mutable business objects with sibling leaves; use documented URL navigation and typed query parameters where approved.
5. **Local fixture ownership:** keep this leaf's fixtures, MSW handlers, scenarios, and mock tests inside this leaf's `mocks/` and `tests/` directories.
6. **No duplicate global mock handlers:** do not register a second global handler for a leaf-owned endpoint or scenario.
7. **No sibling fixture imports:** do not import sample data or scenario factories owned by another business leaf.
8. **No fake business fallbacks:** do not fabricate records, statuses, IDs, amounts, permissions, or success responses to disguise missing API contracts.
9. **API boundary only:** UI components must not bypass the leaf API client to read fixtures directly or call backend endpoints ad hoc.
10. **No casual global MSW changes:** do not modify the role-wide MSW bootstrap for a leaf-local change unless registration is explicitly required by the existing harness contract.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
