# Manager Grievance — Grievance Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_grievance/grievance_resolution/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Manager Grievance — Forbidden Patterns

- No sibling Manager business imports.
- No direct business URLs outside `grievance_url_config.ts`.
- No direct toast-library calls in feature components/hooks; use Manager toast infrastructure.
- No fake success state without a corresponding API/mock state transition.
- No raw Tailwind theme colors or semantic background opacity modifiers.
- No unlabeled form fields or unlabeled icon-only buttons.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.


## Cross-feature test ownership boundary

- Never place Landing booking/contact Selenium tests inside `manager_grievance/`; those tests belong to the Landing backend/frontend test suite and live outside the Manager role overlay.
