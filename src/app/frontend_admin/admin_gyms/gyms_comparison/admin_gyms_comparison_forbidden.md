# Admin Gyms Comparison Forbidden Invariants

## 1. Cross-Role Isolation
- No cross-role imports to `frontend_superadmin`, `frontend_manager`, `frontend_trainer`, or `frontend_member`.
- Consume only canonical shared components from `@/components/*` or feature-local components.

## 2. Forbidden Libraries
- Do not import `moment` or `dayjs`.
- Use native `Intl` or approved project date helpers.

## 3. UI Invariants
- No raw `<img>` tags in TSX; use Next.js `Image`.
- No inline hardcoded color hex values; use semantic CSS tokens.
- No production `console.log` statements.
