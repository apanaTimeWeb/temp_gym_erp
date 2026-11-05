> **Archived legacy contract — not an active source of truth.**
> This file is retained for audit traceability after the duplicate `manager_dashboard/manager_shell` tree was retired. The canonical Manager infrastructure contract is maintained in `manager_infrastructure/docs/`. Do not use this archived copy to implement current behavior.

---

# Manager Shell — Forbidden Patterns

- No business APIs, query keys, business state, domain-specific mocks, or workflow logic.
- No leaf feature imports into shell internals; use canonical role contracts.
- No competing route registry or hard-coded feature URL when a canonical route config exists.
- No unlabeled controls, raw colors, direct fetch, or browser alert/confirm.
- No hidden failure swallowing or unauthorized provider bootstrap.
