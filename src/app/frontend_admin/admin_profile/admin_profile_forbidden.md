# Forbidden Patterns — `admin_profile/profile_overview`

## 1. No `'use client'` in `page.tsx`
**FORBIDDEN:** Adding `'use client'` to the top-level `page.tsx`.
**ALLOWED:** `page.tsx` must remain a Server Component. Only `AdminProfileOverviewMain.tsx` (in `components/main_view/`) uses `'use client'`.

## 2. No Editable Email Field
**FORBIDDEN:** An email input that is enabled for editing.
**REASON:** Email changes require Superadmin intervention and cannot be done self-service.
**ALLOWED:** Email displayed as a read-only `<input readOnly>` with a helper text.

## 3. No Password Fields Without Eye Toggle
**FORBIDDEN:** `<input type="password">` without a visibility toggle button.
**ALLOWED:** Always pair with `Eye`/`EyeOff` from `lucide-react` (Rule 23).

## 4. No Cross-Admin Profile Access
**FORBIDDEN:** Fetching another admin's profile from this module.
**ALLOWED:** Only the authenticated user's own profile data.

## 5. No `useState` Directly in `AdminProfileOverviewMain.tsx`
**FORBIDDEN:** Form state managed directly in the component with individual `useState` calls.
**ALLOWED:** All form state and handlers via `useAdminProfileOverviewLogic` from `hooks/`.

## 6. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.


## Source inventory note
The current leaf uses `components/main_view/AdminProfileOverviewMain.tsx` and `hooks/useAdminProfileOverviewLogic.ts`. The names above refer to this physical leaf, not the retired `profile_components/` or `profile_hooks/` layout.
