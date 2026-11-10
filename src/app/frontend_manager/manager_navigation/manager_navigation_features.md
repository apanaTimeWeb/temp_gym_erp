# Manager Navigation — Feature Contract

Role-wide support module, not a business route.

## 1. Purpose and scope

Own Manager navigation metadata and shell presentation: sidebar, header, breadcrumb, command palette, and route progress.

## 2. Domain structure

Render 15 domain rows and 28 secondary leaf destinations from one typed registry.

## 3. Expandable groups

Use seven expandable groups with accessible domain links and separate submenu toggles.

## 4. Dashboard destinations

Expose Dashboard Overview, Business Settings, and Profile & Security as dashboard secondary destinations.

## 5. Default home

Use Dashboard Overview as the canonical default leaf.

## 6. Route ownership

Resolve leaf hrefs from each feature URL config.

## 7. Domain redirects

Preserve domain-root redirects and direct leaf URLs.

## 8. Feature ownership

Reference route constants and labels only; never business hooks, stores, APIs, schemas, or data.

## 9. Header shortcuts

Keep notifications/profile shortcuts in the header when specified.

## 10. Store visibility

Keep store routes directly routable even when omitted from the sidebar.

## 11. Localization

Maintain Manager shell English/Hindi locale parity.

## 12. Active state

Mark the current route and expand the active parent group.

## 13. Search behavior

Filter translated group and child labels without losing domain affordances.

## 14. Keyboard access

Use native links/buttons, visible focus, aria-expanded and aria-controls.

## 15. Responsive behavior

Preserve collapsed desktop and mobile drawer behavior with focus restore/Escape close.

## 16. Accessibility

Give icon-only actions accessible names and distinguish domain links from submenu controls.

## 17. Visual system

Use semantic theme tokens and shared spacing/typography.

## 18. Role boundary

Navigation is zero-business role infrastructure, not a feature bucket.

## 19. Testing

Test 14 domains, 27 unique leaf routes, seven expandable groups, active expansion, and search.

## 20. Route compatibility

Keep route matrix and Playwright contract synchronized.

## 21. No duplicate registries

Update canonical registry and shell mirror together.

## 22. Release process

Update route matrix, navigation evidence, and integration guide when routes change.

