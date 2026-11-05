# Forbidden Patterns — `system_ops_overview`

- Do not move backup, job, infrastructure or migration mutation behavior into Overview.
- Do not invent summary response fields, endpoints, permission rules or status values.
- Do not import business implementation from sibling System Ops leaves.
- Do not add barrel files, route groups, arbitrary/shared dumping folders, or client-side persistence of server business data.
- Do not alter the stable summary query-key value, `ApiResponse` envelope, or retry semantics without a verified contract.
- Do not use raw colors, inline styling, semantic-background opacity modifiers, inaccessible controls, or motion without reduced-motion support.
