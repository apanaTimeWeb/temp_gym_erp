# Reports Revenue — Forbidden Patterns — `admin/reports`

## 1. No Recharts or Chart.js
**FORBIDDEN:** `import { LineChart } from 'recharts'` or any Chart.js import.
**ALLOWED:** `import Chart from 'react-apexcharts'` only.

## 2. No Mutations
**FORBIDDEN:** Any write operation (POST, PATCH, DELETE) from this module.
**ALLOWED:** Read-only GET calls for report data.

## 3. No Raw Date Display
**FORBIDDEN:** Rendering ISO date strings directly.
**ALLOWED:** Always format with `date-fns` or `dayjs`.

## 4. No Native Range Date Picker
**FORBIDDEN:** Two separate `<input type="date">` elements for a date range.
**ALLOWED:** Use `AdminDateRangePicker` shared component or a proper date range picker component.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.

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


## Business-domain ownership boundary (v46)

- Do not add report endpoints, response DTOs, filters, state, mocks or mutation hooks owned by another business domain.
- This leaf may only call its own report-data endpoint and its documented branch-reference endpoint.
- Do not move this report into `admin_reports/`; that domain contains only a read-only cross-domain catalog.
- Do not fabricate the binary export response contract; keep export fail-closed until the host contract is supplied.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
