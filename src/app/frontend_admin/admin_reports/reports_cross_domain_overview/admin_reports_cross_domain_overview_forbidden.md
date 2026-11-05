# Admin Reports Cross-Domain Overview — Forbidden Patterns

- Do not move Attendance, Sales, or Finance business logic into this leaf.
- Do not call backend APIs or duplicate business data/state here.
- Do not import sibling business leaf implementations; use canonical route strings only.
- Do not invent endpoints, permission rules, report data, or response shapes.
- Do not persist business entities in browser storage.
- Do not remove a report destination without updating the canonical owner and catalog evidence.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
