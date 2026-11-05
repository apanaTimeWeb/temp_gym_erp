> **Archived legacy contract — not an active source of truth.**
> This file is retained for audit traceability after the duplicate `manager_dashboard/manager_shell` tree was retired. The canonical Manager infrastructure contract is maintained in `manager_infrastructure/docs/`. Do not use this archived copy to implement current behavior.

---

# Manager Shell — Feature Contract

Bounded role-shell compatibility layer retained for root layout. It contains zero-business navigation and infrastructure adapters only; canonical contracts live in manager_infrastructure and manager_navigation.

## 1. Purpose and scope

Keep root Manager layout wiring stable while delegating business behavior to leaf modules.

## 2. Root layout

Compose role layout only; do not own business routes or feature state.

## 3. Navigation mirror

Keep shell navigation mirror aligned with canonical manager_navigation registry.

## 4. Infrastructure mirror

Keep adapters zero-business and aligned with manager_infrastructure contracts.

## 5. Route redirects

Preserve all domain-root redirects and direct leaf routes.

## 6. Provider composition

Compose providers without feature cache or mutation logic.

## 7. Mock bootstrap

Start test/development MSW only under documented conditions.

## 8. Permission adapter

Delegate permission decisions to host permission contract.

## 9. State ownership

No business entity state or cross-feature cache ownership.

## 10. Imports

Feature implementations do not import shell internals; shell may use role support and route metadata.

## 11. Accessibility

Preserve focus management, keyboard navigation, labels, and live status semantics.

## 12. Theme

Use semantic tokens and no raw palette colors.

## 13. Localization

Keep shell copy in role-shell locale contract.

## 14. Tests

Maintain layout/navigation/route tests in the host environment.

## 15. Host boundary

This archive omits host app, package manifest, and global CSS.

## 16. Compatibility

Keep wrappers only when required by current root layout.

## 17. No duplicate business

No feature APIs, business mocks, schemas, or workflow hooks.

## 18. ADR

Follow ADR-001 for the bounded zero-business role-support exception.

## 19. Release evidence

Link only to audit artifacts shipped in the archive.

## 20. Runtime verification

Host browser/build checks wait for integration into the full app.

## 21. Maintenance

Update canonical modules first, then synchronize this compatibility layer.

## 22. Completion

Source-complete does not mean runtime-certified until host checks pass.

