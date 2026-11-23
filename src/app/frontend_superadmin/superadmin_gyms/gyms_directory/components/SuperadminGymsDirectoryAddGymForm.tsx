'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Loader2, Save } from 'lucide-react';
import { usePlans } from '../services/SuperadminGymsDirectoryTenantService';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { useSuperadminGymsDirectoryProvisionForm } from '../hooks/useSuperadminGymsDirectoryProvisionForm';
import { SuperadminGymsDirectoryAddGymCoreSection } from './SuperadminGymsDirectoryAddGymCoreSection';
import { SuperadminGymsDirectoryAddGymSubscriptionSection } from './SuperadminGymsDirectoryAddGymSubscriptionSection';
import { SuperadminGymsDirectoryAddGymTaxSection } from './SuperadminGymsDirectoryAddGymTaxSection';
import { SuperadminGymsDirectoryAddGymConsole } from './SuperadminGymsDirectoryAddGymConsole';

export default function SuperadminGymsDirectoryAddGymForm() {
  const router = useRouter();
  const { data: plans = [], isLoading: loadingPlans } = usePlans();
  const form = useSuperadminGymsDirectoryProvisionForm();

  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === form.planId || p.name.toLowerCase() === form.planId.toLowerCase()),
    [plans, form.planId]
  );

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
      {/* Header Bar */}
      <div className="sticky top-0 z-30 shrink-0 bg-page pb-2 pt-0.5 border-b border-border">
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

      {/* Scrollable Form Body Container */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 pb-8">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Form Container (2 cols) */}
            <div className="lg:col-span-2">
              <form
                onSubmit={form.handleProvision}
                noValidate
                className="bg-page border border-border rounded-xl p-6 shadow-card space-y-6"
              >
                <SuperadminGymsDirectoryAddGymCoreSection
                  gymName={form.gymName}
                  setGymName={form.setGymName}
                  gymNameInputRef={form.gymNameInputRef}
                  tenantSlug={form.tenantSlug}
                  setTenantSlug={form.setTenantSlug}
                  ownerName={form.ownerName}
                  setOwnerName={form.setOwnerName}
                  ownerNameInputRef={form.ownerNameInputRef}
                  adminEmail={form.adminEmail}
                  setAdminEmail={form.setAdminEmail}
                  adminEmailInputRef={form.adminEmailInputRef}
                  isCheckingEmail={form.isCheckingEmail}
                  emailExistsError={form.emailExistsError}
                  phone={form.phone}
                  setPhone={form.setPhone}
                  phoneInputRef={form.phoneInputRef}
                  rawAadhaar={form.rawAadhaar}
                  setRawAadhaar={form.setRawAadhaar}
                  aadhaarInputRef={form.aadhaarInputRef}
                  temporaryPassword={form.temporaryPassword}
                  setTemporaryPassword={form.setTemporaryPassword}
                  temporaryPasswordInputRef={form.temporaryPasswordInputRef}
                  showPassword={form.showPassword}
                  setShowPassword={form.setShowPassword}
                  copiedPassword={form.copiedPassword}
                  passwordResult={form.passwordResult}
                  handleGeneratePassword={form.handleGeneratePassword}
                  handleCopyPassword={form.handleCopyPassword}
                  isProvisioning={form.isProvisioning}
                  provisioningDone={form.provisioningDone}
                  errors={form.errors}
                  touched={form.touched}
                  handleBlur={form.handleBlur}
                />

                <SuperadminGymsDirectoryAddGymSubscriptionSection
                  planId={form.planId}
                  setPlanId={form.setPlanId}
                  planSelectRef={form.planSelectRef}
                  plans={plans}
                  loadingPlans={loadingPlans}
                  selectedPlan={selectedPlan}
                  memberCount={form.memberCount}
                  setMemberCount={form.setMemberCount}
                  memberCountInputRef={form.memberCountInputRef}
                  startType={form.startType}
                  setStartType={form.setStartType}
                  trialDays={form.trialDays}
                  setTrialDays={form.setTrialDays}
                  billingCycle={form.billingCycle}
                  setBillingCycle={form.setBillingCycle}
                  currency={form.currency}
                  setCurrency={form.setCurrency}
                  timezone={form.timezone}
                  setTimezone={form.setTimezone}
                  startDate={form.startDate}
                  setStartDate={form.setStartDate}
                  expiryDate={form.expiryDate}
                  isProvisioning={form.isProvisioning}
                  provisioningDone={form.provisioningDone}
                  errors={form.errors}
                  touched={form.touched}
                  handleBlur={form.handleBlur}
                  setErrors={form.setErrors}
                />

                <SuperadminGymsDirectoryAddGymTaxSection
                  address={form.address}
                  setAddress={form.setAddress}
                  city={form.city}
                  setCity={form.setCity}
                  state={form.state}
                  setState={form.setState}
                  postalCode={form.postalCode}
                  setPostalCode={form.setPostalCode}
                  gstNumber={form.gstNumber}
                  setGstNumber={form.setGstNumber}
                  sendWelcomeEmail={form.sendWelcomeEmail}
                  setSendWelcomeEmail={form.setSendWelcomeEmail}
                  isProvisioning={form.isProvisioning}
                  provisioningDone={form.provisioningDone}
                />

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
                    disabled={form.isProvisioning || form.provisioningDone}
                    className="min-h-11 px-6 py-2.5 rounded-lg text-sm font-bold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-card"
                  >
                    {form.isProvisioning ? (
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
            <SuperadminGymsDirectoryAddGymConsole
              steps={form.steps}
              consoleLogs={form.consoleLogs}
              provisioningFailed={form.provisioningFailed}
              provisioningDone={form.provisioningDone}
              onRetry={form.handleProvision}
              onGoToList={() => router.push(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list'))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
