/**
 * @description Defines the external prop contract for the manager-wide command palette.
 * @dependencies No runtime dependencies; consumed only by the ManagerNavigationCommandPalette presentation layer.
 * @edge-case The open request is optional so the command palette remains keyboard-first while supporting an explicit shell trigger.
 */
export interface ManagerNavigationCommandPaletteProps {
  requestedOpen?: boolean;
  onRequestedOpenHandled?: () => void;
}

import type { LucideIcon } from 'lucide-react';

export interface ManagerNavigationCommandItem {
  href: string;
  labelKey: string;
  label: string;
  icon: LucideIcon;
}
