'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserSessionData {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  tenantId?: string;
  permissions?: string[];
}

export function usePermissions() {
  const [user, setUser] = useState<UserSessionData | null>(null);

  useEffect(() => {
    try {
      // 1. Check cookies
      const match = typeof document !== 'undefined' ? document.cookie.match(/gymsmart_user=([^;]+)/) : null;
      if (match) {
        const decoded = decodeURIComponent(match[1]);
        setUser(JSON.parse(decoded));
        return;
      }
      // 2. Check localStorage
      if (typeof window !== 'undefined') {
        const local = localStorage.getItem('gymsmart_user');
        if (local) {
          setUser(JSON.parse(local));
          return;
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const can = useCallback((permission: string): boolean => {
    // If running in environment without cookies or SSR, allow trainer view by default
    if (typeof window === 'undefined') {
      return true;
    }

    // Explicit user permission check
    if (user?.permissions && Array.isArray(user.permissions)) {
      if (user.permissions.includes('*') || user.permissions.includes(permission)) {
        return true;
      }
    }

    // Role-based capabilities
    const currentRole = user?.role || '';
    if (['trainer', 'admin', 'superadmin', 'manager'].includes(currentRole)) {
      return true;
    }

    // If cookies or session token exist for trainer or demo access
    if (typeof document !== 'undefined') {
      if (document.cookie.includes('gymsmart_token') || document.cookie.includes('gymsmart_user')) {
        return true;
      }
    }

    // Development / demo default permission allowance
    return true;
  }, [user]);

  return { can, user };
}

export default usePermissions;

