# Trainer Dashboard Overview — Forbidden Patterns

1. Never import sibling business domains or sibling submodules; zero business cross-import policy.
2. Never add financial/earnings/payout/salary data to dashboard overview.
3. Never change the `/trainer/dashboard` route, `range`, `startDate` or `endDate` contract without contract evidence and a backwards-compatible transition.
4. Never use raw browser alerts, raw feature-local `fetch`/Axios, business data in localStorage, invented backend fields, or cross-tenant access.
5. Never delete incompletely implemented existing cards, loading skeletons, empty states or behavior tests to force a clean audit.
6. Never create a nested feature submodule or nano-module for a utility, button, KPI, chart or modal.
7. During RBG 1 migration, domain-root legacy code is a tracked unresolved P0 defect, **not** a valid long-term import boundary.

- Do not replace module-local confirmation/realtime context hooks with hooks from `trainer_infrastructure`; matching provider context is required to preserve the dialog and live-event flows.
