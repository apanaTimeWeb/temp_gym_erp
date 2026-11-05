# Forbidden Patterns — `admin/audit_logs`

## 1. No Delete or Edit of Log Entries
**FORBIDDEN:** Any button, form, or API call that modifies or deletes audit log records.
**REASON:** Audit logs are an immutable compliance record.

## 2. No Client-Side Full-Table Fetch
**FORBIDDEN:** Fetching all audit log records and filtering/paginating on the client.
**ALLOWED:** Always pass `page`, `limit`, and filter params to the backend API.

## 3. No Raw ISO Timestamp Display
**FORBIDDEN:** Rendering `log.timestamp` directly in JSX.
**ALLOWED:** Always convert to local time with `date-fns` or `dayjs` before display.

## 4. No Hardcoded Backend Path
**FORBIDDEN:** `'/admin/audit-logs'` string literals in components or hooks.
**ALLOWED:** Import from `module URL config`.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply — see `frontend_admin/admin_forbidden.md` for global admin rules.

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
