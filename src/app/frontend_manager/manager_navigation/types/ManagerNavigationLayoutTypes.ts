// RESPONSIBILITY: Defines all TypeScript prop interfaces for MANAGER layout shell components (Header, Sidebar). Single source of truth for layout prop contracts.

export interface ManagerNavigationSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (v: boolean) => void;
}

export interface ManagerNavigationHeaderProps {
  title: string;
  subtitle?: string;
  branchName?: string;
  isSidebarCollapsed?: boolean;
  isMobileSidebarOpen?: boolean;
  isMobileViewport?: boolean;
  onToggleSidebar?: () => void;
  onOpenCommandPalette?: () => void;
}
