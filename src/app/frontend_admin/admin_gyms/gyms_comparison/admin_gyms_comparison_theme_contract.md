# Admin Gyms Comparison Theme Contract

## 1. Theme Tokens
This feature strictly consumes design tokens defined in the Smart Gym 360 global design system:
- Surfaces: `bg-page`, `bg-card`, `bg-subtle`
- Borders: `border-border`, `border-border-subtle`
- Text: `text-primary`, `text-secondary`, `text-muted`
- Accents: `text-accent`, `bg-accent`
- State: `text-success`, `bg-success-subtle`, `text-danger`, `bg-danger-subtle`

## 2. Accessibility
- All interactive controls provide accessible labels (`aria-label` or visible labels).
- Minimum touch target size $\ge 44 \times 44\text{px}$ (`min-h-11`).
- Focus indicators using `focus-visible:ring-2 focus-visible:ring-focus-ring`.
