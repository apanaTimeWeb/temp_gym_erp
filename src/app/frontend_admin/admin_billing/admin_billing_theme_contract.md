# admin_billing — Theme Contract

## Global tokens and UI ownership
Uses global `bg-page`, `bg-card`, `bg-header`, `text-primary`, `text-secondary`, `border-border`, `bg-surface-highlight`, `bg-surface-hover`, and `ring-primary` tokens. Each billing leaf declares its exact token dependencies.

- Consume the global semantic Tailwind utilities mapped from the canonical global stylesheet.
- Use the prescribed dark premium-gold design system, semantic borders/surfaces/status backgrounds, and focus-ring utilities.
- Ensure keyboard-visible focus, WCAG 2.2 AA contrast, reduced-motion compliance, and touch-friendly controls.
- Keep feature-specific status/business styling within the owning leaf's theme contract.
- Preserve localized English/Hindi labels and long-string/RTL readiness.
