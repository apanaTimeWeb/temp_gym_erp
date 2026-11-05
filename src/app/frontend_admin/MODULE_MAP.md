> **v51 RBG 2 release note:** The archived references to v47/v50 evidence later in this map describe historical releases. The authoritative current physical evidence is at `audit_evidence/ADMIN_V51_*`; external contract/runtime gaps are tracked in `RE_AUDIT_CHECKLIST_RESULT.md`.

# Admin Frontend — Canonical Module Map (v47, post-RBG source audit)

## Authoritative hierarchy

`frontend_admin/` is the single Admin role container. The 13 primary business domains below each map one-to-one to a top-level sidebar destination. `admin_profile/` is the separate header-linked profile workflow. `admin_navigation/` is the technical role-owned shell, not a business domain.

Every business leaf is terminal at one level below its domain. Forms, edit drawers, wizards and modals stay within the owning leaf; sub-submodules are not used. Each leaf remains isolated and has its own required documentation trio, URL config, host stubs, standalone harness, tests, mocks, locale files and contracts.

## Primary business domains and canonical leaf routes

### `admin_dashboard/` — Overview

Admin dashboard and role landing.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `dashboard_overview/` | `/frontend_admin/admin_dashboard/dashboard_overview` | Admin landing/dashboard workflow |

### `admin_members/` — Members

Member directory and blacklist management.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `members_directory/` | `/frontend_admin/admin_members/members_directory` | Member lifecycle and directory |
| `members_blacklist_management/` | `/frontend_admin/admin_members/members_blacklist_management` | Blacklist administration |

### `admin_attendance/` — Attendance

Attendance workflows and attendance dashboard.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `attendance_dashboard/` | `/frontend_admin/admin_attendance/attendance_dashboard` | Attendance overview and operational attendance workflow |
| `attendance_reports/` | `/frontend_admin/admin_attendance/attendance_reports` | Attendance reporting, date filters, and exports; backend report endpoints are preserved |

### `admin_sales/` — Sales

Sales overview, memberships, store sales, membership reporting, and pending Sales payments.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `sales_overview/` | `/frontend_admin/admin_sales/sales_overview` | Sales overview and referral workflow |
| `sales_memberships/` | `/frontend_admin/admin_sales/sales_memberships` | Sales membership listing and counts |
| `sales_store_sales/` | `/frontend_admin/admin_sales/sales_store_sales` | Retail/store orders and sales |
| `sales_membership_report/` | `/frontend_admin/admin_sales/sales_membership_report` | Sales-owned membership reporting |
| `sales_membership_growth_report/` | `/frontend_admin/admin_sales/sales_membership_growth_report` | Membership-growth reporting, retaining its source-defined `/admin/reports/members` API literal under Sales ownership |
| `sales_pending_payments/` | `/frontend_admin/admin_sales/sales_pending_payments` | Sales-owned pending payment workflow |

### `admin_billing/` — Billing

Plans catalog, coupons, customer subscriptions, invoices, payment methods, and usage analytics.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `billing_plans_catalog/` | `/frontend_admin/admin_billing/billing_plans_catalog` | Customer plan catalog and plan lifecycle |
| `billing_coupons_management/` | `/frontend_admin/admin_billing/billing_coupons_management` | Coupon lifecycle and management |
| `billing_subscriptions_overview/` | `/frontend_admin/admin_billing/billing_subscriptions_overview` | Customer subscription overview and lifecycle |
| `billing_subscription_plans/` | `/frontend_admin/admin_billing/billing_subscription_plans` | Subscription plan administration |
| `billing_subscription_invoices/` | `/frontend_admin/admin_billing/billing_subscription_invoices` | Customer subscription invoices |
| `billing_subscription_payment_methods/` | `/frontend_admin/admin_billing/billing_subscription_payment_methods` | Customer subscription payment methods |
| `billing_usage_analytics/` | `/frontend_admin/admin_billing/billing_usage_analytics` | Customer subscription usage analytics |

### `admin_finance/` — Finance

