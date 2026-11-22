/**
 * Core Tenant & Gym domain types
 * Single source of truth for the Gyms & Tenants module
 */

export interface Plan {
  id: string;
  name: string;
  price: number;
  memberLimit: number;
  currency?: string;
  description?: string;
}

export type TenantAccessStatus = 'ACTIVE' | 'INACTIVE';

export type TenantSubscriptionState = 'TRIAL' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export interface Tenant {
  id: string;
  code: string;
  gymName: string;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  planId: string;
  accessStatus: TenantAccessStatus;
  subscriptionState: TenantSubscriptionState;
  planActivatedAt: string;
  planExpiresAt: string;
  lastStatusChangedAt: string;
  lastStatusChangedBy: string;
  memberCount: number;
  createdAt: string;

  // Optional business metadata
  tenantSlug?: string;
  subdomain?: string;
  currency?: string;
  timezone?: string;
  address?: string;
  postalCode?: string;
  billingCycle?: 'MONTHLY' | 'ANNUAL';
  city?: string;
  state?: string;
  gstNumber?: string;
  aadharNumber?: string;
  startType?: 'TRIAL' | 'PAID';
  trialDays?: number;
  sendWelcomeEmail?: boolean;

  // Backward compatibility alias accessors (optional)
  name?: string;
  adminEmail?: string;
  status?: string;
  plan?: string;
  monthlyRevenue?: number;
  lastActiveAt?: string;
}

export interface TenantEvent {
  id: string;
  tenantId: string;
  eventType:
    | 'STATUS_CHANGE'
    | 'ACCESS_CHANGE'
    | 'PLAN_CHANGE'
    | 'EXPIRY_CHANGE'
    | 'PASSWORD_RESET'
    | 'PROVISIONED'
    | 'DETAILS_UPDATED'
    | 'DELETED'
    | string;
  fromValue?: string;
  toValue: string;
  reason?: string;
  note?: string;
  actorName: string;
  createdAt: string;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; // 'All' | 'ACTIVE' | 'INACTIVE' | 'TRIAL' | 'EXPIRED' | 'CANCELLED'
  planId?: string; // 'All' | planId
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ListResponse<T = Tenant> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateTenantInput {
  gymName: string;
  tenantSlug?: string;
  currency?: string;
  timezone?: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  temporaryPassword: string;
  planId: string;
  memberCount: number;
  startType?: 'TRIAL' | 'PAID';
  trialDays?: number;
  startDate?: string;
  expiryDate?: string;
  aadharNumber?: string;
  gstNumber?: string;
  city?: string;
  state?: string;
  address?: string;
  postalCode?: string;
  billingCycle?: 'MONTHLY' | 'ANNUAL';
  sendWelcomeEmail?: boolean;
}

export interface UpdateTenantInput {
  gymName?: string;
  ownerName?: string;
  adminEmail?: string;
  phone?: string;
  planId?: string;
  planExpiresAt?: string;
  accessStatus?: TenantAccessStatus;
  statusChangeReason?: string;
  statusChangeNote?: string;
  temporaryPassword?: string;
  city?: string;
  state?: string;
  address?: string;
  postalCode?: string;
  gstNumber?: string;
}

export interface ProvisioningStepProgress {
  stepIndex: number;
  totalSteps: number;
  stepKey: string;
  label: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  message?: string;
}
