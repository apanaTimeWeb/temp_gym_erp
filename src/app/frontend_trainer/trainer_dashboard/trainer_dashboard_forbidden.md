# Forbidden Patterns — Trainer Dashboard

1. Dashboard API/server responses must remain TanStack Query server state; do not move them into Context or Zustand.
2. Do not add financial/revenue/salary/commission/payout/TDS fields, endpoints, fixtures, KPIs, or labels to Dashboard.
3. Do not hardcode Dashboard API/page URLs outside `trainer_dashboard_url_config.ts`.
4. Do not place Dashboard business components in role-level shared UI folders.
5. Date-range state is shareable URL state; do not recreate it in a second competing store.
6. Do not expose raw API/exception details in Dashboard error UI.
