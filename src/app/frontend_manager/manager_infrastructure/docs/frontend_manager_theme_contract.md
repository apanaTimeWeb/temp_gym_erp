# Manager Role — Theme Portability Contract (v12-fix)

The Manager role consumes the global Smart Gym 360 design system through semantic Tailwind tokens and approved zero-business UI primitives. Feature modules retain their own exact theme contracts.

## Role-Shell Token Families
`--primary`, `--primary-hover`, `--primary-subtle`, `--bg-page`, `--bg-card`, `--bg-sidebar`, `--bg-header`, `--bg-header-translucent`, `--bg-input`, `--bg-floating`, `--bg-overlay`, `--bg-popover`, `--surface-hover`, `--surface-highlight`, `--surface-zebra`, `--overlay-backdrop`, `--focus-ring`, `--border`, `--border-focus`, `--text-primary`, `--text-secondary`, `--text-disabled`, `--text-on-primary`, `--text-on-danger`, `--text-on-warning`, `--text-on-success`, `--text-on-info`, skeleton tokens, semantic status tokens, payment tokens, chart tokens, semantic shadows, radius and layout/geometry tokens.

## Required JSX Pattern
Use documented semantic classes such as `bg-page`, `bg-card`, `bg-overlay`, `bg-primary`, `text-primary`, `text-secondary`, `border-border`, `ring-primary`, `bg-success-bg`, `text-success`, `bg-danger-bg`, and the documented surface/shadow classes. Do not use raw hex values, arbitrary CSS-variable Tailwind expressions, or prohibited semantic background opacity modifiers.

## Ownership
- Global design system: visual tokens/primitives only.
- Manager role: navigation/shell presentation and role context.
- Feature module: business statuses, labels, icons, server data and behavior.
- Feature theme contract: exact consumed tokens per business module.

## External Integration Exception
Native external-brand colors remain allowed only where the supplied design explicitly requires them (for example WhatsApp links). They must not become ERP theme tokens.

## v12-fix Verification Note
The supplied source snapshot contains the Manager role/module JSX and semantic token usage, but it does not contain the consuming application's canonical `globals.css`/Tailwind configuration. Static source checks found no raw theme colors/arbitrary Tailwind theme values in Manager source. Final token-definition/mapping execution remains a host-repository verification item.
