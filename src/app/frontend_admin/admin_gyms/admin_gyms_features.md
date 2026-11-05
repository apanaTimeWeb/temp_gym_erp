---
role: admin
module: admin_gyms
kind: domain-container
status: active
---

# admin_gyms — Domain Features


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Owns gym and branch directory operations and gym health monitoring.

## Ownership and navigation
This domain is one of the Admin role's approved 13 primary business destinations. Its autonomous leaves are secondary-navigation destinations and retain their own features, tests, mocks, contracts, URL config, host stubs, standalone harness, and documentation trio.

## Owned autonomous leaves
- `gyms_branches_directory/` — branch directory and operations.
- `gyms_health_alerts_monitoring/` — gym health alerts and monitoring.

## Boundaries
- Keep business behavior inside the owning autonomous leaf; this domain shell only redirects and presents secondary navigation.
- Do not move business APIs, stores, schemas, fixtures, or components into the shell or a global shared folder.
- Do not invent endpoint or response contracts; treat verified leaf contracts as authoritative.
- Canonical code and route ownership is governed by `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`.
