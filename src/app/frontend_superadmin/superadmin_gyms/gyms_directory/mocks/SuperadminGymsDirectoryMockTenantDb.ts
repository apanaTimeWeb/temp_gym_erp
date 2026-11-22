import { PLANS_MASTER } from '../constants/SuperadminGymsDirectoryPlans';
import { INITIAL_SEEDED_TENANTS, INITIAL_SEEDED_EVENTS } from './SuperadminGymsDirectorySeedTenants';
import { getMrr } from '../utils/SuperadminGymsDirectoryTenantUtils';
import type {
  Tenant,
  TenantEvent,
  Plan,
  ListParams,
  ListResponse,
  CreateTenantInput,
  UpdateTenantInput,
  ProvisioningStepProgress,
} from '../types/SuperadminGymsDirectoryTenantTypes';

// In-memory data stores
let tenantsStore: Tenant[] = [...INITIAL_SEEDED_TENANTS];
let eventsStore: TenantEvent[] = [...INITIAL_SEEDED_EVENTS];

// Server simulation configuration
let enableRandomErrors = process.env.NEXT_PUBLIC_MOCK_CHAOS_ERRORS === 'true';
let forceProvisioningFailureStep: number | null = null;

export function setEnableRandomMockErrors(enabled: boolean): void {
  enableRandomErrors = enabled;
}

export function setForceProvisioningFailureStep(step: number | null): void {
  forceProvisioningFailureStep = step;
}

export function resetMockDatabase(): void {
  tenantsStore = [...INITIAL_SEEDED_TENANTS];
  eventsStore = [...INITIAL_SEEDED_EVENTS];
  forceProvisioningFailureStep = null;
}

