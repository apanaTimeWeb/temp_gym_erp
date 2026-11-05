# Trainer Role — Canonical Feature Map (v13)

The role container is `src/app/frontend_trainer/`. Business features are implemented **only** in six domain containers, with exactly 17 autonomous submodules. The role shell is owned by `trainer_navigation/` and is not a business domain.

## Business Domains

- `trainer_dashboard/`: overview
- `trainer_members/`: directory/profile and trainer notes
- `trainer_coaching/`: workout plans, exercise management, diet library/assignments, sessions, individual progress and comparison
- `trainer_operations/`: member attendance, trainer attendance, weekly availability and leave requests
- `trainer_earnings/`: earnings overview and ledger
- `trainer_account/`: notifications, personal profile and security

## Navigation and Routing

All page URLs use the corresponding physical `/frontend_trainer/...` route. Domain pages redirect to their primary leaf. Old `/trainer/...` **page paths are deliberately removed**; host bookmarks, authentication callbacks and cross-role links must update accordingly. Verified `/trainer/...` **backend API endpoints remain unchanged**.

## Verified Isolation

Each leaf owns its own UI/API/state/schemas/mocks/tests/contracts, and no leaf imports another leaf's business files. The role navigation module owns the role guard, sidebar, header, confirmation and socket providers; it is the exception documented in the architecture rulebook, not a duplicate business domain.

## Scope Limitations

This artifact does not include host `package.json`, the host `tsconfig.json`, actual host authentication, or backend services. Run integration, semantic type checking, browser accessibility, API contract and authorization tests in the host before deployment.
