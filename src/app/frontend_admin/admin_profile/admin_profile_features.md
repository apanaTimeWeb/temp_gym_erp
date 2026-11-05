# Admin Profile — Canonical Domain Feature Map (RBG 20)

The only canonical leaf is `frontend_admin/admin_profile/profile_overview/`.
Domain root `page.tsx` redirects to the leaf. No sibling feature dependency is permitted.

| Capability | Verified physical file |
|---|---|
| Route | `profile_overview/page.tsx` |
| Profile main UI | `profile_overview/components/main_view/AdminProfileOverviewMain.tsx` |
| Password field | `profile_overview/components/password_field/AdminProfileOverviewPasswordField.tsx` |
| Read/update profile API | `profile_overview/api/admin_profile_overview_api.ts` |
| Profile and password form logic | `profile_overview/hooks/useAdminProfileOverviewLogic.ts` |
| Dirty-form guard | `profile_overview/hooks/useAdminProfileOverviewUnsavedChangesGuard.ts` |
| Contract and test harness | `profile_overview/admin_profile_overview_features.md`, `profile_overview/tests/harness/AdminProfileOverviewHarness.tsx` |

**Lifecycle:** Read and Update are implemented by verified frontend API definitions (`updateProfile`, `updatePassword`). No Create/Delete profile operation is established by this leaf.

**Host infrastructure:** The owning role layout mounts `AdminNavigationLayoutConfirmProvider`. Its host hook must be used by the dirty-form guard. The isolated test harness explicitly mounts the same provider. No new backend URLs or session authority are claimed here.

**History:** Historical legacy paths `admin_profile_api/`, `admin_profile_components/`, `admin_profile_hooks/` and old `AdminProfileMain.tsx` names have been retired and are not current implementation paths. Refer to the canonical leaf specification for the complete 22-section contract.
