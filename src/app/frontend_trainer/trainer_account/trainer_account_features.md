# trainer_account: Trainer domain container

This domain owns secondary navigation and index redirect only. Business behavior is contained in autonomous leaves.

## Autonomous submodules
- `account_notifications/`: independently routed capability
- `account_personal_profile/`: independently routed capability
- `account_security/`: independently routed capability

## Isolation
No sibling business imports, cross-domain business imports, or feature business code at this domain root.