Finance transactions, payouts, branch P&L, plan-revenue analytics, payroll, salary advances, staff dues, staff ledger, and finance-specific reports.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `finance_payments/` | `/frontend_admin/admin_finance/finance_payments` | Finance payments and financial transaction workflow |
| `finance_expenses/` | `/frontend_admin/admin_finance/finance_expenses` | Expense tracking |
| `finance_summary/` | `/frontend_admin/admin_finance/finance_summary` | Finance summary |
| `finance_payouts_management/` | `/frontend_admin/admin_finance/finance_payouts_management` | Payout workflow and reporting |
| `finance_branch_profit_and_loss/` | `/frontend_admin/admin_finance/finance_branch_profit_and_loss` | Branch profit and loss analysis |
| `finance_plan_revenue_analytics/` | `/frontend_admin/admin_finance/finance_plan_revenue_analytics` | Plan revenue analytics |
| `finance_payroll_management/` | `/frontend_admin/admin_finance/finance_payroll_management` | Finance-owned payroll/disbursement |
| `finance_salary_advance_management/` | `/frontend_admin/admin_finance/finance_salary_advance_management` | Staff salary advances |
| `finance_staff_dues_management/` | `/frontend_admin/admin_finance/finance_staff_dues_management` | Staff dues and reconciliation |
| `finance_staff_ledger_management/` | `/frontend_admin/admin_finance/finance_staff_ledger_management` | Staff financial ledger |
| `finance_profit_and_loss_report/` | `/frontend_admin/admin_finance/finance_profit_and_loss_report` | Finance profit and loss report |
| `finance_revenue_report/` | `/frontend_admin/admin_finance/finance_revenue_report` | Finance revenue report |
| `finance_payroll_report/` | `/frontend_admin/admin_finance/finance_payroll_report` | Finance payroll report |

### `admin_hr/` — People

Staff lifecycle and staff performance; financial payroll, advances, dues and ledger remain Finance-owned.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `hr_staff_management/` | `/frontend_admin/admin_hr/hr_staff_management` | Staff administration and lifecycle |
| `hr_performance_analytics/` | `/frontend_admin/admin_hr/hr_performance_analytics` | Staff performance analytics |

### `admin_gyms/` — Gyms & Branch Operations

Gym and branch directory plus gym health-alert monitoring.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `gyms_branches_directory/` | `/frontend_admin/admin_gyms/gyms_branches_directory` | Gym and branch directory |
| `gyms_health_alerts_monitoring/` | `/frontend_admin/admin_gyms/gyms_health_alerts_monitoring` | Gym health alert monitoring |

### `admin_communication/` — Communication

Notices, announcements, WhatsApp campaigns and notifications only.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `communication_notices_and_announcements/` | `/frontend_admin/admin_communication/communication_notices_and_announcements` | Notices and announcements |
| `communication_whatsapp_campaigns/` | `/frontend_admin/admin_communication/communication_whatsapp_campaigns` | WhatsApp campaign workflows |
| `communication_notifications_center/` | `/frontend_admin/admin_communication/communication_notifications_center` | Notification inbox and read-state workflows |

### `admin_security/` — Security & Access Governance

Permissions management and audit-log exploration.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `security_permissions_management/` | `/frontend_admin/admin_security/security_permissions_management` | Security permissions and access management |
| `security_audit_logs_explorer/` | `/frontend_admin/admin_security/security_audit_logs_explorer` | Admin audit-log exploration |

### `admin_reports/` — Reports & Insights

This domain owns only the cross-domain report catalog. Business report workflows remain in their owning contexts: Attendance reports under Attendance, membership reports under Sales, and P&L/revenue/payroll reports under Finance.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `reports_cross_domain_overview/` | `/frontend_admin/admin_reports/reports_cross_domain_overview` | Catalog linking to reports in Attendance, Sales, and Finance without duplicating business state or API calls |

### `admin_data_export/` — System

Admin data-export request workflow. External backend contract remains unverified in this isolated package.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `data_export_requests/` | `/frontend_admin/admin_data_export/data_export_requests` | Data export requests |

### `admin_settings/` — System

