# Admin Communication — Domain Contract (v47)


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Own member-facing communication workflows under one primary Admin sidebar destination.

## Autonomous submodules
- `communication_notices_and_announcements/` — notices and announcements using the existing contracts.
- `communication_whatsapp_campaigns/` — existing WhatsApp campaign composer, audience and template UI.
- `communication_notifications_center/` — notification inbox and read-state workflow.

## Navigation
`page.tsx` redirects to notices. `layout.tsx` exposes the three children as secondary navigation. Child workflows remain independently testable and self-contained.

## Contract safety