/** Artificial network latency: 300 to 800ms */
function randomDelay(): Promise<void> {
  const ms = Math.floor(Math.random() * 500) + 300;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeThrowRandomError(): void {
  if (enableRandomErrors && Math.random() < 0.1) {
    throw new Error('Simulated random server error (10% chaos injection). Please retry.');
  }
}

export const mockTenantDb = {
  async getPlans(): Promise<Plan[]> {
    await randomDelay();
    maybeThrowRandomError();
    return [...PLANS_MASTER];
  },

  async listTenants(params: ListParams = {}): Promise<ListResponse<Tenant>> {
    await randomDelay();
    maybeThrowRandomError();

    const {
      page = 1,
      limit = 20,
      search = '',
      status = 'All',
      planId = 'All',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    let filtered = [...tenantsStore];

    // Search filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.gymName.toLowerCase().includes(q) ||
          t.ownerName.toLowerCase().includes(q) ||
          t.ownerEmail.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
      );
    }

    // Status filter
    if (status && status !== 'All') {
      const s = status.toUpperCase();
      if (s === 'ACTIVE') {
        filtered = filtered.filter((t) => t.accessStatus === 'ACTIVE');
      } else if (s === 'INACTIVE') {
        filtered = filtered.filter((t) => t.accessStatus === 'INACTIVE');
      } else if (['TRIAL', 'EXPIRED', 'CANCELLED'].includes(s)) {
        filtered = filtered.filter((t) => t.subscriptionState === s);
      }
    }

    // Plan filter
    if (planId && planId !== 'All') {
      const p = planId.toLowerCase();
      filtered = filtered.filter((t) => t.planId.toLowerCase() === p);
    }

    // Sorting
    filtered.sort((a, b) => {
      let valA: unknown;
      let valB: unknown;

      switch (sortBy) {
        case 'gymName':
        case 'name':
          valA = a.gymName.toLowerCase();
          valB = b.gymName.toLowerCase();
          break;
        case 'ownerName':
          valA = a.ownerName.toLowerCase();
          valB = b.ownerName.toLowerCase();
          break;
        case 'memberCount':
          valA = a.memberCount;
          valB = b.memberCount;
          break;
        case 'monthlyRevenue':
        case 'mrr':
          valA = getMrr(a, PLANS_MASTER);
          valB = getMrr(b, PLANS_MASTER);
          break;
        case 'lastStatusChangedAt':
          valA = new Date(a.lastStatusChangedAt).getTime();
          valB = new Date(b.lastStatusChangedAt).getTime();
          break;
        case 'planExpiresAt':
          valA = new Date(a.planExpiresAt).getTime();
          valB = new Date(b.planExpiresAt).getTime();
          break;
        case 'createdAt':
        default:
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
          break;
      }

      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (sortOrder === 'asc') {
        return valA < valB ? -1 : 1;
      }
      return valA > valB ? -1 : 1;
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      total,
      page: safePage,
      limit,
      totalPages,
    };
  },

  async getTenant(id: string): Promise<Tenant> {
    await randomDelay();
    maybeThrowRandomError();

    const tenant = tenantsStore.find((t) => t.id === id);
    if (!tenant) {
      throw new Error(`Tenant with ID ${id} not found`);
    }
    return { ...tenant };
  },

  async checkEmailExists(email: string): Promise<boolean> {
    await randomDelay();
    const clean = email.trim().toLowerCase();
    return tenantsStore.some((t) => t.ownerEmail.toLowerCase() === clean);
  },

  async createTenant(
    payload: CreateTenantInput,
    onProgress?: (step: ProvisioningStepProgress) => void
  ): Promise<Tenant> {
    maybeThrowRandomError();

    const steps = [
      { key: 'db', label: 'Creating database' },
      { key: 'migrations', label: 'Running migrations' },
      { key: 'seeds', label: 'Seeding data' },
      { key: 'admin', label: 'Creating admin user' },
      { key: 'email', label: 'Sending welcome email' },
    ];

    for (let i = 0; i < steps.length; i++) {
      const stepIndex = i + 1;
      const step = steps[i];

      onProgress?.({
        stepIndex,
        totalSteps: steps.length,
        stepKey: step.key,
        label: step.label,
        status: 'running',
        message: `In progress: ${step.label}...`,
      });

      await new Promise((resolve) => setTimeout(resolve, 550));

      if (forceProvisioningFailureStep === stepIndex) {
        onProgress?.({
          stepIndex,
          totalSteps: steps.length,
          stepKey: step.key,
          label: step.label,
          status: 'failed',
          message: `Failed at step ${stepIndex}: ${step.label} error simulated.`,
        });
        throw new Error(`Provisioning failed during "${step.label}".`);
      }

      onProgress?.({
        stepIndex,
        totalSteps: steps.length,
        stepKey: step.key,
        label: step.label,
        status: 'success',
        message: `Completed: ${step.label}`,
      });
    }

    const now = new Date();
    const isTrial = payload.startType === 'TRIAL';
    const trialDays = payload.trialDays || 14;
    const expires = new Date(now.getTime() + (isTrial ? trialDays : 30) * 24 * 60 * 60 * 1000);

    const id = `gym-${String(tenantsStore.length + 1).padStart(3, '0')}`;
    const code = payload.gymName.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() + String(tenantsStore.length + 1).slice(-2);

    const newTenant: Tenant = {
      id,
      code,
      gymName: payload.gymName.trim(),
      tenantSlug: payload.tenantSlug || payload.gymName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 24),
      name: payload.gymName.trim(),
      ownerName: payload.ownerName.trim(),
      ownerEmail: payload.adminEmail.trim().toLowerCase(),
      adminEmail: payload.adminEmail.trim().toLowerCase(),
      phone: payload.phone.trim(),
      planId: payload.planId,
      plan: payload.planId.charAt(0).toUpperCase() + payload.planId.slice(1),
      accessStatus: 'ACTIVE',
      subscriptionState: isTrial ? 'TRIAL' : 'ACTIVE',
      status: isTrial ? 'TRIAL' : 'ACTIVE',
      planActivatedAt: now.toISOString(),
      planExpiresAt: expires.toISOString(),
      lastStatusChangedAt: now.toISOString(),
      lastStatusChangedBy: 'SuperAdmin Provisioning',
      memberCount: payload.memberCount || 0,
      createdAt: now.toISOString(),
      address: payload.address,
      city: payload.city,
      state: payload.state,
      postalCode: payload.postalCode,
      currency: payload.currency || 'INR',
      timezone: payload.timezone || 'Asia/Kolkata',
      billingCycle: payload.billingCycle || 'MONTHLY',
      aadharNumber: payload.aadharNumber,
      gstNumber: payload.gstNumber,
      startType: payload.startType,
      trialDays: payload.trialDays,
      sendWelcomeEmail: payload.sendWelcomeEmail,
    };

    tenantsStore.unshift(newTenant);

    // Append TenantEvent
    eventsStore.unshift({
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      tenantId: id,
      eventType: 'PROVISIONED',
      toValue: 'ACTIVE',
      reason: isTrial ? 'Initial Trial Provisioning' : 'Paid Subscription Provisioning',
      note: `Provisioned with plan: ${payload.planId}, members: ${payload.memberCount}`,
      actorName: 'SuperAdmin',
      createdAt: now.toISOString(),
    });

    return { ...newTenant };
  },

  async updateTenant(id: string, payload: UpdateTenantInput): Promise<Tenant> {
    await randomDelay();
    maybeThrowRandomError();

    const idx = tenantsStore.findIndex((t) => t.id === id);
    if (idx === -1) {
      throw new Error(`Tenant ${id} not found`);
    }

    const current = tenantsStore[idx];
    const now = new Date().toISOString();
    const updated: Tenant = { ...current };

    // Record individual events for changes
    if (payload.planId && payload.planId !== current.planId) {
      eventsStore.unshift({
        id: `evt-${Date.now()}-plan`,
        tenantId: id,
        eventType: 'PLAN_CHANGE',
        fromValue: current.planId,
        toValue: payload.planId,
        reason: payload.statusChangeReason || 'Plan Modified',
        note: payload.statusChangeNote || undefined,
        actorName: 'SuperAdmin',
        createdAt: now,
      });
      updated.planId = payload.planId;
    }

    if (payload.planExpiresAt && payload.planExpiresAt !== current.planExpiresAt) {
      eventsStore.unshift({
        id: `evt-${Date.now()}-exp`,
        tenantId: id,
        eventType: 'EXPIRY_CHANGE',
        fromValue: current.planExpiresAt,
        toValue: payload.planExpiresAt,
        reason: payload.statusChangeReason || 'Expiry Date Adjusted',
        note: payload.statusChangeNote || undefined,
        actorName: 'SuperAdmin',
        createdAt: now,
      });
      updated.planExpiresAt = payload.planExpiresAt;
    }

    if (payload.accessStatus && payload.accessStatus !== current.accessStatus) {
      eventsStore.unshift({
        id: `evt-${Date.now()}-access`,
        tenantId: id,
        eventType: 'ACCESS_CHANGE',
        fromValue: current.accessStatus,
        toValue: payload.accessStatus,
        reason: payload.statusChangeReason || 'Access Status Updated',
        note: payload.statusChangeNote || undefined,
        actorName: 'SuperAdmin',
        createdAt: now,
      });
      updated.accessStatus = payload.accessStatus;
      updated.lastStatusChangedAt = now;
      updated.lastStatusChangedBy = 'SuperAdmin';
    }

    if (payload.temporaryPassword) {
      eventsStore.unshift({
        id: `evt-${Date.now()}-pwd`,
        tenantId: id,
        eventType: 'PASSWORD_RESET',
        toValue: 'Reset Successful',
        reason: payload.statusChangeReason || 'Manual Password Reset',
        note: 'Superadmin reset administrative credentials.',
        actorName: 'SuperAdmin',
        createdAt: now,
      });
    }

    if (payload.gymName) updated.gymName = payload.gymName;
    if (payload.ownerName) updated.ownerName = payload.ownerName;
    if (payload.adminEmail) updated.ownerEmail = payload.adminEmail;
    if (payload.phone) updated.phone = payload.phone;
    if (payload.city !== undefined) updated.city = payload.city;
    if (payload.state !== undefined) updated.state = payload.state;
    if (payload.address !== undefined) updated.address = payload.address;
    if (payload.postalCode !== undefined) updated.postalCode = payload.postalCode;
    if (payload.gstNumber !== undefined) updated.gstNumber = payload.gstNumber;

    // General update event if non-status fields changed
    eventsStore.unshift({
      id: `evt-${Date.now()}-details`,
      tenantId: id,
      eventType: 'DETAILS_UPDATED',
      toValue: 'Updated',
      reason: payload.statusChangeReason || 'Details Updated',
      note: payload.statusChangeNote,
      actorName: 'SuperAdmin',
      createdAt: now,
    });

    tenantsStore[idx] = updated;
    return { ...updated };
  },

  async changeAccessStatus(
    id: string,
    accessStatus: 'ACTIVE' | 'INACTIVE',
    reason: string,
    note?: string
  ): Promise<Tenant> {
    await randomDelay();
    maybeThrowRandomError();

    const idx = tenantsStore.findIndex((t) => t.id === id);
    if (idx === -1) {
      throw new Error(`Tenant ${id} not found`);
    }

    const current = tenantsStore[idx];
    const now = new Date().toISOString();

    const updated: Tenant = {
      ...current,
      accessStatus,
      lastStatusChangedAt: now,
      lastStatusChangedBy: 'SuperAdmin',
    };

    eventsStore.unshift({
      id: `evt-${Date.now()}-status`,
      tenantId: id,
      eventType: 'ACCESS_CHANGE',
      fromValue: current.accessStatus,
      toValue: accessStatus,
      reason,
      note,
      actorName: 'SuperAdmin',
      createdAt: now,
    });

    tenantsStore[idx] = updated;
    return { ...updated };
  },

  async getEvents(tenantId: string, eventType?: string): Promise<TenantEvent[]> {
    await randomDelay();
    maybeThrowRandomError();

    let events = eventsStore.filter((e) => e.tenantId === tenantId);
    if (eventType && eventType !== 'All') {
      events = events.filter((e) => e.eventType === eventType);
    }

    // Newest first
    return events.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async deleteTenant(
    id: string,
    reason: string,
    note?: string
  ): Promise<{ success: boolean }> {
    await randomDelay();
    maybeThrowRandomError();

    const idx = tenantsStore.findIndex((t) => t.id === id);
    if (idx === -1) {
      throw new Error(`Tenant ${id} not found`);
    }

    const now = new Date().toISOString();
    eventsStore.unshift({
      id: `evt-${Date.now()}-del`,
      tenantId: id,
      eventType: 'DELETED',
      toValue: 'Deleted',
      reason,
      note,
      actorName: 'SuperAdmin',
      createdAt: now,
    });

    tenantsStore.splice(idx, 1);
    return { success: true };
  },
};
