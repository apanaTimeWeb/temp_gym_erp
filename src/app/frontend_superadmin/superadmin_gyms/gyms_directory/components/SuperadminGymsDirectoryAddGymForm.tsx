'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Database,
  Eye,
  EyeOff,
  Loader2,
  Save,
  CheckCircle2,
  XCircle,
  Copy,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { usePlans, tenantService } from '../services/SuperadminGymsDirectoryTenantService';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import {
  validateGymName,
  validateEmail,
  validateIndianPhone,
  validateAadhaar,
  formatAadhaar,
  validatePassword,
  generateStrongPassword,
} from '../utils/SuperadminGymsDirectoryValidators';
import { formatCurrency } from '../utils/SuperadminGymsDirectoryTenantUtils';
import type { ProvisioningStepProgress, CreateTenantInput } from '../types/SuperadminGymsDirectoryTenantTypes';

interface StepState {
  key: string;
  label: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  message?: string;
}

const INITIAL_STEPS: StepState[] = [
  { key: 'db', label: 'Creating database', status: 'pending' },
  { key: 'migrations', label: 'Running migrations', status: 'pending' },
  { key: 'seeds', label: 'Seeding data', status: 'pending' },
  { key: 'admin', label: 'Creating admin user', status: 'pending' },
  { key: 'email', label: 'Sending welcome email', status: 'pending' },
];

