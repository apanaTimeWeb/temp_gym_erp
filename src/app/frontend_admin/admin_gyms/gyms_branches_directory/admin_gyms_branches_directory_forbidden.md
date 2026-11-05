# Forbidden Patterns — `admin/branches`

## 1. No Create / Edit / Delete Operations
**FORBIDDEN:** Adding any button, form, or API call that creates, modifies, or deletes a branch.
**REASON:** Admins are read-only viewers of branch data. All write operations belong to the Manager role.
**ALLOWED:** Only `GET /admin/branches` and `GET /admin/branches/:id` are permitted from this module.

## 2. No Inline Status Badge Colors
**FORBIDDEN:** `className={status === 'ACTIVE' ? 'bg-green-500 text-white' : '...'}`
**REASON:** Status badge styles live in `AdminBranchesConstants.ts` → `BRANCH_STATUS_STYLES`.
**ALLOWED:** `className={ADMIN_BRANCH_STATUS_STYLES[branch.status] ?? ADMIN_BRANCH_STATUS_STYLES.DEFAULT}`

## 3. No Cross-Role Imports
**FORBIDDEN:** Importing anything from `/manager`, `/trainer`, or `/superadmin` modules.
**REASON:** Total role isolation (Rule 2) — branches are scoped to the admin module only.

## 4. No Relative Imports
**FORBIDDEN:** `import { AdminBranch } from '../../types/...'`
**ALLOWED:** `import type { AdminBranch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes'`

## 5. No Direct `apiFetch` in Components
**FORBIDDEN:** Calling `apiFetch` directly inside `.tsx` component files.
**ALLOWED:** All API calls must go through `adminBranchesApi` in `branches_api/AdminBranchesApi.ts`.

## 6. No Barrel Files
**FORBIDDEN:** Creating `index.ts` re-export files.
**ALLOWED:** Import directly from the named file.

## 7. No Mixing `AdminBranch` with the Global `Branch` type
**FORBIDDEN:** Using a role-wide business branch type/store inside this module for API response typing; use `AdminBranchesTypes.ts` and the module-owned store instead.
**REASON:** The global store `Branch` is a simplified interface for the branch switcher. `AdminBranch` in `branches_types/AdminBranchesTypes.ts` is the canonical type for this module's API data.

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
