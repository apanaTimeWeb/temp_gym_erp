import type { ApiResponse } from '@/lib/api';
import { handleAdminMockApiRequest } from '@/lib/adminMockHandlers';
import { handleManagerMockApiRequest } from '@/lib/managerMockHandlers';
import { handleSuperadminMockApiRequest } from '@/lib/superadminMockHandlers';
import { handleTrainerMockApiRequest } from '@/lib/trainerMockHandlers';

function getStoredUser() {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('gymsmart_user');
      if (raw) return JSON.parse(raw);
    } catch {
      // Storage access fallback
    }
  }
  return null;
}

function buildMockSuccess<T>(data: T, message = 'Success', meta?: any): ApiResponse<T> {
  const requestId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}`;
  const envelope = {
    success: true as const,
    message,
    data,
    meta,
    requestId,
    status: 200,
    ok: true,
    json: async () => envelope,
    text: async () => JSON.stringify(envelope),
  };
  return envelope as unknown as ApiResponse<T>;
}

export function handleMockApiRequest(endpoint: string, options: RequestInit = {}): ApiResponse<any> | null {
  const method = (options.method || 'GET').toUpperCase();
  const urlPath = endpoint.split('?')[0];
  const queryStr = endpoint.includes('?') ? endpoint.split('?')[1] : '';
  const searchParams = new URLSearchParams(queryStr);

  // SUPERADMIN ENDPOINTS
  if (urlPath.startsWith('/superadmin') || urlPath.startsWith('/api/v1/superadmin') || urlPath.startsWith('/frontend_superadmin')) {
    const superadminResponse = handleSuperadminMockApiRequest(urlPath, method, searchParams, options);
    if (superadminResponse) return superadminResponse;
  }

  // GLOBAL EXPORT & AUTH PROXIES
  if (urlPath === '/export-data' || urlPath.endsWith('/export-data')) {
    return buildMockSuccess({ downloadUrl: '/__mocks__/superadmin/export.csv', jobId: `job_${Date.now()}` }, 'Export generated successfully');
  }
  if (urlPath === '/auth/set-cookie' || urlPath.endsWith('/auth/set-cookie')) {
    return buildMockSuccess({ authenticated: true }, 'Session authenticated');
  }

  // MANAGER ENDPOINTS
  if (urlPath.startsWith('/api/v1/manager') || urlPath.startsWith('/manager')) {
    const managerResponse = handleManagerMockApiRequest(urlPath, method, searchParams, options);
    if (managerResponse) return managerResponse;
  }

  // TRAINER ENDPOINTS
  if (
    urlPath.startsWith('/trainer') ||
    urlPath.startsWith('/frontend_trainer') ||
    urlPath.startsWith('/api/v1/trainer') ||
    urlPath.startsWith('/api/trainer')
  ) {
    const trainerResponse = handleTrainerMockApiRequest(urlPath, method, searchParams, options);
    if (trainerResponse) return trainerResponse;
  }

  // 1. AUTH ENDPOINTS
  if (
    urlPath === '/frontend_auth/auth/demo_login' ||
    urlPath === '/frontend_auth/auth/demo-login' ||
    urlPath === '/auth/demo-login' ||
    urlPath === '/auth/demo_login'
  ) {
    let role = 'TRAINER';
    try {
      if (options.body && typeof options.body === 'string') {
        const parsed = JSON.parse(options.body);
        if (parsed.role) role = String(parsed.role).toUpperCase();
      }
    } catch {
      // Use default
    }

    const validRoles = ['SUPERADMIN', 'ADMIN', 'MANAGER', 'TRAINER'] as const;
    const finalRole = validRoles.includes(role as any) ? role : 'TRAINER';

    const roleNameMap: Record<string, string> = {
      TRAINER: 'Michael Trainer',
      SUPERADMIN: 'Super Admin',
      ADMIN: 'Branch Admin',
      MANAGER: 'Operations Manager',
    };

    const user = {
      id: `usr_${finalRole.toLowerCase()}_01`,
      name: roleNameMap[finalRole] || `${finalRole} User`,
      email: `${finalRole.toLowerCase()}@smartgym360.com`,
      role: finalRole,
      tenantId: 'gym_demo_01',
    };

    const token = `mock_access_${finalRole.toLowerCase()}_${Date.now()}`;

    // Set browser session cookies and storage
    if (typeof document !== 'undefined') {
      document.cookie = `gymsmart_token=${token}; path=/; max-age=86400`;
      document.cookie = `gymsmart_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('gymsmart_token', token);
        localStorage.setItem('gymsmart_user', JSON.stringify(user));
      } catch {
        // Storage access fallback
      }
    }

    return buildMockSuccess(user, 'Demo authentication successful');
  }

  if (urlPath === '/frontend_auth/auth/session' || urlPath === '/auth/session') {
    if (method === 'POST') {
      let email = 'trainer@smartgym360.com';
      try {
        if (options.body && typeof options.body === 'string') {
          const parsed = JSON.parse(options.body);
          if (parsed.email) email = parsed.email;
        }
      } catch {
        // Fallback
      }

      let role = 'TRAINER';
      if (email.includes('superadmin')) role = 'SUPERADMIN';
      else if (email.includes('admin')) role = 'ADMIN';
      else if (email.includes('manager')) role = 'MANAGER';

      const user = {
        id: `usr_${role.toLowerCase()}_01`,
        name: role === 'TRAINER' ? 'Michael Trainer' : 'Authorized User',
        email,
        role,
        tenantId: 'gym_demo_01',
      };

      const token = `token_${role.toLowerCase()}_${Date.now()}`;
      if (typeof document !== 'undefined') {
        document.cookie = `gymsmart_token=${token}; path=/; max-age=86400`;
        document.cookie = `gymsmart_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;
      }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('gymsmart_token', token);
          localStorage.setItem('gymsmart_user', JSON.stringify(user));
        } catch {
          // Storage fallback
        }
      }

      return buildMockSuccess(user, 'Login successful');
    }

    // GET session check: prioritize active stored user
    const stored = getStoredUser();
    const user = stored || {
      id: 'usr_trainer_01',
      name: 'Michael Trainer',
      email: 'trainer@smartgym360.com',
      role: 'TRAINER',
      tenantId: 'gym_demo_01',
    };
    return buildMockSuccess(user, 'Session active');
  }

  if (urlPath === '/auth/me' || urlPath === '/frontend_auth/auth/me') {
    const stored = getStoredUser();
    const user = stored || {
      id: 'usr_trainer_01',
      name: 'Michael Trainer',
      email: 'trainer@smartgym360.com',
      role: 'TRAINER',
      tenantId: 'gym_demo_01',
    };
    return buildMockSuccess(user, 'Current user retrieved');
  }

  // 2. ADMIN ENDPOINTS
  if (
    urlPath.startsWith('/admin') ||
    urlPath.startsWith('/frontend_admin') ||
    urlPath.startsWith('/api/v1/admin') ||
    urlPath.startsWith('/api/admin')
  ) {
    const adminResponse = handleAdminMockApiRequest(urlPath, method, searchParams, options);
    if (adminResponse) return adminResponse;
  }

  // Fallback for Admin Endpoints
  const adminFallback = handleAdminMockApiRequest(urlPath, method, searchParams, options);
  if (adminFallback) return adminFallback;

  // Fallback for Trainer Endpoints
  const trainerResponse = handleTrainerMockApiRequest(urlPath, method, searchParams, options);
  if (trainerResponse) return trainerResponse;

  return null;
}
