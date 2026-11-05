# Admin Data Export — Forbidden Patterns

1. Do not invent export API endpoints or payload fields.
2. Do not expose a visible export button that has no documented behavior.
3. Do not place fake export-job records in production UI components.
4. Do not treat a toast or local visual state as proof of an export mutation.
5. Do not bypass the module API/MSW contract once the missing contract is supplied.
6. Keep CSV/Excel/PDF support tied to the supplied export contract rather than guessing implementation details.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
