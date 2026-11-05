# Infrastructure boundaries
- No imports from `system_ops_overview`, `system_ops_jobs`, `system_ops_backups`, or `system_ops_migrations`.
- No shared parent business components/hooks/stores. Use strict local WET copies.
- Do not guess backend contracts or change tenant-ID security.
- No nested feature submodules, nano-modules, or direct browser alerts.
- No mutations without existing idempotency and confirmation behavior.
