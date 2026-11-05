# Manager Navigation — Theme Contract

Use semantic surface, border, text, primary, and focus tokens only. Active links must be distinguishable without color alone. Preserve visible focus, keyboard navigation, reduced motion, mobile focus restore, 200% zoom, and accessible labels when visual labels are hidden.


## Command Palette Token Contract
The command palette consumes `bg-overlay-backdrop`, `bg-overlay`, `bg-card`, `bg-input`, `border-border`, `text-text-primary`, `text-text-secondary`, `text-text-disabled`, `bg-surface-hover`, `text-primary`, `ring-focus-ring`, and `shadow-dialog`. Its modal layer uses the shared `z-40` overlay tier; `z-50` remains reserved for toasts and critical alerts. Focus indicators remain visible and the palette supports Escape, Tab/Shift+Tab containment, Arrow Up/Down, and Enter.
