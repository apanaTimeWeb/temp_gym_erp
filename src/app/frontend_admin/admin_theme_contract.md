# Admin Role Theme Contract — v24-fix

## Authority

The current supplied global web design authority is `input_materials/WEB_FRONTEND_UI_UX_DESIGN.md`; architecture and Tailwind token rules are in `input_materials/WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`. Feature modules declare exact consumed tokens in their own `{moduleName}_theme_contract.md` files. `globals.css`, Tailwind configuration, host font loading and actual browser color contrast are host-owned and are not included in this role ZIP.

## Visual contract

- Smart Gym 360 ERP uses semantic premium-gold primary actions and semantic info/success/warning/danger status palettes.
- Dark mode is the v1 default visual posture, but both light/dark values must come from the canonical host CSS token source; the supplied host stylesheet is absent, so actual token mapping is `OUTSIDE_SUPPLIED_SCOPE`.
- Feature JSX must use semantic classes (`bg-page`, `bg-card`, `text-primary`, `text-secondary`, `border-border`, `bg-success-bg`, `text-danger`, `ring-primary`, etc.) rather than raw hex/RGB or arbitrary CSS-variable classes.
- Never apply opacity suffixes to semantic backgrounds (`bg-success/10`, `bg-primary/20`); use explicit semantic subtle/background tokens.
- Solid semantic backgrounds require the matching `text-on-*` contrast token. Color is never the only status indicator.
- Aggressive gradients are prohibited in authenticated ERP pages; they are reserved for landing-page hero CTAs. External integration-brand colors must remain official native brand colors.
- Use Inter as loaded by the host `next/font` implementation, compact documented typography/spacing/radius scales, 44px minimum touch targets and responsive 320/375/768/1280+ behavior.
- Keyboard navigation, visible focus, focus restoration, programmatic form labels/errors, reduced-motion support (`motion-safe:`), semantic table markup and 200% zoom behavior are acceptance requirements.

## Source-level discrepancy retained

The supplied role archive does not include the host root stylesheet or authoritative token-to-CSS mapping. Source-level token references can be inventoried, but rendered colors and contrast remain NOT_VERIFIED until the host stylesheet and browser are available.

