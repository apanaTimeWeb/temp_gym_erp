// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationTopLoader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the application-wide route transition progress indicator for the Superadmin shell. No business logic.

import NextTopLoader from 'nextjs-toploader';

/**
 * @description Displays the required Next.js navigation progress indicator using the global Premium Gold semantic primary token.
 * @dependencies Requires the host application's `nextjs-toploader` dependency and global `--primary` theme token.
 * @edge-case Uses the library's default navigation integration and suppresses its standalone spinner so it does not compete with page skeletons.
 */
export function SuperadminPlatformShellNavigationTopLoader() {
  return <NextTopLoader color="var(--primary)" showSpinner={false} height={2} crawl={true} />;
}
