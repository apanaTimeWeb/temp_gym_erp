# Manager Reports — Reports Overview Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_reports/reports_overview/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Forbidden Patterns for `frontend_manager/manager_reports`

1. **No Mixed UI and Logic:** All heavy logic MUST reside in the adjacent custom hook or store.
2. **No Relative Imports:** Always use absolute paths starting with `@/app/frontend_manager/manager_reports_referrals/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use `ManagerConfirmProvider`.
5. **No Context for Async Data:** Do not use React Context for API data. Use TanStack Query for server/API data; use module-scoped Zustand only for UI-only shared state.
6. **No Arbitrary Tailwind Values:** Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** Let the store handle notifications.
8. **No Localized API Calls:** UI components must not call `apiFetch` directly.
9. **No Recharts or Chart.js:** Use `react-apexcharts` exclusively (canonical chart library).


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.


## Manager-role export prohibition
Manager Reports must not expose synchronous report-download/export controls. Tenant data export belongs to the Superadmin/top-level Gym Admin flow defined by the global frontend architecture contract.


## Synchronous export is forbidden
Manager Reports is a Manager-role analytics surface. Do not add synchronous CSV/PDF/blob downloads or export buttons here; tenant-wide data export belongs to the authorized top-level role per the governing frontend architecture.
