# Trainer operations_leave_requests — Theme Contract

Global `globals.css` remains the single design-token source. This submodule consumes semantic Tailwind v4 tokens including `bg-page`, `bg-card`, `text-primary`, `text-secondary`, `border-border`, `bg-primary`, `text-on-primary`, `bg-skeleton-base`, `text-danger`, `bg-danger-bg` and `focus-visible:ring-primary`. Dark palette is default gold/soft black; light mode must work through tokens. No hardcoded raw colors or business styles in global primitives. Keyboard navigation, labels, modal focus management, mobile card layouts, reduced motion and WCAG 2.2 AA must be tested in host browser.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-floating` | `--bg-floating` |
| `bg-header` | `--bg-header` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-popover` | `--bg-popover` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-surface-hover` | `--surface-hover` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-popover` | `--shadow-popover` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-info` | `--text-on-info` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

**Utility mapping qualification:** the source also references `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

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
| `bg-header` | `--bg-header` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-popover` | `--bg-popover` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-surface-hover` | `--surface-hover` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-popover` | `--shadow-popover` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-info` | `--text-on-info` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

**Utility mapping qualification:** the source also references `border-focus`. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-floating` | `--bg-floating` |
| `bg-header` | `--bg-header` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-popover` | `--bg-popover` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-surface-hover` | `--surface-hover` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-popover` | `--shadow-popover` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-info` | `--text-on-info` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

**Utility mapping qualification:** the source also references `text-secondary`, `border-focus`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

