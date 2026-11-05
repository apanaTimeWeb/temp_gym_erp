# Forbidden Patterns — `admin/members`

## 1. No Write Operations
**FORBIDDEN:** Add Member, Edit Member, Renew, Record Payment, or Delete Member in this module.
**REASON:** Admin role is read-only for member operations. Those actions belong to the Manager.

## 2. No Unmasked Phone Numbers in List View
**FORBIDDEN:** Displaying full phone numbers in the member table.
**ALLOWED:** Mask with `maskSensitiveData()` from `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMaskSensitiveData`. Full number visible only in profile modal.

## 3. No View/Eye Button
**FORBIDDEN:** A dedicated "View" or eye-icon button on table rows.
**ALLOWED:** The entire row is clickable (Rule 19) and opens the member profile.

## 4. No Client-Side Pagination
**FORBIDDEN:** Fetching all members and paginating in the browser.
**ALLOWED:** Always pass `page` + `limit` to the API.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
