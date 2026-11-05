# Manager Hr — Hr Staff Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_hr/staff_directory/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Forbidden Patterns for `frontend_manager/manager_hr`

To maintain extreme isolation and enterprise-grade architecture in the Manager HR module, the following patterns are strictly forbidden:

## 1. UI vs State Authority
- **No Local Fallbacks for Filters:** Search, pagination, role, and month filters MUST be synced to the URL via `useManagerStaffPayrollAndAttendanceLogic`. Do not keep primary list states strictly in React state without URL mirroring.
- **No Global Shared Mutations:** HR staff and payroll mutations belong in `useManagerStaffPayrollAndAttendanceStaffMutations.ts` and `useManagerStaffPayrollAndAttendancePayrollMutations.ts`. Do not place them in global API files.

## 2. Component Boundaries
- **Component File Limits:** Do not combine `ManagerStaffPayrollAndAttendanceStaffModal`, `ManagerStaffPayrollAndAttendancePayrollModal`, and `ManagerStaffPayrollAndAttendancePaymentModal` into one giant file. They must remain isolated in their respective folders.
- **Dumb Presentation Tables:** `ManagerStaffPayrollAndAttendanceStaffTable`, `ManagerStaffPayrollAndAttendancePayrollTable`, and `ManagerStaffPayrollAndAttendanceLedgerTable` must remain dumb presentation components. They dispatch events to Context but do not contain heavy business logic or local data fetching.

## 3. Theming & Formatting
- **No Arbitrary Classes:** Raw Tailwind values (e.g., `text-[#FF0000]`, `bg-[var(--danger)]`) are strictly prohibited. You MUST use semantic tokens defined in `hr_theme_contract.md` (e.g., `text-danger`, `bg-warning`).
- **No Inline Currency Formatting:** Never use `.toLocaleString()` or string concatenations for currency (`₹${value}`). All monetary values MUST pass through `formatCurrencyFromMinorUnits()` from `the module-local `ManagerStaffPayrollAndAttendanceFormatters.ts` in `manager_hr_utils/``.

## 4. Destructive Actions
- **No Direct `window.confirm`:** Changing a staff's status (suspension/firing) or deleting records must use the centralized `useConfirm()` hook.
- **Dirty Form Guards:** Modals with complex unsaved forms must employ `useUnsavedChangesGuard` to prevent accidental navigation data loss.

## 5. Type Safety
- **No `any` or Type Discarding:** All mutations and queries must have typed inputs and outputs. `unknown` is preferred over `any` when dynamic responses are unavoidable.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.

## V28 cross-workflow prohibitions (RBG-35–RBG-50)

Do not add payroll or attendance history methods to staff directory.
