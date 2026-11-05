import type { ApiResponse } from '@/lib/api';

// Dashboard
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/fixtures/SuperadminDashboardOverviewMockFixtures';

// Gyms
import { MOCK_GYMS, MOCK_SUBSCRIPTION_PLANS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockFixtures';
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
import { MOCK_SUPERADMIN_BACKUPS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockFixtures';
import { MOCK_BACKGROUND_JOBS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockData';
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
    const status = searchParams.get('status') || '';
    let filtered = currentGyms;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(g => g.name.toLowerCase().includes(q) || g.ownerName.toLowerCase().includes(q) || g.adminEmail.toLowerCase().includes(q));
    }
    if (status && status !== 'ALL') {
      filtered = filtered.filter(g => g.status === status);
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

  if (urlPath.startsWith('/superadmin/gyms/')) {
    const parts = urlPath.split('/');
    const gymId = parts[3];
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
  if (urlPath === '/superadmin/saas-billing/invoices') {
    return buildMockSuccess(currentInvoices, 'Invoices retrieved successfully');
  }
  if (urlPath === '/superadmin/saas-billing/invoices/manual-payment') {
    return buildMockSuccess({ recorded: true, id: `inv_pay_${Date.now()}` }, 'Payment recorded successfully');
  }
  if (urlPath.startsWith('/superadmin/saas-billing/coupons')) {
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
    return buildMockSuccess(currentCoupons, 'Coupons retrieved');
  }
  if (urlPath.startsWith('/superadmin/saas-billing/plans')) {
    return buildMockSuccess(currentPlans, 'Plans retrieved');
  }
  if (urlPath === '/superadmin/usage-meters') {
    return buildMockSuccess(MOCK_SUPERADMIN_BILLING_USAGE_METERS, 'Usage meters retrieved');
  }

  // 5. AFFILIATES
  if (urlPath.startsWith('/superadmin/affiliates')) {
    return buildMockSuccess(currentAffiliates, 'Affiliates retrieved');
  }

  // 6. TEAM MANAGEMENT
  if (urlPath === '/frontend_superadmin/superadmin_team' || urlPath === '/superadmin/team') {
    return buildMockSuccess(currentTeam, 'Team data retrieved');
  }
  if (urlPath === '/superadmin/team/alerts') {
    return buildMockSuccess(currentTeam.alerts, 'Alert preferences updated');
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
    return buildMockSuccess(currentTickets, 'Tickets retrieved');
  }

  // 10. SYSTEM OPS
  if (urlPath === '/superadmin/system-ops/summary') {
    return buildMockSuccess(SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE, 'System ops summary retrieved');
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
  if (urlPath.startsWith('/superadmin/system-ops/backups')) {
    return buildMockSuccess(MOCK_SUPERADMIN_BACKUPS, 'Backups retrieved');
  }
  if (urlPath.startsWith('/superadmin/system-ops/jobs')) {
    return buildMockSuccess(MOCK_BACKGROUND_JOBS, 'Jobs retrieved');
  }
  if (urlPath.startsWith('/superadmin/system-ops/migrations')) {
    return buildMockSuccess(MOCK_MIGRATIONS, 'Migrations retrieved');
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
