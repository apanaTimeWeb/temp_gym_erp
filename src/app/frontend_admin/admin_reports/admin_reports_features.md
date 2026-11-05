# Admin Reports — Domain Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Own the cross-domain report catalog only. A report workflow belongs to the business domain that owns its lifecycle and entity context.

## Owned submodule
- `reports_cross_domain_overview/`: index of report destinations in Attendance, Sales, and Finance.

## Explicit exclusions
- Attendance report data, filters, exports, and API contracts belong to `admin_attendance/attendance_reports/`.
- Membership-growth and Sales membership reports belong to `admin_sales/`.
- P&L, revenue, and payroll reports belong to `admin_finance/`.
- Do not import or duplicate these business modules; catalog entries are plain internal route links.
