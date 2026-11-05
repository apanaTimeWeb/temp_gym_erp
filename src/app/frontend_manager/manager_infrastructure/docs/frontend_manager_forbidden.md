# Manager Role — Forbidden Patterns (v12-fix)

This is the role-level AI safety contract. Read the owning feature's `_features.md`, `_theme_contract.md`, and `_forbidden.md` before changing business code.

1. No sibling business imports.
2. No role-wide business bucket (`manager_components`, shared business stores/hooks/APIs, etc.).
3. No fake server/business data in UI, hooks, stores or context.
4. No server-state ownership in Context or Zustand; TanStack Query owns async server state.
5. No raw theme colors/arbitrary Tailwind semantic colors/undefined theme aliases in JSX.
6. No authenticated ERP gradients outside documented landing-page CTA exceptions.
7. No hardcoded feature/API URLs outside the feature URL config.
8. No hardcoded numeric HTTP statuses in API wrappers.
9. No `any`, `@ts-ignore`, `@ts-nocheck`, or silent unsafe API narrowing.
10. No visual-only controls or silent no-op actions.
11. No toast-only mutation success; visible server-backed state must reconcile/invalidate.
12. No automated bulk WhatsApp sending; preserve the documented manual recipient flow.
13. No destructive action without the approved confirmation UI.
14. No loading behavior that causes destructive button width/label shifts where the design contract requires stability.
15. No blank optional-data rendering where the contract requires `—`; preserve meaningful `0`/`false`.
16. Every repair must end with a changed-file list and must not introduce unexplained sibling/unrelated business changes.
17. Manager role must not expose the top-level tenant full-data export/offboarding workflow. The global architecture reserves that workflow for the authorized top-level role.
18. Do not reintroduce synchronous report/file-blob export behavior into `manager_reports`.
19. Do not leave an enabled file input when the supplied feature contract has no supported upload mutation; use a clearly disabled/read-only state instead of inventing an API.
20. Do not leave stale documentation pointing at moved component paths or removed flows.

## Scope-Safe Infrastructure
Shared/global files may be changed only when they are documented application/role infrastructure, the repair cannot safely be completed within the owning feature, the exact file is named in the repair record, the change introduces no business behavior, and regression impact is rechecked.


## Role-support placement exception
See `ADR-001-manager-role-support-placement.md`. The exception is limited to zero-business role shell plumbing and does not permit sibling business imports or shared business state.
