# Admin Communication — Forbidden Patterns

- FORBIDDEN: Communication leaf features as top-level sidebar items.
- FORBIDDEN: sibling-leaf imports, `common/` or `shared/` business folders, duplicated implementations, or sub-submodules.
- FORBIDDEN: inventing WhatsApp send/delivery endpoints, provider credentials, webhooks, or contracts not present in the source.
- FORBIDDEN: changing API endpoint strings, HTTP verbs, payload/response schemas, permissions, query keys, or mutation idempotency behavior as part of route migration.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
