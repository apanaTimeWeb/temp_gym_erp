import type { ReactNode } from 'react';

/** Props for the authenticated Trainer navigation shell orchestrator. */
export interface TrainerNavigationMainProps {
  /** Authenticated route content rendered inside the Trainer shell. */
  children: ReactNode;
}

/** Props for the Trainer header presentation. */
export interface TrainerNavigationHeaderProps {
  title: string;
  subtitle?: string;
  /** Whether the desktop sidebar is collapsed. */
  isSidebarCollapsed: boolean;
  /** Whether the responsive mobile navigation drawer is open. */
  isMobileSidebarOpen: boolean;
  /** Whether the viewport currently uses the mobile drawer pattern. */
  isMobileViewport: boolean;
  /** Toggle the drawer on mobile or collapse the sidebar on desktop. */
  onToggleSidebar: () => void;
}

/** Props for the Trainer sidebar and its desktop collapsed state. */
export interface TrainerNavigationSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  /** Responsive mobile drawer state is owned by the shell orchestrator. */
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}
