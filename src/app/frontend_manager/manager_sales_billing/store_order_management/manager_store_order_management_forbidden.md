# Manager Store — Store Products Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_store/store_order_management/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Forbidden Patterns for `frontend_manager/manager_store`

1. **No Inline Styling Violations:** Do not use `text-green-500`, `bg-[#123456]`, or raw CSS variable expressions (`var(--store-highlight)`) in JSX `style` tags. Use semantic Tailwind variables defined in `store_theme_contract.md`.
2. **No Unsafe Type Casting:** `any` and `as any` are strictly forbidden. Narrow types properly or use `unknown`.
3. **No Direct Formatting:** Never use `.toLocaleString()` or string concatenation for currency values (e.g. `Rs. ${val}`). ALWAYS import `formatCurrencyFromMinorUnits` from `the module-local `ManagerStoreProductsFormatters.ts` in `manager_store_utils/`` and treat API monetary values as minor units.
4. **No Relative Imports:** Use `@/app/frontend_manager/manager_sales_billing/...` rather than `../` or `./`.
5. **URL is the Source of Truth:** Do not introduce hidden filter states in `useState` that do not sync to the URL. If you filter products or orders, update the URL params.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.

## V28 cross-workflow prohibitions (RBG-35–RBG-50)

Do not add product CRUD or order-creation methods to order history.
