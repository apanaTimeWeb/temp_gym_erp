# Admin Sales — Canonical Domain Contract (v47 clean-break)


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Own sales, membership transaction, referral overview and store-sales workflows. `page.tsx` redirects to `sales_overview`.

## Autonomous submodules
`sales_overview/`, `sales_membership_report/`, `sales_memberships/`, `sales_store_sales/`, and `sales_pending_payments/`.
- `sales_membership_growth_report` — membership growth reporting leaf linked by the Sales layout.

## Boundaries
- The domain layout provides secondary navigation only; each of the six listed Sales leaves owns its own page, URL config, API boundary, query/state logic, locale catalog, and tests.
- `sales_membership_growth_report/` is an autonomous Sales-owned reporting leaf, as confirmed by the Sales layout navigation entry.
- `sales_pending_payments/` remains Sales-owned; it is not a Finance submodule.
- The Reports cross-domain catalog is a read-only index and does not transfer ownership of Sales report data or workflows.
- This source package does not establish backend endpoint semantics beyond each leaf's local API/URL configuration; no backend contract is implied by domain ownership.

## Final domain ownership
Sales owns sales overview, memberships, store sales, membership reporting, and `sales_pending_payments/`. Pending Sales payments are not a Finance submodule.
