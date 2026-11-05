# admin_gyms — Theme Contract

## Global tokens and UI ownership
Uses global semantic surface, border, typography, status and focus tokens; health state colors must use status semantic tokens instead of raw values.

- Consume the global semantic Tailwind utilities mapped from the canonical global stylesheet.
- Use the prescribed dark premium-gold design system, semantic borders/surfaces/status backgrounds, and focus-ring utilities.
- Ensure keyboard-visible focus, WCAG 2.2 AA contrast, reduced-motion compliance, and touch-friendly controls.
- Keep feature-specific status/business styling within the owning leaf's theme contract.
- Preserve localized English/Hindi labels and long-string/RTL readiness.
