# Manager Profile — Profile Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_profile/profile_and_security/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Manager Profile — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No editable email or branch fields** — Email and branch assignment are always read-only. Changes require admin-level action.

2. **No salary, payroll, or HR data** — These belong to `manager/hr/`. Never fetch or display them here.

3. **No plain `<input type="password">` without eye-toggle** — All password fields MUST have Eye/EyeOff visibility toggle. Rule 23.

4. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

5. **No hardcoded API URLs** — All endpoints must be imported from `profile_url_config.ts`.

6. **No `'use client'` in page.tsx** — `page.tsx` must remain a Server Component. Rule 8.

7. **No `alert()` or `window.confirm()`** — Use `useConfirm()` from `ManagerConfirmProvider` for any destructive action.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
