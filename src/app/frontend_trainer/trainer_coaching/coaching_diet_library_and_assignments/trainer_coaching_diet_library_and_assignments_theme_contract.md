# Diet Library and Assignments — Theme Contract

Semantic Tailwind via globals.css + @theme inline; dark default and accessible light override.

- Surfaces: `bg-page`, `bg-card`, `bg-overlay`, `bg-input`.
- Text: `text-primary`, `text-secondary`, `text-on-primary`.
- Focus: `focus-visible:ring-primary`; controls `min-h-11`, `min-w-11` where appropriate.
- Borders/spacing: `border-border`, `rounded-lg`, `rounded-xl`, responsive `sm:` layouts.
- Feedback: `bg-success-bg` + `text-success`, `bg-danger-bg` + `text-danger`, `bg-warning-bg` + `text-warning`.
- Loading: `bg-skeleton-base`, `motion-safe:animate-pulse`; respect reduced motion.
- Responsiveness: no horizontal overflow at 320px, 2x font resize, semantic table collapse where relevant.
- Retain original EN/HI labels; test keyboard focus trap and escape/unsaved-changes confirmation.

No inline theme colors, hardcoded HEX in JSX, or opacity modifiers on semantic colors. Verified browser contrast and RTL are NOT_VERIFIED.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
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
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
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
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
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
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-success-bg` | `--success-bg` |
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

