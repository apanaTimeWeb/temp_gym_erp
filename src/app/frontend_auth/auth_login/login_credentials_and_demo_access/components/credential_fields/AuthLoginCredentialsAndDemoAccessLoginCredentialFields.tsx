// RESPONSIBILITY: Renders Login email/password fields and their validation affordances; it does not submit or navigate.
'use client';

import { CheckCircle2, Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { AuthLoginCredentialFieldsProps } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessLoginTypes';



/**
 * Renders the credential controls using React Hook Form bindings supplied by the parent form hook.
 * @description Owns only field layout, accessible errors, and password visibility presentation.
 * @dependencies React Hook Form field registration, Login translations, and semantic design tokens.
 * @edge-case Error identifiers remain stable so aria-describedby points to the correct field message.
 */
export default function AuthLoginCredentialFields({ form, isSubmitting, isReadOnly = false, showPassword, onTogglePassword }: AuthLoginCredentialFieldsProps) {
  const t = useTranslations('AUTH_LOGIN');
  const { register } = form;
  const { errors, touchedFields } = form.formState;
  const emailIsValid = Boolean(touchedFields.email && !errors.email && form.getValues('email'));
  const passwordIsValid = Boolean(touchedFields.password && !errors.password && form.getValues('password'));

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="login-email" className="block text-sm font-bold text-secondary">{t('FORM_EMAIL_LABEL')} <span aria-hidden="true" className="text-danger">*</span></label>
        <div className="relative">
          <Mail size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            id="login-email"
            data-testid="auth_login-form-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            disabled={isSubmitting}
            readOnly={isReadOnly}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className="h-11 w-full rounded-md border border-border bg-input pl-11 pr-20 text-sm text-primary outline-none placeholder:text-disabled motion-safe:transition-all motion-safe:duration-base ease-in-out hover:border-focus focus-visible:border-focus disabled:hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50 read-only:border-dashed read-only:cursor-default read-only:focus-visible:border-border read-only:focus-visible:ring-0"
            placeholder={t('FORM_EMAIL_PLACEHOLDER')}
          />
          {emailIsValid && (
            <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" data-testid="auth_login-form-email-success" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-success" />
          )}
        </div>
        {errors.email && <p id="login-email-error" data-testid="auth_login-form-email-error" className="text-xs text-danger" role="alert">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="login-password" className="block text-sm font-bold text-secondary">{t('FORM_PASSWORD_LABEL')} <span aria-hidden="true" className="text-danger">*</span></label>
        <div className="relative">
          <Lock size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            id="login-password"
            data-testid="auth_login-form-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password')}
            disabled={isSubmitting}
            readOnly={isReadOnly}
            required
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            className="h-11 w-full rounded-md border border-border bg-input pl-11 pr-20 text-sm text-primary outline-none placeholder:text-disabled motion-safe:transition-all motion-safe:duration-base ease-in-out hover:border-focus focus-visible:border-focus disabled:hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50 read-only:border-dashed read-only:cursor-default read-only:focus-visible:border-border read-only:focus-visible:ring-0"
            placeholder={t('FORM_PASSWORD_PLACEHOLDER')}
          />
          {passwordIsValid && (
            <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" data-testid="auth_login-form-password-success" className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 text-success" />
          )}
          <button
            type="button"
            data-testid="auth_login-form-password-toggle"
            aria-label={showPassword ? t('HIDE_PASSWORD') : t('SHOW_PASSWORD')}
            aria-pressed={showPassword}
            disabled={isSubmitting || isReadOnly}
            onClick={onTogglePassword}
            className="absolute right-1 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out hover:text-primary motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={18} strokeWidth={2} aria-hidden="true" /> : <Eye size={18} strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
        {errors.password && <p id="login-password-error" data-testid="auth_login-form-password-error" className="text-xs text-danger" role="alert">{errors.password.message}</p>}
      </div>
    </div>
  );
}
