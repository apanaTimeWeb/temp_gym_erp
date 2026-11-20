'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { tenantService } from '../services/SuperadminGymsDirectoryTenantService';
import { validateEmail, validatePassword, generateStrongPassword } from '../utils/SuperadminGymsDirectoryValidators';
import { computeAddGymExpiryDate, validateAddGymField, buildCreateTenantPayload } from '../utils/SuperadminGymsDirectoryAddGymValidation';
import { INITIAL_PROVISION_STEPS } from '../components/SuperadminGymsDirectoryAddGymConsole';

export function useSuperadminGymsDirectoryProvisionForm() {
  const [gymName, setGymName] = useState(''), [ownerName, setOwnerName] = useState('');
  const [adminEmail, setAdminEmail] = useState(''), [phone, setPhone] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState(''), [showPassword, setShowPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false), [planId, setPlanId] = useState('');
  const [memberCount, setMemberCount] = useState<number>(50);
  const [startType, setStartType] = useState<'TRIAL' | 'PAID'>('TRIAL');
  const [trialDays, setTrialDays] = useState<number>(14);
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [city, setCity] = useState(''), [state, setState] = useState('');
  const [gstNumber, setGstNumber] = useState(''), [rawAadhaar, setRawAadhaar] = useState('');
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [debouncedEmail, setDebouncedEmail] = useState('');

  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningDone, setProvisioningDone] = useState(false);
  const [provisioningFailed, setProvisioningFailed] = useState(false);
  const [steps, setSteps] = useState(INITIAL_PROVISION_STEPS);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const gymNameInputRef = useRef<HTMLInputElement>(null), ownerNameInputRef = useRef<HTMLInputElement>(null);
  const adminEmailInputRef = useRef<HTMLInputElement>(null), phoneInputRef = useRef<HTMLInputElement>(null);
  const temporaryPasswordInputRef = useRef<HTMLInputElement>(null), planSelectRef = useRef<HTMLSelectElement>(null);
  const memberCountInputRef = useRef<HTMLInputElement>(null), aadhaarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedEmail(adminEmail.trim()), 400);
    return () => clearTimeout(timer);
  }, [adminEmail]);

  const isEmailFormatValid = Boolean(debouncedEmail && validateEmail(debouncedEmail).isValid);
  const { data: emailExists = false, isFetching: isCheckingEmail } = useQuery({
    queryKey: ['checkEmailExists', debouncedEmail],
    queryFn: () => tenantService.checkEmailExists(debouncedEmail),
    enabled: isEmailFormatValid,
  });

  const emailExistsError = emailExists ? 'This email is already registered to another gym' : null;
  const expiryDate = useMemo(() => computeAddGymExpiryDate(startDate, startType, trialDays), [startDate, startType, trialDays]);
  const passwordResult = useMemo(() => validatePassword(temporaryPassword), [temporaryPassword]);
  const formValues = useMemo(() => ({ gymName, ownerName, adminEmail, phone, temporaryPassword, planId, memberCount, rawAadhaar }), [gymName, ownerName, adminEmail, phone, temporaryPassword, planId, memberCount, rawAadhaar]);
  const isDirty = useMemo(() => [gymName, ownerName, adminEmail, phone, temporaryPassword, city, rawAadhaar].some((v) => v.length > 0), [gymName, ownerName, adminEmail, phone, temporaryPassword, city, rawAadhaar]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !provisioningDone && !isProvisioning) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, provisioningDone, isProvisioning]);

  const validateField = useCallback((f: string) => validateAddGymField(f, formValues, emailExistsError), [formValues, emailExistsError]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field) }));
  };

  const handleGeneratePassword = () => {
    setTemporaryPassword(generateStrongPassword());
    setErrors((prev) => ({ ...prev, temporaryPassword: undefined }));
    setTouched((prev) => ({ ...prev, temporaryPassword: true }));
  };

  const handleCopyPassword = () => {
    if (!temporaryPassword) return;
    navigator.clipboard.writeText(temporaryPassword);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
    toast.success('Password copied to clipboard');
  };

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProvisioning) return;

    const fields = ['gymName', 'ownerName', 'adminEmail', 'phone', 'temporaryPassword', 'planId', 'memberCount', 'rawAadhaar'];
    const newErrors: { [key: string]: string | undefined } = {};
    fields.forEach((f) => { newErrors[f] = validateField(f); });
    setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    setErrors(newErrors);

    const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
      gymName: gymNameInputRef, ownerName: ownerNameInputRef, adminEmail: adminEmailInputRef,
      phone: phoneInputRef, temporaryPassword: temporaryPasswordInputRef, planId: planSelectRef,
      memberCount: memberCountInputRef, rawAadhaar: aadhaarInputRef,
    };

    const firstInvalid = fields.find((f) => newErrors[f]);
    if (firstInvalid) {
      refMap[firstInvalid]?.current?.focus();
      toast.error(`Please fix errors: ${newErrors[firstInvalid]}`);
      return;
    }

    const payload = buildCreateTenantPayload({ ...formValues, startType, trialDays, startDate, expiryDate, city, state, gstNumber, sendWelcomeEmail });
    setIsProvisioning(true);
    setProvisioningFailed(false);
    setProvisioningDone(false);
    setSteps(INITIAL_PROVISION_STEPS.map((s) => ({ ...s, status: 'pending' })));
    setConsoleLogs([`[INFO] Initiating isolated database provisioning for ${payload.gymName}...`]);

    try {
      await tenantService.createTenant(payload, (prog) => {
        setSteps((prev) => prev.map((s) => (s.key === prog.stepKey ? { ...s, status: prog.status, message: prog.message } : s)));
        if (prog.message) setConsoleLogs((prev) => [...prev, `[${prog.status.toUpperCase()}] ${prog.message}`]);
      });
      setProvisioningDone(true);
      setConsoleLogs((prev) => [...prev, `[SUCCESS] Tenant provisioning completed! Isolated tenant database online.`]);
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

  return {
    gymName, setGymName, ownerName, setOwnerName, adminEmail, setAdminEmail, phone, setPhone,
    temporaryPassword, setTemporaryPassword, showPassword, setShowPassword, copiedPassword,
    planId, setPlanId, memberCount, setMemberCount, startType, setStartType, trialDays, setTrialDays,
    startDate, setStartDate, city, setCity, state, setState, gstNumber, setGstNumber, rawAadhaar, setRawAadhaar,
    sendWelcomeEmail, setSendWelcomeEmail, errors, setErrors, touched, isCheckingEmail, emailExistsError,
    expiryDate, passwordResult, isProvisioning, provisioningDone, provisioningFailed, steps, consoleLogs,
    gymNameInputRef, ownerNameInputRef, adminEmailInputRef, phoneInputRef, temporaryPasswordInputRef,
    planSelectRef, memberCountInputRef, aadhaarInputRef, handleBlur, handleGeneratePassword, handleCopyPassword,
    handleProvision,
  };
}

export default useSuperadminGymsDirectoryProvisionForm;
