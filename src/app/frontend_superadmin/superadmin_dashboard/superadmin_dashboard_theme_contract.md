# Dashboard — Theme Contract

Domain: `superadmin_dashboard`

This domain introduces no new global visual tokens. Each autonomous leaf owns its own leaf-prefixed `*_theme_contract.md`; that leaf-local contract is the exact authority for the tokens it consumes.

## Ownership
- Global design system owns semantic tokens, typography, layout geometry, elevation, component primitives, focus/motion and responsive conventions.
- This domain owns only the business context described in `superadmin_dashboard_features.md`.
- Each leaf consumes the global tokens using semantic Tailwind classes and must not introduce hardcoded colors, inline style values or arbitrary variable utilities when a semantic token exists.
- Solid semantic status backgrounds must be paired with their corresponding `text-on-*` token. Semantic backgrounds must not use opacity modifiers.
- Respect WCAG 2.2 AA, keyboard operability, focus visibility, reduced-motion preferences and documented touch/target minimums.
- Exact token inventory and responsive behavior remain in each leaf's own theme contract; this parent contract does not infer additional token use.
