# Admin Frontend — Role Feature Index (v47)


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Canonical physical hierarchy

The 13 business domains are `admin_dashboard/`, `admin_members/`, `admin_attendance/`, `admin_sales/`, `admin_billing/`, `admin_finance/`, `admin_hr/`, `admin_gyms/`, `admin_communication/`, `admin_security/`, `admin_reports/`, `admin_data_export/`, and `admin_settings/`. The physical domain map and all 43 canonical business leaf routes are enumerated in `MODULE_MAP.md`. The header-linked `admin_profile/profile_overview` leaf is tracked separately, for 44 leaf routes total; `admin_navigation/` is role-shell infrastructure, not a business domain.

Each domain root is limited to its shell/redirect, domain documentation trio, and terminal autonomous leaf directories. Each autonomous leaf contains its full implementation, URL configuration, types, schemas, mocks, locale resources, tests, harness, host stubs and documentation trio. Business code remains isolated in leaf modules; `admin_navigation/` remains free of feature business state/API clients.

## Canonical ownership rules

- **Members:** member directory and blacklist management.
- **Attendance:** attendance workflow.
- **Sales:** sales overview, memberships, store sales, membership reporting and pending Sales payments.
- **Billing:** product plans, coupons, customer subscription overview/plans/invoices/payment methods and usage analytics.
- **Finance:** payments, expenses, finance summary/payouts, branch P&L, plan-revenue analytics, payroll, salary advances, staff dues, financial ledger and finance-specific P&L/revenue/payroll reports.
- **HR:** staff lifecycle and performance. Finance remains the source of truth for payroll/disbursement, salary advances, staff dues and financial ledger.
- **Gyms:** branch directory and gym health-alert monitoring.
- **Communication:** notices/announcements, WhatsApp campaigns and notifications only.
- **Security:** permissions and audit-log exploration.
- **Reports:** read-only cross-domain report catalog only. Attendance reports remain Attendance-owned, both Sales membership reports remain Sales-owned, and Finance-specific reports remain Finance-owned.
- **Data Export / Settings:** retain independent system workflows.
- **Profile:** remains a header-linked workflow outside primary sidebar navigation.
- **Navigation:** owns the role shell, not business domain logic.

## Isolation and compatibility

- Frontend navigation must use the canonical route declared by the owning leaf URL configuration. Former frontend aliases and catch-all dispatchers are not supported; domain-root redirects are retained only where the supplied architecture requires a default-leaf redirect.
- Each autonomous leaf owns its business components, API clients, state, schemas, mocks, tests, locales, host stubs, and documentation trio. The role shell owns navigation only.
- Backend endpoint literals and request/response contracts must not be changed without authoritative contract evidence.

## Verification boundary

This archive supports static source and path verification only. Root package scripts, installed dependencies, authenticated browser state, live backend contracts, and host route rewrites are not supplied; build, integrated typecheck, tests, E2E, and runtime behavior remain deferred to the host checkout.

Static architecture and source verification are maintained in archive-level `audit_evidence/`. Host-dependent typecheck/build/lint/test/E2E/browser/accessibility checks are not claimed as passing without execution against the host application.
