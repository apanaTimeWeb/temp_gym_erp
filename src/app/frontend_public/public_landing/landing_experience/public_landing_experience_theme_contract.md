# Public Landing Marketing Experience — Source-bound UI Theme Contract

The web UI uses `WEB_FRONTEND_UI_UX_DESIGN.md` (Inter, semantic Tailwind v4 classes, premium dark/gold default, WCAG 2.2 AA, reduced-motion and RTL-safe layout). Auth and public landing routes must preserve the existing visual presentation after migration.

- Page/card: `bg-page`, `bg-card`, `border-border`; text `text-primary`, `text-secondary`.
- Main CTA: `bg-primary text-on-primary`, hover `bg-primary-hover`; error `bg-danger-bg text-danger`.
- Focus: `focus-visible:ring-primary`; minimum 44px touch targets.
- Use `globals.css` `@theme inline` mapping provided by the host, never inline hardcoded hex or `bg-[var(--...)]`.
- Preserve locale parity and feature-specific design labels/data from `public_landing_experience` component sources.
- The actual host `globals.css` and browser contrast/accessibility validation are outside supplied scope and remain `NOT_VERIFIED`.

## RBG 1 route and stylesheet ownership (v21)

Next.js segment-level `error.tsx`, `loading.tsx`, and `not-found.tsx` **must remain** in `public_landing/` for actual framework interception. They now contain delegation-only framework exports with **no business UI implementation**. Full behavior and presentation moved without logical or JSX changes into `landing_experience/components/route_states/PublicLandingExperienceRoute{Error,Loading,NotFound}.tsx`. This is an explicit platform-convention (precedence tier 2/4) exception to a strict literal reading of domain-root quarantine; removing route entries would break required accessibility/recovery states.

The original local landing CSS rules and selectors were relocated unchanged from noncanonical `landing_experience/styles/PublicLandingStyles.css` to owner-local `landing_experience/components/main/PublicLandingExperienceStyles.css`, imported through the same `public_landing/layout.tsx` route wrapper. Social brand color/hero-overlay CSS remains local by documented design-system exception; no new hardcoded UI palette was introduced. Host CSS injection and visual regression are not verified without Next.js runtime.
