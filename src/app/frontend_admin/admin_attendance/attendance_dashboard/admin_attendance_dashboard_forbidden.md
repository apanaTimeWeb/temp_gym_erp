# Forbidden Patterns — Admin Attendance Module

Future AI sessions: read this file before touching ANY file in `admin/attendance/`.

1. **NEVER add a check-in button, QR scanner, or any write operation here.** This module is strictly read-only for the Admin role. Manual check-in belongs exclusively in `/manager/attendance`. Adding any mutation here violates the role permission contract and will break the permissions model.

2. **NEVER import from `/manager`, `/trainer`, or `/superadmin`.** Zero cross-role imports. This module must be 100% self-contained.

3. **NEVER use raw hex/RGB/RGBA chart colors inside ApexCharts options.** Chart colors must come from the approved Admin chart-theme adapter, which resolves the semantic chart tokens documented by `WEB_FRONTEND_UI_UX_DESIGN.md`. Do not introduce hardcoded palette values in the feature.

4. **NEVER use bare `animate-pulse` on skeleton elements.** Always use `motion-safe:animate-pulse` per Design §29 and Frontend Rule 29.

5. **NEVER calculate duration from a null `checkOutTime`.** The `computeDuration` utility in `AdminAttendanceDashboardConstants.ts` already handles this — it returns `'—'` when either value is missing. Do not inline duration logic in the table component.

6. **NEVER add a "View Member Profile" navigation from this table.** Admin attendance is a read-only analytics view. Member profile navigation belongs in `/admin/members`. Do not add `cursor-pointer` row clicks that navigate to member profiles from here.

7. **NEVER hardcode API endpoint strings in `admin_attendance_dashboard_api.ts`.** When replacing mock functions with real `apiFetch` calls, import endpoint strings from `config/admin_attendance_dashboard.url_config.ts`.

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
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
