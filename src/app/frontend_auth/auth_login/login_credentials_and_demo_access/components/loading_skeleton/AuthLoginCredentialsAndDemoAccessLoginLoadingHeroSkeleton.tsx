// RESPONSIBILITY: Renders only the desktop Login hero loading skeleton, matching the production hero geometry.
/**
 * Renders the structural hero-side loading skeleton for the public Login route.
 * @description Owns the desktop hero placeholder only; it contains no form or authentication state.
 * @dependencies Smart Gym 360 skeleton semantic tokens and motion-safe utilities.
 * @edge-case The hero remains desktop-only because the real Login hero is hidden below the documented `xl` desktop breakpoint.
 */
export default function AuthLoginLoadingHeroSkeleton() {
  return (
    <div data-testid="auth_login-loading_hero-skeleton" className="hidden rounded-lg bg-skeleton-base p-12 xl:flex xl:w-3/5 xl:flex-col xl:justify-between xl:rounded-none">
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="h-11 w-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 w-32 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-3 w-44 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
        </div>
      </div>

      <div className="space-y-6" aria-hidden="true">
        <div className="space-y-3">
          <div className="h-12 w-64 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-12 w-52 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-4 w-80 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-72 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-4 w-64 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-4 w-full max-w-56 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="h-24 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-24 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="h-24 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
        </div>
      </div>

      <div className="h-10 w-44 rounded-full bg-skeleton-highlight motion-safe:animate-pulse" aria-hidden="true" />
    </div>
  );
}
