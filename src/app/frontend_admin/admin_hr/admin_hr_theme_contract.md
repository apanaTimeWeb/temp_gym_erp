# Admin HR — Theme Contract (Admin v47)

## Global token ownership

This domain consumes the global Smart Gym 360 design system. Theme definitions stay in the host canonical global stylesheet and Tailwind `@theme inline`; this feature must not declare competing global token values.

## Required visual contract

- Dark mode is the default. Gold is the primary action/active-nav token; use semantic Tailwind classes such as `bg-page`, `bg-card`, `bg-header`, `text-primary`, `text-secondary`, `border-border`, `bg-primary`, and `text-on-primary`.
- Status surfaces use `bg-success-bg`, `bg-warning-bg`, `bg-danger-bg`, or `bg-info-bg` with their corresponding semantic text tokens. Do not apply opacity modifiers to semantic backgrounds.
- Do not use inline style objects, raw hex/RGBA utility values, or gradients inside authenticated dashboards.
- Interactive targets meet the prescribed minimum target size and maintain focus-visible keyboard affordances. Loading/empty/error states must keep stable layout geometry.
- Use Inter and the typography scale defined by the global design system; preserve native external-integration brand colors.

## Leaf token contracts

Each leaf’s `admin_<leaf>_theme_contract.md` is the precise token inventory for that workflow. This parent contract does not replace or expand it.
