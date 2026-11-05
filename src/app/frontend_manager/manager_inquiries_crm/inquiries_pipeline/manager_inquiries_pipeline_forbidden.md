# Manager Inquiries — Inquiries Management Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_inquiries_crm/inquiries_pipeline/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves. The physical root is `frontend_manager/manager_inquiries_crm/inquiries_pipeline/`; `manager_inquiries/` and `erp/inquiries` are retired legacy roots.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the verified domain redirect `/frontend_manager/manager_inquiries_crm` and all API endpoint literal values; do not advertise a `/frontend_manager/manager_inquiries` alias because no such route exists in the supplied archive.

# Forbidden Patterns for `manager_inquiries_crm/inquiries_pipeline`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix `useEffect` or state hooks inside UI components. All heavy logic MUST reside in the adjacent custom hook.
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/frontend_manager/manager_inquiries_crm/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use a customized `ConfirmationDrawer` or `Modal`.
5. **No Context for Async Data:** Do not use React Context for API data. Use TanStack Query for server/API data; use module-scoped Zustand only for UI-only shared state.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** UI components should not intercept API errors to show toasts; let the API interceptor or Zustand store handle notifications and state updates.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in custom hooks or stores, which then communicate with `inquiries_api`.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.


## State and outbound-action boundary
- UI components must not own local workflow state, asynchronous request state, outbound WhatsApp/mailto URL construction, popup handling, or send/retry status. Keep these in the adjacent feature hook/service and expose narrow callbacks to presentation components.
- Do not weaken this rule to match existing violations. The current archive still contains UI-side state/outbound behavior in toolbar/message/bulk-message/success components; those implementation files are outside the approved RBG-06 edit set and remain open for their owning RBG.
