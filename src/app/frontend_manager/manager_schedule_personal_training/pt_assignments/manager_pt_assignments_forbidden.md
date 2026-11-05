# Manager Pt — Pt Assignments Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_pt/pt_assignments/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Manager PT — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No "Start Session" or "Conduct Session" actions** — Managers oversee PT, they do not conduct it. Session execution belongs to the Trainer role.

2. **No native `<select>` for trainer/member dropdowns** — Always use `SearchableDropdown` from `components/ui/manager_searchable_dropdown/`. Rule 20.

3. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

4. **No hardcoded API URLs** — All endpoints must be imported from `pt_url_config.ts`.

5. **No `alert()` or `window.confirm()`** — Use `useConfirm()` from `ManagerConfirmProvider` for all destructive actions.

6. **No trainer personal data exposure** — Do not display trainer salary, attendance, or HR data in this module. That belongs to `manager/hr/`.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
