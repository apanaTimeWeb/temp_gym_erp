# Superadmin System Ops Backups — Forbidden Patterns

- Do not change backup endpoint paths, payload fields, response envelopes, mutation sequencing, retry semantics or permission enforcement as part of grouping work.
- Do not delete or hide any existing schedule, snapshot trigger, restore, download, table or empty-state feature.
- Do not invent new API response fields or bypass the existing view-model/API boundary.
- Do not create sibling-submodule imports or shared business component folders to avoid local ownership.
- Do not replace the canonical leaf, query route or legacy route with an unverified host rewrite.
- Do not introduce hardcoded colors, inline styles, unlocalized labels or inaccessible interaction behavior.
- Do not reintroduce sibling-leaf business imports. API/hooks/schemas/types/mocks/constants must remain local to this leaf.
