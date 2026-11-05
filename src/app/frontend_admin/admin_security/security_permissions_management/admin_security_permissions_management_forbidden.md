# Forbidden Patterns — `admin/permissions`

## 1. No Granting Super-Admin Level Permissions
**FORBIDDEN:** Enabling any UI toggle that would assign Superadmin-level permissions to gym staff.
**REASON:** Permission escalation is a critical security vulnerability.

## 2. No Permission Changes Without `useConfirm()`
**FORBIDDEN:** Calling PATCH on permission toggle without a confirmation gate.
**ALLOWED:** Always use `useConfirm()` with message: "Changing this permission will immediately affect what this staff member can do."

## 3. No Suppressing Audit Logs
**FORBIDDEN:** Any client-side workaround that skips permission change logging.

## 4. No Self-Permission Modification
**FORBIDDEN:** Allowing an admin to modify their own permission set from this module.
**ALLOWED:** Read-only display for the authenticated admin's own permissions.

## 5. CODEOWNERS Review Required
Any PR touching this module path requires human reviewer approval (Rule 76).

## 6. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.

## Canonical Sub-Module Isolation Invariants (Architecture Rule 40)

These constraints apply to this leaf in addition to the feature-specific prohibitions above. The canonical rule authority remains `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`, Rule 40; this list makes the local boundary explicit without changing that authority.

1. **Zero cross-sub-module business imports:** do not import sibling leaf components, hooks, stores, types, schemas, utilities, fixtures, or handlers.
2. **Zero parent shared folders:** do not create or consume parent `common/`, `shared/`, or business-aware `components/` folders.
3. **Strict WET isolation:** duplicate business-specific badges, filters, formatters, and UI patterns locally when sharing them would couple leaves.
4. **Zero cross-sub-module in-memory state:** do not share React Context, Zustand stores, or mutable business objects with sibling leaves; use documented URL navigation and typed query parameters where approved.
5. **Local fixture ownership:** keep this leaf's fixtures, MSW handlers, scenarios, and mock tests inside this leaf's `mocks/` and `tests/` directories.
6. **No duplicate global mock handlers:** do not register a second global handler for a leaf-owned endpoint or scenario.
7. **No sibling fixture imports:** do not import sample data or scenario factories owned by another business leaf.
8. **No fake business fallbacks:** do not fabricate records, statuses, IDs, amounts, permissions, or success responses to disguise missing API contracts.
9. **API boundary only:** UI components must not bypass the leaf API client to read fixtures directly or call backend endpoints ad hoc.
10. **No casual global MSW changes:** do not modify the role-wide MSW bootstrap for a leaf-local change unless registration is explicitly required by the existing harness contract.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.


## RBG34 — Permission action path and idempotency safety

Staff IDs are percent-encoded in the existing GET/PATCH/reset path builders. Mutation intent IDs use unambiguous JSON tuples including the `enabled` boolean so retry state cannot collide across distinct permission payloads. These frontend protections DO NOT establish backend self-permission denial; `ISSUE-229` and `ISSUE-230` remain open external contract/authorization findings.

## Final handoff: retained security gates

- **FORBIDDEN:** treating the shared browser UI lock as backend authorization, self-permission enforcement, tenant isolation, or server-side idempotency proof.
- **FORBIDDEN:** replacing the shared feature intent registry with per-hook-only retry keys or returning success before mutation settlement.
- **REQUIRED BEFORE RELEASE:** CODEOWNERS review, authenticated RBAC tests against the actual server, and verification of server audit logging and self-permission restrictions. ISSUE-229/230 remain open until backed by authoritative contracts/evidence.
