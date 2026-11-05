# Forbidden Patterns for `superadmin/invoices`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix `useEffect` or state hooks inside UI components. All heavy logic MUST reside in the adjacent custom hook.
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use a customized `ConfirmationDrawer` or `Modal`.
5. **No Context for Async Data:** Do not use React Context for API/server data. Keep server state in TanStack Query; use module-scoped Zustand only for UI/client state.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** UI components should not intercept API errors to show toasts; let the API interceptor or Zustand store handle notifications and state updates.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in custom hooks or stores.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.


---

## Retained in-module documentation archive

**Original path:** `superadmin_billing_invoices/superadmin_billing_invoices_documentation/superadmin_billing_invoices_recovery_center_forbidden.md`  
**Disposition:** Historical/supporting documentation retained verbatim for traceability. It is not a separate active module contract unless explicitly stated in the active module documentation.

# superadmin_billing_invoices_management — Forbidden Patterns
- Do not claim this API/fixture-only directory is an active UI feature; no rendered consumer is present in the supplied tree.
- Do not create a route, page, component tree, endpoint, response envelope, or mock behavior without an approved product/API contract.
- Do not create a duplicate invoice screen or import sibling business-feature implementation.
- Do not read fixtures directly from production UI code.
- Do not move business behavior into global folders.
- Keep host runtime, endpoint existence, and response-envelope behavior marked `NOT_VERIFIED` until the integrated app/API is provided.


## Autonomous Leaf Isolation Contract

- Owning terminal leaf: `superadmin_billing/billing_invoices_management/`. Keep business components, hooks, API services, schemas, mocks, tests, formatters, state and feature permissions inside this leaf.
- Do not import business implementation from sibling feature leaves or create parent `common/` / `shared/` folders to share business behavior. Duplicate feature-specific behavior locally when needed.
- Approved zero-business host dependencies must be declared with exact shapes in `superadmin_billing_invoices_management_features.md`. Role-shell imports currently recorded as `BLOCKED_BY_SUPPLIED_CONTRACT` must not be hidden by fabricated global modules.
- Preserve URL config endpoint values, authorization gates, query keys, permission-masked fields, and request/response contracts unless verified source evidence authorizes a correction.
