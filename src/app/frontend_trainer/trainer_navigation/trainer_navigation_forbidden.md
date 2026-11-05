# trainer_navigation — Forbidden Patterns

- No trainer business API clients, records, mutable business stores, financial/attendance logic or cross-leaf business imports.
- No duplicate legacy route/compatibility folders and no special old `/trainer/...` public pages.
- Do not invent feature URL constants or change backend API endpoints while migrating public page paths.
- Do not store PII/tokens in browser storage, expose secrets or weaken the `trainer.view` role permission guard.
- Do not remove mobile focus trap, skip link, command palette, keyboard navigation or role shell translations.
- Do not mix icon libraries, introduce hardcoded colors, break semantic token use or rely on opacity as a color token.
- No barrel index.ts exports.
