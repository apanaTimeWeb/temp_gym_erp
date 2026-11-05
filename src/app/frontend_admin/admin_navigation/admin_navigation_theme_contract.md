# Admin Navigation — Theme Contract

Consumes the global Smart Gym 360 semantic tokens for page/card/header/sidebar surfaces, text hierarchy, borders, primary active state, and focus rings. Use semantic Tailwind classes (for example `bg-sidebar`, `bg-header`, `text-primary`, `text-secondary`, `border-border`, `ring-primary`, `bg-surface-hover`). Do not hardcode raw colors or use semantic background opacity modifiers. Interactive targets must meet the design system touch-size and keyboard-focus requirements.

## Domain-first cohesive sidebar grouping presentation

- Render the seven source-audited logical navigation groups from `ADMIN_NAV_GROUPS` in their configured order; group membership and labels are defined by `MODULE_MAP.md` and the EN/HI locale files. Each domain folder is a direct child of `frontend_admin/`; category labels are navigation metadata and add no filesystem or URL segment. Parenthesized route-group folders are forbidden by the architecture rules.
- Each group is a semantic `role="group"` container labelled by its heading. Expanded desktop navigation and the open mobile drawer show the heading visibly.
- Separate every group after the first with `border-t border-border` plus spacing; do not use raw colors or arbitrary Tailwind values for section dividers.
- In icon-only/collapsed layouts, retain the border separators and expose the group name to assistive technology with visually hidden heading text. Each link keeps an accessible destination label and a tooltip combining group and destination labels.
- Search filtering may hide empty groups, but it must never reorder or reassign the remaining links.
- Header Profile remains in the header user menu and is not part of the seven sidebar groups.
