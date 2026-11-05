/**
 * Development & test session service fixture.
 * Strictly used in development / test environments; rejects calls under production.
 */

export interface AuthDemoUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'MANAGER' | 'TRAINER';
  tenantId: string;
}

export interface AuthDemoCredentials {
  accessToken: string;
  refreshToken: string;
  user: AuthDemoUser;
}

const DEMO_USERS: Record<AuthDemoUser['role'], AuthDemoUser> = {
  SUPERADMIN: {
    id: 'mock-superadmin',
    name: 'Demo Superadmin',
    email: 'demo_admin@gym.com',
    role: 'SUPERADMIN',
    tenantId: 'tenant-global',
  },
  ADMIN: {
    id: 'mock-admin',
    name: 'Demo Admin',
    email: 'admin@gymsmart.com',
    role: 'ADMIN',
    tenantId: 'tenant-demo',
  },
  MANAGER: {
    id: 'mock-manager',
    name: 'Demo Manager',
    email: 'manager@gymsmart.com',
    role: 'MANAGER',
    tenantId: 'tenant-demo',
  },
  TRAINER: {
    id: 'mock-trainer',
    name: 'Demo Trainer',
    email: 'trainer@gymsmart.com',
    role: 'TRAINER',
    tenantId: 'tenant-demo',
  },
};

interface SessionRecord {
  accessToken: string;
  refreshToken: string;
  user: AuthDemoUser;
  idempotencyKey?: string;
  fingerprint?: string;
}

// In-memory session store
const sessionsByAccessToken = new Map<string, SessionRecord>();
const sessionsByRefreshToken = new Map<string, SessionRecord>();
const intentMap = new Map<string, { fingerprint: string; credentials: AuthDemoCredentials }>();

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export const AuthDemoSessionService = {
  findByCredentials(email: string, _password: string): AuthDemoUser | null {
    const normalized = email.trim().toLowerCase();
    for (const user of Object.values(DEMO_USERS)) {
      if (user.email.toLowerCase() === normalized) {
        return user;
      }
    }
    return null;
  },

  findByRole(role: AuthDemoUser['role']): { readonly user: AuthDemoUser; readonly password: string } {
    const user = DEMO_USERS[role] || DEMO_USERS.ADMIN;
    return {
      user,
      password: 'DemoPassword123!',
    };
  },

  issueSession(user: AuthDemoUser): AuthDemoCredentials {
    const accessToken = `mock_access_${generateId()}`;
    const refreshToken = `mock_refresh_${generateId()}`;
    const creds: AuthDemoCredentials = {
      accessToken,
      refreshToken,
      user,
    };
    const record: SessionRecord = {
      ...creds,
    };
    sessionsByAccessToken.set(accessToken, record);
    sessionsByRefreshToken.set(refreshToken, record);
    return creds;
  },

  issueSessionForIntent(
    user: AuthDemoUser,
    key: string,
    fingerprint: string
  ): AuthDemoCredentials | null {
    const existing = intentMap.get(key);
    if (existing) {
      if (existing.fingerprint !== fingerprint) {
        // Idempotency conflict: same key with different intent/payload
        return null;
      }
      return existing.credentials;
    }

    const creds = this.issueSession(user);
    intentMap.set(key, { fingerprint, credentials: creds });
    return creds;
  },

  resolveUserByAccessToken(token: string): AuthDemoUser | null {
    const record = sessionsByAccessToken.get(token);
    return record ? record.user : null;
  },

  isRefreshIdempotencyConflict(key: string, token: string): boolean {
    const existing = intentMap.get(key);
    if (!existing) return false;
    return existing.fingerprint !== token;
  },

  refreshSession(
    token: string,
    key?: string
  ): { accessToken: string; refreshToken: string } | null {
    if (key) {
      const existing = intentMap.get(key);
      if (existing) {
        if (existing.fingerprint !== token) {
          return null;
        }
        return {
          accessToken: existing.credentials.accessToken,
          refreshToken: existing.credentials.refreshToken,
        };
      }
    }

    const record = sessionsByRefreshToken.get(token);
    if (!record) return null;

    // Invalidate old tokens
    sessionsByAccessToken.delete(record.accessToken);
    sessionsByRefreshToken.delete(record.refreshToken);

    const newAccessToken = `mock_access_${generateId()}`;
    const newRefreshToken = `mock_refresh_${generateId()}`;

    const newRecord: SessionRecord = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: record.user,
      idempotencyKey: key,
    };

    sessionsByAccessToken.set(newAccessToken, newRecord);
    sessionsByRefreshToken.set(newRefreshToken, newRecord);

    const creds = { accessToken: newAccessToken, refreshToken: newRefreshToken };
    if (key) {
      intentMap.set(key, {
        fingerprint: token,
        credentials: { ...creds, user: record.user },
      });
    }

    return creds;
  },

  revokeSession(accessToken: string | undefined, refreshToken: string | undefined): void {
    if (accessToken) {
      const rec = sessionsByAccessToken.get(accessToken);
      if (rec) {
        sessionsByAccessToken.delete(accessToken);
        sessionsByRefreshToken.delete(rec.refreshToken);
      }
    }
    if (refreshToken) {
      const rec = sessionsByRefreshToken.get(refreshToken);
      if (rec) {
        sessionsByRefreshToken.delete(refreshToken);
        sessionsByAccessToken.delete(rec.accessToken);
      }
    }
  },

  resetMockSessions(): void {
    sessionsByAccessToken.clear();
    sessionsByRefreshToken.clear();
    intentMap.clear();
  },
};

export default AuthDemoSessionService;

