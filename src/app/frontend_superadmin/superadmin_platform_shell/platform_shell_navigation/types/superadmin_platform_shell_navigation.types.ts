// RESPONSIBILITY: Defines all TypeScript prop interfaces for ADMIN layout shell components (Header, Sidebar). Single source of truth for layout prop contracts.

export interface SuperadminPlatformShellLayoutSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}
