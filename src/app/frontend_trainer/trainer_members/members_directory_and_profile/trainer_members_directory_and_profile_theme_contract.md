# Trainer Members — Directory and Profile — Theme Contract

Global authority: `WEB_FRONTEND_UI_UX_DESIGN.md` with `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md` precedence.

Consumes: `bg-page`, `bg-card`, `bg-input`, `bg-overlay`, `bg-skeleton-base`, `text-primary`, `text-secondary`, `text-danger`, `text-on-primary`, `border-border`, `ring-primary`, `bg-primary`, `bg-primary-hover`, `bg-primary-subtle`, `bg-danger-bg`, `text-success`, `bg-success-bg`, `bg-warning-bg`, `shadow-card`, `shadow-dialog`. Values are owned exclusively by host `globals.css` + `@theme inline` mapping.

Fonts: Inter via `next/font`. Base font size 14px. Layout: responsive mobile-first 320px to desktop, viewport-safe modals, horizontal overflow for dense tables, accessible mobile cards, focus-visible, aria labels, keyboard close/focus-trap where applicable. Touch targets ≥44px. No aggressive dashboard gradients, no hardcoded JSX hex, no opacity modifiers on semantic status backgrounds. Respect `prefers-reduced-motion`.

State: SOURCE_FIX_STAGED_RBG_11_15. Browser color contrast and keyboard behavior NOT_VERIFIED.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-floating` | `--bg-floating` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-page` | `--bg-page` |
| `bg-popover` | `--bg-popover` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-purple-bg` | `--purple-bg` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-social-whatsapp` | `--social-whatsapp` |
| `bg-success` | `--success` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-warning` | `--warning` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-danger-bg` | `--danger-bg` |
| `border-primary` | `--primary` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-popover` | `--shadow-popover` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-kpi` | `--font-size-kpi` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-info` | `--text-on-info` |
| `text-on-primary` | `--text-on-primary` |
| `text-on-success` | `--text-on-success` |
| `text-on-warning` | `--text-on-warning` |
| `text-primary` | `--primary` |
| `text-purple` | `--purple-text` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

**Utility mapping qualification:** the source also references `text-disabled`, `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The source also references `border-focus`. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-floating` | `--bg-floating` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-page` | `--bg-page` |
| `bg-popover` | `--bg-popover` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-purple-bg` | `--purple-bg` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-social-whatsapp` | `--social-whatsapp` |
| `bg-success` | `--success` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-warning` | `--warning` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-danger-bg` | `--danger-bg` |
| `border-primary` | `--primary` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-popover` | `--shadow-popover` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-kpi` | `--font-size-kpi` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-info` | `--text-on-info` |
| `text-on-primary` | `--text-on-primary` |
| `text-on-success` | `--text-on-success` |
| `text-on-warning` | `--text-on-warning` |
| `text-primary` | `--primary` |
| `text-purple` | `--purple-text` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

**Utility mapping qualification:** the source also references `text-disabled`, `border-focus`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-floating` | `--bg-floating` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-page` | `--bg-page` |
| `bg-popover` | `--bg-popover` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-purple-bg` | `--purple-bg` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-social-whatsapp` | `--social-whatsapp` |
| `bg-success` | `--success` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-warning` | `--warning` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-danger-bg` | `--danger-bg` |
| `border-primary` | `--primary` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-popover` | `--shadow-popover` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-kpi` | `--font-size-kpi` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-info` | `--text-on-info` |
| `text-on-primary` | `--text-on-primary` |
| `text-on-success` | `--text-on-success` |
| `text-on-warning` | `--text-on-warning` |
| `text-primary` | `--primary` |
| `text-purple` | `--purple-text` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

**Utility mapping qualification:** the source also references `text-secondary`, `text-disabled`, `border-focus`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

