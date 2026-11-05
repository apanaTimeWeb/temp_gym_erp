import { SUPERADMIN_PLATFORM_SHELL_LAYOUT_ERROR_BOUNDARY_VARIANTS, SUPERADMIN_PLATFORM_SHELL_LAYOUT_THEMES } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/constants/superadmin_platform_shell_layout.constants';

import type { ReactNode } from 'react';


export interface SuperadminPlatformShellLayoutErrorBoundaryProps {
  children: ReactNode;
  variant?: (typeof SUPERADMIN_PLATFORM_SHELL_LAYOUT_ERROR_BOUNDARY_VARIANTS)[number];
  testId?: string;
}

export interface SuperadminPlatformShellLayoutErrorBoundaryState {
  hasError: boolean;
}

export interface SuperadminPlatformShellLayoutErrorBoundaryCopy {
  title: string;
  retry: string;
}


export type SuperadminTheme = typeof SUPERADMIN_PLATFORM_SHELL_LAYOUT_THEMES[number];

export interface SuperadminThemeContextValue {
  theme: SuperadminTheme;
}

export interface SuperadminSocketEnvelope {
  event: string;
  payload: unknown;
}

export type SuperadminSocketHandler = (payload: unknown) => void;

export interface SuperadminSocketContextValue {
  subscribe: (event: string, handler: SuperadminSocketHandler) => () => void;
  connected: boolean;
}

export interface SuperadminPlatformShellLayoutMainProps {
  children: ReactNode;
}

export interface SuperadminPlatformShellLayoutThemeProviderProps {
  children: ReactNode;
}

export interface SuperadminPlatformShellLayoutSocketProviderProps {
  children: ReactNode;
}

export interface SuperadminNextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
