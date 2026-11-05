// RESPONSIBILITY: Builds Manager mock API URLs from the centralized application API base configuration.

import { ManagerEnvConfig } from "@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig";

/** Builds a normalized URL for a Manager feature mock endpoint. */
export function ManagerInfrastructureMockApiUrl(path: string): string {
  const base = ManagerEnvConfig.apiBaseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const basePath = (() => {
    try { return new URL(base, 'http://manager.local').pathname.replace(/\/$/, ''); }
    catch { return ''; }
  })();
  if (basePath && basePath !== '/' && normalizedPath.startsWith(`${basePath}/`)) {
    const origin = (() => { try { return new URL(base).origin; } catch { return ''; } })();
    return `${origin}${normalizedPath}`;
  }
  return `${base}${normalizedPath}`;
}
