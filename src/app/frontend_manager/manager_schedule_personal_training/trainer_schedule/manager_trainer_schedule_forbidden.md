# Manager Schedule — Schedule Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_schedule/trainer_schedule/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# 🚫 FORBIDDEN IN MANAGER SCHEDULE MODULE

1. **No direct DOM manipulation for Tooltips**: Do not use `title=` attribute on HTML elements to show tooltips. Always use `<ManagerTooltip>`.
2. **No useState for search/filters**: Do not store the search or day filter in local React state. Always use `useSearchParams` to ensure shareable URLs.
3. **No hardcoded generic `<p>` tag empty states**: Always use `<ManagerEmptyState />` for lists/tables that have no data.
4. **No global/admin imports**: Do not import components or types from `/admin` or `/superadmin`.
5. **No inline colors**: Do not hardcode colors in `ManagerTrainerScheduleKPIs` or `ManagerTrainerScheduleWeeklyGrid`. Use defined theme tokens.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
