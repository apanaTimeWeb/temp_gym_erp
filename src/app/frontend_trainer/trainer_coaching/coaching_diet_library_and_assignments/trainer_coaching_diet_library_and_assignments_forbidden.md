# Diet Library and Assignments — Forbidden / Integrity Contract

- No business imports from any sibling `trainer_coaching/*/` module.
- No invented API endpoints, fields, success states, permissions or tenant claims.
- No removals of the original `trainer_library` workflows or legacy `/trainer/library` route.
- No raw `window.alert` / `window.confirm`, fake CTA handlers, token hardcoding or PII/localStorage persistence.
- No child submodule, role-wide `common/` business bucket, barrel `index.ts`, or `any` shortcuts.
- No claimed integration/typecheck/browser pass before execution evidence.

- Do not replace module-local confirmation/realtime context hooks with hooks from `trainer_infrastructure`; matching provider context is required to preserve the dialog and live-event flows.
