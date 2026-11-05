# Forbidden Patterns — `gyms_directory`

- Do not create a new primary sidebar item for this submodule.
- Do not invent or change backend endpoints, request/response schemas, status vocabularies, or permissions.
- Do not introduce sibling business imports, barrel files, generic shared folders, or route groups.
- Do not remove the current legacy route or alter query semantics before an exact source/import manifest proves compatibility.
- Do not move only a caller or only a dependency if that creates broken imports or cross-leaf business imports.
- Do not add business logic to this route shim; migrate complete dependency-coherent code in later bounded RBGs.
- Do not use localStorage for business entity data or expose secrets/PII in client bundles/telemetry.
- Do not use raw browser alerts, inline styles, raw colors, or semantic color opacity modifiers.
