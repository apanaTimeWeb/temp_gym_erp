# Manager Expenses — Expenses Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_expenses/expense_register_and_reporting/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Forbidden Patterns for `frontend_manager/manager_expenses`

To maintain enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** All URL manipulation and modal state logic MUST reside in `ManagerExpenseRegisterAndReportingLogic.tsx`. UI components should only consume the context.
2. **No Relative Imports:** Never use `./` or `../`. Always use absolute paths starting with `@/app/frontend_manager/manager_finance_expenses/...`.
3. **No Direct Formatting:** Do NOT use `.toLocaleString()`, `.toFixed()`, or string concatenation for currencies. All numeric formatting MUST go through `the module-local `ManagerExpenseRegisterAndReportingFormatters.ts` in `manager_expenses_utils/``.
4. **No Recharts or Chart.js:** The only allowed charting library is `react-apexcharts`.
5. **No Context for Async Cache:** Do not store API responses manually in React Context state. Let TanStack Query own server/API cache data. URL state owns documented searchable/filterable/paginated controls; React Context does not own feature filter state.
6. **No Local State for Filters:** The search, status, and page filters MUST sync to the URL. Do not keep them only in `useState` or `Zustand`.
7. **No Arbitrary Colors:** Do not use `bg-green-500`, `text-[var(--primary)]`, or raw hex codes in JSX (except within ApexCharts config objects where canvas rendering requires hex). Follow `expenses_theme_contract.md`.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
