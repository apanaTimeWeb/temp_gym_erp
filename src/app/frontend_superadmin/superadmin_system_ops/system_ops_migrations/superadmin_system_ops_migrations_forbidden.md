# System Ops Migrations — Forbidden Patterns

- No parent-level business implementation in `superadmin_system_ops/`.
- No imports from sibling System Ops capability leaves.
- No invented endpoints, queues, status fields, or rollback semantics.
- No direct fetch/axios, secret exposure, localStorage business data, or bypassed idempotency.
- No deleting existing UI flows, tests, mocks, or retry/error states.
- No sub-submodules or barrel files.
