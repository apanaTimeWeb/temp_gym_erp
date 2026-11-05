# trainer_navigation — Theme Contract

## Source of Truth
The canonical values and Tailwind semantic mappings live in the role's existing `globals.css` and must follow `WEB_FRONTEND_UI_UX_DESIGN.md`. This module consumes tokens and must not define competing theme values.

## Consumed Token Families
- Shell surfaces: `bg-page`, `bg-header`, `bg-sidebar`, `bg-popover`, `bg-input`, `bg-card`, `bg-overlay-backdrop`.
- Text: `text-primary`, `text-secondary`, `text-warning`, `text-danger`, `text-on-danger`.
- Borders and focus: `border-border`, `border-focus`, `focus-visible:ring-primary`, `focus-visible:ring-offset-page`.
- Feedback surfaces: `bg-primary-subtle`, `bg-warning-bg`, `bg-danger-bg`.
- Elevation and geometry: `shadow-dialog`, `--layout-header-height`, `--layout-sidebar-width`, `--layout-sidebar-width-collapsed`, `--layout-content-padding`, `--touch-target-min`, `--border`, `--radius-full`, and `--overlay-backdrop`.

## Required Visual Behavior
- Use premium gold/black global theme defaults through semantic tokens only.
- Keep the header fixed, sidebar responsive, collapsed desktop navigation available, and mobile drawer keyboard-accessible.
- Preserve visible focus, focus restoration, Escape handling, safe-area spacing, and reduced-motion preferences.
- Do not introduce dashboard CTA gradients or raw colors.

## RBG 5 token contract
- Breadcrumbs consume semantic `text-secondary`, `text-primary`, `bg-surface-hover`, `ring-primary`, `bg-page`, and `text-on-primary` classes.
- Skip-link and navigation focus treatment uses the global focus-ring semantic token through `ring-primary`; no raw color values are permitted.
- Responsive shell geometry continues to use global layout and touch-target tokens in the existing shell styles.
