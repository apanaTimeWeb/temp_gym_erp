# Admin Navigation — Role-Shell Feature Contract (v47)


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Purpose
Own the Admin role's primary navigation, logical group labels, domain-root links, route-header metadata, search/filter behavior, and keyboard/screen-reader navigation. This shell must not own business feature logic.

## Canonical navigation rule
Every clickable primary sidebar item maps 1:1 to a canonical physical domain root. The domain root redirects to its default autonomous leaf; capabilities inside decomposed domains are shown only in that domain's secondary navigation. Finance has 13 child leaves; Billing has 7; Sales has 6; HR has 2; Reports has 1; Communication has 3. `admin_profile/` remains header-linked and `admin_navigation/` remains the technical role shell, not a business domain.

## Constraints
- All role-level route and header decisions are centralized in `config/admin_navigation_shell.url_config.ts` and `utils/AdminNavigationLayoutRouteHeaderConfig.ts`.
- Sidebar labels/group labels and route header strings are localized in both English and Hindi.
- Do not import feature business components into the role shell.
- Keep the shell responsive and keyboard/screen-reader accessible; preserve active parent state for every descendant route.


### RBG 20 verified repair note (2026-11-01)
- Exactly one Socket.IO connection is maintained per provider instance; built-in Socket.IO reconnection owns reconnect, and unmount disconnects the instance.
- Missing user roles display a translated neutral role state, not an elevated `Super Admin` claim.
- Toast deduplication considers ID, message and type: a reused ID with distinct content updates the visible toast.
- Integration tests were authored; authenticated WebSocket and browser lifecycle verification remain `DEFERRED_TO_HOST_RUNTIME`.
