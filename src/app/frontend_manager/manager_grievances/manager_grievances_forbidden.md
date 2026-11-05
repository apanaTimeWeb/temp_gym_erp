# Grievances — Forbidden Architecture

- Do not place executable business source directly in the domain root; only shell/route boundaries and the documentation trio belong here.
- Do not import from a sibling submodule's business source, APIs, state, mocks, schemas or tests.
- Do not nest a feature submodule inside another feature submodule.
- Do not create nano-modules for cards, badges, single components or CRUD actions.
- A >25-file leaf with multiple distinct operational workflows must be decomposed into direct-child sibling submodules; cohesive workflows are not split by file count alone.
