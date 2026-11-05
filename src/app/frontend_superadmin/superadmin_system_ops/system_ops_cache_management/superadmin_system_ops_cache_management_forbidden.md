# Cache boundaries

- No sibling business imports or shared parent business folder.
- No node-monitoring workflow inside this cache screen.
- No API response data in Zustand or browser storage.
- No single-click cache flush; confirmation is required.
- No new idempotency key for retries of the same intent.
- No UI fixture fallback or fake success.
- Keep domain-aware helpers, mocks, schemas and tests local under strict WET.
