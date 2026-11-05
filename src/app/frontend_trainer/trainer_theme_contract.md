# Trainer Theme Contract

Trainer shell consumes the Smart Gym 360 global design system through semantic Tailwind tokens.

Required global tokens used by Trainer shell/feedback/shared primitives:
- Surfaces: `--bg-page`, `--bg-card`, `--bg-floating`, `--bg-overlay`, `--bg-popover`, `--bg-sidebar`, `--bg-header`, `--bg-input`.
- Borders/focus: `--border`, `--border-focus`, `--focus-ring`.
- Text: `--text-primary`, `--text-secondary`, `--text-disabled`, `--text-on-primary`, `--text-on-danger`, `--text-on-success`, `--text-on-info`.
- Semantic state: `--success-text`, `--success-bg`, `--warning-text`, `--warning-bg`, `--danger-text`, `--danger-bg`, `--info-text`, `--info-bg`, `--purple-text`, `--purple-bg`.
- Loading: `--skeleton-base`, `--skeleton-highlight`.
- Elevation: `--shadow-card`, `--shadow-popover`, `--shadow-dialog`, `--shadow-toast`.

Trainer JSX must use the mapped semantic Tailwind classes and must not use raw hex colors, arbitrary color values, or legacy global color utility names where a semantic token exists.

## Canonical consumed utility aliases

The role-owned `globals.css` exposes the short utility names consumed by the Trainer source through `@theme inline`, without duplicating or changing the underlying design tokens:

| Tailwind utility | Canonical token |
|---|---|
| `text-secondary` | `--text-secondary` |
| `border-focus` | `--border-focus` |
| `ring-focus-ring` | `--focus-ring` |

Use `ring-focus-ring` for visible keyboard focus. Keep `primary` reserved for primary action/emphasis colors; do not use the light-mode gold primary fill as the focus indicator. Actual Tailwind generation remains subject to host-runtime verification.


## v8-fix Verification Qualification
Feature-local source uses named semantic tokens. Role-local `frontend_trainer/globals.css` and its Tailwind v4 `@theme inline` mapping ARE present in this supplied ZIP and are available for static verification. The host global stylesheet adoption, ThemeProvider integration and host CI remain NOT_VERIFIED. The role-local file is a deployable token contract, not a second host-owned global source of truth.
