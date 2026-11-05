# Manager Infrastructure — Forbidden Patterns

- No business API client, query key, business schema, feature store, or domain workflow.
- No sibling feature business imports, direct fetch/axios, raw browser alert/confirm, raw colors, or non-semantic Tailwind palette classes.
- No feature-specific locale copy or business validation.
- No mutable mock state without explicit test-only ownership and reset behavior.
- No barrel/index re-export files or broad catch-and-suppress error handling.
- No weakening of auth, tenant boundaries, permission checks, or idempotency semantics.
- No unsupported runtime/build success claims.
