// RESPONSIBILITY: Renders only the Login form-side loading skeleton, matching the production form and header geometry.
/**
 * Renders the structural form-side loading skeleton for the public Login route.
 * @description Owns the mobile-visible and desktop form placeholder only; it contains no authentication state.
 * @dependencies Smart Gym 360 skeleton semantic tokens and motion-safe utilities.
 * @edge-case The same form skeleton remains usable at narrow mobile widths.
 */
export default function AuthLoginLoadingFormSkeleton() {
  return (
    <div data-testid="auth_login-loading_form-skeleton" className="flex w-full items-center justify-center bg-page p-6 pt-24 sm:p-12 xl:w-2/5 xl:pt-12">
      <div className="w-full max-w-md space-y-8" aria-hidden="true">
        <div className="h-4 w-full max-w-28 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-8 w-full max-w-40 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-4 w-full max-w-56 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
        </div>
        <div className="space-y-5 rounded-lg border border-border bg-skeleton-base p-8">
          <div className="space-y-2">
            <div className="h-4 w-full max-w-24 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full max-w-20 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
          <div className="h-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" />
        </div>
      </div>
    </div>
  );
}
