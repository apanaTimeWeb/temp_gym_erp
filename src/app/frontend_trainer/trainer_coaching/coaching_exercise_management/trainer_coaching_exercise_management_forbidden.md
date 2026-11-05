# Trainer Coaching — Exercise Management — Forbidden Boundaries

- NEVER import another autonomous business submodule, particularly siblings under `trainer_coaching`.
- NEVER invent backend paths, query response fields, roles or tenant IDs. Only documented supplied source contracts apply.
- NEVER use business entities or private notes in localStorage; never expose secrets, PII or console logs.
- NEVER delete half-built features to pass typechecks or remove legacy user journeys without verified route parity.
- NEVER add barrel files, shared business primitives, unvalidated mutation payloads or browser alert()/confirm().
- NEVER declare the module PASS without physical tests and evidence; host runtime absence is DEFERRED_TO_HOST_RUNTIME.
- NEVER split a cohesive workflow solely due to file count; the five-gate matrix and distinct workflow evidence apply.

Status: SOURCE_FIX_STAGED_RBG_16_20. Core infrastructure exceptions are disclosed in features §19; no unverified integration is certified.

- Do not replace module-local confirmation/realtime context hooks with hooks from `trainer_infrastructure`; matching provider context is required to preserve the dialog and live-event flows.
