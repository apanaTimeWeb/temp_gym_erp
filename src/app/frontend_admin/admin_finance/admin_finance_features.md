# Admin Finance — Canonical Domain Contract (v47 clean-break)


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Own all dedicated finance operations and finance-specific reporting. `admin_finance/page.tsx` redirects to `finance_payments`; `layout.tsx` exposes the child capabilities as secondary navigation, including responsive, accessible grouped navigation.

## Autonomous submodules
`finance_payments`, `finance_expenses`, `finance_summary`, `finance_payouts_management`, `finance_branch_profit_and_loss`, `finance_plan_revenue_analytics`, `finance_payroll_management`, `finance_salary_advance_management`, `finance_staff_dues_management`, `finance_staff_ledger_management`, `finance_profit_and_loss_report`, `finance_revenue_report`, and `finance_payroll_report`.

## Boundaries
- Each child owns its own API, state, UI, schemas, mocks, tests, locales, harness, and theme contract.
- Finance tab grouping is navigation-only and does not create additional directories.
- Preserve API endpoint strings, HTTP verbs, payloads, response contracts, permission guards, query keys, idempotency headers and mock matchers.
- Do not move Sales referral/product lifecycle or Subscription plan lifecycle solely because those screens display money values.

## Final domain ownership
Finance owns financial payments, expenses, summary, payouts, branch P&L, plan-revenue analytics, payroll, salary advances, staff dues, staff ledger, and finance-specific P&L/revenue/payroll reports. Customer subscription invoices and payment methods are Billing-owned; pending Sales payments are Sales-owned. Do not add the moved Billing/Sales leaves to Finance navigation.
