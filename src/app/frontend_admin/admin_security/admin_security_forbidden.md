# admin_security — Forbidden Patterns

- No business source files at the domain root beyond the approved `layout.tsx`, `page.tsx`, and domain documentation trio.
- No sub-submodules, shared sibling-business folders, barrel files, or action-only leaf modules.
- No direct imports from sibling autonomous leaves. Use strict local isolation and the documented WET boundary.
- No speculative API endpoints, new payload fields, invented aliases, or silent changes to verified contracts.
- No hardcoded color values, inline business styling, or non-semantic Tailwind colors when a design token exists.
- No unlocalized visible strings; use the shell's established `next-intl` keys for shared navigation.
- No claim that host-dependent tests passed unless executed in the host runtime.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
