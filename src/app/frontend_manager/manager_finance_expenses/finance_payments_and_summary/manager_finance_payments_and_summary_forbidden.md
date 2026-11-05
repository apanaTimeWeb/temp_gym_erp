# Manager Finance — Finance Payments And Summary Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_finance/finance_payments_and_summary/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Forbidden Patterns for `frontend_manager/manager_finance`

To maintain extreme isolation and enterprise-grade architecture in the Manager Finance module, the following patterns are strictly forbidden:

## 1. UI vs State Authority
- **No Local Fallbacks for Filters:** Search, pagination, date ranges, and status filters MUST be synced to the URL via `useRouter` in `useManagerFinancePaymentsAndSummaryLogic`. Do not keep primary list states strictly in React state without URL mirroring.
- **No Mutations:** The Finance module is strictly an analytics read-only view. Do not implement payment collection or refund creation logic here. Those belong in Members or HR modules.

## 2. Theming & Formatting
- **No Arbitrary Classes:** Raw Tailwind values (e.g., `text-[#EF4444]`, `bg-green-500`) are strictly prohibited in React components. You MUST use semantic tokens defined in `finance_theme_contract.md` (e.g., `text-danger`, `bg-success-bg`).
- **Chart Exceptions:** Passing exact hex values (like `#EF4444`) directly to the ApexCharts configuration object is permitted since Canvas/SVG libraries do not reliably resolve all Tailwind variable classes.
- **No Inline Currency Formatting:** Never use `.toLocaleString()` or string concatenations for currency (`₹${value}`). All monetary values MUST pass through `formatCurrencyFromMinorUnits()` or `formatKPI()` from `the module-local `ManagerFinancePaymentsAndSummaryFormatters.ts` in `manager_finance_utils/``.

## 3. Component Boundaries
- **Dumb Presentation Tables:** `ManagerFinancePaymentsAndSummaryTable` must remain a dumb presentation component. It receives data from the Context but does not contain heavy business logic or local data fetching.

## 4. Type Safety
- **No `any` or Type Discarding:** All queries must have typed inputs and outputs. `unknown` is preferred over `any` when dynamic responses are unavoidable. Do not cast responses wildly `(res.data as any)`.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
