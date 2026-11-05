# Manager Settings — Settings Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_settings/business_settings/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Manager Settings — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No native `<select>` for timezone, currency, or any large dataset** — Always use `SearchableDropdown` from `components/ui/manager_searchable_dropdown/`. Rule 20.

2. **No `transition-opacity` or any animation without `motion-safe:` prefix** — Rule 29. Every `transition-*`, `animate-*`, `hover:-translate-*` must be prefixed with `motion-safe:`.

3. **No platform-level or billing settings** — Subscription plan changes, feature flag toggles, and billing configuration belong to Admin or Superadmin. Never add those controls here.

4. **No hardcoded API keys or secrets** — Integration keys must use placeholder strings (`'<API_KEY>'`). Never commit real credentials. Rule 74.

5. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

6. **No hardcoded API URLs** — All endpoints must be imported from `settings_url_config.ts`.

7. **No `'use client'` in page.tsx** — `page.tsx` must remain a Server Component. All interactivity lives in `ManagerBusinessSettingsMain.tsx`. Rule 8.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
