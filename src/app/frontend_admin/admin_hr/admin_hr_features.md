# Admin HR — Canonical Domain Contract (v47 clean-break)


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Own staff administration and staff performance workflows. `page.tsx` redirects to `hr_staff_management`; `layout.tsx` exposes Staff and Performance as secondary navigation.

## Autonomous submodules
- `hr_staff_management/` — staff lifecycle, role and profile administration.
- `hr_performance_analytics/` — staff performance analytics formerly located under the legacy performance root.

## Boundaries

HR owns staff-management and performance-analytics presentation and their leaf-local query/API/UI state. Backend permission enforcement and tenant isolation cannot be established from this frontend-only archive and remain host/backend verification items.

## Final domain ownership
HR owns staff lifecycle and staff performance. Financial payroll/disbursement, salary advances, staff dues, and the financial ledger are owned by `admin_finance/`; HR staff workflows may link to those finance-owned leaves but must not duplicate their financial source of truth.