export default function SuperadminGymsDirectoryAddGymForm() {
  const router = useRouter();
  const { data: plans = [], isLoading: loadingPlans } = usePlans();

  // Form Fields
  const [gymName, setGymName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [planId, setPlanId] = useState('');
  const [memberCount, setMemberCount] = useState<number>(50);

  // Additional Fields (Item 18)
  const [startType, setStartType] = useState<'TRIAL' | 'PAID'>('TRIAL');
  const [trialDays, setTrialDays] = useState<number>(14);
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [rawAadhaar, setRawAadhaar] = useState('');
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

  // Field errors & touched states
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Debounced email for TanStack Query check
  const [debouncedEmail, setDebouncedEmail] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(adminEmail.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [adminEmail]);

  const isEmailFormatValid = Boolean(debouncedEmail && validateEmail(debouncedEmail).isValid);

  const { data: emailExists = false, isFetching: isCheckingEmail } = useQuery({
    queryKey: ['checkEmailExists', debouncedEmail],
    queryFn: () => tenantService.checkEmailExists(debouncedEmail),
    enabled: isEmailFormatValid,
  });

  const emailExistsError = emailExists ? 'This email is already registered to another gym' : null;

  // Provisioning Console State
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningDone, setProvisioningDone] = useState(false);
  const [provisioningFailed, setProvisioningFailed] = useState(false);
  const [steps, setSteps] = useState<StepState[]>(INITIAL_STEPS);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Individual refs for auto-focusing on validation failure
  const gymNameInputRef = useRef<HTMLInputElement>(null);
  const ownerNameInputRef = useRef<HTMLInputElement>(null);
  const adminEmailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const temporaryPasswordInputRef = useRef<HTMLInputElement>(null);
  const planSelectRef = useRef<HTMLSelectElement>(null);
  const memberCountInputRef = useRef<HTMLInputElement>(null);
  const aadhaarInputRef = useRef<HTMLInputElement>(null);

  // Selected Plan Object
  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === planId || p.name.toLowerCase() === planId.toLowerCase()),
    [plans, planId]
  );

  // Auto calculate Read-Only Expiry Date (Item 18)
  const expiryDate = useMemo(() => {
    if (!startDate) return '';
    const base = new Date(`${startDate}T00:00:00.000Z`);
    if (isNaN(base.getTime())) return '';
    const addDuration = startType === 'TRIAL' ? (trialDays || 14) : 30;
    const exp = new Date(base.getTime() + addDuration * 24 * 60 * 60 * 1000);
    return exp.toISOString().split('T')[0];
  }, [startDate, startType, trialDays]);

  // Password validation & strength
  const passwordResult = useMemo(
    () => validatePassword(temporaryPassword),
    [temporaryPassword]
  );

  // Unsaved changes & beforeunload guard (Item 20)
  const isDirty = useMemo(() => {
    return (
      gymName.length > 0 ||
      ownerName.length > 0 ||
      adminEmail.length > 0 ||
      phone.length > 0 ||
      temporaryPassword.length > 0 ||
      city.length > 0 ||
      rawAadhaar.length > 0
    );
  }, [gymName, ownerName, adminEmail, phone, temporaryPassword, city, rawAadhaar]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !provisioningDone && !isProvisioning) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, provisioningDone, isProvisioning]);

  // Single field validator
  const validateField = useCallback(
    (field: string): string | undefined => {
      switch (field) {
        case 'gymName': {
          const res = validateGymName(gymName);
          return res.isValid ? undefined : res.error;
        }
        case 'ownerName': {
          return !ownerName || ownerName.trim().length < 2
            ? 'Owner name is required (min 2 characters)'
            : undefined;
        }
        case 'adminEmail': {
          const res = validateEmail(adminEmail);
          if (!res.isValid) return res.error;
          if (emailExistsError) return emailExistsError;
          return undefined;
        }
        case 'phone': {
          const res = validateIndianPhone(phone);
          return res.isValid ? undefined : res.error;
        }
        case 'temporaryPassword': {
          const res = validatePassword(temporaryPassword);
          return res.isValid ? undefined : res.error;
        }
        case 'planId': {
          return !planId ? 'SaaS plan is required' : undefined;
        }
        case 'memberCount': {
          if (memberCount === undefined || memberCount === null || isNaN(memberCount) || memberCount < 0) {
            return 'Member count must be a non-negative integer';
          }
          return undefined;
        }
        case 'rawAadhaar': {
          if (rawAadhaar) {
            const res = validateAadhaar(rawAadhaar);
            return res.isValid ? undefined : res.error;
          }
          return undefined;
        }
        default:
          return undefined;
      }
    },
    [gymName, ownerName, adminEmail, emailExistsError, phone, temporaryPassword, planId, memberCount, rawAadhaar]
  );

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // Generate strong password
  const handleGeneratePassword = () => {
    const pwd = generateStrongPassword();
    setTemporaryPassword(pwd);
    setErrors((prev) => ({ ...prev, temporaryPassword: undefined }));
    setTouched((prev) => ({ ...prev, temporaryPassword: true }));
  };

  // Copy password
  const handleCopyPassword = () => {
    if (!temporaryPassword) return;
    navigator.clipboard.writeText(temporaryPassword);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
    toast.success('Password copied to clipboard');
  };

  // Provisioning submission
  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProvisioning) return;

    // Validate all fields
    const newErrors: { [key: string]: string | undefined } = {
      gymName: validateField('gymName'),
      ownerName: validateField('ownerName'),
      adminEmail: validateField('adminEmail'),
      phone: validateField('phone'),
      temporaryPassword: validateField('temporaryPassword'),
      planId: validateField('planId'),
      memberCount: validateField('memberCount'),
      rawAadhaar: validateField('rawAadhaar'),
    };

    setTouched({
      gymName: true,
      ownerName: true,
      adminEmail: true,
      phone: true,
      temporaryPassword: true,
      planId: true,
      memberCount: true,
      rawAadhaar: true,
    });
    setErrors(newErrors);

    // If any error exists, focus first invalid field and DO NOT call service
    if (newErrors.gymName) {
      gymNameInputRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.gymName}`);
      return;
    }
    if (newErrors.ownerName) {
      ownerNameInputRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.ownerName}`);
      return;
    }
    if (newErrors.adminEmail || emailExistsError) {
      adminEmailInputRef.current?.focus();
      toast.error(newErrors.adminEmail || emailExistsError || 'Invalid email');
      return;
    }
    if (newErrors.phone) {
      phoneInputRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.phone}`);
      return;
    }
    if (newErrors.temporaryPassword) {
      temporaryPasswordInputRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.temporaryPassword}`);
      return;
    }
    if (newErrors.planId) {
      planSelectRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.planId}`);
      return;
    }
    if (newErrors.memberCount) {
      memberCountInputRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.memberCount}`);
      return;
    }
    if (newErrors.rawAadhaar) {
      aadhaarInputRef.current?.focus();
      toast.error(`Please fix errors: ${newErrors.rawAadhaar}`);
      return;
    }

    // Prepare payload
    const payload: CreateTenantInput = {
      gymName: gymName.trim(),
      ownerName: ownerName.trim(),
      adminEmail: adminEmail.trim().toLowerCase(),
      phone: phone.trim(),
      temporaryPassword: temporaryPassword.trim(),
      planId,
      memberCount: Number(memberCount) || 0,
      startType,
      trialDays: startType === 'TRIAL' ? trialDays : undefined,
      startDate,
      expiryDate,
      city: city.trim() || undefined,
      state: state.trim() || undefined,
      gstNumber: gstNumber.trim() || undefined,
      sendWelcomeEmail,
    };

    setIsProvisioning(true);
    setProvisioningFailed(false);
    setProvisioningDone(false);
    setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: 'pending' })));
    setConsoleLogs([`[INFO] Initiating isolated database provisioning for ${payload.gymName}...`]);

    try {
      await tenantService.createTenant(payload, (progress: ProvisioningStepProgress) => {
        setSteps((prev) =>
          prev.map((step) => {
            if (step.key === progress.stepKey) {
              return {
                ...step,
                status: progress.status,
                message: progress.message,
              };
            }
            return step;
          })
        );
        if (progress.message) {
          setConsoleLogs((prev) => [...prev, `[${progress.status.toUpperCase()}] ${progress.message}`]);
        }
      });

      setProvisioningDone(true);
      setConsoleLogs((prev) => [
        ...prev,
        `[SUCCESS] Tenant provisioning completed! Isolated tenant database online.`,
      ]);
      toast.success(`Gym "${payload.gymName}" provisioned successfully!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Provisioning failed';
      setProvisioningFailed(true);
      setConsoleLogs((prev) => [...prev, `[ERROR] ${msg}`]);
      toast.error(msg);
    } finally {
      setIsProvisioning(false);
    }
  };

  return (
    <div className="h-[calc(100dvh-145px)] flex flex-col min-h-0 overflow-hidden space-y-3 px-2 sm:px-3 pb-2">
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #171717 inset !important;
          -webkit-text-fill-color: #facc15 !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: #facc15 !important;
        }
        ::placeholder {
          color: #737373 !important;
          opacity: 1;
        }
      `}</style>
      {/* Header Bar: Breadcrumb Title on Left, Back Action on Right (Permanently Sticky / Docked at Top) */}
      <div className="sticky top-0 z-30 shrink-0 bg-page/95 backdrop-blur-md pb-2 pt-0.5 border-b border-border/60">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold">
              <Link
                href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list')}
                className="text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
              >
                Gyms & Tenants
              </Link>
              <ChevronRight size={18} className="text-disabled shrink-0" aria-hidden="true" />
              <h1 className="text-primary font-bold inline">Provision New Gym</h1>
            </div>
            <p className="text-secondary text-xs sm:text-sm mt-0.5 font-normal">
              This will spin up a completely isolated database and seed security credentials for the new
              gym tenant.
            </p>
          </div>
          <Link
            href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list')}
            aria-label="Back to gyms list"
            className="inline-flex h-9 items-center gap-1.5 px-3.5 py-1.5 bg-card hover:bg-surface-hover border border-border rounded-lg text-xs sm:text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page shrink-0 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to Gyms</span>
          </Link>
        </div>
      </div>

      {/* Scrollable Form Body Container: Only form body scrolls, header stays docked at top */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 pb-8">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Form Container (2 cols) */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleProvision}
                noValidate
                className="bg-page border border-border rounded-xl p-6 shadow-card space-y-6"
              >
                {/* Primary Required Details Section */}
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                    Core Facility & Owner Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Gym Name (*) */}
                    <div>
                      <label
                        htmlFor="provision-gym-name"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Gym Name <span className="text-danger">*</span>
                      </label>
                      <input
                        ref={gymNameInputRef}
                        id="provision-gym-name"
                        type="text"
                        value={gymName}
                        onChange={(e) => setGymName(e.target.value)}
                        onBlur={() => handleBlur('gymName')}
                        placeholder="e.g. Titan Strength Club"
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      {touched.gymName && errors.gymName && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.gymName}
                        </p>
                      )}
                    </div>

                    {/* Owner Name (*) */}
                    <div>
                      <label
                        htmlFor="provision-owner-name"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Owner Name <span className="text-danger">*</span>
                      </label>
                      <input
                        ref={ownerNameInputRef}
                        id="provision-owner-name"
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        onBlur={() => handleBlur('ownerName')}
                        placeholder="e.g. John Doe"
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      {touched.ownerName && errors.ownerName && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.ownerName}
                        </p>
                      )}
                    </div>

                    {/* Admin Email (*) */}
                    <div>
                      <label
                        htmlFor="provision-admin-email"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Admin Email <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <input
                          ref={adminEmailInputRef}
                          id="provision-admin-email"
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          onBlur={() => handleBlur('adminEmail')}
                          placeholder="admin@titangym.com"
                          disabled={isProvisioning || provisioningDone}
                          className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                        {isCheckingEmail && (
                          <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-disabled">
                            Checking...
                          </span>
                        )}
                      </div>
                      {touched.adminEmail && errors.adminEmail && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.adminEmail}
                        </p>
                      )}
                      {emailExistsError && !errors.adminEmail && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {emailExistsError}
                        </p>
                      )}
                    </div>

                    {/* Phone (*) */}
                    <div>
                      <label
                        htmlFor="provision-phone"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        ref={phoneInputRef}
                        id="provision-phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+91 98765 43210"
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Aadhaar Number (Optional) */}
                    <div>
                      <label
                        htmlFor="provision-aadhaar"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Aadhaar Number <span className="font-normal text-disabled">(Optional)</span>
                      </label>
                      <input
                        ref={aadhaarInputRef}
                        id="provision-aadhaar"
                        type="text"
                        value={formatAadhaar(rawAadhaar)}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
                          setRawAadhaar(digits);
                        }}
                        onBlur={() => handleBlur('rawAadhaar')}
                        placeholder="XXXX XXXX XXXX"
                        maxLength={14}
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
                      />
                      {touched.rawAadhaar && errors.rawAadhaar && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.rawAadhaar}
                        </p>
                      )}
                    </div>

                    {/* Temporary Password (*) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="provision-password"
                          className="text-sm font-semibold text-secondary"
                        >
                          Temporary Password <span className="text-danger">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleGeneratePassword}
                          disabled={isProvisioning || provisioningDone}
                          className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles size={12} /> Generate
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          ref={temporaryPasswordInputRef}
                          id="provision-password"
                          type={showPassword ? 'text' : 'password'}
                          value={temporaryPassword}
                          onChange={(e) => setTemporaryPassword(e.target.value)}
                          onBlur={() => handleBlur('temporaryPassword')}
                          placeholder="Min 10 chars (upper, lower, num, sym)"
                          disabled={isProvisioning || provisioningDone}
                          className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 pe-20 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
                        />
                        <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          {temporaryPassword && (
                            <button
                              type="button"
                              onClick={handleCopyPassword}
                              title="Copy Password"
                              className="p-1.5 text-secondary hover:text-primary rounded"
                            >
                              {copiedPassword ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="p-1.5 text-secondary hover:text-primary rounded"
                          >
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>

                      {/* Password Strength Meter */}
                      {temporaryPassword && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-secondary">Password Strength:</span>
                            <span
                              className={`font-bold ${passwordResult.strength === 'Strong'
                                  ? 'text-success'
                                  : passwordResult.strength === 'Good'
                                    ? 'text-primary'
                                    : passwordResult.strength === 'Fair'
                                      ? 'text-warning'
                                      : 'text-danger'
                                }`}
                            >
                              {passwordResult.strength}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-input rounded-full overflow-hidden flex gap-1">
                            {[1, 2, 3, 4].map((step) => (
                              <div
                                key={step}
                                className={`h-full flex-1 rounded-full transition-colors ${passwordResult.score >= step
                                    ? step === 4
                                      ? 'bg-success'
                                      : step === 3
                                        ? 'bg-primary'
                                        : step === 2
                                          ? 'bg-warning'
                                          : 'bg-danger'
                                    : 'bg-border'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {touched.temporaryPassword && errors.temporaryPassword && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.temporaryPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subscription & Capacity Section */}
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                    Subscription & Plan Configuration
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* SaaS Plan (*) */}
                    <div>
                      <label
                        htmlFor="provision-plan-select"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        SaaS Plan <span className="text-danger">*</span>
                      </label>
                      <select
                        ref={planSelectRef}
                        id="provision-plan-select"
                        value={planId}
                        onChange={(e) => {
                          setPlanId(e.target.value);
                          if (errors.planId) setErrors((prev) => ({ ...prev, planId: undefined }));
                        }}
                        onBlur={() => handleBlur('planId')}
                        disabled={isProvisioning || provisioningDone || loadingPlans}
                        className="w-full min-h-11 bg-card border border-border rounded-lg ps-3.5 pe-9 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="">Select a subscription plan...</option>
                        {plans.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({formatCurrency(p.price)}/mo) — max {p.memberLimit} members
                          </option>
                        ))}
                      </select>
                      {selectedPlan && (
                        <p className="text-xs text-secondary mt-1">
                          Selected plan capacity: <strong className="text-primary">{selectedPlan.memberLimit} members</strong>
                        </p>
                      )}
                      {touched.planId && errors.planId && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.planId}
                        </p>
                      )}
                    </div>

                    {/* Member Count (*) */}
                    <div>
                      <label
                        htmlFor="provision-member-count"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Estimated Member Count <span className="text-danger">*</span>
                      </label>
                      <input
                        ref={memberCountInputRef}
                        id="provision-member-count"
                        type="number"
                        min="0"
                        step="1"
                        value={memberCount}
                        onChange={(e) => setMemberCount(parseInt(e.target.value, 10) || 0)}
                        onBlur={() => handleBlur('memberCount')}
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      {selectedPlan && memberCount > selectedPlan.memberLimit && (
                        <p className="text-xs text-warning mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> Member count ({memberCount}) exceeds plan limit (
                          {selectedPlan.memberLimit})
                        </p>
                      )}
                      {touched.memberCount && errors.memberCount && (
                        <p className="text-xs text-danger mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.memberCount}
                        </p>
                      )}
                    </div>

                    {/* Start Type & Trial Days (Item 18) */}
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-1">
                        Start Type
                      </label>
                      <div className="flex items-center gap-4 min-h-11">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="startType"
                            value="TRIAL"
                            checked={startType === 'TRIAL'}
                            onChange={() => setStartType('TRIAL')}
                            disabled={isProvisioning || provisioningDone}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-primary">Trial Account</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="startType"
                            value="PAID"
                            checked={startType === 'PAID'}
                            onChange={() => setStartType('PAID')}
                            disabled={isProvisioning || provisioningDone}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-primary">Paid Subscription</span>
                        </label>
                      </div>
                    </div>

                    {/* Trial Days (if Trial) */}
                    {startType === 'TRIAL' ? (
                      <div>
                        <label
                          htmlFor="provision-trial-days"
                          className="block text-sm font-semibold text-secondary mb-1"
                        >
                          Trial Days
                        </label>
                        <input
                          id="provision-trial-days"
                          type="number"
                          min="1"
                          max="90"
                          value={trialDays}
                          onChange={(e) => setTrialDays(parseInt(e.target.value, 10) || 14)}
                          disabled={isProvisioning || provisioningDone}
                          className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-semibold text-secondary mb-1">
                          Billing Cycle
                        </label>
                        <input
                          type="text"
                          readOnly
                          disabled
                          value="Standard Monthly (30 Days)"
                          className="w-full min-h-11 bg-input border border-border text-disabled rounded-lg px-4 py-2 text-sm"
                        />
                      </div>
                    )}

                    {/* Start Date */}
                    <div>
                      <label
                        htmlFor="provision-start-date"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Start Date
                      </label>
                      <input
                        id="provision-start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    {/* Auto Calculated Expiry Date (Read-Only) */}
                    <div>
                      <label
                        htmlFor="provision-expiry-date"
                        className="block text-sm font-semibold text-secondary mb-1"
                      >
                        Auto-Calculated Expiry Date
                      </label>
                      <input
                        id="provision-expiry-date"
                        type="date"
                        readOnly
                        disabled
                        value={expiryDate}
                        className="w-full min-h-11 bg-input border border-border text-disabled rounded-lg px-4 py-2 text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Optional Tax & Location Section */}
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                    Optional Tax & Location Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="provision-city" className="block text-sm font-semibold text-secondary mb-1">
                        City
                      </label>
                      <input
                        id="provision-city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="provision-state" className="block text-sm font-semibold text-secondary mb-1">
                        State
                      </label>
                      <input
                        id="provision-state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Maharashtra"
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="provision-gst" className="block text-sm font-semibold text-secondary mb-1">
                        GSTIN
                      </label>
                      <input
                        id="provision-gst"
                        type="text"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                        placeholder="27ABCDE1234F1Z5"
                        disabled={isProvisioning || provisioningDone}
                        className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary uppercase font-mono"
                      />
                    </div>
                  </div>

                  {/* Send Welcome Email Checkbox */}
                  <div className="mt-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendWelcomeEmail}
                        onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                        disabled={isProvisioning || provisioningDone}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-secondary">
                        Send welcome onboarding email with login credentials to admin email
                      </span>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                  <Link
                    href={SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list')}
                    className="min-h-11 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isProvisioning || provisioningDone}
                    className="min-h-11 px-6 py-2.5 rounded-lg text-sm font-bold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-card"
                  >
                    {isProvisioning ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Provisioning Tenant Database...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Provision Gym</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Provisioning Console / Status (1 col) */}
            <div className="bg-page border border-border rounded-xl p-6 shadow-card space-y-4 sticky top-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Database size={20} className="text-primary" />
                <h2 className="text-base font-bold text-primary">Provisioning Console</h2>
              </div>

              {/* Stepper Progress */}
              <div className="space-y-3 py-2">
                {steps.map((s, index) => (
                  <div key={s.key} className="flex items-center gap-3 text-xs">
                    <div className="shrink-0">
                      {s.status === 'running' && (
                        <Loader2 size={18} className="animate-spin text-primary" />
                      )}
                      {s.status === 'success' && (
                        <CheckCircle2 size={18} className="text-success" />
                      )}
                      {s.status === 'failed' && (
                        <XCircle size={18} className="text-danger" />
                      )}
                      {s.status === 'pending' && (
                        <div className="w-4 h-4 rounded-full border border-disabled flex items-center justify-center text-[10px] text-disabled">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${s.status === 'running'
                            ? 'text-primary'
                            : s.status === 'success'
                              ? 'text-success'
                              : s.status === 'failed'
                                ? 'text-danger'
                                : 'text-disabled'
                          }`}
                      >
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Logs Output */}
              <div className="bg-card rounded-lg p-3 font-mono text-[11px] text-secondary h-48 overflow-y-auto space-y-1 border border-border">
                {consoleLogs.length === 0 ? (
                  <p className="text-disabled italic">Awaiting submit...</p>
                ) : (
                  consoleLogs.map((log, i) => (
                    <p key={i} className="leading-tight">
                      <span className="text-disabled me-1.5">&gt;</span>
                      {log}
                    </p>
                  ))
                )}
              </div>

              {/* Failure: Retry button */}
              {provisioningFailed && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleProvision}
                    className="w-full min-h-11 rounded-lg bg-danger text-on-danger font-bold text-xs inline-flex items-center justify-center gap-2 hover:bg-danger/90 cursor-pointer"
                  >
                    <RefreshCw size={14} /> Retry Provisioning
                  </button>
                </div>
              )}

              {/* Success: Go to Gyms button */}
              {provisioningDone && (
                <div className="p-3 bg-success-bg/30 border border-success/40 rounded-lg space-y-3">
                  <p className="text-xs text-success-text font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Gym provisioned and ready!
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list'))}
                    className="w-full min-h-11 rounded-lg bg-primary text-on-primary font-bold text-xs inline-flex items-center justify-center gap-2 hover:bg-primary-hover cursor-pointer"
                  >
                    Go to Gyms Directory
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
