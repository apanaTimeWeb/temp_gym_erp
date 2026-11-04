# Public Landing Booking — Source-bound UI Theme Contract

The web UI uses `WEB_FRONTEND_UI_UX_DESIGN.md` (Inter, semantic Tailwind v4 classes, premium dark/gold default, WCAG 2.2 AA, reduced-motion and RTL-safe layout). Auth and public landing routes must preserve the existing visual presentation after migration.

- Page/card: `bg-page`, `bg-card`, `border-border`; text `text-primary`, `text-secondary`.
- Main CTA: `bg-primary text-on-primary`, hover `bg-primary-hover`; error `bg-danger-bg text-danger`.
- Focus: `focus-visible:ring-primary`; minimum 44px touch targets.
- Use `globals.css` `@theme inline` mapping provided by the host, never inline hardcoded hex or `bg-[var(--...)]`.
- Preserve locale parity and feature-specific design labels/data from `public_landing_booking` component sources.
- The actual host `globals.css` and browser contrast/accessibility validation are outside supplied scope and remain `NOT_VERIFIED`.
