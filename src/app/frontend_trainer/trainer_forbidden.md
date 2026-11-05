# frontend_trainer — Role Boundary

- Only `trainer_navigation/` plus the six canonical `trainer_*` business domain containers are permitted at role root.
- No obsolete legacy business folders, adapter route trees or `trainer_infrastructure/` sibling.
- Domain roots contain only `page.tsx`, `layout.tsx`, the documentation trio, and autonomous submodule directories.
- No sub-submodules, nano-submodules, shared business `common/` folders, cross-leaf imports, or invented backend contracts.
- No destructive removal of current business features merely to satisfy static checks; retire only duplicate routes and obsolete compatibility code.
