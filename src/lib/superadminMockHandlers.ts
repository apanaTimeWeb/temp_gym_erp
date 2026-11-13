import type { ApiResponse } from '@/lib/api';

// Dashboard
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/fixtures/SuperadminDashboardOverviewMockFixtures';

// Gyms
import { MOCK_GYMS, MOCK_SUBSCRIPTION_PLANS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockFixtures';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockFixtures';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures';

// Analytics
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/fixtures/SuperadminAnalyticsDashboardMockFixtures';
import {
  MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE,
  MOCK_SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS,
  MOCK_SUPERADMIN_ANALYTICS_REPORTS_HEALTH,
} from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/mocks/fixtures/SuperadminAnalyticsReportsCenterMockFixtures';

// Billing
import { MOCK_SUPERADMIN_BILLING_INVOICES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/mocks/fixtures/SuperadminBillingInvoicesManagementMockFixtures';
import { MOCK_SUPERADMIN_BILLING_COUPONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/mocks/fixtures/SuperadminBillingCouponsManagementMockFixtures';
import { INITIAL_PLANS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/mocks/fixtures/SuperadminBillingPlansManagementMockFixtures';
import { MOCK_SUPERADMIN_BILLING_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/fixtures/SuperadminBillingUsageMetersDashboardMockFixtures';

// Affiliates
import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/fixtures/SuperadminAffiliatesManagementMockFixtures';
import { MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/mocks/fixtures/SuperadminAffiliatesPayoutHistoryTableMockFixtures';

// Team
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/fixtures/SuperadminTeamManagementMockFixtures';

// Communication
import { MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures';
import { MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES, MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/fixtures/SuperadminCommunicationMessagingCenterMockFixtures';
import { MOCK_SUPERADMIN_NOTIFICATIONS } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/mocks/fixtures/SuperadminCommunicationNotificationsMockFixtures';

// Audit & Compliance
import { SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/mocks/fixtures/SuperadminAuditComplianceDashboardMockFixtures';
import { MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/fixtures/SuperadminAuditComplianceGlobalAuditOverviewMockFixtures';

// Support Tickets
import { MOCK_TICKETS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData';

// System Ops
import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/SuperadminSystemOpsOverviewMockFixtures';
import { MOCK_INFRASTRUCTURE_NODES, MOCK_REDIS_TELEMETRY } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockData';
import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureV1MockFixtures';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureUptimeMockFixtures';
import { MOCK_SUPERADMIN_BACKUPS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockFixtures';
import { MOCK_BACKGROUND_JOBS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockData';
import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsV1MockFixtures';
import { MOCK_MIGRATIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/mocks/SuperadminSystemOpsMigrationsMockData';

// Platform Configuration
import {
  SUPERADMIN_FEATURE_FLAGS,
  SUPERADMIN_RELEASE_NOTES,
  SUPERADMIN_FEATURE_TENANTS,
  SUPERADMIN_FEATURE_HISTORY,
} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/fixtures/SuperadminPlatformConfigurationFeaturesManagementMockFixtures';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/fixtures/SuperadminPlatformConfigurationIntegrationsManagementMockFixtures';
import { MOCK_PLATFORM_SETTINGS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/fixtures/SuperadminPlatformConfigurationSettingsGeneralMockData';
import { mockWhiteLabelDomains } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/fixtures/SuperadminPlatformConfigurationWhiteLabelingSettingsMockFixtures';

// Account Profile & Security
import { MOCK_SUPERADMIN_ACCOUNT_PROFILE } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/fixtures/SuperadminAccountProfileOverviewMockFixtures';

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

// In-memory mutable states
let currentGyms = [...MOCK_GYMS];
let currentInvoices = [...MOCK_SUPERADMIN_BILLING_INVOICES];
let currentCoupons = [...MOCK_SUPERADMIN_BILLING_COUPONS];
let currentPlans = [...INITIAL_PLANS];
let currentAffiliates = [...MOCK_SUPERADMIN_AFFILIATES];
let currentTickets = [...MOCK_TICKETS];
let currentFeatureFlags = [...SUPERADMIN_FEATURE_FLAGS];
let currentReleaseNotes = [...SUPERADMIN_RELEASE_NOTES];
let currentSettings = [...MOCK_PLATFORM_SETTINGS];
let currentDomains = [...mockWhiteLabelDomains];
let currentProfile = { ...MOCK_SUPERADMIN_ACCOUNT_PROFILE };
let currentTeam = JSON.parse(JSON.stringify(SUPERADMIN_TEAM_MOCK_FIXTURE));
let currentBroadcasts = [...MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS];
let currentNotifications = [...MOCK_SUPERADMIN_NOTIFICATIONS];
let currentBackups = [...MOCK_SUPERADMIN_BACKUPS];
let currentJobs = [...MOCK_BACKGROUND_JOBS];
let currentMigrations = [...MOCK_MIGRATIONS];
let currentBackupSchedule = { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' };

export function handleSuperadminMockApiRequest(
  urlPath: string,
  method: string,
  searchParams: URLSearchParams,
  options: RequestInit = {}
): ApiResponse<any> | null {
  // 1. DASHBOARD OVERVIEW
  if (urlPath === '/superadmin/dashboard' || urlPath === '/superadmin/dashboard/metrics') {
    return buildMockSuccess(MOCK_SUPERADMIN_DASHBOARD_DATA, 'Dashboard data retrieved successfully');
  }

  // 2. GYMS DIRECTORY & DETAIL
  if (urlPath === '/superadmin/gyms') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newGym = {
          id: `t${Date.now()}`,
          name: body.name || 'New Gym',
          ownerName: body.ownerName || 'Owner',
          adminEmail: body.adminEmail || 'admin@newgym.com',
          phone: body.phone || '9999999999',
          status: 'ACTIVE',
          plan: body.plan || 'Starter',
          createdAt: new Date().toISOString().split('T')[0],
          memberCount: 0,
          monthlyRevenue: 0,
          currency: 'INR',
          databaseName: 'gym_db',
          databaseVersion: 'v2.4.1',
          city: body.city || 'Mumbai',
          state: body.state || 'MH',
          staffCount: 1,
        };
        currentGyms.unshift(newGym as any);
        return buildMockSuccess(newGym, 'Gym created successfully');
      } catch {
        return buildMockSuccess(currentGyms[0], 'Gym created');
      }
    }

    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || searchParams.get('statusFilter') || '';
    const plan = searchParams.get('plan') || searchParams.get('planFilter') || '';
    let filtered = currentGyms;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(g => g.name.toLowerCase().includes(q) || g.ownerName.toLowerCase().includes(q) || g.adminEmail.toLowerCase().includes(q));
    }
    if (status && status !== 'ALL' && status !== 'All') {
      filtered = filtered.filter(g => g.status?.toUpperCase() === status.toUpperCase());
    }
    if (plan && plan !== 'ALL' && plan !== 'All') {
      filtered = filtered.filter(g => g.plan?.toUpperCase() === plan.toUpperCase());
    }

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return buildMockSuccess(paginated, 'Gyms retrieved successfully', {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  }

  // Ghost Login cookie handlers for Superadmin proxies
  if (urlPath === '/auth/set-cookie') {
    return buildMockSuccess(null, 'Ghost login cookie set');
  }
  if (urlPath === '/auth/exit-ghost-login') {
    return buildMockSuccess(null, 'Ghost login session cleared');
  }

  // 2.1 GYM SPECIAL ENDPOINTS (MUST BE BEFORE /superadmin/gyms/)
  if (urlPath === '/superadmin/gyms/stats') {
    const stats = {
      total: currentGyms.length,
      active: currentGyms.filter(g => g.status === 'ACTIVE').length,
      trial: currentGyms.filter(g => g.status === 'TRIAL').length,
      suspended: currentGyms.filter(g => g.status === 'SUSPENDED').length,
      cancelled: currentGyms.filter(g => g.status === 'CANCELLED' || g.status === 'EXPIRED').length,
    };
    return buildMockSuccess(stats, 'Gym stats retrieved successfully');
  }

  if (urlPath === '/superadmin/gyms/export') {
    return buildMockSuccess({ downloadUrl: '/__mocks__/superadmin/gyms/export.csv' }, 'Export generated successfully');
  }

  if (urlPath === '/superadmin/gyms/provision' && method === 'POST') {
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const newGym = {
        id: `t_${Date.now()}`,
        name: body.name || body.gymName || 'Provisioned Gym',
        ownerName: body.ownerName || 'Gym Owner',
        adminEmail: body.adminEmail || 'owner@gym.com',
        phone: body.phone || '9876543210',
        status: 'ACTIVE',
        plan: body.plan || 'Starter',
        createdAt: new Date().toISOString().split('T')[0],
        memberCount: 0,
        monthlyRevenue: 0,
        currency: 'INR',
        databaseName: 'gym_db',
        databaseVersion: 'v1.2',
        city: body.city || 'Mumbai',
        state: body.state || 'MH',
        staffCount: 1,
      };
      currentGyms.unshift(newGym as any);
      return buildMockSuccess(newGym, 'Gym provisioned successfully');
    } catch {
      return buildMockSuccess(currentGyms[0], 'Gym provisioned');
    }
  }

  if (urlPath === '/superadmin/gyms/business-controls') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const action = body.action;
        const gymIds: string[] = Array.isArray(body.gymIds) ? body.gymIds : [];
        const selected = new Set(gymIds);
        const updatedFixture = {
          ...SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE,
          rows: SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE.rows.map((row) => {
            if (!selected.has(row.id)) return row;
            if (action === 'Suspend selected') return { ...row, status: 'SUSPENDED', lastAction: 'Tenant suspended' };
            if (action === 'Extend trial') return { ...row, trialDays: row.trialDays + 7, lastAction: 'Trial extended by 7 days' };
            if (action === 'Move plan') return { ...row, plan: body.targetPlan ?? row.plan, lastAction: `Plan moved to ${body.targetPlan ?? row.plan}` };
            if (action === 'Send message') return { ...row, lastAction: 'Message queued' };
            return row;
          }),
        };
        return buildMockSuccess(updatedFixture as any, 'Bulk action applied successfully');
      } catch {
        return buildMockSuccess(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE, 'Bulk action applied');
      }
    }
    return buildMockSuccess(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE, 'Tenant business-control data loaded');
  }

  if (urlPath.startsWith('/superadmin/gyms/')) {
    const parts = urlPath.split('/');
    const gymId = decodeURIComponent(parts[3] || '');
    const action = parts[4];

    if (action === 'impersonate' || action === 'ghost-login') {
      return buildMockSuccess({ token: `ghost_token_${Date.now()}`, redirectUrl: '/frontend_admin/admin_dashboard/dashboard_overview' }, 'Impersonation session established');
    }

    if (action === 'status' || action === 'suspend') {
      const gym = currentGyms.find(g => g.id === gymId);
      if (gym) {
        gym.status = gym.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
      }
      return buildMockSuccess(gym || { id: gymId, status: 'SUSPENDED' }, 'Status updated');
    }

    if (action === 'email') {
      return buildMockSuccess(null, 'Owner notification email dispatched');
    }

    if (method === 'DELETE') {
      currentGyms = currentGyms.filter(g => g.id !== gymId);
      return buildMockSuccess(null, 'Gym deleted successfully');
    }

    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const gymIndex = currentGyms.findIndex(g => g.id === gymId);
        if (gymIndex >= 0) {
          currentGyms[gymIndex] = { ...currentGyms[gymIndex], ...body };
          return buildMockSuccess(currentGyms[gymIndex], 'Gym updated successfully');
        }
        return buildMockSuccess({ id: gymId, ...body }, 'Gym updated successfully');
      } catch {
        return buildMockSuccess(currentGyms[0], 'Gym updated');
      }
    }

    const detailFixture = SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[gymId] || SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES['t1'] || {
      id: gymId,
      name: 'Iron Paradise',
      ownerName: 'John Doe',
      adminEmail: 'john@iron.com',
      phone: '9876543210',
      status: 'ACTIVE',
      plan: 'Pro',
      createdAt: '2026-08-01',
      memberCount: 200,
      monthlyRevenue: 500000,
      currency: 'INR',
      databaseVersion: 'v1.2',
    };

    return buildMockSuccess(detailFixture, 'Gym detail retrieved');
  }

  if (urlPath === '/superadmin/gym-detail/business-overview' || urlPath.startsWith('/superadmin/gym-detail')) {
    const gymId = searchParams.get('gymId') || 't1';
    const fixture = SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[gymId] || SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES['t1'];
    return buildMockSuccess(fixture, 'Gym data loaded.');
  }

  // 3. ANALYTICS & REPORTS
  if (urlPath === '/superadmin/analytics') {
    return buildMockSuccess(MOCK_SUPERADMIN_ANALYTICS, 'Analytics data retrieved');
  }
  if (urlPath === '/superadmin/reports/revenue') {
    return buildMockSuccess(MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE, 'Revenue data retrieved');
  }
  if (urlPath === '/superadmin/reports/cancellations') {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const plan = searchParams.get('plan') || '';
    let filtered = [...MOCK_SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS];
    if (search) filtered = filtered.filter(c => c.gymName.toLowerCase().includes(search));
    if (plan && plan !== 'ALL') filtered = filtered.filter(c => c.plan.toUpperCase() === plan.toUpperCase());
    return buildMockSuccess(filtered, 'Cancellations data retrieved');
  }
  if (urlPath === '/superadmin/reports/health') {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const plan = searchParams.get('plan') || '';
    let filtered = [...MOCK_SUPERADMIN_ANALYTICS_REPORTS_HEALTH];
    if (search) filtered = filtered.filter(h => h.gymName.toLowerCase().includes(search));
    if (plan && plan !== 'ALL') filtered = filtered.filter(h => h.plan.toUpperCase() === plan.toUpperCase());
    return buildMockSuccess(filtered, 'Health data retrieved');
  }
  if (urlPath === '/superadmin/reports/export' || urlPath.endsWith('/export-data') || urlPath.endsWith('/export')) {
    return buildMockSuccess(null, 'Export started successfully');
  }
  if (urlPath.startsWith('/superadmin/reports')) {
    return buildMockSuccess(MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE, 'Reports data retrieved');
  }

  // 4. SAAS BILLING
  if (urlPath.startsWith('/superadmin/saas-billing/invoices')) {
    if (urlPath.includes('/download')) {
      return buildMockSuccess({ downloadUrl: '/__mocks__/superadmin/invoices/sample.pdf' }, 'Download ready');
    }
    if (urlPath.includes('/resend')) {
      return buildMockSuccess(null, 'Invoice resent successfully');
    }
    if (urlPath.includes('/export')) {
      return buildMockSuccess({ downloadUrl: '/__mocks__/superadmin/invoices/export.csv' }, 'Export ready');
    }
    if (urlPath.endsWith('/manual-payment')) {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const tenant = currentGyms.find(g => g.id === body.gymId) || currentGyms[0];
        const newInvoice = {
          id: `inv_${Date.now()}`,
          tenantId: body.gymId || tenant?.id || 't1',
          tenantName: tenant?.name || 'Iron Paradise',
          amount: Math.round((Number(body.amount) || 1000) * 100),
          currency: body.currency || 'INR',
          status: 'PAID' as const,
          issuedAt: new Date().toISOString(),
          dueDate: new Date().toISOString().split('T')[0],
          paidAt: new Date().toISOString(),
          paymentMethod: 'CASH / MANUAL',
          invoiceType: 'ONE_TIME' as const,
          planName: body.planName || 'Pro Plan',
        };
        currentInvoices.unshift(newInvoice as any);
        return buildMockSuccess(newInvoice, 'Payment recorded successfully');
      } catch {
        return buildMockSuccess(currentInvoices[0], 'Payment recorded');
      }
    }
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    let filtered = currentInvoices.filter((inv) => {
      const matchSearch = !search || inv.id.toLowerCase().includes(search) || inv.tenantName.toLowerCase().includes(search);
      const matchStatus = !status || status === 'ALL' || inv.status === status;
      return matchSearch && matchStatus;
    });
    return buildMockSuccess(filtered, 'Invoices retrieved successfully');
  }
  if (urlPath.startsWith('/superadmin/saas-billing/coupons')) {
    if (urlPath.includes('/redemptions')) {
      const redemptions = [
        { id: 'red-1', tenantName: 'Iron Peak Fitness', planName: 'Pro Tier', discountApplied: 50000, currency: 'INR', redeemedAt: '2026-09-15T12:00:00.000Z' },
        { id: 'red-2', tenantName: 'FitZone Studio', planName: 'Basic Tier', discountApplied: 25000, currency: 'INR', redeemedAt: '2026-08-20T10:30:00.000Z' },
        { id: 'red-3', tenantName: 'Muscle Factory', planName: 'Enterprise Tier', discountApplied: 100000, currency: 'INR', redeemedAt: '2026-08-01T09:15:00.000Z' },
      ];
      return buildMockSuccess(redemptions, 'Redemption history retrieved');
    }
    const matchCouponId = urlPath.match(/\/coupons\/([^/?#]+)/);
    if (matchCouponId) {
      const couponId = decodeURIComponent(matchCouponId[1]);
      const couponIndex = currentCoupons.findIndex(c => c.id === couponId);
      const coupon = currentCoupons[couponIndex] || currentCoupons[0];
      if (method === 'PATCH' && urlPath.endsWith('/status')) {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          if (coupon) coupon.status = body.status || 'ACTIVE';
          return buildMockSuccess(coupon, 'Coupon status updated successfully');
        } catch {
          return buildMockSuccess(coupon, 'Coupon status updated');
        }
      }
      if (method === 'POST' && urlPath.endsWith('/restore')) {
        if (coupon) (coupon as any).isDeleted = false;
        return buildMockSuccess(coupon, 'Coupon restored successfully');
      }
      if (method === 'PATCH') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          const updated = { ...coupon, ...body };
          if (couponIndex >= 0) currentCoupons[couponIndex] = updated;
          return buildMockSuccess(updated, 'Coupon updated successfully');
        } catch {
          return buildMockSuccess(coupon, 'Coupon updated');
        }
      }
      if (method === 'DELETE') {
        currentCoupons = currentCoupons.filter(c => c.id !== couponId);
        return buildMockSuccess(null, 'Coupon deleted successfully');
      }
      return buildMockSuccess(coupon, 'Coupon retrieved');
    }
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newCoupon = {
          id: `cp_${Date.now()}`,
          code: body.code || 'COUPON',
          discountType: body.discountType || 'PERCENTAGE',
          discountValue: body.discountValue || 10,
          maxUses: body.maxUses || 100,
          currentUses: 0,
          status: 'ACTIVE',
          expiryDate: body.expiryDate || '2027-12-31',
          isDeleted: false,
        };
        currentCoupons.unshift(newCoupon as any);
        return buildMockSuccess(newCoupon, 'Coupon created successfully');
      } catch {
        return buildMockSuccess(currentCoupons[0], 'Coupon created');
      }
    }
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    let filtered = currentCoupons.filter((c) => {
      const matchSearch = !search || c.code.toLowerCase().includes(search);
      const matchStatus = !status || status === 'ALL' || c.status === status;
      return matchSearch && matchStatus;
    });
    return buildMockSuccess(filtered, 'Coupons retrieved');
  }
  if (urlPath.startsWith('/superadmin/saas-billing/plans')) {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newPlan = {
          id: `plan-${Date.now()}`,
          name: body.name || 'Custom Plan',
          priceMonthly: Number(body.priceMonthly) || 999900,
          priceAnnual: Number(body.priceAnnual) || 9999000,
          maxMembers: Number(body.maxMembers) || 500,
          maxStaff: Number(body.maxStaff) || 20,
          dbLimitGb: Number(body.dbLimitGb) || 10,
          binaryLimitGb: Number(body.binaryLimitGb) || 25,
          features: Array.isArray(body.features) ? body.features : ['Core App'],
          activeTenants: 0,
          isPublic: Boolean(body.isPublic),
          trialDays: Number(body.trialDays) || 14,
          setupFee: Number(body.setupFee) || 0,
          currency: body.currency || 'INR',
          isArchived: false,
        };
        currentPlans.unshift(newPlan as any);
        return buildMockSuccess(newPlan, 'Plan created successfully');
      } catch {
        return buildMockSuccess(currentPlans[0], 'Plan created');
      }
    }
    const matchPlanId = urlPath.match(/\/plans\/([^/?#]+)/);
    if (matchPlanId) {
      const planId = decodeURIComponent(matchPlanId[1]);
      const planIndex = currentPlans.findIndex(p => p.id === planId);
      const plan = currentPlans[planIndex] || currentPlans[0];
      if (method === 'PATCH' && urlPath.endsWith('/archive')) {
        if (plan) plan.isArchived = !plan.isArchived;
        return buildMockSuccess(plan, 'Plan archived status updated');
      }
      if (method === 'PATCH') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          const updated = { ...plan, ...body };
          if (planIndex >= 0) currentPlans[planIndex] = updated;
          return buildMockSuccess(updated, 'Plan updated successfully');
        } catch {
          return buildMockSuccess(plan, 'Plan updated');
        }
      }
      if (method === 'DELETE') {
        currentPlans = currentPlans.filter(p => p.id !== planId);
        return buildMockSuccess(null, 'Plan deleted successfully');
      }
      return buildMockSuccess(plan, 'Plan retrieved');
    }
    return buildMockSuccess(currentPlans, 'Plans retrieved');
  }
  if (urlPath === '/superadmin/usage-meters') {
    return buildMockSuccess(MOCK_SUPERADMIN_BILLING_USAGE_METERS, 'Usage meters retrieved');
  }

  // 5. AFFILIATES
  if (urlPath === '/superadmin/affiliates/payout-history' || urlPath.startsWith('/superadmin/affiliates/payout-history')) {
    return buildMockSuccess(MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY, 'Payout history retrieved');
  }
  if (urlPath.startsWith('/superadmin/affiliates')) {
    const matchAffiliateId = urlPath.match(/\/affiliates\/([^/?#]+)/);
    if (matchAffiliateId) {
      const affiliateId = decodeURIComponent(matchAffiliateId[1]);
      const affiliateIndex = currentAffiliates.findIndex(a => a.id === affiliateId);
      const affiliate = currentAffiliates[affiliateIndex] || currentAffiliates[0];
      if (method === 'PATCH' && urlPath.endsWith('/status')) {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          if (affiliate) affiliate.status = body.status || 'ACTIVE';
          return buildMockSuccess(affiliate, 'Affiliate status updated successfully');
        } catch {
          return buildMockSuccess(affiliate, 'Affiliate status updated');
        }
      }
      if (method === 'POST' && urlPath.endsWith('/pay')) {
        if (affiliate) affiliate.pendingPayout = 0;
        return buildMockSuccess(affiliate, 'Commission payout processed successfully');
      }
      if (method === 'PATCH') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          const updated = { ...affiliate, ...body };
          if (affiliateIndex >= 0) currentAffiliates[affiliateIndex] = updated;
          return buildMockSuccess(updated, 'Affiliate updated successfully');
        } catch {
          return buildMockSuccess(affiliate, 'Affiliate updated');
        }
      }
      if (method === 'DELETE') {
        currentAffiliates = currentAffiliates.filter(a => a.id !== affiliateId);
        return buildMockSuccess(null, 'Affiliate deleted successfully');
      }
      return buildMockSuccess(affiliate, 'Affiliate retrieved');
    }
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newAffiliate = {
          id: `a_${Date.now()}`,
          name: body.name || 'New Affiliate',
          email: body.email || 'affiliate@domain.com',
          phone: body.phone || '9876543210',
          referralCode: body.referralCode || `REF${Date.now().toString().slice(-4)}`,
          totalReferred: 0,
          commissionEarned: 0,
          commissionRate: Number(body.commissionRate) || 15,
          pendingPayout: 0,
          bankDetails: body.bankDetails || 'Bank Details',
          currency: 'INR',
          status: 'ACTIVE' as const,
          joinedAt: new Date().toISOString().split('T')[0],
          referralCount: 0,
          conversionRate: 0,
        };
        currentAffiliates.unshift(newAffiliate as any);
        return buildMockSuccess(newAffiliate, 'Affiliate registered successfully');
      } catch {
        return buildMockSuccess(currentAffiliates[0], 'Affiliate registered');
      }
    }
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    let filtered = currentAffiliates.filter((a) => {
      const matchSearch = !search || a.name.toLowerCase().includes(search) || a.referralCode.toLowerCase().includes(search);
      const matchStatus = !status || status === 'ALL' || a.status === status;
      return matchSearch && matchStatus;
    });
    return buildMockSuccess(filtered, 'Affiliates retrieved');
  }

  // 6. TEAM MANAGEMENT
  if (urlPath === '/frontend_superadmin/superadmin_team' || urlPath === '/superadmin/team') {
    return buildMockSuccess(currentTeam, 'Team data retrieved');
  }
  if (urlPath === '/superadmin/team/alerts') {
    return buildMockSuccess(null, 'Alert preferences updated');
  }

  // 7. COMMUNICATION
  if (urlPath.startsWith('/superadmin/broadcasts')) {
    if (method === 'POST') {
      return buildMockSuccess({ id: `bc_${Date.now()}` }, 'Broadcast scheduled');
    }
    return buildMockSuccess(currentBroadcasts, 'Broadcasts retrieved');
  }
  if (urlPath === '/superadmin/messaging/tenants') {
    return buildMockSuccess(MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS, 'Tenants retrieved');
  }
  if (urlPath.startsWith('/superadmin/messaging/messages') || urlPath === '/superadmin/messaging') {
    return buildMockSuccess(MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES, 'Messages retrieved');
  }
  if (urlPath.startsWith('/superadmin/messaging/notifications')) {
    if (urlPath.includes('/read-all') && method === 'PATCH') {
      currentNotifications.forEach((n: any) => { n.read = true; });
      return buildMockSuccess(currentNotifications, 'All notifications marked as read');
    }
    const matchId = urlPath.match(/\/notifications\/([^/]+)\/read/);
    if (matchId && method === 'PATCH') {
      const nId = matchId[1];
      const notif = currentNotifications.find((n: any) => n.id === nId);
      if (notif) (notif as any).read = true;
      return buildMockSuccess(notif || currentNotifications, 'Notification marked as read');
    }
    return buildMockSuccess(currentNotifications, 'Notifications retrieved');
  }

  // 8. AUDIT & COMPLIANCE
  if (urlPath === '/frontend_superadmin/superadmin_compliance' || urlPath === '/superadmin/compliance') {
    return buildMockSuccess(SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE, 'Compliance summary retrieved');
  }
  if (urlPath.startsWith('/superadmin/audit-logs')) {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const severity = searchParams.get('severity') || '';
    const actorType = searchParams.get('actorType') || '';
    const page = Math.max(Number(searchParams.get('page')) || 1, 1);
    const limit = Math.max(Number(searchParams.get('limit')) || 20, 1);

    let rows = MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT.filter((log) => {
      const values = [log.action, log.actor, log.resource, log.details, log.tenantName || ''];
      return (
        (!search || values.some((val) => val.toLowerCase().includes(search))) &&
        (!severity || severity === 'ALL' || log.severity === severity) &&
        (!actorType || actorType === 'ALL' || log.actorType === actorType)
      );
    });

    const total = rows.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const paginated = rows.slice((page - 1) * limit, page * limit);
    const meta = { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 };

    return buildMockSuccess(paginated, 'Audit logs retrieved', meta);
  }

  // 9. SUPPORT TICKETS
  if (urlPath.startsWith('/superadmin/tickets')) {
    const ticketIdMatch = urlPath.match(/^\/superadmin\/tickets\/([^/?#]+)/);
    if (ticketIdMatch && ticketIdMatch[1] && ticketIdMatch[1] !== 'undefined') {
      const ticketId = decodeURIComponent(ticketIdMatch[1]);
      const ticket = currentTickets.find((t) => t.id === ticketId) || currentTickets[0];
      if (urlPath.endsWith('/reply') && method === 'POST') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          const msg = {
            id: `msg_${Date.now()}`,
            senderId: 'superadmin_1',
            senderName: 'SuperAdmin Support',
            senderRole: 'SUPERADMIN' as const,
            content: String(body.message || body.content || ''),
            createdAt: new Date().toISOString(),
          };
          if (ticket) {
            ticket.messages = [...(ticket.messages || []), msg];
            ticket.lastUpdated = new Date().toISOString();
          }
          return buildMockSuccess(ticket, 'Reply submitted successfully');
        } catch {
          return buildMockSuccess(ticket, 'Reply submitted');
        }
      }
      if (method === 'PATCH') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          if (ticket) {
            if (body.status) ticket.status = body.status;
            if (body.priority) ticket.priority = body.priority;
            if (body.assignedTo !== undefined) ticket.assignedTo = body.assignedTo;
            ticket.lastUpdated = new Date().toISOString();
          }
          return buildMockSuccess(ticket, 'Ticket updated successfully');
        } catch {
          return buildMockSuccess(ticket, 'Ticket updated');
        }
      }
      return buildMockSuccess(ticket, 'Ticket details retrieved');
    }

    const search = searchParams.get('search')?.toLowerCase() || '';
    const priority = searchParams.get('priority') || '';
    const status = searchParams.get('status') || '';
    let filtered = currentTickets.filter((t) => {
      const matchSearch =
        !search ||
        t.subject.toLowerCase().includes(search) ||
        (t.tenantName ? t.tenantName.toLowerCase().includes(search) : false) ||
        t.id.toLowerCase().includes(search);
      const matchPriority = !priority || priority === 'ALL' || t.priority === priority;
      const matchStatus = !status || status === 'ALL' || t.status === status;
      return matchSearch && matchPriority && matchStatus;
    });
    return buildMockSuccess(filtered, 'Tickets retrieved');
  }

  // 10. SYSTEM OPS
  if (urlPath === '/superadmin/system-ops/summary') {
    return buildMockSuccess(SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE, 'System ops summary retrieved');
  }

  // 10.1 Infrastructure & Cache
  if (urlPath === '/superadmin/system-ops/infrastructure/api-health') {
    return buildMockSuccess(SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE, 'Infrastructure API health loaded');
  }
  if (urlPath === '/superadmin/system-ops/infrastructure/uptime-history') {
    return buildMockSuccess(MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME, 'Historical uptime loaded');
  }
  if (urlPath === '/superadmin/system-ops/infrastructure/redis/flush-global' || urlPath === '/superadmin/system-ops/infrastructure/redis/flush-tenant') {
    return buildMockSuccess({ flushed: true }, 'Cache flush successful');
  }
  if (urlPath === '/superadmin/system-ops/infrastructure/redis') {
    return buildMockSuccess(MOCK_REDIS_TELEMETRY, 'Redis telemetry retrieved');
  }
  if (urlPath.startsWith('/superadmin/system-ops/infrastructure')) {
    return buildMockSuccess(MOCK_INFRASTRUCTURE_NODES, 'Infrastructure telemetry retrieved');
  }

  // 10.2 Backups
  if (urlPath === '/superadmin/system-ops/backups/schedule') {
    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        currentBackupSchedule = {
          cronExpression: body.cronExpression || currentBackupSchedule.cronExpression,
          retentionDays: Number(body.retentionDays) || currentBackupSchedule.retentionDays,
          updatedAt: new Date().toISOString(),
        };
      } catch {
        // no-op
      }
    }
    return buildMockSuccess(currentBackupSchedule, 'Backup schedule loaded');
  }
  if (urlPath === '/superadmin/system-ops/backups/trigger') {
    const newBackup = {
      id: `bk_${Date.now()}`,
      createdAt: new Date().toISOString(),
      sizeBytes: 154382000,
      databaseName: 'all_tenants_prod',
      status: 'COMPLETED',
      triggerType: 'MANUAL',
    };
    currentBackups.unshift(newBackup as any);
    return buildMockSuccess(null, 'Backup snapshot initiated');
  }
  if (urlPath.endsWith('/download') && urlPath.startsWith('/superadmin/system-ops/backups/')) {
    return buildMockSuccess({ downloadUrl: 'https://downloads.smartgym360.com/backups/latest.sql.gz' }, 'Download URL generated');
  }
  if (urlPath.endsWith('/restore') && urlPath.startsWith('/superadmin/system-ops/backups/')) {
    return buildMockSuccess(null, 'Restore initiated');
  }
  if (urlPath.startsWith('/superadmin/system-ops/backups')) {
    return buildMockSuccess(currentBackups, 'Backups retrieved');
  }

  // 10.3 Background Jobs
  if (urlPath === '/superadmin/system-ops/jobs/queue-health') {
    return buildMockSuccess(SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE, 'Queue health retrieved');
  }
  if (urlPath === '/superadmin/system-ops/jobs/retry-all') {
    const failedCount = currentJobs.filter((j: any) => j.status === 'FAILED').length;
    currentJobs = currentJobs.map((j: any) => j.status === 'FAILED' ? { ...j, status: 'PENDING', attempts: (j.attempts || 0) + 1 } : j);
    return buildMockSuccess({ queuedCount: failedCount || 1 }, 'All failed jobs queued for retry');
  }
  if (urlPath === '/superadmin/system-ops/jobs/clear-completed') {
    const completedCount = currentJobs.filter((j: any) => j.status === 'COMPLETED').length;
    currentJobs = currentJobs.filter((j: any) => j.status !== 'COMPLETED');
    return buildMockSuccess({ affectedCount: completedCount, count: completedCount }, 'Completed jobs cleared');
  }
  if (urlPath === '/superadmin/system-ops/jobs/bulk-retry') {
    let ids: string[] = [];
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      ids = Array.isArray(body.ids) ? body.ids : [];
    } catch {
      // no-op
    }
    const count = ids.length || 1;
    return buildMockSuccess({ affectedCount: count, count }, 'Selected jobs queued for retry');
  }
  if (urlPath === '/superadmin/system-ops/jobs/bulk-delete') {
    let ids: string[] = [];
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      ids = Array.isArray(body.ids) ? body.ids : [];
    } catch {
      // no-op
    }
    const count = ids.length || 1;
    return buildMockSuccess({ affectedCount: count, count }, 'Selected jobs deleted');
  }
  if (urlPath.endsWith('/retry') && urlPath.startsWith('/superadmin/system-ops/jobs/')) {
    const jobId = urlPath.split('/')[4];
    const job = currentJobs.find((j: any) => j.id === jobId) || currentJobs[0];
    return buildMockSuccess({ ...job, status: 'PENDING', attempts: ((job as any)?.attempts || 0) + 1 }, 'Job queued for retry');
  }
  if (urlPath.endsWith('/cancel') && urlPath.startsWith('/superadmin/system-ops/jobs/')) {
    const jobId = urlPath.split('/')[4];
    const job = currentJobs.find((j: any) => j.id === jobId) || currentJobs[0];
    return buildMockSuccess({ ...job, status: 'CANCELLED' }, 'Job cancelled');
  }
  if (urlPath.startsWith('/superadmin/system-ops/jobs') && method === 'DELETE') {
    const jobId = urlPath.split('/')[4];
    currentJobs = currentJobs.filter((j: any) => j.id !== jobId);
    return buildMockSuccess(null, 'Job deleted');
  }
  if (urlPath.startsWith('/superadmin/system-ops/jobs')) {
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(searchParams.get('limit')) || 10);
    const total = currentJobs.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const paginated = currentJobs.slice((page - 1) * limit, page * limit);
    const meta = { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 };
    return buildMockSuccess(paginated, 'Jobs retrieved', meta);
  }

  // 10.4 Migrations
  if (urlPath === '/superadmin/system-ops/migrations/trigger') {
    let targetVersion = 'v2.5.0';
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      if (body.targetVersion) targetVersion = body.targetVersion;
    } catch {
      // no-op
    }
    const newMigration = {
      id: `migration-${Date.now()}`,
      version: targetVersion,
      description: 'Manual schema rollout',
      appliedAt: null,
      status: 'IN_PROGRESS',
      executionTimeMs: null,
      batch: currentMigrations.length + 1,
    };
    currentMigrations.unshift(newMigration as any);
    return buildMockSuccess(newMigration, 'Migration triggered successfully');
  }
  if (urlPath.startsWith('/superadmin/system-ops/migrations')) {
    return buildMockSuccess(currentMigrations, 'Migrations retrieved');
  }

  // 11. PLATFORM CONFIGURATION
  if (urlPath === '/superadmin/features/tenants') {
    return buildMockSuccess(SUPERADMIN_FEATURE_TENANTS, 'Feature tenants retrieved');
  }
  if (urlPath.includes('/history')) {
    const flagId = urlPath.split('/')[4] || 'f1';
    const history = (SUPERADMIN_FEATURE_HISTORY as Record<string, any>)[flagId] || (SUPERADMIN_FEATURE_HISTORY as Record<string, any>)['f1'] || [];
    return buildMockSuccess(history, 'Feature flag history retrieved');
  }
  if (urlPath.endsWith('/toggle')) {
    const flagId = urlPath.split('/')[4];
    const flag = currentFeatureFlags.find(f => f.id === flagId);
    if (flag) {
      flag.isGlobalEnabled = !flag.isGlobalEnabled;
      return buildMockSuccess(flag, 'Flag toggled');
    }
    return buildMockSuccess(currentFeatureFlags[0], 'Flag toggled');
  }
  if (urlPath.startsWith('/superadmin/features/flags')) {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newFlag = {
          id: `flag_${Date.now()}`,
          name: body.name || 'New Flag',
          description: body.description || 'Description',
          isGlobalEnabled: body.isGlobalEnabled ?? false,
          enabledTenantIds: body.enabledTenantIds || [],
        };
        currentFeatureFlags.unshift(newFlag as any);
        return buildMockSuccess(newFlag, 'Flag created');
      } catch {
        return buildMockSuccess(currentFeatureFlags[0], 'Flag created');
      }
    }
    return buildMockSuccess(currentFeatureFlags, 'Flags retrieved');
  }
  if (urlPath.startsWith('/superadmin/features/notes')) {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newNote = {
          id: `note_${Date.now()}`,
          version: body.version || 'v2.0.0',
          title: body.title || 'New Release',
          date: new Date().toISOString().split('T')[0],
          content: body.content || '',
          isPublished: body.isPublished ?? false,
        };
        currentReleaseNotes.unshift(newNote as any);
        return buildMockSuccess(newNote, 'Release note created');
      } catch {
        return buildMockSuccess(currentReleaseNotes[0], 'Release note created');
      }
    }
    return buildMockSuccess(currentReleaseNotes, 'Release notes retrieved');
  }
  if (urlPath === '/superadmin/features' || urlPath === '/superadmin/features/') {
    return buildMockSuccess({ flags: currentFeatureFlags, notes: currentReleaseNotes }, 'Features loaded successfully');
  }
  if (urlPath.startsWith('/superadmin/platform-configuration/features')) {
    return buildMockSuccess({ flags: currentFeatureFlags, notes: currentReleaseNotes }, 'Features loaded successfully');
  }
  if (urlPath.startsWith('/superadmin/integrations')) {
    return buildMockSuccess(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE, 'Integrations retrieved');
  }
  if (urlPath.startsWith('/superadmin/settings')) {
    return buildMockSuccess(currentSettings, 'Settings retrieved');
  }
  if (urlPath.startsWith('/superadmin/white-labeling/domains')) {
    return buildMockSuccess(currentDomains, 'White labeling domains retrieved');
  }
  if (urlPath.startsWith('/superadmin/release-notes')) {
    return buildMockSuccess({ flags: currentFeatureFlags, notes: currentReleaseNotes }, 'Release notes retrieved');
  }

  // 12. ACCOUNT PROFILE & SECURITY
  if (urlPath === '/superadmin/profile' || urlPath === '/superadmin/account/profile') {
    if (method === 'PATCH' || method === 'PUT') {
      return buildMockSuccess(currentProfile, 'Profile updated successfully');
    }
    return buildMockSuccess(currentProfile, 'Profile retrieved');
  }
  if (urlPath === '/superadmin/profile/password' || urlPath === '/superadmin/account/password') {
    return buildMockSuccess({ success: true }, 'Password updated successfully');
  }
  if (urlPath === '/superadmin/profile/2fa') {
    return buildMockSuccess({ enabled: true }, '2FA status updated');
  }

  return null;
}
