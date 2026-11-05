# Trainer Dashboard Overview — Theme Contract

## Source and ownership

Canonical source: `WEB_FRONTEND_UI_UX_DESIGN.md` via application `globals.css` semantic tokens. Feature style classes must consume the global mapped semantic utilities; this leaf must not define a global business theme.

## Existing Dashboard token inventory


- `--bg-card`
- `--bg-input`
- `--bg-page`
- `--border`
- `--chart-grid`
- `--chart-primary`
- `--danger-bg`
- `--danger-text`
- `--focus-ring`
- `--info`
- `--info-bg`
- `--info-text`
- `--primary`
- `--primary-hover`
- `--primary-subtle`
- `--shadow-card`
- `--success-bg`
- `--success-text`
- `--surface-highlight`
- `--text-on-primary`
- `--text-primary`
- `--text-secondary`
- `--warning`
- `--warning-bg`
- `--warning-text`


## Rules

- Default luxury gold + dark mode; authorized light-mode tokens in global CSS only.
- Semantic `bg-card`, `bg-page`, `text-primary`, `border-border`, `bg-success-bg`, and `text-on-*` contrast pairing; no hardcoded HEX/RGB, no arbitrary token utility or semantic opacity modifiers.
- Maintain WCAG 2.2 AA focus, touch targets and reduced-motion semantics; all chart data should remain screen-reader accessible.
- This is the **verified source token inventory**, not a claim of browser contrast or responsive PASS; host checks remain `DEFERRED_TO_HOST_RUNTIME`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-page` | `--bg-page` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-warning` | `--warning` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-danger-bg` | `--danger-bg` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-kpi` | `--font-size-kpi` |
| `text-on-primary` | `--text-on-primary` |
| `text-page-title` | `--font-size-page-title` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

Direct CSS custom-property references in this leaf:

- `--chart-grid`
- `--chart-primary`
- `--text-secondary`

**Utility mapping qualification:** the source also references `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The source also references `border-focus`. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-page` | `--bg-page` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-warning` | `--warning` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-danger-bg` | `--danger-bg` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-kpi` | `--font-size-kpi` |
| `text-on-primary` | `--text-on-primary` |
| `text-page-title` | `--font-size-page-title` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

Direct CSS custom-property token references in this leaf (including chart-library token-name arrays):

- `--chart-grid`
- `--chart-primary`
- `--text-secondary`

**Utility mapping qualification:** the source also references `border-focus`. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-info` | `--info` |
| `bg-info-bg` | `--info-bg` |
| `bg-input` | `--bg-input` |
| `bg-page` | `--bg-page` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-warning` | `--warning` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-danger-bg` | `--danger-bg` |
| `ring-primary` | `--primary` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-info` | `--info` |
| `text-kpi` | `--font-size-kpi` |
| `text-on-primary` | `--text-on-primary` |
| `text-page-title` | `--font-size-page-title` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-success` | `--success` |
| `text-warning` | `--warning` |

Direct CSS custom-property token references in this leaf (including chart-library token-name arrays):

- `--chart-grid`
- `--chart-primary`
- `--text-secondary`

**Utility mapping qualification:** the source also references `text-secondary`, `border-focus`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. The supplied `@theme inline` maps `--color-border-focus` to `--border-focus`, which exposes `border-border-focus`; it does not declare a `--color-focus` alias for the shorter `border-focus` utility. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

