// RESPONSIBILITY: Canonical zero-business Admin shell prop/type contracts.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutTypes.ts)

export interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export type AdminDensity = 'comfortable' | 'compact';

export interface AdminDensityContextValue {
  density: AdminDensity;
  setDensity: (density: AdminDensity) => void;
  toggleDensity: () => void;
}

export interface AdminNavigationLayoutHeaderProfileProps {
  profileHref: string;
  settingsHref: string;
}

export interface AdminRouteHeaderConfigValue {
  titleKey: string;
  subtitleKey: string;
}

export type AdminUrlQueryValue = string | number | null | undefined;

export interface AdminUrlQueryBinding {
  key: string;
  value: AdminUrlQueryValue;
  defaultValue: AdminUrlQueryValue;
  setValue: (value: AdminUrlQueryValue) => void;
}

export interface AdminNavigationLayoutDialogAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: { current: HTMLElement | null };
  containerRef?: import('react').RefObject<HTMLElement | null>;
}

export type AdminIdempotencyIntentRegistry = Map<string, string>;

export type AdminSocketListener = (payload: unknown) => void;

export interface AdminNavigationLayoutWebSocketContextValue {
  connected: boolean;
  subscribe: (eventName: string, listener: AdminSocketListener) => () => void;
}

export interface AdminNavigationLayoutDensityProviderProps {
  children: import('react').ReactNode;
}

export interface AdminNavigationLayoutI18nProviderProps {
  children: import('react').ReactNode;
}

export interface AdminNavigationLayoutWebSocketProviderProps {
  children: import('react').ReactNode;
  url?: string;
}

export interface AdminNavigationLayoutNotFoundProps {
  title?: string;
  description?: string;
  returnLink?: string;
  returnText?: string;
}

export interface AdminNavigationLayoutToastOptions {
  id?: string;
}

export interface AdminRootLayoutProps {
  children: import('react').ReactNode;
}
