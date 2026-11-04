# Auth Module Theme Contract — v9-fix

## Consumed Semantic Theme Tokens
The Auth module consumes only semantic design-system tokens in production JSX:

- `bg-page`
- `bg-card`
- `bg-input`
- `bg-sidebar`
- `bg-success`, `bg-success-bg`, `text-success`
- `bg-warning-bg`, `text-warning`
- `bg-danger-bg`, `text-danger`
- `text-primary`, `text-secondary`, `text-disabled`, `text-on-primary`
- `border-border`, `border-focus`, `ring-primary`
- `bg-skeleton-base`, `bg-skeleton-highlight`
- `shadow-card`

It also relies on documented Tailwind geometry and typography tokens/classes and the host `font-sans` mapping to the required Inter font.

## Visual Ownership
- Global design owns the CSS variable values and Tailwind mappings.
- Auth/Login owns feature composition and semantic token selection.
- Auth/Login does not define raw color values or inline styles.
- Business/status semantics are not moved into the global design system.

## Host Verification Boundary
The supplied frontend-auth artifact does not contain the host `globals.css`, `tailwind.config.ts`, ThemeProvider, or `ThemeToggle` implementation. Therefore these host-level items are **NOT VERIFIED** from this artifact and are documented as integration requirements rather than fabricated as module-local code.

## Responsive Contract
- Base classes are mobile-first.
- `md:` is used for tablet adjustments where required.
- `xl:` is the Login desktop split threshold because the supplied design defines Desktop as `>=1280px`.
- Narrow mobile widths must avoid unintended horizontal overflow.

## Visual Exceptions / Applicability
The Auth/Login feature does not contain tables, KPI cards, charts, drag-and-drop surfaces, payment-mode UI, export UI, or status registries. Those design families are therefore documented as not applicable rather than invented.
