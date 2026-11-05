# Forbidden Patterns — `admin/blacklist`

## 1. No Single-Click Blacklist or Unblacklist
**FORBIDDEN:** Calling the blacklist/unblacklist API on button click without a confirmation gate.
**ALLOWED:** Always wrap in `useConfirm()` with explicit consequence: "This will immediately block the member from all gym services."

## 2. No Empty Reason on Blacklist
**FORBIDDEN:** Submitting a blacklist request with an empty or whitespace-only reason.
**ALLOWED:** Validate `reason.trim().length > 0` before enabling the submit button.

## 3. No Direct `apiFetch` in Components
**ALLOWED:** All API calls go through the module's API client, not directly from `.tsx`.

## 4. No Hardcoded Status Styles
**FORBIDDEN:** Inline `className` ternaries for blacklist status badges.
**ALLOWED:** `BLACKLIST_STATUS_STYLES` constant from `utils/`.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
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


## RBG 47 mock safety prohibitions
- Do not create demo blacklist or fallback member IDs using millisecond timestamps: same-tick requests can collide. Use `crypto.randomUUID()` in module-local MSW handlers.
- Do not accept fractional, nonfinite, negative or unsafe integer mock pagination parameters; normalize them before slicing or generating pagination metadata.
- Do not infer new production endpoints, access policies or response fields from these mock-only safeguards.
