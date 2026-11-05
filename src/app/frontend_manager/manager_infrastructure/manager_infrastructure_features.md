# Manager Infrastructure — Feature Contract

Role-wide support module, not a business route. Canonical route inventory and release status are documented in the source-root `INTEGRATION_GUIDE.md`.

## 1. Purpose and scope

Role-wide, zero-business infrastructure used by the Manager frontend.

## 2. Ownership boundary

Business APIs, query keys, schemas, stores, and workflows stay in owning leaf modules.

## 3. Public contracts

Expose only stable adapters and primitives required by role shell or feature leaves.

## 4. Environment configuration

Parse public environment configuration at the application boundary.

## 5. Transport boundary

Feature APIs use the host api client; transport helpers remain generic.

## 6. Query providers

Provide QueryClient wiring without owning feature query keys or business cache.

## 7. Error mapping

Normalize transport errors without feature-specific business semantics.

## 8. Idempotency

Provide generic idempotency helpers; features choose when to use them.

## 9. Money helpers

Convert minor units without owning currency or pricing policy.

## 10. Pagination defaults

Provide neutral pagination defaults; feature query state stays local.

## 11. Debounce helpers

Provide generic debounce primitives only.

## 12. Dialog focus utilities

Provide focus trapping and cleanup for accessible dialogs.

## 13. Unsaved-change guard

Provide generic confirmation adapter; features own copy and intent.

## 14. Mounted snapshot

Provide hydration-safe mounted snapshots.

## 15. Toast primitives

Provide semantic accessible notifications without business logic.

## 16. Permission gate

Adapt host permission decisions; do not invent authorization policy.

## 17. Mock URL utilities

Provide deterministic API URL construction for test handlers.

## 18. HTTP status constants

Expose protocol constants only.

## 19. Testing contracts

Centralize provider/MSW test setup and reset mutable handlers.

## 20. Dependencies

Do not import business leaf implementations.

## 21. Accessibility and theme

Use semantic theme tokens and accessible state announcements.

## 22. Change and release process

Update this contract and ADR when exported infrastructure changes.

