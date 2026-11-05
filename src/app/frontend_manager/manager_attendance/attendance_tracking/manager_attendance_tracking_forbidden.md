# Manager Attendance — Attendance Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_attendance/attendance_tracking/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Forbidden Patterns for `frontend_manager/manager_attendance`

To maintain enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix data fetching logic inside UI components. All async logic MUST reside in `useManagerAttendanceTrackingLogic.ts` via TanStack Query.
2. **No Relative Imports:** Never use `./` or `../`. Always use absolute paths starting with `@/app/frontend_manager/manager_attendance/...`.
3. **No Direct Formatting:** Do NOT use `.toLocaleString()`, `.toFixed()`, or string concatenation for currencies. All numeric formatting MUST go through `the module-local `ManagerAttendanceTrackingFormatters.ts` in `manager_attendance_utils/``.
4. **No Client-Side Server Data Filtering:** Do not sort/filter/paginate fetched attendance records in the hook or JSX when the API/MSW contract supports those parameters.
5. **No Context for Async Cache:** Do not store API responses manually in React Context state. Let TanStack Query manage the cache, and keep documented URL-backed data-view state in the URL. React Context is reserved for stable cross-tree application concerns.
6. **No Local State for Filters:** The search, date, and status filters MUST sync to the URL. Do not keep them only in `useState` or `Zustand`.
7. **No Arbitrary Colors:** Do not use `bg-green-500`, `text-[var(--primary)]`, or raw hex codes in JSX. Follow `attendance_theme_contract.md`.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
