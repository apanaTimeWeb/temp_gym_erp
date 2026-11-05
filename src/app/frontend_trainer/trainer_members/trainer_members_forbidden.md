# Forbidden Patterns — `trainer/members`

1. Do not place Members business behavior in role-wide shared business folders.
2. TanStack Query owns member server data; Zustand owns UI-only shared state.
3. Never hardcode Members URLs outside `trainer_members_url_config.ts`.
4. Member messaging UI belongs to the Members feature; do not move member-aware messaging into generic Trainer shared folders.
5. Add Note must complete the mutation flow and update the visible member state through the query cache/mock state.
6. Keep demo member records and mutation responses in `trainer_members_mocks/trainer_members_fixtures/` / `trainer_members_mocks/`.
7. Use Zod at the API boundary and named module types for domain unions.
8. Use semantic theme tokens and accessible modal/form behavior.
9. Do not introduce cross-feature business imports to avoid duplication.
10. Do not modify unrelated sibling modules to repair Members.


## URL / Record Identity Invariants (RBG 4)

- MUST NOT use Zustand-only state as the sole source of truth for selected member identity or active profile view.
- MUST preserve the public `/trainer/members` route and encode profile state as `?view=<allowlisted-profile-tab>&id=<recordId>`.
- MUST preserve unrelated filter, search, pagination, and sort query parameters while opening a member, changing profile tabs, or returning to the list.
- MUST keep the record ID in every profile-tab URL and MUST NOT render a returned member record if its ID differs from the route ID.
- MUST NOT remove or stub any of the eight existing profile panels.
- MUST accept legacy `tab` URLs as migration input, but MUST normalize to canonical `view` and remove the legacy parameter.
