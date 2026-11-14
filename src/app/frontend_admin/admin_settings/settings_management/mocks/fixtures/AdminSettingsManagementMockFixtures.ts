// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_settings/settings_management/mocks/fixtures/AdminSettingsManagementMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin settings feature.

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin settings feature.

export const MOCK_ADMIN_SETTINGS = {
  profile: { gymName: 'Smart Gym Corp', ownerName: 'Admin', phone: '9876543210', email: 'admin@smartgym.com', city: 'Mumbai', gstNumber: '' },
  notifications: {
    sms: true, email: true, whatsapp: true,
    smsonJoin: true, emailonJoin: true, whatsapponJoin: true,
    smsonExpiry: true, emailonExpiry: true, whatsapponExpiry: true,
    smsonPayment: true, emailonPayment: true, whatsapponPayment: true,
    smsonAbsence: true, emailonAbsence: false, whatsapponAbsence: true,
    expiryReminderDays: 7, absenceThresholdDays: 3
  },
  integration: {
    memberAppEnabled: true, qrCheckInEnabled: true, onlinePaymentsEnabled: true,
    dietPlanEnabled: false, workoutPlanEnabled: false, progressTrackingEnabled: true,
    pushNotificationsEnabled: true, appStoreLink: '', playStoreLink: '', apiKey: 'sk_test_123', webhookUrl: ''
  },
  gst: {
    gstNumber: '27AABCU9603R1ZX', businessLegalName: 'Smart Gym Pvt Ltd', taxRate: '18', stateCode: '27', hsnCode: '999719', showGstOnInvoice: true, taxInclusivePricing: false
  },
  payment: {
    razorpayEnabled: true, razorpayKeyId: 'rzp_test_123', razorpayWebhookSecret: '', upiEnabled: true, upiId: 'smartgym@upi', cashEnabled: true, autoReceiptEnabled: true, receiptPrefix: 'RCP'
  },
  general: {
    timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false
  },
};


// --- From AdminUsageMockData.ts ---

export const MOCK_ADMIN_SETTINGS_ROLE_PERMISSIONS = [
  { role: 'manager', permissions: { 'members.view': true, 'members.create': true, 'members.edit': true, 'members.delete': false, 'finance.view': true, 'finance.collect': true, 'finance.expenses': true, 'finance.refunds': false, 'hr.view': true, 'hr.manage': true, 'hr.payroll': false, 'attendance.view': true, 'attendance.mark': true, 'reports.view': true, 'reports.export': true, 'settings.view': true, 'settings.edit': true, 'store.view': true, 'store.manage': true } },
  { role: 'trainer', permissions: { 'members.view': true, 'members.create': false, 'members.edit': false, 'members.delete': false, 'finance.view': false, 'finance.collect': false, 'finance.expenses': false, 'finance.refunds': false, 'hr.view': false, 'hr.manage': false, 'hr.payroll': false, 'attendance.view': true, 'attendance.mark': true, 'reports.view': false, 'reports.export': false, 'settings.view': false, 'settings.edit': false, 'store.view': true, 'store.manage': false } },
] as const;

export const MOCK_ROLES = [
  { id: 'r1', name: 'Super Admin', description: 'Full access to all modules and branches', permissions: ['all'], color: 'text-danger', bg: 'bg-danger-bg', memberCount: 1 },
  { id: 'r2', name: 'Branch Manager', description: 'Manage single branch operations, members, and staff', permissions: ['members', 'finance', 'hr', 'attendance'], color: 'text-warning', bg: 'bg-warning-bg', memberCount: 3 },
  { id: 'r3', name: 'Trainer', description: 'View assigned members, mark attendance, update workouts', permissions: ['attendance', 'members_view'], color: 'text-success', bg: 'bg-success-bg', memberCount: 8 },
  { id: 'r4', name: 'Receptionist', description: 'Handle walk-ins, collect fees, manage enquiries', permissions: ['members', 'finance_collect', 'enquiries'], color: 'text-info', bg: 'bg-info-bg', memberCount: 5 },
  { id: 'r5', name: 'Accountant', description: 'View and manage financial reports and expenses', permissions: ['finance', 'reports'], color: 'text-purple-text', bg: 'bg-purple-bg', memberCount: 2 },
] as const;
