# Admin Navigation — Forbidden Patterns

- Do not put feature business data, API clients, domain hooks, stores, or schemas in this module.
- Do not import business components/stores/hooks from sibling feature modules; only typed route contracts are allowed.
- Do not hardcode feature URL strings when a feature URL contract exists.
- Do not add re-export barrel files.
- Do not make navigation actions inaccessible to keyboard or touch users.
- Do not flatten the seven logical navigation groups into one undifferentiated link list.
- Do not change the seven logical group names, group keys, labels, order, destination membership, or the separate header-profile flow without an explicit hierarchy revision. These groups must not become filesystem wrappers.
- Do not treat the header profile or role-shell infrastructure modules as sidebar business destinations.
- Do not remove group headings, semantic group labels, tokenized separators, collapsed-state group context, or grouping regression assertions.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