System configuration and admin settings. Dedicated 2FA lifecycle remains contract-gated.

| Autonomous leaf | Canonical route | Responsibility |
|---|---|---|
| `settings_management/` | `/frontend_admin/admin_settings/settings_management` | System settings workspace |

## Special-purpose role areas

| Area | Canonical entry | Responsibility |
|---|---|---|
| `admin_profile/` | `/frontend_admin/admin_profile/profile_overview` | Header-linked profile workflow; not a sidebar domain. |
| `admin_navigation/` | Role shell | Sidebar/header, route-header map, keyboard/search accessibility, localization shell, confirmation/toast services, WebSocket provider and shell utilities. No business feature API/state. |

## Final ownership rules

- **Communication:** notices/announcements, WhatsApp campaigns and notifications only. No Finance, Billing, HR or system-settings features.
- **Finance:** payments, expenses, summary, payouts, branch P&L, plan revenue, payroll, salary advances, staff dues, financial ledger and finance-specific reports. Subscription invoices/payment methods are Billing-owned; pending Sales payments are Sales-owned.
- **Billing:** plans catalog, coupons, subscriptions overview/plans/invoices/payment methods and usage analytics.
- **Members:** member directory and blacklist management.
- **Gyms:** branch directory and gym health alerts.
- **Security:** permissions and audit-log exploration.
- **HR:** staff lifecycle and performance; it must not duplicate Finance as the source of truth for payroll, advances, dues or staff financial ledgers.
- **Reports:** cross-domain report catalog only. Attendance reports stay in Attendance, membership reporting stays in Sales, and P&L/revenue/payroll reports stay in Finance.

## Clean-break routing

Only the canonical leaf routes and domain roots in this map are supported. The five catch-all frontend dispatchers, runtime alias registries, redirect compatibility tests, and retired parallel route roots are removed. Former frontend paths intentionally do not redirect. Domain-root `page.tsx` files retain their architecture-required default redirect to the owning domain's first canonical leaf. The only artifact listing former frontend paths is `audit_evidence/ADMIN_V47_ROUTE_REPLACEMENT_MATRIX.csv`, retained for migration planning—not runtime resolution.

## Contract and integration invariants

- Atomic leaf relocation preserves existing internal behavior and all feature artifacts.
- Backend API endpoint strings, HTTP methods, request/response types, Zod schemas, permissions, query keys, tenant/auth context and idempotency behavior are not altered by route relocation.
- Data Export and dedicated 2FA lifecycle behavior remain contract-gated where the source lacks external business specifications.
- Host runtime, live API and integrated build/test execution are not supplied in this ZIP. Their verification must be separately recorded as `DEFERRED_TO_HOST_RUNTIME` / `NOT_VERIFIED_IN_SCOPE` rather than fabricated.

## Audit evidence

Current release evidence is generated from the delivered tree under `audit_evidence/`: route replacement matrix, API URL preservation, route/domain ownership ledger, physical leaf ledger, RBG closure ledger, canonical rules sweep, findings resolution, deletion ledger, and source file manifest. Superseded V44/V45/V46 reports and retired-domain document copies are excluded.

## Business-domain ownership correction (v47 clean-break)

- `admin_attendance/attendance_dashboard/` and `admin_attendance/attendance_reports/` own all Attendance workflows and Attendance reporting.
- `admin_sales/sales_membership_report/` and `admin_sales/sales_membership_growth_report/` own Sales membership reporting; `sales_pending_payments/` stays with Sales.
- `admin_finance/finance_revenue_report/`, `finance_profit_and_loss_report/`, and `finance_payroll_report/` own the corresponding Finance reporting workflows. Their clients, schemas, query hooks, and fixtures are scoped to the single report endpoint of that leaf.
- `admin_billing/` owns subscription invoices and customer subscription payment methods.
- `admin_reports/reports_cross_domain_overview/` is a read-only cross-domain catalog only. It must not own domain-specific report data, API clients, query state, or mutation flows.
- The `Members & Operations` and `Billing & Finance` sidebar headings are visual groupings only; they do not merge domain ownership.
