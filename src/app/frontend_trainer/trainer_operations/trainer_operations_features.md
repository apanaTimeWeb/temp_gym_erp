# trainer_operations: Trainer domain container

This domain owns secondary navigation and index redirect only. Business behavior is contained in autonomous leaves.

## Autonomous submodules
- `operations_leave_requests/`: independently routed capability
- `operations_member_attendance/`: independently routed capability
- `operations_trainer_attendance/`: independently routed capability
- `operations_weekly_availability/`: independently routed capability

## Isolation
No sibling business imports, cross-domain business imports, or feature business code at this domain root.
