# Public Landing Marketing Experience — Hard Submodule Boundaries

- No import from any sibling submodule, no parent business buckets, no nested sub-submodules, no CRUD-action nano-modules.
- Do not infer backend response fields, credentials, role permissions, tenant IDs, host route rewrites, or external phone/email values.
- Do not remove existing forms, buttons or event handlers to pass static tests. Preserve current user flow: show marketing content, navigation anchors, membership plans, services, transformations, BMI calculator and newsletter mailto.
- Keep status/error, retry/refresh, and offline handling. No localStorage of business PII; no direct browser token exposure.
- Source-specific exception: route entry adapters preserve the original paths but must contain no business implementation.
- Any exceptional dependency must have file/line evidence, documented risk, and review before marking release complete.
