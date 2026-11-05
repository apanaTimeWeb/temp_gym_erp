# Trainer account_security — Theme Contract

Global `globals.css` remains the single design-token source. This submodule consumes semantic Tailwind v4 tokens including `bg-page`, `bg-card`, `text-primary`, `text-secondary`, `border-border`, `bg-primary`, `text-on-primary`, `bg-skeleton-base`, `text-danger`, `bg-danger-bg` and `focus-visible:ring-primary`. Dark palette is default gold/soft black; light mode must work through tokens. No hardcoded raw colors or business styles in global primitives. Keyboard navigation, labels, modal focus management, mobile card layouts, reduced motion and WCAG 2.2 AA must be tested in host browser.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-input` | `--bg-input` |
| `bg-primary` | `--primary` |
| `bg-skeleton-base` | `--skeleton-base` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `text-danger` | `--danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |

**Utility mapping qualification:** the source also references `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-input` | `--bg-input` |
| `bg-primary` | `--primary` |
| `bg-skeleton-base` | `--skeleton-base` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `text-danger` | `--danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-input` | `--bg-input` |
| `bg-primary` | `--primary` |
| `bg-skeleton-base` | `--skeleton-base` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `text-danger` | `--danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |

**Utility mapping qualification:** the source also references `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

