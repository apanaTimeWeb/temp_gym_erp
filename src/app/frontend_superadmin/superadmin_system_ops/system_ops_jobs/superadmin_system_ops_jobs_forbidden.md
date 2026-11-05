# Superadmin System Ops Jobs — Forbidden Patterns

- Do not change job API routes, payloads, response models, query keys, mutation behavior, permissions or retry/cancel/delete semantics during grouping work.
- Do not remove the inspect modal, status/statistics bars, filters, table, empty state or any existing job action.
- Do not invent job status fields, worker behavior, scheduler contracts or host rewrites.
- Do not import sibling-submodule business code or create shared System Ops business buckets.
- Do not move API/hooks/types/constants/mocks into the parent domain or a sibling leaf; keep this capability self-contained.
- Do not introduce hardcoded colors, inline styles, untranslated labels or inaccessible controls.
