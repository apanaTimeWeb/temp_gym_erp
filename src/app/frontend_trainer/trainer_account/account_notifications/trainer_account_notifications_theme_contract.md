# Trainer account_notifications — Theme Contract

Global `globals.css` remains the single design-token source. This submodule consumes semantic Tailwind v4 tokens including `bg-page`, `bg-card`, `text-primary`, `text-secondary`, `border-border`, `bg-primary`, `text-on-primary`, `bg-skeleton-base`, `text-danger`, `bg-danger-bg` and `focus-visible:ring-focus-ring`. Dark palette is default gold/soft black; light mode must work through tokens. No hardcoded raw colors or business styles in global primitives. Keyboard navigation, labels, modal focus management, mobile card layouts, reduced motion and WCAG 2.2 AA must be tested in host browser.

## Verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records the current consumed utilities and their canonical role-owned token mappings after the RBG 1 source repair.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-input` | `--bg-input` |
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-surface-hover` | `--surface-hover` |
| `bg-warning-bg` | `--warning-bg` |
| `border-border` | `--border` |
| `border-focus` | `--border-focus` |
| `ring-focus-ring` | `--focus-ring` |
| `shadow-card` | `--shadow-card` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-secondary` | `--text-secondary` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-primary` | `--primary` |
| `text-section-title` | `--font-size-section-title` |
| `text-warning` | `--warning` |

**Utility mapping:** `text-secondary` and `border-focus` are exposed through explicit short semantic aliases in the role-owned `@theme inline` mapping, backed by `--text-secondary` and `--border-focus`. Focus indication uses `ring-focus-ring`, backed by the dedicated `--focus-ring` token; the gold `primary` token remains reserved for primary actions and emphasis. Host Tailwind class generation remains `DEFERRED_TO_HOST_RUNTIME`.


The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.
