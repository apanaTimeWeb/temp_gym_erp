---
role: admin
module: admin_billing
kind: domain-container
status: active
---

# admin_billing — Domain Features


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Owns product billing, subscription lifecycle and SaaS usage workflows.

## Ownership and navigation
This domain is one of the Admin role's approved 13 primary business destinations. Its autonomous leaves are secondary-navigation destinations and retain their own features, tests, mocks, contracts, URL config, host stubs, standalone harness, and documentation trio.

## Owned autonomous leaves
- `billing_plans_catalog/` — customer plan catalog and lifecycle.
- `billing_coupons_management/` — coupon lifecycle.
- `billing_subscriptions_overview/` — customer subscription overview.
- `billing_subscription_plans/` — subscription plan administration.
- `billing_subscription_invoices/` — customer subscription invoices.
- `billing_subscription_payment_methods/` — subscription payment methods.
- `billing_usage_analytics/` — customer plan usage analytics.

## Boundaries
- Keep business behavior inside the owning autonomous leaf; this domain shell only redirects and presents secondary navigation.
- Do not move business APIs, stores, schemas, fixtures, or components into the shell or a global shared folder.
- Do not invent endpoint or response contracts; treat verified leaf contracts as authoritative.
- Canonical code and route ownership is governed by `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`.
