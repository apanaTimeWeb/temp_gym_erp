# Notification feature boundary
- No imports from sibling communication_messaging_center or communication_broadcasts_campaigns.
- No shared role-level business logic, no nested feature or nano-modules.
- No invented API fields, colors or server authorization.
- Preserve idempotency, mutable mock state, focus/keyboard and retry behavior.
