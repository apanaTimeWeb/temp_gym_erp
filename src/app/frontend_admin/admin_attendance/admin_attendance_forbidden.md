# Forbidden Patterns — Admin Attendance Module

Future AI sessions: read this file before touching ANY file in `admin/attendance/`.

1. **NEVER add a check-in button, QR scanner, or any write operation here.** This module is strictly read-only for the Admin role. Manual check-in belongs exclusively in `/manager/attendance`. Adding any mutation here violates the role permission contract and will break the permissions model.

2. **NEVER import from `/manager`, `/trainer`, or `/superadmin`.** Zero cross-role imports. This module must be 100% self-contained.

3. **NEVER use raw hex/RGB/RGBA chart colors inside ApexCharts options.** Chart colors must come from the approved Admin chart-theme adapter, which resolves the semantic chart tokens documented by `WEB_FRONTEND_UI_UX_DESIGN.md`. Do not introduce hardcoded palette values in the feature.

4. **NEVER use bare `animate-pulse` on skeleton elements.** Always use `motion-safe:animate-pulse` per Design §29 and Frontend Rule 29.

5. **NEVER calculate duration from a null `checkOutTime`.** The `computeDuration` utility in `AdminAttendanceDashboardConstants.ts` already handles this — it returns `'—'` when either value is missing. Do not inline duration logic in the table component.

6. **NEVER add a "View Member Profile" navigation from this table.** Admin attendance is a read-only analytics view. Member profile navigation belongs in `/admin/members`. Do not add `cursor-pointer` row clicks that navigate to member profiles from here.

7. **NEVER hardcode API endpoint strings in `admin_attendance_dashboard_api.ts`.** When replacing mock functions with real `apiFetch` calls, import endpoint strings from `attendance_dashboard/config/admin_attendance_dashboard.url_config.ts`.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
