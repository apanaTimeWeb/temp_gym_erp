# Forbidden Patterns — `admin/profile`

## 1. No `'use client'` in `page.tsx`
**FORBIDDEN:** Adding `'use client'` to the top-level `page.tsx`.
**ALLOWED:** `page.tsx` must remain a Server Component. Only `AdminProfileOverviewMain.tsx` (in `components/main_view/`) uses `'use client'`.

## 2. No Editable Email Field
**FORBIDDEN:** An email input that is enabled for editing.
**REASON:** Email changes require Superadmin intervention and cannot be done self-service.
**ALLOWED:** Email displayed as a read-only `<input readOnly>` with a helper text.

## 3. No Password Fields Without Eye Toggle
**FORBIDDEN:** `<input type="password">` without a visibility toggle button.
**ALLOWED:** Always pair with `Eye`/`EyeOff` from `lucide-react` (Rule 23).

## 4. No Cross-Admin Profile Access
**FORBIDDEN:** Fetching another admin's profile from this module.
**ALLOWED:** Only the authenticated user's own profile data.

## 5. No `useState` Directly in `admin_profile_main`
**FORBIDDEN:** Form state managed directly in the component with individual `useState` calls.
**ALLOWED:** All form state and handlers via `useAdminProfileOverviewLogic` from `hooks/`.

## 6. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.

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
