# Trainer operations_weekly_availability — Forbidden Patterns

- No imports from sibling business submodules (strict WET).
- Do not fabricate API endpoints, roles, permissions, fields, statuses or passed tests.
- Do not remove or disable legacy trainer workflows to satisfy a check.
- No native window.alert/window.confirm for destructive actions; use accessible confirm dialog.
- No domain-root business artifacts, child feature-submodules or barrels.
- No hardcoded theme colors, arbitrary CSS tokens, PII secrets, or persisted business entities.
- Only verified external host contracts; missing host runtime checks must be separately reported.

- Do not replace module-local confirmation/realtime context hooks with hooks from `trainer_infrastructure`; matching provider context is required to preserve the dialog and live-event flows.
