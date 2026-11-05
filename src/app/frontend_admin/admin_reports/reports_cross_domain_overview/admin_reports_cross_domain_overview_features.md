---
module: admin_reports/reports_cross_domain_overview
platform: web
status: active
---
# Admin Reports Cross-Domain Overview — Feature Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## 1. Purpose
Provide an index of report destinations while leaving report business workflows in their owning domains.
## 2. User Stories
Administrators can find Attendance, Sales membership, and Finance reports from one catalog.
## 3. Scope
Read-only navigation catalog; no business data retrieval or mutation.
## 4. Non-Scope
Attendance logic, Sales membership logic, Finance report logic, permissions, and API clients remain in their own autonomous leaves.
## 5. Screen Inventory
One overview page with report links grouped by owning domain.
## 6. Route Contract
Canonical route: `/frontend_admin/admin_reports/reports_cross_domain_overview`.
## 7. Navigation Contract
The Reports root redirects to this catalog; the catalog links to the canonical leaf routes.
## 8. Data Requirements
No API data is required; entries come from typed, local constants.
## 9. API Contract
No backend endpoints are called by this feature.
## 10. Types and Schemas
Links use `AdminReportsCrossDomainOverviewLink`; no backend DTO is invented.
## 11. State Ownership
No business state or persisted entity state.
## 12. Forms and Validation
No forms or user-supplied values.
## 13. Permissions
Host/domain guards remain authoritative; this catalog does not grant access.
## 14. Loading, Empty, and Error States
The route is static; framework-level loading/error/not-found entries preserve explicit route states.
## 15. Accessibility
Semantic heading, named section, keyboard-operable links, focus rings, and reduced-motion-safe transition styling.
## 16. Responsive Contract
Cards flow from one column to two and three columns at responsive breakpoints.
## 17. Localization
Visible page/card strings resolve through the Admin Navigation English/Hindi locale catalogs; module-local locale reference files are included.
## 18. Security and Privacy
No sensitive data, browser storage, or client secret is used. Destination route guards remain in owning modules.
## 19. Tests
`tests/AdminReportsCrossDomainOverviewRoutes.test.ts` verifies canonical destinations and catalog uniqueness.
## 20. Standalone Run / Mock Harness
This page does not call APIs, so its MSW handler registry is intentionally empty and no endpoint or response envelope is fabricated. The required module-local `mocks/fixtures/` and `mocks/scenarios/` document deterministic ACTIVE_RECORDS and EMPTY_DATA catalog fixtures; SERVER_500_ERROR, NETWORK_TIMEOUT, and UNAUTHORIZED_401 are explicitly host-owned because this leaf owns neither network nor authorization behavior. `contracts/host-stubs.d.ts` provides isolated host declarations; the full host application must continue to use its real infrastructure contracts.
## 21. Portability Guide
Copy the entire leaf and provide the standard host aliases, Next.js App Router, React, next-intl, and lucide-react.
## 22. Version History
Added in Admin v46 to preserve the requested Reports primary domain while moving Attendance and Sales-owned report workflows to their owners.
